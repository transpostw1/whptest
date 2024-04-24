"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";

const MainCarousel = () => {
  return (
    <>
      <div className="slider-block bg-linear w-full relative">
      <div className="slider-main w-full">
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      modules={[Pagination, Autoplay]}
      
      autoplay={{ delay: 6000 }}
    >
      <SwiperSlide>
            <div className="slider-item w-full">
              <Image
                src="/images/slider/SliderFour.png"
                alt="Hero Image"
                width={1920}
                height={1080}
                layout="responsive"
                priority
              />
            </div>
      </SwiperSlide>
            {/* <SwiperSlide>
              <div className="slider-item h-full w-full relative">
                <div className="container w-full h-full flex items-center">
                  <div className="sub-img absolute left-0 top-0 w-full h-full z-[-1]">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                    >
                      <source
                        src="/images/other/banner_video_4.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-item h-full w-full relative">
                <div className="container w-full h-full flex items-center">
                  <div className="sub-img absolute left-0 top-0 w-full h-full z-[-1]">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                    >
                      <source
                        src="/images/other/banner_video_3.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default MainCarousel;
