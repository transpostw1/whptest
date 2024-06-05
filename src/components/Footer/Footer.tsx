"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import BookExchangeModal from "@/components/Other/BookExchangeModal";
import { useUser } from "@/context/UserContext";
import { useCategory } from "@/context/CategoryContex";
import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import OtpVerification from "@/app/OtpVerification";
import * as Yup from "yup";
import FlashAlert from "@/components/Other/FlashAlert";
import axios from "axios";
import { baseUrl } from "@/utils/constants";
import Extendedfooter from "./Extendedfooter";

const Footer = () => {
  const [appointmentModal, setAppointmentModal] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState<any>(null);
  const { setCustomcategory } = useCategory();
  const { isLoggedIn } = useUser();
  const handleOnClose = () => {
    setAppointmentModal(false);
  };
  const handleChange = (event: any) => {
    const { value } = event.target;
    // Optional: Add phone number validation logic here
    setPhoneNumber(value);
  };

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
    validationSchema: validationSchema, // Pass the validation schema
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        handleSubmit();
        setSubmitting(false);
      }, 400);
    },
  });

  return (
    <>
      <div id="footer" className="footer  text-rose-950 ">
        <div className="footer-main  bg-gray-50">
          <div className="container py-4 ">
            <div className="flex  gap-3 items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href={"/"}>
                  <Image
                    src={"/images/other/main_logo.png"}
                    width={40}
                    height={40}
                    alt="80x80"
                    className=" object-cover"
                  />
                </Link>
                <div>
                  <Link href={"/"}>
                    <Image
                      src={"/images/other/whp_name_logo.png"}
                      width={170}
                      height={80}
                      alt="80x80"
                      className=" object-cover"
                    />
                  </Link>
                </div>
              </div>
              <div className="w-96 ">
                <p>
                  Crafting Timeless Elegance,One Jewel at a Time.Discover Your
                  Statement Piece Today.
                </p>
              </div>
            </div>
            <div className="py-[60px] flex lg:flex-row flex-col justify-between gap-4">
              <div className="company-infor">
                <div className="newsletter ">
                  <div className="caption1  font-semibold text-center lg:text-start">
                    Subscribe for WhatsApp updates
                  </div>
                  {/* <div className="input-block  mt-2 relative">
                    <form
                      className="flex justify-center lg:justify-start"
                      action="post"
                      onSubmit={handleSubmit}
                    >
                      <div className="caption1 bg-white">
                        <PhoneInput
                          country={"in"}
                          value={formik.values.phoneNumber}
                          onChange={(value) => {
                            setPhoneNumber(value);
                            formik.handleChange("phoneNumber")(value);
                          }}
                          // containerClass="custom-phone-input"
                        />
                      </div>

                      <button
                        className="w-[30px] h-[34px] bg-[#e26178] flex items-center justify-center "
                        type="submit"
                      >
                        <Icon.ArrowRight size={24} color="#fff" />
                      </button>
                    </form>
                  </div> */}
                  <div className="input-block h-[52px] mt-2 relative">
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
                          // containerClass="custom-phone-input"
                        />
                      </div>

                      <button
                        className=" flex items-center justify-center relative ms-[-2rem] "
                        type="submit"
                      >
                        <Icon.ArrowRight size={24} color="#e26178" />
                      </button>
                    </form>
                  </div>
                  <div className="list-social flex items-center lg:justify-start justify-center gap-6 mt-4">
                    <Link
                      href={"https://www.facebook.com/whpjewellers.india/"}
                      target="_blank"
                    >
                      {" "}
                      <Icon.FacebookLogo size={34} weight="light" />
                    </Link>
                    <Link
                      href={
                        "https://www.youtube.com/channel/UCAdFm3-Ti3qSLABysgFJAzg"
                      }
                      target="_blank"
                    >
                      <Icon.YoutubeLogo size={34} weight="light" />
                    </Link>
                    <Link
                      href={"https://www.instagram.com/whpjewellers/?hl=en"}
                      target="_blank"
                    >
                      <Icon.InstagramLogo size={32} weight="light" />
                    </Link>
                    <Link
                      href={
                        "https://www.youtube.com/channel/UCAdFm3-Ti3qSLABysgFJAzg"
                      }
                      target="_blank"
                    >
                      <Icon.WhatsappLogo size={34} weight="light" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row w-full justify-center">
                <div className="list-nav flex flex-col lg:flex-row w-full justify-between gap-5 ">
                  <div className="flex flex-col w-full items-center lg:items-start ">
                    <div className="font-semibold ">Know WHP</div>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"#!"}
                      onClick={() => setAppointmentModal(true)}
                    >
                      Career
                    </Link>
                    {appointmentModal && (
                      <BookExchangeModal closeModal={handleOnClose} />
                    )}
                    {isLoggedIn ? (
                      <Link
                        className="caption1 has-line-before duration-300 w-fit pt-2"
                        href={"/profile"}
                      >
                        My Account
                      </Link>
                    ) : (
                      <Link
                        className="caption1 has-line-before duration-300 w-fit pt-2"
                        href={"/login"}
                      >
                        My Account
                      </Link>
                    )}

                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/profile"}
                    >
                      Order & Returns
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/about-whpjewellers"}
                    >
                      About-Us
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/faqs"}
                    >
                      FAQs
                    </Link>
                  </div>

                  <div className="item flex flex-col w-full items-center lg:items-start ">
                    <div className="font-semibold">Quick Shop</div>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit"
                      href={{ pathname: "/products", query: { url: "chain" } }}
                      onClick={() => setCustomcategory("chain")}
                    >
                      Chains
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={{ pathname: "/products", query: { url: "bangle" } }}
                      onClick={() => setCustomcategory("bangle")}
                    >
                      Bangles
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={{ pathname: "/products", query: { url: "ring" } }}
                      onClick={() => setCustomcategory("ring")}
                    >
                      Rings
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={{
                        pathname: "/products",
                        query: { url: "necklace" },
                      }}
                      onClick={() => setCustomcategory("necklace")}
                    >
                      Necklaces
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={{ pathname: "/products", query: { url: "stone" } }}
                      onClick={() => setCustomcategory("stone")}
                    >
                      Stones
                    </Link>
                  </div>
                  <div className="item flex flex-col items-center lg:items-start w-full">
                    <div className="font-semibold ">Customer Services</div>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit"
                      href={"/terms-and-condition"}
                    >
                      Terms & Conditions
                    </Link>
                    {/* <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"#!"}
                    >
                      Shipping
                    </Link> */}
                    <a
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/terms-and-condition#privacyPolicy"}
                    >
                      Privacy Policy
                    </a>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/terms-and-condition#returnandRefund"}
                    >
                      Return & Refund
                    </Link>
                    <div
                      className="caption1 has-line-before duration-300 w-fit pt-2 cursor-pointer"
                      onClick={() => setAppointmentModal(true)}
                    >
                      Book,Exchange and BuyBack
                    </div>
                    {appointmentModal && (
                      <BookExchangeModal closeModal={handleOnClose} />
                    )}
                  </div>
                  <div className="item flex flex-col items-center lg:items-start w-full">
                    <div className="font-semibold ">Contact</div>
                    <Link
                      href="tel:+91 1800-222-225"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="mt-1 flex">
                        <span>1800-222-225</span>
                      </div>
                    </Link>
                    <Link
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=care@whpjewellers.in"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="mt-1 flex">
                        <span>care@whpjewellers.in</span>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* <div className="item flex flex-col lg:justify-start justify-center lg:items-start items-center mt-5 md:mt-0  ">
                  <div className="font-semibold">Contact</div>
                  <Link
                    href="tel:+91 1800-222-225"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="mt-1 flex">
                      <span>1800-222-225</span>
                    </div>
                  </Link>
                  <Link
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=care@whpjewellers.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="mt-1 flex">
                      <span>care@whpjewellers.in</span>
                    </div>
                  </Link>
                </div> */}
              </div>
            </div>
            <div className="py-3 flex items-center justify-center gap-5 max-lg:justify-center max-lg:flex-col border-t border-line ">
              <div className="left flex items-center gap-8">
                <div className="copyright caption1 text-secondary">
                  ©2023 WHP Jewellers Ecommerce Pvt.Ltd.All Rights Reserved.
                </div>
                <div className="select-block flex items-center gap-5 max-md:hidden"></div>
              </div>
            </div>
          </div>
        </div>
        <Extendedfooter/>
      </div>
      {message && <FlashAlert message={message} type={"success"} />}
    </>
  );
};

export default Footer;
