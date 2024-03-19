"use client";

import React, { createContext, useEffect, useState } from "react";
import { ProductType } from "@/type/ProductType";
import { useUser } from "./UserContext";
import instance from "@/utils/axios";
import { addtoCart, getCartItems } from "@/utils/constants";

import { auth } from "@/app/config";

import { getToken } from "@/app/OtpVerification";
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

  useEffect(() => {
    if (isLoggedIn) {
      const fetchCartItemsDetails = async () => {
        try {
          const response = await instance.get(getCartItems);
          const cartItemsData = response.data.cart_items.map((item: any) => ({
            productId: item.product_id,
            quantity: item.quantity,
            // Add other necessary details from product_details array
            // For example, if you need the price and amount, you can access them like:
            price: item.product_details[0].discountPrice,
            amount: item.product_details[0].discountPrice * item.quantity,
            // Add other details as needed
          }));

          // Update the cartItems state with the extracted data
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

  console.log(cartItems, "444444444444444444444");

  const addToCart = (item: ProductType) => {
    console.log("Add to cart triggreddd>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(item, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const newItem: CartItem = { productId: item.productId, quantity: 1 };
    console.log(newItem, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.new item");
    const newCartItems = [...cartItems, newItem];

    console.log(newCartItems);
    console.log("new cart items>>>>>>");
    setCartItems(newCartItems);
    if (!isLoggedIn) {
      console.log(isLoggedIn, "]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]");
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      console.log("insidethe elseee");
      console.log("Request Body:", { cartItems: newCartItems, userId });
      instance
        .post(addtoCart, { newCartItems, userid: userId })
        .then((response) => {
          console.log(cartItems, "newwww");
          console.log("Cart items saved to the database:", response.data);
        })
        .catch((error) => {
          console.error("Error saving cart items to the database:", error);
        });
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );

    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== productId
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const updateCart = (productId: string, quantity: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
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
