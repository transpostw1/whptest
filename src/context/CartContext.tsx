"use client";

import React, { createContext, useEffect, useState } from "react";
import instance from "@/utils/axios";
import axios from "axios";
import { getCartItems, getProductbyId } from "@/utils/constants";
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
  removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
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
      const fetchCartItemsDetails = async () => {
        try {
          const response = await instance.get(`${baseUrl}${getCartItems}`, {
            headers: {
              Authorization: `Bearer ${cookieTokenn}`,
            },
          });
          const cartItemsData = response.data.cart_items.map((item: any) => {
            const imageDetails = JSON.parse(
              item.product_details[0].imageDetails
            );
            imageDetails.sort((a: any, b: any) => a.order - b.order);
            const imagePath = imageDetails[0] ? imageDetails[0].image_path : "";
            return {
              productId: item.productId,
              quantity: item.quantity,
              name: item.product_details[0].displayTitle,
              price: parseInt(item.product_details[0].discountPrice),
              image: imagePath,
            };
          });
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
  }, [isLoggedIn, cookieTokenn]);

  const addToCart = async (item: CartItem) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
    if (isLoggedIn) {
      try {
        await instance.post(
          `${baseUrl}${getCartItems}`,
          {
            productId: item.productId,
            quantity: item.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${cookieTokenn}`,
            },
          }
        );
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, item])
      );
    }
  };

  const removeFromCart = async (productId: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.productId !== productId)
    );
    if (isLoggedIn) {
      try {
        await instance.delete(`${baseUrl}${getCartItems}/${productId}`, {
          headers: {
            Authorization: `Bearer ${cookieTokenn}`,
          },
        });
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    } else {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems.filter((item) => item.productId !== productId))
      );
    }
  };

  const value: CartContextProps = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={value}>
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
