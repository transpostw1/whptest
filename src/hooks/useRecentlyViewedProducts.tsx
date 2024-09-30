"use client";
import { useState, useEffect } from "react";
import { ProductData, ProductType } from "@/type/ProductType";

const useRecentlyViewedProducts = () => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = JSON.parse(
        localStorage.getItem("recentlyViewedProducts") || "[]"
      );
      setRecentlyViewedProducts(storedProducts);
    }
  }, []);

  const saveToRecentlyViewed = (product: ProductData | null) => {
    if (typeof window !== "undefined" && product) {
      const storedProducts = JSON.parse(
        localStorage.getItem("recentlyViewedProducts") || "[]"
      );

      // Check if the product already exists in the local storage
      const existingProduct = storedProducts.find(
        (p: ProductType) => p?.productId === product?.productDetails?.productId
      );

      if (!existingProduct) {
        // Add the product if it doesn't exist
        storedProducts.unshift(product);

        // Limit the number of products in local storage (e.g., 5 products)
        if (storedProducts.length > 5) {
          storedProducts.pop();
        }

        // Save the updated product list to local storage
        localStorage.setItem('recentlyViewedProducts', JSON.stringify(storedProducts));

        // Update the state
        setRecentlyViewedProducts(storedProducts);
      }
    }
  };

  const removeFromRecentlyViewed = (productId: string | number) => {
    const updatedProducts = recentlyViewedProducts.filter(
      (product) => product.productId !== productId
    );
    setRecentlyViewedProducts(updatedProducts);
    localStorage.setItem(
      "recentlyViewedProducts",
      JSON.stringify(updatedProducts)
    );
  };

  return {
    recentlyViewedProducts,
    saveToRecentlyViewed,
    removeFromRecentlyViewed,
  };
};

export default useRecentlyViewedProducts;
