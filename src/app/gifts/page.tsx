"use client";
import React, { useState } from "react";
import Occasion from "@/components/Header/Gifts/Occasion";
import Templates from "@/components/Header/Gifts/Templates";
import Stepper from "./Stepper";

const steps = [
  "Select an Occasion",
  "Pick a Template",
  "Amount",
  "Delivery Details",
  "Payment",
];

const Gifts = () => {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div>
      <div className="text-center py-2 bg-[#f8a4b4]">
        <h1 className="font-medium py-2">GIFT CARDS</h1>
        <h3 className="font-semibold text-xl italic">
          For what your loved ones Love!
        </h3>
      </div>
      <div className="flex md:mx-32">
        <div className="p-4">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        <div className="flex flex-col items-center justify-between w-full mt-3">
          <div className="flex justify-between items-center  w-full">
            <div className="bg-blue-950 text-white px-4 py-2">
              {steps[currentStep]}
            </div>
            <button
              className="text-white bg-blue-950  px-4 py-2 "
              onClick={() =>
                setCurrentStep((prevStep) => (prevStep + 1) % steps.length)
              }
            >
              NEXT
            </button>
          </div>

          {currentStep === 0 && <Occasion />}
          {currentStep === 1 && <Templates />}

          {/* <div className="ml-2 text-sm">{steps}</div> */}
        </div>
      </div>
    </div>
  );
};

export default Gifts;
