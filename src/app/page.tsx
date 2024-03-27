import React from "react";
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
import WhpApp from "@/components/Home1/WhpApp";
import productData from "@/data/Products.json";

export default function Home() {
  return (
    <>
      <MainCarousel />
      <Explore />
      {/* <Collection /> */}
      <ProductSlider data={productData} start={0} limit={6} />
      <Category />
      <ShopGender />
      <PreciousGems />
      <Appointment />
      <Gifts />
      <GoldScheme />
      <SpecialOccasion />
      <Reviews />
      <WhpApp/>
      
    </>
  );
}
