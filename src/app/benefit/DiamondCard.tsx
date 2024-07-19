import React, { useState } from "react";
import PieChart from "./PieChart";
import Link from "next/link";
import useEnroll from "@/hooks/useEnroll";
import ModalExchange from "@/components/Other/ModalExchange";
import { useRouter } from "next/navigation";

interface DiamondCardProps {
  setBackendMessage: (message: string) => void;
  setBackendError: (error: string) => void;
  setFlashType: (type: "success" | "error" | "info") => void;
}

const DiamondCard: React.FC<DiamondCardProps> = ({
  setBackendMessage,
  setBackendError,
  setFlashType,
}) => {
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(500);
  const [error, setError] = useState<string | null>(null);
  const [errorModal, setErrorModal] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const numberOfMonths = 11;
  const totalAmount = monthlyDeposit * numberOfMonths;
  const redemptionAmount = totalAmount + monthlyDeposit * 1;

  const router = useRouter();

  const handleEnrollSuccess = () => {
    console.log("Enrollment success callback triggered");
    sessionStorage.setItem(
      "selectedScheme",
      JSON.stringify({
        planName: "Diamond",
        monthlyAmount: monthlyDeposit,
        totalAmount: totalAmount,
        iconUrl: "/images/diamond-icon.png",
      })
    );

    // Navigate to the DigitalCheckout component
    router.push("/digitalCheckout");
    console.log("Navigation to /digital-checkout triggered");
  };

  const { handleEnroll, loading } = useEnroll({
    setBackendMessage,
    setBackendError,
    setFlashType,
    handleEnrollSuccess,
  });

  const handleInputVerification = () => {
    if (monthlyDeposit < 500) {
      setErrorModal(true);
    } else {
      console.log("Enrolling with amount:", monthlyDeposit);
      handleEnroll("diamond", monthlyDeposit);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      setError("Invalid input. Please enter a number.");
    } else if (parsedValue > 50000) {
      setError("Maximum deposit is 50000");
    } else {
      setMonthlyDeposit(parsedValue);
      setError(null);
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
      <div className="flex flex-col lg:flex-row justify-evenly gap-3 items-center mx-4">
        <div className="flex flex-col justify-between text-start mt-7 w-full md:w-auto">
          <div className="flex justify-center items-center mt-2">
            <PieChart
              totalAmount={totalAmount}
              redemptionAmount={redemptionAmount}
              monthlyDeposit={monthlyDeposit}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between px-4 md:gap-6 gap-4 mt-7 md:w-96 w-full font-medium">
          <h1 className="font-medium">
            Slide or enter monthly installment amount
          </h1>
          <div className="mb-5 md:mb-0 text-center">
            <div className="flex items-center justify-center rounded p-2 border border-gray-700 bg-white mb-2 h-10">
              <div className="flex items-center justify-start w-full">
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
          </div>
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
              <h1>100% Discount on 12th installment</h1>
            </div>
            <div>
              <h1>₹{(monthlyDeposit * 1).toLocaleString("en-IN")}</h1>
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
          <div className="mb-3 flex flex-col text-center">
            <div>
              <div
                className=" bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-white text-center p-1 rounded-lg w-full cursor-pointer mb-2 "
                onClick={() => handleInputVerification()}
              >
                {loading ? "Enrolling..." : "Enroll Now"}
              </div>
            </div>
            <div>
              <Link
                className=" text-black underline text-start text-sm rounded-xl w-full cursor-pointer "
                href={"/terms-and-condition"}
              >
                T&C apply*
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ModalExchange show={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center">
          <p>Minimum Deposit is 500</p>
          <div className="flex justify-center mt-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </ModalExchange>
    </div>
  );
};

export default DiamondCard;
