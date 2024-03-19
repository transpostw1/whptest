"use client";

import React, { createContext, useEffect, useState } from "react";
import { ProductType } from "@/type/ProductType";
import { useUser } from "./UserContext";
import instance from "@/utils/axios";
import axios from "axios";
import { addCart,removeCart,cartUpdate, getCartItems } from "@/utils/constants";

import { auth } from "@/app/config";
import Cookies from "js-cookie";
import { baseUrl } from "@/utils/constants";

import { request } from "http";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: ProductType) => void;
  removeFromCart: (productId: string) => void;
  updateCart: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { userState } = useUser();
  const isLoggedIn = userState.isLoggedIn;
  console.log(cartItems);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    console.log(storedCartItems + ">>>>>>..stored items");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const userId = auth?.currentUser?.uid;
  const cookieTokenn = Cookies.get("localtoken");
  useEffect(() => {
    if (isLoggedIn) {
      const fetchCartItemsDetails = async () => {
        try {
          const response = await axios.get(`${baseUrl}${getCartItems}`, {
            headers: {
              Authorization: `Bearer ${cookieTokenn}`,
            },
          });
          console.log(response, "Kartt response");
          const cartItemsData = response.data.cart_items.map((item: any) => ({
            productId: item.product_id,
            quantity: item.quantity,
            name: item.product_details[0].displayTitle,
            price: item.product_details[0].discountPrice,
            image: JSON.parse(item.product_details[0].imageDetails)[0]
              .image_path,
          }));
          console.log("Fetchedd Cart Items", cartItemsData);
          setCartItems(cartItemsData);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };
      fetchCartItemsDetails();
    } else {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    }
  }, [isLoggedIn]);

  console.log(cartItems, "CART ITEMS in CART CONTEXT");

  const addToCart = async (item: ProductType) => {
    console.log("Add to cart triggered >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(item, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const newItem: CartItem = { productId: item.productId, quantity: 1 };
    console.log(newItem, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.new item");
    const newCartItems = [...cartItems, newItem];

    console.log(newCartItems);
    console.log("New cart items >>>>>>>>");
    setCartItems(newCartItems);

    if (!isLoggedIn) {
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      console.log("Inside the else block");
      console.log("Request Body:", { cartItems: newCartItems, userId });
      try {
        const response = await axios.post<{ data: any }>(
          `${baseUrl}${addCart}`,
          {
            newCartItems,
            userid: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${cookieTokenn}`,
            },
          }
        );
        console.log(cartItems, "newwww");
        console.log("Cart items saved to the database:", response.data);
      } catch (error) {
        console.error("Error saving cart items to the database:", error);
      }
      // localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  };



 const removeFromCart = async (productId: string) => {
   try {
     const response = await axios.put<{ data: any }>(
       `${baseUrl}${removeCart}`,
       {
         productId,
       },
       {
         headers: {
           Authorization: `Bearer ${cookieTokenn}`,
         },
       }
     );
     console.log("Item removed from cart:", response.data);
     // Optionally update local storage after successful response
     const updatedCartItems = cartItems.filter(
       (item) => item.productId !== productId
     );
     setCartItems(updatedCartItems);
     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
   } catch (error) {
     console.error("Error removing item from cart:", error);
   }
 };



 const updateCart = async (productId: string, quantity: number) => {
   try {
     const updatedCartItems = cartItems.map((item) =>
       item.productId === productId ? { ...item, quantity } : item
     );
     setCartItems(updatedCartItems);
     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

     if (isLoggedIn) {
       const response = await axios.post<{ data: any }>(
         `${baseUrl}${cartUpdate}`,
         {
           productId,
           quantity,
         },
         {
           headers: {
             Authorization: `Bearer ${cookieTokenn}`,
           },
         }
       );
       console.log("Cart item updated:", response.data);
     }
   } catch (error) {
     console.error("Error updating cart item:", error);
   }
 };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCart }}
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
