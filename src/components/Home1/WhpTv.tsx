"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
// import Fade from 'react-reveal'

const SpecialOccasion = () => {
  const router = useRouter();

  const handleTypeClick = (type: string) => {
    router.push(`/shop/breadcrumb1?type=${type}`);
  };

  return (
    <>
      <div className="collection-block md:pt-20 pt-10">
        {/* <div className="container"> */}
        {/* <Fade bottom> */}
        {/* <div className="heading3 text-center">Special Occasion</div> */}
        <div className="flex flex-col justify-between text-red-950 gap-8 px-8">
          <h1 className="text-5xl">
            Something special for <br /> Every Occasion
          </h1>
          <p className="font-medium text-gray-700">
            Crafted to add a touch of elegance and charm to every occasion. From
            celebrations to <br />
            cherished milestones, find the perfect piece that speaks to your
            unique style and sentiments.
          </p>
        </div>
        {/* </Fade> */}
        {/* </div> */}
        <div className="list-collection section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4">
          <Swiper
            spaceBetween={12}
            slidesPerView={2}
            // navigation
            loop={true}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              576: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="h-full"
          >
            <SwiperSlide>
              <Link href="/videoSlider">
                <div
                  className="collection-item block relative overflow-hidden cursor-pointer"
                  onClick={() => handleTypeClick("")}
                >
                  <div className="bg-img">
                    <Image
                      src={"/images/other/Occassion1.png"}
                      width={1000}
                      height={600}
                      alt=""
                    />
                  </div>
                  <div className="collection-name bg-[#f7f7ff7] heading7 text-center sm:bottom-8  lg:w-[150px] md:w-[160px] w-[100px] md:py-3 py-1.5 duration-500">
                    <span className="flex justify-center">
                      <span>Watch</span>
                      <span className="">
                        <Icon.Play weight="fill" color="#e26178" size={20} />
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("top")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion2.png"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name bg-[#f7f7ff7] heading7 text-center sm:bottom-8  lg:w-[150px] md:w-[160px] w-[100px] md:py-3 py-1.5 duration-500">
                  <span className="flex justify-center">
                    <span>Watch</span>
                    <span className="">
                      <Icon.Play weight="fill" color="#e26178" size={20} />
                    </span>
                  </span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("sets")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion3.png"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name bg-[#f7f7ff7] heading7 text-center sm:bottom-8  lg:w-[150px] md:w-[160px] w-[100px] md:py-3 py-1.5 duration-500">
                  <span className="flex justify-center">
                    <span>Watch</span>
                    <span className="">
                      <Icon.Play weight="fill" color="#e26178" size={20} />
                    </span>
                  </span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("outerwear")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion4.png"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name bg-[#f7f7ff7] heading7 text-center sm:bottom-8  lg:w-[150px] md:w-[160px] w-[100px] md:py-3 py-1.5 duration-500">
                  <span className="flex justify-center">
                    <span>Watch</span>
                    <span className="">
                      <Icon.Play weight="fill" color="#e26178" size={20} />
                    </span>
                  </span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("underwear")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion2.png"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name bg-[#f7f7ff7] heading7 text-center sm:bottom-8  lg:w-[150px] md:w-[160px] w-[100px] md:py-3 py-1.5 duration-500">
                  <span className="flex justify-center">
                    <span>Watch</span>
                    <span className="">
                      <Icon.Play weight="fill" color="#e26178" size={20} />
                    </span>
                  </span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("t-shirt")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion3.png"}
                    width={1000}
                    height={600}
                    alt="gift"
                  />
                </div>
                <div className="collection-name bg-[#f7f7ff7] heading7 text-center sm:bottom-8  lg:w-[150px] md:w-[160px] w-[100px] md:py-3 py-1.5 duration-500">
                  <span className="flex justify-center">
                    <span>Watch</span>
                    <span className="">
                      <Icon.Play weight="fill" color="#e26178" size={20} />
                    </span>
                  </span>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SpecialOccasion;
