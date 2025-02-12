"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCategory } from "@/context/CategoryContex";
const Gifts = () => {
  const [isMobile, setIsMobile] = useState(false);
  const {setCustomcategory} =useCategory();
  let categories = [
    {
      id: 3,
      url: "occasion-Her_Birthday",
      head: "her_birthday",
      type: "Her Birthday",
      image: (
        <Image
          src={"/images/gifts/GiftHer.jpg"}
          alt=""
          height={400}
          width={400}
          unoptimized
        />
      ),
    },
    {
      id: 4,
      url: "occasion-His_Birthday",
      head: "his_birthday",
      type: "His Birthday",
      image: (
        <Image
          src={"/images/gifts/GiftHim.jpg"}
          alt=""
          width={400}
          height={400}
          unoptimized
        />
      ),
    },
    {
      id: 2,
      url: "occasion-Valentines",
      head: "valentines",
      type: "Valentines",
      image: (
        <Image
          src={"/images/gifts/RingForMen.jpg"}
          alt=""
          width={400}
          height={400}
          unoptimized
        />
      ),
    },
    {
      id: 8,
      url: "occasion-Valentines",
      head: "valentines",
      type: "Valentines",
      image: (
        <Image
          src={"/images/gifts/RingForWomen.jpg"}
          alt=""
          width={400}
          height={400}
          unoptimized
        />
      ),
    },
    {
      id: 5,
      url: "occasion-Weddings",
      head: "special",
      type: "Gift For Special Occasion",
      image: (
        <Image
          src={"/images/gifts/SpecialOccasion.jpg"}
          alt=""
          width={400}
          height={400}
          unoptimized
        />
      ),
    },
    {
      id: 6,
      url: "occasion-God_pendant",
      head: "god_pendant",
      type: "God Pendant",
      image: (
        <Image
          src={"/images/gifts/GoldPendant.jpg"}
          alt=" "
          width={400}
          height={400}
          unoptimized
        />
      ),
    },
    {
      id: 7,
      url: "occasion-New_Born_Baby",
      head: "new_born_baby",
      type: "Little Star Collection",
      image: (
        <Image
          src={"/images/gifts/LittleStarCollection.jpg"}
          alt=""
          width={400}
          height={400}
          unoptimized
        />
      ),
    },
    {
      id: 8,
      url: "occasion-House_Warming",
      head: "house_warming",
      type: "Self Gifting",
      image: (
        <Image
          src={"/images/gifts/SelfGifting.jpg"}
          alt=""
          width={400}
          height={400}
          unoptimized
        />
      ),
    },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (e: any) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  return (
    <>
      <div className="my-16 w-full px-8 text-rose-950">
        <div className="flex flex-col items-start justify-between">
          <h1 className="font-medium sm:text-[18px] lg:text-[32px] uppercase pb-2">
            GIFTS
          </h1>
          <p className="w-[100%] lg:w-[50%] text-[16px] font-light">
            Discover the joy of gifting with our curated selection,where every
            piece reflects 
            thoughtfulness and timeless charm, making evey occasion extra
            special.
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={{
                pathname: "/products",
                query: { url: `${category.url}` },
              }}
              onClick={()=>setCustomcategory(category.head)}
            >
              <div className="relative flex flex-col gap-2">
                <div className="effect10 img hover:shadow-2xl">
                  {category.image}{" "}
                  
                </div>
                {/* {isMobile && (
                  <div className="text-md break-words">{category.type}</div>
                )} */}
                <div className="inline-flex">
                  <span className="me-2 cursor-pointer text-sm text-[#E26178] underline">
                    View All
                  </span>
                  <span className="flex">
                    <Image
                      src={"/images/icons/rightarrow.svg"}
                      alt="Right Arrow"
                      width={20}
                      height={20}
                      unoptimized
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gifts;
