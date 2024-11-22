"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import StickyNav from "@/components/Header/StickyNav";
import { useWishlist } from "@/context/WishlistContext";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
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
interface Props {
  handleComponent: (args: string) => void;
}

const MobileWishList: React.FC<Props> = ({ handleComponent }) => {
  const { cartItems, addToCart, updateCartQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState<string | undefined>();
  const { wishlistItems, removeFromWishlist } = useWishlist();
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

    if (productAlreadyExists) {
      showCustomToast('Product Quantity Updated!');
      updateCartQuantity(product.productId, updatedQuantity);
    } else {
      showCustomToast('Item successfully added to cart!');
      const transformVariants = (variants: InputVariant[]): OutputVariant[] => {
        return variants?.map(({ __typename, ...rest }) => rest);
      };

      const variantss = Array.isArray(product.variants)
        ? transformVariants(product.variants)
        : [];

      console.log("Original variants:", product.variants);
      console.log("Transformed variants:", variantss);

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
  
      addToCart(newProduct, 1,variantsToPass, true);
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

  const handleBackButton = (args: string) => {
    router.push("/profile")
  };
  return (
    <div className="shop-product breadcrumb1">
      <StickyNav />
      <div className="container">
        <div className="flex">
          <div onClick={() => handleBackButton("")} className="">
            <Icon.CaretLeft size={22} />
          </div>
          <div>
            <p className="font-bold text-xl">Wishlist</p>
          </div>
        </div>
        <div className="list-product-block relative">
          {isLoading ? (
            <div className="loading-container flex justify-center items-center h-full">
              <Image
                src="/dummy/loader.gif"
                alt={"loader"}
                height={50}
                width={50}
              
              />
            </div>
          ) : wishlistItems.length < 1 ? (
            <div className="text-center text-2xl my-10">Wishlist is empty</div>
          ) : (
            <div className="list-product grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
              {wishlistItems.map((product, index) => (
                <div key={index} className="relative cursor-pointer">
                  <div className="product-card p-4 h-[100%] w-[100%]">
                    <div
                      className="product-image"
                      onClick={() => router.push(`/products/${product.url}`)}
                    >
                      <Image
                        src={product.image_path}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="rounded-md"
                        unoptimized
                      />
                    </div>
                    <div className="product-details mt-4">
                      <h3 className="product-name text-title text-xl truncate">
                        {product.title}
                      </h3>
                      {product.variants && product.variants.length > 0 && (
                        <div>
                          <h3 className="font-medium">
                            {product.variants[0].variantType}:{" "}
                            {product.variants[0].variantName}
                          </h3>
                          <h3 className="font-medium">
                            {product.variants[1].variantType}:{" "}
                            {product.variants[1].variantName}
                          </h3>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <p className="product-price flex flex-col">
                          <span className="discounted-price text-title text-lg">
                            {formatCurrency(product.discountPrice)}
                          </span>
                          <span className="original-price line-through text-[#beb3b3]">
                            {formatCurrency(product.productPrice)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                      <div
                        className="bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-center font-semibold text-lg rounded-full text-white"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add To Cart
                      </div>
                      <div
                        className="bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-center font-semibold text-lg rounded-full text-white"
                        onClick={() => handleBuyNow(product)}
                      >
                        Buy Now
                      </div>
                    </div>
                  </div>
                  <div className="product-actions absolute top-2 right-2">
                    <button
                      className="heart-icon"
                      onClick={() => removeFromWishlist(product.productId)}
                    >
                      <Icon.Heart size={25} color="#fa0000" weight="fill" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
  );
};

export default MobileWishList;
