import React, { useState, useEffect, use } from "react";
import CartItem from "./CartItem";
import Skeleton from "react-loading-skeleton";
import { useWishlist } from "@/context/WishlistContext";

interface CartItemsProps {
  cartItems: any[];
  handleQuantityChange: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number, quantity: number) => void;
  loading: boolean;
}

const CartItems: React.FC<CartItemsProps> = ({
  cartItems,
  handleQuantityChange,
  removeFromCart,
  loading,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { wishlistItems, addToWishlist, removeFromWishlist, getWishlist } =
    useWishlist();
  const [inActiveCartProducts, setInActiveCartProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log("Cart Itemssssssssss", cartItems);
    const inactiveProducts =
      cartItems
        .filter((product) => !product.isActive)
        .map((product) => ({
          productId: product.productId,
          variants: product.variants,
        })) || [];
    console.log("InactiveProducts", inactiveProducts);
    setInActiveCartProducts(inactiveProducts);
    if (inactiveProducts.length > 0) {
      setShowModal(true);
    }
  }, [cartItems]);

  const handleMoveToWishlist = () => {
    inActiveCartProducts.forEach((product) => {
      const isAlreadyInWishlist = wishlistItems.some(
        (item) => item.productId === product.productId,
      );
      if (!isAlreadyInWishlist) {
        addToWishlist(product);
      }
      removeFromCart(product.productId, 0);
    });
    setShowModal(false);
  };

  const filteredCartItems = cartItems.filter((item) => item.quantity > 0);

  return (
    <div>
      <h1 className="text-center text-xl text-[#E26178] sm:text-start sm:text-2xl">
        Your Jewellery Box
      </h1>
      <div className="list-product-main mt-3 w-full border border-b-0">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
          </div>
        ) : cartItems?.length < 1 ? (
          <p className="animate-pulse pt-9 text-center text-xl font-medium text-[#e26178]">
            There is nothing here!
          </p>
        ) : (
          filteredCartItems?.map((product) => (
            <CartItem
              key={product?.productId}
              product={product}
              handleQuantityChange={handleQuantityChange}
              removeFromCart={removeFromCart}
            />
          ))
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">
              Some products are out of stock
            </h2>
            <p className="mb-6">
              We are moving them to your wishlist. Do you want to confirm?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleMoveToWishlist}
                className="rounded-xl border border-[#E26178] px-2 py-2 text-[#E26178] hover:bg-[#E26178] hover:text-white"
              >
                Move to Wishlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
