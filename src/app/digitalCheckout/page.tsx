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
  schemeType: 'gms' | 'voucher';
  recipientName?: string;
  recipientEmail?: string;
  recipientMobile?: string;
  message?: string;
  senderName?: string;
}

const DigitalCheckout: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("razorpay");
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const { userState,isLoggedIn } = useUser();
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState<"success" | "error">("success");
  const [flashKey, setFlashKey] = useState(0);
  const [selectedScheme, setSelectedScheme] = useState<SelectedScheme | null>(null);

  // const isLoggedIn = userState.isLoggedIn;
  const router = useRouter();

  useEffect(() => {
    const storedScheme = sessionStorage.getItem("selectedScheme");
    if (storedScheme) {
      setSelectedScheme(JSON.parse(storedScheme));
    }
  }, []);

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      const endpoint = selectedScheme?.schemeType === 'voucher' ? 'place-voucher-order' : 'place-order';
      const payload = selectedScheme?.schemeType === 'voucher' 
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
        }
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
      <div className="max-w-lg w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Digital Checkout</h2>
        <FlashAlert key={flashKey} message={flashMessage} type={flashType} />
        <div className="mb-6">
          <div className="flex items-center mb-4">
            {selectedScheme.schemeType === 'voucher' ? (
              <Gift size={32} className="text-blue-500 mr-2" />
            ) : (
              <CurrencyCircleDollar size={32} className="text-blue-500 mr-2" />
            )}
            <div>
              <h3 className="text-xl font-semibold">
                {selectedScheme.planName}
              </h3>
              {selectedScheme.schemeType === 'gms' && (
                <p className="text-gray-600">
                  Monthly Installment: ₹{selectedScheme.monthlyAmount}
                </p>
              )}
              <p className="text-gray-600">
                Total Amount: ₹{selectedScheme.totalAmount}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <div className="bg-gray-100 p-4 rounded">
            <div className="flex justify-between mb-2">
              <p>Plan Name:</p>
              <p>{selectedScheme.planName}</p>
            </div>
            {selectedScheme.schemeType =='gms ' && (
              <div className="flex justify-between mb-2">
                <p>Monthly Installment:</p>
                <p>₹{selectedScheme.monthlyAmount}</p>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <p>Total Amount:</p>
              <p>₹{selectedScheme.totalAmount}</p>
            </div>
            {selectedScheme.schemeType === 'voucher' && (
              <>
                <div className="flex justify-between mb-2">
                  <p>Recipient:</p>
                  <p>{selectedScheme.recipientName}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Recipient Email:</p>
                  <p>{selectedScheme.recipientEmail}</p>
                </div>
              </>
            )}
          </div>
        </div>
        {selectedScheme.schemeType === 'gms' ? (
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