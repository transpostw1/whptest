import React, { useState } from "react";
import Image from "next/image";
const ProfileGMS = () => {
  const [tabForScheme, setTabForScheme] = useState<string>("plan1");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const numberOfTimesIn1Scheme = 2;
  const numberOfTimesIn2Scheme = 6;
  const numberOfTimesIn3Scheme = 4;
  const totalNumber = 15;
  
  if (isLoading) {
    return (
      <div className="loading-container flex justify-center items-center h-full">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
    );
  }
  return (
    <div className="p-[60px] ">
      <div className="flex justify-between">
        <div
          className={`mr-1 border px-4 py-2 cursor-pointer  ${
            tabForScheme === "plan1" ? "bg-[#e21678] text-white" : ""
          }`}
          onClick={() => setTabForScheme("plan1")}
        >
          plan1
        </div>
        <div
          className={`mr-1 border px-4 py-2 cursor-pointer  ${
            tabForScheme === "plan2" ? "bg-[#e21678] text-white" : ""
          }`}
          onClick={() => setTabForScheme("plan2")}
        >
          plan2
        </div>
        <div
          className={`mr-1 border px-4 py-2 cursor-pointer  ${
            tabForScheme === "plan3" ? "bg-[#e21678] text-white" : ""
          }`}
          onClick={() => setTabForScheme("plan3")}
        >
          plan3
        </div>
      </div>
      {tabForScheme === "plan1" && (
        <div className="p-[40px]">
          <p className="mt-4">
            Total Installment Paid:{numberOfTimesIn1Scheme}
          </p>
          <p className="mt-4">
            Number of Installment Remaining:{6 - numberOfTimesIn1Scheme}
          </p>
          <p className="mt-4">Total Amount Paid:₹10,000</p>
          <p className="mt-4">Equivalent Gold Per Grams:1.2</p>

          <div className="flex mt-4">
            {Array.from({ length: numberOfTimesIn1Scheme }, (_, index) => (
              <div
                key={index}
                className="text-transparent bg-green-400 h-[5px] w-[30px] mr-4 rounded-sm"
              >
                1
              </div>
            ))}
            {Array.from({ length: 6 - numberOfTimesIn1Scheme }, (_, index) => (
              <div
                key={index}
                className="text-transparent bg-slate-300 h-[5px] w-[30px] mr-4 rounded-sm"
              >
                1
              </div>
            ))}
          </div>
          <p className="mt-4">Next Installment :₹2,000</p>
          <button className="bg-[#e21678] px-4 py-2 text-white mt-4">
            Pay Now
          </button>
        </div>
      )}
      {tabForScheme === "plan2" && (
        <div className="p-[40px]">
          <p className="mt-4">
            Number of Installment Paid:{numberOfTimesIn2Scheme}
          </p>
          <p className="mt-4">
            Number of Installment Remaining:{10 - numberOfTimesIn2Scheme}
          </p>
          <p className="mt-4">Total Amount Paid:₹10,000</p>
          <p className="mt-4">Equivalent Gold Per Grams:1.2</p>

          <div className="flex mt-4">
            {Array.from({ length: numberOfTimesIn2Scheme }, (_, index) => (
              <div
                key={index}
                className="text-transparent bg-green-400 h-[5px] w-[30px] mr-4 rounded-sm"
              >
                1
              </div>
            ))}
            {Array.from({ length: 10 - numberOfTimesIn2Scheme }, (_, index) => (
              <div
                key={index}
                className="text-transparent bg-slate-300 h-[5px] w-[30px] mr-4 rounded-sm"
              >
                1
              </div>
            ))}
          </div>
          <p className="mt-4">Next Installment :₹2,000</p>
          <button className="bg-[#e21678] px-4 py-2 text-white mt-4">
            Pay Now
          </button>
        </div>
      )}
      {tabForScheme === "plan3" && (
        <div className="p-[40px]">
          <p className="mt-4">
            Total Installment Paid:{numberOfTimesIn3Scheme}
          </p>
          <p className="mt-4">
            Number of Installment Remaining:{12 - numberOfTimesIn3Scheme}
          </p>
          <p className="mt-4">Total Amount Paid:₹10,000</p>
          <p className="mt-4">Equivalent Gold Per Grams:1.2</p>

          <div className="flex mt-4">
            {Array.from({ length: numberOfTimesIn3Scheme }, (_, index) => (
              <div
                key={index}
                className="text-transparent bg-green-400 h-[5px] w-[30px] mr-4 rounded-sm"
              >
                1
              </div>
            ))}
            {Array.from({ length: 12 - numberOfTimesIn3Scheme }, (_, index) => (
              <div
                key={index}
                className="text-transparent bg-slate-300 h-[5px] w-[30px] mr-4 rounded-sm"
              >
                1
              </div>
            ))}
          </div>
          <p className="mt-4">Next Installment :₹2,000</p>
          <button className="bg-[#e21678] px-4 py-2 text-white mt-4">
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileGMS;
