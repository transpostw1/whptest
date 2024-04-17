"use client"

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";

interface Props {
  textColor: string;
}

const TopNavOne: React.FC<Props> = ({ textColor }) => {
  return (
    <>
      <div className={`banner-top style-four w-full  bg-rose-950 h-[25px]`}>
        <div className="container flex items-center justify-center align-middle">
          <div className="sm:w-2/3 w-full h-full">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              modules={[Navigation, Autoplay]}
              className="h-[50%] relative flex items-center justify-center bg"
              autoplay={{
                delay: 3000,
              }}
            >
              <SwiperSlide>
                <div
                  className={`text-button-uppercase px-8 text-white ${textColor}`}
                >
                 Welcome to WHP Jewellers
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className={`text-button-uppercase px-8 text-white ${textColor}`}
                >
                 Something Special For Everyone
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className={`text-button-uppercase px-8 text-white ${textColor}`}
                >
                  10% off on all products
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopNavOne;
