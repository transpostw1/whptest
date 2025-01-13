"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCategory } from "@/context/CategoryContex";

const RoseGold = () => {
  const { setCustomcategory } = useCategory();
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(200);
  const [bannerwidth, setBannerWidth] = useState<number>(300);
  const [bannerheight, setBannerHeight] = useState<number>(200);
  useEffect(() => {
    const handleResize = () => {
      // Get the current viewport width
      const viewportWidth = window.innerWidth;

      if (viewportWidth < 768) {
        // Small screens
        setWidth(135);
        setHeight(43);
        setBannerWidth(170);
        setBannerHeight(298);
      } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Medium screens
        setWidth(170);
        setHeight(50);
        setBannerWidth(220);
        setBannerHeight(390);
      } else {
        // Large screens
        setWidth(290);
        setHeight(200);
        setBannerWidth(350);
        setBannerHeight(465);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="mt-5 flex flex-wrap justify-center bg-[#f7f5f6]">
      <div className="md:w-[40%] md:ml-4 lg:w-[30%] lg:pl-[] sm:pt-[36px]">
        <p className="font-semibold max-sm:text-center md:mb-3">Explore</p>
        <p className="max-sm:text-center max-sm:text-[1.5rem] sm:leading-4 md:mb-3 md:text-[1.5rem] lg:text-start lg:text-4xl lg:leading-[50px]">
          ROSE GOLD RANGE
        </p>
        <div className="max-sm:text-center max-sm:text-xs md:text-[0.5rem] lg:text-start lg:text-[1rem]">
          <p>
            Elevate your style with the warm, rosy embrace of rose gold
            jewellery. Its timeless elegance adds a touch of sophistication to
            every look.
          </p>
        </div>
        <div className="mb-5 mt-7 flex max-sm:justify-center">
          <div className="mr-2 cursor-pointer">
            <Image
              src={"/images/roseGoldImages/roseGoldVariants1.png"}
              alt={"roseGoldVariants"}
              width={40}
              height={40}
              unoptimized
            />
          </div>
          <div className="mr-2 cursor-pointer">
            <Image
              src={"/images/roseGoldImages/roseGoldVariants2.png"}
              alt={"roseGoldVariants"}
              width={40}
              height={40}
              unoptimized
            />
          </div>
          <div className="mr-2 cursor-pointer">
            <Image
              src={"/images/roseGoldImages/roseGoldVariants3.png"}
              alt={"roseGoldVariants"}
              width={40}
              height={40}
              unoptimized
            />
          </div>
        </div>
        
        {width > 135 && (
          <Link
            href={{ pathname: "/products", query: { url: "m-rose_gold" } }}
            onClick={() => setCustomcategory("rose_gold")}
          >
            <div className="flex-end mt-auto flex justify-normal">
              <span className="flex justify-center bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-6 py-2 text-white lg:w-[60%]">
                Shop All
                <span className="ml-2 mt-1">
                  <Icon.ArrowRight />
                </span>
              </span>
            </div>
          </Link>
        )}
      </div>
      <div className="flex max-sm:w-full max-sm:justify-end sm:justify-center">
        
        <Image
          src={"/images/roseGoldImages/roseGoldRing.png"}
          width={bannerwidth}
          height={height}
          alt={"the rose gold section"}
          unoptimized
        />

        <Image
          src={"/images/roseGoldImages/roseGoldRingBannerWithHand.png"}
          width={width}
          height={height}
          alt={"the rose gold section"}
          unoptimized
        />
      </div>
      {width < 170 && (
        <div className="mt-5 flex w-full justify-center">
          <Link
            href={{ pathname: "/products", query: { url: "categroy-rose_gold" } }}
            onClick={() => setCustomcategory("rose_gold")}
          >
            <span className="flex justify-center bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-6 py-2 text-white lg:w-[37%]">
              Shop All
              <span className="ml-2 mt-1">
                <Icon.ArrowRight />
              </span>
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RoseGold;
