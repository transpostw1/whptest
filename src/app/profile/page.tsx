"use client";
import React, { useEffect, useState } from "react";
import StickyNav from "@/components/Header/StickyNav";
import ProfileSidebar from "@/components/Profile/ProfileSideBar";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import ProfileOrders from "@/components/Profile/ProfileOrder";
import ProfileWishList from "@/components/Profile/ProfileWishList";
import ProfileGMS from "@/components/Profile/ProfileGMS";
import MobileProfileSideBar from "@/components/Profile/MobileProfileSideBar";
import MobilePersonalInformation from "@/components/Profile/MobilePersonalInformation";
import MobileWishList from "@/components/Profile/MobileWishList";
import MobileOrders from "@/components/Profile/MobileOrders";
import MobileGms from "@/components/Profile/MobileGms";
import axios from "axios";
import Cookie from "js-cookie";
import { baseUrl, getOrders } from "@/utils/constants";
import { useUser } from "@/context/UserContext";
import ProtectedRoute from "../ProtectedRoute";

interface OrdersResponse {
  customerOrders: any;
  data: any;
}
const ProfilePage = () => {
  const [componentToRender, setComponentToRender] =
    useState<string>("personalInfo");
  const [component, setComponent] = useState<string>("");
  const [ordersData, setOrdersData] = useState<any>();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const handleComponentToRender = (component: string) => {
    setComponentToRender(component);
  };
  const handleComponent = (component: string) => {
    setComponent(component);
  };
  const {  isLoggedIn, getUser } = useUser();

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
  const handleOrders = async () => {
    try {
      const cookieToken = Cookie.get("localtoken");
      const response = await axios.get<OrdersResponse>(
        `${baseUrl}${getOrders}`,
        {
          headers: { Authorization: `Bearer ${cookieToken}` },
        }
      );
      setOrdersData(response.data.customerOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  if (isMobile) {
    return (
      <ProtectedRoute>
        <div>
          <StickyNav />
          {component === "" && (
            <MobileProfileSideBar
              handleComponent={handleComponent}
              componentName={component}
              handleOrder={handleOrders}
            />
          )}
          {component === "personalInfo" && (
            <MobilePersonalInformation handleComponent={handleComponent} />
          )}
          {component === "orders" && (
            <MobileOrders
              orders={ordersData}
              handleComponent={handleComponent}
            />
          )}
          {component === "wishlist" && (
            <MobileWishList
              handleComponent={handleComponent}
            />
          )}
          {component === "gms" && (
            <MobileGms handleComponent={handleComponent} />
          )}
        </div>
      </ProtectedRoute>
    );
  }
  return (
    <>
      <ProtectedRoute>
        <div className="flex">
          <div className="lg:w-96 md:w-56">
            <ProfileSidebar
              handleComponent={handleComponentToRender}
              componentName={componentToRender}
              handleOrder={handleOrders}
            />
          </div>
          <div className="w-screen ">
            {componentToRender === "personalInfo" && <ProfileDetails />}
            {componentToRender === "orders" && (
              <ProfileOrders orders={ordersData} />
            )}
            {componentToRender === "wishlist" && <ProfileWishList />}
            {componentToRender === "gms" && <ProfileGMS />}
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default ProfilePage;
