"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useWishlist } from "@/context/WishlistContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";
import StarRating from "./StarRating";
import { IoCameraOutline } from "react-icons/io5";


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
  const [skuList, setSkuList] = useState<string[]>([]); // Initialize skuList state

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

  useEffect(() => {
    fetchSkusList();
  }, []);

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

  const loadScript = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      // Check if the script is already loaded
      if (document.querySelector(`script[src="https://camweara.com/integrations/camweara_api.js"]`)) {
        resolve(); // Script already loaded
        return;
      }

      // Create the script tag
      const script = document.createElement('script');
      script.src = "https://camweara.com/integrations/camweara_api.js";
      script.onload = () => {
        // Give some time for the function to be available
        setTimeout(() => {
          if (typeof window.getSkusListWithTryOn === "function") {
            resolve(); // Function is ready
          } else {
            reject(new Error("getSkusListWithTryOn is not defined"));
          }
        }, 1000);
      };
      script.onerror = () => reject(new Error("Failed to load script"));

      // Append the script to the body
      document.body.appendChild(script);
    });
  };

  const fetchSkusList = async () => {
    try {
      await loadScript(); // Ensure the script is loaded
      const skus = await window.getSkusListWithTryOn({ companyName: 'whpjewellers' });
      setSkuList(skus); // Update SKU list state
      // console.log(skuList);
    } catch (error) {
      console.error("Error fetching SKU list:", error);
    }
  };

  const loadTryOnButton = async (sku: string, productId: string): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      const scriptSrc = "https://cdn.camweara.com/integrations/camweara_api.js";

      const loadButton = async () => {
        return new Promise<void>((buttonResolve) => {
          try {
            window.loadTryOnButton({
              psku: sku,
              page: 'product',
              company: 'whpjewellers',
              buynow: { enable: 'false' },
              prependButton: { class: `try_on`, id: `product-form-${productId}` },
              styles: {
                tryonbutton: { backgroundColor: 'white', color: 'white', border: '1px solid #white', borderRadius: '25px' }, // Hide the auto-loaded button
                tryonbuttonHover: { backgroundColor: '#white', color: 'white', borderRadius: '25px' },
                MBtryonbutton: { width: '50%', borderRadius: '25px' },
              },

            });
            console.log("Button Created");
            // After loading, wait for the button to appear in the DOM
            const buttonInterval = setInterval(() => {
              const tryonButton = document.getElementById('tryonButton') || document.getElementById('MB_tryonButton');

              if (tryonButton) {
                // Hide the button
                tryonButton.style.display = 'none';
                console.log("Button Clicked");
                // Automatically click the button
                tryonButton.click();

                // Stop the interval once the button is clicked
                clearInterval(buttonInterval);

                buttonResolve(); // Resolve after the button is clicked
              }
            }, 100); // Check every 100ms for the button
          } catch (error) {
            reject(new Error(`Failed to load Try On button for SKU: ${sku}. Error: ${error.message}`));
          }
        });
      };

      // Check if the script is already loaded
      const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
      if (existingScript) {
        await loadButton(); // Await the button loading if script is already loaded
      } else {
        // Append the script and load the button after it's loaded
        const script = document.createElement('script');
        script.src = scriptSrc;
        script.onload = async () => {
          await loadButton(); // Await loading the button after the script is loaded
        };
        script.onerror = () => reject(new Error("Failed to load Camweara script"));
        document.body.appendChild(script);
      }
    });
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
              {skuList.includes(data.SKU) && (
                <div
                  id={`product-form-${data.productId}`} // Fixed template string syntax
                  className="absolute top-4 right-3 z-50 try_on flex items-center justify-between rounded-xl border border-[#e26178] text-center hover:bg-[#e26178] text-[#e26178] cursor-pointer hover:text-white p-1"
                  onClick={() => loadTryOnButton(data.SKU, data.productId)} // Uncomment if you want to enable button click
                >
                  <div className="flex items-center justify-between">
                    <IoCameraOutline />
                    <p className="ps-1 text-sm">Try On</p>
                  </div>
                </div>
              )}
              <Image
                onClick={() => handleDetailProduct(data.productId, data.url)}
                className="m-auto w-[95%] duration-700"
                src={data?.imageDetails[0].image_path}
                width={400}
                height={400}
                alt="This image is temporarry"
                unoptimized
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
