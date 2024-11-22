"use client";
import React, { useState, useEffect } from "react";
import ProtectedRoute from "@/app/ProtectedRoute";
import ProfileSidebar from "@/components/Profile/ProfileSideBar";
import ProfileWishList from "@/components/Profile/ProfileWishList";
import MobileWishList from "@/components/Profile/MobileWishList";
import StickyNav from "@/components/Header/StickyNav";


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
          <MobileWishList handleComponent={function (args: string): void {
            throw new Error("Function not implemented.");
          } } />
        </div>
      </ProtectedRoute>
    );
  }
  return (
    <ProtectedRoute>
      <div className="flex">
        <div>
          <ProfileSidebar />
        </div>
        <div className="w-screen">
          <ProfileWishList />
        </div>
      </div>
    </ProtectedRoute>
  );
};
export default CustomerWishList;
