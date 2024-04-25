"use client";
import React, { useEffect, useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Props {
  orders: any;
}
const ProfileOrders: React.FC<Props> = ({ orders }) => {
  const router = useRouter();
  const [imageDetail, setImageDetail] = useState<any>();
  const { logOut, isLoggedIn } = useUser();
  const handleLogOut = () => {
    logOut();
    router.push("/");
  };
  // useEffect(() => {
  //   if (orders.productDetails) {
  //     const imageDetails: any = JSON.parse(orders.productDetails.imageDetails);
  //     imageDetails.sort((a: any, b: any) => a.order - b.order);
  //     setImageDetail(imageDetails);
  //   }
  // }, [orders]);

  if (!orders) return <div>Loading....</div>;
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
        {Array.isArray(orders) &&
          orders.map((item: any) => (
            <div key={item.id} className="border border-gray-200  border-b-0 mb-4">
              <div className="flex p-2 border-b-2 justify-between">
                <div className="flex">
                  <p>Order ID:{item.orderNo}</p>
                  <p className="ml-3">Order Date-14/02/2024</p>
                </div>
                <div className="text-green-600 font-bold">
                  {item.orderStatus}
                </div>
              </div>
              {item.productDetails.map((items: any, index: any) => (
                <div
                  key={index}
                  className="flex justify-between border-b-2 p-4"
                >
                  <div className="flex">
                    <div>
                      {Array.isArray(items.imageDetails) &&
                        items.imageDetails.map(
                          (image: any, index: any) => (
                            <div key={index}>
                              <Image
                                src={image.image_path}
                                alt={image.alt}
                                width={25}
                                height={25}
                              />
                            </div>
                          )
                        )}
                    </div>
                    <div>
                      <p className="text-xl font-semibold">
                        {items.productDetails.displayTitle}
                      </p>
                      <p>
                        {items.productDetails.metalType}-
                        {items.productDetails.metalWeight}
                      </p>
                      <p>Quantity:{items.quantity}</p>
                    </div>
                  </div>
                  <div>₹{parseInt(items.discountedTotal)}</div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileOrders;
