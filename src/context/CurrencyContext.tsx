"use client";
import React, { createContext, useContext, useState } from "react";

interface ContextType {
  currency: string;
  handleCurrencyChange: (curr: string) => void;
}

export const CurrencyContext = createContext<ContextType | undefined>(
  undefined,
);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<string>("INR");
  const handleCurrencyChange = (curr: string) => {
    console.log("Currrrency",curr);
    setCurrency(curr);
  };

  return (
    <CurrencyContext.Provider value={{ currency, handleCurrencyChange }}>
      {children}
    </CurrencyContext.Provider>
  );
};
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context == undefined) {
    throw new Error("Error Occurred in Currency Context");
  }
  return context;
};
