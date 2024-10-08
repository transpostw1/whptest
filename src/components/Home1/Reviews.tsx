"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react";
import Image from "next/image";

interface Testimonial {
  content: string;
  author: string;
}

const TestimonialData: Testimonial[] = [
  {
    content:
      "WHP is a great shop for jewellery purchases not only is this shop located at prime destination but it also has a large premise making it easy for the customers to move across the various options of jewellery. If one thing I should tell you is that the gold quality of Waman Hari Pethe is excellent",
    author: "Amrutha Joshi",
  },
  {
    content:
      "WHP is a great shop for jewellery purchases not only is this shop located at prime destination but it also has a large premise making it easy for the customers to move across the various options of jewellery. If one thing I should tell you is that the gold quality of Waman Hari Pethe is excellent",
    author: "Christian Bale",
  },
  {
    content:
      "WHP is a great shop for jewellery purchases not only is this shop located at prime destination but it also has a large premise making it easy for the customers to move across the various options of jewellery. If one thing I should tell you is that the gold quality of Waman Hari Pethe is excellent",
    author: "Ryan Gosling",
  },
  {
    content:
      "WHP is a great shop for jewellery purchases not only is this shop located at prime destination but it also has a large premise making it easy for the customers to move across the various options of jewellery. If one thing I should tell you is that the gold quality of Waman Hari Pethe is excellent",
    author: "Christian Bale",
  },
];

const Reviews: React.FC = () => {
  const sliderRef = useRef<Slider>(null);

  const CustomPrevArrow: React.FC<{ onClick: () => void }> = (props) => (
    <div className="custom-arrow prev" onClick={props.onClick}>
      <ArrowLeft size={26} />
    </div>
  );

  const CustomNextArrow: React.FC<{ onClick: () => void }> = (props) => (
    <div className="custom-arrow next" onClick={props.onClick}>
      <ArrowRight size={26} />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: (
      <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
    ),
    nextArrow: (
      <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
    ),
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="mt-28 flex flex-col items-center pl-8 md:mb-16 md:flex-row">
        <div className="flex w-full flex-col items-start md:w-[40%]">
          <h2 className="mb-5 text-[1.5rem] font-semibold uppercase">
            TESTIMONIALS
          </h2>
          <div className="w-100 flex justify-between pe-2 md:block md:w-auto">
            <h1 className="mb-8 text-2xl text-red-950 md:text-5xl">
              Hear from our <br /> customers
            </h1>
            <div className="mb-8 hidden -space-x-4 md:flex rtl:space-x-reverse">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-20 w-20 overflow-hidden rounded-full border-2 border-gray-300"
                >
                  <Image
                    src="/images/other/userimage.jpg"
                    alt="User"
                    width={80}
                    height={80}
                    unoptimized
                  />
                </div>
              ))}
              {/* <a
              className="flex items-center justify-center w-20 h-20 text-xs font-medium text-white bg-gray-700 border-2 border-gray-300 rounded-full hover:bg-gray-600"
              href="#"
            >
              +99
            </a> */}
            </div>
            <div className="flex cursor-pointer items-center gap-8">
              <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
              <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
            </div>
          </div>
        </div>
        <div className="m-0 h-full w-full items-center md:mt-8 md:w-[60%]">
          <Slider {...settings} ref={sliderRef}>
            {TestimonialData.map((testimonial, index) => (
              <div key={index} className="p-2">
                <div className="flex h-full flex-col border border-gray-200 bg-white p-4 text-red-950">
                  <p className="mb-32 text-sm">{testimonial.content}</p>
                  <h1 className="text-lg font-bold">{testimonial.author}</h1>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Reviews;
