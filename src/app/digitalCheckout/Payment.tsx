import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Loader from "@/components/Other/Loader";
import { baseUrl } from "@/utils/constants";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { DownloadSimple, User } from "@phosphor-icons/react";
import { headers } from "next/headers";

interface PaymentProps {
  orderPlaced: boolean;
  selectedPaymentMethod: string;
  handlePaymentMethodChange: (event: ChangeEvent<HTMLInputElement>) => void;
  totalCart: any;
  onOrderComplete: () => void;
  handleProceed: () => void;
}

interface TransactionResponse {
  message: string;
  transaction: {
    id: number;
    enrollment_id: number;
    amount: number;
    transaction_date: string;
    type: string;
    description: string;
    razorpayPaymentNo: string;
    paymentMethod: string;
    transactionDetails: string;
    created_at: string;
    updated_at: string;
  };
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
  const [transactionDetails, setTransactionDetails] = useState<
    TransactionResponse["transaction"] | null
  >(null);
  const cookieToken = localStorage.getItem("localtoken");
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

      const storedScheme = JSON.parse(
        sessionStorage.getItem("selectedScheme") || "{}",
      );
      console.log(storedScheme.enrollmentId);

      const options = {
        key: "rzp_live_vh97GOv9gE694e",
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

            const payload = {
              enrollment_id: storedScheme.enrollmentId,
              amount: amount / 100,
              transaction_date: new Date().toISOString().split("T")[0],
              type: "deposit",
              description: `${storedScheme.schemeType} scheme payment`,
              paymentDetails: {
                paymentId: razorpay_payment_id,
              },
            };

            console.log("Payload being sent:", payload);
            const apiResponse = await axios.post<TransactionResponse>(
              // `http://164.92.120.19/api/storeGMSTransaction`,
              `https://whpapi.transpost.co/api/storeGMSTransaction`,
              payload,
              {
                headers: {
                  Authorization: `Bearer ${cookieToken}`,
                },
              },
            );
            console.log(apiResponse.data);
            setTransactionDetails(apiResponse.data.transaction);
            onOrderComplete();
          } catch (error) {
            console.error("Error placing order:", error);
          } finally {
            setLoading(false);
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

  const handleDownloadReceipt = () => {
    if (!transactionDetails) return;

    const storedScheme = JSON.parse(
      sessionStorage.getItem("selectedScheme") || "{}",
    );
    const schemeName = storedScheme.planName || "N/A";

    // Create a new PDF with smaller page size (A5)
    const pageWidth = 120;
    const pageHeight = 210; // A4 height, you can adjust this if needed

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [pageWidth, pageHeight],
    });

    // Add logo
    pdf.addImage(
      "/images/other/logo2.png",
      "PNG",
      (pageWidth - 20) / 2,
      10,
      20,
      20,
    );

    // Add title
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Payment Receipt", pageWidth / 2, 40, { align: "center" });

    // Add date
    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text(
      `Date: ${new Date(
        transactionDetails.transaction_date,
      ).toLocaleDateString()}`,
      pageWidth / 2,
      48,
      { align: "center" },
    );

    // Add company info
    pdf.setFontSize(12);
    pdf.setTextColor(0);
    pdf.text("WHP Jewellers", pageWidth / 2, 58, { align: "center" });
    pdf.setFontSize(8);
    pdf.setTextColor(100);
    pdf.text("Phone: (123) 456-7890", pageWidth / 2, 64, { align: "center" });
    pdf.text("Email: info@whpjewellers.com", pageWidth / 2, 70, {
      align: "center",
    });

    // Add transaction details with grey background
    pdf.setFillColor(240, 240, 240);
    pdf.rect(10, 80, pageWidth - 20, 60, "F");

    pdf.setFontSize(10);
    pdf.setTextColor(0);
    pdf.text("Transaction Details", pageWidth / 2, 88, { align: "center" });

    const detailsStart = 96;
    const detailsGap = 8;
    pdf.setFontSize(8);
    pdf.setTextColor(50);

    const details = [
      { label: "Scheme:", value: schemeName },
      { label: "Transaction No:", value: transactionDetails.id.toString() },
      {
        label: "Enrollment ID:",
        value: transactionDetails.enrollment_id.toString(),
      },
      { label: "Amount:", value: `₹${transactionDetails.amount.toFixed(1)}` },
      { label: "Payment Method:", value: transactionDetails.paymentMethod },
      {
        label: "Transaction ID:",
        value: transactionDetails.razorpayPaymentNo,
      },
    ];

    details.forEach((detail, index) => {
      pdf.text(`${detail.label}`, 15, detailsStart + index * detailsGap);
      pdf.text(
        `${detail.value}`,
        pageWidth - 15,
        detailsStart + index * detailsGap,
        { align: "right" },
      );
    });

    // Add thank you message
    pdf.setFontSize(10);
    pdf.setTextColor(0);
    pdf.text("Thank you for your payment!", pageWidth / 2, pageHeight - 20, {
      align: "center",
    });

    pdf.save("payment_receipt.pdf");
  };

  const renderReceipt = () => {
    if (!transactionDetails) return null;

    const storedScheme = JSON.parse(
      sessionStorage.getItem("selectedScheme") || "{}",
    );
    const schemeName = storedScheme.planName || "N/A";

    return (
      <div className="mx-auto max-w-sm rounded-lg bg-white p-6 text-center shadow-md">
        <div className="mb-4">
          <Image
            src="/images/other/logo2.png"
            alt="Company Logo"
            width={80}
            height={40}
            objectFit="contain"
            className="mx-auto"
            unoptimized
          />
          <h2 className="mt-2 text-xl font-bold text-gray-800">
            Payment Receipt
          </h2>
          <p className="text-sm text-gray-600">
            Date:{" "}
            {new Date(transactionDetails.transaction_date).toLocaleDateString()}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">WHP Jewellers</h3>
          <p className="text-sm text-gray-600">Phone: (123) 456-7890</p>
          <p className="text-sm text-gray-600">Email: info@whpjewellers.com</p>
        </div>

        <div className="mb-4 rounded-md bg-gray-100 p-4">
          <h4 className="text-md mb-2 font-semibold text-gray-800">
            Transaction Details
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-right text-gray-600">Scheme:</p>
            <p className="text-left font-medium text-gray-800">{schemeName}</p>
            <p className="text-right text-gray-600">Transaction No:</p>
            <p className="text-left font-medium text-gray-800">
              {transactionDetails.id}
            </p>
            <p className="text-right text-gray-600">Enrollment ID:</p>
            <p className="text-left font-medium text-gray-800">
              {transactionDetails.enrollment_id}
            </p>
            <p className="text-right text-gray-600">Amount:</p>
            <p className="text-left font-medium text-gray-800">
              ₹{transactionDetails.amount.toFixed(2)}
            </p>
            <p className="text-right text-gray-600">Payment Method:</p>
            <p className="text-left font-medium text-gray-800">
              {transactionDetails.paymentMethod}
            </p>
            <p className="text-right text-gray-600">Transaction ID:</p>
            <p className="text-left font-medium text-gray-800">
              {transactionDetails.razorpayPaymentNo}
            </p>
          </div>
        </div>

        <p className="mb-4 text-sm text-gray-600">
          Thank you for your payment!
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDownloadReceipt}
            className="flex items-center rounded bg-blue-500 px-4 py-2 text-sm text-white transition duration-300 hover:bg-blue-600"
          >
            <DownloadSimple size={20} className="mr-2" />
            Download Receipt
          </button>
          <button
            onClick={() => router.push("/profile")}
            className="flex items-center rounded bg-gray-500 px-4 py-2 text-sm text-white transition duration-300 hover:bg-gray-600"
          >
            <User size={20} className="mr-2" />
            Go to Profile
          </button>
        </div>
      </div>
    );
  };

  const isValidTotalCart = !isNaN(totalCart) && totalCart > 0;

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-5">
      {!transactionDetails ? (
        <>
          <h1 className="mb-2 text-xl font-semibold">Payment Method</h1>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border border-gray-200 p-4">
              <label
                htmlFor="razorpayPayment"
                className="flex cursor-pointer gap-2 font-medium"
              >
                <Image
                  src="/images/other/upi-icon.png"
                  alt="upi"
                  width={24}
                  height={24}
                  objectFit="fill"
                  unoptimized
                />
                Razorpay (UPI, Cards)
              </label>
              <input
                type="radio"
                id="razorpayPayment"
                name="paymentOption"
                value="razorpay"
                className="h-4 w-4 cursor-pointer appearance-none rounded-full border-2 border-gray-400 checked:border-transparent checked:bg-rose-500 focus:border-rose-300 focus:outline-none"
                checked={selectedPaymentMethod === "razorpay"}
                onChange={handlePaymentMethodChange}
              />
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="mt-4 bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-white"
            disabled={!isValidTotalCart || !selectedPaymentMethod}
          >
            Place Order
          </button>
        </>
      ) : (
        renderReceipt()
      )}
    </div>
  );
};

export default Payment;
