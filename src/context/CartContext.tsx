"use client";

import React, { createContext, useEffect, useState } from "react";
import instance from "@/utils/axios";
import { baseUrl } from "@/utils/constants";
import Cookies from "js-cookie";
import { fetchCartItemsFromServer } from "@/utils/cartUtils";
import { useCouponContext } from "./CouponContext";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface CartItem {
  productDetails: {
    displayTitle: string;
    discountPrice: any;
    imageDetails: any;
    productPrice: string;
    discountValue: string;
    url: string;
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
  const [cartItems, setCartItems] = useState<any[]>([]);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cookieToken, setCookieToken] = useState<string | undefined>("");
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const { logOut } = useUser();

  useEffect(() => {
    if (isLoggedIn) {
      const userToken = Cookies.get("localtoken");
      if (userToken) {
        // setIsLoggedIn(true);
        setCookieToken(userToken);
      }
    }
  }, []);


  // useEffect(() => {
  //   console.log("INNN");
  //   //  if (typeof window !== "undefined") {
  //   const cartItemsFromStorage = localStorage.getItem("cartItems");
  //   if (cartItemsFromStorage) {
  //     setCartItems(JSON.parse(cartItemsFromStorage));
  //     console.log(cartItems, "CART");
  //   }
  //   //  }
  //   else if (isLoggedIn) {
  //     console.log("loggedcart");
  //     fetchCartItemsFromServer().then((cartItems: any) => {
  //       setCartItems(cartItems);
  //       console.log(cartItems);
  //     });
  //   }
  // }, [isLoggedIn]);


  
  useEffect(() => {
    const fetchCartItems = async () => {
      if (isLoggedIn) {
        const cartItemsFromServer = await fetchCartItemsFromServer();
        setCartItems(cartItemsFromServer);
        console.log(cartItems);
      } else if (typeof window !== "undefined") {
        const cartItemsFromStorage = localStorage.getItem("cartItems");
        if (cartItemsFromStorage) {
          setCartItems(JSON.parse(cartItemsFromStorage));
        }
      }
    };
    fetchCartItems();
  }, [isLoggedIn]);


  const addToCart = async (item: CartItem, quantity: number) => {
    const newItem = { ...item, quantity };
    setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    saveCartItemsToStorage([...cartItems, newItem]);

    if (isLoggedIn) {
      syncCartWithServer([...cartItems, newItem]);
      // const cartItemsFromServer = await fetchCartItemsFromServer();
      // setCartItems(cartItemsFromServer)
    }
  };

  // const removeFromCart = async (productId: number, newQuantity: number) => {
  //   const updatedCartItems = cartItems.filter(
  //     (item) => item.productId !== productId
  //   );
  //   setCartItems(updatedCartItems);
  //   saveCartItemsToStorage(updatedCartItems);
  //   if (isLoggedIn) {
  //     try {
  //       const cartData = cartItems.map((item) => ({
  //         productId: item.productId,
  //         quantity: item.productId !== productId ? 0 : item.quantity || 0,
  //       }));
  //       await instance.post(
  //         `${baseUrl}/cart/sync`,
  //         { cart: cartData },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${cookieToken}`,
  //           },
  //         }
  //       );
  //     } catch (error) {
  //       console.error("Error syncing cart with server:", error);
  //     }
  //   }
  // };


  const removeFromCart = async (productId: number) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== productId
    );
    setCartItems(updatedCartItems);
    saveCartItemsToStorage(updatedCartItems);

    if (isLoggedIn) {
      try {
        const cartData = cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.productId === productId ? 0 : item.quantity || 0,
        }));
        const response = await instance.post(
          `${baseUrl}/cart/sync`,
          { cart: cartData },
          {
            headers: {
              Authorization: `Bearer ${cookieToken}`,
            },
          }
        );
        const updatedCartFromServer = response.data.updatedCart || [];
        if (
          updatedCartFromServer.length === 1 &&
          updatedCartFromServer[0].productId === productId
        ) {
          // If the server returned only the removed item, fetch the updated cart from the server
          const cartItemsFromServer = await fetchCartItemsFromServer();
          setCartItems(cartItemsFromServer);
        } else {
          
          // setCartItems(updatedCartFromServer);
        }
      } catch (error) {
        console.error("Error syncing cart with server:", error);
      }
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
    if (typeof window != undefined) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  };

  const syncCartWithServer = async (cartItems: CartItem[]) => {
    let discount: number = 0;
    updateTotalDiscount(discount);
    try {
      const cartData = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity || "0",
      }));
      console.log(cookieToken,"TTTTTTTTTTTTTTTTTTTTTTTTT")
      await instance.post(
        `${baseUrl}/cart/sync`,
        { cart: cartData },
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        }
      ).then(async (response) => {
      const cartItemsFromServer = await fetchCartItemsFromServer();
      // setCartItems(cartItemsFromServer);
    });
    } catch (error) {
      console.error("Error syncing cart with server:", error);
      // logOut();
      // router.push("/login");
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
