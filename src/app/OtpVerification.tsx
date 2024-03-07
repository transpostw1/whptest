import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./config";
import OTPInput from "react-otp-input";

const OtpVerification = ({ phoneNumber }) => {
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

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
    // Ensure that the phone number is valid before sending OTP
    if (!phoneNumber) {
      console.error("Invalid phone number");
      return;
    }

    if (!window.recaptchaVerifier) {
      setUpRecaptcha();
    }

    try {
      const result = await signInWithPhoneNumber(
        auth,
        "+" + phoneNumber,
        window.recaptchaVerifier
      );
      setVerificationId(result.verificationId);
      setIsOtpSent(true); // Update state to indicate OTP has been sent
      console.log("OTP sent successfully");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const onVerify = async () => {
    if (!verificationId || !otp) {
      console.error("Invalid verification ID or OTP");
      return;
    }

    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      console.log("Successfully signed in with OTP");
    } catch (error) {
      console.error("Error signing in with OTP:", error);
    }
  };

  useEffect(() => {
    setUpRecaptcha();
  }, []);

  return (
    <div className="otpVerification">
      {isOtpSent ? (
        <div>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
          <button className="p-3 bg-red-500" onClick={onVerify}>
            Verify
          </button>
        </div>
      ) : (
        <button className="bg-pink-500 p-3 rounded-2xl text-white font-medium" onClick={onSendOtp}>Send OTP</button>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default OtpVerification;

