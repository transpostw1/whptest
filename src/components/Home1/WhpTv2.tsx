"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import VideoFeed from "@/components/Video/VideoFeed";
import { ProductType } from "@/type/ProductType";
import axios from "axios";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { baseUrl2, graphqlbaseUrl, getAllReels } from "@/utils/constants";
interface PlayList {
  sequence: number;
  name: string;
  thumbnail: string;
  video: string;
  products: any;
}

const GET_ALL_REELS = gql`
  query Query {
    getAllReels {
      id
      name
      thumbnail
      video
      productDetails {
        productId
        displayTitle
        url
        imageDetails {
          image_path
          order
          alt_text
        }
        productPrice
        discountPrice
      }
    }
  }
`;

// import Fade from 'react-reveal'
import { useProductContext } from "@/context/ProductContext";

const Whptv2 = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const { products, fetchData } = useProductContext();
  const [playList, setPlayList] = useState<any>();
  const [videos, setVideos] = useState<any>([]);
  const [currentVideo, setCurrentVideo] = useState<any>(null);

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

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });

      const { data } = await client.query({
        query: GET_ALL_REELS,
      });
      const fetchedData = data.getAllReels;
      setPlayList(fetchedData);

      // Assuming fetchedData is an array of objects
      const mappedData = fetchedData.map((item: any) => ({
        reelId: item.id, // Replace 'key1' with the actual key you want to map
        video: item.video,
      }));
      setVideos(mappedData); 
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortPlayList = useCallback(() => {
    const sortedPlayList = [...videos];
    if (currentVideo) {
      const currentVideoIndex = sortedPlayList.findIndex(
        (video) => video.reelId === currentVideo.reelId,
      );
      sortedPlayList.splice(currentVideoIndex, 1);
      sortedPlayList.unshift(currentVideo);
    }
    setVideos(sortedPlayList);
    console.log("Sorted PlayList", sortedPlayList);
  }, [currentVideo, playList]);

  useEffect(() => {
    sortPlayList();
  }, [sortPlayList]);

  const handleOpenModal = (video: PlayList) => {
    setShowModal(true);
    setCurrentVideo(video);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!isMobile) {
    return null;
  }
  if (loading) return null;
  return (
    <>
      <div className="collection-block pt-10 md:pt-20">
        <div className="flex flex-col justify-between gap-8 px-8 text-red-950">
          <h1 className="text-5xl">
            Shop with <br /> WHP TV
          </h1>
          <p className="font-medium text-gray-700">
            Elevate your day with our exquisite jewelry, perfect for any
            occasion. Find the piece that speaks to your style and story.
          </p>
        </div>
        <div className="list-collection section-swiper-navigation mt-6 px-4 sm:px-5 md:mt-10">
          <Swiper
            spaceBetween={12}
            slidesPerView={2}
            loop={true}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              576: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="h-full"
          >
            {playList.map((video: any, index: any) => (
              <SwiperSlide key={index}>
                <div
                  className="collection-item relative block cursor-pointer overflow-hidden"
                  onClick={() => handleOpenModal(video)}
                >
                  <div className="bg-img">
                    <Image
                      src={video.thumbnail}
                      width={1000}
                      height={600}
                      alt=""
                      unoptimized
                    />
                  </div>
                  <div className="collection-name heading7 w-[100px] bg-[#f7f7ff7] py-1.5 text-center duration-500 sm:bottom-8 md:w-[160px] md:py-3 lg:w-[150px]">
                    <span className="flex justify-center">
                      <span>Watch</span>
                      <span className="">
                        <Icon.Play weight="fill" color="#e26178" size={20} />
                      </span>
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {showModal && (
          <div
            className="modal"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              onClick={handleCloseModal}
              className="fixed right-5 top-5 z-50 rounded-full bg-white p-2 text-black"
            >
              <Icon.X size={25} />
            </button>
            <VideoFeed videos={videos} playList={playList} />
          </div>
        )}
      </div>
    </>
  );
};

export default Whptv2;
