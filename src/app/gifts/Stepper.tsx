
import React from "react";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return(
    <div className="relative bg-blue-700">
      <div className="absolute top-0 left-2.5 h-full w-0.5 bg-[#f8a4b4]"></div>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center mb-4">
          {/* <div
            className={`w-5 h-5 rounded-full border-2 border-[#f8a4b4] flex items-center justify-center ${
              currentStep === index ? "bg-[#f8a4b4]" : "bg-white"
            }`}
          >
            <span
              className={`text-sm ${
                currentStep === index ? "text-white" : "text-[#f8a4b4]"
              }`}
            >
              {index + 1}
            </span>
          </div> */}
          {/* <div className="ml-2 text-sm">{step}</div> */}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
