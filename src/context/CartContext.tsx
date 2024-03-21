"use client";

import React, { createContext, useEffect, useState } from "react";
import { ProductType } from "@/type/ProductType";
import { useUser } from "./UserContext";
import instance from "@/utils/axios";
import axios from "axios";
import {
  addCart,
  removeCart,
  cartUpdate,
  getCartItems,
  getProductbyId,
} from "@/utils/constants";

import { auth } from "@/app/config";
import Cookies from "js-cookie";
import { baseUrl } from "@/utils/constants";

import { request } from "http";
import { updateCookie } from "@/utils/Token";

interface CartItem {
  productId: string|number;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: ProductType) => void;
  removeFromCart: (productId: string) => void;
  updateCart: (productId: string, quantity: number) => void;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { userState } = useUser();
  const isLoggedIn = userState.isLoggedIn;
  console.log(cartItems, "iflogged,cartItems");

  useEffect(() => {
    if (!isLoggedIn) {
      const storedCartItems = localStorage.getItem("cartItems");
      console.log(storedCartItems + ">>>>>>..stored items");
      if (storedCartItems) {
        console.log(storedCartItems, "first");
        setCartItems(JSON.parse(storedCartItems));
      }
    }
  }, []);

  const userId = auth?.currentUser?.uid;
  const cookieTokenn = Cookies.get("localtoken");
  
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const fetchCartItemsDetails = async () => {
  //       try {
  //         const response = await axios.get(`${baseUrl}${getCartItems}`, {
  //           headers: {
  //             Authorization: `Bearer ${cookieTokenn}`,
  //           },
  //         });
  //         console.log(response, "Kartt response");
  //         const cartItemsData = response.data.cart_items.map((item: any) => ({
  //           product_id: item.product_id,
  //           quantity: item.quantity,
  //           name: item.product_details[0].displayTitle,
  //           price: item.product_details[0].discountPrice,
  //           image: JSON.parse(item.product_details[0].imageDetails)[0]
  //             .image_path,
  //         }));
  //         console.log("Fetchedd Cart Items", cartItemsData);
  //         setCartItems(cartItemsData);
  //       } catch (error) {
  //         console.error("Error fetching cart items:", error);
  //       }
  //     };
  //     fetchCartItemsDetails();
  //   } else {
  //     const storedCartItems = localStorage.getItem("cartItems");
  //     console.log(storedCartItems, "STOREDDD2");
  //     if (storedCartItems) {
  //       const cartItemsFromStorage = JSON.parse(storedCartItems);
  //       const productIds = cartItemsFromStorage.map(
  //         (item: any) => item.product_id
  //       );
  //       const updatedCartItems = [];
  //        const fetchProductDetails = async () => {
  //         for (const productId of productIds) {
  //           try {
  //             console.log(productId, "kkk");
  //             const response = await axios.get(
  //               `${baseUrl}${getProductbyId}${productId}`
  //             );
  //             const productDetails = response.data[0];

  //             const updatedCartItem = {
  //               product_id: productId,
  //               quantity: 1,
  //               name: productDetails.displayTitle,
  //               price: productDetails.discountPrice,
  //               image: productDetails.imageDetails[0].image_path,
  //             };

  //             console.log(updatedCartItem, "======================");
  //             updatedCartItems.push(updatedCartItem);
  //           } catch (error) {
  //             console.error("Error fetching product details:", error);
  //           }
  //         }
  //         setCartItems(updatedCartItems);
  //       };
  //       fetchProductDetails();
  //     }
  //   }
  // }, [isLoggedIn]);

  console.log(cartItems, "CART ITEMS in CART CONTEXT");

  const addToCart = async (item: ProductType) => {
    console.log("Add to cart triggered >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(item, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const newItem: CartItem = { product_id: item.productId, quantity: 1 };
    console.log(newItem, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.new item");
    const cart = [...cartItems, newItem];
    console.log(cart);
    console.log("New cart items >>>>>>>>");
    setCartItems(cart);

    if (!isLoggedIn) {
      localStorage.setItem("cartItems", JSON.stringify(cart));
    } else {
      console.log("Inside the else block------------------------------------");
      console.log("Request Body:", { cartItems: cart, userId });
      try {
        const response = await axios.post<{ data: any }>(
          `${baseUrl}${addCart}`,
          {
            cart,
          },
          {
            headers: {
              Authorization: `Bearer ${cookieTokenn}`,
            },
          }
        );

        // try {
        //   const response = await instance.post<{ data: any }>(
        //     `${addCart}`, // Endpoint relative to the base URL
        //     { cart },
        //     {
        //       headers: {
        //         Authorization: `Bearer ${cookieTokenn}`,
        //       },
        //     }
        //   );
        //   console.log("Cart items saved to the database:", response.data);
        // } catch (error) {
        //   console.error("Error saving cart items to the database:", error);
        // }
        console.log(cartItems, "newwww");
        console.log("Cart items saved to the database:", response.data);
      } catch (error) {
        console.error("Error saving cart items to the database:", error);
      }
      // localStorage.setItem("cartItems", JSON.stringify(cart));
    }
  };

  const removeFromCart = async (product_id: string) => {
    try {
      if (isLoggedIn) {
        const response = await axios.post<{ data: any }>(
          `${baseUrl}${removeCart}`,
          {
            product_id,
          },
          {
            headers: {
              Authorization: `Bearer ${cookieTokenn}`,
            },
          }
        );
        console.log("Item removed from cart:", response.data, product_id);
      } else {
        // Optionally update local storage after successful response
        const updatedCartItems = cartItems.filter(
          (item) => item.product_id !== product_id
        );
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateCart = async (productId: string, quantity: number) => {
    try {
      const updatedCartItems = cartItems.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      if (isLoggedIn) {
        const response = await axios.post<{ data: any }>(
          `${baseUrl}${cartUpdate}`,
          {
            product_id: productId,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${cookieTokenn}`,
            },
          }
        );
        console.log(productId, quantity);

        console.log("Cart item updated:", response.data);
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCart , setCartItems} }
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
