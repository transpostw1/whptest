"use client";
import React, { useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import "@/styles/styles.scss";

// Critical above-the-fold components - load immediately with highest priority
import MobileMainCategorySwiper from "@/components/Home1/MobileMainCategorySwiper";
import StickyNav from "@/components/Header/StickyNav";

// HIGH PRIORITY: Load MainCarousel with Suspense for better LCP
const MainCarousel = dynamic(() => import("@/components/Slider/MainCarousel"), {
  loading: () => (
    <div className="w-full h-96 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
      <div className="text-gray-500">Loading...</div>
    </div>
  ),
  ssr: true // Enable SSR for LCP element
});

// MEDIUM PRIORITY: Essential components loaded after LCP
const Gifts = dynamic(() => import("@/components/Home1/Gifts"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg mx-4" />,
  ssr: true
});

const Category = dynamic(() => import("@/components/Home1/Category"), {
  loading: () => <div className="h-48 bg-gray-100 animate-pulse rounded-lg mx-4" />,
  ssr: true
});

// LOW PRIORITY: Below-the-fold components - load on demand
const ProductSlider = dynamic(() => import("@/components/Home1/ProductSlider"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg mx-4" />,
  ssr: false
});

const GetFastDeliveryProducts = dynamic(() => import("@/components/Home1/GetFastDeliveryProducts"), {
  ssr: false
});

const SpecialOccasion = dynamic(() => import("@/components/Home1/SpecialOccasion"), {
  ssr: false
});

const ShopByGender = dynamic(() => import("@/components/Home1/ShopByGender"), {
  ssr: false
});

const RoseGold = dynamic(() => import("@/components/Home1/RoseGold"), {
  ssr: false
});

const Explore = dynamic(() => import("@/components/Home1/Explore"), {
  ssr: false
});

// LOWEST PRIORITY: Heavy components loaded only when needed
const BuyAgain = dynamic(() => import("@/components/Home1/BuyAgain"), {
  ssr: false
});

const RecetlyViewProduct = dynamic(() => import("@/components/Home1/RecentlyViewProduct"), {
  ssr: false
});

const Appointment = dynamic(() => import("@/components/Home1/Appointment"), {
  ssr: false
});

const GoldScheme = dynamic(() => import("@/components/Home1/GoldScheme"), {
  ssr: false
});

const Reviews = dynamic(() => import("@/components/Home1/Reviews"), {
  ssr: false
});

export default function Home() {
  // Preload critical resources
  useEffect(() => {
    // Preload critical images for faster LCP
    const criticalImages = [
      '/images/banner/Anayra.jpg',
      '/images/Newbanner/1920x628.jpg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });

    // Preload critical CSS
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'preload';
    criticalCSS.as = 'style';
    criticalCSS.href = '/_next/static/css/app.css';
    document.head.appendChild(criticalCSS);

  }, []);

  return (
    <>
      <div className="overflow-x-hidden">
        {/* CRITICAL: Above-the-fold content with highest priority */}
        <MobileMainCategorySwiper />
        
        <Suspense fallback={
          <div className="w-full h-96 bg-gradient-to-r from-blue-50 to-indigo-100 animate-pulse flex items-center justify-center">
            <div className="text-blue-600 font-medium">Loading carousel...</div>
          </div>
        }>
          <MainCarousel />
        </Suspense>
        
        {/* ESSENTIAL: Key user-facing components */}
        <Suspense fallback={<div className="h-64 bg-gray-50 animate-pulse rounded-lg mx-4 my-8" />}>
          <Gifts />
        </Suspense>
        
        <Suspense fallback={<div className="h-48 bg-gray-50 animate-pulse rounded-lg mx-4 my-8" />}>
          <Category />
        </Suspense>
        
        {/* BELOW-THE-FOLD: Load progressively */}
        <GetFastDeliveryProducts />
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
