import React, { useState, useCallback } from "react";
import PieChart from "./PieChart";
import Link from "next/link";
import useEnroll from "@/hooks/useEnroll";
import ModalExchange from "@/components/Other/ModalExchange";
import { useRouter } from "next/navigation";
import {useCurrency} from "@/context/CurrencyContext"
interface SilverCardProps {
  setBackendMessage: (message: string) => void;
  setBackendError: (error: string) => void;
  setFlashType: (type: "success" | "error" | "info") => void;
}

const SilverCard: React.FC<SilverCardProps> = ({
  setBackendMessage,
  setBackendError,
  setFlashType,
}) => {
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(500);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState<string>("500");
  const numberOfMonths = 11;
  const totalAmount = monthlyDeposit * numberOfMonths;
  const redemptionAmount = totalAmount + monthlyDeposit * 0.8;
  const {formatPrice}=useCurrency();

  const router = useRouter();

  const handleEnrollSuccess = useCallback(
    (enrollmentId: number, schemeType: string, amount: number) => {
      // console.log(
      //   "Enrollment success callback triggered",
      //   enrollmentId,
      //   schemeType,
      //   amount
      // );
      sessionStorage.setItem(
        "selectedScheme",
        JSON.stringify({
          enrollmentId: enrollmentId,
          planName: "Silver",
          monthlyAmount: amount,
          totalAmount: amount * numberOfMonths,
          iconUrl: "/images/silver-icon.png",
          schemeType: "gms",
        }),
      );

      console.log("Navigating to /digitalCheckout");
      router.push("/digitalCheckout");
    },
    [numberOfMonths, router],
  );

  const { handleEnroll, loading } = useEnroll({
    setBackendMessage,
    setBackendError,
    setFlashType,
    handleEnrollSuccess,
  });

  const handleInputVerification = async () => {
    if (monthlyDeposit < 500) {
      setShowModal(true);
    } else {
      console.log("Enrolling with amount:", monthlyDeposit);
      try {
        const enrollmentId = await handleEnroll("silver", monthlyDeposit);
        if (enrollmentId) {
          handleEnrollSuccess(enrollmentId, "silver", monthlyDeposit);
        }
      } catch (error) {
        console.error("Error during enrollment:", error);
        setBackendError("Failed to enroll. Please try again.");
        setFlashType("error");
      }
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
    <div className="h-full rounded-xl bg-[#edebed] p-4 md:p-0">
      <h3 className="mr-2 pt-2 text-end font-semibold text-[#E26178]">
        Silver
      </h3>
      <h1 className="text-center text-2xl font-semibold">
        BENEFIT CALCULATOR FOR SILVER
      </h1>
      <div className="mx-4 flex flex-col items-center justify-evenly gap-3 lg:flex-row">
        <div className="mt-7 flex w-full flex-col justify-between text-start md:w-auto">
          <div className="mt-2 flex items-center justify-center">
            <PieChart
              totalAmount={totalAmount}
              redemptionAmount={redemptionAmount}
              monthlyDeposit={monthlyDeposit}
            />
          </div>
        </div>
        <div className="mt-7 flex w-full flex-col justify-between gap-4 px-4 font-medium md:w-96 md:gap-6">
          <h1 className="font-medium">
            Slide or enter monthly installment amount
          </h1>
          <div className="mb-5 text-center md:mb-0">
            <div className="mb-2 flex h-10 items-center justify-center rounded border border-gray-700 bg-white p-2">
              <div className="flex w-full items-center justify-start">
                <span className="text-2xl md:text-3xl">₹</span>
                <input
                  type="number"
                  className="remove-arrows mx-2 w-32 text-center text-2xl font-bold md:w-32 md:text-3xl"
                  value={monthlyDeposit}
                  onChange={handleChange}
                  min="500"
                  max="50000"
                  step="500"
                />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <input
                type="range"
                min={500}
                max={50000}
                step={500}
                value={monthlyDeposit}
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
              <h1 className="">{formatPrice(totalAmount)}</h1>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-start">
              <h1>80% Discount on 12th installment</h1>
            </div>
            <div>
              <h1>{formatPrice(monthlyDeposit * 0.8)}</h1>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-full text-start md:w-52">
              <h1>Buy any silver worth: (after 11th month)</h1>
            </div>
            <div>
              <h1 className="text-sm text-[#E26178] md:text-3xl">
                {formatPrice(redemptionAmount)}
              </h1>
            </div>
          </div>
          <div className="mb-3 flex flex-col text-center">
            <div>
              <div
                className="mb-2 w-full cursor-pointer rounded-lg bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-1 text-center text-white"
                onClick={handleInputVerification}
              >
                {loading ? "Enrolling..." : "Enroll Now"}
              </div>
            </div>
            <div>
              <Link
                className="w-full cursor-pointer rounded-xl text-start text-sm text-black underline"
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
          <div className="mt-4 flex justify-center">
            <button
              className="rounded bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-white"
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

export default SilverCard;
