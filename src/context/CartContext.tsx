"use client";

import React, { createContext, useEffect, useState } from "react";
import { ProductType } from "@/type/ProductType";

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
  console.log(cartItems);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    console.log(storedCartItems + ">>>>>>..stored items");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const addToCart = (item: ProductType) => {
    console.log("Add to cart triggreddd>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(item, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const newItem: CartItem = { productId: item.productId, quantity: 1 };
    console.log(newItem, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.new item");
    const newCartItems = [...cartItems, newItem];
    console.log(newCartItems);
    console.log("new cart items>>>>>>");
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
  };

  const updateCart = (productId: string, quantity: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };
  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // }, [cartItems]);

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
