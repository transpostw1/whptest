"use client";
import React, { useEffect } from "react";
import ProductSlider from "@/components/Home1/ProductSlider";
import MobileMainCategorySwiper from "@/components/Home1/MobileMainCategorySwiper";
import MainCarousel from "@/components/Slider/MainCarousel";
import Explore from "@/components/Home1/Explore";
import BuyAgain from "@/components/Home1/BuyAgain";
import Category from "@/components/Home1/Category";
import RoseGold from "@/components/Home1/RoseGold";
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
import StickyNav from "@/components/Header/StickyNav";
import BenefitCalculator from "@/components/Home1/BenefitCalculator";

export default function Home() {
  const { products } = useProductContext();
  const logged= localStorage.getItem("isLoggedIn");

  return (
    <>
      <div className="overflow-x-hidden">
        <MobileMainCategorySwiper />
        <MainCarousel />
        <Explore />
        {/* <Collection /> */}
        <ProductSlider data={products} start={0} limit={6} />
        {logged === "true" && (
          <BuyAgain data={products} start={0} limit={6} />
        )}
        <WhpTv products={products} />
        <RoseGold />
        <Category />
        <GetFastDeliveryProducts data={products} start={7} limit={14} />
        <WhatWeOffer />
        <ShopGender />
        <PreciousGems />
        <Appointment />
        <Gifts />
        <GoldScheme />
        <SpecialOccasion />
        <BenefitCalculator/>
        <Reviews />
        {/* <WhpApp /> */}
      </div>
      <WhpApp />
      <StickyNav />
    </>
  );
}
