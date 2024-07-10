/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useRef, useState, MutableRefObject } from "react";
import Image from "next/image";
import { ProductData, ProductType } from "@/type/ProductType";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Slider from "react-slick";
import Accordian from "./Accordian";
import StickyNavProductPage from "@/components/Other/StickyNavProductPage";
import { useRouter } from "next/navigation";
import ReviewsAndRatings from "./ReviewsAndRatings";
import CheckPincode from "./CheckPincode";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import GoldSchemeSmallBanner from "./GoldSchemeSmallBanner";
import { baseUrl, graphqlProductUrl } from "@/utils/constants";
import Buttons from "./Buttons";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import SimilarProducts from "@/components/Other/SimilarProducts";
import useRecentlyViewedProducts from "@/hooks/useRecentlyViewedProducts";
import DropDown from "./DropDown";
import StarRating from "@/components/Other/StarRating";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import AffordabilityWidget from "./AffordabilityWidget";
import CtaButtonsMobile from "./CtaButtonsMobile";
import ReactImageMagnify from "react-image-magnify";
import ZoomableImage from "./ZoomableImage";

interface Props {
  productId: string | number | any;
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
    const client = new ApolloClient({
      // uri: "http://localhost:8080/",
      uri: graphqlProductUrl,
      cache: new InMemoryCache(),
    });
    const GET_SINGLE_PRODUCT = gql`
      query productDetails($productUrl: String!) {
        productDetails(productUrl: $productUrl) {
          productId
          SKU
          variantId
          isParent
          title
          displayTitle
          shortDesc
          longDesc
          url
          tags
          collectionName
          shopFor
          occasion
          theme
          length
          breadth
          height
          addDate
          lastModificationDate
          productSize
          productQty
          attributeId
          preSalesProductQueries
          isReplaceable
          isReturnable
          isInternationalShippingAvailable
          customizationAvailability
          fastDelivery
          tryAtHome
          isActive
          grossWeight
          netWeight
          discountId
          discountCategory
          discountActive
          typeOfDiscount
          discountValue
          discountAmount
          discountPrice
          offerStartDate
          offerEndDate
          mediaId
          metalType
          metalPurity
          metalWeight
          metalRate
          makingType
          makingChargesPerGrams
          makingCharges
          gst
          additionalCost
          productPrice
          discountPrice
          rating
          imageDetails {
            image_path
            order
            alt_text
          }
          videoDetails {
            video_path
            order
            alt_text
          }
          productAttributes {
            goldDetails {
              goldCertifiedBy
              goldSetting
            }
            gemstoneDetails
            diamondDetails
            silverDetails {
              poojaArticle
              utensils
              silverWeight
            }
          }
          stoneDetails
          diamondDetails
          review
          variants
        }
      }
    `;
    let productUrl = "";
    if (variant) {
      productUrl = variant;
    } else {
      productUrl = productId[1];
    }

    const { data } = await client.query({
      query: GET_SINGLE_PRODUCT,
      variables: { productUrl: productUrl },
    });

    // const res = await axios.get(`${baseUrl}/products/${productId}`);
    setLoading(true);
    return data;
  }

  async function singleProduct() {
    console.log("Single Product");
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
      const match = newUrl.match(/0p(\d+)/);
      const newId = match ? match[1] : "";
      router.push(`/products/${newId}/${newUrl}`);
      setLoading(true);
      // const response = await axios.get(`${baseUrl}/products/${newUrl}`);
      setData(await data);
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

  let sliderRef = useRef<any>(null);

  const settingsThumbnails = {
    className: "center",
    centerMode: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    centerPadding: "10px",
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: Math.min(
            3,
            data?.productDetails?.imageDetails?.length || 0
          ),
          centerPadding: "5px",
        },
      },
    ],
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
  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      console.log("Share API not supported");
    }
  };
  return (
    <>
      <StickyNavProductPage />
      <CtaButtonsMobile product={data} />
      <div className="lg:flex">
        <div className="lg:w-1/2 sm:w-full">
          {loading ? (
            <Skeleton height={500} width={550} />
          ) : (
            <div className="bg-[#f7f7f7]">
              <Slider {...settingsMain} ref={(slider: any) => setNav1(slider)}>
                {data?.productDetails?.imageDetails.map((image: any, index: any) => (
                  <div key={index} className="flex justify-center items-center h-full">
                    <div className="max-w-full max-md:h-[300px] h-[600px]">
                      <ZoomableImage
                        src={image.image_path}
                        alt="Product Image"
                      />
                    </div>
                  </div>
                ))}
                {data?.productDetails?.videoDetails?.length > 0 &&
                  data.productDetails.videoDetails.map((item: any) => (
                    <div key={item.order} className="flex justify-center items-center h-full">
                      <video
                        className="max-w-full max-h-full object-contain"
                        src={item.video_path}
                        loop
                        autoPlay
                        muted
                      />
                    </div>
                  ))}
              </Slider>
              <div className="m-auto w-3/5 h-full relative">
                <>
                  <Slider
                    {...settingsThumbnails}
                    ref={(slider: any) => {
                      sliderRef = slider;
                      setNav2(slider);
                    }}
                  >
                    {data?.productDetails?.imageDetails.map((image: any, index: any) => (
                      <div key={index}>
                        <Image
                          src={image?.image_path}
                          alt={data?.productDetails?.title}
                          width={100}
                          height={100}
                          className="cursor-pointer mx-3 border"
                        />
                      </div>
                    ))}
                    {data?.productDetails?.videoDetails?.length > 0 &&
                      data.productDetails.videoDetails.map((item: any) => (
                        <video
                          key={item.order}
                          className="cursor-pointer mx-3 border"
                          src={item.video_path}
                          muted
                        />
                      ))}
                  </Slider>
                </>
                <div className="absolute top-6 -right-2 max-sm:-right-10 cursor-pointer">
                  <Icon.CaretRight
                    onClick={() => sliderRef.slickNext()}
                    size={25}
                  />
                </div>
                <div className="absolute top-6 -left-12 cursor-pointer">
                  <Icon.CaretLeft
                    onClick={() => sliderRef.slickPrev()}
                    size={25}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="lg:w-1/2 sm:w-full lg:ml-6 p-4">
          {loading ? (
            <Skeleton height={30} />
          ) : (
            <>
              <div className="flex justify-between w-full">
                <p className="font-semibold text-3xl">
                  {data?.productDetails.displayTitle}
                </p>
                <span
                  className="rounded-full bg-[#e26178] px-2 py-2 mr-2 h-9 w-9 flex justify-center items-center cursor-pointer"
                  onClick={handleShareClick}
                >
                  <Icon.ShareFat
                    size={25}
                    weight="fill"
                    className="text-white"
                  />
                </span>
              </div>
              {data?.productDetails?.review.length !== 0 && (
                <div className="flex flex-wrap mb-2">
                  <div>
                    <span className="underline mr-2 cursor-pointer">
                      {data?.productDetails?.review.length} Review
                    </span>
                  </div>
                  | <StarRating stars={data?.productDetails?.rating} />
                </div>
              )}
            </>
          )}
          {loading ? (
            <Skeleton height={30} />
          ) : (
            <div className="mb-5">
              {data?.productDetails?.discountPrice ? (
                <>
                  <span className="font-extrabold text-2xl">
                    ₹{formattedDiscountedPrice}
                  </span>
                  <span className="line-through ml-3 text-[#aa9e9e]">
                    ₹{formattedOriginalPrice}
                  </span>
                  <span className="ml-3 text-[#e26178] underline">
                    {data?.productDetails.discountValue}% OFF on {data?.productDetails.discountCategory}
                  </span>
                </>
              ) : (
                <span className="font-extrabold text-2xl">
                  ₹{formattedOriginalPrice}
                </span>
              )}
            </div>
          )}

          {data?.productDetails?.variantId !== null && (
            <DropDown
              product={data?.productDetails}
              handleVariant={handleNewVariant}
            />
          )}
          {data?.productDetails?.productQty !== null &&
            data?.productDetails?.productQty < 5 && (
              <p className="mt-2">
                Only{" "}
                <span className="text-[#e26178]">
                  {data?.productDetails?.productQty} pieces
                </span>{" "}
                left!
              </p>
            )}
          <CheckPincode />
          {/* <div className="mt-4">
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
          </div> */}
          <CheckPincode />
          <AffordabilityWidget key="ZCUzmW" amount={5000} />
          <div className="hidden sm:block">
            {loading ? <Skeleton height={70} /> : <Buttons product={data} />}
          </div>
          {data?.productDetails?.tryAtHome === 1 && (
            <div className="mt-4 border border-[#f7f7f7] p-1 text-center">
              <span className="underline text-[#e26178] cursor-pointer ">
                Schedule free trial
              </span>
              <span> or </span>
              <span className="underline text-[#e26178] cursor-pointer">
                Try at Home
              </span>
              <span> today!</span>
            </div>
          )}
          <GoldSchemeSmallBanner />
          <Accordian product={data} />
        </div>
      </div>

      {data?.productDetails?.review.length !== 0 && (
        <div className="">
          <ReviewsAndRatings product={data} />
        </div>
      )}

      <div>
        {data && (
          <SimilarProducts productId={data?.productDetails?.productId} />
        )}
      </div>
    </>
  );
};

export default Default;
