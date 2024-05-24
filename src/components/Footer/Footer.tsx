"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import BookExchangeModal from "@/components/Other/BookExchangeModal";

const Footer = () => {
  const [appointmentModal, setAppointmentModal] = useState<boolean>(false);

  const handleOnClose = () => {
    setAppointmentModal(false);
  };

  return (
    <>
      <div id="footer" className="footer  text-rose-950">
        <div className="footer-main bg-gray-50">
          <div className="container">
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <div className="flex items-center gap-3 ">
                <Image
                  src={"/images/other/logo2.png"}
                  width={40}
                  height={40}
                  alt="80x80"
                  className=" object-fill"
                />
                <h1 className="text-rose-400 text-3xl ">whpjewellers</h1>
              </div>
              <div className="w-96 font-medium">
                <h3>
                  Crafting Timeless Elegance,One Jewel at a Time.Discover Your
                  Statement Piece Today.
                </h3>
              </div>
            </div>
            <div className="content-footer py-[60px] flex justify-between flex-wrap gap-y-8">
              <div className="company-infor basis-1/4 max-lg:basis-full pr-7">
                <div className="newsletter basis-1/3 pl-7 max-md:basis-full max-md:pl-0">
                  <div className="caption1  font-bold">
                    Subscribe for WhatsApp updates
                  </div>
                  <div className="input-block w-full h-[52px] mt-2 relative">
                    <form className="w-full h-full" action="post">
                      <input
                        type="email"
                        placeholder="Enter your e-mail"
                        className="caption1 w-full h-full pl-4 pr-14 border border-line"
                        required
                      />
                      <button className="w-[44px] h-[44px] bg-[#e26178] flex items-center justify-center absolute top-1 right-1">
                        <Icon.ArrowRight size={24} color="#fff" />
                      </button>
                    </form>
                  </div>
                  <div className="list-social flex items-center gap-6 mt-4">
                    <Link href={"https://www.facebook.com/"} target="_blank">
                      <div className="icon-facebook text-2xl text-black"></div>
                    </Link>
                    <Link href={"https://www.instagram.com/"} target="_blank">
                      <div className="icon-instagram text-2xl text-black"></div>
                    </Link>
                    <Link href={"https://www.youtube.com/"} target="_blank">
                      <div className="icon-youtube text-2xl text-black"></div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="right-content flex flex-wrap gap-y-8 basis-3/4 max-lg:basis-full ">
                <div className="list-nav flex justify-between basis-2/3 max-md:basis-full gap-4">
                  <div className="item flex flex-col basis-1/3 ">
                    <div className="text-button-uppercase pb-3">
                      Information
                    </div>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit"
                      href={"/contact"}
                    >
                      Stores
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2 "
                      href={"/contact"}
                    >
                      Contact us
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/career"}
                    >
                      Career
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/my-account"}
                    >
                      My Account
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/order-returns"}
                    >
                      Order & Returns
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/about-waman-hari-pethe-jewellers"}
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
                  <div className="item flex flex-col basis-1/3 ">
                    <div className="text-button-uppercase pb-3">Quick Shop</div>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit"
                      href={"#!"}
                    >
                      Chains
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"#!"}
                    >
                      Bangles
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"#!"}
                    >
                      Rings
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"#!"}
                    >
                      Necklaces
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/blog"}
                    >
                      Stones
                    </Link>
                  </div>
                  <div className="item flex flex-col basis-1/3 ">
                    <div className="text-button-uppercase pb-3">
                      Customer Services
                    </div>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit"
                      href={"/terms-and-condition"}
                    >
                      Terms & Conditions
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"#!"}
                    >
                      Shipping
                    </Link>
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
                </div>
                <div className="item flex flex-col md:ml-14 lg:ml-14">
                  <div className="text-button-uppercase pb-3">Contact</div>
                  <Link
                    className="caption1 has-line-before duration-300 w-fit"
                    href={"#!"}
                  >
                    1800-222-225
                  </Link>
                  <Link
                    className="caption1 has-line-before duration-300 w-fit pt-2"
                    href={"#!"}
                  >
                    care@whpjewellers.in
                  </Link>
                </div>
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
      </div>
    </>
  );
};

export default Footer;
