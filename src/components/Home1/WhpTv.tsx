"use client";

import React ,{useState, useEffect}from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import VideoFeed from "@/components/Video/VideoFeed";
import { useProductContext } from "@/context/ProductContext";


// import Fade from 'react-reveal'

const Whptv = () => {

  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State to track if the device is mobile
  const { products, fetchData } = useProductContext();
  const [playList,setPlayList]=useState([
    { sequence: 1, src: '/images/reels/1.mp4' },
    { sequence: 2, src: '/images/reels/2.mp4' },
    { sequence: 3, src: '/images/reels/3.mp4' },
    { sequence: 4, src: '/images/reels/4.mp4' },
    // more videos...
  ])
const [videos,setVideos]=useState([])
const [id,setId]=useState(1)


  // const router = useRouter();

  // const handleTypeClick = (type: string) => {
  //   router.push(`/shop/breadcrumb1?type=${type}`);
  // };


  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (e) => {
      setIsMobile(e.matches);
    };

    // Check immediately and add listener
    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleChange); // For compatibility with older browsers

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(()=>{
      for(const i of playList){
        if(i.sequence===id){
          i.sequence=0;
        }
      }
      let sortPlayList=[...playList]
       sortPlayList=playList.sort((a,b)=>(a.sequence-b.sequence));
      setVideos(sortPlayList);
    
  },[showModal, playList, id])
  // Define the missing functions to handle modal open and close
  
  const handleOpenModal = (id) => {
    setShowModal(true);
    setId(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Conditionally render based on isMobile
  if (!isMobile) {
    return null; // Do not render anything if not on mobile
  }

  return (
    <>
      <div className="collection-block md:pt-20 pt-10">
        {/* <div className="container"> */}
        {/* <Fade bottom> */}
        {/* <div className="heading3 text-center">Special Occasion</div> */}
        <div className="flex flex-col justify-between text-red-950 gap-8 px-8">
        <h1 className="text-5xl">
          Shop with <br /> WHP TV
        </h1>
        <p className="font-medium text-gray-700">
          Elevate your day with our exquisite jewelry, perfect for any occasion. Find the piece that speaks to your style and story.
        </p>
        </div>
        {/* </Fade> */}
        {/* </div> */}
        <div className="list-collection section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4">
          <Swiper
            spaceBetween={12}
            slidesPerView={2}
            // navigation
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
            <SwiperSlide>
              
                <div
                  className="collection-item block relative overflow-hidden cursor-pointer"
                  onClick={handleOpenModal(1)}
                >
                  <div className="bg-img">
                    <Image
                      src={"/images/reels/1.jpg"}
                      width={1000}
                      height={600}
                      alt=""
                    />
                  </div>
                  <div className="collection-name bg-[#f7f7ff7] heading7 text-center sm:bottom-8  lg:w-[150px] md:w-[160px] w-[100px] md:py-3 py-1.5 duration-500">
                    <span className="flex justify-center">
                      <span>Watch</span>
                      <span className="">
                        <Icon.Play weight="fill" color="#e26178" size={20} />
                      </span>
                    </span>
                  </div>
                </div>
              
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative overflow-hidden cursor-pointer"
                onClick={handleOpenModal(2)}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/reels/2.jpg"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name bg-[#f7f7ff7] heading7 text-center sm:bottom-8  lg:w-[150px] md:w-[160px] w-[100px] md:py-3 py-1.5 duration-500">
                  <span className="flex justify-center">
                    <span>Watch</span>
                    <span className="">
                      <Icon.Play weight="fill" color="#e26178" size={20} />
                    </span>
                  </span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative overflow-hidden cursor-pointer"
                onClick={handleOpenModal(3)}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/reels/3.jpg"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name bg-[#f7f7ff7] heading7 text-center sm:bottom-8  lg:w-[150px] md:w-[160px] w-[100px] md:py-3 py-1.5 duration-500">
                  <span className="flex justify-center">
                    <span>Watch</span>
                    <span className="">
                      <Icon.Play weight="fill" color="#e26178" size={20} />
                    </span>
                  </span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative overflow-hidden cursor-pointer"
                onClick={handleOpenModal(4)}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/reels/4.jpg"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name bg-[#f7f7ff7] heading7 text-center sm:bottom-8  lg:w-[150px] md:w-[160px] w-[100px] md:py-3 py-1.5 duration-500">
                  <span className="flex justify-center">
                    <span>Watch</span>
                    <span className="">
                      <Icon.Play weight="fill" color="#e26178" size={20} />
                    </span>
                  </span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative overflow-hidden cursor-pointer"
                onClick={handleOpenModal(5)}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/reels/5.jpg"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name bg-[#f7f7ff7] heading7 text-center sm:bottom-8  lg:w-[150px] md:w-[160px] w-[100px] md:py-3 py-1.5 duration-500">
                  <span className="flex justify-center">
                    <span>Watch</span>
                    <span className="">
                      <Icon.Play weight="fill" color="#e26178" size={20} />
                    </span>
                  </span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative overflow-hidden cursor-pointer"
                onClick={handleOpenModal(6)}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/reels/6.jpg"}
                    width={1000}
                    height={600}
                    alt="gift"
                  />
                </div>
                <div className="collection-name bg-[#f7f7ff7] heading7 text-center sm:bottom-8  lg:w-[150px] md:w-[160px] w-[100px] md:py-3 py-1.5 duration-500">
                  <span className="flex justify-center">
                    <span>Watch</span>
                    <span className="">
                      <Icon.Play weight="fill" color="#e26178" size={20} />
                    </span>
                  </span>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        {showModal && (
        <div className="modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <button onClick={handleCloseModal} className="fixed top-5 right-5 bg-white text-black p-2 rounded-full z-50"><Icon.X size={25} /></button>
          <VideoFeed videos={videos} products={products} />
        </div>
      )}
      </div>
    </>
  );
};

export default Whptv;
