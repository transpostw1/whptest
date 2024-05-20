import { useEffect, useState } from "react";
import { useWishlist } from "@/context/WishlistContext";

export const useFetchWishlistItems = () => {
  const [fetchedWishlistItems, setFetchedWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { getWishlist, isLoggedIn, cookieToken } = useWishlist();

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        setIsLoading(true);
        const wishlistData = await getWishlist();
        const localWishlistItems = JSON.parse(
          localStorage.getItem("wishlistItems") || "[]"
        );
        const mergedWishlistItems = [...wishlistData, ...localWishlistItems];
        const uniqueWishlistItems = mergedWishlistItems.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.productId === item.productId)
        );
        setFetchedWishlistItems(uniqueWishlistItems);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlistItems();
  }, [isLoggedIn, cookieToken, getWishlist]);

  return { fetchedWishlistItems, isLoading, error };
};
