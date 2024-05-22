"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

const ProfileWishList = () => {
  const [type, setType] = useState<string | undefined>();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const router = useRouter();

  // Create a Set to store unique product IDs
  const uniqueProductIds = new Set<number>();

  // Filter out duplicate products based on unique product IDs
  const filteredWishlistItems = wishlistItems.filter((product) => {
    if (uniqueProductIds.has(product.productId)) {
      return false; // Skip adding the product if its ID is already in the Set
    } else {
      uniqueProductIds.add(product.productId);
      return true; // Add the product to the Set and render it
    }
  });

  const handleType = (type: string) => {
    setType((prevType) => (prevType === type ? undefined : type));
  };

  return (
    // <div className="shop-product breadcrumb1">
    //   <div className="container">
    //     <div className="list-product-block relative">
    //       <div className="list-product grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
    //         {wishlistItems.map((product:any, index:any) => (
    //           <div key={index} className="relative">
    //             <div className="product-card p-4">
    //               <div
    //                 className="product-image"
    //                 onClick={() => router.push(`/products/${product.url}`)}
    //               >
    //                 <Image
    //                   src={product.image_path}
    //                   alt={product.title}
    //                   width={300}
    //                   height={300}
    //                   className="rounded-md"
    //                 />
    //               </div>
    //               <div className="product-details mt-4">
    //                 <h3 className="product-name text-title text-xl truncate">
    //                   {product.title}
    //                 </h3>
    //                 <div className="flex items-center gap-2">
    //                   <p className="product-price flex flex-col">
    //                     <span className="discounted-price text-title text-lg">
    //                       ₹{product.discountPrice}
    //                     </span>
    //                     <span className="original-price line-through text-[#beb3b3]">
    //                       ₹{product.productPrice}
    //                     </span>
    //                   </p>
    //                 </div>
    //               </div>
    //               <div className="bg-[#E26178] text-center font-semibold text-lg rounded-full">
    //                 Buy Now
    //               </div>
    //             </div>
    //             <div className="product-actions absolute top-2 right-2">
    //               <button
    //                 className="heart-icon"
    //                 onClick={() => removeFromWishlist(product.productId)}
    //               >
    //                 <Icon.Heart size={25} color="#fa0000" weight="fill" />
    //               </button>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <p>No Product in Your WishList</p>
    </div>
  );
};

export default ProfileWishList;
