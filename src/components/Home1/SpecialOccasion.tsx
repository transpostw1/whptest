
// "use client";
// import React from "react";
// import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.css";
// import Image from "next/image";

// // Install Swiper modules
// // SwiperCore.use([Navigation, Pagination, Autoplay]);

// const SpecialOccasion: React.FC = () => {
//   // Define an array of image paths
//   const imagePaths = [
//     {
//       src: "/images/other/Occassion1.png",
//       title: "Swarnak",
//       width: "1000",
//       height: "500",
//     },
//     {
//       src: "/images/other/Occassion2.png",
//       title: "Wedding Collection",
//       width: "1000",
//       height: "500",
//     },
//     {
//       src: "/images/other/Occassion3.png",
//       title: "Self Gifting Treasure",
//       width: "1000",
//       height: "500",
//     },
//     {
//       src: "/images/other/Occassion4.png",
//       title: "9Ratna : Gemstones",
//       width: "1000",
//       height: "500",
//     },
//   ];

//   return (
//     <div className="px-8">
//       <div className="flex flex-col justify-between text-red-950 gap-8">
//         <h1 className="text-5xl">
//           Something special for <br /> Every Occasion
//         </h1>
//         <p className="font-medium text-gray-700">
//           Crafted to add a touch of elegance and charm to every occasion. From
//           celebrations to <br />
//           cherished milestones, find the perfect piece that speaks to your
//           unique style and sentiments.
//         </p>
//       </div>
//       <div className="mt-8 relative ">
//         <Swiper
//           spaceBetween={6}
//           slidesPerView={1}
//           breakpoints={{
//             640: {
//               slidesPerView: 2,
//             },
//             768: {
//               slidesPerView: 3,
//             },
//             1024: {
//               slidesPerView: 4,
//             },
//           }}
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 2000 }}
//           loop={true} // Enable infinite loop
//           loopAdditionalSlides={10} // Number of additional slides to duplicate for loop
//           className="mySwiper"
//         >
//           {imagePaths.map((imagePath, index) => (
//             <SwiperSlide key={index}>
//               <div className="relative ">
//                 <Image
//                   src={imagePath.src}
//                   width={400}
//                   height={500}
//                   alt={`occassion${index}`}
//                   className="object-contain"
//                 />
//                 <p className="absolute bottom-0  text-white font-medium bg-opacity-50 p-4">
//                   {imagePath.title}
//                 </p>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default SpecialOccasion;


"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useRouter } from "next/navigation";
// import Fade from 'react-reveal'

const SpecialOccasion = () => {
  const router = useRouter();

  const handleTypeClick = (type: string) => {
    router.push(`/shop/breadcrumb1?type=${type}`);
  };

  return (
    <>
      <div className="collection-block md:pt-20 pt-10">
        {/* <div className="container"> */}
          {/* <Fade bottom> */}
          {/* <div className="heading3 text-center">Special Occasion</div> */}
          <div className="flex flex-col justify-between text-red-950 gap-8 px-8">
            <h1 className="text-5xl">
              Something special for <br /> Every Occasion
            </h1>
            <p className="font-medium text-gray-700">
              Crafted to add a touch of elegance and charm to every occasion.
              From celebrations to <br />
              cherished milestones, find the perfect piece that speaks to your
              unique style and sentiments.
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
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion1.png"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name heading7 text-center sm:bottom-8  lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  Swarnak
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("top")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion2.png"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name heading7 sm:heading-8 text-center sm:bottom-8  lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  Wedding Collections
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("sets")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion3.png"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name heading7 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  Self Gifting Treasure
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("outerwear")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion4.png"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name heading7 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  9Ratna Gemstones
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("underwear")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion2.png"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name heading7 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  Wedding Collection{" "}
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("t-shirt")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion3.png"}
                    width={1000}
                    height={600}
                    alt="gift"
                  />
                </div>
                <div className="collection-name heading7 sm:heading-8 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  Self Gifting Treasure
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SpecialOccasion;
