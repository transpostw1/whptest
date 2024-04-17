"use client";
import React, { useEffect, useState } from "react";

import ProfileSidebar from "@/components/Profile/ProfileSideBar";
import ProfileOrders from "@/components/Profile/ProfileOrder";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import StickyNav from "@/components/Header/StickyNav";
import axios from "axios";
import Cookie from "js-cookie";
import { baseUrl, getOrders } from "@/utils/constants";

interface OrdersResponse {
  customerOrders: any;
  data: any;
}
const ProfilePage = () => {
  const [componentToRender, setComponentToRender] =useState<string>("personalInfo");
  const [ordersData, setOrdersData] = useState<any>();
  const [imageDetail,setImageDetail]=useState<any>()

  const handleComponentToRender = (component: string) => {
    setComponentToRender(component);
  };

  const handleOrders = async () => {
    try {
      const cookieToken = Cookie.get("localtoken");
      const response = await axios.get<OrdersResponse>(`${baseUrl}${getOrders}`, {
        headers: { Authorization: `Bearer ${cookieToken}` },
      });
      setOrdersData(response.data.customerOrders);
      if (response.data.customerOrders.productDetails) {
        const imageDetails: any = JSON.parse(response.data.customerOrders.productDetails.imageDetails);
        // imageDetails.sort((a: any, b: any) => a.order - b.order);
        setImageDetail(imageDetails);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <>
      <StickyNav />
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
          {componentToRender === "orders" && <ProfileOrders orders={ordersData} imageDetailed={imageDetail}/>}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
