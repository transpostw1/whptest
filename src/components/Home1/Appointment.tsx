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
        <h2 className=" md:py-5 py-5 md:text-[55px] text-3xl leading-tight md:leading-[65px] md:text-start text-center">
          Visualize your perfect look!
        </h2>
        <div>
          <p className="md:text-start text-center">
            Try Before you Buy: Experience the elegance of our jewellery in the
            comfort of your home.Book an appoinment with us today!
          </p>
          <div className="md:hidden  ">
        <img
          src="/images/other/Visualize.jpg"
          alt=""
          className="object-contain "
          // unoptimized
        />
      </div>
          <div className="py-4 flex flex-col items-center md:items-start">
            <h1 className="md:text-start text-center text-xl font-semibold text-red-950">
              Gold Exchange
            </h1>
            <p className="md:text-start text-center font-normal text-red-950 py-1">
              Trade your previous gold items for newer, more exquisite pieces
              that better suit your evolving style.
            </p>
            <div
              onClick={() => setAppointmentModal(true)}
              className="my-2 flex bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 sm:w-[251px] items-center justify-center"
            >
              <button type="button" className="text-[18px] font-medium ">
                Book Appointment
              </button>
              <HiOutlineArrowLongRight className="ml-1 mt-1" size={20} />
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
      <div className="md:w-1/2 md:block hidden">
        <img
          src="/images/other/Visualize.jpg"
          alt=""
          className="object-contain"
          unoptimized
        />
      </div>
    </div>
  );
};

export default Appointment;
