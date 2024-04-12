"use client"
import React, { createContext, useContext, useState } from "react";

interface CouponContextProps {
    totalDiscount: number;
    setTotalDiscount: React.Dispatch<React.SetStateAction<any>>;
}

// Correcting the typo here: "CounponContext" -> "CouponContext"
const CouponContext = createContext<CouponContextProps | undefined>(undefined);

export const CouponCodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [totalDiscount, setTotalDiscount] = useState<number>(0);

    return (
        <CouponContext.Provider value={{ totalDiscount, setTotalDiscount }}>{children}</CouponContext.Provider>
    );
}

export const useCouponContext = () => {
    const context = useContext(CouponContext);
    if (context===undefined) {
      throw new Error("useCouponContext must be used within a CouponProvider");
    }
    return context;
};
