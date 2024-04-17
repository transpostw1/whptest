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
import { useCouponContext } from "./CouponContext";

interface CartItem {
  productId: number | any;
  quantity: number;
  // name: string;
  // metalType: string;
  // metalPurity: string;
  // price: any;
  // image: any;
}


interface CartContextProps {
  cartState?: CartItem;
  cartItems: CartItem[];
  addToCart: (item: ProductType) => void;
  removeFromCart: (productId: number, quantity: number) => void;
  updateCart: (productId: number, quantity: number) => void;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartUpdated, setCartUpdated] = useState<boolean>(false);
  const { userState } = useUser();
  const isLoggedIn = userState.isLoggedIn;
  const { logOut } = useUser();
  const {setTotalDiscount}=useCouponContext()

  useEffect(() => {
    if (!isLoggedIn) {
      if (typeof window !== "undefined") {
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
          const cartItemsData = response.data.cart_items.map((item: any) => {
            const imageDetails = JSON.parse(
              item.product_details[0].imageDetails
            );
            imageDetails.sort((a:any, b:any) => a.order - b.order);
            const imagePath = imageDetails[0] ? imageDetails[0].image_path : '';
            return {
              productId: item.productId,
              quantity: item.quantity,
              name: item.product_details[0].displayTitle,
              price: parseInt(item.product_details[0].discountPrice),
              image: imagePath,
            };
          });
          setCartItems(cartItemsData);
          setTotalDiscount(0);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };
      fetchCartItemsDetails();
    } else {
      if (typeof window !== "undefined") {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
          const cartItemsFromStorage = JSON.parse(storedCartItems);
          const productIds = cartItemsFromStorage.map(
            (item: any) => item.productId
          );

          const updatedCartItems: any = [];
          const fetchProductDetails = async () => {
            for (const productId of productIds) {
              try {
                const response = await axios.get(
                  `${baseUrl}${getProductbyId}${productId}`
                );
                const productDetails = response.data[0];

                const updatedCartItem = {
                  productId: productId,
                  quantity: 1,
                  name: productDetails.displayTitle,
                  price: productDetails.discountPrice,
                  image: productDetails.imageDetails[0].image_path,
                };
                updatedCartItems?.push(updatedCartItem);
              } catch (error) {
                console.error("Error fetching product details:", error);
              }
            }
            setCartItems(updatedCartItems);
            setTotalDiscount(0)
          };
          fetchProductDetails();
        }
      }
    }
  }, [isLoggedIn, cartUpdated]);

  const addToCart = async (item: ProductType) => {
    const image = item.imageDetails.sort(
      (a: any, b: any) => parseInt(b.order) - parseInt(a.order)
    );
    const newItem: any = {
      productId: item.productId,
      quantity: 1,
      image: image[1].image_path,
      name: item.displayTitle,
      price: item.discountPrice,
    };
    const cart = [...cartItems, newItem];
    setCartItems(cart);
    setTotalDiscount(0);
    if (!isLoggedIn) {
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(cart));
      }
      setCartUpdated(!cartUpdated);
    } else {
      try {
        const response = await instance.post<{ data: any }>(
          `${baseUrl}${addCart}`,
          {
            cart,
          },
        );
      } catch (error) {
        console.error("Error saving cart items to the database:", error);
      }
    }
  };

  const removeFromCart = async (productId: number, quantity: number) => {
    try {
      if (isLoggedIn) {
        try {
          const response = await instance.post<{ data: any }>(
            `${baseUrl}${removeCart}`,
            {
              cart: [
                {
                  productId: productId,
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
        } catch (error) {
          setError(true)
        }

        const updatedCartItems = cartItems.filter(
          (item) => item.productId !== productId
        );
        setCartItems(updatedCartItems);
        setTotalDiscount(0);
      } else {
        const updatedCartItems = cartItems.filter(
          (item) => item.productId !== productId
        );
        setCartItems(updatedCartItems);
        setTotalDiscount(0);

        if (typeof window !== "undefined") {
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        }
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateCart = async (productId: number, quantity: number) => {
    try {
      const updatedCartItems = cartItems.map((item) =>
        item.product_id=== productId ? { ...item, quantity } : item
      );
      setCartItems(updatedCartItems);
      setTotalDiscount(0)

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }

      if (isLoggedIn) {
        const response = await instance.post<{ data: any }>(
          `${baseUrl}${cartUpdate}`,
          {
            cart: [
              {
                productId,
                quantity,
              },
            ],
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
