"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";

interface Coupon {
  id: string;
  name: string;
  code: string;
  discountOn: string;
  discountType: string;
  discountValue: number;
  discountMinAmount: number;
  discountMaxAmount: number;
  discountStartDate: string;
  discountEndDate: string;
}

interface CouponContextProps {
  totalDiscount: number;
  updateDiscount: (discount: number) => void;
  coupons: Coupon[];
  fetchCoupons: () => void;
}


const CouponContext = createContext<CouponContextProps | undefined>(undefined);

const GET_COUPONS = gql`
query GetAllCoupons {
  getAllCoupons {
    id
    name
    code
    discountOn
    discountType
    discountValue
    discountMinAmount
    discountMaxAmount
    discountStartDate
    discountEndDate
  }
}
`;

export const CouponCodeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [resetDiscount, setResetDiscount] = useState<boolean>(false);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const updateDiscount = (discount: number) => {
    setTotalDiscount((prevTotalDiscount) => discount);
  };

  const fetchCoupons = async () => {
    try {
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });

      const { data } = await client.query({
        query: GET_COUPONS,
      });
      const fetchedCoupons = data.getAllCoupons;
      setCoupons(fetchedCoupons);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  useEffect(() => {
    if (resetDiscount) {
      setTotalDiscount(0);
      setResetDiscount(false); 
    }
  }, [resetDiscount]);

  return (
    <CouponContext.Provider
      value={{ totalDiscount, updateDiscount, coupons, fetchCoupons }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (context === undefined) {
    throw new Error(
      "useCouponContext must be used within a CouponCodeProvider",
    );
  }
  return context;
};
