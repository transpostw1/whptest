import React, { useState, useEffect } from "react";
import Image from "next/image";
import FlashAlert from "../Other/FlashAlert";
import Cookie from "js-cookie";
import { baseUrl, graphqlbaseUrl } from "@/utils/constants";
import { useCurrency } from "@/context/CurrencyContext";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import axios from "axios";
interface Props {
  singleOrder: any;
}
const MobileSingleOrderDetails: React.FC<Props> = ({ singleOrder }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<any>();
  const [type, setType] = useState<any>("");
  const { formatPrice } = useCurrency();

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
  return (
    <div>
      <p className="mt-4">
        Order No.:{" "}
        <span className="text-lg font-bold">{singleOrder[0].orderNo}</span>
      </p>
      <div className="flex">
        <p className="mr-1">Tracking Status:</p>
        <p className="text-lg font-bold text-green-600">
          {singleOrder[0]?.orderStatus}
        </p>
      </div>

      {singleOrder?.map((items: any, index: any) => (
        <div key={index} className="border-gray items-center border p-4">
          {items.productDetails.map((product: any, index: any) => (
            <div className="flex justify-between" key={index}>
              <div className="flex">
                <div className="mr-3">
                  <Image
                    src={product?.imageDetails[0].image_path}
                    alt={"image"}
                    width={85}
                    height={85}
                    className="bg-[#f7f7f7]"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">{product?.displayTitle}</p>
                  {product?.variants && product?.variants.length > 0 && (
                    <div>
                      {product.variants.map(
                        (variant: any, index: number) =>
                          variant.VariantType &&
                          variant.VariantOption &&
                          variant.VariantOption.length > 0 && (
                            <h3 key={index} className="text-sm font-normal">
                              {variant.VariantType}:{" "}
                              {variant.VariantOption[0].VariantName}
                            </h3>
                          ),
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="font-semibold">
                {formatPrice(
                  parseInt(product?.discountedTotal) *
                    parseInt(product?.quantity),
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
      {singleOrder[0]?.productDetails[0]?.discountAmount > 0 && (
        <div className="border-gray flex justify-end border border-b-0 border-t-0 px-2">
          Discounted Amount:
          {formatPrice(singleOrder[0]?.productDetails[0]?.discountedTotal)}
        </div>
      )}
      <div className="border-gray flex justify-end border border-b-0 border-t-0 px-2">
        Shipping Charges:{singleOrder[0]?.productDetails[0]?.discountAmount}
      </div>
      <div className="border-gray flex justify-end rounded-b-md border p-2">
        <p>Total Amount: </p>
        <span className="text-md font-semibold">
          {formatPrice(singleOrder[0]?.productTotal)}
        </span>
      </div>
      <div>
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
          <p className="px-2">Order Date:{singleOrder[0]?.payments[0]?.date}</p>
          <p className="px-2">
            Payment Method: {singleOrder[0]?.payments[0]?.paymentMethod}
          </p>
          <p className="break-words px-2">
            Transaction No.: {singleOrder[0]?.payments[0]?.transactionNo}
          </p>
          <p className="px-2">
            Amount: {formatPrice(singleOrder[0]?.payments[0]?.amount)}
          </p>
          <p className="px-2">
            Payment Status:{" "}
            <span className="text-md font-bold">
              {singleOrder[0]?.paymentStatus}
            </span>
          </p>
        </div>
        <div className="border-gray mb-2 ml-2 mt-4 rounded-md border max-md:col-span-2">
          <p className="border-gray mb-2 border-b p-2 font-semibold">
            Order Tracking
          </p>
          <div className="relative p-4">
            <div className="absolute left-[1.37rem] top-5 h-[calc(100%-3rem)] w-0.5 bg-gray-300"></div>
            {singleOrder[0]?.orderTracking.map((track: any, index: any) => (
              <div key={index} className="relative mb-8 flex items-start">
                <div className="z-10 mr-4">
                  <div
                    className={`h-4 w-4 rounded-full ${
                      index === singleOrder[0].orderTracking.length - 1
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  ></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {track.trackingOrderStatusName}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(track.created_at).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-gray mb-2 ml-2 mt-4 rounded-md border max-md:col-span-2">
          <p className="border-gray mb-2 border-b p-2 font-semibold">
            E-ship Tracking
          </p>
          <div className="relative p-4">
            <div className="absolute left-[1.40rem] top-5 h-[calc(100%-3rem)] w-0.5 bg-gray-300"></div>
            {singleOrder[0]?.eshipTracking.map((track: any, index: any) => (
              <div key={index} className="relative mb-8 flex items-start">
                <div className="flex flex-col">
                  {JSON.parse(track.checkpoints || "[]").map(
                    (checkpoint: any, checkpointIndex: number) => (
                      <div
                        key={checkpointIndex}
                        className="mb-4 flex items-start"
                      >
                        <div className="z-10 mr-4">
                          <div
                            className={`h-4 w-4 rounded-full ${
                              checkpointIndex ===
                              JSON.parse(track.checkpoints || "[]").length - 1
                                ? "bg-green-500"
                                : "bg-blue-500"
                            }`}
                          ></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            {checkpoint.remark}
                          </span>
                          <span className="text-sm text-gray-500">
                            {checkpoint.city}, {checkpoint.state}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(checkpoint.date).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                  {/* <span className="text-sm text-gray-500">
                      {new Date(
                        singleOrder[0]?.eshipTracking[0]?.deliveryDate,
                      ).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        // hour: '2-digit',
                        // minute: '2-digit',
                        // hour12: false
                      })}
                    </span> */}
                </div>
              </div>
            ))}
          </div>

          {/* </div> */}
        </div>
      </div>

      {singleOrder[0]?.orderStatus === "4" ||
      singleOrder[0]?.orderStatus === "5" ? null : (
        <div onClick={() => handleOrderCancel(singleOrder[0]?.id)}>
          <button className="rounded-sm bg-[#e26178] px-3 py-2 pr-[6px] text-white">
            Cancel Order
          </button>
        </div>
      )}
      {message && <FlashAlert message={message} type={type} />}
    </div>
  );
};

export default MobileSingleOrderDetails;
