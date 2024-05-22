"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

const dummyData = [
  {
    image: (
      <Image
        src={"/dummy/newArrivals.png"}
        alt={"newArrivals"}
        width={65}
        height={65}
        className=""
      />
    ),
    title: "New Arrivals",
  },
  {
    image: (
      <Image src={"/dummy/14KT.png"} alt={"14KT"} width={65} height={65} />
    ),
    title: "14 Karat",
  },
  {
    image: (
      <Image
        src={"/dummy/earring.png"}
        alt={"earring"}
        width={65}
        height={65}
      />
    ),
    title: "Earring",
  },
  {
    image: (
      <Image src={"/dummy/ring.png"} alt={"ring"} width={65} height={65} />
    ),
    title: "Ring",
  },
  {
    image: (
      <Image src={"/dummy/Chains.png"} alt={"chains"} width={65} height={65} />
    ),
    title: "Chain",
  },
  {
    image: (
      <Image
        src={"/dummy/pendant.png"}
        alt={"pendant"}
        width={65}
        height={65}
      />
    ),
    title: "Pendants",
  },
  {
    image: (
      <Image
        src={"/dummy/allJewellery.png"}
        alt={"pendant"}
        width={65}
        height={65}
      />
    ),
    title: "All Jewellery",
  },
  {
    image: (
      <Image
        src={"/dummy/allJewellery.png"}
        alt={"pendant"}
        width={65}
        height={65}
      />
    ),
    title: "Men's Jewellery",
  },
  {
    image: (
      <Image
        src={"/dummy/gold_service.png"}
        alt={"pendant"}
        width={65}
        height={65}
      />
    ),
    title: "Gifts",
  },
  {
    image: (
      <Image
        src={"/dummy/Gifts.png"}
        alt={"pendant"}
        width={65}
        height={65}
      />
    ),
    title: "Gold Service",
  },
];
const MobileMainCategorySwiper = () => {
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
        {dummyData.map((data, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col justify-center items-center">
              <div>{data.image}</div>
              <p className="text-center">{data.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MobileMainCategorySwiper;
