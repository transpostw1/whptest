"use client"
import React, { createContext, useContext, useState ,useEffect} from "react";
interface CouponContextProps {
    totalDiscount: number|any;
    setTotalDiscount: React.Dispatch<React.SetStateAction<number>>;
}

const CouponContext = createContext<CouponContextProps | undefined>(undefined);

export const CouponCodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [totalDiscount, setTotalDiscount] = useState<number>(0);
    // const updateTotalDiscount=()=>{
    //     console.log("function is in effect")
    //     setTotalDiscount(prevTotalDiscount => {
    //         console.log("Previous total discount:", prevTotalDiscount);
    //         return 0; 
    //     });
    // }

    useEffect(() => {
        console.log("Updated total discount:", totalDiscount);
    }, [totalDiscount]);
    return (
        <CouponContext.Provider value={{ totalDiscount, setTotalDiscount }}>{children}</CouponContext.Provider>
    );
}

export const useCouponContext = () => {
    const context = useContext(CouponContext);
    if (context === undefined) {
        throw new Error("useCouponContext must be used within a CouponCodeProvider");
    }
    return context;
};