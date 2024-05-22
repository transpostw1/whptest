import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import GoldCard from "./GoldCard";
import DiamondCard from "./DiamondCard";
import SilverCard from "./SilverCard";

const MobileBenefits: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Type the ref correctly
  const sliderRef = useRef<Slider>(null);

  const CustomPrevArrow = (props: any) => (
    <div className="custom-arrow prev" onClick={props.onClick}>
      <MdArrowBackIos size={26} />
    </div>
  );

  const CustomNextArrow = (props: any) => (
    <div className="custom-arrow next" onClick={props.onClick}>
      <MdArrowForwardIos size={26} />
    </div>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const cards = [
    { id: 1, component: <GoldCard /> },
    { id: 2, component: <DiamondCard /> },
    { id: 3, component: <SilverCard /> },
  ];

  return isMobile ? (
    <div className="md:hidden  px-10 ">
      <Slider {...settings} ref={sliderRef}>
        {cards.map((card) => (
          <div key={card.id} className="rounded-lg">
            {card.component}
          </div>
        ))}
      </Slider>
      <div className="flex justify-center mt-4">
        <div className="flex gap-4">
          <div
            className="border border-gray-400 text-gray-400 rounded-full p-4"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
          </div>
          <div
            className="border border-gray-400 text-gray-400  rounded-full p-4"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default MobileBenefits;
