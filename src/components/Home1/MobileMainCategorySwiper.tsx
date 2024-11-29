"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAllCategoryContext } from "@/context/AllCategoryContext";
import { useCategory } from "@/context/CategoryContex";
import Link from "next/link";

const MobileMainCategorySwiper = () => {
  const { categories } = useAllCategoryContext();
  const { setCustomcategory } = useCategory();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const handleChange = (e: any) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  if (!isMobile) {
    return null;
  }
  return (
    <div className="p-3">
      <Swiper
        slidesPerView={3.5}
        spaceBetween={10}
        breakpoints={{
          768: {
            slidesPerView: 6.5,
            spaceBetween: 20,
          },
        }}
      >
        {categories.map((data, index) => (
          <SwiperSlide key={index}>
            <div
              className="flex flex-col items-center justify-center"
              onClick={() => {
                const cleanUrl = data.url.split("=")[1]; // Assuming `data.url` is like "/products?url=c-earring"
                setCustomcategory(cleanUrl);
              }}
            >
              <Link
                href={{
                  pathname: "/products",
                  query: { url: data.url.split("=")[1] }, // Ensure `href` also uses the cleaned URL
                }}
              >
                <div className="rounded-full border shadow-sm">
                  <Image
                    src={data.menuImg}
                    alt={"pendant"}
                    width={65}
                    className="rounded-full"
                    height={65}
                    unoptimized
                  />
                </div>
              </Link>
              <p className="text-center text-[10px]">{data.name}</p>
            </div>
          </SwiperSlide>
        ))}

        <SwiperSlide>
          <div className="flex flex-col items-center justify-center">
            <Link
              href={{
                pathname: "/gifts",
              }}
            >
              <div className="rounded-full border shadow-sm">
                <Image
                  src={"images/other/Gift.png"}
                  alt={"Gifts"}
                  className="rounded-full p-2"
                  width={65}
                  height={65}
                  unoptimized
                />
              </div>
            </Link>
            <p className="text-center text-[10px]">Gifts</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center">
            <Link
              href={{
                pathname: "/benefit",
              }}
            >
              <div className="rounded-full border shadow-sm">
                <Image
                  src={"images/other/goldcoin.png"}
                  alt={"GMS"}
                  width={65}
                  className="rounded-full"
                  height={65}
                  unoptimized
                />
              </div>
            </Link>
            <p className="text-center text-[10px]">Gold Services</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MobileMainCategorySwiper;
