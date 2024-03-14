import React from "react";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
// import MenuOne from "@/components/Header/Menu/MenuOne";
// import SliderOne from "@/components/Slider/SliderOne";
// import WhatNewOne from "@/components/Home1/WhatNewOne";
// import productData from "@/data/Product.json";
import Collection from "@/components/Home1/Collection";
import ProductSlider from "@/components/Home1/ProductSlider";



// import Banner from "@/components/Home1/Banner";
// import Benefit from "@/components/Home1/Benefit";
// import testimonialData from "@/data/Testimonial.json";
// import Testimonial from "@/components/Home1/Testimonial";
// import Instagram from "@/components/Home1/Instagram";
// import Brand from "@/components/Home1/Brand";



import Footer from "@/components/Footer/Footer";



import NavTwo from "@/components/Header/TopNav/NavTwo";
import NavHoverMenu from "@/components/Header/Menu/NavHoverMenu";
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
      {/* <MainCarousel /> */}
      <Explore />
      {/* <Collection /> */}
      <ProductSlider data={productData} start={0} limit={6} />
      <Category />
      <GoldScheme />
      <ShopGender />
      <PreciousGems />
      <Appointment />
      <Gifts />
      <SpecialOccasion />
      <Reviews />
      <WhpApp/>
      {/* <Banner />
      <Benefit props="md:py-20 py-10" /> */}
      {/* <Testimonial data={testimonialData} limit={6} /> */}
      {/* <Instagram />
      <Brand /> */}
      <Footer />
    </>
  );
}
