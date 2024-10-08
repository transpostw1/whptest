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
    <>
      <div className="flex justify-center">
        <div className="my-4 flex w-full justify-between overflow-hidden rounded-lg bg-pink-100 shadow-md md:w-[700px]">
          <div className="flex w-full flex-col items-start md:flex-row md:items-center">
            <div className="flex w-full items-center justify-center bg-blue-950 p-4">
              <div className="text-4xl text-white">
                {selectedTemplateUrl ? (
                  <Image
                    width={400}
                    height={300}
                    className="h-[250px] w-full object-fill object-center"
                    src={selectedTemplateUrl}
                    alt="Selected Template"
                    unoptimized
                  />
                ) : (
                  <Image
                    width={400}
                    height={300}
                    className="h-[250px] w-full object-fill object-center"
                    src="/images/other/GemStone1.png"
                    alt="Default Image"
                  />
                )}
                <div className="bg-blue-100 p-2 text-center">
                  <p className="text-lg font-semibold text-black">
                    {occasion || "Occasion"}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-red-500">FOR</p>
              <p className="text-lg font-semibold">{recipientName}</p>
              <p className="text-sm">{recipientEmail}</p>
              <p className="text-sm">{recipientMobile}</p>
              <p className="mt-4 text-sm text-red-500">Worth</p>
              <p className="text-lg font-semibold text-red-500">
                {currency == "INR"
                  ? `₹${amount}`
                  : currency == "USD"
                    ? `$${amount}`
                    : `€${amount}`}
              </p>
              <p className="mt-4 text-sm text-red-500">MESSAGE</p>
              <p className="text-sm italic">"{message}"</p>
              <p className="mt-4 text-sm text-red-500">FROM</p>
              <p className="text-lg font-semibold">{senderName}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
