/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ProductType } from "@/type/ProductType";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import Accordian from "./Accordian";
import GoldSchemeSmallBanner from "./GoldSchemeSmallBanner";
import CheckPincode from "./CheckPincode";
import Buttons from "./Buttons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { baseUrl } from "@/utils/constants";

interface Props {
  productId: string | number | null;
}

const Default: React.FC<Props> = ({ productId }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [metal, setMetal] = useState<string>("Gold");
  const [karat, setKarat] = useState<string>("22k");
  const [size, setSize] = useState<string>("3.0");
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const settingsMain = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: nav2,
  };

  const settingsThumbnails = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: nav1,
    nextArrow: <Icon.CaretRight size={50} />,
    prevArrow: <Icon.CaretLeft size={40} />,
  };

  async function getData() {
    const res = await fetch(`${baseUrl}/products/${productId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    setLoading(true);
    return res.json();
  }

  async function singleProduct() {
    const product = await getData();
    setData(product);
    setLoading(false);
  }

  useEffect(() => {
    singleProduct();
  }, [productId]);

  const product = data[0];

  const formattedDiscountedPrice = Intl.NumberFormat("en-IN").format(
    Math.round(parseFloat((data && product?.discountPrice) ?? 0))
  );

  const formattedOriginalPrice = Intl.NumberFormat("en-IN").format(
    Math.round(parseFloat((data && product?.productPrice) ?? 0))
  );

  return (
    <>
      <div className="lg:flex">
        <div className="lg:w-[50%] sm:w-[100%]">
          {loading ? (
            <Skeleton height={500} width={700} />
          ) : (
            <div className="bg-[#fffff]">
              <Slider {...settingsMain} ref={(slider: any) => setNav1(slider)}>
                {product &&
                  product.imageDetails
                    .sort((a, b) => parseInt(a.order) - parseInt(b.order))
                    .map((image, index) => (
                      <div key={index}>
                        <InnerImageZoom
                          src={image.image_path}
                          srcSet={image}
                          zoomScale={1.5}
                          zoomType="click"
                          hideCloseButton={true}
                        />
                      </div>
                    ))}
              </Slider>
              <div className="m-auto w-[60%] h-full">
                <Slider
                  {...settingsThumbnails}
                  ref={(slider: any) => setNav2(slider)}
                >
                  {product &&
                    product.imageDetails
                      .sort((a, b) => parseInt(a.order) - parseInt(b.order))
                      .map((image, index) => (
                        <div key={index}>
                          <Image
                            src={image?.image_path}
                            alt={product?.title}
                            width={100}
                            height={100}
                            className="lg:mr-1 cursor-pointer"
                          />
                        </div>
                      ))}
                </Slider>
              </div>
            </div>
          )}
          <>
            <video
              className=""
              src="/products/GERD23021256.mp4"
              loop
              autoPlay
            />
          </>
        </div>
        <div className="lg:w-[50%] sm:w-[100%] lg:ml-[25px]  p-4">
          {loading ? (
            <Skeleton height={30} />
          ) : (
            <div className="flex justify-between lg:w-[100%] sm:w-[100%]">
              <p className="font-semibold text-3xl">{product?.title}</p>
              <span className="rounded-full bg-[#e26178] px-[7px] py-[7px] mr-2 h-[45px] w-[45px]">
                <Icon.ShareFat size={30} weight="fill" className="text-white" />
              </span>
            </div>
          )}
          <p className="mb-2">Gold, 2.6 gms, Pear cut Diamonds - 0.116 Carat</p>
          <div className="flex flex-wrap mb-2">
            <div>
              <span className="underline mr-2 cursor-pointer">12 Review</span>
            </div>
            <div className="rounded-full bg-[#e26178] text-transparent h-2 w-2 mt-3">
              3
            </div>
            <div className="flex">
              <span className="flex mt-1">
                <Icon.Star weight="fill" color="#f4ed25" />
                <Icon.Star weight="fill" color="#f4ed25" />
                <Icon.Star weight="fill" color="#f4ed25" />
                <Icon.Star weight="fill" color="#f4ed25" />
                <Icon.Star weight="fill" color="#f4ed25" />
              </span>
            </div>
          </div>
          {loading ? (
            <Skeleton height={30} />
          ) : (
            <div className="mb-5">
              <span className="font-extrabold text-2xl">
                ₹{formattedDiscountedPrice}
              </span>
              <span className="line-through ml-3 text-[#aa9e9e]">
                ₹{formattedOriginalPrice}
              </span>
              <span className="ml-3 text-[#e26178] underline">
                {product && product?.discountValue}% OFF on{" "}
                {product && product?.discountCategory}
              </span>
            </div>
          )}
          <div>
            <span>
              Upon Price Drop,{" "}
              <span className="underline text-[#e26178]">Notify Me</span>
            </span>
          </div>
          <div className="flex border border-[#f3f3f3] lg:w-[65%] sm:w-[100%] md:w-[65%] p-3">
            <div className="mr-3">
              <p>Metal</p>
              <div className="relative">
                <select
                  className="bg-[#faf9f9] p-4 pt-2 pb-2 mr-2 block appearance-none lg:w-[7.5rem] sm:w-20 md:w-[7.5rem]"
                  value={metal}
                  onChange={(e) => setMetal(e.target.value)}
                >
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="Rose Gold"
                  >
                    Rose Gold
                  </option>
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="Gold"
                  >
                    Gold
                  </option>
                </select>
                <div className="pointer-events-none ml-3 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <Icon.CaretDown size={20} weight="fill" />
                </div>
              </div>
            </div>
            <div className="mr-3">
              <p>Karat</p>
              <div className="relative">
                <select
                  className="bg-[#faf9f9] p-4 pt-2 pb-2 mr-2 block appearance-none sm:w-20 lg:w-20"
                  value={karat}
                  onChange={(e) => setKarat(e.target.value)}
                >
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="Rose Gold"
                  >
                    22k
                  </option>
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="Gold"
                  >
                    18k
                  </option>
                </select>
                <div className="pointer-events-none ml-3 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <Icon.CaretDown size={20} weight="fill" />
                </div>
              </div>
            </div>
            <div className="mr-3">
              <div className="flex m-auto">
                <p className="mt-1">Size</p>
                <span className="text-white rounded-full bg-[#e26178] w-[18px] h-[18px] ml-1 text-center text-sm font-semibold mt-2">
                  i
                </span>
              </div>

              <div className="relative">
                <select
                  className="bg-[#faf9f9] p-4 pt-2 pb-2 mr-2 block appearance-none w-20"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="3.0"
                  >
                    3.0
                  </option>
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="4.0"
                  >
                    4.0
                  </option>
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="5.0"
                  >
                    5.0
                  </option>
                  <option
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value="6.0"
                  >
                    6.0
                  </option>
                </select>
                <div className="pointer-events-none ml-3 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <Icon.CaretDown size={20} weight="fill" />
                </div>
              </div>
            </div>
          </div>
          <p className="mt-2">
            Only{" "}
            <span className="text-[#e26178]">
              {product && product?.productQty}pieces
            </span>{" "}
            left!
          </p>
          <div className="mt-4">
            <ul className="list-disc">
              <li>
                10% off on HDFC Bank Credit Card. Use{" "}
                <span className="font-extrabold">HDFC10 </span>
                <span className="text-[#e26178] underline">
                  View more Offers
                </span>
              </li>
              <li>
                7% off on SBI Bank Credit Card. Use{" "}
                <span className="font-extrabold">SBI17 </span>
                <span className="text-[#e26178] underline">
                  View more Offers
                </span>
              </li>
            </ul>
          </div>
          <CheckPincode />
          {loading ? <Skeleton height={70} /> : <Buttons product={product} />}

          <div className="mt-4 border border-[#f7f7f7] w-[445px] p-2 text-center">
            <span className="underline text-[#e26178] cursor-pointer ">
              Schedule free trial
            </span>
            <span> or </span>
            <span className="underline text-[#e26178] cursor-pointer">
              Try at Home
            </span>
            <span> today!</span>
          </div>
          <GoldSchemeSmallBanner />
          <Accordian product={product} />
        </div>
      </div>
    </>
  );
};

export default Default;
