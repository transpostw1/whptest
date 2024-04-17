"use client";
import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
interface Props{
  orders:any
}
const ProfileOrders:React.FC<Props> = ({orders}) => {
  const router = useRouter();
  const { logOut, isLoggedIn } = useUser();
  const handleLogOut = () => {
    logOut();
    router.push("/");
  };

  return (
    <div className="p-[60px]">
      <div className="flex justify-between ">
        <div>
          <p className="text-2xl font-semibold">Order Details</p>
          <p className="text-sm text-[#dbd6d6]">View your orders</p>
        </div>
        <div className="flex" onClick={() => handleLogOut()}>
          <span className="mt-1">
            <Icon.SignOut />
          </span>
          <p>Logout</p>
        </div>
      </div>
      <div className="mt-10">
        {Array.isArray(orders)&&orders.map((item:any)=>(<div key={item.id} className="border border-gray-200">
          <div>
            <p>Order ID:{item.orderStatus}</p>
          </div>
        </div>))}
      </div>
    </div>
  );
};

export default ProfileOrders;
