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
      url: "o-Her_Birthday",
      head: "her_birthday",
      type: "HER BIRTHDAY",
      image: (
        <Image
          src={"/images/occasion/WHP_Gift_For_Her.jpg"}
          alt=""
          height={400}
          width={400}
        />
      ),
    },
    {
      id: 4,
      url: "o-His_Birthday",
      head: "his_birthday",
      type: "HIS BIRTHDAY",
      image: (
        <Image
          src={"/images/occasion/WHP_Gift_For_Him_01.jpg"}
          alt=""
          width={400}
          height={400}
        />
      ),
    },
    {
      id: 2,
      url: "o-New_Born_Baby",
      head: "new_born_baby",
      type: "NEW BORN BABY",
      image: (
        <Image
          src={"/images/occasion/WHP_New Born Baby_01.jpg"}
          alt=""
          width={400}
          height={400}
        />
      ),
    },
    {
      id: 8,
      url: "o-Valentines",
      head: "valentines",
      type: "VALENTINES",
      image: (
        <Image
          src={"/images/occasion/WHP_Valentines.jpg"}
          alt=""
          width={400}
          height={400}
        />
      ),
    },
    {
      id: 5,
      url: "o-Weddings",
      head: "weddings",
      type: "WEDDINGS",
      image: (
        <Image
          src={"/images/occasion/WHP_Weddings.jpg"}
          alt=""
          width={400}
          height={400}
        />
      ),
    },
    {
      id: 6,
      url: "o-Get_Well_Soon",
      head: "get_well_soon",
      type: "GET WELL SOON",
      image: (
        <Image
          src={"/images/occasion/Getwell.jpg"}
          alt=" "
          width={400}
          height={400}
        />
      ),
    },
    {
      id: 7,
      url: "o-Thankyou",
      head: "thankyou",
      type: "THANK YOU",
      image: (
        <Image
          src={"/images/occasion/Thankyou.jpg"}
          alt=""
          width={400}
          height={400}
        />
      ),
    },
    {
      id: 1,
      url: "o-House_Warming",
      head: "house_warming",
      type: "HOUSE WARMING",
      image: (
        <Image
          src={"/images/occasion/Housewarming.jpg"}
          alt=""
          width={400}
          height={400}
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
                <div className="effect10 img">
                  {category.image}{" "}
                  {!isMobile && <a href="#">{category.type}</a>}
                </div>
                {isMobile && (
                  <div className="text-md break-words">{category.type}</div>
                )}
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
