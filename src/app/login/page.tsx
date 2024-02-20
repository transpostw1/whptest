"use client";


import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import NavTwo from "@/components/Header/TopNav/NavTwo";
import NavHoverMenu from "@/components/Header/Menu/NavHoverMenu";
import { ParsedCountry } from "react-international-phone";

import { app } from "../config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  Auth,
} from "firebase/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any | null>(
    null
  ); 
  const [otpSent, setOtpSent] = useState(false);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [showModal, setShowModal] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");

  const auth: Auth = getAuth(app); 
  const router = useRouter();

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(auth,"recaptcha-container", {
      size: "invisible",

    });
    // Set the recaptchaVerifier instance on the window object
    (window as any).recaptchaVerifier = recaptchaVerifier;
  }, []); // Empty dependency array ensures effect runs only once

const handlePhoneNumberChange = (
  phone: string,
  meta: { country: ParsedCountry; inputValue: string }
) => {
  setPhoneNumber(phone);
};
  const handleOTPChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        (window as any).recaptchaVerifier // Using recaptchaVerifier from window object
      );
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber("");
      alert("OTP has been sent");
    } catch (error) {
      console.log(error);
    }
  };



  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleRequestOtp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const phoneValidation = validatePhone(phoneNumber); // Validate phoneNumber
    if (phoneValidation) {
      setPhoneError(phoneValidation);
    } else {
      setPhoneError("");
      setShowModal(true);
    }
  };

  const handleOtpSubmit = () => {
    const otpValidation = validateOtp(otp);
    if (otpValidation) {
      setOtpError(otpValidation);
    } else {
      setOtpError("");
      console.log("OTP submitted:", otp);
      setShowModal(false);
      setOtp("");
    }
  };

  const validatePhone = (phone: string) => {
    if (!phone) {
      return "Phone number is required";
    }
    if (phone.length < 5) {
      return "Phone number must be complete";
    }

    return "";
  };

  const validateOtp = (otp: string) => {
    if (!otp) {
      return "OTP is required";
    }else{
      router.push("/")
    }

    return "";
  };

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <NavTwo props="style-three bg-white" />
      <div id="header" className="w-full relative">
        <NavHoverMenu props="bg-white" />
      </div>
      <Breadcrumb heading="Login/Signup WHP" subHeading="Login" />
      <div className="login-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col justify-center">
            <div className=" md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <form className="md:mt-7 mt-4" onSubmit={handleRequestOtp}>
                <div className="flex items-center gap-3 mb-3">
                  <label className="">
                    <input
                      type="radio"
                      value="option1"
                      checked={selectedOption === "option1"}
                      onChange={handleOptionChange}
                      className="mr-2"
                    />
                    WhatsApp
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="option2"
                      checked={selectedOption === "option2"}
                      onChange={handleOptionChange}
                      className="mr-2"
                    />
                    SMS
                  </label>
                </div>
                <div className="phone ">
                  {!otpSent ? <div id="recaptcha-container"></div> : null}
                  <PhoneInput
                    defaultCountry="in"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Number Here !"
                    inputStyle={{ width: "100%" }}
                  />
                  {phoneError && <div className="text-red">{phoneError}</div>}
                </div>

                <div className="block-button md:mt-7 mt-4">
                  <button type="submit" className="p-2 rounded-xl bg-red" onClick={handleSendOtp}>
                    Send OTP
                  </button>
                </div>
              </form>
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center  ">
                  <div className="bg-white p-8 max-w-md rounded-lg border border-black">
                    <h2 className="text-lg font-semibold mb-4">Wait for OTP</h2>
                    <input
                      type="text"
                      value={otp}
                      onChange={handleOTPChange}
                      className="border border-gray-300 rounded px-3 py-2 mb-4"
                      placeholder="Enter OTP"
                    />
                    {otpError && <div className="text-red">{otpError}</div>}
                    <div className="flex justify-end">
                      <button
                        className="text-sm text-gray-500 mr-4"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="text-sm text-black  bg-pink hover:bg-red focus:ring-4 focus:outline-none font-medium px-4 py-2 rounded-lg "
                        onClick={ handleOtpSubmit} 
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

