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
import { useCurrency } from "@/context/CurrencyContext";
import MobileSingleOrderDetails from "./MobileSingleOrderDetails";
import Link from "next/link";
import { motion } from "framer-motion";
import { baseUrl } from "@/utils/constants";
import { IoLogoWhatsapp } from "react-icons/io";

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
        { headers: { Authorization: `Bearer ${cookieToken}` } },
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
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
    );

  return (
    <div className="p-[10px]">
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
      {singleOrder == null && orders.length == 0 && (
        <div className="">
          {/* <div className="w-full text-center">
           <h2 className="text-xl font-semibold">We Are Currently Down</h2>
           <p className="mt-2 text-gray-600">
             Our website is undergoing maintenance. We’ll be back shortly.
             Thank you for your patience!
           </p>
           <p className="mt-2 text-gray-600">For further updates contact Us</p>
           <div className="flex w-full flex-col justify-center lg:flex-row">
             <motion.div
               animate={{
                 scale: [1, 1.1, 1],
               }}
               transition={{
                 duration: 1.2,
                 ease: "easeInOut",
                 repeat: Infinity,
               }}
               className=""
             >
               <Link href={"https://wa.me/918828324464"} target="_blank">
                 <div className="flex p-2 text-center">
                   <IoLogoWhatsapp
                     className="mr-1"
                     size={30}
                     color="#25D366"
                   />
                   <p className="text-md">+91 8828324464</p>
                 </div>
               </Link>
             </motion.div>
             <motion.div
               animate={{
                 scale: [1, 1.1, 1],
               }}
               transition={{
                 duration: 1.2,
                 ease: "easeInOut",
                 repeat: Infinity,
               }}
               className=""
             >
               <Link
                 href="tel:1800222225"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 <div className="flex p-2">
                   <Icon.Phone
                     size={30}
                     color="#e26178"
                     weight="fill"
                     className="mr-1"
                   />
                   <p className="text-md">1800-222-225</p>
                 </div>
               </Link>
             </motion.div>
           </div>
           
         </div> */}
          <div>
            <p className="text-[#e26178]">
              You currently do not have any orders
            </p>
          </div>
        </div>
      )}
      {singleOrder == null && (
        <div className="mt-10">
          {Array.isArray(orders) &&
            orders.map((item: any) => (
              <div
                key={item.id}
                className="mb-4 cursor-pointer border border-b-0 border-gray-200"
                onClick={() => handleOrderDetails(item.id)}
              >
                <div className="flex flex-wrap justify-between p-2">
                  <p>
                    <span className="font-semibold">Order ID:</span>{" "}
                    {item.orderNo}
                  </p>
                  <p className="">
                    <span className="font-semibold">Order Date:</span>{" "}
                    {new Date(item.created_at).toISOString().split("T")[0]}
                  </p>
                </div>
                <div className="p-2 font-bold text-green-600">
                  {item?.orderStatus}
                </div>

                {item.productDetails.map((product: any, index: any) => (
                  <div
                    className="flex w-full space-x-4 border-b p-4"
                    key={index}
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src={product?.imageDetails[0]?.image_path}
                        alt={"image"}
                        width={80}
                        height={80}
                        className="rounded-md bg-[#f7f7f7] object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-grow flex-col space-y-1 overflow-hidden break-words">
                      <h3 className="line-clamp-2 break-words text-sm font-semibold">
                        {product?.displayTitle}
                      </h3>

                      <p className="break-words text-xs text-gray-600">
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
                                <h3 key={index} className="text-sm font-normal">
                                  {variant.VariantType}:{" "}
                                  {variant.VariantOption[0].VariantName}
                                </h3>
                              ),
                          )}
                        </div>
                      )}

                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm">Qty: {product.quantity}</p>
                        <span className="text-sm font-medium">
                          {formatPrice(product?.discountedTotal)}
                        </span>
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
