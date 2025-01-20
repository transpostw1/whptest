"use client";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useState, useEffect } from "react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import BookExchangeModal from "@/components/Other/BookExchangeModal";

const Appointment = () => {
  const [appointmentModal, setAppointmentModal] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(200);
  const [bannerwidth, setBannerWidth] = useState<number>(300);
  const [bannerheight, setBannerHeight] = useState<number>(200);
  useEffect(() => {
    const handleResize = () => {
      // Get the current viewport width
      const viewportWidth = window.innerWidth;

      if (viewportWidth < 768) {
        // Small screens
        setWidth(135);
        setHeight(43);
        setBannerWidth(170);
        setBannerHeight(298);
      } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Medium screens
        setWidth(170);
        setHeight(50);
        setBannerWidth(220);
        setBannerHeight(390);
      } else {
        // Large screens
        setWidth(290);
        setHeight(200);
        setBannerWidth(350);
        setBannerHeight(465);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleOnClose = () => {
    setAppointmentModal(false);
  };

  return (
    <>
      <div className="grid text-rose-950 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="bg-secondary2 flex items-center justify-start bg-gradient-to-r from-pink-100 to-gray-100 sm:h-full sm:py-10 md:h-full md:py-0 lg:h-full lg:py-0">
          <div className="flex flex-col md:items-start items-center gap-3 text-center sm:py-10 ml-6">
            <h2 className="text-red mt-5  text-left text-[20px] font-normal sm:text-center md:text-left md:text-4xl lg:text-[62px] lg:leading-[86.8px]">
              Visualize Your Perfect look!
            </h2>
            <div>
              <p className="mb-4  font-normal text-red-950 sm:text-center md:text-left">
                Try Before you Buy: Experience the Elegance of Our Jewellery in
                the Comfort of your Home.Book an appoinment with us today!
              </p>
              {width > 150 && (
                <h1 className="text-xl text-start font-semibold text-red-950">
                  Gold Exchange
                </h1>
              )}
              {width > 150 && (
                <p className="text-left font-normal text-red-950">
                  Trade your previous gold items for newer, more exquisite
                  pieces that better suit your evolving style.
                </p>
              )}
            </div>
            {width < 140 && (
              <div className="relative flex items-center justify-center">
                <div className="relative h-full w-full">
                  <Image
                    src="/images/other/image135.png"
                    alt=""
                    width={500}
                    height={500}
                    unoptimized
                  />
                </div>
                <div className="relative h-full w-full">
                  <Image
                    src="/images/other/image1366.png"
                    alt=""
                    width={500}
                    height={500}
                    unoptimized
                  />
                </div>
              </div>
            )}
            {width < 150 && (
              <h1 className="w-full text-center font-medium text-red-950">
                Gold Exchange
              </h1>
            )}
            {width < 150 && (
              <p className="text-center font-normal text-red-950">
                Trade your previous gold items for newer, more exquisite pieces
                that better suit your evolving style.
              </p>
            )}
            <div
              onClick={() => setAppointmentModal(true)}
              className="mb-20  mt-6 flex bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-3.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 sm:w-[251px] items-center justify-center"
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

        <div className="relative flex items-center justify-center">
          <div className="relative h-full w-full">
            <Image
              src="/images/other/image135.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </div>
          <div className="relative h-full w-full">
            <Image
              src="/images/other/image1366.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
