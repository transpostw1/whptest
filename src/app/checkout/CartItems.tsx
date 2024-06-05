import React from 'react';
import CartItem from './CartItem';

interface CartItemsProps {
  cartItems: any[];
  handleQuantityChange: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number, quantity: number) => void;
}

const CartItems: React.FC<CartItemsProps> = ({ cartItems, handleQuantityChange, removeFromCart }) => {
  return (
    <div>
      <h1 className="text-2xl">Your Shopping Bag</h1>
      <div className="list-product-main w-full mt-3">
        {cartItems?.length === 1 ? (
          <CartItem
            key={cartItems[0]?.productId}
            product={cartItems[0]}
            handleQuantityChange={handleQuantityChange}
            removeFromCart={removeFromCart}
          />
        ) : cartItems?.length > 1 ? (
          cartItems?.map((product) => (
            <CartItem
              key={product?.productId}
              product={product}
              handleQuantityChange={handleQuantityChange}
              removeFromCart={removeFromCart}
            />
          ))
        ) : (
          <p className="text-button pt-3">No products in your cart</p>
        )}
      </div>
    </div>
  );
};

export default CartItems;