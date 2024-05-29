"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { baseUrl, category } from "@/utils/constants";

interface Category {
  id: number;
  name: string;
  url: string;
  menuImg: string;
  parentImg: string;
  parent_id: number | null;
}

interface CategoryContextType {
  categories: Category[];
}

const AllCategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

const AllCategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(`${baseUrl}${category}`); // Adjust the URL to your API endpoint
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <AllCategoryContext.Provider value={{ categories }}>
      {children}
    </AllCategoryContext.Provider>
  );
};

const useAllCategoryContext = () => {
  const context = useContext(AllCategoryContext);
  if (context === undefined) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};

export { AllCategoryProvider, useAllCategoryContext };
