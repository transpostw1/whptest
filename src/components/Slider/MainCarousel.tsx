"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCategory } from "@/context/CategoryContex";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { baseUrl, getAllBanners } from "@/utils/constants";
import axios from "axios";
import Link from "next/link";

const MainCarousel = () => {
  const [allBanners, setAllBanners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const { setCustomcategory } = useCategory();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");
    const handleChange = (e: any) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);
  useEffect(() => {
    const fetchAddresses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}${getAllBanners}`);

        setAllBanners(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);
  if (isLoading) {
    return (
      <div>
        <Skeleton height={200} />
      </div>
    );
  }
  return (
    <>
      <div className="slider-block bg-linear w-full relative">
        <div className="slider-main w-full">
          {!isMobile && (
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
              autoplay={{ delay: 6000 }}
            >
              {allBanners &&
                allBanners.map((banner: any) => (
                  <SwiperSlide key={banner.id}>
                    <Link
                      href={{
                        pathname: "/products",
                        query: { url: banner.url },
                      }}
                      onClick={() => setCustomcategory(banner.url)}
                    >
                      <div className="slider-item w-full">
                        <Image
                          src={banner.desktopFile}
                          alt="Hero Image"
                          width={1920}
                          height={100}
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
          {isMobile && (
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
              autoplay={{ delay: 6000 }}
            >
              {allBanners &&
                allBanners.map((banner: any) => (
                  <SwiperSlide key={banner.id}>
                    <Link
                      href={{
                        pathname: "/products",
                        query: { url: banner.url },
                      }}
                      onClick={() => setCustomcategory(banner.url)}
                    >
                      <div className="w-full">
                        <Image
                          src={banner.mobileFile}
                          alt="Mobile Banners"
                          width={1920}
                          height={100}
                          layout="responsive"
                          priority
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
      </div>
    </>
  );
};

export default MainCarousel;
