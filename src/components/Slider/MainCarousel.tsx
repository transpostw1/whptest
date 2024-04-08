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
      <div className="slider-block style-one bg-linear 2xl:h-[500px] xl:h-[622px] lg:h-[562] md:h-[462px] sm:h-[382px] h-[302px] w-full">
        <div className="slider-main w-full h-full" >
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="h-full relative "
            autoplay={{
              delay: 6000,
            }}
          >
            <SwiperSlide>
              <div className="slider-item h-full w-full relative">
                <div className="container w-full h-full flex items-center">
                  <div className="sub-img absolute left-0 top-0 w-full h-full">
                    <Image
                      src={"/dummy/swiperImage.jpg"}
                      width={2560}
                      height={1080}
                      alt="1920x820"
                      className="absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    />
                  </div>
                </div>
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
