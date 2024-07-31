"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import FlashAlert from "../Other/FlashAlert";
import Cookie from "js-cookie";
import { baseUrl, graphqlbaseUrl } from "@/utils/constants";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useCurrency } from "@/context/CurrencyContext";
interface Props {
  singleOrder: any;
}

const SingleOrderDetails: React.FC<Props> = ({ singleOrder }) => {
  const {formatPrice}=useCurrency()
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [type, setType] = useState<any>("");

  const handleOrderCancel = async (id: any) => {
    try {
      setLoading(true);
      const cookieToken =
        typeof window !== "undefined"
          ? localStorage.getItem("localtoken")
          : null;
      const getAuthHeaders = () => {
        if (!cookieToken) return null;
        return {
          authorization: `Bearer ${cookieToken}`,
        };
      };

      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        headers: getAuthHeaders(),
        cache: new InMemoryCache(),
      });

      const CUSTOMER_ORDER_CANCEL = gql`
        mutation Mutation($customerOrder: CustomerOrderInput!) {
          CancelCustomerOrder(customerOrder: $customerOrder) {
            message
            code
          }
        }
      `;
      const { data } = await client.mutate({
        mutation: CUSTOMER_ORDER_CANCEL,
        variables: {
          customerOrder: {
            orderId: id,
          },
        },
        context: {
          headers: getAuthHeaders(),
        },
        fetchPolicy: "no-cache",
      });
      if (data.CancelCustomerOrder.code == 200) {
        setMessage(data.CancelCustomerOrder.message);
        setType("success");
      } else {
        setMessage(data.CancelCustomerOrder.message);
        setType("error");
      }
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      setMessage(error.response.data.message);
      setType("error");
    } finally {
      setLoading(false);
    }
  };

  console.log(singleOrder);

  if (loading) {
    return (
      <div className="loading-container flex h-full items-center justify-center">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
    );
  }
  return (
    <div>
      <div className="mb-3 flex justify-between">
        <div>
          <p>
            Order No.:{" "}
            <span className="text-lg font-bold">{singleOrder[0].orderNo}</span>
          </p>
        </div>
        <div className="flex">
          <p className="mr-1">Tracking Status:</p>
          <p className="text-lg font-bold text-green-600">
            {singleOrder[0]?.orderStatus}
          </p>
        </div>
      </div>

      {singleOrder?.map((items: any, index: any) => (
        <div key={index} className="border-gray items-center border p-4">
          {items.productDetails.map((product: any, index: any) => (
            <div className="flex items-center justify-between py-2" key={index}>
              <div className="flex">
                <div className="mr-3">
                  <Image
                    src={product?.imageDetails[0].image_path}
                    alt={"image"}
                    width={85}
                    height={85}
                    className="bg-[#f7f7f7]"
                  />
                </div>
                <div className="flex flex-col content-start justify-center">
                  <p className="font-semibold">{product?.displayTitle}</p>
                  <p>
                    {product?.metalType}-{product?.metalWeight}
                  </p>
                </div>
              </div>
              <p>
                {formatPrice(product?.discountedTotal)}
              </p>
              <p>{product?.quantity}</p>
              <div className="font-semibold">
                {formatPrice(parseInt(product?.discountedTotal)*parseInt(product?.quantity))}
              </div>
            </div>
          ))}
          {items?.isReturnable && <button>Return Here</button>}
        </div>
      ))}
      <div className="border-gray flex justify-end border border-b-0 border-t-0 pr-14">
        Discount Amount:{formatPrice(singleOrder[0]?.productDetails[0]?.discountAmount)}
      </div>
      <div className="border-gray flex justify-end border border-b-0 border-t-0 pr-14">
        Shipping Charges:{formatPrice(0)}
      </div>
      <div className="border-gray flex justify-end rounded-b-md border p-2">
        <p>Total Amount: </p>
        <span className="text-md font-semibold">
          {formatPrice(singleOrder[0]?.productTotal)}
        </span>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        <div className="border-gray mb-2 mt-4 rounded-md border">
          <p className="border-gray border-b p-2 font-semibold">
            Billing Address
          </p>
          <p className="border-gray w-full break-words border-b p-2">
            {singleOrder[0]?.billingAddressId[0]?.full_address},
            {singleOrder[0]?.billingAddressId[0]?.landmark},
            {singleOrder[0]?.billingAddressId[0]?.pincode},
            {singleOrder[0]?.billingAddressId[0]?.state},
            {singleOrder[0]?.billingAddressId[0]?.city}
            <p>
              Address Type:{singleOrder[0]?.billingAddressId[0]?.address_type}
            </p>
          </p>
          <p className="border-gray border-b p-2 font-semibold">
            Shipping Address
          </p>
          <p className="break-words p-2">
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
        <div className="border-gray mb-2 ml-2 mt-4 rounded-md border">
          <p className="border-gray mb-2 border-b p-2 font-semibold">
            Payment Details
          </p>
          {singleOrder[0].payments.map((payment: any, index: any) => (
            <div key={index}>
              <p className="px-2">Order Date:{payment?.date}</p>
              <p className="px-2">Payment Method: {payment?.paymentMethod}</p>
              <p className="break-words px-2">
                Transaction No.: {payment?.transactionNo}
              </p>
              <p className="px-2">
                Amount: {formatPrice(payment?.amount)}
              </p>
            </div>
          ))}
          <p className="px-2">
            Payment Status:{" "}
            <span className="text-md font-bold">
              {singleOrder[0]?.paymentStatus}
            </span>
          </p>
        </div>
        <div className="border border-gray mb-2 mt-4 ml-2 rounded-md max-md:col-span-2">
  <p className="border-gray border-b font-semibold p-2 mb-2">
    Order Tracking
  </p>
  <div className="p-4 relative">
    <div className="absolute top-5 left-[1.40rem] w-0.5 h-[calc(100%-3rem)] bg-gray-300"></div>
    {singleOrder[0]?.orderTracking.map((track:any, index:any) => (
      <div key={index} className="flex items-start mb-8 relative">
        <div className="mr-4 z-10">
          <div className={`w-4 h-4 rounded-full ${
            index === singleOrder[0].orderTracking.length - 1 ? 'bg-green-500' : 'bg-blue-500'
          }`}></div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{track.trackingOrderStatusName}</span>
          <span className="text-sm text-gray-500">
            {new Date(track.created_at).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              // hour: '2-digit',
              // minute: '2-digit',
              // hour12: false
            })}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
      </div>

      {singleOrder[0]?.orderStatus === "4" ||
      singleOrder[0]?.orderStatus === "5" ? null : (
        <div onClick={() => handleOrderCancel(singleOrder[0]?.id)}>
          <button className="rounded-sm bg-[#e26178] px-3 py-2 text-white">
            Order Cancel
          </button>
        </div>
      )}
      {message && <FlashAlert message={message} type={type} />}
    </div>
  );
};

export default SingleOrderDetails;
