"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCategory } from "@/context/CategoryContex";

const WhatWeOffer = () => {
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(200);
  const { setCustomcategory } = useCategory();
  
  useEffect(() => {
    const handleResize = () => {
      // Get the current viewport width
      const viewportWidth = window.innerWidth;

      if (viewportWidth < 768) {
        // Small screens
        setWidth(130);
        setHeight(43);
      } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Medium screens
        setWidth(170);
        setHeight(50);
      } else {
        // Large screens
        setWidth(290);
        setHeight(200);
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
    <>
      <div className="mt-4 bg-[#F9F5F5] text-[#39161C] ">
        {width < 140 && (
          <div className="mt-5 p-4">
            <p className="w-full text-center font-medium tracking-[0.49rem]">
              OFFERINGS
            </p>
            <div className="mt-4 w-full text-center text-[24px] font-normal">
              What We Offer
            </div>
            <div className="m-auto mb-5 mt-3 w-[80%] text-center text-[12px] font-light">
              Discover our offerings. Our commitment to quality, elegance, and
              personalised service ensures an exceptional experience.
            </div>
          </div>
        )}
        <div className="flex flex-wrap lg:flex-row">
          <div className="max-sm:w-full md:w-[50%] lg:w-[50%]">
            <Image
              src={"/images/other/whatweoffer(1).png"}
              className="h-auto w-full"
              alt="What We Offer"
              width={width}
              height={height}
            />  
          </div>
          <div className="flex w-full flex-col sm:w-[50%] sm:p-[4rem] md:mt-2 md:p-8">
            {width > 160 && (
              <div className="ps-3 pt-3">
                <p className="pb-5 text-[61px] leading-[74px] font-normal">What we Offer</p>
                <p className="text-sm md:text-base">
                  Discover our offerings. Our commitment to quality, elegance,
                  and personalised service ensures an exceptional experience.
                </p>
              </div>
            )}
            <div className="flex-end order-1 mt-auto">
              <div className="flex justify-between max-sm:text-center">
                <div className="py-4">
                  <Image
                    src={"/images/icons/star.svg"}
                    alt="Star"
                    width={40}
                    height={40}
                    className={`${width < 140 && "m-auto"}`}
                  />
                  <p className="pb-2 pt-3 text-lg font-semibold md:text-xl">
                    12000 + UNIQUE DESIGNS
                  </p>
                  <p className="mt-3 text-sm md:text-base lg:w-[67%]">
                    Elevate your style with our distinctive jewellery designs,
                    where creativity and craftsmanship unite.
                  </p>
                  <Link
                    href={{
                      pathname: "/products",
                      query: { url: "c-new_Arrival" },
                    }}
                    onClick={() => setCustomcategory("new_arrival")}
                    className="mt-8 inline-flex items-center"
                  >
                    <span className="me-2 cursor-pointer text-sm text-[#E26178] underline">
                      Next
                    </span>
                    <span className="flex items-center">
                      <Image
                        src={"/images/icons/rightarrow.svg"}
                        alt="Right Arrow"
                        width={20}
                        height={20}
                      />
                    </span>
                  </Link>
                </div>
                <div className="hidden sm:block">
                  <p
                    className="mt-5 text-lg font-semibold tracking-[0.49rem]"
                    style={{
                      textOrientation: "mixed",
                      writingMode: "vertical-lr",
                      transform: "rotate(180deg)",
                    }}
                  >
                    OFFERINGS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatWeOffer;
