"use client";

import React, { createContext, useEffect, useState } from "react";
import { ProductType } from "@/type/ProductType";
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
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, newQuantity: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cookieToken, setCookieToken] = useState<string | undefined>("");

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
      // Fetch cart items from the server if local storage is empty and user is logged in
      fetchCartItemsFromServer().then((cartItems) => {
        setCartItems(cartItems);
      });
    }
  }, [isLoggedIn]);

  // const addToCart = (item: CartItem) => {
  //   setCartItems((prevCartItems) => [...prevCartItems, item]);
  //   saveCartItemsToStorage([...cartItems, item]);

  //   if (isLoggedIn) {
  //     syncCartWithServer([...cartItems, item]);
  //   }
  // };


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
      // setTotalDiscount(0);
      if (!isLoggedIn) {
        if (typeof window !== "undefined") {
          localStorage.setItem("cartItems", JSON.stringify(cart));
        }
        setCartItems(!cartUpdated);
      } else {
        try {
          const response = await instance.post<{ data: any }>(
            `${baseUrl}${"/cart/sync"}`,
            {
              cart,
            },
            {
              // headers: {
              //   Authorization: `Bearer ${cookieTokenn}`,
              // },
            }
          );
        } catch (error) {
          console.error("Error saving cart items to the database:", error);
        }
      }
    };

  // const removeFromCart = (productId: number) => {
  //   const updatedCartItems = cartItems.filter(
  //     (item) => item.productId !== productId
  //   );
  //   setCartItems(updatedCartItems);
  //   saveCartItemsToStorage(updatedCartItems);
  //   if (isLoggedIn) {
  //     syncCartWithServer(updatedCartItems);
  //   }
  // };


const removeFromCart = async (productId: number, quantity: number) => {
  try {
    if (isLoggedIn) {
      try {
        const response = await instance.post<{ data: any }>(
          `${baseUrl}${"/cart/sync"}`,
          {
            cart: [
              {
                productId: productId,
                quantity: 0,
              },
            ],
          },
          {
            // headers: {
            //   Authorization: `Bearer ${cookieTokenn}`,
            // },
          }
        );
      } catch (error) {
        // setError(true);
      }

      // Update local state and localStorage only if the API call is successful
      const updatedCartItems = cartItems.filter(
        (item) => item.productId !== productId
      );
      setCartItems(updatedCartItems);
      // setTotalDiscount(0);
    } else {
      // If not logged in, update only local state and localStorage
      const updatedCartItems = cartItems.filter(
        (item) => item.productId !== productId
      );
      setCartItems(updatedCartItems);
      // setTotalDiscount(0);

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
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
