"use client";
import React, { useState } from "react";

interface Props {
  visible: boolean;
  onClose: VoidFunction;
  onSortOptionChange: (option: string) => void;
}

const SortOptions = [
  "Newest First",
  "Price-Low To High",
  "Price-High To Low",
];

const SortBy: React.FC<Props> = (props) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  
  const handleOnClose = (e: any) => {
    if (e.target.id === "container") {
      props.onClose();
    }
  };

  const updateSelectedOption = (option: string) => {
    setSelectedOption(option);
  };

  const handleApply = () => {
    if (selectedOption) {
      props.onSortOptionChange(selectedOption);
      props.onClose();
    }
  };

  if (!props.visible) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 z-50 bottom-0"
      id="container"
      onClick={handleOnClose}
    >
      <div className="fixed bg-white left-0 w-[100%] h-[50%] bottom-0 rounded-t-3xl">
        <p className="w-[100%] text-center text-xl bg-[#e26178] p-4 rounded-t-3xl text-white">
          Sort Design By
        </p>
        <div className="p-4">
          {SortOptions.map((option: any) => (
            <div
              key={option}
              className={`mt-4 text-lg hover:text-[#e26178] ${
                selectedOption === option ? "text-[#e26179]" : ""
              }`}
              onClick={() => updateSelectedOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
        
        {/* Apply Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleApply}
            className={`w-full py-3 rounded-md text-white ${
              selectedOption 
                ? 'bg-[#e26178] hover:bg-[#d15167]' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!selectedOption}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortBy;