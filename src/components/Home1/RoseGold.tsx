import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RoseGold = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex p-5 bg-[#f7f5f6]">
      <div className="mr-5">
        <p>Explore</p>
        <p className="text-4xl ">ROSE GOLD RANGE</p>
        <div className="w-[341px]">
          <p>
            Elevate your style with the warm, rosy embrace of rose gold
            jewellery.
            <br />
            Its timeless elegance adds a touch of sophistication to every look.
          </p>
        </div>
      </div>
      <div>
        <Slider {...settings}>
          <div>
            <Image
              src="/dummy/roseGoldRingBanner.png"
              alt="roseGoldRingBanner"
              width={50}
              height={62}
            />
          </div>
          <div className="">
            <Image
              src="/dummy/roseGoldRingBannerWithHand.png"
              alt="roseGoldRingBannerWithHand"
              width={50}
              height={65}
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default RoseGold;
