"use client";

// import React, { useState, useEffect, ChangeEvent } from "react";
// import TopNavOne from "@/components/Header/TopNav/TopNavOne";
// import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
// import Footer from "@/components/Footer/Footer";
// import NavTwo from "@/components/Header/TopNav/NavTwo";
// import NavHoverMenu from "@/components/Header/Menu/NavHoverMenu";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// import { useRouter } from "next/navigation";
// import OtpVerification from "../OtpVerification";

// const Login = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const router = useRouter();

//   return (
//     <>
//       <TopNavOne textColor="text-white" />
//       <NavTwo props="style-three bg-white" />
//       <div id="header" className="w-full relative">
//         <NavHoverMenu props="bg-white" />
//       </div>
//       <Breadcrumb heading="Login/Signup WHP" subHeading="Login" />
//       <div className="login-block md:py-20 py-10">
//         <div className="container">
//           <div className="content-main flex gap-y-8 max-md:flex-col justify-center">
//             <div className=" md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
//               <div className="phone">
//                 <PhoneInput
//                   country={"in"}
//                   value={phoneNumber}
//                   onChange={setPhoneNumber}
//                 />
//               </div>
//               <div className="mt-4">
//                 <OtpVerification
//                   phoneNumber={phoneNumber}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useFormik } from "formik";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Footer from "@/components/Footer/Footer";
import NavTwo from "@/components/Header/TopNav/NavTwo";
import NavHoverMenu from "@/components/Header/Menu/NavHoverMenu";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpVerification from "../OtpVerification";
import * as Yup from 'yup';



const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");




    const validationSchema = Yup.object({
      phoneNumber: Yup.string()
        .required("Phone number is required")
        // .matches(/^\+[1-9]\d{1,14}$/, "Invalid phone number"),
    });
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: validationSchema, // Pass the validation schema
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        console.log(values);
        setSubmitting(false);
      }, 400);
    },
  });


  return (
    <>
      {/* <TopNavOne textColor="text-white" />
      <NavTwo props="style-three bg-white" />
      <div id="header" className="w-full relative">
        <NavHoverMenu props="bg-white" />
      </div> */}
      <div className="login-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col justify-center ">
            <div className="flex justify-center w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <form onSubmit={formik.handleSubmit}>
                <div className="phone">
                  <h1 className="font-medium text-center">
                    ENTER PHONE NUMBER TO LOGIN
                  </h1>
                  <PhoneInput
                    country={"in"}
                    value={formik.values.phoneNumber}
                    onChange={(value) => {
                      setPhoneNumber(value);
                      formik.handleChange("phoneNumber")(value);
                    }}
                  />
                  {/* {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    // <div className="text-red-500">
                    //   {formik.errors.phoneNumber}
                    // </div>
                  ) : null} */}
                </div>
                <div className="mt-4">
                  <OtpVerification
                    phoneNumber={phoneNumber}
                    formikValues={formik.values}
                    errorMessage={formik.errors.phoneNumber}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
