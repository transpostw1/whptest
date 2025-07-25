import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import Loader from "@/components/Other/Loader";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { graphqlbaseUrl } from "@/utils/constants";
import {
  DownloadSimple,
  User,
  ShareNetwork,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
// import { Image as NextImage } from "next/image";

interface VoucherPaymentProps {
  orderPlaced: boolean;
  selectedPaymentMethod: string;
  handlePaymentMethodChange: (event: ChangeEvent<HTMLInputElement>) => void;
  totalCart: number;
  onOrderComplete: () => void;
  handleProceed: () => void;
  selectedScheme: any;
}

interface VoucherTransactionResponse {
  id: string;
  code: string;
  occasion: string;
  amount: number;
  recipientName: string;
  recipientEmail: string;
  recipientMobile: string;
  senderName: string;
  message: string;
  templateUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  razorpayPaymentNo?: string;
  paymentMethod?: string;
}

const client = new ApolloClient({
  uri: graphqlbaseUrl,
  cache: new InMemoryCache(),
});

const CREATE_GIFT_VOUCHER = gql`
  mutation CreateGiftVoucher($input: CreateGiftVoucherInput!) {
    createGiftVoucher(input: $input) {
      id
      code
      occasion
      amount
      recipientName
      recipientEmail
      recipientMobile
      senderName
      message
      templateUrl
      status
      createdAt
      updatedAt
    }
  }
`;
const VoucherPayment: React.FC<VoucherPaymentProps> = ({
  orderPlaced,
  selectedPaymentMethod,
  handlePaymentMethodChange,
  totalCart,
  onOrderComplete,
  handleProceed,
  selectedScheme,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [transactionDetails, setTransactionDetails] =
    useState<VoucherTransactionResponse | null>(null);
  const cookieToken = localStorage.getItem("localtoken");
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    if (transactionDetails) {
      generateVoucherImage();
      handleWhatsappShare();
    }
  }, [transactionDetails]);

  const handleWhatsappShare = async () => {
    try {
      const response = await axios.post(
        "https://api.interakt.ai/v1/public/message/",
        {
          countryCode: "+91",
          phoneNumber: selectedScheme.recipientMobile,
          callbackData: "some text here",
          type: "Template",
          template: {
            name: "gift_voucher",
            languageCode: "en",
            headerValues: [selectedScheme.iconUrl],
            bodyValues: [
              transactionDetails && transactionDetails?.code,
              selectedScheme.totalAmount,
              selectedScheme.recipientName,
            ],
          },
        },
        {
          headers: {
            Authorization:
              "Basic V01sZ3EzMF94Q2Y5VkFnd0E5amZRMlR1Y2d4OFFqXzVROFRyR19ncGxaazo=",
          },
        },
      );
    } catch (error) {
      console.log("Error occured while sending Vocuher WhatsApp", error);
    }
  };
  const handleRazorpayPayment = async () => {
    setLoading(true);
    try {
      const orderUrl = "/api/razorpay";
      const response = await axios.post(orderUrl, { amount: totalCart * 100 });
      console.log(response);
      const { amount, id: order_id, currency } = response.data;

      const options = {
        key: process.env.NEXT_Razorpay_KEY,
        amount: amount.toString(),
        currency: currency,
        name: "WHP Jewellers",
        description: "Gift Voucher Transaction",
        order_id: order_id,
        handler: async function (response: any) {
          try {
            setLoading(true);
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;

            const { data } = await client.mutate({
              mutation: CREATE_GIFT_VOUCHER,
              variables: {
                input: {
                  occasion: selectedScheme.planName,
                  amount: amount / 100,
                  recipientName: selectedScheme.recipientName,
                  recipientEmail: selectedScheme.recipientEmail,
                  recipientMobile: selectedScheme.recipientMobile,
                  senderName: selectedScheme.senderName,
                  message: selectedScheme.message,
                  templateUrl: selectedScheme.iconUrl,
                },
              },
              context: {
                headers: {
                  Authorization: `Bearer ${cookieToken}`,
                },
              },
            });

            console.log("Gift voucher created:", data.createGiftVoucher);
            setTransactionDetails({
              ...data.createGiftVoucher,
              razorpayPaymentNo: razorpay_payment_id,
              paymentMethod: "Razorpay",
            });

            onOrderComplete();
          } catch (error) {
            console.error("Error creating gift voucher:", error);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: selectedScheme.recipientName || "Test Customer",
          email: selectedScheme.recipientEmail || "customer@example.com",
          contact: selectedScheme.recipientMobile || "9999999999",
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

  const generateVoucherImage = async () => {
    if (!transactionDetails || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageUrl = selectedScheme.iconUrl || "";

    // Load the voucher template image
    const img = new window.Image(); // Use the built-in Image constructor
    img.crossOrigin = "anonymous"; // This is needed if the image is hosted on a different domain
    img.src = imageUrl;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    // Set canvas size
    canvas.width = img.width;
    canvas.height = img.height + 60; // Extra space for the voucher code

    // Draw the original image
    ctx.drawImage(img, 0, 0);

    // Add a semi-transparent background for the text
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(0, img.height, canvas.width, 60);

    // Add the voucher code
    ctx.fillStyle = "black";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      `Voucher Code: ${transactionDetails.code}`,
      canvas.width / 2,
      img.height + 35,
    );

    // Convert canvas to blob
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve),
    );
    if (!blob) {
      console.error("Failed to create image blob");
      return null;
    }

    return URL.createObjectURL(blob);
  };

  const handleShareImage = async () => {
    const imageUrl = await generateVoucherImage();
    if (!imageUrl) {
      alert("Failed to generate voucher image");
      return;
    }

    // Convert blob URL to actual blob
    const blob = await fetch(imageUrl).then((r) => r.blob());

    // Create a File from the Blob
    const file = new File([blob], "voucher.png", { type: "image/png" });

    if (navigator.share && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: "My Gift Voucher",
          text: "Check out my gift voucher!",
          files: [file],
        });
      } catch (error) {
        console.error("Error sharing:", error);
        fallbackShare(imageUrl);
      }
    } else {
      fallbackShare(imageUrl);
    }
  };

  const fallbackShare = (imageUrl: string) => {
    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "voucher.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Provide instructions for manual sharing
    alert(
      "The voucher image has been downloaded. You can now manually share this image on WhatsApp or any other platform.",
    );
  };

  const handleDownloadReceipt = () => {
    if (!transactionDetails) return;

    const pageWidth = 120;
    const pageHeight = 210;

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
    pdf.text("Gift Voucher Receipt", pageWidth / 2, 40, { align: "center" });

    // Add date
    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text(
      `Date: ${new Date(transactionDetails.createdAt).toLocaleDateString()}`,
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

    // Add voucher details
    pdf.setFillColor(240, 240, 240);
    pdf.rect(10, 80, pageWidth - 20, 90, "F");

    pdf.setFontSize(10);
    pdf.setTextColor(0);
    pdf.text("Voucher Details", pageWidth / 2, 88, { align: "center" });

    const detailsStart = 96;
    const detailsGap = 8;
    pdf.setFontSize(8);
    pdf.setTextColor(50);

    const details = [
      { label: "Voucher Code:", value: transactionDetails.code },
      { label: "Occasion:", value: transactionDetails.occasion },
      { label: "Amount:", value: `₹${transactionDetails.amount.toFixed(2)}` },
      { label: "Recipient:", value: transactionDetails.recipientName },
      { label: "Recipient Email:", value: transactionDetails.recipientEmail },
      { label: "Recipient Mobile:", value: transactionDetails.recipientMobile },
      { label: "Sender:", value: transactionDetails.senderName },
      { label: "Status:", value: transactionDetails.status },
      {
        label: "Payment Method:",
        value: transactionDetails.paymentMethod || "N/A",
      },
      {
        label: "Transaction ID:",
        value: transactionDetails.razorpayPaymentNo || "N/A",
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
    pdf.text("Thank you for your purchase!", pageWidth / 2, pageHeight - 20, {
      align: "center",
    });

    pdf.save("gift_voucher_receipt.pdf");
  };

  const renderReceipt = () => {
    if (!transactionDetails) return null;

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
          />
          <h2 className="mt-2 text-xl font-bold text-gray-800">
            Gift Voucher Receipt
          </h2>
          <p className="text-sm text-gray-600">
            Date: {new Date(transactionDetails.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">WHP Jewellers</h3>
          <p className="text-sm text-gray-600">Phone: (123) 456-7890</p>
          <p className="text-sm text-gray-600">Email: info@whpjewellers.com</p>
        </div>

        <div className="mb-4 rounded-md bg-gray-100 p-4">
          <h4 className="text-md mb-2 font-semibold text-gray-800">
            Voucher Details
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-right text-gray-600">Voucher Code:</p>
            <p className="text-left font-medium text-gray-800">
              {transactionDetails.code}
            </p>
            <p className="text-right text-gray-600">Occasion:</p>
            <p className="text-left font-medium text-gray-800">
              {transactionDetails.occasion}
            </p>
            <p className="text-right text-gray-600">Amount:</p>
            <p className="text-left font-medium text-gray-800">
              ₹{transactionDetails.amount}
            </p>
            <p className="text-right text-gray-600">Recipient:</p>
            <p className="text-left font-medium text-gray-800">
              {transactionDetails.recipientName}
            </p>
            <p className="text-right text-gray-600">Recipient Email:</p>
            <p className="text-left font-medium text-gray-800">
              {transactionDetails.recipientEmail}
            </p>
            <p className="text-right text-gray-600">Recipient Mobile:</p>
            <p className="text-left font-medium text-gray-800">
              {transactionDetails.recipientMobile}
            </p>
            <p className="text-right text-gray-600">Sender:</p>
            <p className="text-left font-medium text-gray-800">
              {transactionDetails.senderName}
            </p>
            <p className="text-right text-gray-600">Status:</p>
            <p className="text-left font-medium text-gray-800">
              {transactionDetails.status}
            </p>
            <p className="text-right text-gray-600">Payment Method:</p>
            <p className="text-left font-medium text-gray-800">
              {transactionDetails.paymentMethod || "N/A"}
            </p>
            <p className="text-right text-gray-600">Transaction ID:</p>
            <p className="text-left font-medium text-gray-800">
              {transactionDetails.razorpayPaymentNo || "N/A"}
            </p>
          </div>
        </div>

        <p className="mb-4 text-sm text-gray-600">
          Thank you for your purchase!
        </p>
        <div className="flex flex-wrap justify-center space-x-4">
          <button
            onClick={handleDownloadReceipt}
            className="m-2 flex items-center rounded bg-blue-500 px-4 py-2 text-sm text-white transition duration-300 hover:bg-blue-600"
          >
            <DownloadSimple size={20} className="mr-2" />
            Download Receipt
          </button>
          <button
            onClick={handleShareImage}
            className="m-2 flex items-center rounded bg-green-500 px-4 py-2 text-sm text-white transition duration-300 hover:bg-green-600"
          >
            <ShareNetwork size={20} className="mr-2" />
            Share Voucher Image
          </button>
          <button
            onClick={() => router.push("/profile")}
            className="m-2 flex items-center rounded bg-gray-500 px-4 py-2 text-sm text-white transition duration-300 hover:bg-gray-600"
          >
            <User size={20} className="mr-2" />
            Profile
          </button>
        </div>
      </div>
    );
  };

  const isValidTotalCart = !isNaN(totalCart) && totalCart > 0;

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-5">
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {!transactionDetails ? (
        <>
          <h1 className="mb-2 text-xl font-semibold">Payment Method</h1>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-md border border-gray-200 p-4">
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
                className="h-4 w-4 cursor-pointer appearance-none rounded-full border-2 border-gray-400 checked:border-transparent checked:bg-red-600 focus:border-red-500 focus:outline-none"
                checked={selectedPaymentMethod === "razorpay"}
                onChange={handlePaymentMethodChange}
              />
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="mt-4 rounded bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-white"
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

export default VoucherPayment;
