import React, { useState } from "react";
import PieChart from "./PieChart";
import instance from "@/utils/axios";
import { baseUrl, gms } from "@/utils/constants";
import Cookies from "js-cookie";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

const GoldCard: React.FC = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(2000);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [backendMessage, setBackendMessage] = useState<string | null>(null);
  const numberOfMonths = 11;
  const totalAmount = monthlyDeposit * numberOfMonths;
  const redemptionAmount = totalAmount + monthlyDeposit * 0.5;
  const cookieToken = Cookies.get("localtoken");
  const { isLoggedIn } = useUser();
  const router = useRouter();

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
  if (!isLoggedIn) {
    setLoading(true);
    router.push("/login");
    return;
  }

  try {
    setLoading(true);
    setBackendError(null); // Clear any previous backend errors
    const response = await instance.post(
      `${baseUrl}${gms}`,
      {
        schemeType: "gold",
        amount: monthlyDeposit,
      },
      {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      }
    );

    console.log("Enrollment successful", response.data);
    setBackendMessage(response.data.message); // Set the success message
  } catch (error) {
    console.error("Error during enrollment", error);
    setBackendError("Failed to enroll. Please try again later."); // Set the backend error message
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-[#ebe3d5] h-full rounded-xl p-4 md:p-0 relative">
      {loading && (
        <div className="absolute inset-0 bg-black w-screen bg-opacity-55 backdrop-blur-sm flex justify-center items-center z-10">
          <Image src="/dummy/loader.gif" alt="loader" height={50} width={50} />
        </div>
      )}
      <h3 className="font-semibold text-end mr-2 pt-2 text-[#E26178]">Gold</h3>
      <h1 className="text-center text-2xl font-semibold">
        BENEFIT CALCULATOR FOR GOLD
      </h1>
      <div className="flex flex-col lg:flex-row justify-center gap-3 items-start mx-4">
        <div className="flex flex-col justify-between text-start mt-7 w-full md:w-auto">
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
            <div style={{ textAlign: "center" }}>
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
        <div className="flex flex-col justify-between px-4 md:gap-8 gap-4 mt-7 md:w-96 w-full font-medium">
          <div className="flex justify-between">
            <div className="text-start">
              <h1>Your total payment</h1>
            </div>
            <div>
              <h1 className="">₹{totalAmount.toLocaleString("en-IN")}</h1>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-start">
              <h1>50% Discount on 12th installment</h1>
            </div>
            <div>
              <h1>₹{(monthlyDeposit * 0.5).toLocaleString("en-IN")}</h1>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-start w-full md:w-52">
              <h1>Buy any gold worth: (after 11th month)</h1>
            </div>
            <div>
              <h1 className="md:text-3xl text-sm text-[#E26178]">
                ₹{redemptionAmount.toLocaleString("en-IN")}
              </h1>
            </div>
          </div>
          <div>
            <div
              className="bg-gradient-to-r to-[#815fc8] via-[#fa4ea7] from-[#E26178] text-white text-center  p-1 rounded-lg w-full cursor-pointer"
              onClick={handleEnroll}
            >
              {loading ? "Enrolling..." : "Enroll Now"}
            </div>
            {backendMessage && (
              <p className="text-green-500 mt-2">{backendMessage}</p>
            )}
            {backendError && (
              <p className="text-red-500 mt-2">{backendError}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldCard;
