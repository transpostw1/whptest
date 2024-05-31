"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import instance from "@/utils/axios";
import { useUser } from "./UserContext";
import {
  baseUrl,
  addwishlist,
  removewishlist,
  getwishlisted,
} from "@/utils/constants";
import Cookies from "js-cookie";
import {
  ProductType,
  ProductData,
  ProductForWishlistLoggedIn,
  ProductForWishlistLoggedOut,
} from "@/type/ProductType";

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
  addToWishlist: (productType: ProductType) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  getWishlist: () => Promise<WishlistItem[]>;
  wishlistItemsCount: number;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cookieToken, setCookieToken] = useState<string | undefined>("");
  const [wishlistItemsCount, setWishlistItemsCount] = useState(0);
  const { isLoggedIn } = useUser();

  useEffect(() => {
    const uniqueWishlistItems = wishlistItems.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.productId === item.productId)
    );
    setWishlistItemsCount(uniqueWishlistItems.length);
  }, [wishlistItems]);

  useEffect(() => {
    if (isLoggedIn) {
      const userToken = Cookies.get("localtoken");
      // if (userToken) {
        setCookieToken(userToken);
      // }
    }
  }, []);

  useEffect(() => {
    // if (typeof window !== "undefined") {
    const fetchWishlistItems = async () => {
      try {
        const wishlistData = await getWishlist();
        const localWishlistItems = JSON.parse(
          localStorage.getItem("wishlistItems") || "[]"
        );

        const mergedWishlistItems = [...wishlistData, ...localWishlistItems];

        // Filter out any duplicates from the merged wishlist
        const uniqueWishlistItems = mergedWishlistItems.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.productId === item.productId)
        );

        setWishlistItems(uniqueWishlistItems);
      } catch (error) {
        console.error("Error fetching wishlist from server:", error);
      }
    };

    fetchWishlistItems();
    // }
  }, [isLoggedIn, cookieToken]);

  const normalizeImagePath = (
    imagePath: string | string[] | undefined
  ): string => {
    if (!imagePath) {
      return "";
    }
    if (Array.isArray(imagePath)) {
      return imagePath.length > 0 ? imagePath[0] : "";
    }
    return imagePath;
  };

  const addToWishlist = async (
    product:
      | ProductType
      | ProductForWishlistLoggedIn
      | ProductForWishlistLoggedOut
  ) => {
    // if (!product || !("productId" in product)) {
    //   throw new Error("Invalid product data");
    // }
    try {
      if (typeof window !== "undefined") {
        if (isLoggedIn) {
          let localWishlistItems = null;
          if (typeof window !== "undefined") {
            localWishlistItems = JSON.parse(
              localStorage.getItem("wishlistItems") || "[]"
            );
          }
          // const localWishlistItems = JSON.parse(
          //   localStorage.getItem("wishlistItems") || "[]"
          // );

          // Add the local wishlist items to the database if they are not already present
          const dbWishlistItems = await getWishlist();
          const localItemsToAdd = localWishlistItems.filter(
            (item: WishlistItem) =>
              !dbWishlistItems.some(
                (dbItem) => dbItem.productId === item.productId
              )
          );

          const promises = localItemsToAdd.map((item: any) =>
            instance.get(`${baseUrl}${addwishlist}`, {
              params: { productId: item.productId },
              headers: {
                Authorization: `Bearer ${cookieToken}`,
              },
            })
          );

          await Promise.all(promises);
          await instance.get(`${baseUrl}${addwishlist}`, {
            params: { productId: product.productId },
            headers: {
              Authorization: `Bearer ${cookieToken}`,
            },
          });

          const updatedDbWishlist = await getWishlist();

          const mergedWishlist = [
            ...updatedDbWishlist,
            ...localWishlistItems.filter(
              (item: any) =>
                !updatedDbWishlist.some(
                  (dbItem) => dbItem.productId === item.productId
                )
            ),
          ];
          setWishlistItems(mergedWishlist);
          {
            typeof window !== "undefined" &&
              localStorage.setItem(
                "wishlistItems",
                JSON.stringify(mergedWishlist)
              );
          }
        } else {
          {
            let localWishlistItems = null;
            if (typeof window !== "undefined") {
              localWishlistItems = JSON.parse(
                localStorage.getItem("wishlistItems") || "[]"
              );
            }
            const isProductInLocalStorage = localWishlistItems.some(
              (item: any) => item.productId === product.productId
            );

            if (!isProductInLocalStorage) {
              const updatedWishlistItems = [
                ...localWishlistItems,
                {
                  productId: product.productId,
                  title: product.title,
                  productPrice: product.productPrice,
                  discountPrice: product.discountPrice,
                  discountValue: product.discountValue,
                  // image_path: product.imageDetails[0].image_path,
                  image_path: normalizeImagePath(product.image_path),
                  url: product.url,
                },
              ];

              localStorage.setItem(
                "wishlistItems",
                JSON.stringify(updatedWishlistItems)
              );

              setWishlistItems(updatedWishlistItems);
            }
          }
        }
      }
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
      {
        typeof window !== "undefined" &&
          localStorage.setItem(
            "wishlistItems",
            JSON.stringify(updatedWishlistItems)
          );
      }
      // localStorage.setItem(
      //   "wishlistItems",
      //   JSON.stringify(updatedWishlistItems)
      // );
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
        let localWishlistItems = null;
        if (typeof window !== "undefined") {
          localWishlistItems = JSON.parse(
            localStorage.getItem("wishlistItems") || "[]"
          );
        }
        // const localWishlistItems = JSON.parse(
        //   localStorage.getItem("wishlistItems") || "[]"
        // );
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
    wishlistItemsCount: wishlistItems.length,
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
