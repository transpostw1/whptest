"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Occasion from "@/components/Gifts/Occasion";
import Templates from "@/components/Gifts/Templates";
import Amount from "@/components/Gifts/Amount";
import Delivery from "@/components/Gifts/Delivery";
import Preview from "@/components/Gifts/Preview";
import Loader from "@/components/Other/Loader";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { baseUrl, voucher, graphqlbaseUrl } from "@/utils/constants";
import { useCurrency } from "@/context/CurrencyContext";

const steps = [
  "Select an Occasion",
  "Pick a Template",
  "Amount",
  "Delivery Details",
  "Preview and Pay",
];

const Gifts = () => {
  const router = useRouter();
  const { currency } = useCurrency();
  const { isLoggedIn } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientMobile: "",
    recipientEmail: "",
    confirmEmail: "",
    message: "",
    amount: 0,
    occasion: "",
    senderName: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState<string>("");
  const [isOccasionSelected, setIsOccasionSelected] = useState<boolean>(false);
  const [isTemplateSelected, setIsTemplateSelected] = useState<boolean>(false);
  const [isAmountSelected, setIsAmountSelected] = useState<boolean>(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null,
  );
  const [selectedTemplateUrl, setSelectedTemplateUrl] = useState<string | null>(
    null,
  );
  const [voucherData, setVoucher] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = new ApolloClient({
          uri: graphqlbaseUrl,
          cache: new InMemoryCache(),
        });
        const GetAllVoucher = gql`
          query GetAllVoucher {
            getAllVoucher {
              id
              name
              thumbnailImage
              templateImage
            }
          }
        `;
        const { data } = await client.query({
          query: GetAllVoucher,
        });
        setVoucher(data.getAllVoucher);
      } catch (error) {
        console.log("Error in fetching SubBanners", error);
      }
    };
    fetchData();
  }, []);

  const handleOccasionSelect = (occasion: string, voucherId: number) => {
    setFormData((prevData: any) => ({ ...prevData, occasion }));
    setIsOccasionSelected(true);
    setSelectedOccasion(occasion);
    setSelectedTemplateId(voucherId);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isStepValid = () => {
    if (currentStep === 3) {
      const {
        recipientName,
        recipientMobile,
        recipientEmail,
        confirmEmail,
        message,
        senderName,
      } = formData;
      if (
        !recipientName ||
        !recipientMobile ||
        !recipientEmail ||
        !confirmEmail ||
        !message ||
        !senderName ||
        recipientEmail !== confirmEmail
      ) {
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 0 && !isOccasionSelected) {
      setError("Please select an occasion.");
    } else if (currentStep === 1 && !isTemplateSelected) {
      setError("Please select a template.");
    } else if (
      currentStep === 2 &&
      (formData.amount <= 0 || !isAmountSelected)
    ) {
      setError("Please enter a valid amount.");
    } else if (currentStep === 3 && !isStepValid()) {
      setError("Please fill in all the details correctly.");
    } else {
      setError("");
      setCurrentStep((prevStep) => prevStep + 1); // Move to the next step
    }
  };
  const handlePrevious = () => {
    setError("");
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleStepClick = (index: number) => {
    if (currentStep === 0 && !isOccasionSelected) {
      setError("Please select an occasion.");
    } else if (currentStep === 1 && !isTemplateSelected) {
      setError("Please select a template.");
    } else if (
      currentStep === 2 &&
      (formData.amount <= 0 || !isAmountSelected)
    ) {
      setError("Please enter a valid amount.");
    } else if (currentStep === 3 && !isStepValid()) {
      setError("Please fill in all the details correctly.");
    } else if (index > currentStep + 1) {
      setError("Please complete the current step first.");
    } else {
      setError("");
      setCurrentStep(index);
    }
  };

  const handleProceedToPay = () => {
    setIsLoading(true);
    if (!isLoggedIn) {
      localStorage.setItem("redirectPath", "/gifts");
      router.push("/register");
      setIsLoading(false);
      return;
    }
    let payableAmount;
    if (currency == "USD") {
      payableAmount = Math.round(formData.amount * 83.7);
    } else if (currency == "EUR") {
      payableAmount = Math.round(formData.amount * 90.7);
    } else {
      payableAmount = formData.amount;
    }
    const voucherDetails = {
      enrollmentId: null,
      planName: formData.occasion,
      monthlyAmount: null,
      totalAmount: payableAmount,
      balanceAmount: payableAmount,
      iconUrl: selectedTemplateUrl,
      schemeType: "voucher",
      recipientName: formData.recipientName,
      recipientEmail: formData.recipientEmail,
      recipientMobile: formData.recipientMobile,
      message: formData.message,
      senderName: formData.senderName,
    };
    sessionStorage.setItem("selectedScheme", JSON.stringify(voucherDetails));
    router.push("/digitalCheckout");
    setIsLoading(false);
  };

  const handleTemplateSelect = (templateUrl: string) => {
    setSelectedTemplateUrl(templateUrl);
    setIsTemplateSelected(true);
    setCurrentStep((prevStep) => prevStep + 1); 
  };
  const handleAmountChange = (amount: number) => {
    setIsAmountSelected(true);
    setFormData((prevData) => ({ ...prevData, amount }));
  };
  const handleDeliveryComplete = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const completedSteps = steps.slice(0, currentStep);
  const remainingSteps = steps.slice(currentStep + 1);
  const stepCount = currentStep + 1;

  return (
    <>
      <head>
        <title>Gifts</title>
        <meta name="gifts" content={"Gifting WHP"} />
      </head>
      <div className="mx-2 md:mx-1">
        <div className="bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-white py-2 text-center">
          <h1 className="py-2 font-medium">GIFT CARDS</h1>
          <h3 className="text-3xl font-semibold">
            For what your loved ones love!
          </h3>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex lg:mx-48">
            {/* <div className="hidden p-4 lg:block">
            <div className="h-full w-0.5 bg-red-500"></div>
          </div> */}
            <div className="mt-3 flex w-full flex-col justify-between">
              <div className="flex items-end justify-between gap-1">
                <div>
                  <div className="flex flex-col items-start">
                    {completedSteps.map((step, index) => (
                      <div
                        key={index}
                        className="mb-2 flex gap-3 py-2 text-gray-400"
                      >
                        <div className="font-bold">{index + 1}</div>
                        {step}
                      </div>
                    ))}
                    <div className="p-1 text-lg text-black md:px-4">
                      {steps[currentStep]}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {currentStep > 0 && (
                    <button
                      className="bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-2 py-2 text-white md:px-4"
                      onClick={handlePrevious}
                    >
                      PREVIOUS
                    </button>
                  )}
                  {currentStep === 2 && 4 && (
                    <button
                      className="bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-2 py-2 text-white md:px-4"
                      onClick={handleNext}
                    >
                      NEXT
                    </button>
                  )}
                  {currentStep === steps.length - 1 && (
                    <button
                      className="bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] text-white md:px-4 md:py-2"
                      onClick={handleProceedToPay}
                    >
                      PROCEED TO PAY
                    </button>
                  )}
                </div>
              </div>

              {error && (
                <div className="mt-2 text-center text-red-500">{error}</div>
              )}

              {currentStep === 0 && (
                <Occasion
                  onSelectOccasion={handleOccasionSelect}
                  voucherData={voucherData}
                />
              )}
              {currentStep === 1 && (
                <Templates
                  selectedOccasion={selectedOccasion}
                  selectedTemplateId={selectedTemplateId}
                  voucherData={voucherData}
                  onTemplateSelect={handleTemplateSelect}
                />
              )}
              {currentStep === 2 && (
                <Amount onAmountChange={handleAmountChange} />
              )}
              {currentStep === 3 && (
                <Delivery
                  formData={formData}
                  handleChange={handleChange}
                  handleDeliveryComplete={handleDeliveryComplete}
                />
              )}
              {currentStep === 4 && (
                <Preview
                  recipientName={formData.recipientName}
                  recipientEmail={formData.recipientEmail}
                  recipientMobile={formData.recipientMobile}
                  confirmEmail={formData.confirmEmail}
                  message={formData.message}
                  senderName={formData.senderName}
                  amount={formData.amount}
                  occasion={formData.occasion}
                  selectedTemplateUrl={selectedTemplateUrl}
                />
              )}

              <div className="flex items-center justify-between">
                <div className="mt-2 flex flex-col justify-start text-sm">
                  {remainingSteps.map((step, index) => (
                    <div
                      key={index}
                      className="cursor-pointer px-2 py-1 font-normal text-gray-400"
                      onClick={() => handleStepClick(currentStep + index + 1)}
                    >
                      {step}
                    </div>
                  ))}
                </div>
                <h1 className="text-xs">Terms & Conditions</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Gifts;
