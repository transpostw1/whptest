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

  
  const targetMenu = allMenus.find((menu: any) => menu.id === "54");

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

  if (!isMobile || !targetMenu) {
    return null;
  }

  return (
    <div className="mb-2">
      <div className=" ">
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
          {targetMenu.subCategory.map((subItem: any, subIndex: number) => (
            <SwiperSlide
              key={subIndex}
              className="flex h-full w-full items-center justify-evenly text-rose-950"
            >
              <div className="flex flex-col items-center">
                {subItem.image && (
                  <Link
                    href={subItem.url}
                    onClick={() => setCustomcategory(subItem.label)}
                    className="mt-2 truncate text-center text-xs duration-300"
                  >
                    <Image
                      src={subItem.image}
                      alt={subItem.name}
                      width={65}
                      height={65}
                      className=""
                      sizes="65px"
                      quality={75}
                      loading="lazy"
                    />
                  </Link>
                )}
                <Link
                  href={subItem.url}
                  onClick={() => setCustomcategory(subItem.label)}
                  className="mt-2 truncate text-center text-xs duration-300"
                >
                  {subItem.name}
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MobileMainCategorySwiper;