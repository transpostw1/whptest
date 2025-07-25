"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  ProductType,
  ImageDetails,
  ProductForWishlistLoggedIn,
  ProductForWishlistLoggedOut,
} from "@/type/ProductType";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "next/navigation";
import StarRating from "../Other/StarRating";
import { useUser } from "@/context/UserContext";
import { useCurrency } from "@/context/CurrencyContext";
import { IoCameraOutline } from "react-icons/io5";
import ViewSimilar from "./ViewSimilar";
import { showCustomToast } from "../Other/CustomToast";

interface ProductProps {
  data: any;
  skuList: any;
}

interface ImageDetailWithTypename extends ImageDetails {
  __typename: string;
}

interface VideoDetailWithTypename {
  __typename: string;
  order: any;
}

const Product: React.FC<ProductProps> = ({ data, skuList }) => {
  const [viewSimilarProducts, setViewSimilarProducts] =
    useState<boolean>(false);
  const [selectedSimilarProductId, setSelectedSimilarProductId] = useState<
    number | null
  >(null);
  const [isProductInWishlist, setIsProductInWishlist] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [hover, setHover] = useState<boolean>(false);
  const ratings = 3.5;
  const { currency, handleCurrencyChange, formatPrice } = useCurrency();
  const router = useRouter();
  const [width, setWidth] = useState<number>(25);
  const [isMobile, setIsMobile] = useState(false);
  const { isLoggedIn } = useUser();
  const [isButtonLoaded, setIsButtonLoaded] = useState(false);

  const loadTryOnButton = async (
    sku: string,
    productId: string,
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      const scriptSrc = "https://cdn.camweara.com/integrations/camweara_api.js";

      const loadButton = async () => {
        return new Promise<void>((buttonResolve) => {
          try {
            window.loadTryOnButton({
              psku: sku,
              page: "product",
              company: "whpjewellers",
              buynow: { enable: "false" },
              prependButton: {
                class: `try_on`,
                id: `product-form-${productId}`,
              },
              styles: {
                tryonbutton: {
                  backgroundColor: "white",
                  color: "white",
                  border: "1px solid #white",
                  borderRadius: "25px",
                  display: "none",
                }, // Hide the auto-loaded button
                tryonbuttonHover: {
                  backgroundColor: "#white",
                  color: "white",
                  borderRadius: "25px",
                },
                MBtryonbutton: { width: "50%", borderRadius: "25px" },
              },
            });
            console.log("Button Created");
            const buttonInterval = setInterval(() => {
              const tryonButton =
                document.getElementById("tryonButton") ||
                document.getElementById("MB_tryonButton");
              if (tryonButton) {
                // Hide the button
                tryonButton.style.display = "none";
                console.log("Button Clicked");
                tryonButton.click();
                clearInterval(buttonInterval);

                buttonResolve();
              }
            }, 100);
          } catch (error:any) {
            reject(
              new Error(
                `Failed to load Try On button for SKU: ${sku}. Error: ${error.message}`,
              ),
            );
          }
        });
      };
      const existingScript = document.querySelector(
        `script[src="${scriptSrc}"]`,
      );
      if (existingScript) {
        await loadButton();
      } else {
        const script = document.createElement("script");
        script.src = scriptSrc;
        script.onload = async () => {
          await loadButton();
        };
        script.onerror = () =>
          reject(new Error("Failed to load Camweara script"));
        document.body.appendChild(script);
      }
    });
  };

  // useEffect(() => {
  //   // Fetch SKU list only once on component mount
  //   fetchSkusList();

  // }, []); // Empty dependency array ensures this runs only on mount

  // useEffect(() => {
  //   console.log("fetchSkusList", skuList); // Check what you're fetching
  //   console.log("isSkuListLoaded", isSkuListLoaded); // Check what you're fetching
  // }, [skuList, isSkuListLoaded]); // Empty dependency array ensures this runs only on

  // useEffect(() => {
  //   const loadButtonsForSkus = async () => {
  //     try {
  //       if (skuList.length > 0 && data.SKU) {
  //         if (skuList.includes(data.SKU)) {
  //           console.log("Loading Try-On button for SKU:", data.SKU);
  //           await loadTryOnButton(data.SKU, data.productId);
  //         } else {
  //           console.log("SKU not found in the list:", data.SKU);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error loading buttons for SKUs:", error);
  //     }
  //   };

  //   if (skuList.length > 0 && data.SKU) {
  //     loadButtonsForSkus();
  //   }

  // }, [data.SKU, data.productId]);

  // useEffect(() => {
  //   console.log("Loaded SKUs:", loadedSkus);
  // }, [loadedSkus]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 800px)");
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
    const handleResize = () => {
      const viewportWidth = window.innerWidth;

      if (viewportWidth < 768) {
        setWidth(20);
      } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        setWidth(25);
      } else {
        setWidth(25);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const isInWishlist = wishlistItems.some(
      (item: any) => item.productId == data.productId,
    );
    setIsProductInWishlist(isInWishlist);
  }, [wishlistItems, data.productId]);


  const sortedImages = data?.imageDetails
    ?.filter(
      (item: any): item is ImageDetailWithTypename =>
        item !== null && item !== undefined,
    )
    ?.sort(
      (a: ImageDetailWithTypename, b: ImageDetailWithTypename) =>
        parseInt(a.order) - parseInt(b.order),
    );

 

  const selected = sortedImages?.[0];
  if (!selected || !selected.image_path) {
    return null;
  }

  const sortedVideos = data?.videoDetails
    ?.filter(
      (item: any): item is VideoDetailWithTypename =>
        item !== null && item !== undefined,
    )
    ?.sort(
      (a: VideoDetailWithTypename, b: VideoDetailWithTypename) =>
        parseInt(a.order) - parseInt(b.order),
    );
  const selectedVideo = sortedVideos?.[0];

  const handleDetailProduct = (productId: any, productUrl: any) => {
    window.open(`/products/${productUrl}/${productId}`, "_blank");
  };

  // const handleDetailProduct = (productUrl: any, productId: any) => {
  //   router.push(`/products/${productId}/${productUrl}`);
  // };

  const HandleaddToWishlist = () => {
    try {
      // console.log("Adding to wishlist, product data:", data);
      if (data && data.productId) {
        const formattedVariants = data?.variants?.map((variant: any) => ({
          variantType: variant.VariantType,
          variantName: variant.VariantOption?.[0]?.VariantName || "",
        }));

        if (isLoggedIn) {
          const productToAdd: any = {
            productId: data.productId,
            variants: formattedVariants,
          };
          addToWishlist(productToAdd);
          setIsProductInWishlist(true);
        } else {
          const productToAdd: any = {
            productId: data.productId,
            title: data.title,
            productPrice: data.productPrice,
            discountPrice: data.discountPrice,
            discountValue: data.discountValue,
            image_path: data.imageDetails[0].image_path,
            url: data.url,
            variants: formattedVariants,
          };
          addToWishlist(productToAdd);
          setIsProductInWishlist(true);
        }
      } else {
        console.error("Invalid product data:", data);
      }
      showCustomToast("Item Wishilisted!");
    } catch (error) {
      showCustomToast("Try again later!");
      console.error("Error adding product to wishlist:", error);
    }
  };

  const HandleremoveFromWishlist = () => {
    removeFromWishlist(data.productId);
    showCustomToast("Removed From Wishlist");
    setIsProductInWishlist(false);
  };

  const handleCloseSimilarProducts = () => {
    setSelectedSimilarProductId(null);
    setViewSimilarProducts(false);
  };

  return (
    <>
      <div
        className="product-item grid-type hover:rounded-lg hover:border hover:p-4 hover:shadow-md"
        onMouseLeave={() => setHover(false)}
      >
        <div className="product-main block cursor-pointer">
          <div className="product-thumb relative overflow-hidden">
            {data?.videoDetails !== null ? (
              <div>
                {hover == true ? (
                  <div className="mb-2">
                    <div
                      className="product-img relative object-cover duration-700"
                      onClick={() =>
                        handleDetailProduct(data.url, data.productId)
                      }
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
                  <div className="relative">
                    <Image
                      onMouseEnter={() => setHover(true)}
                      onClick={() =>
                        handleDetailProduct(data.url, data.productId)
                      }
                      className="m-auto w-[95%] duration-700"
                      src={selected.image_path}
                      width={400}
                      height={400}
                      alt="This image is temporary"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading="lazy"
                    />
                      {data.discountActive && data.discountValue && !isMobile && (
          <div className="absolute left-1 top-1 float-right flex justify-between border bg-[#e26178] p-1 text-center text-white">
            {data.typeOfDiscount === "Percentage" ? (
              <span className="text-xs">
                {data.discountValue}% OFF on {data.discountCategory}
              </span>
            ) : (
              <span>
                ₹{data.discountAmount} OFF on {data.discountCategory}
              </span>
            )}
          </div>
        )}
                    {skuList?.includes(data.SKU) && !isMobile && (
                      <div
                        id={`product-form-${data.productId}`}
                        className="try_on absolute right-1 top-1 z-0 float-right flex justify-between border border-[#e26178] px-2 text-center text-[#e26178] hover:bg-[#e26178] hover:text-white"
                        onClick={() =>
                          loadTryOnButton(data.SKU, data.productId)
                        }
                      >
                        <div className="flex items-center justify-between py-1">
                          <IoCameraOutline />
                        </div>
                      </div>
                    )}

                    {skuList?.includes(data.SKU) && isMobile && (
                      <div
                        id={`product-form-${data.productId}`}
                        className="try_on absolute right-1 top-1 z-0 float-right flex justify-between border border-[#e26178] px-2 text-center hover:bg-[#e26178] hover:text-white"
                        onClick={() =>
                          loadTryOnButton(data.SKU, data.productId)
                        }
                      >
                        <div className="flex items-center justify-between text-[#e26178] hover:text-white">
                          <IoCameraOutline />
                        </div>
                      </div>
                    )}

                    {/* <div
                      className="absolute bottom-1 z-0 float-left flex justify-between hover:z-50"
                      onClick={() => setShowVideo(!showVideo)}
                    >
                      <Icon.Play size={width} weight="light" color="#e26178" />
                    </div> */}
                    {/* <div className="absolute bottom-1 right-1 z-0 float-right flex justify-between hover:z-50">                      
                      {isProductInWishlist ? (
                        <Icon.Heart
                          size={width}
                          color="#fa000"
                          weight="fill"
                          onClick={() => HandleremoveFromWishlist()}
                        />
                      ) : (
                        <Icon.Heart
                          size={width}
                          color="#e26178"
                          weight="light"
                          onClick={() => HandleaddToWishlist()}
                        />
                      )}
                    </div> */}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <Image
                  onMouseEnter={() => setHover(true)}
                  onClick={() => handleDetailProduct(data.url, data.productId)}
                  className="m-auto w-[95%] duration-700"
                  src={selected.image_path}
                  width={400}
                  height={400}
                  alt="This image is temporary"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                />
                {skuList?.includes(data.SKU) && !isMobile && (
                  <div
                    id={`product-form-${data.productId}`}
                    className="try_on absolute right-1 top-1 z-0 float-right flex justify-between border border-[#e26178] p-1 text-center text-[#e26178] hover:bg-[#e26178] hover:text-white"
                    onClick={() => loadTryOnButton(data.SKU, data.productId)}
                  >
                    <div className="flex items-center justify-between px-2">
                      <IoCameraOutline />
                      {/* <p className="ps-1 text-sm">Try ON</p> */}
                    </div>
                  </div>
                )}
                {data.discountActive && data.discountValue && !isMobile && (
                  <div className="absolute left-1 top-1 float-right flex justify-between border bg-[#e26178] p-1 text-center text-white">
                    {data.typeOfDiscount === "Percentage" ? (
                      <span className="text-xs">
                        {data.discountValue}% OFF on {data.discountCategory}
                      </span>
                    ) : (
                      <span>
                        ₹{data.discountAmount} OFF on {data.discountCategory}
                      </span>
                    )}
                  </div>
                )}
                {/* {isMobile && (
                  <div className="absolute bottom-1 right-1 z-0 float-right flex justify-between hover:z-50">
                    <Icon.Cards size={width} weight="light" color="#e26178" />
                  </div>
                )} */}
                {skuList?.includes(data.SKU) && isMobile && (
                  <div
                    id={`product-form-${data.productId}`}
                    className="try_on absolute right-1 top-1 z-0 float-right mt-2 flex justify-between rounded-lg border border-[#e26178] px-2 text-center hover:bg-[#e26178] hover:text-white"
                    onClick={() => loadTryOnButton(data.SKU, data.productId)}
                  >
                    <div className="flex items-center justify-between text-[#e26178] hover:text-white">
                      <IoCameraOutline />
                    </div>
                  </div>
                )}
                {data.discountActive && data.discountValue && isMobile && (
                  <div className="absolute top-1 float-right flex w-32 items-center justify-between border bg-[#e26178] text-center text-white">
                    {data.typeOfDiscount === "Percentage" ? (
                      <span className="text-[8px]">
                        {data.discountValue}% OFF on {data.discountCategory}
                      </span>
                    ) : (
                      <span>
                        ₹{data.discountAmount} OFF on {data.discountCategory}
                      </span>
                    )}
                  </div>
                )}
                {/* {!isMobile && (
                  <div className="absolute bottom-1 right-1 z-0 float-right flex justify-between hover:z-50">
                    <Icon.Cards size={width} weight="light" color="#e26178" />
                  </div>
                )} */}
              </div>
            )}
          </div>
          <div className="relative flex justify-between">
            <div>
              {data.similarProductIds !== null && (
                <div
                  className="flex cursor-pointer items-center space-x-2"
                  onClick={() => {
                    setSelectedSimilarProductId(Number(data.productId));
                    setViewSimilarProducts(true);
                  }}
                >
                  <Icon.Cards size={width} weight="light" color="#e26178" />
                  <span className="text-sm font-medium text-[#e26178]">
                    View Similar
                  </span>
                </div>
              )}
            </div>
            <div className="">
              {isProductInWishlist ? (
                <Icon.Heart
                  size={width}
                  color="#fa0000"
                  weight="fill"
                  onClick={() => HandleremoveFromWishlist()}
                />
              ) : (
                <Icon.Heart
                  size={width}
                  color="#e26178"
                  weight="light"
                  onClick={() => HandleaddToWishlist()}
                />
              )}
            </div>
          </div>
          <div
            className="mt-4 lg:mb-4"
            onClick={() => handleDetailProduct(data.url, data.productId)}
          >
            <div className="product-name text-title text-xl duration-300">
              <p className="truncate">{data?.title}</p>
              {/* <p className="text-[#d8d8d8]">{data?.shortDesc}</p> */}
            </div>

            <StarRating stars={data.rating} />
            <div className="product-price-block relative z-[1] mt-1 flex flex-wrap items-center gap-2 duration-300">
              {data?.discountActive && (
                <p className="product-price text-title text-lg">
                  {formatPrice(parseInt(data?.discountPrice))}
                </p>
              )}
              {data?.discountActive && (
                <p className="text-[#beb3b3] line-through">
                  {formatPrice(parseInt(data?.productPrice))}
                </p>
              )}
              {!data?.discountActive && (
                <p className="product-price text-title text-lg">
                  {formatPrice(parseInt(data?.productPrice))}
                </p>
              )}
            </div>
            {/* {data?.discountPrice && (
              <p className="text-[#c95d71]">
                {data && data?.discountValue}%OFF
              </p>
            )} */}
          </div>
        </div>
        {viewSimilarProducts && (
          <ViewSimilar
            showComponent={viewSimilarProducts}
            handleViewSimilarProducts={handleCloseSimilarProducts}
            productId={Number(selectedSimilarProductId)}
          />
        )}
      </div>
    </>
  );
  // );
};

export default Product;
