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
  productId: string;
  product_id: string;
  quantity: number;
  name: string;
  metalType: string;
  metalPurity: string;
  price: any;
  image: any;
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
  const [cartUpdated, setCartUpdated] = useState<boolean>(false);
  const { userState } = useUser();
  const isLoggedIn = userState.isLoggedIn;

  useEffect(() => {
    if (!isLoggedIn) {
      if (typeof window !== 'undefined') {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        }
      }
    }
  }, []);

  const userId = auth?.currentUser?.uid;
  const cookieTokenn = Cookies.get("localtoken");

  useEffect(() => {
    if (isLoggedIn) {
      const fetchCartItemsDetails = async () => {
        try {
          const response = await instance.get(`${baseUrl}${getCartItems}`);
          const cartItemsData = response.data.cart_items.map((item: any) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            name: item.product_details[0].displayTitle,
            price: item.product_details[0].discountPrice,
            image: JSON.parse(item.product_details[0].imageDetails)[0]
              .image_path,
          }));
          setCartItems(cartItemsData);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };
      fetchCartItemsDetails();
    } else {
      if (typeof window !== 'undefined') {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
          const cartItemsFromStorage = JSON.parse(storedCartItems);
          const productIds = cartItemsFromStorage.map(
            (item: any) => item.product_id
          );
          const updatedCartItems = [];
          const fetchProductDetails = async () => {
            for (const productId of productIds) {
              try {
                const response = await axios.get(
                  `${baseUrl}${getProductbyId}${productId}`
                );
                const productDetails = response.data[0];

                const updatedCartItem = {
                  product_id: productId,
                  quantity: 1,
                  name: productDetails.displayTitle,
                  price: productDetails.discountPrice,
                  image: productDetails.imageDetails[0].image_path,
                };
                updatedCartItems.push(updatedCartItem);
              } catch (error) {
                console.error("Error fetching product details:", error);
              }
            }
            setCartItems(updatedCartItems);
          };
          fetchProductDetails();
        }
      }
    }
  }, [isLoggedIn, cartUpdated]);

  const addToCart = async (item: ProductType) => {
    const newItem: CartItem = { productId: item.productId, quantity: 1 };
    const cart = [...cartItems, newItem];
    setCartItems(cart);
    if (!isLoggedIn) {
      if (typeof window !== 'undefined') {
        localStorage.setItem("cartItems", JSON.stringify(cart));
      }
      setCartUpdated(!cartUpdated);
    } else {
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
      } catch (error) {
        console.error("Error saving cart items to the database:", error);
      }
    }
  };

  const removeFromCart = async (product_id: string, quantity: number) => {
    try {
      if (isLoggedIn) {
        const response = await axios.post<{ data: any }>(
          `${baseUrl}${removeCart}`,
          {
            cart: [
              {
                product_id,
                quantity: 0,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${cookieTokenn}`,
            },
          }
        );
        console.log("Item removed from cart:", response.data, product_id);

        // Update local state and localStorage only if the API call is successful
        const updatedCartItems = cartItems.filter(
          (item) => item.productId !== product_id
        );
        console.log(updatedCartItems);
        setCartItems(updatedCartItems);
      } else {
        // If not logged in, update only local state and localStorage
        const updatedCartItems = cartItems.filter(
          (item) => item.productId !== product_id
        );
        setCartItems(updatedCartItems);
        if (typeof window !== 'undefined') {
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        }
      }
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
      if (typeof window !== 'undefined') {
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }

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
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateCart, setCartItems, removeFromCart }}
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