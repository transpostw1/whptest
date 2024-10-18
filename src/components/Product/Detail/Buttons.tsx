"use client";
import React, { useEffect, useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

import { ProductData, ProductType  } from "@/type/ProductType";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

interface Props {
  product: ProductType | ProductDetails;
  variants: [];
}

interface ProductForWishlistLoggedIn {
  productId: number;
  variants:[],
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
const Buttons: React.FC<Props> = ({ product, variants }) => {
  const { cartItems, addToCart, updateCartQuantity } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist, getWishlist } =
    useWishlist();
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoggedIn } = useUser();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("Out Of Stock");
 
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setIsLoading(true);
        await getWishlist();
        const isInWishlist = wishlistItems.some(
          (item) => item.productId == product.productDetails.productId,
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
  console.log("Variants", variants);
  // const formattedVariants = (variantValues: string[]): Array<{ variantType: string; variantName: string }> => {
  //   return variants.map(value => ({
  //     variantType: value,
  //     variantName: value
  //   }));
  // }


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
  // const isOutOfStock = (productQty: number | null | undefined) => {
  //   return productQty === 0 || productQty === null;
  // };
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
  };

  const HandleremoveFromWishlist = () => {
    removeFromWishlist(product.productDetails.productId);
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

  if (isLoading) {
    return (
      <div>
        <Skeleton height={70} />
      </div>
    );
  }
  return (
    <div className="mt-[25px] flex max-sm:justify-around">
      <div
        className="h-[58px] w-[33%] cursor-pointer bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-[32px] py-[18px] text-center text-white max-sm:h-[45px] max-sm:w-[35%] max-sm:px-[15px] max-sm:py-[10px]"
        onClick={handleBuyNow}
      >
        Buy Now
      </div>

      <div
        className="mx-10 h-[58px] w-[33%] cursor-pointer bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] text-center text-[#e26178] max-sm:h-full max-sm:w-[35%]"
        onClick={() => handleAddToCart(product)}
      >
        <div className="m-[2px] mb-[2px] bg-white">
          <span className="flex justify-center py-[14px] max-sm:py-[10px]">
            <span>Add to Cart</span>
            <span className="mt-1">
              <Icon.ShoppingCart />
            </span>
          </span>
        </div>
      </div>
      <div className="flex h-[58px] w-[56px] cursor-pointer items-center justify-center text-[#e26178] outline outline-1 outline-[#e26178] max-sm:h-[45px]">
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
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
          <div className="flex flex-col items-center rounded-lg bg-white p-6">
            <p>{modalMessage}</p>
            <button
              className="mt-4 rounded bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-white"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Buttons;
