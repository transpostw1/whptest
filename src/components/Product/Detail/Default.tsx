/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useRef, useState } from "react";
import StickyNav from "@/components/Header/StickyNav";
import Image from "next/image";
import { ProductData, ProductType } from "@/type/ProductType";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import Accordian from "./Accordian";
import { useRouter } from "next/navigation";
import ReviewsAndRatings from "./ReviewsAndRatings";
import GoldSchemeSmallBanner from "./GoldSchemeSmallBanner";
import CheckPincode from "./CheckPincode";
import Buttons from "./Buttons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { baseUrl } from "@/utils/constants";
import axios from "axios";
import SimilarProducts from "@/components/Other/SimilarProducts";
import useRecentlyViewedProducts from "@/hooks/useRecentlyViewedProducts";
import DropDown from "./DropDown";
import StarRating from "@/components/Other/StarRating";

interface Props {
  productId: string | number | null;
}

const Default: React.FC<Props> = ({ productId }) => {
  const router = useRouter();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [variant, setVariant] = useState<string>("");
  const [data, setData] = useState<ProductData>({});
  const [loading, setLoading] = useState<boolean>(true);

  // const { recentlyViewedProducts, saveToRecentlyViewed } =
  //   useRecentlyViewedProducts();

  const settingsMain = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: nav2,
  };

  async function getData() {
    const res = await axios.get(`${baseUrl}/products/${productId}`);
    setLoading(true);
    return res.data;
  }

  async function singleProduct() {
    const product = await getData();
    setData(product);
    setLoading(false);
  }

  useEffect(() => {
    singleProduct();
  }, []);

  const handleNewVariant = async (newUrl: string) => {
    try {
      setVariant(newUrl);
      setLoading(true);
      const response = await axios.get(`${baseUrl}/products/${newUrl}`);
      setData(await response.data);
    } catch (error) {
      console.error("error in fetching variants", error);
    } finally {
      setLoading(false);
    }
  };
  const slidesToShow = Math.min(
    3,
    data?.productDetails?.imageDetails?.length || 0
  );
  let sliderRef = useRef<any>();
  const settingsThumbnails = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: nav1,
  };

  // useEffect(() => {
  //   if (data) {
  //     saveToRecentlyViewed(data);
  //   }
  // }, [data, saveToRecentlyViewed]);

  const formattedDiscountedPrice = Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
  }).format(
    Math.round(parseFloat((data && data?.productDetails?.discountPrice) ?? 0))
  );

  const formattedOriginalPrice = Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
  }).format(
    Math.round(parseFloat((data && data?.productDetails?.productPrice) ?? 0))
  );

  return (
    <>
      <StickyNav />
      <div className="lg:flex">
        <div className="lg:w-[50%] sm:w-[100%]">
          {loading ? (
            <Skeleton height={500} width={700} />
          ) : (
            <div className="bg-[#fffff]">
              <Slider {...settingsMain} ref={(slider: any) => setNav1(slider)}>
                {data &&
                  data?.productDetails?.imageDetails
                    .sort(
                      (a: any, b: any) => parseInt(a.order) - parseInt(b.order)
                    )
                    .map((image: any, index: any) => (
                      <div key={index} className="">
                        <InnerImageZoom
                          src={image.image_path}
                          zoomScale={1.5}
                          zoomType="click"
                          hideCloseButton={true}
                        />
                      </div>
                    ))}
              </Slider>
              <div className="m-auto w-[60%] h-full relative">
                <>
                  <Slider
                    {...settingsThumbnails}
                    ref={(slider) => {
                      sliderRef = slider;
                    }}
                  >
                    {data &&
                      data.productDetails?.imageDetails
                        .sort(
                          (a: any, b: any) =>
                            parseInt(a.order) - parseInt(b.order)
                        )
                        .map((image: any, index: any) => (
                          <div key={index}>
                            <Image
                              src={image?.image_path}
                              alt={data?.productDetails?.title}
                              width={100}
                              height={100}
                              className="cursor-pointer border"
                            />
                          </div>
                        ))}
                  </Slider>
                </>
                <div className="absolute top-[40px] -right-[10px] cursor-pointer">
                  <Icon.CaretRight
                    onClick={() => sliderRef.slickNext()}
                    size={25}
                  />
                </div>
                <div className="absolute top-[40px] -left-[50px] cursor-pointer">
                  <Icon.CaretLeft
                    onClick={() => sliderRef.slickPrev()}
                    size={25}
                  />
                </div>
              </div>
            </div>
          )}

          {data &&
            data.productDetails?.videoDetails &&
            data.productDetails?.videoDetails.length > 0 &&
            data.productDetails?.videoDetails.map((item: any) => (
              <video
                key={item.order}
                className=""
                src={item.video_path}
                loop
                autoPlay
                muted
              />
            ))}
        </div>
        <div className="lg:w-[50%] sm:w-[100%] lg:ml-[25px]  p-4">
          {loading ? (
            <Skeleton height={30} />
          ) : (
            <>
              <div className="flex justify-between lg:w-[100%] sm:w-[100%]">
                <p className="font-semibold text-3xl">
                  {data?.productDetails.displayTitle}
                </p>
                <span className="rounded-full bg-[#e26178] px-[7px] py-[7px] mr-2 h-[45px] w-[45px]">
                  <Icon.ShareFat
                    size={30}
                    weight="fill"
                    className="text-white"
                  />
                </span>
              </div>
              {data?.productDetails?.review && (
                <div className="flex flex-wrap mb-2">
                  <div>
                    <span className="underline mr-2 cursor-pointer">
                      {data?.productDetails?.review.length} Review
                    </span>
                  </div>
                  <div className="rounded-full bg-[#e26178] text-transparent h-2 w-2 mt-3">
                    3
                  </div>
                    <StarRating stars={data?.productDetails?.rating} />
                  
                </div>
              )}
            </>
          )}
          {loading ? (
            <Skeleton height={30} />
          ) : (
            <div className="mb-5">
              {data?.productDetails?.discountPrice && (
                <>
                  <span className="font-extrabold text-2xl">
                    ₹{formattedDiscountedPrice}
                  </span>
                  <span className="line-through ml-3 text-[#aa9e9e]">
                    ₹{formattedOriginalPrice}
                  </span>
                  <span className="ml-3 text-[#e26178] underline">
                    {data && data?.productDetails.discountValue}% OFF on{" "}
                    {data && data?.productDetails.discountCategory}
                  </span>
                </>
              )}
              {data?.productDetails?.discountPrice == null && (
                <>
                  <span className="font-extrabold text-2xl">
                    ₹{formattedOriginalPrice}
                  </span>
                </>
              )}
            </div>
          )}
          <div>
            <span>
              Upon Price Drop,{" "}
              <span className="underline text-[#e26178]">Notify Me</span>
            </span>
          </div>
          {data?.productDetails?.variantId !== null && (
            <DropDown product={data} handleVariant={handleNewVariant} />
          )}
          {data && data?.productDetails?.productQty !== null && (
            <p className="mt-2">
              Only{" "}
              <span className="text-[#e26178]">
                {data && data?.productDetails?.productQty} pieces
              </span>{" "}
              left!
            </p>
          )}
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
          {loading ? <Skeleton height={70} /> : <Buttons product={data} />}

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
          <Accordian product={data} />
        </div>
      </div>
      <div className="">
        <ReviewsAndRatings product={data} />
      </div>
      <div>
        {data && (
          <SimilarProducts
            productId={data?.productDetails?.productId}
            start={0}
            limit={4}
          />
        )}
      </div>
    </>
  );
};

export default Default;
