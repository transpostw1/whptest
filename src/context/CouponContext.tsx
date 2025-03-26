"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useUser } from "@/context/UserContext";
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
  isExclusive: boolean;
}

interface CouponContextProps {
  totalDiscount: number;
  updateDiscount: (discount: number) => void;
  coupons: Coupon[];
  fetchCoupons: () => void;
}

const CouponContext = createContext<CouponContextProps | undefined>(undefined);

const GET_COUPONS = gql`
  mutation CheckCustomerCoupons($token: String!) {
    checkCustomerCoupons(token: $token) {
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
      isExclusive
    }
  }
`;

export const CouponCodeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [resetDiscount, setResetDiscount] = useState<boolean>(false);
  const [cookieToken, setCookieToken] = useState<string>("");
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const { isLoggedIn } = useUser();

  useEffect(() => {
    if (isLoggedIn && typeof window !== "undefined") {
      const userToken = localStorage.getItem("localtoken");
      if (userToken) {
        setCookieToken(userToken);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchCoupons();
  }, [isLoggedIn]);

  const updateDiscount = (discount: number) => {
    setTotalDiscount(discount);
  };

  const fetchCoupons = async () => {
    try {
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });
      let currentToken;
      if (isLoggedIn && typeof window !== "undefined") {
        const storedToken = localStorage.getItem("localtoken");
        currentToken = String(storedToken);
      }

      const { data } = await client.mutate({
        mutation: GET_COUPONS,
        variables: {
          token: currentToken,
        },
      });

      const fetchedCoupons = data.checkCustomerCoupons;
      setCoupons(fetchedCoupons);
      console.log("fetched couponszzzzzz", fetchedCoupons);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

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
