import React, { useState } from "react";

const BenefitCalculator = () => {
  const [sliderValue, setSliderValue] = useState(1000);

  const handleChange = (event) => {
    setSliderValue(parseInt(event.target.value));
  };

  return (
    <div className="my-6">
      <div className="flex w-full items-center justify-between bg-pink-600 font-bold">
        <div>
          <input
            id="default-radio-1"
            type="radio"
            value=""
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            // for="default-radio-1"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Gold
          </label>
        </div>
        <div>Silver</div>
        <div>Diamond</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <input
          type="range"
          min={1000}
          max={100000}
          step={1000}
          value={sliderValue}
          onChange={handleChange}
          style={{ width: "600px" }}
        />
        <p>Amount: {sliderValue}</p>
      </div>
    </div>
  );
};

export default BenefitCalculator;
