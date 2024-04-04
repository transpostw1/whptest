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

const Product: React.FC<ProductProps> = ({ data }) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  
  const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
  

  const router = useRouter();

  const sortedImages = data.imageDetails?.sort(
    (a: any, b: any) => parseInt(a.order) - parseInt(b.order)
  );

  const selected = sortedImages?.[0];
  if (!selected || !selected.image_path) {
    return null; // or render a default image or fallback UI
  }

  const handleDetailProduct = (productId: string | number) => {
    console.log(productId, "productId");
    router.push(`/product/default?id=${productId}?query=${data.url}`);
  };
  const formattedDiscountedPrice = new Intl.NumberFormat("en-IN").format(
    Math.round(parseFloat(data.discountPrice))
  );
  const formattedOriginalPrice = new Intl.NumberFormat("en-IN").format(
    Math.round(parseFloat(data.productPrice))
  );

  return (
    <>
      <div className="product-item grid-type ">
        <div className="product-main cursor-pointer block">
          <div className="product-thumb bg-white relative overflow-hidden">
            <div
              className=" w-full h-full aspect-[4/3]"
              onMouseLeave={() => setShowVideo(false)}
            >
              {showVideo == true ? (
                <div className="mb-2">
                  <div
                    className="w-[100%] object-cover relative duration-700 product-img"
                    onClick={() => handleDetailProduct(data?.productId)}
                  >
                    <video loop autoPlay>
                      {" "}
                      <source
                        src="/products/GERD23021256.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
              ) : (
                <>
                  <Image
                    onClick={() => handleDetailProduct(data?.productId)}
                    className="w-[95%] duration-700 hover:scale-110  m-auto"
                    src={selected.image_path}
                    width={400}
                    height={400}
                    alt="This image is temporarry"
                  />

                  <div className="flex justify-between ">
                    <div className="z-0 hover:z-50" onClick={() => setShowVideo(!showVideo)}>
                      <Icon.Play size={25}  weight="light" />
                    </div>
                    <div className="float-right z-0 hover:z-50">
                      <Icon.Heart size={25} weight="light" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            className=" mt-4 lg:mb-7"
            onClick={() => handleDetailProduct(data?.productId)}
          >
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
              <div className="product-price text-title text-lg">
                ₹{formattedDiscountedPrice}
              </div>
              <div className="line-through text-[#beb3b3]">
                ₹{formattedOriginalPrice}
              </div>
              <p className="text-[#c95d71]">
                {data && data?.discountValue}%OFF
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  // );
};

export default Product;
