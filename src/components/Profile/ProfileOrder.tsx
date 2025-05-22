"use client";
import React, { useEffect, useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SingleOrderDetails from "./SingleOrderDetails";
import Link from "next/link";
import { motion } from "framer-motion";
import { baseUrl } from "@/utils/constants";
import { IoLogoWhatsapp } from "react-icons/io";
import { useCurrency } from "@/context/CurrencyContext";
interface Props {
  orders: any;
}
const ProfileOrders: React.FC<Props> = ({ orders }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<any>();
  const { logOut, isLoggedIn } = useUser();
  const [singleOrder, setSingleOrder] = useState<any>([]);
  const { formatPrice } = useCurrency();
  const handleLogOut = () => {
    logOut();
    router.push("/");
  };

  const handleOrderDetails = (id: any) => {
    setSingleOrder(() => {
      const matchingOrder = orders.find((order: any) => order.id === id);
      return matchingOrder ? [matchingOrder] : [];
    });
  };

  const handleBack = () => {
    setSingleOrder(orders);
  };
  useEffect(() => {
    setSingleOrder(orders);
  }, [orders]);

  // console.log(orders);

  if (!orders)
    return (
      <div className="loading-container flex h-full items-center justify-center">
        <Image
          src="/dummy/loader.gif"
          alt={"loader"}
          height={50}
          width={50}
          unoptimized
        />
      </div>
    );
  return (
    <div className="p-[60px] md:p-[40px]">
      <div className="flex justify-between">
        <div className="flex">
          {Array.isArray(singleOrder) && singleOrder.length == 1 && (
            <div
              className="mr-2 mt-3 cursor-pointer"
              onClick={() => handleBack()}
            >
              <p>
                <Icon.ArrowLeft size={25} />
              </p>
            </div>
          )}
          <div>
            <p className="text-2xl font-semibold">Order Details</p>
            <p className="text-sm text-[#dbd6d6d4]">View your orders</p>
          </div>
        </div>
        <div className="flex" onClick={() => handleLogOut()}>
          <span className="mt-1">
            <Icon.SignOut />
          </span>
          <p>Logout</p>
        </div>
      </div>     
        {orders.length>0&&singleOrder.length>=1&&<div className="mt-10">
          {Array.isArray(orders) &&
            orders.map((item: any) => (
              <div
                key={item.id}
                className="mb-4 cursor-pointer rounded-lg border border-gray-200 shadow hover:scale-[1.02] hover:border-[#E26178] hover:bg-[#E26178] hover:bg-opacity-5"
                onClick={() => handleOrderDetails(item.id)}
              >
                <div className="flex justify-between border-b-2 p-4">
                  <div className="flex">
                    <p>Order ID:{item.orderNo}</p>
                    <p className="ml-2 mt-2 h-2 w-2 rounded-full bg-[#e26178] text-transparent">
                      1
                    </p>
                    <p className="ml-2">
                      Order Date -{" "}
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="font-bold text-green-600">
                    {item?.orderStatus}
                  </div>
                </div>
                {item.productDetails.map((product: any, index: any) => (
                  <div className="flex justify-between p-4" key={index}>
                    <div className="flex">
                      <div className="mr-3">
                        <Image
                          src={product?.imageDetails[0]?.image_path}
                          alt={"image"}
                          width={85}
                          height={85}
                          className="bg-[#f7f7f7]"
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="text-xl font-semibold">
                          {product?.displayTitle}
                        </p>
                        <p>
                          {product?.SKU}-{product?.metalType}-
                          {product?.metalWeight}
                        </p>
                        {product?.variants && product?.variants.length > 0 && (
                          <div>
                            {product.variants.map(
                              (variant: any, index: number) =>
                                variant.VariantType &&
                                variant.VariantOption &&
                                variant.VariantOption.length > 0 && (
                                  <h3
                                    key={index}
                                    className="text-sm font-normal"
                                  >
                                    {variant.VariantType}:{" "}
                                    {variant.VariantOption[0].VariantName}
                                  </h3>
                                ),
                            )}
                          </div>
                        )}

                        <p>Quantity:{product?.quantity}</p>
                      </div>
                    </div>
                    <div className="font-semibold">
                      {formatPrice(product?.discountedTotal)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>}
      
      {Array.isArray(singleOrder) && singleOrder.length == 1 && (
        <SingleOrderDetails singleOrder={singleOrder} />
      )}
    </div>
  );
};

export default ProfileOrders;
