"use client";
import React, { useEffect, useState } from "react";
import ProfileSidebar from "@/components/Profile/ProfileSideBar";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import ProfileOrders from "@/components/Profile/ProfileOrder";
import ProfileGMS from "@/components/Profile/ProfileGMS";
import StickyNav from "@/components/Header/StickyNav";
import MobileProfileSideBar from "@/components/Profile/MobileProfileSideBar";
import MobilePersonalInformation from "@/components/Profile/MobilePersonalInformation";
import MobileOrders from "@/components/Profile/MobileOrders";
import axios from "axios";
import Cookie from "js-cookie";
import { baseUrl, getOrders } from "@/utils/constants";
import MobileGms from "@/components/Profile/MobileGms";

interface OrdersResponse {
  customerOrders: any;
  data: any;
}
const ProfilePage = () => {
  const [componentToRender, setComponentToRender] =
    useState<string>("personalInfo");
    const [component, setComponent] =
    useState<string>("");
  const [ordersData, setOrdersData] = useState<any>();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const handleComponentToRender = (component: string) => {
    setComponentToRender(component);
  };
  const handleComponent=(component:string)=>{
    setComponent(component)
  }
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
      <div>
        <StickyNav/>
        {component === "" && (
          <MobileProfileSideBar
            handleComponent={handleComponent}
            componentName={component}
            handleOrder={handleOrders}
          />
        )}
        {component === "personalInfo" && <MobilePersonalInformation handleComponent={handleComponent}/>}
        {component==="orders"&&<MobileOrders orders={ordersData}/>}
        {component==="gms"&&<MobileGms handleComponent={handleComponent}/>}
      </div>
    );
  }
  return (
    <>
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
          {componentToRender === "gms" && <ProfileGMS />}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
