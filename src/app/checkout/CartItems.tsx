import React from "react";
import CartItem from "./CartItem";
import { useCart } from "@/context/CartContext";


interface CartItemsProps {
  cartItems: any[];
  handleQuantityChange: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number, quantity: number) => void;
}

const CartItems: React.FC<CartItemsProps> = ({
  cartItems,
  handleQuantityChange,
  removeFromCart,
}) => {
  // const{cartItems}=useCart()
  
console.log(cartItems,"sfdsfsf")
const filteredCartItems = cartItems.filter((item) => item.quantity > 0);

  return (
    <div>
      <h1 className="text-2xl">Your Shopping Bag</h1>
      <div className="list-product-main w-full mt-3">
        {cartItems?.length < 1 ? (
          <p className="text-button pt-3">No products in your cart</p>
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
    </div>
  );
};

export default CartItems;
