"use client"


import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { getProducts } from "@/utils/constants";
import instance from "@/utils/axios";

interface ProductType {
  title: any;
  // Define the properties of your product
}

interface ProductContextType {
  products: ProductType[];
  fetchData: () => Promise<void>; // Corrected function signature
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  fetchData: async () => {}, // Corrected function signature
});

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  // Define fetchData function outside useEffect
  const fetchData = async () => {
    console.log("innn")
    try {
      const response = await instance.get(getProducts);
      setProducts(response.data);
      console.log(response.data, "sdfsfdsf apiii");
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

// /
  return (
    <ProductContext.Provider value={{ products, fetchData }}>
      {children}
    </ProductContext.Provider>
  );
};
