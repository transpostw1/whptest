"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Explore = () => {
  return (
    <>
      <div className="banner-block style-one grid sm:grid-cols-2">
        <Link
          href={"/shop/breadcrumb1"}
          className="banner-item relative block overflow-hidden duration-500"
        >
          <div className="banner-img">
            <Image
              src={"/images/banner/Anayra.png"}
              width={2000}
              height={1300}
              alt="banner1"
              className="duration-1000"
            />
          </div>
        </Link>
        <Link
          href={"/shop/breadcrumb1"}
          className="banner-item relative block overflow-hidden duration-500"
        >
          <div className="banner-img">
            <Image
              src={"/images/banner/Essential.png"}
              width={2000}
              height={1300}
              alt="banner2"
              className="duration-1000"
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Explore;
