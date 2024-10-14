import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
  FirebaseError,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./config";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";
import OTPInput from "react-otp-input";
import { useRouter } from "next/navigation";
import axios from "../utils/axios";
import {  login } from "@/utils/constants";
import { useUser } from "@/context/UserContext";
import Preloader from "@/components/Other/Preloader";

interface OtpVerificationProps {
  phoneNumber: string;
  formikValues: any;
  onSubmit: (values: any) => void;
  isRegisterPage: boolean;
  errorMessage: string | any;
}

// class Token {
//   static token = "";
// }

const OtpVerification = ({
  formikValues,
  onSubmit,
  isRegisterPage,
  onOtpVerified,
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
    const formatPh = "+" + formikValues.phoneNumber;
    try {
      setLoading(true);
      setFirebaseError(null);
      const result = await signInWithPhoneNumber(auth, formatPh, appVerifier);
      setVerificationId(result.verificationId);
      setIsOtpSent(true); 
      setErrorMessage(null);
      console.log("OTP sent successfully");
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      console.error(FirebaseError, error.message, "FIREE");
      setLoading(false);
      if (error.message.includes("reCAPTCHA has already been rendered")) {
        window.location.href = location.pathname;
      } 
      else {
        setErrorMessage("Invalid Number or Try again");
      }
      //  setFirebaseError(error.message);
    }
  };

  const verifySignin = async () => {
    if (!verificationId || !otp) {
      console.error("Invalid verification ID or OTP");
      return;
    }
    try {
      setVerifying(true);
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      console.log("Successfully signed in with OTP");
      const phoneNumber = auth?.currentUser?.phoneNumber;
      const tokenn = auth?.currentUser?.accessToken;
      const userId = auth?.currentUser?.uid;
      if (tokenn) {
        localStorage.setItem("firebaseToken", tokenn);
        console.log("Token saved to local storage:", tokenn);
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
       const { data } = await client.mutate({
        mutation: STORE_REGISTRATION_ATTEMPTS_MUTATION,
        variables: {
          phoneNumber, 
        },
      });
      console.log("Registration attempt stored successfully:", data.storeRegistrationAttempts.message);
    } catch (error) {
      console.log(error)
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
      console.log("Successfully signed in with OTP");
      const tokenn = auth?.currentUser?.accessToken;
      const userId = auth?.currentUser?.uid;

      const response = await axios.post(
        login,
        {
          ...formikValues,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenn}`,
          },
        },
      );
      logIn();
      const localToken = response.data.token;
      typeof window !== "undefined"
        ? localStorage.setItem("localtoken", localToken)
        : null;
      console.log("intial token", localStorage.getItem("localtoken"));
      router.push("/");
    } catch (error: any) {
      setVerifying(false);
      console.error("Error signing in with OTP:", error);
      if (error.code === "auth/invalid-verification-code") {
        setErrorMessage("Invalid OTP. Please try again.");
      } else if (error.response) {
        const errorMsg =
          typeof error.response.data === "string"
            ? error.response.data.error
            : JSON.stringify(error.response.data.error);
        setErrorMessage(errorMsg);
        console.error("Backend error data will show:", error.response.data);
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

  const handleCombinedClick2 = (e: any) => {
    if (e.key === "Enter") {
      handleCombinedClick();
    }
  };
  const handleCombinedClick = () => {
    if (isRegisterPage) {
      verifySignin();
      onOtpVerified();
      // onSubmit(formikValues);
    } else {
      onVerify();
    }
  };
  const handleLoginSubmit = () => {
    if (isRegisterPage) {
      // onSubmit(formikValues);
      onSendOtp();
    }
    onSendOtp();
  };

  return (
    <div className="otpVerification">
      {isOtpSent ? (
        <div className="rounded-lg bg-gray-100 p-4 shadow-md">
          <h1 className="mb-4 text-center text-xl font-normal text-[#E26178]">
            Enter Verification Code
          </h1>
          <div
            className="mb-6 flex items-center justify-center"
            onKeyDown={handleCombinedClick2}
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="mx-2">-</span>}
              renderInput={(props) => (
                <input {...props} placeholder="0" className="otpInput" />
              )}
            />
          </div>
          <button
            className="w-full rounded-lg bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] py-2 font-medium text-white transition duration-300 hover:bg-[#e26178]"
            onClick={handleCombinedClick}
          >
            {verifying ? (
              <>
                <Preloader />
                {/* Verifying OTP... */}
                {/* <span>Verifying OTP</span>
                <CgSpinner size={20} className="animate-spin"/> */}
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
            tabIndex={0}
            onKeyDown={(event) => {
              console.log("target key", event.key);
              if (event.key === "Enter") {
                event.preventDefault();
                handleLoginSubmit();
              }
            }}
            className="mb-4 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-1 font-normal text-white"
            // className="button-main"
            onClick={handleLoginSubmit}
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
