"use client";

import React, { useRef } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useCategory } from "@/context/CategoryContex";
import { motion } from "framer-motion";

const ShopByGender = () => {
  const { setCustomcategory } = useCategory();
  const swiperRef = useRef<any>();
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };
  let categories = [
    {
      id: 1,
      url: "gender-women",
      categoryUrl: "Women",
      type: "WOMEN'S JEWELLERY",
      description: "Earrings, Pendants, Bracelets and more",
      image: (
        <Image
          src={"/images/gender/womens.jpg"}
          alt="womengender"
          width={500}
          height={500}
          unoptimized
        />
      ),
    },
    {
      id: 2,
      url: "gender-men",
      categoryUrl: "Men",
      type: "MEN'S JEWELLERY",

      description: "Bracelets, Chains, Rings and more",
      image: (
        <Image
          src={"/images/gender/Mens.jpg"}
          alt="mensgender"
          width={500}
          height={1000}
          unoptimized
        />
      ),
    },
    {
      id: 3,
      url: "gender-kids",
      categoryUrl: "Kids",
      type: "KID'S JEWELLERY",
      description: "Anklets, Earrings, Bracelets and more",
      image: (
        <Image
          src={"/images/gender/Kids.jpg"}
          alt="kidsgender"
          width={500}
          height={1000}
          unoptimized
        />
      ),
    },
  ];
  return (
    <>
      <div className="mb-9 mt-8 w-full px-7 font-[500] text-[#39161C]">
        <div className="mb-4 flex justify-between">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="font-medium uppercase sm:text-[18px] lg:text-[32px]">
              Shop by gender
            </p>
          </motion.div>
          <div className="sm:block lg:hidden">
            <button onClick={() => swiperRef.current.slidePrev()}>
              <Icon.CaretLeft size={25} />
            </button>
            <button onClick={() => swiperRef.current.slideNext()}>
              <Icon.CaretRight size={25} />
            </button>
          </div>
        </div>
        <div className="list-product hide-product-sold section-swiper-navigation style-outline style-border">
          <Swiper
            spaceBetween={12}
            slidesPerView={1.5}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop={true}
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
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {categories.map((category) => (
              <SwiperSlide
                key={category.id}
                className="relative flex flex-col items-center gap-2 hover:shadow-lg"
              >
                <Link
                  href={`/products?url=${category.url}`}
                  className=""
                  onClick={() => setCustomcategory(category.categoryUrl)}
                >
                  <div className="">
                    {category.image}
                    {/* <div className="">
                      <p className="xs:text-lg md:text-[24px] text-center">
                        {category.type}
                      </p>
                    </div> */}
                  </div>
                </Link>
                {/* <h1 className="lg:text-xl md:text-lg font-medium sm:text-[18px]">{category.type}</h1>
                <p className="lg:text-[16px] sm:text-[12px] font-light">{category.description}</p>
                <Link
                  className="inline-flex items-center"
                  href={`/products?url=${category.url}`}
                  onClick={() => setCustomcategory(category.categoryUrl)}
                >
                  <span className="me-2 text-[#E26178] underline cursor-pointer text-sm">
                    View All
                  </span>
                  <span className="flex items-center">
                    <Image
                      src={"/images/icons/rightarrow.svg"}
                      alt="Right Arrow"
                      width={20}
                      height={20}
                    />
                  </span>
                </Link> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ShopByGender;
