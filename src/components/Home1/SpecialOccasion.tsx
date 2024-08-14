"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useCategory } from "@/context/CategoryContex";
import "swiper/css/bundle";
import { useRouter } from "next/navigation";
// import Fade from 'react-reveal'

const SpecialOccasion = () => {
  const router = useRouter();
  const { setCustomcategory } = useCategory();
  const handleTypeClick = (type: string) => {
    router.push(`/products?type=${type}`);
  };

  return (
    <>
      <div className="collection-block pt-10 md:pt-10">
        {/* <div className="container"> */}
        {/* <Fade bottom> */}
        {/* <div className="heading3 text-center">Special Occasion</div> */}
        <div className="flex flex-col justify-between gap-8 px-8 text-red-950">
          <h1 className="text-2xl md:text-3xl lg:text-5xl">
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
        <div className="list-collection section-swiper-navigation mt-6 px-4 sm:px-5 md:mt-10">
          <Swiper
            spaceBetween={12}
            slidesPerView={1.5}
            // navigation
            modules={[Navigation, Autoplay]}
            breakpoints={{
              576: {
                slidesPerView: 1.5,
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
              <Link
                href={{ pathname: "/products", query: { url: "o-everyday" } }}
               
              >
                <div
                  className="collection-item relative block cursor-pointer overflow-hidden rounded-2xl"
                  onClick={() => {
                    handleTypeClick("");
                    setCustomcategory("Everyday");
                  }}
                >
                  <div className="bg-img">
                    <Image
                      src={"/images/other/WHP_Everyday_Wear.jpg"}
                      width={1000}
                      height={600}
                      alt=""
                    />
                  </div>
                  <div className="collection-name heading7 w-[100px] rounded-xl bg-transparent py-1.5 text-center duration-500 sm:bottom-8 md:w-[160px] md:py-3 lg:w-[200px]">
                    Everday Wear
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href={{ pathname: "/products", query: { url: "o-officeWear" } }}
              >
                <div
                  className="collection-item relative block cursor-pointer overflow-hidden rounded-2xl"
                  onClick={() => {
                    handleTypeClick("top");
                    setCustomcategory("o-Ofice_Wear");
                  }}
                >
                  <div className="bg-img">
                    <Image
                      src={"/images/other/WHP_Office_Wear.jpg"}
                      width={1000}
                      height={600}
                      alt=""
                    />
                  </div>
                  <div className="collection-name heading7 sm:heading-8 w-[100px] rounded-xl bg-transparent py-1.5 text-center duration-500 sm:bottom-8 md:w-[160px] md:py-3 lg:w-[200px]">
                    Office Wear
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href={{
                  pathname: "/products",
                  query: { url: "o-Wedding_Wear" },
                }}
              >
                <div
                  className="collection-item relative block cursor-pointer overflow-hidden rounded-2xl"
                  onClick={() => {
                    handleTypeClick("sets");
                    setCustomcategory("wedding_wear");
                  }}
                >
                  <div className="bg-img">
                    <Image
                      src={"/images/other/WHP_Wedding_Wear.jpg"}
                      width={1000}
                      height={600}
                      alt=""
                    />
                  </div>
                  <div className="collection-name heading7 bottom-4 w-[100px] rounded-xl bg-transparent py-1.5 text-center duration-500 sm:bottom-8 md:w-[160px] md:py-3 lg:w-[200px]">
                    Wedding Wear
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href={{ pathname: "/products", query: { url: "o-Party_Wear" } }}
              >
                <div
                  className="collection-item relative block cursor-pointer overflow-hidden rounded-2xl"
                  onClick={() => {
                    handleTypeClick("outerwear");
                    setCustomcategory("o-party_wear");
                  }}
                >
                  <div className="bg-img">
                    <Image
                      src={"/images/other/WHP_Party_Wear.jpg"}
                      width={1000}
                      height={600}
                      alt=""
                    />
                  </div>
                  <div className="collection-name heading7 bottom-4 w-[100px] rounded-xl bg-transparent py-1.5 text-center duration-500 sm:bottom-8 md:w-[160px] md:py-3 lg:w-[200px]">
                    Party Wear
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            {/* <SwiperSlide>
              <div
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
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
                <div className="collection-name heading7 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  Wedding Collection{" "}
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
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
                <div className="collection-name heading7 sm:heading-8 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  Self Gifting Treasure
                </div>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SpecialOccasion;
