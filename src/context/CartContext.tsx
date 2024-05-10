"use client";

import React, { createContext, useEffect, useState } from "react";
import instance from "@/utils/axios";
import { baseUrl } from "@/utils/constants";
import Cookies from "js-cookie";
import { fetchCartItemsFromServer } from "@/utils/cartUtils";
import { useCouponContext } from "./CouponContext";
import { useRouter } from "next/navigation";
import {useUser} from "@/context/UserContext";


interface CartItem {
  productDetails: {
    displayTitle: string;
    discountPrice: any;
    imageDetails: any;
  };
  gst?: any;
  displayTitle?: string;
  discountPrice?: any;
  imageDetails?: any;
  productId: number;
  quantity?: number;
  name?: string;
  price?: number;
  image?: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, newQuantity: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { totalDiscount, updateTotalDiscount } = useCouponContext();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cookieToken, setCookieToken] = useState<string | undefined>("");
  const router=useRouter()
  const { logOut} = useUser();

  useEffect(() => {
    const userToken = Cookies.get("localtoken");
    if (userToken) {
      setIsLoggedIn(true);
      setCookieToken(userToken);
    }
  }, []);

  useEffect(() => {
    const cartItemsFromStorage = localStorage.getItem("cartItems");
    if (cartItemsFromStorage) {
      setCartItems(JSON.parse(cartItemsFromStorage));
    } else if (isLoggedIn) {
      fetchCartItemsFromServer().then((cartItems: any) => {
        setCartItems(cartItems);
      });
    }
  }, [isLoggedIn]);

  const addToCart = (item: CartItem, quantity: number) => {
    const newItem = { ...item, quantity };
    setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    saveCartItemsToStorage([...cartItems, newItem]);

    if (isLoggedIn) {
      syncCartWithServer([...cartItems, newItem]);
    }
  };

  const removeFromCart = (productId: number) => {

    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== productId
    );
    setCartItems(updatedCartItems);

    saveCartItemsToStorage(updatedCartItems);

    if (isLoggedIn) {
      syncCartWithServer(updatedCartItems);
    }
  };

  const updateCartQuantity = (productId: number, newQuantity: number) => {

    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    saveCartItemsToStorage(updatedCartItems);

    if (isLoggedIn) {
      syncCartWithServer(updatedCartItems);
    }
  };

  const saveCartItemsToStorage = (cartItems: CartItem[]) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const syncCartWithServer = async (cartItems: CartItem[]) => {
    updateTotalDiscount(0)
    try {
      const cartData = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));
      await instance.post(
        `${baseUrl}/cart/sync`,
        { cart: cartData },
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error syncing cart with server:", error);
      logOut()
      router.push('/login')

    }
  };

  const value: CartContextProps = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
