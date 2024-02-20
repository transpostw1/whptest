"use client"

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";

interface Props {
  // props: string;
  textColor: string;
}

const TopNavOne: React.FC<Props> = ({ textColor }) => {
  return (
    <>
      <div className={`banner-top style-four w-full  bg-red-950 py-2 `}>
        <div className="container flex items-center justify-center">
          <div className="sm:w-2/3 w-full h-full">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              modules={[Navigation, Autoplay]}
              className="h-full relative flex items-center justify-center bg"
              autoplay={{
                delay: 3000,
              }}
            >
              <SwiperSlide>
                <div
                  className={`text-button-uppercase px-8 text-center ${textColor}`}
                >
                  Get 10% off on selected items
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className={`text-button-uppercase px-8 text-center ${textColor}`}
                >
                  Free shipping on all orders over $50
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className={`text-button-uppercase px-8 text-center ${textColor}`}
                >
                  10% off on all summer essentials!
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className={`text-button-uppercase px-8 text-center ${textColor}`}
                >
                  Get summer-ready: 10% off swim suits
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className={`text-button-uppercase px-8 text-center ${textColor}`}
                >
                  10% off on all product on shop
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
