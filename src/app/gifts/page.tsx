"use client";
import React, { useState, ChangeEvent,useEffect } from "react";
import Occasion from "@/components/Gifts/Occasion";
import Templates from "@/components/Gifts/Templates";
import Amount from "@/components/Gifts/Amount";
import Delivery from "@/components/Gifts/Delivery";
import Preview from "@/components/Gifts/Preview";
import Stepper from "./Stepper";
import { baseUrl,voucher } from "@/utils/constants";
import { number } from "yup";
import axios from "axios";

const steps = [
  "Select an Occasion",
  "Pick a Template",
  "Amount",
  "Delivery Details",
  "Preview and Pay",
];

const Gifts = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientMobile: "",
    recipientEmail: "",
    confirmEmail: "",
    message: "",
    amount: number,
    occasion: "",
    senderName: "",
  });
  const [error, setError] = useState<string>("");
  const [selectedOccasion, setSelectedOccasion] = useState<string>("");
  const [isOccasionSelected, setIsOccasionSelected] = useState<boolean>(true);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null
  ); 
  const [voucherData, setVoucher] = useState<any>(null); 


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${baseUrl}${voucher}`);
          setVoucher(response.data);
        
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      fetchData();
    }, []);
  console.log(voucherData, "Voucherrrr");
    const handleOccasionSelect = (occasion: string) => {
      setFormData((prevData: any) => ({ ...prevData, occasion }));
      setSelectedOccasion(occasion);
    };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    if (!isStepValid()) {
      setError("Please fill in all the details correctly.");
    } else if (currentStep === 0 && !isOccasionSelected) {
      setError("Please select an occasion.");
    } else {
      setError("");
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }
  };

  const handlePrevious = () => {
    setError("");
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleStepClick = (index: number) => {
    setError("");
    setCurrentStep(index);
  };

  const handleProceedToPay = () => {
    console.log("Proceed to Pay");
  };

   const handleTemplateSelect = (templateId: number) => {
     setSelectedTemplateId(templateId);
   };

  const completedSteps = steps.slice(0, currentStep);
  const remainingSteps = steps.slice(currentStep + 1);
  const stepCount = currentStep + 1;

  return (
    <div className="md:mx-0 mx-2">
      <div className="text-center py-10 bg-[#f8a4b4]">
        <h1 className="font-medium py-2">GIFT CARDS</h1>
        <h3 className="font-semibold text-3xl italic">
          For what your loved ones Love!
        </h3>
      </div>
      <div className="flex lg:mx-32">
        {/* //vertical Line  */}
        <div className="lg:block hidden p-4">
          <div className="bg-red-500 h-full w-0.5"></div>
        </div>
        <div className="flex flex-col justify-between w-full mt-3">
          <div className="flex justify-between items-end">
            <div>
              <div className="flex flex-col items-start">
                {completedSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-3 text-green-600 py-2 mb-2 "
                  >
                    <div className="font-bold">{index + 1}</div>
                    {step}
                  </div>
                ))}
                <div className="bg-[#e26178] text-white md:px-4 px-2 py-2 ">
                  {steps[currentStep]}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  className="text-white bg-gray-500 md:px-4 px-2 py-2"
                  onClick={handlePrevious}
                >
                  PREVIOUS
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button
                  className="text-white bg-blue-950 md:px-4 px-2 py-2"
                  onClick={handleNext}
                >
                  NEXT
                </button>
              ) : (
                <button
                  className="text-white bg-[#e26178] px-4 py-2"
                  onClick={handleProceedToPay}
                >
                  PROCEED TO PAY
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-center mt-2">{error}</div>
          )}

          {currentStep === 0 && (
            <Occasion
              onSelectOccasion={handleOccasionSelect}
              voucherData={voucherData}
              onTemplateSelect={handleTemplateSelect}
            />
          )}
          {currentStep === 1 && (
            <Templates
              selectedOccasion={selectedOccasion}
              selectedTemplateId={selectedTemplateId} 
              voucherData={voucherData}
            />
          )}
          {currentStep === 2 && <Amount />}
          {currentStep === 3 && (
            <Delivery formData={formData} handleChange={handleChange} />
          )}
          {currentStep === 4 && (
            <Preview
              recipientName={formData.recipientName}
              recipientEmail={formData.recipientEmail}
              amount={formData.amount}
              message={formData.message}
              occasion={formData.occasion}
            />
          )}

          <div className="flex items-center justify-between">
            <div className="mt-2 text-sm flex flex-col justify-start">
              {remainingSteps.map((step, index) => (
                <div
                  key={index}
                  className="py-1 px-2 font-normal cursor-pointer text-gray-400"
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
    </div>
  );
};

export default Gifts;
