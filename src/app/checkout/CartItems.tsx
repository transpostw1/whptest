import React, { useEffect } from 'react';
import CartItem from './CartItem';
import { fetchCartItemsFromServer } from "@/utils/cartUtils";
import { useCart } from "@/context/CartContext";

interface CartItemsProps {
  cartItems: any[];
  handleQuantityChange: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number, quantity: number) => void;
}

const CartItems: React.FC<CartItemsProps> = ({ cartItems, handleQuantityChange, removeFromCart }) => {
  const { setCartItems, setStoredCartItems } = useCart();

  useEffect(() => {
    const fetchCartItems = async () => {
      const fetchedCartItems = await fetchCartItemsFromServer();
      setCartItems(fetchedCartItems);
      setStoredCartItems(fetchedCartItems);
    };

    fetchCartItems();
  }, [setCartItems, setStoredCartItems]);

  return (
    <div>
      <h1 className="text-2xl">Your Shopping Bag</h1>
      <div className="list-product-main w-full mt-3">
        {cartItems?.length < 1 ? (
          <p className="text-button pt-3">No products in your cart</p>
        ) : (
          cartItems?.map((product) => (
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