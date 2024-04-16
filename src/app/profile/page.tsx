"use client";
import React, { useState } from "react";

import ProfileSidebar from "@/components/Profile/ProfileSideBar";

import ProfileOrders from "@/components/Profile/ProfileOrder";
import ProfileDetails from "@/components/Profile/ProfileDetails";

const ProfilePage = () => {
  const [componentToRender, setComponentToRender] =
    useState<string>("personalInfo");
  const handleComponentToRender = (component: string) => {
    setComponentToRender(component);
  };
  return (
    <div className="flex">
      <div className="lg:w-96 md:w-56">
        <ProfileSidebar handleComponent={handleComponentToRender} componentName={componentToRender}/>
      </div>
      <div className="w-screen ">
        {componentToRender === "personalInfo" && <ProfileDetails />}
        {componentToRender === "orders" && <ProfileOrders />}
      </div>
    </div>
  );
};

export default ProfilePage;
