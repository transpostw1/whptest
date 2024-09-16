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
import Link from "next/link";

const MainCarousel = () => {
  const [allBanners, setAllBanners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const swiperRef = useRef<any>(null);
  const { setCustomcategory } = useCategory();
  const [isMobile, setIsMobile] = useState(false);

  // Media query to detect mobile devices
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

  // Fetch banners using GraphQL
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

  const handleSlideChange = (swiper: any) => {
    setTimeout(() => {
      if (!swiper || !swiper.slides || swiper.activeIndex === undefined) return;
  
      const activeSlide = swiper.slides[swiper.activeIndex];
  
      if (!activeSlide) return;
  
      const video = activeSlide.querySelector("video");
  
      if (video) {
        swiper.autoplay.stop();
  
        video.play();
  
        video.onended = () => {
          swiper.slideNext();
          swiper.autoplay.start();
        };
  
        video.onclick = () => {
          if (video.paused) {
            video.play();
            swiper.autoplay.stop(); // Stop autoplay when the video is clicked
          } else {
            video.pause();
            swiper.autoplay.start(); // Resume autoplay if the video is paused
          }
        };
      } else {
        swiper.autoplay.start();
      }
    }, 1000);
  };
  

  // Display loading skeleton if banners are still loading
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
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={handleSlideChange}
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
                              loop={false}
                              style={{ width: "100%", height: "auto" }}
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
