"use client";

import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "@/utils/constants";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpVerification from "../OtpVerification";
import { useFormik } from "formik";
import { signup } from "@/utils/constants";
import Preloader from "@/components/Other/Preloader";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const Register = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const { logIn } = useUser();

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
    onSubmit: handleSignIn,
  });

  const getToken = () => {
    const token = localStorage.getItem("firebaseToken");
    if (token) {
      console.log("Retrieved token from local storage:", token);
      return token;
    } else {
      console.log("No token found in local storage.");
      return null;
    }
  };

  async function handleSignIn() {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        `${baseUrl}${signup}`,
        {
          ...formik.values,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      logIn();
      const localToken = response.data.token;
      localStorage.setItem("localtoken", localToken);
      console.log("initial token", localStorage.getItem("localtoken"));
      router.push("/");
    } catch (error: any) {
      console.error("Sign up error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  const handlePhoneChange = (value: string) => {
    const formattedPhoneNumber = value.startsWith("+") ? value : `+${value}`;
    setPhoneNumber(formattedPhoneNumber);
    formik.setFieldValue("phoneNumber", formattedPhoneNumber);
  };

  return (
    <div className="register-block py-10 md:py-20">
      <div className="container">
        <div className="flex justify-center max-md:flex-col">
          <div className="border-line md:pr-[40px] lg:pr-[60px]">
            <div className="heading4 text-center text-[#e26178]">
              SIGNUP TO WHP
            </div>

            <div className="mt-5 text-center font-semibold">
              <label htmlFor="email" className="text-center font-medium">
                ENTER PHONE NUMBER TO SIGN UP
              </label>
            </div>
            {!isOtpVerified && (
              <div>
                <PhoneInput
                  country={"in"}
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  containerClass="border h-full w-full rounded-lg"
                  inputStyle={{
                    marginTop: "1rem",
                    width: "100%",
                    height: "3rem",
                  }}
                  containerStyle={{
                    height: "3rem",
                    width: "100%",
                  }}
                  buttonStyle={{
                    height: "3rem",
                  }}
                  disabled={submitted}
                />
                <div className="block-button mt-4 md:mt-7">
                  <div className="mt-4">
                    <OtpVerification
                      phoneNumber={phoneNumber}
                      formikValues={formik.values}
                      onSubmit={formik.handleSubmit}
                      isRegisterPage={true}
                      onOtpVerified={() => setIsOtpVerified(true)}
                      errorMessage=""
                    />
                  </div>
                </div>
              </div>
            )}

            {isOtpVerified && (
              <form onSubmit={formik.handleSubmit} className="mt-4 md:mt-7">
                <div className="firstname">
                  <label htmlFor="firstName" className="font-medium">
                    First Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 px-4 pb-3 pt-3"
                    placeholder="First Name"
                    id="firstName"
                    type="text"
                    {...formik.getFieldProps("firstName")}
                    disabled={submitted}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-red-500">
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div className="lastname mt-5">
                  <label htmlFor="lastName" className="font-medium">
                    Last Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 px-4 pb-3 pt-3"
                    placeholder="Last Name"
                    id="lastName"
                    type="text"
                    {...formik.getFieldProps("lastName")}
                    disabled={submitted}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-red-500">{formik.errors.lastName}</div>
                  ) : null}
                </div>
                <div className="email mt-5">
                  <label htmlFor="email" className="font-medium">
                    Email Address
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 px-4 pb-3 pt-3"
                    placeholder="Email"
                    id="email"
                    type="email"
                    {...formik.getFieldProps("email")}
                    disabled={submitted}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="mt-5 w-full rounded-lg bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] py-2 font-medium text-white transition duration-300 hover:bg-[#e26178]"
                  disabled={loading}
                >
                  {loading ? <Preloader /> : <span>SIGN UP</span>}
                </button>
                {Error && (
                  <div className="mt-4 text-red-500">{Error}</div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
