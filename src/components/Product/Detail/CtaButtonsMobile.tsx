"use client"; // Add this line

import Link from "next/link";
import React, { useEffect, useState,MouseEvent } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductData, ProductType } from "@/type/ProductType";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { showCustomToast } from "@/components/Other/CustomToast";

interface Props {
  product: ProductType | ProductDetails;
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
  quantityleft: number;
  makeToOrder: number | boolean;
  image_path: string;
  url: string;
  variants:[];
}
const CtaButtonsMobile: React.FC<Props> = ({ product ,variants}) => {
  const { cartItems, addToCart, updateCartQuantity } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist, getWishlist } =
    useWishlist();
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("Out Of Stock");
  const createRipple = (event: MouseEvent<HTMLDivElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    const rect = button.getBoundingClientRect();
    ripple.style.left = `${event.clientX - rect.left - 50}px`;
    ripple.style.top = `${event.clientY - rect.top - 50}px`;  
    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  };


  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
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
    const fetchWishlist = async () => {
      try {
        setIsLoading(true);
        await getWishlist();
        // Check if the current product is in the fetched wishlist items
        const isInWishlist = wishlistItems.some(
          (item) => item.productId === product.productDetails.productId,
        );
        setIsProductInWishlist(isInWishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const formattedVariants = [
    {
      variantType: variants[2],  
      variantName: variants[1],  
    },
    {
      variantType: "Size",      
      variantName: variants[0],  
    }
  ];
  console.log("formattedVariants", formattedVariants);

  const isOutOfStock = (
    productQty: number | null | undefined,
    makeToOrder: boolean | undefined,
  ) => {
    if (makeToOrder) {
      return false;
    }
    return productQty === 0 || productQty === null;
  };

  
  const handleAddToCart = (productItem: ProductData) => {
    const { productQty, makeToOrder } = productItem.productDetails?.productQty;
    if (isOutOfStock(productQty, makeToOrder)) {
      setModalMessage("This product is out of stock.");
      setShowModal(true);
      return;
    }
  
    const productAlreadyExists = cartItems.find(
      (item) => item.productId === productItem.productDetails.productId,
    );
    const currentQuantity = productAlreadyExists?.quantity ?? 0;
    const updatedQuantity = currentQuantity + 1;

    if (productAlreadyExists) {
      updateCartQuantity(
        productItem.productDetails?.productId,
        updatedQuantity,
      );
      showCustomToast('Product Quantity Updated!');
    } else {
      addToCart(
        {
          ...productItem,
          quantity: 1,
          productId: productItem.productDetails.productId,
        },
        1,
        formattedVariants
      );
    }
    showCustomToast('Item successfully added to cart!');
  };

  const HandleaddToWishlist = () => {
    if (isLoggedIn) {
      const productToAdd: ProductForWishlistLoggedIn = {
        productId: product.productDetails.productId,
        variants: formattedVariants, 
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
        quantityleft: product.productDetails.productQty,
        makeToOrder: product.productDetails.makeToOrder,
        image_path: product.productDetails.imageDetails[0].image_path,
        url: product.productDetails.url,
        variants: formattedVariants,
      };
      setIsProductInWishlist(true);
      addToWishlist(productToAdd);
    }
    showCustomToast('Item Wishilisted!');
  };

  const HandleremoveFromWishlist = () => {
    removeFromWishlist(product.productDetails.productId);
    showCustomToast('Removed from wishilist');
    setIsProductInWishlist(false);
  };

  const handleBuyNow = () => {
    const { productQty, makeToOrder } = product.productDetails?.productQty;

    if (isOutOfStock(productQty, makeToOrder)) {
      setModalMessage("This product is out of stock.");
      setShowModal(true);
      return;
    }

    const productAlreadyExists = cartItems.find(
      (item) => item.productId === product.productDetails.productId,
    );

    if (!productAlreadyExists) {
      addToCart(
        {
          productDetails: {
            ...product.productDetails,
          },
          productId: product.productDetails.productId,
        },
        1,
        formattedVariants
      );
    }

    router.push(`/checkout?buyNow=${product.productDetails.productId}`);
  };


  if (!isMobile) {
    return null;
  }
  return (
    <div className="fixed bottom-9 z-10 flex w-full bg-white px-4 py-2">
      <div className="mr-[10px] mt-[2px] flex w-[56px] cursor-pointer items-center justify-center text-[#e26178] outline outline-1 outline-[#e26178]">
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
      <div
        className="ripple-container mr-[10px] mt-[2px] h-[40px] w-[20%] cursor-pointer outline outline-1 outline-[#e26178]  text-center text-[#e26178]"
        onClick={(e) => {
          createRipple(e);
          handleAddToCart(product);
        }}
      >
        <div className="m-[2px] mb-[2px] h-[91%] bg-white">
          <span className="flex h-[91%] items-center justify-center">
            <span className="mt-1">
              <Icon.ShoppingCart size={25} />
            </span>
          </span>
        </div>
      </div>
      <div
        className="flex h-[41px] w-[56%] cursor-pointer items-center justify-center bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] text-center text-white"
        onClick={handleBuyNow}
      >
        Buy Now
      </div>
    </div>
  );
};
export default CtaButtonsMobile;
