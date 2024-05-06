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
interface Props {
  orders: any;
}
const ProfileOrders: React.FC<Props> = ({ orders }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<any>();
  const [id, setId] = useState<any>();
  const { logOut, isLoggedIn } = useUser();
  const [singleOrder, setSingleOrder] = useState<any>();
  const handleLogOut = () => {
    logOut();
    router.push("/");
  };
  useEffect(() => setSingleOrder(orders), [orders]);

  const handleOrderDetails = (id: any) => {
    setId(id);
    setSingleOrder((prevOrders: any) => {
      const matchingOrder = prevOrders.find((order: any) => order.id === id);
      return matchingOrder ? [matchingOrder] : [];
    });
  };
  const handleOrderCancel = async (id: any) => {
    try {
      setLoading(true);
      const cookieToken = Cookie.get("localtoken");
      console.log("localtoken", cookieToken);
      const response = await axios.post(
        `${baseUrl}/${id}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${cookieToken}` },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("single Order", singleOrder);
  console.log("single Order", id);
  console.log("message", message);

  const handleBack = () => {
    setId(null);
  };
  if (!orders)
    return (
      <div className="loading-container flex justify-center items-center h-full">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
    );
  return (
    <div className="p-[60px]">
      <div className="flex justify-between ">
        <div className="flex">
          {id && (
            <div
              className="mt-3 mr-2 cursor-pointer"
              onClick={() => handleBack()}
            >
              <p>
                <Icon.ArrowLeft size={25} />
              </p>
            </div>
          )}
          <div>
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
      {!id && (
        <div className="mt-10">
          {Array.isArray(orders) &&
            orders.map((item: any) => (
              <div
                key={item.id}
                className="border border-gray-200  border-b-0 mb-4 cursor-pointer"
                onClick={() => handleOrderDetails(item.id)}
              >
                <div className="flex p-2 border-b-2 justify-between">
                  <div className="flex">
                    <p>Order ID:{item.orderNo}</p>
                    <p className="ml-3">
                      Order Date -{" "}
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-green-600 font-bold">
                    {item.order_list.name}
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
                          items.imageDetails.map((image: any, index: any) => (
                            <div key={index}>
                              <Image
                                src={image.image_path[0]}
                                alt={image.alt}
                                width={25}
                                height={25}
                              />
                            </div>
                          ))}
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
                    <div className="font-semibold">
                      ₹
                      {Intl.NumberFormat("en-IN", {
                        minimumFractionDigits: 2,
                      }).format(Math.round(parseInt(items.discountedTotal)))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}

      {id && (
        <div>
          {singleOrder[0]?.productDetails.map((items: any, index: any) => (
            <div key={index} className="flex justify-between border-b-2 p-4">
              <div className="flex">
                <div>
                  {Array.isArray(items.imageDetails) &&
                    items.imageDetails.map((image: any, index: any) => (
                      <div key={index}>
                        <Image
                          src={image.image_path[0]}
                          alt={image.alt}
                          width={25}
                          height={25}
                        />
                      </div>
                    ))}
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
              <div className="font-semibold">
                ₹
                {Intl.NumberFormat("en-IN", {
                  minimumFractionDigits: 2,
                }).format(Math.round(parseInt(items.discountedTotal)))}
              </div>
              {items.isReturnable && <button>Return Here</button>}
            </div>
          ))}
          <p className="mt-3">
            Billing Address:{singleOrder[0].billingAddressId[0].full_address},
            {singleOrder[0].billingAddressId[0].landmark},{" "}
            {singleOrder[0].billingAddressId[0].pincode},
            {singleOrder[0].billingAddressId[0].city}
          </p>
          <p className="mt-3">
            Shippin Address:{singleOrder[0].shippingAddressId[0].full_address},
            {singleOrder[0].shippingAddressId[0].landmardk},
            {singleOrder[0].shippingAddressId[0].pincode},
            {singleOrder[0].shippingAddressId[0].city}
          </p>
          {singleOrder[0].orderStatus === "4" ||
          singleOrder[0].orderStatus === "5" ? null : (
            <div onClick={() => handleOrderCancel(singleOrder[0].id)}>
              <button className="bg-[#e26178] text-white px-3 py-2 rounded-sm">
                Order Cancel
              </button>
            </div>
          )}
          {message && <FlashAlert message={message} type={"success"} />}
        </div>
      )}
    </div>
  );
};

export default ProfileOrders;
