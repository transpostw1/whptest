"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import OtpVerification from "../OtpVerification";
import Link from "next/link";
import AuthAnimation from "../AuthAnimation";
import * as Yup from "yup";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const validationSchema = Yup.object({
    phoneNumber: Yup.string().required("Phone number is required")
    // .matches(/^\+[1-9]\d{1,14}$/, "Invalid phone number"),
  });
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
      }, 400);
    },
  });
  const handlekeyPress = (e: any) => {
    if (e.key === "Enter") {
      console.log("function isexcuted", e.target.value);
      const value = e.target.value;
      setPhoneNumber(value);
      formik.handleChange("phoneNumber")(value);
    }
  };

  return (
    <>
      <div className="login-block py-10 md:py-20">
        <div className="container">
          <div className="content-main flex justify-center gap-y-8 max-md:flex-col">
            <div className="border-linez flex w-full justify-center md:pr-[40px] lg:pr-[60px]">
              <form onSubmit={formik.handleSubmit}>
                <div className="phone flex flex-col content-center items-center justify-center">
                  <div>
                    <AuthAnimation/>
                    <h1 className="mb-5 text-center font-normal text-[#E26178]">
                     LOGIN TO WHP
                    </h1>
                  </div>
                  <div className="mb-4">                   
                    <PhoneInput
                      defaultCountry="in"
                      value={formik.values.phoneNumber}
                      inputClassName="border h-full w-[250px] rounded-xl"
                      placeholder="Enter your mobile number"
                      onChange={(value) => {
                        setPhoneNumber(value);
                        formik.handleChange("phoneNumber")(value);
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <OtpVerification
                    phoneNumber={phoneNumber}
                    formikValues={formik.values}
                    errorMessage={formik.errors.phoneNumber}
                    onSubmit={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    isRegisterPage={false}
                  />
                </div>
                <h2 className="text-center text-xs mt-3">
                  New to WHP?{" "}
                  <span className="cursor-pointer text-[#E26178] text-sm hover:underline ">
                    <Link href={"/register"}>Create an Account</Link>
                  </span>
                </h2>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
