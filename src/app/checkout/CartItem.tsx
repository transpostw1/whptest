import React from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  product: {
    productId: number;
    quantity: number;
    name: string;
    price: number;
    image: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { updateCartQuantity, removeFromCart } = useCart();
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateCartQuantity(product.productId, newQuantity);
    } else {
      removeFromCart(product.productId);
    }
  };
  const price = product.price * product.quantity;
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
  }).format(Math.round(parseInt(price.toString())));

  const handleRemoveFromCart = () => {
    removeFromCart(product.productId);
  };

  return (
    <div className="justify-between p-4 border rounded-lg border-gray-400 flex md:flex-row lg:flex-row lg:w-full md:w-full items-center mb-4">
      <Image
        src={product.image}
        width={100}
        height={200}
        alt="image"
        className="rounded-lg object-cover"
      />
      <div className="flex flex-col md:flex-row lg:flex-row lg:w-2/3 ">
        <div className="py-4">
          <div className="text-title">{product.name}</div>
          <div className="flex">
            <div
              className="text-sm max-md:text-base text-red-600 cursor-pointer hover:text-black duration-500"
              onClick={handleRemoveFromCart}
            >
              Remove
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/6 flex flex-col items-center justify-center">
        <div className="text-title text-center">
          ₹{formattedPrice}
        </div>
        <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between rounded-lg border border-line md:w-[100px] flex-shrink-0 w-20">
          <Icon.Minus
            onClick={() => handleQuantityChange(product.quantity - 1)}
            className={`text-base max-md:text-sm ${
              product.quantity === 1 ? "disabled" : ""
            }`}
          />
          <div className="text-button quantity">{product.quantity}</div>
          <Icon.Plus
            onClick={() => handleQuantityChange(product.quantity + 1)}
            className="text-base max-md:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
