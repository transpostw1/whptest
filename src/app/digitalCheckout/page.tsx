"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import FlashAlert from "../../components/Other/FlashAlert";
import { baseUrl, gms } from "@/utils/constants";
import instance from "@/utils/axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Payment from "./Payment";
import VoucherPayment from "./VoucherPayment";

import { CurrencyCircleDollar, Gift } from "@phosphor-icons/react";

interface SelectedScheme {
  planName: string;
  monthlyAmount: number | null;
  totalAmount: number;
  iconUrl: string;
  schemeType: "gms" | "voucher";
  recipientName?: string;
  recipientEmail?: string;
  recipientMobile?: string;
  message?: string;
  senderName?: string;
}

const DigitalCheckout: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("razorpay");
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const { userState, isLoggedIn } = useUser();
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState<"success" | "error">("success");
  const [flashKey, setFlashKey] = useState(0);
  const [selectedScheme, setSelectedScheme] = useState<SelectedScheme | null>(
    null,
  );

  // const isLoggedIn = userState.isLoggedIn;
  const router = useRouter();

  useEffect(() => {
    const storedScheme = sessionStorage.getItem("selectedScheme");
    if (storedScheme) {
      setSelectedScheme(JSON.parse(storedScheme));
    }
  }, []);

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleOrderComplete = () => {
    setIsOrderPlaced(true);
    setFlashMessage("Your order has been placed successfully!");
    setFlashType("success");
    setFlashKey((prevKey) => prevKey + 1);
  };

  const handleProceed = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    try {
      const cookieToken = Cookies.get("localtoken");
      const endpoint =
        selectedScheme?.schemeType === "voucher"
          ? "place-voucher-order"
          : "place-order";
      const payload =
        selectedScheme?.schemeType === "voucher"
          ? {
              amount: selectedScheme.totalAmount,
              recipientName: selectedScheme.recipientName,
              recipientEmail: selectedScheme.recipientEmail,
              recipientMobile: selectedScheme.recipientMobile,
              message: selectedScheme.message,
              senderName: selectedScheme.senderName,
            }
          : {
              schemeType: selectedScheme?.planName.toLowerCase(),
              amount: selectedScheme?.monthlyAmount,
            };

      const response = await instance.post(
        `${baseUrl}${gms}/${endpoint}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        },
      );

      console.log("Order placed successfully", response.data);
      handleOrderComplete();
    } catch (error) {
      console.error("Error placing order:", error);
      setFlashMessage("Failed to place the order. Please try again.");
      setFlashType("error");
      setFlashKey((prevKey) => prevKey + 1);
    }
  };

  if (!selectedScheme) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg rounded-md bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Digital Checkout</h2>
        <FlashAlert key={flashKey} message={flashMessage} type={flashType} />
        <div className="mb-6">
          <div className="mb-4 flex items-center">
            {selectedScheme.schemeType === "voucher" ? (
              <Gift size={32} className="mr-2 text-blue-500" />
            ) : (
              <CurrencyCircleDollar size={32} className="mr-2 text-blue-500" />
            )}
            <div>
              <h3 className="text-xl font-semibold">
                {selectedScheme.planName}
              </h3>
              {selectedScheme.schemeType === "gms" && (
                <p className="text-gray-600">
                  Monthly Installment: ₹{selectedScheme.monthlyAmount}
                </p>
              )}
              <p className="text-gray-600">
                Total Amount{" "}:{" "}₹{selectedScheme.totalAmount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">Order Summary</h3>
          <div className="rounded bg-gray-100 p-4">
            <div className="mb-2 flex justify-between">
              <p>Plan Name :</p>
              <p>{selectedScheme.planName}</p>
            </div>
            {selectedScheme.schemeType == "gms " && (
              <div className="mb-2 flex justify-between">
                <p>Monthly Installment :</p>
                <p>₹{selectedScheme.monthlyAmount}</p>
              </div>
            )}
            <div className="mb-2 flex justify-between">
              <p>Total Amount :</p>
              <p>₹{selectedScheme.totalAmount.toLocaleString("en-IN")}</p>
            </div>
            {selectedScheme.schemeType === "voucher" && (
              <>
                <div className="mb-2 flex justify-between">
                  <p>Recipient :</p>
                  <p>{selectedScheme.recipientName}</p>
                </div>
                <div className="mb-2 flex justify-between">
                  <p>Recipient Email :</p>
                  <p>{selectedScheme.recipientEmail}</p>
                </div>
              </>
            )}
          </div>
        </div>
        {selectedScheme.schemeType === "gms" ? (
          <Payment
            orderPlaced={isOrderPlaced}
            selectedPaymentMethod={selectedPaymentMethod}
            handlePaymentMethodChange={handlePaymentMethodChange}
            totalCart={selectedScheme.monthlyAmount}
            onOrderComplete={handleOrderComplete}
            handleProceed={handleProceed}
          />
        ) : (
          <VoucherPayment
            orderPlaced={isOrderPlaced}
            selectedPaymentMethod={selectedPaymentMethod}
            handlePaymentMethodChange={handlePaymentMethodChange}
            totalCart={selectedScheme.totalAmount}
            onOrderComplete={handleOrderComplete}
            handleProceed={handleProceed}
            selectedScheme={selectedScheme}
          />
        )}
      </div>
    </div>
  );
};

export default DigitalCheckout;
