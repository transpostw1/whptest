"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
type SetCategoryType = (category: string | any) => void;
type SetCategoryType2 = (newState: string | any) => void;

interface ContextType {
  setCustomcategory: SetCategoryType2;
  category: string | any;
}

const CategoryContext = createContext<ContextType | undefined>(undefined);

export const useCategory = (): ContextType => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useSetState must be used within a SetStateProvider");
  }
  return context;
};

type CategoryProviderProps = {
  children: ReactNode;
};

export const CategoryProvider: React.FC<CategoryProviderProps> = ({
  children,
}) => {
  const [category, setCategory] = useState<string | any>("");

  const setCustomcategory: SetCategoryType = (newState) => {
    if (typeof window != "undefined") {
      localStorage.setItem("category", newState);
    }
    setCategory(newState);
  };

  const value: ContextType = {
    setCustomcategory,
    category,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
