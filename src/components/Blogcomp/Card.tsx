import React, { useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { baseUrl } from "@/utils/constants";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import * as Yup from "yup";

const Card = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState<any>(null);

  const handleSubmit = async () => {
    event?.preventDefault();
    const response = await axios.post(`${baseUrl}/subscribe`, {
      phone: "+" + phoneNumber,
    });
    setMessage(response.data.message);
  };
  const validationSchema = Yup.object({
    phoneNumber: Yup.string().required("Phone number is required"),
  });
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        handleSubmit();
        setSubmitting(false);
      }, 400);
    },
  });
  return (
    <div className="mx-4 my-8 flex flex-col items-center border bg-[#FDF6F7] p-6 shadow-md md:flex-row md:items-start md:justify-between">
      <div className="w-full">
        <h2 className="mb-4 text-lg font-bold md:text-2xl">
          Always Stay in the Sparkling Loop
        </h2>
        <p className="mb-6 text-gray-600">
          Subscribe to our newsletter and be the first to access exclusive
          jewelry insights, style tips, and dazzling updates.
        </p>
        <div className="input-block relative mt-2 h-[52px]">
          <form
            className="flex justify-center lg:justify-start"
            action="post"
            onSubmit={handleSubmit}
          >
            <div className="caption1">
              <PhoneInput
                country={"in"}
                value={formik.values.phoneNumber}
                onChange={(value) => {
                  setPhoneNumber(value);
                  formik.handleChange("phoneNumber")(value);
                }}
                inputStyle={{ width: "250px" }}
                // containerClass="custom-phone-input"
              />
            </div>

            <button
              className="relative ms-[-2rem] flex items-center justify-center"
              type="submit"
            >
              <Icon.ArrowRight size={24} color="#e26178" />
            </button>
          </form>
        </div>
      </div>
      <div className="mt-6 flex justify-center md:mt-0 md:justify-end">
        <div className="relative">
          <span className="absolute -left-4 -top-4 text-[#E26178]">+</span>
          <span className="absolute -bottom-4 -right-4 text-[#E26178]">+</span>
          <div className="flex h-28 w-28 items-center justify-center rounded-full">
            <Image
              src="/images/blog/Vector.png"
              alt="abc"
              width={500}
              height={300}
              className="h-auto w-full object-cover"
            />
            {/* <img src="/images/blog/Vector.png" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
