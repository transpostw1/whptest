"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCategory } from "@/context/CategoryContex";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { baseUrl, graphqlbaseUrl } from "@/utils/constants";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import axios from "axios";
import Link from "next/link";
import { calculateSizeAdjustValues } from "next/dist/server/font-utils";

const MainCarousel = () => {
  const [allBanners, setAllBanners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const swiperRef = useRef<any>(null);
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
    const fetchMainBanners = async () => {
      setIsLoading(true);
      try {
        const client = new ApolloClient({
          uri: graphqlbaseUrl,
          cache: new InMemoryCache(),
        });
        const GET_ALLBANNERS = gql`
          query GetAllBanners {
            getAllBanners {
              id
              name
              url
              desktopFile
              desktopFileType
              mobileFileType
              mobileFile
              description
            }
          }
        `;
        const { data } = await client.query({
          query: GET_ALLBANNERS,
        });
        setAllBanners(data.getAllBanners);
      } catch (error) {
        console.log("Error in Fetching All Main Banner", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMainBanners();
  }, []);
  const handleSlideChange = (swiper:any) => {
    // Wait for the active slide DOM to be available
    setTimeout(() => {
      const activeSlide = swiper.slides[swiper.activeIndex];
      console.log("activeSlide", activeSlide);

      // Ensure activeSlide is not undefined
      if (!activeSlide) return;

      const video = activeSlide.querySelector("video");

      // Check if the active slide contains a video
      if (video) {
        // Pause Swiper autoplay
        swiper.autoplay.stop();

        // Play the video and attach event listeners
        video.play();

        // Add an event listener for when the video ends
        video.onended = () => {
          // Move to the next slide after the video finishes
          swiper.slideNext();
          swiper.autoplay.start(); // Resume autoplay
        };
      } else {
        // Resume Swiper autoplay if the active slide does not contain a video
        swiper.autoplay.start();
      }
    }, 0); // Use a short delay to ensure DOM availability
  };
  
  if (isLoading) {
    return (
      <div>
        <Skeleton height={200} />
      </div>
    );
  }
  return (
    <>
      <div className="slider-block bg-linear relative w-full">
        <div className="slider-main w-full">
          {!isMobile && (
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance
              onSlideChange={handleSlideChange} // Handle slide change
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
              autoplay={{ delay: 10000 }} // 10-second delay
            >
              {allBanners &&
                allBanners
                  .filter(
                    (banner) =>
                      banner.desktopFile !== null &&
                      banner.desktopFileType !== null,
                  )
                  .map((banner) => (
                    <SwiperSlide key={banner.id}>
                      <Link
                        href={{
                          pathname: "/products",
                          query: { url: banner.url },
                        }}
                        onClick={() => setCustomcategory(banner.url)}
                      >
                        <div className="slider-item w-full">
                          {banner.desktopFileType === "video" ? (
                            <video
                              src={banner.desktopFile}
                              autoPlay
                              muted
                              loop={false} // Video plays only once
                              style={{ width: "100%", height: "auto" }} // Ensure full width
                            />
                          ) : (
                            <Image
                              src={banner.desktopFile}
                              alt="Hero Image"
                              width={1920}
                              height={100}
                            />
                          )}
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
              autoplay={{ delay: 10000 }}
            >
              {allBanners &&
                allBanners
                  .filter(
                    (banner: any) =>
                      banner.mobileFile !== null &&
                      banner.mobileFileType !== null,
                  )
                  .map((banner: any) => (
                    <SwiperSlide key={banner.id}>
                      <Link
                        href={{
                          pathname: "/products",
                          query: { url: banner.url },
                        }}
                        onClick={() => setCustomcategory(banner.url)}
                      >
                        <div className="slider-item w-full">
                          {banner.mobileFileType === "video" ? (
                            <video
                              src={banner.mobileFile}
                              autoPlay
                              muted
                              loop
                            />
                          ) : (
                            <Image
                              src={banner.mobileFile}
                              alt="Hero Image"
                              width={1920}
                              height={100}
                            />
                          )}
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
