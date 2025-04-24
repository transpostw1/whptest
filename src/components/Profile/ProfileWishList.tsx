"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import StickyNav from "@/components/Header/StickyNav";
import { useWishlist } from "@/context/WishlistContext";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";
import { showCustomToast } from "@/components/Other/CustomToast";

const ProfileWishList = () => {
  const { cartItems, addToCart, updateCartQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState<string | undefined>();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
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
    // console.log(product, "ADDTocartwhslistproductconsole");

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

      // console.log("Original variants:", product.variants);
      // console.log("Transformed variants:", variantss);

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

      // console.log("New product objec", newProduct);
      // console.log("Variants in new produt", newProduct.variants);
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

    // console.log("Original variants:", product.variants);
    // console.log("Transformed variants:", variantss);

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

      // console.log("New product objec", newProduct);
      // console.log("Variants in new produt", newProduct.variants);
      const variantsToPass = variantss.length > 0 ? variantss : undefined;

      addToCart(newProduct, 1, variantsToPass, true);
    }

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
          <p className="my-5 text-2xl font-semibold">Wishlist</p>
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
                      onClick={() =>
                        router.push(
                          `/products/${product.productId}/${product.url}`,
                        )
                      }
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
                        Add To Box
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
              <div className="flex flex-col items-center rounded-lg bg-white p-6">
                <p>{modalMessage}</p>
                <button
                  className="mt-4 rounded bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-white"
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
