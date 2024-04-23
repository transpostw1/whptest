"use client";

import React, { createContext, useEffect, useState } from "react";
import instance from "@/utils/axios";
import { baseUrl } from "@/utils/constants";
import Cookies from "js-cookie";

interface CartItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number, quantity: number) => void;
  updateCart: (productId: number, newQuantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [storedCartItems, setStoredCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cookieTokenn, setCookieTokenn] = useState<string | undefined>("");

  useEffect(() => {
    const userToken = Cookies.get("localtoken");
    if (userToken) {
      setIsLoggedIn(true);
      setCookieTokenn(userToken);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const cartItemsFromStorage = localStorage.getItem("cartItems");
      if (cartItemsFromStorage) {
        setCartItems(JSON.parse(cartItemsFromStorage));
        setStoredCartItems(JSON.parse(cartItemsFromStorage));
      } else {
        // Fetch cart items from the server if local storage is empty
        fetchCartItemsFromServer().then((cartItems) => {
          setCartItems(cartItems);
          setStoredCartItems(cartItems);
        });
      }
    } else {
      const cartItemsFromStorage = localStorage.getItem("cartItems");
      if (cartItemsFromStorage) {
        setCartItems(JSON.parse(cartItemsFromStorage));
        setStoredCartItems(JSON.parse(cartItemsFromStorage));
      }
    }
  }, [isLoggedIn]);

  const addToCart = async (item: CartItem) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
    setStoredCartItems((prevStoredCartItems) => [...prevStoredCartItems, item]);
    localStorage.setItem("cartItems", JSON.stringify([...storedCartItems, item]));

    if (isLoggedIn) {
      await syncCartWithServer(storedCartItems);
    }
  };

  const removeFromCart = async (productId: number, quantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.productId !== productId)
    );
    setStoredCartItems((prevStoredCartItems) =>
      prevStoredCartItems.filter((item) => item.productId !== productId)
    );
    localStorage.setItem(
      "cartItems",
      JSON.stringify(storedCartItems.filter((item) => item.productId !== productId))
    );

    if (isLoggedIn) {
      await syncCartWithServer(storedCartItems);
    }
  };

  const updateCart = async (productId: number, newQuantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    setStoredCartItems((prevStoredCartItems) =>
      prevStoredCartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    localStorage.setItem("cartItems", JSON.stringify(storedCartItems));
  
    if (isLoggedIn) {
      const updatedCartItems = storedCartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      await syncCartWithServer(updatedCartItems);
    }
  };

  const syncCartWithServer = async (cartItems: CartItem[]) => {
    try {
      const cartData = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      await instance.post(`${baseUrl}/cart/sync`, { cart: cartData }, {
        headers: {
          Authorization: `Bearer ${cookieTokenn}`,
        },
      });
    } catch (error) {
      console.error("Error syncing cart with server:", error);
    }
  };

  const value: CartContextProps = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCart,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};