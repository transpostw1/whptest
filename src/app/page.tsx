"use client";
import React, { useEffect } from "react";
import Hotjar from "@hotjar/browser";
import dynamic from "next/dynamic";
import "@/styles/styles.scss";

// Critical above-the-fold components - load immediately
import MobileMainCategorySwiper from "@/components/Home1/MobileMainCategorySwiper";
import MainCarousel from "@/components/Slider/MainCarousel";
import StickyNav from "@/components/Header/StickyNav";

// Non-critical components - load dynamically
const ProductSlider = dynamic(() => import("@/components/Home1/ProductSlider"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200" />,
  ssr: false
});

const Explore = dynamic(() => import("@/components/Home1/Explore"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});

const BuyAgain = dynamic(() => import("@/components/Home1/BuyAgain"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
  ssr: false
});

const Category = dynamic(() => import("@/components/Home1/Category"), {
  loading: () => <div className="h-48 animate-pulse bg-gray-200" />,
});

const RoseGold = dynamic(() => import("@/components/Home1/RoseGold"), {
  loading: () => <div className="h-48 animate-pulse bg-gray-200" />,
});

const GoldScheme = dynamic(() => import("@/components/Home1/GoldScheme"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});

const ShopByGender = dynamic(() => import("@/components/Home1/ShopByGender"), {
  loading: () => <div className="h-48 animate-pulse bg-gray-200" />,
});

const Appointment = dynamic(() => import("@/components/Home1/Appointment"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});

const Gifts = dynamic(() => import("@/components/Home1/Gifts"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});

const SpecialOccasion = dynamic(() => import("@/components/Home1/SpecialOccasion"), {
  loading: () => <div className="h-48 animate-pulse bg-gray-200" />,
});

const Reviews = dynamic(() => import("@/components/Home1/Reviews"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});

const GetFastDeliveryProducts = dynamic(() => import("@/components/Home1/GetFastDeliveryProducts"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
  ssr: false
});

const RecetlyViewProduct = dynamic(() => import("@/components/Home1/RecentlyViewProduct"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
  ssr: false
});

export default function Home() {
  let logged = null;
  if (typeof window !== "undefined") {
    logged = localStorage.getItem("isLoggedIn");
  }

  return (
    <>
      <div className="overflow-x-hidden">
        {/* Critical above-the-fold content */}
        <MobileMainCategorySwiper />
        <MainCarousel />
        
        {/* Below-the-fold content - loaded dynamically */}
        <Gifts />
        <GetFastDeliveryProducts />
        <Category />
        <ProductSlider />
        <SpecialOccasion />
        <ShopByGender />
        <RoseGold />
        <Explore />
        <BuyAgain />
        <RecetlyViewProduct />
        <Appointment />
        <GoldScheme />
        <Reviews />
      </div>
      <StickyNav />
    </>
  );
}
