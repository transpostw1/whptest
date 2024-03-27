"use client"
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Zoom } from "swiper/modules";
import "swiper/css/bundle";
import Product from "../Product/Product";
import { ProductType } from "@/type/ProductType";

interface Props{
  data: ProductType[];
  start: number;
  limit: number;
}

const GetFastDeliveryProducts:React.FC<Props> = ({data,start,limit}) => {
    const filteredProducts = data;
  return (
    <>
      <div className="tab-features-block py-8 ">
        <div className="px-8">
          <div><p className="font-bold text-[1.5rem] font-[500] lg:text-3xl text-2xl text-[#0C0C0C]">GET IN 24-48 HRS</p></div>

          <div className="list-product  hide-product-sold section-swiper-navigation style-outline style-border md:mt-10 mt-6 ">
            <Swiper
              spaceBetween={12}
              slidesPerView={2}
              navigation
              loop={true}
              modules={[Navigation, Autoplay, Zoom]}
              zoom
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
                  spaceBetween: 30,
                },
              }}
            >
              {filteredProducts.slice(start, limit).map((prd, index) => (
                <SwiperSlide key={index}>
                  <Product data={prd} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  )
}

export default GetFastDeliveryProducts