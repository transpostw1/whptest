"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Zoom } from "swiper/modules";
import "swiper/css/bundle";
import Product from "../Product/Product";
import { ProductType } from "@/type/ProductType";
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface Props {
  data: ProductType[];
  start: number;
  limit: number;
}

const GetFastDeliveryProducts: React.FC<Props> = ({ data, start, limit }) => {
  const swiperRef = useRef<any>();
  const filteredProducts = data;

  return (
    <>
      <div className="tab-features-block pt-4">
        <div className="container">
          <div className="flex justify-between">
            <div>
              <p className="font-bold text-[1.5rem]">GET IN 24-48 HRS</p>
            </div>
            <div className="flex">
              <button onClick={() => swiperRef.current.slidePrev()}>
                <Icon.CaretLeft size={30}/>
              </button>
              <button onClick={() => swiperRef.current.slideNext()}>
                <Icon.CaretRight size={30}/>
              </button>
            </div>
          </div>

          <div className="list-product  hide-product-sold section-swiper-navigation style-outline style-border md:mt-10 mt-6 ">
            <Swiper
              spaceBetween={12}
              slidesPerView={1.5}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              loop={true}
              modules={[Navigation, Autoplay, Zoom]}
              zoom
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
  );
};

export default GetFastDeliveryProducts;
