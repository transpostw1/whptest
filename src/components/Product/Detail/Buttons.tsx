"use client";
import React, { useEffect, useState, MouseEvent } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductData, ProductType } from "@/type/ProductType";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PiTreasureChestLight } from "react-icons/pi";
import { showCustomToast } from "@/components/Other/CustomToast";

interface Props {
  product: ProductType | ProductDetails;
  variants: any[];
}

interface ProductForWishlistLoggedIn {
  productId: number;
  variants: any[];
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
  variants: any[];
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
  console.log(variants, "variantssss");
  const formattedVariants = variants.map((variant) => ({
    variantType: variant.type,
    variantName: variant.name,
  }));
  console.log(formattedVariants, "formattedVariantsss");

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
    showCustomToast("Item successfully added to cart!");
    const productAlreadyExists = cartItems.find(
      (item) => item.productId === productItem.productDetails.productId,
    );
    const currentQuantity = productAlreadyExists?.quantity ?? 0;
    const updatedQuantity = currentQuantity + 1;

    if (productAlreadyExists) {
      showCustomToast("Product Quantity Updated!");
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
        formattedVariants,
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
    showCustomToast("Item Wishilisted!");
  };

  const HandleremoveFromWishlist = () => {
    removeFromWishlist(product.productDetails.productId);
    setIsProductInWishlist(false);
    showCustomToast("Removed from wishlist");
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
        formattedVariants,
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
    <div className="my-6 flex max-sm:justify-around">
      <motion.div
        className="ripple-container h-[58px] w-[33%] cursor-pointer bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-[32px] py-[18px] text-center text-white max-sm:h-[45px] max-sm:w-[35%] max-sm:px-[15px] max-sm:py-[10px]"
        onClick={(e) => {
          createRipple(e);
          handleBuyNow();
        }}        
      >
        Buy Now
      </motion.div>
      <div
        className="ripple-container mx-10 h-[58px] w-[33%] cursor-pointer text-center text-[#e26178] outline outline-1 outline-[#e26178] max-sm:h-full max-sm:w-[35%]"
        onClick={(e) => {
          createRipple(e);
          handleAddToCart(product);
        }}
      >
        <div className="m-[2px] mb-[2px] bg-white">
          <span className="flex justify-center py-[14px] max-sm:py-[10px]">
            <span>Add to Box</span>
            <span className="ml-1">
              <PiTreasureChestLight size={25}/>
            </span>
          </span>
        </div>
      </div>
      <div
        className="flex h-[57px] w-[56px] cursor-pointer items-center justify-center outline outline-1 outline-[#e26178] max-sm:h-[45px]"
        onClick={() => {
          if (isProductInWishlist) {
            HandleremoveFromWishlist();
          } else {
            HandleaddToWishlist();
          }
        }}
      >
        {isProductInWishlist ? (
          <Icon.Heart size={32} color="#fa0000" weight="fill" />
        ) : (
          <Icon.Heart size={32} weight="thin" color="#e26178" />
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
