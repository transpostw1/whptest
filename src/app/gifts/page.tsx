"use client";
import React, { useState } from "react";
import Occasion from "@/components/Gifts/Occasion";
import Templates from "@/components/Gifts/Templates";
import Amount from "@/components/Gifts/Amount";
import Delivery from "@/components/Gifts/Delivery";
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
  const stepCount = currentStep + 1;
  return (
    <div>
      <div className="text-center py-10 bg-[#f8a4b4]">
        <h1 className="font-medium py-2">GIFT CARDS</h1>
        <h3 className="font-semibold text-xl italic">
          For what your loved ones Love!
        </h3>
      </div>
      <div className="flex md:mx-32">
        <div className="p-4">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        <div className="flex flex-col  justify-between w-full mt-3">
          <div className="flex justify-between items-center  ">
            <div>
              <p className="rounded-full w-8 text-center font-semibold bg-[#f8a4b4] p-1 mb-2">
                {stepCount}
              </p>
              <div className="bg-blue-950 text-white px-4 py-2">
                {steps[currentStep]}
              </div>
            </div>

            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  className="text-white bg-gray-600 px-4 py-2"
                  onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
                >
                  PREVIOUS
                </button>
              )}

              <button
                className="text-white bg-blue-950  px-4 py-2 "
                onClick={() =>
                  setCurrentStep((prevStep) => (prevStep + 1) % steps.length)
                }
              >
                NEXT
              </button>
            </div>
          </div>

          {currentStep === 0 && <Occasion />}
          {currentStep === 1 && <Templates />}
          {currentStep === 2 && <Amount />}
          {currentStep === 3 && <Delivery />}

          <div className="mt-2 text-sm flex flex-col justify-start">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`py-1 px-2 font-normal cursor-pointer bg-gray-200 ${
                  index === currentStep ? "font-semibold text-black" : ""
                }`}
                onClick={() => setCurrentStep(index)}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gifts;
