"use client";
import React, { useState } from "react";
interface Props {
  visible: boolean;
  onClose: VoidFunction;
  categories: { options: string[]; labels: string[] };
  onCategorySelect: (option: string) => void;
}

const FilterBy: React.FC<Props> = ({ visible, onClose, categories, onCategorySelect }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOnClose = (e: any) => {
    if (e.target.id === "container") {
      onClose();
    }
  };

  const handleApply = () => {
    if (selectedOption) {
      onCategorySelect(selectedOption); // Pass back the option value
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 z-50 bottom-0"
      id="container"
      onClick={handleOnClose}
    >
      <div className="fixed bg-white left-0 w-full h-[70%] bottom-0 rounded-t-3xl">
        <p className="w-full text-center text-xl bg-[#e26178] p-4 rounded-t-3xl text-white">
          Select Category
        </p>
        <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100% - 100px)" }}>
          {categories.labels.map((label, idx) => (
            <div
              key={categories.options[idx]}
              className={`mt-4 text-lg cursor-pointer ${
                selectedOption === categories.options[idx] ? "text-[#e26179]" : ""
              }`}
              onClick={() => setSelectedOption(categories.options[idx])}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleApply}
            className={`w-full py-3 rounded-md text-white ${
              selectedOption
                ? "bg-[#e26178] hover:bg-[#d15167]"
                : "bg-gray-300 cursor-not-allowed"
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

export default FilterBy;
