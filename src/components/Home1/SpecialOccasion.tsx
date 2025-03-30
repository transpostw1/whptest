"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useCategory } from "@/context/CategoryContex";
import "swiper/css/bundle";
import { useRouter } from "next/navigation";
import { delay, motion } from "framer-motion";
// import Fade from 'react-reveal'

const SpecialOccasion = () => {
  const router = useRouter();
  const { setCustomcategory } = useCategory();
  const handleTypeClick = (type: string) => {
    router.push(`/products?type=${type}`);
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <div className="collection-block pt-10 md:pt-10">
        {/* <div className="container"> */}
        {/* <Fade bottom> */}
        {/* <div className="heading3 text-center">Special Occasion</div> */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col justify-between gap-2 px-8 text-red-950"
        >
          <p className="text-[24px] sm:w-[100%] sm:leading-[18px] md:w-[57%] md:text-3xl lg:w-[71%] lg:text-[62px] lg:leading-[86px]">
            Something Special for Everyone
          </p>
          <p className="font-light text-gray-700 sm:text-[12px] md:w-[60%] lg:w-[65%] lg:text-[16px]">
            Crafted to add a touch of elegance and charm to every occasion. From
            celebrations to cherished milestones, find the perfect piece that
            speaks to your unique style and sentiments.
          </p>
        </motion.div>
        {/* </Fade> */}
        {/* </div> */}
        <div className="list-collection section-swiper-navigation mt-6 px-4 sm:px-5 md:mt-10">
          <Swiper
            spaceBetween={12}
            slidesPerView={1.5}
            // navigation
            modules={[Navigation, Autoplay]}
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
                spaceBetween: 20,
              },
            }}
            className="h-full"
          >
            <SwiperSlide>
              <Link
                href={{
                  pathname: "/products",
                  query: { url: "occasion-everyday" },
                }}
              >
                <div
                  className="collection-item relative block cursor-pointer overflow-hidden"
                  onClick={() => {
                    handleTypeClick("");
                    setCustomcategory("Everyday");
                  }}
                >
                  <div className="bg-img">
                    <Image
                      src={"/images/specialoccassion/EverydayWear.jpg"}
                      width={1000}
                      height={600}
                      alt=""
                    />
                  </div>
                  {/* <div className="collection-name heading7 w-[100px] rounded-xl bg-transparent py-1.5 text-center duration-500 sm:bottom-8 md:w-[160px] md:py-3 lg:w-[200px]">
                    Everday Wear
                  </div> */}
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href={{
                  pathname: "/products",
                  query: { url: "occasion-officeWear" },
                }}
              >
                <div
                  className="collection-item relative block cursor-pointer overflow-hidden"
                  onClick={() => {
                    handleTypeClick("top");
                    setCustomcategory("Office_Wear");
                  }}
                >
                  <div className="bg-img">
                    <Image
                      src={"/images/specialoccassion/investor_selection.jpg"}
                      width={1000}
                      height={600}
                      alt=""
                    />
                  </div>
                  {/* <div className="collection-name heading7 sm:heading-8 w-[100px] rounded-xl bg-transparent py-1.5 text-center duration-500 sm:bottom-8 md:w-[160px] md:py-3 lg:w-[200px]">
                    Office Wear
                  </div> */}
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href={{
                  pathname: "/products",
                  query: { url: "occasion-kids-collection" },
                }}
              >
                <div
                  className="collection-item relative block cursor-pointer overflow-hidden"
                  onClick={() => {
                    handleTypeClick("sets");
                    setCustomcategory("kids_collection");
                  }}
                >
                  <div className="bg-img">
                    <Image
                      src={"/images/specialoccassion/KidsCollection.jpg"}
                      width={1000}
                      height={600}
                      alt=""
                    />
                  </div>
                  {/* <div className="collection-name heading7 bottom-4 w-[100px] rounded-xl bg-transparent py-1.5 text-center duration-500 sm:bottom-8 md:w-[160px] md:py-3 lg:w-[200px]">
                    Wedding Wear
                  </div> */}
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href="https://www.anayra.net/"
              >
                <div
                  className="collection-item relative block cursor-pointer overflow-hidden"
                  onClick={() => {
                    handleTypeClick("outerwear");
                    setCustomcategory("sliver_jewellery");
                  }}
                >
                  <div className="bg-img">
                    <Image
                      src={"/images/specialoccassion/Anayra.jpg"}
                      width={1000}
                      height={600}
                      alt=""
                    />
                  </div>
                  {/* <div className="collection-name heading7 bottom-4 w-[100px] rounded-xl bg-transparent py-1.5 text-center duration-500 sm:bottom-8 md:w-[160px] md:py-3 lg:w-[200px]">
                    Party Wear
                  </div> */}
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href="https://www.swarnak.com/">
                <div className="collection-item relative block cursor-pointer overflow-hidden">
                  <div className="bg-img">
                    <Image
                      src={"/images/specialoccassion/swarnak_collection.jpg"}
                      width={1000}
                      height={600}
                      alt=""
                    />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href={{
                  pathname: "/products",
                  query: { url: "occasion-wedding-collection" },
                }}
              >
                <div
                  className="collection-item relative block cursor-pointer overflow-hidden"
                  onClick={() => {
                    handleTypeClick("sets");
                    setCustomcategory("wedding_collection");
                  }}
                >
                  <div className="bg-img">
                    <Image
                      src={"/images/specialoccassion/wedding_collection.jpg"}
                      width={1000}
                      height={600}
                      alt=""
                    />
                  </div>
                  {/* <div className="collection-name heading7 bottom-4 w-[100px] rounded-xl bg-transparent py-1.5 text-center duration-500 sm:bottom-8 md:w-[160px] md:py-3 lg:w-[200px]">
                    Wedding Wear
                  </div> */}
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href={{
                  pathname: "/products",
                  query: { url: "occasion-gentlemen_collection" },
                }}
              >
                <div
                  className="collection-item relative block cursor-pointer overflow-hidden"
                  onClick={() => {
                    handleTypeClick("sets");
                    setCustomcategory("gentlemen_collection");
                  }}
                >
                  <div className="bg-img">
                    <Image
                      src={"/images/specialoccassion/gentlemen_collection.jpg"}
                      width={1000}
                      height={600}
                      alt=""
                    />
                  </div>
                  {/* <div className="collection-name heading7 bottom-4 w-[100px] rounded-xl bg-transparent py-1.5 text-center duration-500 sm:bottom-8 md:w-[160px] md:py-3 lg:w-[200px]">
                    Wedding Wear
                  </div> */}
                </div>
              </Link>
            </SwiperSlide>
            {/* <SwiperSlide>
              <div
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("underwear")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion2.png"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name heading7 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  Wedding Collection{" "}
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("t-shirt")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion3.png"}
                    width={1000}
                    height={600}
                    alt="gift"
                  />
                </div>
                <div className="collection-name heading7 sm:heading-8 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  Self Gifting Treasure
                </div>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SpecialOccasion;
