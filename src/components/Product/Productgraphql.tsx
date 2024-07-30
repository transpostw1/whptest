"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ProductType,
  ImageDetails,
  ProductForWishlistLoggedIn,
  ProductForWishlistLoggedOut,
} from "@/type/ProductType";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "next/navigation";
import StarRating from "../Other/StarRating";
import { useUser } from "@/context/UserContext";
import { useCurrency } from "@/context/CurrencyContext";

interface ProductProps {
  data: any;
}
interface ImageDetailWithTypename extends ImageDetails {
  __typename: string;
}

interface VideoDetailWithTypename {
  __typename: string;
  order: any;
}

const Product: React.FC<ProductProps> = ({ data }) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [hover, setHover] = useState<boolean>(false);
  const ratings = 3.5;
  const { currency, handleCurrencyChange, formatPrice } = useCurrency();
  const router = useRouter();
  const [width, setWidth] = useState<number>(25);
  const [isMobile, setIsMobile] = useState(false);
  const { isLoggedIn } = useUser();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 800px)");
    const handleChange = (e: any) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Get the current viewport width
      const viewportWidth = window.innerWidth;

      if (viewportWidth < 768) {
        // Small screens
        setWidth(20);
      } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Medium screens
        setWidth(25);
      } else {
        // Large screens
        setWidth(25);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const isInWishlist = wishlistItems.some(
      (item: any) => item.productId == data.productId,
    );
    setIsProductInWishlist(isInWishlist);
  }, [wishlistItems, data.productId]);

  const sortedImages = data?.imageDetails
    ?.filter(
      (item: any): item is ImageDetailWithTypename =>
        item !== null && item !== undefined,
    )
    ?.sort(
      (a: ImageDetailWithTypename, b: ImageDetailWithTypename) =>
        parseInt(a.order) - parseInt(b.order),
    );

  // const sortedImages = data?.imageDetails?.sort(
  //   (a: any, b: any) => parseInt(a.order) - parseInt(b.order)
  // );

  const selected = sortedImages?.[0];
  if (!selected || !selected.image_path) {
    return null;
  }

  const sortedVideos = data?.videoDetails
    ?.filter(
      (item: any): item is VideoDetailWithTypename =>
        item !== null && item !== undefined,
    )
    ?.sort(
      (a: VideoDetailWithTypename, b: VideoDetailWithTypename) =>
        parseInt(a.order) - parseInt(b.order),
    );
  const selectedVideo = sortedVideos?.[0];

  const handleDetailProduct = (productId: any, productUrl: any) => {
    router.push(`/products/${productUrl}/${productId}`);
  };

  const HandleaddToWishlist = () => {
    try {
      console.log("Adding to wishlist, product data:", data);
      if (data && data.productId) {
        if (isLoggedIn) {
          const productToAdd: any = {
            productId: data.productId,
          };
          addToWishlist(productToAdd);
          setIsProductInWishlist(true);
        } else {
          const productToAdd: any = {
            productId: data.productId,
            title: data.title,
            productPrice: data.productPrice,
            discountPrice: data.discountPrice,
            discountValue: data.discountValue,
            image_path: data.imageDetails[0].image_path,
            url: data.url,
          };
          addToWishlist(productToAdd);
          setIsProductInWishlist(true);
        }
      } else {
        console.error("Invalid product data:", data);
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  const HandleremoveFromWishlist = () => {
    removeFromWishlist(data.productId);
    setIsProductInWishlist(false);
  };

  const formattedDiscountedPrice = Intl.NumberFormat("en-IN").format(
    Math.round(parseFloat(data?.discountPrice ?? 0)),
  );

  const formattedOriginalPrice = Intl.NumberFormat("en-IN").format(
    Math.round(parseFloat(data?.productPrice ?? 0)),
  );

  return (
    <>
      <div
        className="product-item grid-type hover:rounded-lg hover:border hover:p-4 hover:shadow-md"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="product-main block cursor-pointer">
          <div className="product-thumb relative overflow-hidden">
            {data?.videoDetails !== null ? (
              <div
                className="aspect-[4/3] h-full w-full"
                onMouseLeave={() => setShowVideo(false)}
              >
                {showVideo == true ? (
                  <div className="mb-2">
                    <div
                      className="product-img relative object-cover duration-700"
                      onClick={() =>
                        handleDetailProduct(data.url, data.productId)
                      }
                    >
                      <video loop autoPlay muted>
                        <source
                          src={selectedVideo.video_path}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <Image
                      onClick={() =>
                        handleDetailProduct(data.url, data.productId)
                      }
                      className="m-auto w-[95%] duration-700"
                      src={selected.image_path}
                      width={400}
                      height={400}
                      alt="This image is temporarry"
                    />
                    {isMobile && (
                      <div className="absolute bottom-1 right-1 z-0 float-right flex justify-between hover:z-30">
                        <Icon.Cards
                          size={width}
                          weight="light"
                          color="#e26178"
                        />
                      </div>
                    )}
                    {hover && !isMobile && (
                      <div className="absolute bottom-1 left-1 z-0 float-right mt-2 flex justify-between rounded-sm border border-[#e26178] px-2 text-center hover:bg-[#e26178] hover:text-white">
                        <p className="font-semibold">Try ON</p>
                      </div>
                    )}
                    {hover && !isMobile && (
                      <div className="absolute bottom-1 right-1 z-0 float-right flex justify-between bg-white p-1 hover:z-30">
                        <Icon.Cards
                          size={width}
                          weight="light"
                          color="#e26178"
                        />
                      </div>
                    )}
                    <div
                      className="absolute top-1 z-0 flex justify-between hover:z-50"
                      onClick={() => setShowVideo(!showVideo)}
                    >
                      <Icon.Play size={width} weight="light" />
                    </div>
                    <div className="absolute right-1 top-1 z-0 float-right flex justify-between hover:z-50">
                      {/* <Icon.Heart size={25} weight="light" /> */}
                      {isProductInWishlist ? (
                        <Icon.Heart
                          size={width}
                          color="#fa0000"
                          weight="fill"
                          onClick={() => HandleremoveFromWishlist()}
                        />
                      ) : (
                        <Icon.Heart
                          size={width}
                          weight="light"
                          onClick={() => HandleaddToWishlist()}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <Image
                  onClick={() => handleDetailProduct(data.url, data.productId)}
                  className="m-auto w-[95%] duration-700"
                  src={selected.image_path}
                  width={400}
                  height={400}
                  alt="This image is temporarry"
                />
                {hover && !isMobile && (
                  <div className="absolute bottom-1 left-1 z-0 float-right mt-2 flex justify-between rounded-sm border border-[#e26178] px-2 text-center hover:bg-[#e26178] hover:text-white">
                    <p className="font-semibold">Try ON</p>
                  </div>
                )}
                {isMobile && (
                  <div className="absolute bottom-1 right-1 z-0 float-right flex justify-between hover:z-50">
                    <Icon.Cards size={width} weight="light" color="#e26178" />
                  </div>
                )}
                {hover && !isMobile && (
                  <div className="absolute bottom-1 right-1 z-0 float-right flex justify-between hover:z-50">
                    <Icon.Cards size={width} weight="light" color="#e26178" />
                  </div>
                )}
                <div className="absolute right-1 top-1 z-0 float-right flex justify-between hover:z-50">
                  {/* <Icon.Heart size={25} weight="light" /> */}
                  {isProductInWishlist ? (
                    <Icon.Heart
                      size={width}
                      color="#fa0000"
                      weight="fill"
                      onClick={() => HandleremoveFromWishlist()}
                    />
                  ) : (
                    <Icon.Heart
                      size={width}
                      weight="light"
                      onClick={() => HandleaddToWishlist()}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className="mt-4 lg:mb-4"
            onClick={() => handleDetailProduct(data.url, data.productId)}
          >
            <div className="product-name text-title text-xl duration-300">
              <p className="truncate">{data?.title}</p>
              {/* <p className="text-[#d8d8d8]">{data?.shortDesc}</p> */}
            </div>

            <StarRating stars={data.rating} />

            <div className="product-price-block relative z-[1] mt-1 flex flex-wrap items-center gap-2 duration-300">
              {data?.discountPrice && (
                <p className="product-price text-title text-lg">
                  {formatPrice(parseInt(data?.discountPrice))}
                </p>
              )}
              {data?.discountPrice && (
                <p className="text-[#beb3b3] line-through">
                  {formatPrice(parseInt(data?.productPrice))}
                </p>
              )}

              {data?.discountValue == null && (
                <p className="product-price text-title text-lg">
                  {formatPrice(parseInt(data?.productPrice))}
                </p>
              )}
            </div>
            {/* {data?.discountPrice && (
              <p className="text-[#c95d71]">
                {data && data?.discountValue}%OFF
              </p>
            )} */}
          </div>
        </div>
        {isMobile && (
          <div className="mt-2 rounded-sm border border-[#e26178] text-center hover:bg-[#e26178] hover:text-white">
            <p className="font-semibold">Try ON</p>
          </div>
        )}
      </div>
    </>
  );
  // );
};

export default Product;
