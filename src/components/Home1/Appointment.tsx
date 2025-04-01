"use client";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useState, useEffect } from "react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import BookExchangeModal from "@/components/Other/BookExchangeModal";

const Appointment = () => {
  const [appointmentModal, setAppointmentModal] = useState<boolean>(false);
  const handleOnClose = () => {
    setAppointmentModal(false);
  };
  return (
    <div className="flex flex-col items-center justify-between bg-gradient-to-r from-pink-100 to-gray-100 md:flex-row">
      <div className="md:w-1/2">
        {/* <h2 className="text-red text-left text-[20px] sm:text-center md:text-left md:text-2xl lg:text-[55px] lg:leading-[86.8px]"> */}
        <div className="px-7">
          <h2 className="py-5 text-center text-3xl leading-tight md:py-5 md:text-start md:text-[55px] md:leading-[65px]">
            Visualize your perfect look!
          </h2>
          <div>
            <p className="text-center md:text-start">
              Try Before you Buy: Experience the elegance of our jewellery in
              the comfort of your home.Book an appoinment with us today!
            </p>
            <div className="md:hidden">
              <img
                src="/images/other/Visualize.jpg"
                alt=""
                className="object-contain"
               
              />
            </div>
            <div className="flex w-full items-center py-4 md:items-start">
              {/* <h1 className="text-center text-xl font-semibold text-red-950 md:text-start">
                Gold Exchange
              </h1>
              <p className="py-1 text-center font-normal text-red-950 md:text-start">
                Trade your previous gold items for newer, more exquisite pieces
                that better suit your evolving style.
              </p> */}
              <div
                onClick={() => setAppointmentModal(true)}
                className="my-2 flex cursor-pointer items-center justify-center bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 sm:w-[251px]"
              >
                <button
                  type="button"
                  className="text-sm font-medium md:text-[18px]"
                >
                  Book Appointment
                </button>
                <HiOutlineArrowLongRight className="ml-1" size={20} />
              </div>
              <div
                onClick={() => setAppointmentModal(true)}
                className="my-2 ml-2 flex cursor-pointer items-center justify-center bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 sm:w-[251px]"
              >
                <button
                  type="button"
                  className="text-sm font-medium md:text-[18px]"
                >Virtual Try-ON</button>
                <HiOutlineArrowLongRight className="ml-1" size={20} />
              </div>
              {appointmentModal && (
                <BookExchangeModal
                  title={"Book Your Appointment"}
                  closeModal={handleOnClose}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2">
        <img
          src="/images/other/Visualize.jpg"
          alt=""
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Appointment;
