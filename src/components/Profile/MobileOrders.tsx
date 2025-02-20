"use client";
import React, { useEffect, useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import ReactLoading from "react-loading";
import { useRouter } from "next/navigation";
import axios from "axios";
import FlashAlert from "../Other/FlashAlert";
import Cookie from "js-cookie";
import { baseUrl } from "@/utils/constants";
import { useCurrency } from "@/context/CurrencyContext";
import MobileSingleOrderDetails from "./MobileSingleOrderDetails";
interface Props {
  orders: any;
}
const ProfileOrders: React.FC<Props> = ({ orders }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<any>();
  const { logOut, isLoggedIn } = useUser();
  const { formatPrice } = useCurrency();
  const [singleOrder, setSingleOrder] = useState<any>();

  const handleLogOut = () => {
    logOut();
    router.push("/");
  };
  // useEffect(() => setSingleOrder(orders), [orders]);

  const handleOrderDetails = (id: any) => {
    setSingleOrder(() => {
      const matchingOrder = orders.find((order: any) => order.id === id);
      return matchingOrder ? [matchingOrder] : [];
    });
  };
  const handleOrderCancel = async (id: any) => {
    try {
      setLoading(true);
      const cookieToken =
        typeof window !== "undefined"
          ? localStorage.getItem("localtoken")
          : null;
      const response = await axios.post(
        `${baseUrl}/${id}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${cookieToken}` },
        },
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleBackButton = (args: string) => {
    router.push("/profile");
  };
  const handleBack = () => {
    setSingleOrder(null);
  };

  if (!orders)
    return (
      <div className="loading-container flex h-full items-center justify-center">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50}  />
      </div>
    );
  return (
    <div className="p-[30px]">
      <div className="flex justify-between">
        <div className="flex">
          {singleOrder != null && (
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
            {singleOrder == null && (
              <p onClick={() => handleBackButton("")}>
                <Icon.ArrowLeft size={25} />
              </p>
            )}
            <p className="text-2xl font-semibold">Order Details</p>
            <p className="text-sm text-[#dbd6d6]">View your orders</p>
          </div>
        </div>
        <div className="flex" onClick={() => handleLogOut()}>
          <span className="mt-1">
            <Icon.SignOut />
          </span>
          <p>Logout</p>
        </div>
      </div>
      {singleOrder == null && (
        <div className="mt-10">
          {Array.isArray(orders) &&
            orders.map((item: any) => (
              <div
                key={item.id}
                className="mb-4 cursor-pointer border border-b-0 border-gray-200"
                onClick={() => handleOrderDetails(item.id)}
              >
                <div className="flex flex-wrap p-2">
                  <p><span className="font-semibold">Order ID:</span>{" "}{item.orderNo}</p>
                  <p className="">
                  <span className="font-semibold">Order Date:</span>{" "}
                    {new Date(item.created_at).toISOString().split("T")[0]}
                  </p>
                </div>
                <div className="p-2 font-bold text-green-600">
                  {item?.orderStatus}
                </div>

                {item.productDetails.map((product: any, index: any) => (
                  <div className="flex w-full border-b py-2" key={index}>
                    <div className="mr-3 flex items-center">
                      <Image
                        src={product?.imageDetails[0]?.image_path}
                        alt={"image"}
                        width={95}
                        height={95}
                        className="bg-[#f7f7f7]"
                        unoptimized
                      />
                    </div>

                    <div className="w-full">
                      <p className="text-xl font-semibold">
                        {product?.displayTitle}
                      </p>
                      <p>
                        {product?.SKU}-{product?.metalType}-
                        {product?.metalWeight}
                      </p>
                      <p>Quantity:{product.quantity}</p>
                      <div className="font-semibold">
                        {formatPrice(product?.discountedTotal)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}

      {singleOrder != null && (
        <MobileSingleOrderDetails singleOrder={singleOrder} />
      )}
    </div>
  );
};

export default ProfileOrders;
