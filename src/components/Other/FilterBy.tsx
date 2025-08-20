"use client";
import React, { useState } from "react";

interface Props {
  visible: boolean;
  onClose: VoidFunction;
  categories: { options: string[]; labels: string[] };
  Metals_and_Stones: { options: string[]; labels: string[] };
  onOptionSelect: (option: string, type: string) => void;
}

const FilterBy: React.FC<Props> = ({
  visible,
  onClose,
  categories,
 Metals_and_Stones,
  onOptionSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOnClose = (e: any) => {
    if (e.target.id === "container") {
      onClose();
    }
  };

  const handleApply = () => {
    if (!selectedOption) return;

    const type = categories.options.includes(selectedOption)
      ? "Category"
      : "Metals_and_Stones";

    onOptionSelect(selectedOption, type);
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
          className="overflow-y-auto p-4"
          style={{ maxHeight: "calc(100% - 100px)" }}
        >
          {/* Categories Section */}
          {categories.options.length > 0 && (
            <>
              <h2 className="text-lg font-semibold text-gray-800">
                Categories
              </h2>
              {categories.options.map((option, idx) => (
                <div
                  key={option}
                  className={`mt-2 cursor-pointer ${
                    selectedOption === option ? "text-[#e26179]" : ""
                  }`}
                  onClick={() => setSelectedOption(option)}
                >
                  {categories.labels[idx] || option}
                </div>
              ))}
            </>
          )}

          {/* Shop For Section */}
          {Metals_and_Stones.options.length > 0 && (
            <>
              <h2 className="mt-4 text-lg font-semibold text-gray-800">
                Metals and Stones{" "}
              </h2>
              {Metals_and_Stones.options.map((option, idx) => (
                <div
                  key={option}
                  className={`mt-2 cursor-pointer ${
                    selectedOption === option ? "text-[#e26179]" : ""
                  }`}
                  onClick={() => setSelectedOption(option)}
                >
                  {Metals_and_Stones.labels[idx] || option}
                </div>
              ))}
            </>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleApply}
            className={`w-full rounded-md py-3 text-white ${
              selectedOption
                ? "bg-[#e26178] hover:bg-[#d15167]"
                : "cursor-not-allowed bg-gray-300"
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
