"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Explore = () => {
  return (
    <>
      <div className="banner-block style-one grid sm:grid-cols-2">
        <Link
          href={"/shop/breadcrumb-img"}
          className="banner-item relative block overflow-hidden duration-500"
        >
          <div className="banner-img">
            <Image
              src={"/images/banner/Anayra.jpg"}
              width={2000}
              height={1300}
              alt="banner1"
              className="duration-1000"
            />
          </div>
        </Link>
        <Link
          href={"/shop/breadcrumb-img"}
          className="banner-item relative block overflow-hidden duration-500"
        >
          <div className="banner-img">
            <Image
              src={"/images/banner/9Ratna.jpg"}
              width={2000}
              height={1300}
              alt="banner2"
              className="duration-1000"
            />
          </div>
          <div className="banner-content absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <div className="heading2 text-white">New Arrivals</div>
            <div className="text-button text-white relative inline-block pb-1 border-b-2 border-white duration-500 mt-2">
              Shop Now
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Explore;
