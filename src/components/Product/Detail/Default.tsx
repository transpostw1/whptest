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
import { useCurrency } from "@/context/CurrencyContext";
import { IoCameraOutline } from "react-icons/io5";

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
  const { formatPrice } = useCurrency();
  const [skuList, setSkuList] = useState<string[]>([]); // Initialize skuList state
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
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
  const handleOptionSelected = (option: any) => {
    console.log("Option selected:", option);
  };
  const loadScript = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      // Check if the script is already loaded
      if (
        document.querySelector(
          `script[src="https://camweara.com/integrations/camweara_api.js"]`,
        )
      ) {
        resolve(); // Script already loaded
        return;
      }

      // Create the script tag
      const script = document.createElement("script");
      script.src = "https://camweara.com/integrations/camweara_api.js";
      script.onload = () => {
        // Give some time for the function to be available
        setTimeout(() => {
          if (typeof window.getSkusListWithTryOn === "function") {
            resolve(); // Function is ready
          } else {
            reject(new Error("getSkusListWithTryOn is not defined"));
          }
        }, 1000);
      };
      script.onerror = () => reject(new Error("Failed to load script"));

      // Append the script to the body
      document.body.appendChild(script);
    });
  };

  const fetchSkusList = async () => {
    try {
      await loadScript(); // Ensure the script is loaded
      const skus = await window.getSkusListWithTryOn({
        companyName: "whpjewellers",
      });
      setSkuList(skus); // Update SKU list state
      console.log(skuList);
    } catch (error) {
      console.error("Error fetching SKU list:", error);
    }
  };

  const loadTryOnButton = async (
    sku: string,
    productId: string,
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      const scriptSrc = "https://cdn.camweara.com/integrations/camweara_api.js";

      const loadButton = async () => {
        return new Promise<void>((buttonResolve) => {
          try {
            window.loadTryOnButton({
              psku: sku,
              page: "product",
              company: "whpjewellers",
              buynow: { enable: "false" },
              prependButton: {
                class: `try_on`,
                id: `product-form-${productId}`,
              },
              styles: {
                tryonbutton: {
                  backgroundColor: "white",
                  color: "white",
                  border: "1px solid #white",
                  borderRadius: "25px",
                  display: "none",
                }, // Hide the auto-loaded button
                tryonbuttonHover: {
                  backgroundColor: "#white",
                  color: "white",
                  borderRadius: "25px",
                },
                MBtryonbutton: { width: "50%", borderRadius: "25px" },
              },
            });
            console.log("Button Created");
            // After loading, wait for the button to appear in the DOM
            const buttonInterval = setInterval(() => {
              const tryonButton =
                document.getElementById("tryonButton") ||
                document.getElementById("MB_tryonButton");
              if (tryonButton) {
                // Hide the button
                tryonButton.style.display = "none";
                console.log("Button Clicked");
                // Automatically click the button
                tryonButton.click();

                // Stop the interval once the button is clicked
                clearInterval(buttonInterval);

                buttonResolve(); // Resolve after the button is clicked
              }
            }, 100); // Check every 100ms for the button
          } catch (error: any) {
            reject(
              new Error(
                `Failed to load Try On button for SKU: ${sku}. Error: ${error.message}`,
              ),
            );
          }
        });
      };

      // Check if the script is already loaded
      const existingScript = document.querySelector(
        `script[src="${scriptSrc}"]`,
      );
      if (existingScript) {
        await loadButton(); // Await the button loading if script is already loaded
      } else {
        // Append the script and load the button after it's loaded
        const script = document.createElement("script");
        script.src = scriptSrc;
        script.onload = async () => {
          await loadButton(); // Await loading the button after the script is loaded
        };
        script.onerror = () =>
          reject(new Error("Failed to load Camweara script"));
        document.body.appendChild(script);
      }
    });
  };

  useEffect(() => {
    fetchSkusList();
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
    data?.productDetails?.imageDetails?.length || 0,
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
            data?.productDetails?.imageDetails?.length || 0,
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
    Math.round(parseFloat((data && data?.productDetails?.discountPrice) ?? 0)),
  );

  const formattedOriginalPrice = Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
  }).format(
    Math.round(parseFloat((data && data?.productDetails?.productPrice) ?? 0)),
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
  const descRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = descRef.current;
    if (element) {
      const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
      const maxLines = 2;
      const maxHeight = lineHeight * maxLines;

      if (element.scrollHeight > maxHeight) {
        setIsTruncated(true);
      }
    }
  }, [data?.productDetails?.shortDesc]);
  

  return (
    <>
      <StickyNavProductPage />
      <CtaButtonsMobile product={data} />
      <div className="lg:flex">
        <div className="sm:w-full lg:w-1/2">
          {loading ? (
            <Skeleton height={500} width={550} />
          ) : (
            <div className="relative">
              {skuList.includes(data?.productDetails.SKU) && (
                <div
                  id={`product-form-${data?.productDetails.productId}`}
                  className="try_on flex w-full cursor-pointer items-center justify-between"
                  onClick={() =>
                    loadTryOnButton(
                      data?.productDetails.SKU,
                      data?.productDetails.productId.toString(),
                    )
                  }
                >
                  <div className="flex items-center justify-between rounded-xl border border-[#e26178] p-1 text-center text-[#e26178] hover:bg-[#e26178] hover:text-white">
                    <IoCameraOutline />
                    <p className="ps-1 text-sm">Virtually Try On</p>
                  </div>
                </div>
              )}
              <div className="flex flex-col justify-center">
                <div>
                  <Slider
                    {...settingsMain}
                    ref={(slider: any) => setNav1(slider)}
                  >
                    {data?.productDetails?.imageDetails.map(
                      (image: any, index: any) => (
                        <div
                          key={index}
                          className="flex h-full items-center justify-center"
                        >
                          <div className="h-[600px] max-w-full max-md:h-[300px]">
                            <ZoomableImage
                              src={image.image_path}
                              alt="Product Image"
                            />
                          </div>
                        </div>
                      ),
                    )}
                    {data?.productDetails?.videoDetails?.length > 0 &&
                      data.productDetails.videoDetails.map((item: any) => (
                        <div
                          key={item.order}
                          className="flex h-full items-center justify-center"
                        >
                          <video
                            className="max-h-full max-w-full object-contain"
                            src={item.video_path}
                            loop
                            autoPlay
                            muted
                          />
                        </div>
                      ))}
                  </Slider>
                </div>
                <div>
                  <div className="relative m-auto h-full w-3/5">
                    <Slider
                      {...settingsThumbnails}
                      ref={(slider: any) => {
                        sliderRef = slider;
                        setNav2(slider);
                      }}
                    >
                      {data?.productDetails?.imageDetails.map(
                        (image: any, index: any) => (
                          <div key={index}>
                            <Image
                              src={image?.image_path}
                              alt={data?.productDetails?.title}
                              width={100}
                              height={100}
                              unoptimized
                              className="mx-3 cursor-pointer border"
                            />
                          </div>
                        ),
                      )}
                      {data?.productDetails?.videoDetails?.length > 0 &&
                        data.productDetails.videoDetails.map((item: any) => (
                          <video
                            key={item.order}
                            className="mx-3 cursor-pointer border"
                            src={item.video_path}
                            muted
                          />
                        ))}
                    </Slider>

                    <div className="absolute -right-2 top-6 cursor-pointer max-sm:-right-10">
                      <Icon.CaretRight
                        onClick={() => sliderRef.slickNext()}
                        size={25}
                      />
                    </div>
                    <div className="absolute -left-12 top-6 cursor-pointer">
                      <Icon.CaretLeft
                        onClick={() => sliderRef.slickPrev()}
                        size={25}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 sm:w-full lg:ml-6 lg:w-1/2">
          {loading ? (
            <Skeleton height={30} />
          ) : (
            <>
              <div className="flex w-full justify-between">
                <p className="text-3xl font-[500]">
                  {data?.productDetails.displayTitle}
                </p>

                <span
                  className="mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#e26178] px-2 py-2"
                  onClick={handleShareClick}
                >
                  <Icon.ShareFat
                    size={25}
                    weight="fill"
                    className="text-white"
                  />
                </span>
              </div>
              <p
                ref={descRef}
                className={`text-[#e26178] ${isExpanded || !isTruncated ? "" : "line-clamp-2"}`}
              >
                {data?.productDetails?.shortDesc}
              </p>
              {isTruncated && !isExpanded && (
                <span
                  onClick={toggleExpansion}
                  className="cursor-pointer text-[#E26178]"
                >
                  ...read more
                </span>
              )}
              {isExpanded && (
                <span
                  onClick={toggleExpansion}
                  className="cursor-pointer text-[#e26178] hover:text-black"
                >
                  show less
                </span>
              )}
              {data?.productDetails?.review.length !== 0 && (
                <div className="mb-2 flex flex-wrap">
                  <div>
                    <span className="mr-2 cursor-pointer underline">
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
                  <span className="text-2xl font-extrabold">
                    {formatPrice(parseInt(data?.productDetails?.discountPrice))}
                  </span>
                  <span className="ml-3 text-[#aa9e9e] line-through">
                    {formatPrice(parseInt(data?.productDetails?.productPrice))}
                  </span>
                  {parseInt(data?.productDetails?.discountValue) > 0 && (
                    <span className="ml-3 text-[#e26178] underline">
                      {data?.productDetails.discountValue}% OFF on{" "}
                      {data?.productDetails.discountCategory}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-2xl font-extrabold">
                  {formatPrice(parseInt(data?.productDetails?.productPrice))}
                </span>
              )}
            </div>
          )}
          <div className="flex">
            <div className="border-r-2 p-2">
              <p className="text-lg font-bold">SKU:</p>
              <p className="uppercase">{data?.productDetails?.SKU}</p>
            </div>
            <div className="p-2">
              <p className="text-lg font-bold">Availability:</p>
              {data?.productDetails?.productQty > 0 ? (
                <p>In Stock</p>
              ) : (
                <p>Make To Order</p>
              )}
            </div>
          </div>
          {data?.productDetails?.variantId !== "" && (
            <DropDown
              product={data?.productDetails}
              handleVariant={handleNewVariant}
            />
          )}
          {data?.productDetails?.productQty !== null &&
            (data?.productDetails?.productQty === 0 ? (
              <p className="mt-2 text-[#e26178]">Make To Order</p>
            ) : (
              data?.productDetails?.productQty < 5 && (
                <p className="mt-2">
                  Only{" "}
                  <span className="text-[#e26178]">
                    {data?.productDetails?.productQty} pieces
                  </span>{" "}
                  left!
                </p>
              )
            ))}
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
          <AffordabilityWidget
            accesskey="ZCUzmW"
            amount={1000}
          />
          <div className="hidden sm:block">
            {loading ? <Skeleton height={70} /> : <Buttons product={data} />}
          </div>
          {data?.productDetails?.tryAtHome === 1 && (
            <div className="mt-4 border border-[#f7f7f7] p-1 text-center">
              <span className="cursor-pointer text-[#e26178] underline">
                Schedule free trial
              </span>
              <span> or </span>
              <span className="cursor-pointer text-[#e26178] underline">
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
