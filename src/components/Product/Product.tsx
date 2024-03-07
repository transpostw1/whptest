"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/type/ProductType";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/context/CartContext";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useModalCompareContext } from "@/context/ModalCompareContext";
import { useModalQuickviewContext } from "@/context/ModalQuickviewContext";
import { useRouter } from "next/navigation";

interface ProductProps {
  data: ProductType;
}
const Product: React.FC<ProductProps> = ({ data }) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const { addToCart, updateCart, cartState } = useCart();
  const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
  const router = useRouter();


  const sortedImages = data.imageDetails?.sort(
    (a: any, b: any) => parseInt(a.order) - parseInt(b.order)
  );

  const selected= sortedImages?.[0];
  if (!selected || !selected.image_path) {
    return null; // or render a default image or fallback UI
  }

  const handleDetailProduct = (productId: string | number) => {
    console.log(productId,"productId")
    // redirect to shop with category selected
    router.push(`/product/default?id=${productId}`);
  };
 
  return (
    <>
      <div className="product-item grid-type ">
        <div
          onClick={() => handleDetailProduct(data?.productId)}
          className="product-main cursor-pointer block"
        >
          <div className="product-thumb bg-white relative overflow-hidden">
            <div
              className=" w-full h-full aspect-[4/3]"
              onMouseEnter={() => setShowVideo(true)}
              onMouseLeave={() => setShowVideo(false)}
            >
              {showVideo == true ? (
                <div className="w-[93%] object-cover relative duration-700 product-img">
                  <video src="/products/GERD23021256.mp4" loop autoPlay  />
                </div>
              ) : (
                <>
                  <Image
                    className="w-[85%] duration-700  m-auto"
                    src={selected.image_path}
                    width={400}
                    height={400}
                    alt="This image is temporarry"
                  />

                  <div className="flex justify-between">
                    <div className="">
                      <Icon.Play size={28} weight="light" />
                    </div>
                    <div className="float-right">
                      <Icon.Heart size={28} weight="light" />
                    </div>
                  </div>
                </>
              )}
            </div>
           
          </div>
          <div className=" mt-4 lg:mb-7">

            <div className="product-name text-title duration-300 text-xl">
              <p>{data?.title}</p>
              <p className="text-[#d8d8d8]">{data?.shortDesc}</p>
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
                ₹{data?.productPrice}
              </div>
              <div className="line-through text-[#dbd9d9]">
                ₹{data?.productPrice}
              </div>
              <div className="text-[#c95d71]">10% OFF</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
