"use client";
import React, { createContext, useContext, useState } from "react";

interface ContextType {
  currency: string;
  handleCurrencyChange: (curr: string) => void;
  convertValue: (amount: number, toCurrency?: string) => number;
  formatPrice: (amount: number) => string; // New function to format price
}

const exchangeRates: any = {
  USD: 0.012,
  INR: 1,
  EUR: 0.011,
};

export const CurrencyContext = createContext<ContextType | undefined>(
  undefined,
);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<string>("INR");

  // Handle currency change
  const handleCurrencyChange = (curr: string) => {
    console.log("Currency changed to", curr);
    setCurrency(curr);
  };

  // Convert value based on currency
  const convertValue = (amount: number, toCurrency?: string): number => {
    if (toCurrency == "USD") {
      return amount * 0.012;
    } else {
      return amount * 0.011;
    }
  };

  // Format price based on currency
  const formatPrice = (amount: number): string => {
    let formattedPrice;
    switch (currency) {
      case "INR":
        formattedPrice = (Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount))
        break;
      case "USD":
        formattedPrice = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(convertValue(amount, "USD"));
        break;
      case "EUR":
        formattedPrice = Intl.NumberFormat("en-IE", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(convertValue(amount, "EUR"));
        break;
      default:
        formattedPrice = "Price not available";
    }
    return formattedPrice;
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, handleCurrencyChange, convertValue, formatPrice }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

// Hook to use Currency Context
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("Error Occurred in Currency Context");
  }
  return context;
};
