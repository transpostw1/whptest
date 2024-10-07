import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import GoldCard from "./GoldCard";
import DiamondCard from "./DiamondCard";
import SilverCard from "./SilverCard";
import FlashAlert from "@/components/Other/FlashAlert";

interface GmsROI {
  id: string;
  type: string;
  percentage: number;
}
interface MobileBenefitsProps {
  ROIData: GmsROI[] | null;
}

const MobileBenefits: React.FC = ({ ROIData }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [backendMessage, setBackendMessage] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [flashType, setFlashType] = useState<"success" | "error" | "info">(
    "info",
  );
  const [activeSlide, setActiveSlide] = useState<number>(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

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
    afterChange: (currentSlide: number) => setActiveSlide(currentSlide),
  };

  const getPercentageByType = (type: string) => {
    if (!ROIData) return 0;
    const roiItem = ROIData.find((item:any) => item.type === type);
    return roiItem ? roiItem.percentage : 0;
  };

  const cards = [
    {
      id: 1,
      component: (
        <GoldCard
          percentage={getPercentageByType("Gold")}
          setBackendMessage={setBackendMessage}
          setBackendError={setBackendError}
          setFlashType={setFlashType}
        />
      ),
    },
    {
      id: 2,
      component: (
        <DiamondCard
          percentage={getPercentageByType("Diamond")}
          setBackendMessage={setBackendMessage}
          setBackendError={setBackendError}
          setFlashType={setFlashType}
        />
      ),
    },
    {
      id: 3,
      component: (
        <SilverCard
          percentage={getPercentageByType("Silver")}
          setBackendMessage={setBackendMessage}
          setBackendError={setBackendError}
          setFlashType={setFlashType}
        />
      ),
    },
  ];
  useEffect(() => {
    if (backendMessage || backendError) {
      const timer = setTimeout(() => {
        setBackendMessage(null);
        setBackendError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [backendMessage, backendError]);

  const handleButtonClick = (slideIndex: number) => {
    setActiveSlide(slideIndex);
    sliderRef.current?.slickGoTo(slideIndex);
  };

  return isMobile ? (
    <div className="px-6 py-5 lg:hidden">
      <div className="mb-2 flex items-center justify-evenly">
        <button
          className={`w-24 rounded-lg font-semibold ${
            activeSlide === 0
              ? "bg-[#ebe3d5]"
              : "bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] text-white"
          }`}
          onClick={() => handleButtonClick(0)}
        >
          Gold
        </button>

        <button
          className={`w-24 rounded-lg font-semibold ${
            activeSlide === 1
              ? "bg-[#d0e1e2]"
              : "bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] text-white"
          }`}
          onClick={() => handleButtonClick(1)}
        >
          Diamond
        </button>
        <button
          className={`w-24 rounded-lg font-semibold ${
            activeSlide === 2
              ? "bg-[#edebed]"
              : "bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] text-white"
          }`}
          onClick={() => handleButtonClick(2)}
        >
          Silver
        </button>
      </div>
      <Slider {...settings} ref={sliderRef}>
        {cards.map((card) => (
          <div key={card.id} className="rounded-lg">
            {card.component}
          </div>
        ))}
      </Slider>
      {(backendMessage || backendError) && (
        <FlashAlert message={backendMessage || backendError} type={flashType} />
      )}
      {/* <div className="flex justify-center mt-4">
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
      </div> */}
    </div>
  ) : null;
};

export default MobileBenefits;
