import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./config";
import OTPInput from "react-otp-input";
import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";
import axios from "../utils/axios";
import { signup, login } from "@/utils/constants";
import { useUser } from "@/context/UserContext";
import Cookies from "js-cookie";

interface OtpVerificationProps {
  formikValues: any; // Define the type of formikValues prop
  onSubmit: () => void;
  isRegisterPage: boolean;
  errorMessage: string | null; // Add errorMessage prop
}

// class Token {
//   static token = "";
// }

const OtpVerification = ({
  formikValues,
  onSubmit,
  isRegisterPage,
}: OtpVerificationProps) => {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { logIn, userState } = useUser();

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
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

    try {
      setLoading(true);
      const result = await signInWithPhoneNumber(
        auth,
        "+" + formikValues.phoneNumber,
        window.recaptchaVerifier
      );
      setVerificationId(result.verificationId);
      setIsOtpSent(true); // Update state to indicate OTP has been sent
      console.log("OTP sent successfully");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };
  const onVerify = async (action: string) => {
    if (!verificationId || !otp) {
      console.error("Invalid verification ID or OTP");
      return;
    }
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      console.log("Successfully signed in with OTP");
      const tokenn = auth?.currentUser?.accessToken;
      const userId = auth?.currentUser?.uid;
      console.log(auth.currentUser, "435435");
      console.log(credential, "CREDDD");

      let endpoint = action === "login" ? login : signup;
      console.log(endpoint, "dfgdgdfg");
      const response = await axios.post(
        endpoint,
        {
          ...formikValues,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenn}`,
          },
        }
      );
      logIn();
      console.log(response,"LOGIN RESPPP")
         const localToken = response.data.token;
         Cookies.set("localtoken", localToken);
         console.log("local______", localToken);
      router.push("/");
    } catch (error: any) {
      console.error("Error signing in with OTP:", error);
      setErrorMessage(error.response?.data?.message);
      if (error.response) {
        console.error("Backend error data:", error.response.data);
        console.error("Backend error status:", error.response.status);
        console.error("Backend error headers:", error.response.headers);
        setErrorMessage(error.response?.data?.error);
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
    onVerify("login");
    if (isRegisterPage) {
      onVerify("signup");
      onSubmit(formikValues);
    }
  };
  const handleLoginSubmit = () => {
    if (isRegisterPage) {
      onSubmit(formikValues);
      onSendOtp();
    }
    onSendOtp();
  };
  return (
    <div className="otpVerification">
      {isOtpSent ? (
        <div className="bg-gray-100">
          <h1 className="font-bold">Enter Verification Code</h1>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
          <button
            className="p-2 bg-pink-500 rounded-2xl font-medium"
            onClick={handleCombinedClick}
          >
            Verify
          </button>
          {errorMessage && (
            <h1 className="text-red-500 font-medium">{errorMessage}</h1>
          )}
        </div>
      ) : (
        <div>
          <button
            className="bg-pink-500 p-3 rounded-2xl text-white font-medium flex flex-col items-center"
            onClick={handleLoginSubmit}
          >
            Send OTP
            {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
          </button>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </div>
      )}{" "}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default OtpVerification;
