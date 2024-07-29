"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Gifts = () => {
  const [isMobile, setIsMobile] = useState(false);
  let categories = [
    {
      id: 3,
      url: "o-Her_Birthday",
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
      type: "Weddings",
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
          <h1 className="pb-2 text-[1.5rem] font-semibold uppercase">
            Occasion
          </h1>
          <p>
            Discover the joy of gifting with our curated selection,where every
            piece reflects <br />
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
            >
              <div className="relative flex flex-col gap-2">
                <div className="effect10 img">
                  {category.image}{" "}
                  {!isMobile && <a href="#">{category.type}</a>}
                </div>
                {isMobile && (
                  <div className="w-[80%] break-words">{category.type}</div>
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
