"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import * as Icon from "react-feather";
import { useCategory } from "@/context/CategoryContex";

const RoseGold = () => {

    const { setCustomcategory } = useCategory();
  return (
    <div className="bg-[#f7f5f6] px-5 md:px-8 my-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Section */}
        <div className="flex flex-col justify-between md:w-1/2 text-center md:text-left ">
          <p className="font-semibold my-2 ">Explore</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl  text-gray-900">
            ROSE GOLD RANGE
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed md:text-left mb-2">
            Elevate your style with the warm, rosy embrace of rose gold
            jewellery. Its timeless elegance adds a touch of sophistication to
            every look.
          </p>

          {/* Color Variants */}
          <div className="flex justify-center md:justify-start gap-3 my-6 " >
            <Image
              src={"/images/roseGoldImages/roseGoldVariants1.png"}
              alt="roseGoldVariants"
              width={40}
              height={40}
              className="cursor-pointer"
              unoptimized
            />
            <Image
              src={"/images/roseGoldImages/roseGoldVariants2.png"}
              alt="roseGoldVariants"
              width={40}
              height={40}
              className="cursor-pointer"
              unoptimized
            />
            <Image
              src={"/images/roseGoldImages/roseGoldVariants3.png"}
              alt="roseGoldVariants"
              width={40}
              height={40}
              className="cursor-pointer"
              unoptimized
            />
          </div>
          <Image
            src="/images/other/Rosegoldrange.jpg"
            className="w-screen h-auto md:hidden mb-5"
            alt="Rose Gold Collection"
            width={560}
            height={432}
            sizes="100vw"
            quality={75}
            loading="lazy"
          />

           <Link
             href={{ pathname: "/products", query: { url: "metal-rose_gold" } }}
             onClick={() => setCustomcategory("rose_gold")}
       >
            <span className="flex items-center justify-center bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-6 py-3 text-white font-medium shadow-md hover:opacity-90 transition md:w-1/2 lg:w-1/3 mx-auto md:mx-0">
              Shop All
              <Icon.ArrowRight className="ml-2" />
            </span>
          </Link>
        </div>

        <div className="md:w-1/2 hidden md:block">
          <Image
            src="/images/other/Rosegoldrange.jpg"
            className="w-full h-auto lg:px-8 md:p"
            alt="Rose Gold Collection"
            width={560}
            height={432}
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={75}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default RoseGold;
