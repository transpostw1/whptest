"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/type/ProductType";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useModalQuickviewContext } from "@/context/ModalQuickviewContext";
import { useRouter } from "next/navigation";

interface ProductProps {
  data: ProductType;
}
interface ImageDetailWithTypename extends ImageDetail {
  __typename: string;
}

interface VideoDetailWithTypename extends VideoDetail {
  __typename: string;
}

const Product: React.FC<ProductProps> = ({ data }) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();

  const router = useRouter();
  // console.log('single product images', data.imageDetails);
  // const sortedImages = data?.imageDetails?.sort(
  //   (a: any, b: any) => parseInt(a.order) - parseInt(b.order)
  // );
  const sortedImages = data?.imageDetails
    ?.filter((item): item is ImageDetailWithTypename => item !== null && item !== undefined)
    ?.sort((a: ImageDetailWithTypename, b: ImageDetailWithTypename) => parseInt(a.order) - parseInt(b.order));


  const selected = sortedImages?.[0];
  if (!selected || !selected.image_path) {
    return null; // or render a default image or fallback UI
  }

  const sortedVideos = data?.videoDetails
    ?.filter((item): item is VideoDetailWithTypename => item !== null && item !== undefined)
    ?.sort((a: VideoDetailWithTypename, b: VideoDetailWithTypename) => parseInt(a.order) - parseInt(b.order));
  const selectedVideo = sortedVideos?.[0];

  const handleDetailProduct = () => {
    router.push(`/products/${data?.url}`);
  };
  const formattedDiscountedPrice = Intl.NumberFormat("en-IN").format(
    Math.round(parseFloat(data?.discountPrice ?? 0))
  );

  const formattedOriginalPrice = Intl.NumberFormat("en-IN").format(
    Math.round(parseFloat(data?.productPrice ?? 0))
  );

  return (
    <>
      <div className="product-item grid-type ">
        <div className="product-main cursor-pointer block">
          <div className="product-thumb bg-white relative overflow-hidden">
            {data?.videoDetails != null ? (
              <div
                className=" w-full h-full aspect-[4/3]"
                onMouseLeave={() => setShowVideo(false)}
              >
                {showVideo == true ? (
                  <div className="mb-2">
                    <div
                      className="w-[95%] object-cover relative duration-700 product-img"
                      onClick={() => handleDetailProduct()}
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
                      onClick={() => handleDetailProduct()}
                      className="w-[95%] duration-700 hover:scale-110  m-auto"
                      src={selected.image_path}
                      width={400}
                      height={400}
                      alt="This image is temporarry"
                    />

                    <div
                      className="z-0 absolute flex justify-between bottom-0 hover:z-50 "
                      onClick={() => setShowVideo(!showVideo)}
                    >
                      <Icon.Play size={25} weight="light" />
                    </div>
                    <div className="float-right absolute flex justify-between bottom-0 right-0 z-0 hover:z-50">
                      <Icon.Heart size={25} weight="light" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Image
                  onClick={() => handleDetailProduct()}
                  className="w-[95%] duration-700 hover:scale-110  m-auto"
                  src={selected.image_path}
                  width={400}
                  height={400}
                  alt="This image is temporarry"
                />

                <div className="relative">
                  <div className="absolute bottom-0 right-0 z-0 hover:z-50">
                    <Icon.Heart size={25} weight="light" />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className=" mt-4 lg:mb-7" onClick={() => handleDetailProduct()}>
            <div className="product-name text-title duration-300 text-xl">
              <p className="truncate">{data?.title}</p>
              {/* <p className="text-[#d8d8d8]">{data?.shortDesc}</p> */}
            </div>
            <div className="flex">
              <Icon.Star weight="fill" color="#FFD400" className="mr-1" />
              <Icon.Star weight="fill" color="#FFD400" className="mr-1" />
              <Icon.Star weight="fill" color="#FFD400" className="mr-1" />
              <Icon.Star weight="fill" color="#FFD400" className="mr-1" />
              <Icon.Star weight="fill" color="#FFD400" className="mr-1" />
            </div>

            <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
              {data?.discountPrice && (
                <div className="product-price text-title text-lg">
                  ₹{formattedDiscountedPrice}
                </div>
              )}
              {data?.discountPrice && (
                <div className="line-through text-[#beb3b3]">
                  ₹{formattedOriginalPrice}
                </div>
              )}
              {data?.discountPrice && (
                <p className="text-[#c95d71]">
                  {data && data?.discountValue}%OFF
                </p>
              )}
              {data?.discountValue == null && (
                <div className="product-price text-title text-lg">
                  ₹{formattedOriginalPrice}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  // );
};

export default Product;
