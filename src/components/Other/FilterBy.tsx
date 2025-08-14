"use client";
import React, { useState } from "react";

interface Props {
  visible: boolean;
  onClose: VoidFunction;
  categories: { options: string[]; labels: string[] };
  shopFor: { options: string[]; labels: string[] };
  onOptionSelect: (selectedOptions: { type: string; options: string[] }) => void;
}

const FilterBy: React.FC<Props> = ({
  visible,
  onClose,
  categories,
  shopFor,
  onOptionSelect,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOnClose = (e: any) => {
    if (e.target.id === "container") {
      onClose();
    }
  };

  const handleOptionToggle = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option) // Remove if already selected
        : [...prev, option] // Add if not selected
    );
  };

  const handleApply = () => {
    if (selectedOptions.length === 0) return;

    const categorizedSelections = {
      type: categories.options.some((opt) => selectedOptions.includes(opt))
        ? "Category"
        : "Shop_For",
      options: selectedOptions,
    };

    onOptionSelect(categorizedSelections);
    onClose();
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 bottom-0 z-50 bg-black bg-opacity-25"
      id="container"
      onClick={handleOnClose}
    >
      <div className="fixed bottom-0 left-0 h-[70%] w-full rounded-t-3xl bg-white">
        <p className="w-full rounded-t-3xl bg-[#e26178] p-4 text-center text-xl text-white">
          Select Category
        </p>
        <div
          className="p-4 overflow-y-auto"
          style={{ maxHeight: "calc(100% - 100px)" }}
        >
          {/* Categories Section */}
          {categories.options.length > 0 && (
            <>
              <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
              {categories.options.map((option, idx) => (
                <div
                  key={option}
                  className={`mt-2 flex items-center cursor-pointer ${
                    selectedOptions.includes(option) ? "text-[#e26179]" : ""
                  }`}
                  onClick={() => handleOptionToggle(option)}
                >
                  <span className="mr-2">
                    {selectedOptions.includes(option) ? "✔️" : "⬜"} {/* Tick mark */}
                  </span>
                  {categories.labels[idx] || option}
                </div>
              ))}
            </>
          )}

          {/* Shop For Section */}
          {shopFor.options.length > 0 && (
            <>
              <h2 className="mt-4 text-lg font-semibold text-gray-800">
                Shop For
              </h2>
              {shopFor.options.map((option, idx) => (
                <div
                  key={option}
                  className={`mt-2 flex items-center cursor-pointer ${
                    selectedOptions.includes(option) ? "text-[#e26179]" : ""
                  }`}
                  onClick={() => handleOptionToggle(option)}
                >
                  <span className="mr-2">
                    {selectedOptions.includes(option) ? "✔️" : "⬜"} 
                  </span>
                  {shopFor.labels[idx] || option}
                </div>
              ))}
            </>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleApply}
            className={`w-full rounded-md py-3 text-white ${
              selectedOptions.length > 0
                ? "bg-[#e26178] hover:bg-[#d15167]"
                : "cursor-not-allowed bg-gray-300"
            }`}
            disabled={selectedOptions.length === 0}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBy;