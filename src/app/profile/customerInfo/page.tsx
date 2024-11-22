"use client";
import React, { useState, useEffect } from "react";
import ProtectedRoute from "@/app/ProtectedRoute";
import StickyNav from "@/components/Header/StickyNav";
import MobilePersonalInformation from "@/components/Profile/MobilePersonalInformation";

const CustomerWishList = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 540px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  if (isMobile) {
    return (
      <ProtectedRoute>
        <div>
          <StickyNav />
          <MobilePersonalInformation />
        </div>
      </ProtectedRoute>
    );
  }
};
export default CustomerWishList;
