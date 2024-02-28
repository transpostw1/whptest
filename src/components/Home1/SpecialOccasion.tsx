// "use client"
// import React from "react";
// import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.css";
// import Image from "next/image";

// const SpecialOccasion: React.FC = () => {
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
//       <div className="mt-8">
//         <Swiper
//           spaceBetween={20}
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
//           //   navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 5000 }}
//           className="mySwiper"
//         >
//           <SwiperSlide>
//             <div className="relative">
//               <Image
//                 src={"/images/other/Occassion1.png"}
//                 width={1000}
//                 height={500}
//                 alt="occassion1"
//               />
//               <p className="absolute bottom-0 text-white font-medium bg-opacity-50 px-4 py-2">
//                 Swarnak
//               </p>
//             </div>
//           </SwiperSlide>
//           <SwiperSlide>
//             <div className="relative">
//               <Image
//                 src={"/images/other/Occassion2.png"}
//                 width={1000}
//                 height={500}
//                 alt="occassion2"
//               />
//               <p className="absolute bottom-0  text-white font-medium bg-opacity-50 px-4 py-2">
//                 Wedding Collection
//               </p>
//             </div>
//           </SwiperSlide>
//           <SwiperSlide>
//             <div className="relative">
//               <Image
//                 src={"/images/other/Occassion3.png"}
//                 width={1000}
//                 height={500}
//                 alt="occassion3"
//               />
//               <p className="absolute bottom-0  text-white font-medium bg-opacity-50 px-4 py-2">
//                 Self Gifting Treasure
//               </p>
//             </div>
//           </SwiperSlide>
//           <SwiperSlide>
//             <div className="relative">
//               <Image
//                 src={"/images/other/Occassion4.png"}
//                 width={1000}
//                 height={500}
//                 alt="occassion4"
//               />
//               <p className="absolute bottom-0  text-white font-medium bg-opacity-50 px-4 py-2">
//                 9Ratna : Gemstones
//               </p>
//             </div>
//           </SwiperSlide>
//           {/* Add more SwiperSlides for additional images */}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default SpecialOccasion;

"use client";
import React from "react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Image from "next/image";

// Install Swiper modules
// SwiperCore.use([Navigation, Pagination, Autoplay]);

const SpecialOccasion: React.FC = () => {
  // Define an array of image paths
  const imagePaths = [
    {
      src: "/images/other/Occassion1.png",
      title: "Swarnak",
      width: "1000",
      height: "500",
    },
    {
      src: "/images/other/Occassion2.png",
      title: "Wedding Collection",
      width: "1000",
      height: "500",
    },
    {
      src: "/images/other/Occassion3.png",
      title: "Self Gifting Treasure",
      width: "1000",
      height: "500",
    },
    {
      src: "/images/other/Occassion4.png",
      title: "9Ratna : Gemstones",
      width: "1000",
      height: "500",
    },
  ];

  return (
    <div className="px-8">
      <div className="flex flex-col justify-between text-red-950 gap-8">
        <h1 className="text-5xl">
          Something special for <br /> Every Occasion
        </h1>
        <p className="font-medium text-gray-700">
          Crafted to add a touch of elegance and charm to every occasion. From
          celebrations to <br />
          cherished milestones, find the perfect piece that speaks to your
          unique style and sentiments.
        </p>
      </div>
      <div className="mt-8 relative">
        <Swiper
          spaceBetween={6}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          loop={true} // Enable infinite loop
          loopAdditionalSlides={10} // Number of additional slides to duplicate for loop
          className="mySwiper"
        >
          {imagePaths.map((imagePath, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <Image
                  src={imagePath.src}
                  width={400}
                  height={500}
                  alt={`occassion${index}`}
                  className="object-contain"
                />
                <p className="absolute bottom-0  text-white font-medium bg-opacity-50 p-4">
                 {imagePath.title}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SpecialOccasion;
