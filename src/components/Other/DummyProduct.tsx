"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useWishlist } from "@/context/WishlistContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";
import StarRating from "./StarRating";

interface ProductProps {
  data: any;
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

const DummyProduct: React.FC<ProductProps> = ({ data }) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const { wishlistItems, addToWishlist, removeFromWishlist, getWishlist } =
    useWishlist();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoggedIn } = useUser();
  const { formatPrice } = useCurrency();
  const router = useRouter();

  // useEffect(() => {
  //   const updateCurrency = () => {
  //     const currentCurrency = localStorage.getItem("currency");
  //     if (currentCurrency) {
  //       handleCurrencyChange(currentCurrency);
  //     }
  //   };

  //   window.addEventListener("storage", updateCurrency);

  //   updateCurrency();

  //   return () => {
  //     window.removeEventListener("storage", updateCurrency);
  //   };
  // }, []);

  useEffect(() => {
    const isInWishlist = wishlistItems.some(
      (item) => item.productId === data.productId,
    );
    setIsProductInWishlist(isInWishlist);
  }, [wishlistItems, data.productId]);

  const HandleaddToWishlist = () => {
    try {
      console.log("Adding to wishlist, product data:", data);
      if (data && data.productId) {
        if (isLoggedIn) {
          const productToAdd: ProductForWishlistLoggedIn = {
            productId: data.productId,
          };
          addToWishlist(productToAdd);
          setIsProductInWishlist(true);
        } else {
          const productToAdd: ProductForWishlistLoggedOut = {
            productId: data.productId,
            title: data.title,
            productPrice: data.productPrice,
            discountPrice: data.discountPrice,
            discountValue: data.discountValue,
            image_path: data?.imageDetails[0].image_path,
            url: data.url,
          };
          addToWishlist(productToAdd);
          setIsProductInWishlist(true);
        }
      } else {
        console.error("Invalid product data:", data);
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  const HandleremoveFromWishlist = () => {
    removeFromWishlist(data.productId);
    setIsProductInWishlist(false);
  };

  const handleDetailProduct = (productId: any, productUrl: any) => {
    router.push(`/products/${productId}/${productUrl}`);
  };

  return (
    <>
      <div className="product-item grid-type">
        <div className="product-main block cursor-pointer">
          <div className="product-thumb relative overflow-hidden">
            {/* {data?.videoDetails != null ? (
              <div
                className=" w-full h-full aspect-[4/3]"
                onMouseLeave={() => setShowVideo(false)}
              >
                {showVideo == true ? (
                  <div className="mb-2">
                    <div
                      className="w-[100%] object-cover relative duration-700 product-img"
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
                  <>
                    <Image
                      onClick={() => handleDetailProduct()}
                      className="w-[95%] duration-700 hover:scale-110  m-auto"
                      src={data.image_path}
                      width={400}
                      height={400}
                      alt="This image is temporarry"
                    />

                    <div className="flex justify-between ">
                      <div
                        className="z-0 hover:z-50"
                        onClick={() => setShowVideo(!showVideo)}
                      >
                        <Icon.Play size={25} weight="light" />
                      </div>
                      <div className="float-right z-0 hover:z-50">
                        <Icon.Heart size={25} weight="light" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : ( */}
            <div className="relative">
              <Image
                onClick={() => handleDetailProduct(data.productId, data.url)}
                className="m-auto w-[95%] duration-700"
                src={data?.imageDetails[0].image_path}
                width={400}
                height={400}
                alt="This image is temporarry"
              />

              {/* <div className="relative">
                  <div className="absolute bottom-0 right-0 z-0 hover:z-50">
                    <Icon.Heart size={25} weight="light" />
                  </div>
                </div> */}
              <div className="absolute bottom-0 right-0 z-0 flex justify-between p-2 hover:z-50">
                {isProductInWishlist ? (
                  <Icon.Heart
                    size={25}
                    color="#fa0000"
                    weight="fill"
                    onClick={() => HandleremoveFromWishlist()}
                  />
                ) : (
                  <Icon.Heart size={25} onClick={() => HandleaddToWishlist()} />
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 lg:mb-7" onClick={() => handleDetailProduct}>
            <div className="product-name text-title text-xl duration-300">
              <p className="truncate">{data?.title}</p>
              {/* <p className="text-[#d8d8d8]">{data?.shortDesc}</p> */}
            </div>
            <div className="flex">
              <StarRating stars={data?.rating} />
            </div>

            <div className="product-price-block relative z-[1] mt-1 flex flex-wrap items-center gap-2 duration-300">
              {data?.discountPrice && (
                <p className="product-price text-title text-lg">
                  {formatPrice(parseInt(data?.discountPrice))}
                </p>
              )}
              {data?.discountPrice && (
                <p className="text-[#beb3b3] line-through">
                  {formatPrice(parseInt(data?.productPrice))}
                </p>
              )}

              {data?.discountValue == null && (
                <p className="product-price text-title text-lg">
                  {formatPrice(parseInt(data?.productPrice))}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  // );
};

export default DummyProduct;
