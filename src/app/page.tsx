import React from 'react'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import SliderOne from '@/components/Slider/SliderOne'
import WhatNewOne from '@/components/Home1/WhatNewOne'
import productData from '@/data/Product.json'
import Collection from '@/components/Home1/Collection'
import TabFeatures from '@/components/Home1/TabFeatures'
import Banner from '@/components/Home1/Banner'
import Benefit from '@/components/Home1/Benefit'
import testimonialData from '@/data/Testimonial.json'
import Testimonial from '@/components/Home1/Testimonial'
import Instagram from '@/components/Home1/Instagram'
import Brand from '@/components/Home1/Brand'
import Footer from '@/components/Footer/Footer'



import TopNavThree from "@/components/Header/TopNav/TopNavThree";
import MenuCosmeticOne from "@/components/Header/Menu/MenuCosmeticOne";
import SliderCosmeticTwo from "@/components/Slider/SliderCosmeticTwo";
import Explore from '@/components/Home1/Explore'

export default function Home() {
  return (
    <>
      
      <TopNavOne
        props="style-one bg-black"
        slogan="25% off on making charges on gold"
      />
      <TopNavThree props="style-three bg-white" />
      <div id="header" className="w-full relative">
        <MenuCosmeticOne props="bg-white" />
      </div>
      <SliderCosmeticTwo />
      <Explore/>
      {/* <Collection /> */}
      <TabFeatures data={productData} start={0} limit={6} />
      <Banner />
      <Benefit props="md:py-20 py-10" />
      <Testimonial data={testimonialData} limit={6} />
      <Instagram />
      <Brand />
      <Footer />
    </>
  );
}
