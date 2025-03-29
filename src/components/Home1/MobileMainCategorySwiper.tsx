"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAllCategoryContext } from "@/context/AllCategoryContext";
import { useMainMenuContext } from "@/context/MainMenuContext";
import { useCategory } from "@/context/CategoryContex";
import Link from "next/link";

const MobileMainCategorySwiper = () => {
  const { categories } = useAllCategoryContext();
  const { setCustomcategory } = useCategory();
  const [isMobile, setIsMobile] = useState(false);
  const { allMenus } = useMainMenuContext();

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
        {allMenus.map((item: any, index: any) => (
          <SwiperSlide
            key={index}
            className="flex h-full w-full items-center justify-evenly text-rose-950"
          >
            <div className="flex flex-col items-center">
              <Image
                src={item.image}
                alt={item.name}
                width={65}
                className="rounded-full"
                height={65}
                unoptimized
              />
              <Link
                href={item.url}
                onClick={(e) => {
                  if (item.name.toLowerCase() === "all jewellery") {
                    e.preventDefault();
                  } else {
                    setCustomcategory(item.label);
                  }
                }}
                className="mt-2 text-center truncate text-xs duration-300"
              >
                {item.name}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MobileMainCategorySwiper;
