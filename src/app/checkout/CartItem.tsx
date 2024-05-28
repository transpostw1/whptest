// import React from "react";
// import Image from "next/image";
// import * as Icon from "@phosphor-icons/react/dist/ssr";
// import { useCart } from "@/context/CartContext";
// import { useCouponContext } from "@/context/CouponContext";
// interface CartItemProps {
//   product: {
//     productId: number;
//     quantity: number;
//     name: string;
//     price: number;
//     image: string;
//   };
// }

// const CartItem: React.FC<CartItemProps> = ({ product }) => {
//   const { updateCartQuantity, removeFromCart } = useCart();
//   const { totalDiscount,updateTotalDiscount} = useCouponContext();
//   const handleQuantityChange = (newQuantity: number) => {
//     if (newQuantity >= 1) {
//       let discount=0;
//       updateTotalDiscount(discount)
//       updateCartQuantity(product.productId, newQuantity);
//     } else {
//       removeFromCart(product.productId);
//     }
//   };
//   const price = product.price * product.quantity;
//   const formattedPrice = new Intl.NumberFormat("en-IN", {
//     minimumFractionDigits: 2,
//   }).format(Math.round(parseInt(price.toString())));

//   const handleRemoveFromCart = () => {
//     removeFromCart(product.productId);
//   };

//   return (
//     <div className="justify-between p-4 border rounded-lg border-gray-400 flex md:flex-row lg:flex-row lg:w-full md:w-full items-center mb-4">
//       <Image
//         src={product.image}
//         width={100}
//         height={200}
//         alt="image"
//         className="rounded-lg object-cover"
//       />
//       <div className="flex flex-col md:flex-row lg:flex-row lg:w-2/3 ">
//         <div className="py-4">
//           <div className="text-title">{product.name}</div>
//           <div className="flex">
//             <div
//               className="text-sm max-md:text-base text-red-600 cursor-pointer hover:text-black duration-500"
//               onClick={handleRemoveFromCart}
//             >
//               Remove
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-full md:w-1/6 flex flex-col items-center justify-center">
//         <div className="text-title text-center">
//           ₹{formattedPrice}
//         </div>
//         <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between  md:w-[100px] flex-shrink-0 w-20">
//           <Icon.Minus
//             size={28}
//             onClick={() => handleQuantityChange(product.quantity - 1)}
//             className={`text-base max-md:text-sm text-black border p-1 hover:bg-[#e26178] hover:text-white ${
//               product.quantity === 1 ? "disabled" : ""
//             }`}
//           />
//           <div className="text-button quantity mr-1 ml-1">{product.quantity}</div>
//           <Icon.Plus
//           size={28}
//             onClick={() => handleQuantityChange(product.quantity + 1)}
//             className="text-base max-md:text-sm border p-1 hover:bg-[#e26178] hover:text-white"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartItem;

import React, { useState } from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useCouponContext } from "@/context/CouponContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductForWishlistLoggedOut } from "@/type/ProductType";

interface CartItemProps {
  product: {
    productId: number;
    quantity: number;
    productPrice: string;
    discountPrice: any|string;
    discountValue: string;
    name: string;
    price: number;
    image: string;
    url:string;
  };
}




interface ProductForWishlistLoggedIn {
  productId: number;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { updateCartQuantity, removeFromCart } = useCart();
  const { totalDiscount, updateTotalDiscount } = useCouponContext();
  const { addToWishlist } = useWishlist();
  const { isLoggedIn } = useUser();
  const [showModal, setShowModal] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      let discount = 0;
      updateTotalDiscount(discount);
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
    setShowModal(true);
  };

  const handleAddToWishlist = () => {
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
        image_path: product.image,
        url: product.url,
      };
      addToWishlist(productToAdd);
    }

    removeFromCart(product.productId);
    setShowModal(false);
  };

  const handleJustRemove = () => {
    removeFromCart(product.productId);
    setShowModal(false);
  };

  return (
    <div>
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
          <div className="text-title text-center"> ₹{formattedPrice} </div>
          <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between md:w-[100px] flex-shrink-0 w-20">
            <Icon.Minus
              size={28}
              onClick={() => handleQuantityChange(product.quantity - 1)}
              className={`text-base max-md:text-sm text-black border p-1 hover:bg-[#e26178] hover:text-white ${
                product.quantity === 1 ? "disabled" : ""
              }`}
            />
            <div className="text-button quantity mr-1 ml-1">
              {product.quantity}
            </div>
            <Icon.Plus
              size={28}
              onClick={() => handleQuantityChange(product.quantity + 1)}
              className="text-base max-md:text-sm border p-1 hover:bg-[#e26178] hover:text-white"
            />
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setShowModal(false)}
          />
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto relative">
            <div className="mb-4">
              <h2 className="text-xl font-bold">Remove Item</h2>
              <p>Do you want to add this item to your wishlist?</p>
            </div>
            <div className="flex justify-center">
              <button
                className="px-4 py-4 mr-2 text-white bg-red-500 rounded-full hover:bg-red-600"
                onClick={handleJustRemove}
              >
                No
              </button>
              <button
                className="px-4 py-4 text-white bg-green-500 rounded-full hover:bg-green-600"
                onClick={handleAddToWishlist}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
