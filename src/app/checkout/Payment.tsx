// Payment.tsx
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { CreditCard } from "@phosphor-icons/react";
import axios from "axios";
import { Address } from "@/type/AddressType";
import ReactLoading from "react-loading";

interface PaymentProps {
  selectedPaymentMethod: string;
  handlePaymentMethodChange: (event: ChangeEvent<HTMLInputElement>) => void;
  totalCart: number;
  onOrderComplete: () => void;
  selectedShippingAddress: Address | null;
  selectedBillingAddress: Address | null;
  handleProceed: () => void; // Add this line
}

const Payment: React.FC<PaymentProps> = ({
  selectedPaymentMethod,
  handlePaymentMethodChange,
  totalCart,
  onOrderComplete,
  selectedShippingAddress,
  selectedBillingAddress,
  handleProceed,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
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
      const { amount, id: order_id, currency } = response.data;

      const options = {
        key: "rzp_test_QZVTreX3fAEZto",
        amount: amount.toString(),
        currency: currency,
        name: "WHP Jewellers",
        description: "Transaction",
        order_id: order_id,
        handler: async function (response: any) {
          // Call the onOrderComplete function when the payment is successful
          onOrderComplete();
        },
        prefill: {
          name: "Test Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "WHP Jewllers",
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

  const handleOtherPaymentGateway = () => {
    // Handle other payment gateway logic
    alert("Other payment gateway selected");
    // Implement the logic for the other payment gateway here
    // Once the payment is successful, call the onOrderComplete function
  };

  const handlePayment = () => {
    if (selectedPaymentMethod === "razorpay") {
      console.log("razorpay should initiate");
      handleRazorpayPayment();
    } else if (selectedPaymentMethod === "otherPaymentGateway") {
      handleOtherPaymentGateway();
    } else {
      handleProceed();
    }
  };

  // Check if totalCart is a valid number
  const isValidTotalCart = !isNaN(totalCart) && totalCart > 0;
  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex bg-white bg-opacity-50 h-full text-black text-5xl items-center justify-center">
        <ReactLoading type="spin" color="#000" height={50} width={50} />
      </div>
    );
  return (
    <div className="flex flex-col lg:w-[50rem] md:w-[30rem] sm:w-[30rem] gap-5">
      <h1 className="text-2xl">Payment Method</h1>
      <div className="flex flex-col gap-3">
        <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
          <label
            htmlFor="razorpayPayment"
            className="flex gap-2 cursor-pointer font-medium"
          >
            <Image
              src="/images/other/upi-icon.png"
              alt="upi"
              width={30}
              height={30}
              objectFit="fill"
            />
            Razorpay (UPI, Cards)
          </label>
          <input
            type="radio"
            id="razorpayPayment"
            name="paymentOption"
            value="razorpay"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
            checked={selectedPaymentMethod === "razorpay"}
            onChange={handlePaymentMethodChange}
          />
        </div>
        <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
          <label
            htmlFor="otherPaymentGateway"
            className="flex gap-2 cursor-pointer font-medium"
          >
            <CreditCard className="text-2xl text-red-600" />
            Other Payment Gateway
          </label>
          <input
            type="radio"
            id="otherPaymentGateway"
            name="paymentOption"
            value="otherPaymentGateway"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
            checked={selectedPaymentMethod === "otherPaymentGateway"}
            onChange={handlePaymentMethodChange}
          />
        </div>
        <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
          <label
            htmlFor="paypalPayment"
            className="flex gap-2 cursor-pointer font-medium"
          >
            <Image
              src="/images/other/paypal-icon.png"
              alt="PayPal"
              width={30}
              height={30}
              objectFit="fill"
            />
            PayPal
          </label>
          <input
            type="radio"
            id="paypalPayment"
            name="paymentOption"
            value="paypal"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
            checked={selectedPaymentMethod === "paypal"}
            onChange={handlePaymentMethodChange}
          />
        </div>
        <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
          <label
            htmlFor="stripePayment"
            className="flex gap-2 cursor-pointer font-medium"
          >
            <Image
              src="/images/other/stripe-icon.png"
              alt="Stripe"
              width={30}
              height={30}
              objectFit="fill"
            />
            Stripe (Credit/Debit Cards)
          </label>
          <input
            type="radio"
            id="stripePayment"
            name="paymentOption"
            value="stripe"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
            checked={selectedPaymentMethod === "stripe"}
            onChange={handlePaymentMethodChange}
          />
        </div>
      </div>
      <h1 className="text-red-950 font-medium">AVAILABLE OFFERS</h1>
      <div>
        <div>
          -10% off on HDFC Bank Credit Card. Use{" "}
          <span className="font-bold">HDFC10</span>
          <span className="text-red-600 underline">View more Offers</span>
        </div>
        <div>
          -7% off on SBI Bank Credit Card. Use{" "}
          <span className="font-bold">SBI7</span>{" "}
          <span className="text-red-600 underline">View more Offers</span>
        </div>
      </div>
      <button
        onClick={handlePayment}
        className="bg-red-600 text-white px-4 py-2 rounded"
        disabled={
          !selectedShippingAddress ||
          !selectedBillingAddress ||
          !isValidTotalCart ||
          !selectedPaymentMethod
        }
      >
        Place Order
      </button>
    </div>
  );
};

export default Payment;
