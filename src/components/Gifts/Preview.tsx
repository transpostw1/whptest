import React from "react";
import Image from "next/image";
import { useCurrency } from "@/context/CurrencyContext";

interface PreviewProps {
  recipientName: string;
  recipientEmail: string;
  recipientMobile: string;
  confirmEmail: string;
  message: string;
  senderName: string;
  amount: number;
  occasion: string;
  selectedTemplateUrl: string | null;
}

const Preview: React.FC<PreviewProps> = ({
  recipientName,
  recipientEmail,
  recipientMobile,
  confirmEmail,
  message,
  senderName,
  amount,
  occasion,
  selectedTemplateUrl,
}) => {
  const { currency } = useCurrency();

  return (
    <div className="flex justify-center">
      <div className="relative my-6 w-full overflow-hidden rounded-lg bg-white shadow-xl md:w-[700px]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] opacity-30"></div>
        <div className="relative flex flex-col md:flex-row">
          {/* Left Image Section */}
          <div className="flex w-full md:w-1/2 items-center">
            {selectedTemplateUrl ? (
              <Image
                width={400}
                height={300}
                className="h-[250px] w-full object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
                src={selectedTemplateUrl}
                alt="Selected Template"
                unoptimized
              />
            ) : (
              <Image
                width={400}
                height={300}
                className="h-[250px] w-full object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
                src="/images/other/GemStone1.png"
                alt="Default Image"
                unoptimized
              />
            )}
          </div>

          {/* Right Content Section */}
          <div className="flex flex-col justify-between p-6 space-y-6 md:w-1/2">
            <div>
              <div className="bg-blue-50 py-2 text-center rounded-md shadow-sm">
                <p className="text-lg font-semibold text-purple-800">
                  {occasion || "Occasion"}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-500">FOR</p>
                <p className="text-lg font-bold text-gray-800">{recipientName}</p>
                <p className="text-sm text-gray-500">{recipientEmail}</p>
                <p className="text-sm text-gray-500">{recipientMobile}</p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-500">Worth</p>
                <p className="text-2xl font-extrabold text-red-600">
                  {currency === "INR"
                    ? `₹${amount.toLocaleString("en-IN")}`
                    : currency === "USD"
                    ? `$${amount.toLocaleString("en-US")}`
                    : `€${amount.toLocaleString("en-IN")}`}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">MESSAGE</p>
              <p className="text-sm italic text-gray-700">"{message}"</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">FROM</p>
              <p className="text-lg font-bold text-gray-800">{senderName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
