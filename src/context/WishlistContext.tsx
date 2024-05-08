"use client"

import React, { createContext, useState, useEffect, useContext } from "react";
import instance from "@/utils/axios";
import { baseUrl, addwishlist,removewishlist,getwishlisted } from "@/utils/constants";
import Cookies from "js-cookie";

interface WishlistItem {
  productId: number;
}

interface WishlistContextProps {
  wishlistItems: WishlistItem[];
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (itemId: number) => void;
  getWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
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
    const fetchWishlistItems = async () => {
      try {
        const response = await instance.get(`${baseUrl}/wishlist`, {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        });
        setWishlistItems(response.data);
      } catch (error) {
        console.error("Error fetching wishlist from server:", error);
      }
    };

    if (isLoggedIn) {
      fetchWishlistItems();
    }
  }, [isLoggedIn, cookieToken]);

const addToWishlist = async (productId: number) => {
  try {
    await instance.get(`${baseUrl}${addwishlist}`, {
      params: {
        productId: productId,
      },
      headers: {
        Authorization: `Bearer ${cookieToken}`,
        
      },
    });
    setWishlistItems((WishlistItems) => [
      ...WishlistItems
    ]);
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
  }
};

  const removeFromWishlist = async (productId: number) => {
    try {
      await instance.get(`${baseUrl}${removewishlist}`, {
      params: {
        productId: productId,
      },
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      });
      setWishlistItems((WishlistItems) =>
        WishlistItems.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  const getWishlist = async () => {
    try {
      const response = await instance.get(`${baseUrl}${getwishlisted}`, {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      });
      console.log(response.data);
      return response.data;
      
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      return [];
    }
  };

  const value: WishlistContextProps = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    getWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
