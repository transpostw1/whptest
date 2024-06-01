"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductData, ProductType } from "@/type/ProductType";
import { useRouter } from "next/navigation";
import Loader from "./loading";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { useCart } from "@/context/CartContext";

const Wishlist = () => {
  const { cartItems, addToCart, updateCartQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState<string | undefined>();
  const { wishlistItems, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  const router = useRouter();

  const uniqueProductIds = new Set<number>();

  const filteredWishlistItems = wishlistItems.filter((product) => {
    if (uniqueProductIds.has(product.productId)) {
      return false;
    } else {
      uniqueProductIds.add(product.productId);
      return true;
    }
  });

  const handleBuyNow = (productItem: ProductData) => {
    const productAlreadyExists = cartItems.find(
      (item) => item.productId === productItem.productDetails?.productId
    );
    const currentQuantity = productAlreadyExists?.quantity ?? 0;
    const updatedQuantity = currentQuantity + 1;

    if (productAlreadyExists) {
      updateCartQuantity(
        productItem.productDetails?.productId,
        updatedQuantity
      );
    } else {
      addToCart(
        {
          ...productItem,
          quantity: 1,
          productId: productItem.productDetails.productId,
        },
        1
      );
    }
  };

  if (isLoading) {
    return (
      <div>
        <Skeleton height={70} />
      </div>
    );
  }

  const handleType = (type: string) => {
    setType((prevType) => (prevType === type ? undefined : type));
  };

  return (
    <div className="shop-product breadcrumb1">
      <div className="container">
        <div className="list-product-block relative">
          {isLoading ? (
            <Loader />
          ) : wishlistItems.length < 1 ? (
            <div className="text-center text-2xl my-10">Wishlist is empty</div>
          ) : (
            <div className="list-product grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
              {filteredWishlistItems.map((product, index) => (
                <div key={index} className="relative">
                  <div className="product-card p-4 w-72 h-96">
                    <div
                      className="product-image w-full h-2/3"
                      onClick={() => router.push(`/products/${product.url}`)}
                    >
                      <Image
                        src={product.image_path}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="product-details mt-4">
                      <h3 className="product-name text-title text-xl truncate">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="product-price flex flex-col">
                          <span className="discounted-price text-title text-lg">
                            ₹{" "}
                            {Intl.NumberFormat("en-IN").format(
                              Math.round(parseFloat(product.discountPrice ?? 0))
                            )}
                          </span>
                          <span className="original-price line-through text-[#beb3b3]">
                            ₹{" "}
                            {Intl.NumberFormat("en-IN").format(
                              Math.round(parseFloat(product.productPrice ?? 0))
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="bg-[#E26178] text-center font-semibold text-lg rounded-full text-white mt-4"
                      onClick={() => handleBuyNow(product)}
                    >
                      <Link
                        href={{
                          pathname: "/checkout",
                          query: {
                            buyNow: product.productId.toString(),
                          },
                        }}
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                  <div className="product-actions absolute top-2 right-2">
                    <button
                      className="heart-icon"
                      onClick={() => removeFromWishlist(product.productId)}
                    >
                      <Icon.Heart size={25} color="#fa0000" weight="fill" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
