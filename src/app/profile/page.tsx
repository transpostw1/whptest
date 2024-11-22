"use client";
import React, { useEffect, useState } from "react";
import StickyNav from "@/components/Header/StickyNav";
import ProfileSidebar from "@/components/Profile/ProfileSideBar";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import MobileProfileSideBar from "@/components/Profile/MobileProfileSideBar";
import { useUser } from "@/context/UserContext";
import ProtectedRoute from "../ProtectedRoute";

const ProfilePage = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { isLoggedIn, getUser } = useUser();

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
  
  useEffect(() => {
    if (isLoggedIn) {
      getUser();
    }
  }, []);

  if (isMobile) {
    return (
      <ProtectedRoute>
        <div>
          <StickyNav />
          <MobileProfileSideBar />
        </div>
      </ProtectedRoute>
    );
  }
  return (
    <>
      <ProtectedRoute>
        <div className="flex">
          <div className="md:w-56 lg:w-96">
            <ProfileSidebar />
          </div>
          <div className="w-screen">
            <ProfileDetails />
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default ProfilePage;