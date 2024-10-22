import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useCouponContext } from "@/context/CouponContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductForWishlistLoggedOut } from "@/type/ProductType";
import Skeleton from "react-loading-skeleton";
import Loader from "../blog/loading";
import { useCurrency } from "@/context/CurrencyContext";
import { useRouter } from "next/navigation";

type InputVariant = {
  __typename: string;
  variantType: string;
  variantName: string;
};

type OutputVariant = {
  variantType: string;
  variantName: string;
};

interface CartItemProps {
  product: {
    productId: number;
    quantity: number;
    productPrice: any | string;
    discountPrice: any | string;
    discountValue: string;
    quantityleft: number;
    makeToOrder: number | boolean;
    name: string;
    price: number;
    image: string;
    url: string;
    variants: any;
  };
  handleQuantityChange: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number, quantity: number) => void;
}

interface ProductForWishlistLoggedIn {
  productId: number;
  variants: any;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { updateCartQuantity, removeFromCart, loading } = useCart();
  const { totalDiscount, updateDiscount } = useCouponContext();
  const { addToWishlist } = useWishlist();
  const { isLoggedIn } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [showOutOfStockModal, setShowOutOfStockModal] = useState(false);
  const [isloading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();
  const router = useRouter();

  const transformVariants = (variants: InputVariant[]): OutputVariant[] => {
    return variants?.map(({ __typename, ...rest }) => rest);
  };

  const variants = transformVariants(product.variants);

  useEffect(() => {
    if (product) {
      console.log(product, "huuuuuuuuu");
      const isMakeToOrder =
        product.makeToOrder === 1 || product.makeToOrder === true;
      if (
        (product.quantityleft === 0 || product.quantityleft === null) &&
        !isMakeToOrder
      ) {
        console.log(
          "Out of stock - Make to order status:",
          product.makeToOrder,
        );
        setShowOutOfStockModal(true);
      } else {
        setLoading(false);
      }
    }
  }, [product]);

  const handleOutOfStockConfirm = () => {
    removeFromCart(product.productId);
    if (isLoggedIn) {
      const productToAdd: ProductForWishlistLoggedIn = {
        productId: product.productId,
      };
      addToWishlist(productToAdd);
    } else {
      const productToAdd: ProductForWishlistLoggedOut = {
        productId: product.productId,
        title: product.name,
        productPrice: product.productPrice,
        discountPrice: product.price,
        discountValue: product.discountValue,
        makeToOrder: product.makeToOrder,
        image_path: product.image,
        url: product.url,
        variants: product.variants,
      };
      addToWishlist(productToAdd);
    }
    setShowOutOfStockModal(false);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      let discount = 0;
      updateDiscount(discount);
      updateCartQuantity(product.productId, newQuantity);
    } else {
      removeFromCart(product.productId);
    }
  };
  const price = product.price * product.quantity;
  const productPrice = product.productPrice * product.quantity;

  const handleRemoveFromCart = () => {
    setShowModal(true);
  };

  const handleAddToWishlist = () => {
    let discount = 0;
    if (isLoggedIn) {
      const productToAdd: ProductForWishlistLoggedIn = {
        productId: product.productId,
        variants: variants,
      };
      console.log(productToAdd, "CARTITEM PRODUCT TO ADD");
      addToWishlist(productToAdd);
    } else {
      const productToAdd: ProductForWishlistLoggedOut = {
        productId: product.productId,
        title: product.name,
        productPrice: product.productPrice,
        discountPrice: product.price,
        discountValue: product.discountValue,
        quantityleft: product.quantityleft,
        makeToOrder: product.makeToOrder,
        image_path: product.image,
        url: product.url,
        variants: product.variants,
      };
      addToWishlist(productToAdd);
    }
    removeFromCart(product.productId);
    setShowModal(false);
  };

  const handleProductDetailsLink = (productUrl: any, productId: any) => {
    router.push(`/products/${productUrl}/${productId}`);
  };

  const handleJustRemove = () => {
    let discount = 0;
    removeFromCart(product.productId);
    setShowModal(false);
  };

  return (
    <div>
      {isloading ? (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-400 p-4 md:w-full md:flex-row lg:w-full lg:flex-row">
          <Skeleton height={100} width={100} />
          <div className="flex flex-col md:flex-row lg:w-2/3 lg:flex-row">
            <div className="py-4">
              <Skeleton width={200} height={20} />
              <div className="flex">
                <Skeleton width={100} height={20} />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center md:w-1/6">
            <Skeleton width={100} height={20} />
            <div className="quantity-block bg-surface flex w-20 flex-shrink-0 items-center justify-between p-2 md:w-[100px] md:p-3">
              <Skeleton width={28} height={28} />
              <Skeleton width={28} height={28} />
              <Skeleton width={28} height={28} />
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4 flex w-full items-center justify-between border-b p-4 md:flex-row">
          <Image
            src={product?.image}
            width={100}
            height={200}
            alt="image"
            className="mr-2 cursor-pointer bg-[#f7f7f7] object-cover"
            unoptimized
            onClick={() =>
              handleProductDetailsLink(product.productId, product.url)
            }
          />
          <div className="flex w-full flex-col md:flex-row lg:w-2/3">
            <div className="py-4">
              <div
                className="text-title cursor-pointer"
                onClick={() =>
                  handleProductDetailsLink(product.productId, product.url)
                }
              >
                {product.name}
              </div>
              {/* <div> */}
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
              {/* </div> */}
              <div className="flex">
                <div
                  className="cursor-pointer text-sm text-red-600 duration-500 hover:text-black max-md:text-base"
                  onClick={handleRemoveFromCart}
                >
                  Remove
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-between lg:w-1/6">
            <div className="text-title text-center">   {formatPrice(price || productPrice)} </div>
            {productPrice > price && (
              <div className="text-[#beb3b3] line-through">
                {formatPrice(productPrice)}
              </div>
            )} */}
            <div className="quantity-block bg-surface flex w-20 flex-shrink-0 items-center justify-between p-2 md:w-[100px] md:p-3">
              <Icon.Minus
                size={28}
                onClick={() => handleQuantityChange(product.quantity - 1)}
                className={`border p-1 text-base text-black hover:bg-[#e26178] hover:text-white max-md:text-sm ${
                  product.quantity === 1 ? "disabled" : ""
                }`}
              />
              <div className="text-button quantity ml-1 mr-1">
                {product.quantity}
              </div>
              <Icon.Plus
                size={28}
                onClick={() => handleQuantityChange(product.quantity + 1)}
                className={`border p-1 text-base hover:bg-[#e26178] hover:text-white max-md:text-sm ${
                  product.quantity >= 5 ? "disabled cursor-not-allowed" : ""
                }`}
                disabled={product.quantity >= 5}
              />
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setShowModal(false)}
          />
          <div className="relative mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg">
            <div className="float-right" onClick={() => setShowModal(false)}>
              <Icon.X />
            </div>
            <div className="mb-4">
              <h2 className="text-center text-xl font-bold">Remove Item?</h2>
            </div>
            <div className="flex justify-center gap-2">
              <button
                className="rounded-xl border border-[#E26178] px-2 py-2 text-[#E26178] hover:bg-[#E26178] hover:text-white"
                onClick={handleJustRemove}
              >
                Remove Item
              </button>
              <button
                className="rounded-xl border border-[#E26178] px-2 py-2 text-[#E26178] hover:bg-[#E26178] hover:text-white"
                onClick={handleAddToWishlist}
              >
                Move to Wishlist
              </button>
            </div>
          </div>
        </div>
      )}

      {showOutOfStockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setShowModal(false)}
          />
          <div className="relative mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-4">
              <h2 className="text-center text-xl font-bold">Out of Stock</h2>
              <p className="text-center">
                Some items are out of stock and will be moved to wishlist.
              </p>
            </div>
            <div className="flex justify-center gap-2">
              <button
                className="rounded-xl bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-white hover:bg-[#bb547d]"
                onClick={handleOutOfStockConfirm}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
