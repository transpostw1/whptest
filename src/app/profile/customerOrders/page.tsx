"use client"
import React, { useState } from "react";
import ProfileOrders from "@/components/Profile/ProfileOrder";
const CustomerOrders = () => {
  const [orderData, setOrderData] = useState<any>([]);
  return (
    <div>
      <ProfileOrders orders={orderData} />
    </div>
  );
};

export default CustomerOrders;
