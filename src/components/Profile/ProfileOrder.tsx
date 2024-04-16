"use client";
import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
const ProfileOrders = () => {
  return (
    <>
      <div className="flex justify-between p-[60px]">
        <div>
          <p className="text-2xl font-semibold">Order Details</p>
          <p className="text-sm text-[#dbd6d6]">View your orders</p>
        </div>
        <div className="flex">
          <span className="mt-1">
            <Icon.SignOut />
          </span>
          <p>Logout</p>
        </div>
      </div>
    </>
  );
};

export default ProfileOrders;
