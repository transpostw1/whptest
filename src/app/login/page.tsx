"use client";

import React, { useState } from "react";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../config";
import axios from "axios";
import { baseUrl, signup } from "@/utils/constants";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Preloader from "@/components/Other/Preloader";
import AuthAnimation from "../AuthAnimation";
import OTPInput from "react-otp-input";
import { login } from "@/utils/constants";

const Login = () => {
  const router = useRouter();
  const { logIn } = useUser();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phoneNumber: Yup.string().required("Required"),
    }),
    onSubmit: handleSignUp,
  });

  
  const getToken = () => localStorage.getItem("firebaseToken") || null;

  async function handleSignUp() {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error("No authentication token found");

      const response = await axios.post(
        `${baseUrl}${signup}`,
        { ...formik.values },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      logIn();
      localStorage.setItem("localtoken", response.data.token);
      router.push("/");
    } catch (error: any) {
      const apiError =
        error.response?.data?.error ||
        "An unexpected error occurred. Please try again.";
      setErrorMessage(apiError);
    } finally {
      setLoading(false);
    }
  }

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    formik.setFieldValue("phoneNumber", value);
  };

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
    console.log("innisnf")
    if (!phoneNumber) {
      setErrorMessage("Invalid phone number");
      return;
    }
    if (!window.recaptchaVerifier) {
      setUpRecaptcha();
    }
    const appVerifier = window.recaptchaVerifier;
    try {
      setLoading(true);
      console.log("fffffff")
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      console.log("sssssssssss")
      setVerificationId(result.verificationId);
      setIsOtpSent(true);
      setErrorMessage("");
    } catch (error: any) {
      if (error.message.includes("reCAPTCHA has already been rendered")) {
        window.location.href = location.pathname;
        return;
      }
      setErrorMessage("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
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
  
      // Define the GraphQL mutation for registration attempts
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
      console.log("Store registration attempt mutation called successfully.");
      const response = await axios.post(
        login,
        { phoneNumber },
        {
          headers: { Authorization: `Bearer ${tokenn}` },
        }
      );
      logIn();
      const localToken = response.data.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("localtoken", localToken);
      }
      console.log("Initial token saved:", localStorage.getItem("localtoken"));
      router.push("/");
  
    } catch (error:any) {
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
          setIsOtpVerified(false)
        } else {""
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
  const handleCombinedClick2 = (e: any) => {
    if (e.key === "Enter") {
      handleCombinedClick();
    }
  };
  const handleCombinedClick = () => {
      onVerify();
  };

  const renderOtpForm = () => (
    <div className="flex flex-col items-center">
      <PhoneInput
        defaultCountry="in"
        value={phoneNumber}
        inputClassName="border h-full w-[250px] rounded-xl"
        placeholder="Enter your mobile number"
        onChange={handlePhoneChange}
      />
      <div className="block-button mt-4 w-full md:mt-7">
      {!isOtpSent ? (

        <button
          type="button"
          className="mb-4 flex w-full items-center justify-center  bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-1 font-normal text-white"
          onClick={onSendOtp}
          disabled={loading}
        >
          {loading ? <Preloader /> : <span>Send OTP</span>}
        </button>
      ):(
    <div>
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
            <input
              {...props}
              placeholder="0"
              className="otpInput h-10 w-14 rounded-full border border-gray-300 text-center transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#E26178]"
            />
          )}
        />
      </div>
      <button
        className="w-full rounded-lg bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] py-1 font-normal text-white transition duration-300 hover:bg-[#e26178]"
        onClick={handleCombinedClick2}
      >
        {verifying ? (
          <>
            <Preloader />
          </>
        ) : (
          <span>Verify</span>
        )}
      </button>
    </div>
      )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );

  const renderDetailsForm = () => (
    <>
      <div className="firstname">
        <label htmlFor="firstName" className="font-medium">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          className="w-full rounded-lg border border-gray-300 px-4 pb-3 pt-3"
          placeholder="First Name"
          {...formik.getFieldProps("firstName")}
          disabled={loading}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <div className="text-red-500">{formik.errors.firstName}</div>
        )}
      </div>

      <div className="lastname mt-5">
        <label htmlFor="lastName" className="font-medium">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          className="w-full rounded-lg border border-gray-300 px-4 pb-3 pt-3"
          placeholder="Last Name"
          {...formik.getFieldProps("lastName")}
          disabled={loading}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <div className="text-red-500">{formik.errors.lastName}</div>
        )}
      </div>

      <div className="email mt-5">
        <label htmlFor="email" className="font-medium">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-lg border border-gray-300 px-4 pb-3 pt-3"
          placeholder="Email"
          {...formik.getFieldProps("email")}
          disabled={loading}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500">{formik.errors.email}</div>
        )}
      </div>

      <button
        type="submit"
        className="mt-5 w-full rounded-lg bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] py-2 font-normal text-white transition duration-300 hover:bg-[#e26178]"
        disabled={loading}
      >
        {loading ? <Preloader /> : <span>Login</span>}
      </button>
      {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
    </>
  );

  return (
    <>
      <head>
        <title>Signup</title>
        <meta name="description" content="Sign Up to WHP." />
      </head>
      <div className="register-block py-10 md:py-20">
        <div className="container">
          <div className="flex justify-center max-md:flex-col">
            <div className="border-line md:pr-[40px] lg:pr-[60px]">
              <form onSubmit={formik.handleSubmit}>
                <div className="heading4 text-center text-[#e26178]">
                  <AuthAnimation />
                  <h1 className="mb-5 text-center text-lg font-normal text-[#E26178]">
                    LOG IN TO WHP
                  </h1>
                </div>
                {!isOtpVerified ? renderOtpForm() : renderDetailsForm()}
              </form>
            </div>
          </div>
        </div>
        <div id="recaptcha-container"></div>
      </div>
    </>
  );
};

export default Login;
