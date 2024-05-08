"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import instance from "@/utils/axios";
import {
  baseUrl,
  addwishlist,
  removewishlist,
  getwishlisted,
} from "@/utils/constants";
import Cookies from "js-cookie";
import { ProductData } from "@/type/ProductType"; // Assuming you have a ProductData type defined

interface WishlistItem {
  productId: number;
  title: string;
  productPrice: string;
  discountPrice: string;
  discountValue: string;
  image_path: string;
  url: string;
}

interface WishlistContextProps {
  wishlistItems: WishlistItem[];
  addToWishlist: (productData: ProductData) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  getWishlist: () => Promise<WishlistItem[]>;
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
        const wishlistData = await getWishlist();
        const localWishlistItems = JSON.parse(
          localStorage.getItem("wishlistItems") || "[]"
        );
        const mergedWishlistItems = [...wishlistData, ...localWishlistItems];
        setWishlistItems(mergedWishlistItems);
      } catch (error) {
        console.error("Error fetching wishlist from server:", error);
      }
    };

    fetchWishlistItems();
  }, [isLoggedIn, cookieToken]);

  const addToWishlist = async (productData: ProductData) => {
    try {
      if (isLoggedIn) {
        await instance.get(`${baseUrl}${addwishlist}`, {
          params: { productId: productData.productDetails.productId },
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        });
      }

      const updatedWishlistItems = [
        ...wishlistItems,
        {
          productId: productData.productDetails.productId,
          title: productData.productDetails.title,
          productPrice: productData.productDetails.productPrice,
          discountPrice: productData.productDetails.discountPrice,
          discountValue: productData.productDetails.discountValue,
          image_path: productData.productDetails.imageDetails[0].image_path,
          url: productData.productDetails.url,
        },
      ];

      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(updatedWishlistItems)
      );
      setWishlistItems(updatedWishlistItems);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      if (isLoggedIn) {
        await instance.get(`${baseUrl}${removewishlist}`, {
          params: { productId },
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        });
      }

      const updatedWishlistItems = wishlistItems.filter(
        (item) => item.productId !== productId
      );
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(updatedWishlistItems)
      );
      setWishlistItems(updatedWishlistItems);
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  const getWishlist = async (): Promise<WishlistItem[]> => {
    try {
      if (isLoggedIn) {
        const response = await instance.get(`${baseUrl}${getwishlisted}`, {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        });
        return response.data;
      } else {
        const localWishlistItems = JSON.parse(
          localStorage.getItem("wishlistItems") || "[]"
        );
        return localWishlistItems;
      }
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