"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import StickyNav from "@/components/Header/StickyNav";
import { useWishlist } from "@/context/WishlistContext";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import Loader from "../blog/loading";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useCurrency } from "@/context/CurrencyContext";
import { showCustomToast } from "@/components/Other/CustomToast";

type InputVariant = {
  __typename: string;
  variantType: string;
  variantName: string;
};

type OutputVariant = {
  variantType: string;
  variantName: string;
};
const Wishlist = () => {
  const { cartItems, addToCart, updateCartQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const showModal = (message: string) => {
    setModalMessage(message);
    setIsOutOfStock(true);
  };

  const closeModal = () => {
    setIsOutOfStock(false);
  };
  const { formatPrice } = useCurrency();
  const [type, setType] = useState<string | undefined>();
  const { wishlistItems, setWishlistItems, removeFromWishlist, getWishlist } =
    useWishlist();
  const { isLoggedIn } = useUser();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        console.log(wishlistItems, "wissshhshs");
        const fetchedWishlistItems = await getWishlist();
        setWishlistItems(fetchedWishlistItems);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
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
    console.log(product, "ADDTocartwhslistproductconsole");
    const isMakeToOrder =
      product.makeToOrder === 1 || product.makeToOrder === true;
    if (
      (product.quantityleft === 0 || product.quantityleft === null) &&
      !isMakeToOrder
    ) {
      showModal("Product is out of stock!");
      return;
    }

    const productAlreadyExists = cartItems.find(
      (item: any) => item.productId === product.productId,
    );
    const currentQuantity = productAlreadyExists?.quantity ?? 0;
    const updatedQuantity = currentQuantity + 1;
    showCustomToast("Item successfully added to cart!");
    if (productAlreadyExists) {
      updateCartQuantity(product.productId, updatedQuantity);
      removeFromWishlist(product.productId);
      showCustomToast("Product Quantity Updated!");
    } else {
      const transformVariants = (variants: InputVariant[]): OutputVariant[] => {
        return variants?.map(({ __typename, ...rest }) => rest);
      };

      const variantss = Array.isArray(product.variants)
        ? transformVariants(product.variants)
        : [];
      const newProduct: any = {
        productDetails: {
          title: product.title,
          discountPrice: product.discountPrice,
          imageDetails: [{ image_path: product.image_path }],
          productPrice: product.productPrice,
          quantityleft: product.quantityleft,
          makeToOrder: product.makeToOrder,
          url: product.url,
          productId: product.productId,
        },
        productId: product.productId,
        quantity: 1,
        variants: variantss,
      };

      console.log("New product objec", newProduct);
      console.log("Variants in new produt", newProduct.variants);
      const variantsToPass = variantss.length > 0 ? variantss : undefined;

      addToCart(newProduct, 1, variantsToPass);
      removeFromWishlist(product.productId);
    }
  };

  const handleBuyNow = (product: any) => {
    const isMakeToOrder =
      product.makeToOrder === 1 || product.makeToOrder === true;
    if (
      (product.quantityleft === 0 || product.quantityleft === null) &&
      !isMakeToOrder
    ) {
      showModal("Product is out of stock!");
      return;
    }
    const productAlreadyExists = cartItems.find(
      (item) => item.productId === product.productId,
    );
    const transformVariants = (variants: InputVariant[]): OutputVariant[] => {
      return variants?.map(({ __typename, ...rest }) => rest);
    };

    const variantss = Array.isArray(product.variants)
      ? transformVariants(product.variants)
      : [];

    console.log("Original variants:", product.variants);
    console.log("Transformed variants:", variantss);

    if (!productAlreadyExists) {
      const newProduct: any = {
        productDetails: {
          title: product.title,
          discountPrice: product.discountPrice,
          imageDetails: [{ image_path: product.image_path }],
          productPrice: product.productPrice,
          url: product.url,
        },
        productId: product.productId,
        quantity: 1,
        variants: variantss,
      };

      console.log("New product objec", newProduct);
      console.log("Variants in new produt", newProduct.variants);
      const variantsToPass = variantss.length > 0 ? variantss : undefined;

      addToCart(newProduct, 1, variantsToPass, true);
    }

    removeFromWishlist(product.productId);
    router.push(`/checkout?buyNow=${product.productId}`);
  };

  const handleType = (type: string) => {
    setType((prevType) => (prevType === type ? undefined : type));
  };

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    })
      .format(value)
      .replace("₹", "₹ ");
  };

  const handleImageLoad = (productId: number) => {
    setImageLoading((prevState) => ({ ...prevState, [productId]: false }));
  };

  const handleImageError = (productId: number) => {
    setImageLoading((prevState) => ({ ...prevState, [productId]: false }));
  };

  console.log(filteredWishlistItems);

  return (
    <div className="shop-product breadcrumb1">
      <head>
        <title>Wishlist</title>
        <meta name="wishlisted" content={"Your wishlisted items."} />
      </head>
      <StickyNav />
      <div className="container">
        <div className="list-product-block relative">
          {isLoading ? (
            <Loader />
          ) : wishlistItems.length < 1 ? (
            <div className="my-10 text-center text-2xl text-[#e26178]">
              Your Wishlist Seems to be Empty!
            </div>
          ) : (
            <div className="list-product my-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {filteredWishlistItems?.map((product, index) => (
                <div
                  key={index}
                  className="relative flex cursor-pointer justify-center"
                >
                  <div className="product-card h-[100%] w-[80%] p-4">
                    <div className="product-image flex justify-center">
                      {isLoggedIn && imageLoading[product.productId] ? (
                        <Skeleton width={300} height={300} className="" />
                      ) : isLoggedIn ? (
                        <div className="relative">
                          <Image
                            unoptimized
                            src={product?.image_path}
                            alt={product.title}
                            width={300}
                            height={300}
                            className=""
                            onClick={() =>
                              router.push(
                                `/products/${product.productId}/${product.url}`,
                              )
                            }
                            onLoad={() => handleImageLoad(product.productId)}
                            onError={() => handleImageError(product.productId)}
                          />
                          <div className="product-actions absolute right-2 top-2">
                            <button
                              className="heart-icon"
                              onClick={() =>
                                removeFromWishlist(product.productId)
                              }
                            >
                              <Icon.Heart
                                size={25}
                                color="#fa0000"
                                weight="fill"
                              />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <Image
                            unoptimized
                            src={product.image_path}
                            alt={product.title}
                            width={300}
                            height={300}
                            onClick={() =>
                              router.push(
                                `/products/${product.productId}/${product.url}`,
                              )
                            }
                            className="bg-[#f7f7f7]"
                            onLoad={() => handleImageLoad(product.productId)}
                            onError={() => handleImageError(product.productId)}
                          />
                          <div className="product-actions absolute right-2 top-2">
                            <button
                              className="heart-icon"
                              onClick={() =>
                                removeFromWishlist(product.productId)
                              }
                            >
                              <Icon.Heart
                                size={25}
                                color="#fa0000"
                                weight="fill"
                              />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className="product-details mt-4"
                      onClick={() =>
                        router.push(
                          `/products/${product.productId}/${product.url}`,
                        )
                      }
                    >
                      <h3 className="product-name text-title truncate text-xl">
                        {product.title}
                      </h3>
                      
                      {product.variants && product.variants.length > 0 && (
                        <div>
                          {product.variants.map(
                            (variant: any, index: number) =>
                              variant.variantType &&
                              variant.variantName && (
                                <h3 key={index} className="text-sm font-normal">
                                  {variant.variantType}: {variant.variantName}
                                </h3>
                              ),
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <p className="product-price flex flex-col">
                          <span className="discounted-price text-title text-lg">
                            {product.discountPrice
                              ? formatPrice(parseInt(product.discountPrice))
                              : formatPrice(parseInt(product.productPrice))}
                          </span>
                          {product.discountPrice && (
                            <span className="original-price text-[#beb3b3] line-through">
                              {formatPrice(parseInt(product.productPrice))}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-col flex-wrap justify-between gap-2 lg:flex-row lg:max-xl:flex-row">
                      <div
                        className="w-full bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-1 text-center text-lg font-semibold text-white lg:w-36 lg:max-xl:w-full"
                        onClick={() => handleBuyNow(product)}
                      >
                        Buy Now
                      </div>
                      <div
                        className="w-full bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-1 text-center text-lg font-semibold text-white lg:w-36 lg:max-xl:w-full"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add To Box
                      </div>
                    </div>
                  </div>
                  {/* <div className="product-actions absolute top-2 right-2">
                    <button
                      className="heart-icon"
                      onClick={() => removeFromWishlist(product.productId)}
                    >
                      <Icon.Heart size={25} color="#fa0000" weight="fill" />
                    </button>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </div>
        {isOutOfStock && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
            <div className="flex flex-col items-center bg-white p-6">
              <p>{modalMessage}</p>
              <button
                className="mt-4 bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-white"
                onClick={() => closeModal()}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
