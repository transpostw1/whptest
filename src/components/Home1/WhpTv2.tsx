"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import VideoFeed from "@/components/Video/VideoFeed";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";

interface PlayList {
  id: string;
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

const Whptv2 = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [playList, setPlayList] = useState<PlayList[]>([]);
  const [videos, setVideos] = useState<PlayList[]>([]);
  const [currentVideo, setCurrentVideo] = useState<PlayList | null>(null);

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

      const fetchedData: PlayList[] = data.getAllReels;
      setPlayList(fetchedData);
      setVideos(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (clickedVideo: PlayList) => {
    setShowModal(true);

    const rearrangedVideos = videos.filter((video) => video.id !== clickedVideo.id);
    rearrangedVideos.unshift(clickedVideo);
    setVideos(rearrangedVideos);
    setCurrentVideo(clickedVideo); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentVideo(null);
  };

  if (!isMobile) {
    return null;
  }
  if (loading) return null;

  return (
    <div className="collection-block pt-10 md:pt-20">
      <div className="flex flex-col justify-between gap-8 px-8 text-red-950">
        <h1 className="text-5xl">
          Shop with <br /> WHP TV
        </h1>
        <p className="font-medium text-gray-700">
          Elevate your day with our exquisite jewelry, perfect for any occasion.
          Find the piece that speaks to your style and story.
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
          {playList.map((video) => (
            <SwiperSlide key={video.id}>
              <div
                className="collection-item relative block cursor-pointer overflow-hidden"
                onClick={() => handleOpenModal(video)}
              >
                <div className="bg-img">
                  <Image
                    src={video.thumbnail}
                    width={1000}
                    height={600}
                    alt={video.name || "Video Thumbnail"}
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
      {showModal && currentVideo && (
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
  );
};

export default Whptv2;