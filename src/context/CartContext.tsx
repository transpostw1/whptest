"use client";

import React, { createContext, useEffect, useState } from "react";
import { baseUrl, syncCart, graphqlbaseUrl } from "@/utils/constants";
import { fetchCartItemsFromServer } from "@/utils/cartUtils";
import { useCouponContext } from "./CouponContext";
import { useUser } from "@/context/UserContext";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

interface CartItem {
  productDetails: {
    displayTitle: string;
    discountPrice: any;
    imageDetails: any;
    productPrice: string;
    quantityleft: number;
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
  isBuyNow?: boolean;
  variants?: { variantType: string; variantName: string }[];
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (
    item: CartItem,
    quantity: number,
    variants: any,
    isBuyNow?: boolean,
  ) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, newQuantity: number) => void;
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { totalDiscount, updateDiscount } = useCouponContext();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cookieToken, setCookieToken] = useState<string | undefined>("");
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useUser();

  useEffect(() => {
    if (isLoggedIn) {
      if (typeof window != undefined) {
        const userToken = localStorage.getItem("localtoken");

        if (userToken) {
          setCookieToken(userToken);
        }
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      if (isLoggedIn) {
        await addLocalItemsToServerCart();
        const cartItemsFromServer = await fetchCartItemsFromServer();
        setCartItems(cartItemsFromServer);
      } else if (typeof window !== "undefined") {
        const cartItemsFromStorage = localStorage.getItem("cartItems");
        if (cartItemsFromStorage) {
          setCartItems(JSON.parse(cartItemsFromStorage));
        } else {
          const searchParams = new URLSearchParams(window.location.search);
          const buyNowId = searchParams.get("buyNow");
          if (buyNowId) {
            const mockCartItem = {
              productId: parseInt(buyNowId),
              quantity: 1,
              productDetails: {
                displayTitle: "Product Title",
                discountPrice: 0,
                imageDetails: [],
              },
            };
            setCartItems([mockCartItem]);
          }
        }
      }
      setLoading(false);
    };
    fetchCartItems();
  }, [isLoggedIn]);

  const addToCart = async (
    item: CartItem,
    quantity: number,
    variants: any,
    isBuyNow?: boolean,
  ) => {
    setLoading(true);
    const newItem = { ...item, quantity, isBuyNow, variants };
    setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    saveCartItemsToStorage([...cartItems, newItem]);

    if (isLoggedIn) {
      syncCartWithServer([newItem]);
      // const cartItemsFromServer = await fetchCartItemsFromServer();
      // setCartItems(cartItemsFromServer)
    }
    setLoading(false);
  };
  const removeFromCart = async (productId: number) => {
    let discount = 0;
    updateDiscount(discount);
    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== productId,
    );
    setCartItems(updatedCartItems);
    saveCartItemsToStorage(updatedCartItems);

    if (isLoggedIn) {
      try {
        const cartData = cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.productId === productId ? 0 : item.quantity || 0,
        }));
        const getAuthHeaders: any = () => {
          if (!cookieToken) return null;
          return {
            authorization: `Bearer ${cookieToken}`,
          };
        };

        const client = new ApolloClient({
          uri: graphqlbaseUrl,
          headers: getAuthHeaders(),
          cache: new InMemoryCache(),
        });
        const SYNC_CART = gql`
          mutation CartSync($cartItems: [CartItemInput!]!) {
            cartSync(cartItems: $cartItems) {
              message
              details {
                synced {
                  productId
                  productTitle
                  productImage
                  productPrice
                  quantity
                }
                failed {
                  productId
                  message
                }
                deleted {
                  productId
                  message
                }
              }
            }
          }
        `;

        const { data } = await client.mutate({
          mutation: SYNC_CART,
          variables: {
            cartItems: cartData,
          },
          context: {
            headers: getAuthHeaders(),
          },
          fetchPolicy: "no-cache",
        });
        const updatedCartFromServer = data.cartSync.details.synced || [];
        if (
          updatedCartFromServer.length === 1 &&
          updatedCartFromServer[0].productId === productId
        ) {
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
      item.productId === productId ? { ...item, quantity: newQuantity } : item,
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
    try {
      setLoading(true);
      const cartData = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity || 0,
        variants: item.variants
        ? item.variants.map(({ __typename, ...rest }) => rest) 
        : [], 
    }));
      // console.log(cartData,"CARTDATATATATATTa")
      const getAuthHeaders: any = () => {
        const cookieToken = localStorage.getItem("localtoken");
        if (!cookieToken) return null;
        return {
          authorization: `Bearer ${cookieToken}`,
        };
      };

      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        headers: getAuthHeaders(),
        cache: new InMemoryCache(),
      });
      const SYNC_CART = gql`
        mutation CartSync($cartItems: [CartItemInput!]!) {
          cartSync(cartItems: $cartItems) {
            message
          }
        }
      `;

      const { data } = await client.mutate({
        mutation: SYNC_CART,
        variables: {
          cartItems: cartData,
        },
        context: {
          headers: getAuthHeaders(),
        },
        fetchPolicy: "no-cache",
      });

      const cartItemsFromServer = await fetchCartItemsFromServer();
      setCartItems(cartItemsFromServer);
      setLoading(false);
    } catch (error) {
      console.error("Error syncing cart with server:", error);
    }
  };

  const addLocalItemsToServerCart = async () => {
    try {
      if (typeof window != undefined) {
        const cartItemsFromStorage = localStorage.getItem("cartItems");
        if (cartItemsFromStorage) {
          const parsedCartItems: CartItem[] = JSON.parse(cartItemsFromStorage);
          for (const item of parsedCartItems) {
            await syncCartWithServer([item]);
          }
          localStorage.removeItem("cartItems");
          // console.log("Added Local items to Server");
        }
      }
    } catch (error) {
      console.error("Error adding local items to server cart:", error);
    }
  };

  const value: CartContextProps = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    setCartItems,
    loading,
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
