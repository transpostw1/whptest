import React, { useState } from "react";
import PieChart from "./PieChart";
import instance from "@/utils/axios";
import { baseUrl, gms } from "@/utils/constants";
import Cookies from "js-cookie";

const DiamondCard: React.FC = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(2000);
  const [error, setError] = useState<string | null>(null);
  const numberOfMonths = 11;
  const totalAmount = monthlyDeposit * numberOfMonths;
  const redemptionAmount = totalAmount + monthlyDeposit;
  const cookieToken = Cookies.get("localtoken");

  const handleIncrement = () => {
    if (monthlyDeposit % 1000 !== 0) {
      setError("Amount must be a multiple of 1000");
      return;
    }
    if (monthlyDeposit + 1000 <= 50000) {
      setMonthlyDeposit((prev) => prev + 1000);
      setError(null);
    }
  };

  const handleDecrement = () => {
    if (monthlyDeposit % 1000 !== 0) {
      setError("Amount must be a multiple of 1000");
      return;
    }
    if (monthlyDeposit - 1000 >= 2000) {
      setMonthlyDeposit((prev) => prev - 1000);
      setError(null);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value)) {
      setMonthlyDeposit(2000);
      setError("Invalid input. Setting to default.");
    } else {
      const newValue = Math.floor(value / 1000) * 1000;
      if (newValue < 2000) {
        setMonthlyDeposit(2000);
        setError("Minimum deposit is 2000");
      } else if (newValue > 50000) {
        setMonthlyDeposit(50000);
        setError("Maximum deposit is 50000");
      } else {
        setMonthlyDeposit(newValue);
        setError(null);
      }
    }
  };

const handleEnroll = async () => {
  try {
    const response = await instance.post(
      `${baseUrl}${gms}`,
      {
        schemeType: "diamond",
        amount: monthlyDeposit, 
      },
      {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      }
    );

    console.log("Enrollment successful", response.data);
  } catch (error) {
    console.error("Error during enrollment", error);
  }
};
  return (
    <div className="bg-[#d0e1e2] h-full rounded-xl p-4 md:p-0">
      <h3 className="font-semibold text-end mr-2 pt-2 text-[#E26178]">
        Diamond
      </h3>
      <h1 className="text-center text-2xl font-semibold">
        BENEFIT CALCULATOR FOR DIAMOND
      </h1>
      <div className="flex flex-col lg:flex-row justify-between items-start mx-4">
        <div className="flex flex-col justify-between mt-7 w-full md:w-auto">
          <h1 className="font-medium">
            Slide or enter monthly Installment amount
          </h1>
          <div className="mb-5 md:mb-0 text-center">
            <div className="flex items-center justify-center rounded p-2 border border-gray-700 bg-white mb-2 h-10">
              <div className="flex items-center justify-between w-full">
                <div>
                  <span className="text-2xl md:text-3xl">₹</span>
                  <input
                    type="number"
                    className="text-2xl md:text-3xl font-bold mx-2 w-32 md:w-32 text-center remove-arrows"
                    value={monthlyDeposit}
                    onChange={handleChange}
                    min="2000"
                    max="50000"
                    step="1000"
                  />
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center", accentColor: "##E26178" }}>
              <input
                type="range"
                min={1000}
                max={50000}
                step={1000}
                className="w-full"
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-center items-center mt-12">
              <PieChart
                totalAmount={totalAmount}
                redemptionAmount={redemptionAmount}
                monthlyDeposit={monthlyDeposit}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between px-4 md:gap-8 gap-4 mt-7 md:w-96 w-52 font-medium ">
          <div className="flex justify-between">
            <div className="text-start">
              <h1>Your total payment</h1>
            </div>
            <div>
              <h1 className="line-through">
                ₹{totalAmount.toLocaleString("en-IN")}
              </h1>
              {/* <h1>₹{redemptionAmount.toLocaleString("en-IN")}</h1> */}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-start">
              <h1>100% Discount on 11th installment</h1>
            </div>
            <div>
              <h1>₹{monthlyDeposit.toLocaleString("en-IN")}</h1>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-start w-full md:w-52">
              <h1>Buy any diamond worth: (after 11th month)</h1>
            </div>
            <div>
              <h1 className="text-3xl text-[#E26178]">
                ₹{redemptionAmount.toLocaleString("en-IN")}
              </h1>
            </div>
          </div>
          <div
            className="bg-[#E26178] text-center p-1 rounded-lg w-full cursor-pointer"
            onClick={handleEnroll}
          >
            Enroll Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiamondCard;
