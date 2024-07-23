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
import { CurrencyCircleDollar } from "@phosphor-icons/react";

interface GoldSavingScheme {
  planName: string;
  monthlyAmount: number;
  totalAmount: number;
  iconUrl: string;
}

const DigitalCheckout: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("razorpay");
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const { userState,isLoggedIn } = useUser();
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState<"success" | "error">("success");
  const [flashKey, setFlashKey] = useState(0);
  const [selectedScheme, setSelectedScheme] = useState<GoldSavingScheme | null>(
    null
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
    event: React.ChangeEvent<HTMLInputElement>
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
      const response = await instance.post(
        `${baseUrl}${gms}/place-order`,
        {
          schemeType: selectedScheme?.planName.toLowerCase(),
          amount: selectedScheme?.monthlyAmount,
        },
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
            <CurrencyCircleDollar size={32} className="text-blue-500 mr-2" />
            <div>
              <h3 className="text-xl font-semibold">
                {selectedScheme.planName} Plan
              </h3>
              <p className="text-gray-600">
                Monthly Installment: ₹{selectedScheme.monthlyAmount}
              </p>
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
            <div className="flex justify-between mb-2">
              <p>Monthly Installment:</p>
              <p>₹{selectedScheme.monthlyAmount}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Total Amount:</p>
              <p>₹{selectedScheme.totalAmount}</p>
            </div>
          </div>
        </div>
        <Payment
          orderPlaced={isOrderPlaced}
          selectedPaymentMethod={selectedPaymentMethod}
          handlePaymentMethodChange={handlePaymentMethodChange}
          totalCart={selectedScheme.monthlyAmount}
          onOrderComplete={handleOrderComplete}
          handleProceed={handleProceed}
        />
      </div>
    </div>
  );
};

export default DigitalCheckout;
