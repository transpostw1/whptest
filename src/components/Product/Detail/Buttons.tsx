"use client"; // Add this line

import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductData, ProductType } from "@/type/ProductType";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUser } from "@/context/UserContext";

interface Props {
  product: ProductType;
}

interface ProductForWishlistLoggedIn {
  productId: number;
}

interface ProductForWishlistLoggedOut {
  productId: number;
  title: string;
  productPrice: string;
  discountPrice: string;
  discountValue: string;
  image_path: string;
  url: string;
}
const Buttons: React.FC<Props> = ({ product }) => {
  const { cartItems, addToCart, updateCartQuantity } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist,getWishlist } = useWishlist();
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const[isLoading,setIsLoading]=useState<boolean>(false)
  const {  isLoggedIn } = useUser();


useEffect(() => {
  const fetchWishlist = async () => {
    try {
      setIsLoading(true)
      await getWishlist();
      // Check if the current product is in the fetched wishlist items
      const isInWishlist = wishlistItems.some(
        (item) => item.productId === product.productDetails.productId
      );
      setIsProductInWishlist(isInWishlist);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally{
      setIsLoading(false);
    }
  };

  fetchWishlist();
}, []);

  const handleAddToCart = (productItem: ProductData) => {
    const productAlreadyExists = cartItems.find(
      (item) => item.productId === productItem.productDetails.productId
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

const HandleaddToWishlist = () => {
  if (isLoggedIn) {
    const productToAdd: ProductForWishlistLoggedIn = {
      productId: product.productDetails.productId,
    };
    addToWishlist(productToAdd);
    setIsProductInWishlist(true);
  } else {
    const productToAdd: ProductForWishlistLoggedOut = {
      productId: product.productDetails.productId,
      title: product.productDetails.title,
      productPrice: product.productDetails.productPrice,
      discountPrice: product.productDetails.discountPrice,
      discountValue: product.productDetails.discountValue,
      imageDetails: product.productDetails.imageDetails,
      url: product.productDetails.url,

    };

    addToWishlist(productToAdd);
    setIsProductInWishlist(true);
  }
};
const HandleremoveFromWishlist = () => {
   removeFromWishlist(product.productDetails.productId);
  setIsProductInWishlist(false);
};

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
  if(isLoading){
    return (
      <div>
        <Skeleton height={70} />
      </div>
    );
  }
  return (
    <div className="flex max-sm:justify-around mt-[25px] ">
      <div
        className="cursor-pointer bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-white max-sm:w-[35%] h-[58px] mr-[10px] py-[18px] px-[32px] max-sm:py-[10px] max-sm:px[15px] text-center"
        onClick={() => handleBuyNow(product)}
      >
        <Link
          href={{
            pathname: "/checkout",
            query: { buyNow: product.productDetails?.productId.toString() },
          }}
        >
          Buy Now
        </Link>
      </div>

      <div
        className="bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-[#e26178] max-sm:w-[35%] h-[58px] text-center mr-[10px] cursor-pointer"
        onClick={() => handleAddToCart(product)}
      >
        <div className=" m-[2px] mb-[2px] bg-white">
          <span className="flex justify-center py-[14px] max-sm:py-[10px]">
            <span>Add to Cart</span>
            <span className="mt-1">
              <Icon.ShoppingCart />
            </span>
          </span>
        </div>
      </div>
      <div className=" flex justify-center text-[#e26178] outline outline-[#e26178] outline-1 w-[56px] h-[58px] items-center cursor-pointer">
        {isProductInWishlist ? (
          <Icon.Heart
            size={32}
            color="#fa0000"
            weight="fill"
            onClick={() => HandleremoveFromWishlist()}
          />
        ) : (
          <Icon.Heart
            size={32}
            weight="thin"
            color="#e26178"
            onClick={() => HandleaddToWishlist()}
          />
        )}
      </div>
    </div>
  );
};
export default Buttons;
