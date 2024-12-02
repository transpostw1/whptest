import React, { useState, useEffect,useCallback } from "react";
import PieChart from "./PieChart";
import Link from "next/link";
import useEnroll from "@/hooks/useEnroll";
import ModalExchange from "@/components/Other/ModalExchange";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";
import { useUser } from "@/context/UserContext";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";
import SmallScreenModal from "@/components/Other/SmallScreenModal";
interface DiamondCardProps {
  percentage: number;
  setBackendMessage: (message: string) => void;
  setBackendError: (error: string) => void;
  setFlashType: (type: "success" | "error" | "info") => void;
}

const DiamondCard: React.FC<DiamondCardProps> = ({
  percentage,
  setBackendMessage,
  setBackendError,
  setFlashType,
}) => {
  const { formatPrice } = useCurrency();
  const [monthlyDeposit, setMonthlyDeposit] = useState<any>(500);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [responseFromPanVerificationApi, setResponseFromPanVerificationApi] =
    useState(false);
  const [inputValue, setInputValue] = useState<string>("500");
  const numberOfMonths = 11;
  const totalAmount = monthlyDeposit * numberOfMonths;
  const discountAmount = monthlyDeposit * (percentage / 100);
  const redemptionAmount = totalAmount + discountAmount;
  const { userDetails } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleEnrollSuccess = useCallback(
    (enrollmentId: number, schemeType: string, amount: number) => {
      sessionStorage.setItem(
        "selectedScheme",
        JSON.stringify({
          enrollmentId,
          planName: schemeType,
          monthlyAmount: amount,
          totalAmount: amount * numberOfMonths,
          iconUrl: "/images/diamond-icon.png",
          schemeType: "gms",
        })
      );
      router.push("/digitalCheckout");
    },
    [numberOfMonths, router]
  );

  
  const { handleEnroll, loading } = useEnroll({
    setBackendMessage,
    setBackendError,
    setFlashType,
    handleEnrollSuccess,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const rawValue: any = event.target.value.replace(/,/g, "");
    if (parseInt(rawValue) >= 500 && parseInt(rawValue) <= 50000) {
      setMonthlyDeposit(new Intl.NumberFormat().format(rawValue));
    }
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

  const handleInputVerification = async () => {
    if (monthlyDeposit < 500) {
      setShowModal(true);
      return;
    }
  
    if (!userDetails?.pan) {
      setBackendError("PAN not available. Please update your profile.");
      setFlashType("error");
      return;
    }
  
    try {
      console.log("Enrolling with amount:", monthlyDeposit);
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });
  
      const VERIFY_PAN = gql`
        mutation verifyPAN($verifyPanInput: CheckCustomerVerifiedInput!) {
          verifyPAN(verifyPanInput: $verifyPanInput) {
            success
            message
          }
        }
      `;
      const { data } = await client.mutate({
        mutation: VERIFY_PAN,
        variables: {
          verifyPanInput: {
            pan_number: userDetails.pan,
            name: userDetails.firstname,
          },
        },
        fetchPolicy: "no-cache",
      });
  
      const panVerificationSuccess = data?.verifyPAN?.success;
  
      if (panVerificationSuccess) {
        setBackendMessage("PAN verified successfully!");
        setFlashType("success");
  
        const enrollmentId = await handleEnroll("Gold", monthlyDeposit);
        if (enrollmentId) {
          handleEnrollSuccess(enrollmentId, "Gold", monthlyDeposit);
        } else {
          setShowModal(true);
        }
      } else {
        sessionStorage.setItem(
          "selectedScheme",
          JSON.stringify({
            enrollmentId: null,
            planName: "Diamond",
            monthlyAmount: monthlyDeposit,
            totalAmount: monthlyDeposit * numberOfMonths,
            iconUrl:  "/images/diamond-icon.png",
            schemeType: "gms",
          })
        );
        setBackendError("PAN verification failed. Please update PAN.");
        setFlashType("error");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error during enrollment:", error);
      setBackendError("Failed to enroll. Please try again.");
      setFlashType("error");
      setShowModal(true);
    }
  };
  
  const handleproceedpan = () => {
    console.log("proceedpan")
    setShowModal(false)
    router.push("/panverification")
  };
  return (
    <div className="h-full rounded-xl bg-[#d0e1e2] p-4 md:p-0">
      <h3 className="mr-2 pt-2 text-end font-semibold text-[#E26178]">
        Diamond
      </h3>
      <h1 className="text-center text-2xl font-semibold">
        BENEFIT CALCULATOR FOR DIAMOND
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
              <h1>{percentage}% Discount on 12th installment</h1>
            </div>
            <div>
              <h1>{formatPrice(discountAmount)}</h1>{" "}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-full text-start md:w-52">
              <h1>Buy any gold worth: (after 11th month)</h1>
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
                onClick={() => handleInputVerification()}
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
      {isSmallScreen ? (
        <SmallScreenModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onVerify={handleproceedpan}
        />
      ) : (
        <ModalExchange show={showModal} onClose={() => setShowModal(false)}>
          <div className="text-center font-medium ">
            <p>Pan Verification is Not Completed</p>
            <p>Kindly Complete Your Pan Verification</p>
            <div className="mt-4 flex justify-center gap-3 font-normal">
              <button
                className="py-1y w-32 rounded bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-1 text-white"
                onClick={() => handleproceedpan()}
              >
                Verify Now
              </button>
              <button
                className="w-32 rounded bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-1 py-1 text-white"
                onClick={() => setShowModal(false)}
              >
                Later
              </button>
            </div>
          </div>
        </ModalExchange>
      )}
    </div>
  );
};

export default DiamondCard;
