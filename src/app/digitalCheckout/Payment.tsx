// Payment.tsx
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import Loader from "@/components/Other/Loader";
import Cookie from "js-cookie";
import { baseUrl } from "@/utils/constants";
import { useRouter } from "next/navigation";

interface PaymentProps {
  orderPlaced: boolean;
  selectedPaymentMethod: string;
  handlePaymentMethodChange: (event: ChangeEvent<HTMLInputElement>) => void;
  totalCart: number;
  onOrderComplete: () => void;
  handleProceed: () => void;
}

const Payment: React.FC<PaymentProps> = ({
  orderPlaced,
  selectedPaymentMethod,
  handlePaymentMethodChange,
  totalCart,
  onOrderComplete,
  handleProceed,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const cookieToken = Cookie.get("localtoken");
  const router = useRouter();

  useEffect(() => {
    const loadRazorpayScript = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        console.log("Razorpay SDK loaded");
      };
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const handleRazorpayPayment = async () => {
    setLoading(true);
    try {
      const orderUrl = "/api/razorpay";
      const response = await axios.post(orderUrl, { amount: totalCart * 100 });
      console.log(response);
      const { amount, id: order_id, currency } = response.data;

      const options = {
        key: "rzp_test_QZVTreX3fAEZto",
        amount: amount.toString(),
        currency: currency,
        name: "WHP Jewellers",
        description: "Transaction",
        order_id: order_id,
        handler: async function (response: any) {
          try {
            setLoading(true);
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;

            const apiResponse = await axios.post(
              `${baseUrl}/orders`,
              {
                paymentDetails: {
                  paymentId: razorpay_payment_id,
                  orderId: razorpay_order_id,
                  signature: razorpay_signature,
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${cookieToken}`,
                },
              }
            );
            console.log(apiResponse.data);
            onOrderComplete();
          } catch (error) {
            console.error("Error placing order:", error);
          } finally {
            setLoading(false);
            router.push("/profile");
          }
        },
        prefill: {
          name: "Test Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "WHP Jewellers",
        },
        theme: {
          color: "#fb7185",
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (selectedPaymentMethod === "razorpay") {
      console.log("razorpay should initiate");
      handleRazorpayPayment();
    } else {
      handleProceed();
    }
  };

  const isValidTotalCart = !isNaN(totalCart) && totalCart > 0;

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold mb-2">Payment Method</h1>
      <div className="flex flex-col gap-3">
        <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
          <label
            htmlFor="razorpayPayment"
            className="flex gap-2 cursor-pointer font-medium"
          >
            <Image
              src="/images/other/upi-icon.png"
              alt="upi"
              width={24}
              height={24}
              objectFit="fill"
            />
            Razorpay (UPI, Cards)
          </label>
          <input
            type="radio"
            id="razorpayPayment"
            name="paymentOption"
            value="razorpay"
            className="appearance-none w-4 h-4 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
            checked={selectedPaymentMethod === "razorpay"}
            onChange={handlePaymentMethodChange}
          />
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="bg-red-600 text-white px-4 py-2 rounded mt-4"
        disabled={!isValidTotalCart || !selectedPaymentMethod}
      >
        Place Order
      </button>
    </div>
  );
};

export default Payment;
