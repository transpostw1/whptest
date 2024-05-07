"use client"
import React, { createContext, useContext, useState ,useEffect} from "react";
interface CouponContextProps {
    totalDiscount: number|any;
    updateTotalDiscount:(discount:any)=>void;
    // setTotalDiscount: React.Dispatch<React.SetStateAction<number>>;
}

const CouponContext = createContext<CouponContextProps | undefined>(undefined);

export const CouponCodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [totalDiscount, setTotalDiscount] = useState<number>(0);
    const updateTotalDiscount=(discount:any)=>{
     console.log("dcisc:",discount);
     setTotalDiscount(discount);
    }

    useEffect(() => {
        console.log("Updated total discount:", totalDiscount);
    }, [totalDiscount]);
    return (
        <CouponContext.Provider value={{ totalDiscount, updateTotalDiscount }}>{children}</CouponContext.Provider>
    );
}

export const useCouponContext = () => {
    const context = useContext(CouponContext);
    if (context === undefined) {
        throw new Error("useCouponContext must be used within a CouponCodeProvider");
    }
    return context;
};