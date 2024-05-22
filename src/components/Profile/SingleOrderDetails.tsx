"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import FlashAlert from "../Other/FlashAlert";
import Cookie from "js-cookie";
import { baseUrl } from "@/utils/constants";

interface Props {
  singleOrder: any;
}

const SingleOrderDetails: React.FC<Props> = ({ singleOrder }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<any>();

  const handleOrderCancel = async (id: any) => {
    try {
      setLoading(true);
      const cookieToken = Cookie.get("localtoken");
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
  return (
    <div>
      <div className="flex justify-between mb-3">
        <div>
          <p>
            Order No.:{" "}
            <span className="font-bold text-lg">{singleOrder[0].orderNo}</span>
          </p>
        </div>
        <div className="flex">
          <p className="mr-1">Tracking Status:</p>
          <p className="text-green-600 font-bold text-lg">
            {singleOrder[0]?.order_list.name}
          </p>
        </div>
      </div>
      {singleOrder[0]?.productDetails.map((items: any, index: any) => (
        <div
          key={index}
          className="flex justify-between p-4 border border-black"
        >
          {items.productDetails.map((product: any, index: any) => (
            <div className="flex" key={index}>
              <div className="mr-3">
                <Image
                  src={product?.imageDetails[0].image_path}
                  alt={"image"}
                  width={85}
                  height={85}
                />
              </div>
              <div>
                <p className="text-xl font-semibold">{product?.displayTitle}</p>
                <p>
                  {product?.metalType}-{product?.metalWeight}
                </p>
              </div>
            </div>
          ))}
          <p>
            <div className="font-semibold">
              ₹
              {Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
              }).format(Math.round(parseInt(items?.discountedTotal)))}
            </div>
          </p>
          <p>{items?.quantity}</p>

          <div className="font-semibold">
            ₹
            {Intl.NumberFormat("en-IN", {
              minimumFractionDigits: 2,
            }).format(
              Math.round(
                parseInt(items?.discountedTotal) * parseInt(items?.quantity)
              )
            )}
          </div>
          {items?.isReturnable && <button>Return Here</button>}
        </div>
      ))}
      <div className="flex justify-end border-black border border-b-0 border-t-0 pr-14">
        Discount Amount:{singleOrder[0]?.productDetails[0]?.discountAmount}
      </div>
      <div className="flex justify-end border-black border border-b-0 border-t-0 pr-14">
        Shipping Charges:{singleOrder[0]?.productDetails[0]?.discountAmount}
      </div>
      <div className="flex justify-end border-black border">
        Total Amount:
        <span className="font-semibold text-md">
          ₹
          {Intl.NumberFormat("en-IN", {
            minimumFractionDigits: 2,
          }).format(Math.round(singleOrder[0]?.productTotal))}
        </span>
      </div>
      <div className="flex">
        <div className="border border-black w-[33%] mb-2 mt-4 ">
          <p className=" border-black border-b p-2 font-semibold">
            Billing Address
          </p>
          <p className="w-full border-black border-b p-2">
            {singleOrder[0]?.billingAddressId[0]?.full_address},
            {singleOrder[0]?.billingAddressId[0]?.landmark},
            {singleOrder[0]?.billingAddressId[0]?.pincode},
            {singleOrder[0]?.billingAddressId[0]?.state},
            {singleOrder[0]?.billingAddressId[0]?.city}
            <p>
              Address Type:{singleOrder[0]?.billingAddressId[0]?.address_type}
            </p>
          </p>
          <p className="border-black border-b p-2 font-semibold">
            Shipping Address
          </p>
          <p className="p-2">
            {singleOrder[0]?.shippingAddressId[0].full_address},
            {singleOrder[0]?.shippingAddressId[0]?.landmark},
            {singleOrder[0]?.shippingAddressId[0]?.pincode},
            {singleOrder[0]?.shippingAddressId[0]?.state},
            {singleOrder[0]?.shippingAddressId[0]?.city}
            <p>
              Address Type:{singleOrder[0]?.shippingAddressId[0]?.address_type}
            </p>
          </p>
        </div>
        <div className="border border-black w-[33%] mb-2 mt-4 ml-2">
          <p className=" border-black border-b font-semibold p-2 mb-2">
            Payment Details
          </p>
          <p className="px-2">Order Date:{singleOrder[0]?.payments[0]?.date}</p>
          <p className="px-2">
            Payment Method: {singleOrder[0]?.payments[0]?.paymentMethod}
          </p>
          <p className="px-2">
            Transaction No.: {singleOrder[0]?.payments[0]?.transactionNo}
          </p>
          <p className="px-2">
            Amount: ₹
            {Intl.NumberFormat("en-IN", {
              minimumFractionDigits: 2,
            }).format(Math.round(singleOrder[0]?.payments[0]?.amount))}
          </p>
          <p className="px-2">
            Payment Status:{" "}
            <span className="font-bold text-md">
              {singleOrder[0]?.paymentStatus}
            </span>
          </p>
        </div>
        <div className="border border-black w-[33%] mb-2 mt-4 ml-2">
          <p className=" border-black border-b font-semibold p-2 mb-2">
            Order Tracking
          </p>
        </div>
      </div>

      {singleOrder[0]?.orderStatus === "4" ||
      singleOrder[0]?.orderStatus === "5" ? null : (
        <div onClick={() => handleOrderCancel(singleOrder[0]?.id)}>
          <button className="bg-[#e26178] text-white px-3 py-2 rounded-sm">
            Order Cancel
          </button>
        </div>
      )}
      {message && <FlashAlert message={message} type={"success"} />}
    </div>
  );
};

export default SingleOrderDetails;
