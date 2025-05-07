"use client";
import React, { useEffect } from "react";
import Hotjar from "@hotjar/browser";
import ProductSlider from "@/components/Home1/ProductSlider";
import MobileMainCategorySwiper from "@/components/Home1/MobileMainCategorySwiper";
import MainCarousel from "@/components/Slider/MainCarousel";
import Explore from "@/components/Home1/Explore";
import BuyAgain from "@/components/Home1/BuyAgain";
import Category from "@/components/Home1/Category";
import RoseGold from "@/components/Home1/RoseGold";
import GoldScheme from "@/components/Home1/GoldScheme";
import ShopByGender from "@/components/Home1/ShopByGender";
import Appointment from "@/components/Home1/Appointment";
import Gifts from "@/components/Home1/Gifts";
import PreciousGems from "@/components/Home1/PreciousGems";
import SpecialOccasion from "@/components/Home1/SpecialOccasion";
import Reviews from "@/components/Home1/Reviews";
import WhpTv from "@/components/Home1/WhpTv";
import Whptv2 from "@/components/Home1/WhpTv2";
import GetFastDeliveryProducts from "@/components/Home1/GetFastDeliveryProducts";
import WhatWeOffer from "@/components/Home1/WhatWeOffer";
import RecetlyViewProduct from "@/components/Home1/RecentlyViewProduct";
import StickyNav from "@/components/Header/StickyNav";
import { NextSeo } from "next-seo";
import SEO from "../../next-seo.config"
import "@/styles/styles.scss";



export default function Home() {
  let logged = null;
  if (typeof window !== "undefined") {
    logged = localStorage.getItem("isLoggedIn");
  }

  // useEffect(() => {
  //   if (!document.getElementById("kenyt-chatbot-script")) {
  //     const script = document.createElement("script");
  //     script.src = "https://www.kenyt.ai/botapp/ChatbotUI/dist/js/bot-loader.js";
  //     script.type = "text/javascript";
  //     script.dataset.bot = "11799060"; 
  //     script.id = "kenyt-chatbot-script"; 
  //     document.body.appendChild(script);

  //     script.onload = () => {
  //       console.log("Kenyt.ai Chatbot script loaded!");
  //     };
  //   }
  // }, []); 
  return (
    <>
      {/* <Head>
        <title>Home - WHP Web</title>
        <meta
          name="descriptin"
          content="Welcome to WHP Web, your one-stop destination for exquisite jewelry and much more."
        />
      </Head> */}
      <div className="overflow-x-hidden">
        <MobileMainCategorySwiper />
        <MainCarousel />
        <Gifts />
     
        <ProductSlider />
        <BuyAgain />
        <RecetlyViewProduct />
        {/* <Whptv2 /> */}
        <RoseGold />
        <Category />
        <GetFastDeliveryProducts />
        <WhatWeOffer />
        <ShopByGender />
        {/* <PreciousGems /> */}
        <Appointment />
        <Explore />
        <GoldScheme />
        <SpecialOccasion />
        <Reviews />
        {/* <WhpApp /> */}
      </div>
      <StickyNav />
    </>
  );
}
