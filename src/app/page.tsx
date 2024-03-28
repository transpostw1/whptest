"use client"
import React, { useEffect } from "react";
import ProductSlider from "@/components/Home1/ProductSlider";
import MainCarousel from "@/components/Slider/MainCarousel";
import Explore from "@/components/Home1/Explore";
import Category from "@/components/Home1/Category";
import GoldScheme from "@/components/Home1/GoldScheme";
import ShopGender from "@/components/Home1/ShopGender";
import Appointment from "@/components/Home1/Appointment";
import Gifts from "@/components/Home1/Gifts";
import PreciousGems from "@/components/Home1/PreciousGems";
import SpecialOccasion from "@/components/Home1/SpecialOccasion";
import Reviews from "@/components/Home1/Reviews";
import WhpTv from "@/components/Home1/WhpTv";
import WhpApp from "@/components/Home1/WhpApp";
import { useProductContext } from "@/context/ProductContext";
import GetFastDeliveryProducts from "@/components/Home1/GetFastDeliveryProducts";
import WhatWeOffer from "@/components/Home1/WhatWeOffer";

export default function Home() {
  const { products, fetchData } = useProductContext();

  return (
    <>
      <MainCarousel />
      <Explore />
      {/* <Collection /> */}
      <ProductSlider data={products} start={0} limit={6} />
      <WhpTv products={products}/>
      <Category />
      <GetFastDeliveryProducts data={products} start={7} limit={14}/>
      <WhatWeOffer/>
      <ShopGender />
      <PreciousGems />
      <Appointment />
      <Gifts />
      <GoldScheme />
      <SpecialOccasion />
      <Reviews />
      {/* <WhpApp /> */}

    </>
  );
}
