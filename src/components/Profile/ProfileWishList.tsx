"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import StickyNav from "@/components/Header/StickyNav";
import { useWishlist } from "@/context/WishlistContext";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import {useCurrency} from "@/context/CurrencyContext"
import { useCart } from "@/context/CartContext";

const ProfileWishList = () => {
  const { cartItems, addToCart, updateCartQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState<string | undefined>();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const {formatPrice}=useCurrency()
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const showModal = (message: string) => {
    setModalMessage(message);
    setIsOutOfStock(true);
  };
  
  const closeModal = () => {
    setIsOutOfStock(false);
  };


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

  const handleAddToCart = (product: any) => {
    const isMakeToOrder = product.makeToOrder === 1 || product.makeToOrder === true;
    if ((product.quantityleft === 0 || product.quantityleft === null) && !isMakeToOrder) {
      showModal('Product is out of stock!');
      return;
    }
    const productAlreadyExists = cartItems.find(
      (item) => item.productId === product.productId,
    );
    const currentQuantity = productAlreadyExists?.quantity ?? 0;
    const updatedQuantity = currentQuantity + 1;
    if (productAlreadyExists) {
      updateCartQuantity(product.productId, updatedQuantity);
    } else {
      const newProduct: any = {
        productDetails: {
          title: product.title,
          discountPrice: product.discountPrice,
          imageDetails: [{ image_path: product.image_path }],
          productPrice: product.productPrice,
        },
        productId: product.productId,
        quantity: 1,
      };
      addToCart(newProduct, 1);
      removeFromWishlist(product.productId);
    }
  };

  const handleBuyNow = (product: any) => {
    const isMakeToOrder = product.makeToOrder === 1 || product.makeToOrder === true;
    if ((product.quantityleft === 0 || product.quantityleft === null) && !isMakeToOrder) {
      showModal('Product is out of stock!');
      return;
    }

    const productDetails: any = {
      productId: product.productId,
      productDetails: {
        productId: 60,
        title: product.title,
        displayTitle: product.title,
        url: "gold-earrings",
        discountPrice: product.discountPrice,
        imageDetails: [
          {
            image_path: product.image_path,
            order: 0,
            alt_text: null,
          },
        ],
        productPrice: "27131.1476",
      },
    };
    console.log("Adding to cart:", productDetails);
    addToCart(productDetails, 1, true);
    removeFromWishlist(product.productId);
    router.push(`/checkout?buyNow=${product.productId}`);
  };

  const handleType = (type: string) => {
    setType((prevType) => (prevType === type ? undefined : type));
  };
  return (
    <div className="shop-product breadcrumb1">
      <StickyNav />
      <div className="container">
        <div>
          <p className="text-2xl my-5 font-semibold">Wishlist</p>
        </div>
        <div className="list-product-block relative">
          {isLoading ? (
            <div className="loading-container flex h-full items-center justify-center">
              <Image
                src="/dummy/loader.gif"
                alt={"loader"}
                height={50}
                width={50}
              />
            </div>
          ) : wishlistItems.length < 1 ? (
            <div className="my-10 text-center text-2xl">Wishlist is empty</div>
          ) : (
            <div className="list-product my-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {wishlistItems.map((product, index) => (
                <div key={index} className="relative cursor-pointer">
                  <div className="product-card h-[100%] w-[100%] p-4">
                    <div
                      className="product-image relative"
                      onClick={() => router.push(`/products/${product.url}`)}
                    >
                      <Image
                         src={product?.image_path}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="rounded-md"
                        unoptimized
                      />
                      <div className="product-actions absolute right-2 top-2">
                        <button
                          className="heart-icon"
                          onClick={() => removeFromWishlist(product.productId)}
                        >
                          <Icon.Heart size={25} color="#fa0000" weight="fill" />
                        </button>
                      </div>
                    </div>
                    <div className="product-details mt-4">
                      <h3 className="product-name text-title truncate text-xl">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="product-price flex flex-col">
                          <span className="discounted-price text-title text-lg">
                            {formatPrice(parseInt(product.discountPrice))}
                          </span>
                          <span className="original-price text-[#beb3b3] line-through">
                            {formatPrice(parseInt(product.productPrice))}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-1 flex flex-col gap-1">
                      <div
                        className="rounded-full bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] text-center text-lg font-semibold text-white"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add To Cart
                      </div>
                      <div
                        className="rounded-full bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] text-center text-lg font-semibold text-white"
                        onClick={() => handleBuyNow(product)}
                      >
                        Buy Now
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
           {isOutOfStock && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center">
            <p>{modalMessage}</p>
            <button
              className="mt-4 px-4 py-2  bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-white rounded "
              onClick={() => closeModal()}
            >
              Close
            </button>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default ProfileWishList;
