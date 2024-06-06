// import React from "react";
// import CartItem from "./CartItem";
// import Skeleton from "react-loading-skeleton";
// import { useCart } from "@/context/CartContext";

// interface CartItemsProps {
//   cartItems: any[];
//   handleQuantityChange: (productId: number, newQuantity: number) => void;
//   removeFromCart: (productId: number, quantity: number) => void;
// }

// const CartItems: React.FC<CartItemsProps> = ({
//   cartItems,
//   handleQuantityChange,
//   removeFromCart,
// }) => {
//   // const{cartItems}=useCart()

// const filteredCartItems = cartItems.filter((item) => item.quantity > 0);

//   return (
//     <div>
//       <h1 className="text-2xl">Your Shopping Bag</h1>
//       <div className="list-product-main w-full mt-3">
//         {cartItems?.length < 1 ? (
//           <p className="text-button pt-3">No products in your cart</p>
//         ) : (
//           filteredCartItems?.map((product) => (
//             <CartItem
//               key={product?.productId}
//               product={product}
//               handleQuantityChange={handleQuantityChange}
//               removeFromCart={removeFromCart}
//             />

//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartItems;

import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import Skeleton from "react-loading-skeleton";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const filteredCartItems = cartItems.filter((item) => item.quantity > 0);

  return (
    <div>
      <h1 className="text-2xl">Your Shopping Bag</h1>
      <div className="list-product-main w-full mt-3">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
          </div>
        ) : cartItems?.length < 1 ? (
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
