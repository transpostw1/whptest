import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCategory } from "@/context/CategoryContex";

const WhatWeOffer = () => {
  const { setCustomcategory } = useCategory();
  return (
    <section className="my-16 flex w-full flex-col md:flex-row">
      {/* Left Section (Text Content - Top) */}
      <div className="w-full px-6 py-6 text-center md:hidden bg-[#F9F5F5]">
        {/* <p className="mt-5 text-lg font-normal tracking-[0.49rem]">OFFERINGS</p> */}
        <h2 className="text-2xl font-normal md:text-5xl">9Ratna Gemstones</h2>
        <p className="mt-3">
          Discover gemstone jewellery where style meets spiritual
          energy—bringing health, prosperity, and happiness into your life.
        </p>
      </div>

      {/* Middle Section (Image in Mobile, Left in Desktop) */}
      <div className="flex w-full md:w-1/2">
        <Image
          src="/images/other/gemstone_whp_1.jpg"
          alt="Jewellery bag"
          width={600}
          height={600}
          className="h-auto w-full object-fill md:h-[90vh]"
        />
      </div>

      {/* Right Section (Text Content - Bottom in Mobile, Right in Desktop) */}
      <div className="flex w-full flex-col justify-between bg-[#F9F5F5] px-6 py-10 text-[#39161C] md:w-1/2">
        {/* Show heading only on desktop */}
        <div className="hidden md:block">
          <h2 className="text-3xl font-normal md:text-5xl">9Ratna Gemstones</h2>
          <p className="mt-3">
            Discover gemstone jewellery where style meets spiritual
            energy—bringing health, prosperity, and happiness into your life.
          </p>
        </div>

        {/* Offer details */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center justify-between md:items-start">
            <Image
              src={"/images/icons/star.svg"}
              alt="Star"
              width={40}
              height={40}
              className="mb-3"
              unoptimized
            />
            <h3 className="text-xl font-semibold">Gemstones & Jewellery</h3>
            <p className="md:mw-96 text-center md:text-start">
              Discover our premium collection of natural, certified loose
              gemstones and jewellery that are handpicked for their clarity,
              color, and cosmic energy.
            </p>
            <Link
              href={{
                pathname: "/products",
                query: { url: "pc-gemstone" },
              }}
              onClick={() => setCustomcategory("gemstone")}
              className="mt-8 inline-flex items-center"
            >
              <span className="me-2 cursor-pointer text-sm text-[#E26178] underline">
                Shop Now
              </span>
              <span className="flex items-center">
                <Image
                  src={"/images/icons/rightarrow.svg"}
                  alt="Right Arrow"
                  width={20}
                  height={20}
                />
              </span>{" "}
            </Link>
          </div>
          {/* <div>
            <div className="mr-10 hidden sm:block">
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
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
