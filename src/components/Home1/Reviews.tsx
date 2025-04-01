"use client";
import React, { useEffect, useState, useRef } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react";
import Image from "next/image";
import { graphqlbaseUrl } from "@/utils/constants";

interface Testimonial {
  id: string;
  name: string;
  feedback: string;
  image: string;
}

const GET_TESTIMONIALS = gql`
  query GetAllTestimonials {
    getAllTestimonials {
      id
      name
      feedback
      image
    }
  }
`;

const Reviews: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const [expanded, setExpanded] = useState(false);
  const maxLength = 150; // Max characters before truncation

  const fetchTestimonials = async () => {
    try {
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });

      const { data } = await client.query({
        query: GET_TESTIMONIALS,
      });

      setTestimonials(data.getAllTestimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

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
    beforeChange: (current: any, next: any) => setActiveSlide(next),
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
          <div className="flex w-full justify-between pe-2 md:block md:w-auto">
            <h1 className="mb-8 text-2xl text-red-950 md:text-5xl">
              Hear from our <br /> customers
            </h1>
            <div className="mb-8 hidden -space-x-4 md:flex rtl:space-x-reverse">
              {testimonials
                .slice(activeSlide, activeSlide + 2)
                .map((testimonial, index) => (
                  <div
                    key={index}
                    className="h-20 w-20 overflow-hidden rounded-full"
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>

            <div className="flex cursor-pointer items-center gap-8">
              <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
              <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
            </div>
          </div>
        </div>
        <div className="m-0 h-full w-full items-center md:mt-8 md:w-[60%]">
          <Slider {...settings} ref={sliderRef}>
            {testimonials.map((testimonial) => {
              return (
                <div key={testimonial.id} className="h-80 p-2">
                  <div className="flex h-full flex-col gap-5 border border-gray-200 bg-white p-4 text-red-950">
                    {/* Feedback Section */}
                    <p className="mb-4 text-sm">
                      {expanded || testimonial.feedback.length <= maxLength
                        ? testimonial.feedback
                        : `${testimonial.feedback.substring(0, maxLength)}...`}
                    </p>

                    {/* Read More Button */}
                    {testimonial.feedback.length > maxLength && (
                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="self-start text-sm text-[#e26178] hover:underline"
                      >
                        {expanded ? "Read Less" : "Read More"}
                      </button>
                    )}

                    {/* Image & Name Section */}
                    <div className="flex items-center gap-3">
                      {testimonial.image && (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={50}
                          height={50}
                          className="rounded-full"
                          unoptimized
                        />
                      )}
                      <h1 className="text-lg font-bold">{testimonial.name}</h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Reviews;
