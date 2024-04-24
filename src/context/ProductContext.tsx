"use client";

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
  fetchData: () => Promise<void>;
  
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  fetchData: async () => {},
});

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchData = async () => {
    try {
      const response = await instance.get(getProducts);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, fetchData }}>
      {children}
    </ProductContext.Provider>
  );
};
