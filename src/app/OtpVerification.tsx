import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
  FirebaseError,
} from "firebase/auth";
import { useEffect, useState ,RefObject} from "react";
import { auth } from "./config";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";
import OTPInput from "react-otp-input";
import { useRouter } from "next/navigation";
import axios from "../utils/axios";
import { login } from "@/utils/constants";
import { useUser } from "@/context/UserContext";
import Preloader from "@/components/Other/Preloader";

interface OtpVerificationProps {
  phoneNumber: string;
  formikValues: any;
  onSubmit: (values: any) => void;
  isRegisterPage: boolean;
  errorMessage: string | any;
  onOtpVerified: () => void;
  otpButtonRef?: RefObject<HTMLButtonElement>; 
}

// class Token {
//   static token = "";
// }

const OtpVerification = ({
  formikValues,
  onSubmit,
  onOtpVerified,
  otpButtonRef
}: OtpVerificationProps) => {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { logIn, userState } = useUser();

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      },
    );
  };

  const onSendOtp = async () => {
    if (!formikValues.phoneNumber) {
      console.error("Invalid phone number");
      return;
    }
    if (!window.recaptchaVerifier) {
      setUpRecaptcha();
    }
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "" + formikValues.phoneNumber;

    try {
      setLoading(true);
      setFirebaseError(null);
      const result = await signInWithPhoneNumber(auth, formatPh, appVerifier);
      setVerificationId(result.verificationId);
      setIsOtpSent(true);
      setErrorMessage(null);
      // console.log("OTP sent successfully");
    } catch (error: any) {
      setLoading(false);
      if (error.message.includes("reCAPTCHA has already been rendered")) {
        window.location.href = location.pathname;
        return;
      } else if (
        error?.code === 400 &&
        error.message?.includes("CAPTCHA_CHECK_FAILED")
      ) {
        // console.log("Ignoring CAPTCHA_CHECK_FAILED error");
        return;
      }
      setErrorMessage("Invalid Number or Try again");
    }
  };

  const onVerify = async () => {
    if (!verificationId || !otp) {
      console.error("Invalid verification ID or OTP");
      return;
    }
    try {
      setVerifying(true);
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      // console.log("Successfully signed in with OTP");
      const phoneNumber = auth?.currentUser?.phoneNumber;
      const tokenn = auth?.currentUser?.accessToken;
      const userId = auth?.currentUser?.uid;
      if (tokenn) {
        localStorage.setItem("firebaseToken", tokenn);
        // console.log("Token saved to local storage:", tokenn);
      }
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });
      const STORE_REGISTRATION_ATTEMPTS_MUTATION = gql`
        mutation Mutation($phoneNumber: String) {
          storeRegistrationAttempts(phoneNumber: $phoneNumber) {
            message
            code
          }
        }
      `;

      await client.mutate({
        mutation: STORE_REGISTRATION_ATTEMPTS_MUTATION,
        variables: { phoneNumber },
      });
      // console.log("Store registration attempt mutation called successfully.");
      const response = await axios.post(
        login,
        { phoneNumber },
        {
          headers: { Authorization: `Bearer ${tokenn}` },
        },
      );
      logIn();
      const localToken = response.data.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("localtoken", localToken);
      }
      // console.log("Initial token saved:", localStorage.getItem("localtoken"));
      router.push("/");
    } catch (error: any) {
      setVerifying(false);
      console.error("Error during verification and registration:", error);

      if (error.code === "auth/invalid-verification-code") {
        setErrorMessage("Invalid OTP. Please try again.");
      } else if (error.response) {
        const errorData = error.response.data;
        const errorMsg =
          typeof errorData === "string"
            ? errorData
            : errorData.error || JSON.stringify(errorData);
        if (errorMsg.includes("User Not Found")) {
          onOtpVerified();
        } else {
          setErrorMessage(errorMsg);
          console.error("Backend error data will show:", errorData);
        }

        console.error("Backend error status:", error.response.status);
        console.error("Backend error headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Request setup error:", error.message);
      }
    }
  };

  useEffect(() => {
    setUpRecaptcha();
  }, []);


  const handleCombinedClick = () => {
    onVerify();
  };
  const handleLoginSubmit = () => {
    onSendOtp();
  };

  return (
    <div className="otpVerification">
      {isOtpSent ? (
        <div className=" bg-white p-4 shadow-md">
          <h1 className="mb-4 text-center text-xl font-normal text-[#E26178]">
            Verification Code
          </h1>
          <div
            className="mb-6 flex items-center justify-center"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCombinedClick();
              }
            }}
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="mx-2">-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="0"
                  className="otpInput h-10 w-14 rounded-full border border-gray-300 text-center transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#E26178]"
                />
              )}
            />
          </div>
          <button
          
            className="w-full  bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] py-1 font-normal text-white transition duration-300 hover:bg-[#e26178]"
            onClick={handleCombinedClick}
          >
            {verifying ? (
              <>
                <Preloader />
              </>
            ) : (
              <span>Verify</span>
            )}
          </button>
          {errorMessage && (
            <p className="mt-3 text-center text-red-500">{errorMessage}</p>
          )}
        </div>
      ) : (
        <div className="text-center">
          <button
            ref={otpButtonRef}
            onClick={handleLoginSubmit}
            className="mb-4 flex w-full items-center justify-center bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-1 font-normal text-white"
          >
            {loading ? (
              <>
                <div className="flex">
                  {/* <span>Sending OTP</span> */}
                  {/* <CgSpinner size={20} className="animate-spin" /> */}
                  <Preloader />
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <span>Send OTP</span>
              </div>
            )}
          </button>

          {/* {firebaseError && <p className="text-red-500 w-64 ">{firebaseError}</p>} */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default OtpVerification;
