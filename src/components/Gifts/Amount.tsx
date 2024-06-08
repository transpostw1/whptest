import React, { useState, ChangeEvent, FC } from "react";

interface AmountProps {
  onAmountChange: (amount: number) => void;
}

const Amount: FC<AmountProps> = ({ onAmountChange }) => {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    onAmountChange(parseInt(value, 10));
  };

  const handleButtonClick = (value: number) => {
    setAmount(value.toString());
    onAmountChange(value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly space-y-4 md:space-y-0 md:space-x-4 p-4 py-6">
      <div className="flex flex-col items-center">
        <label
          htmlFor="amount"
          className="text-center text-gray-700 font-semibold"
        >
          Enter an Amount
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="border border-black rounded-lg px-4 py-2 w-48 md:w-64"
          placeholder="₹"
        />
      </div>
      <div>
        <p className="text-center text-gray-700 font-semibold">Or</p>
      </div>
      <div className="flex flex-col items-center ">
        <p className="text-center text-gray-700 font-semibold">
          Pick a Common Denomination
        </p>
        <div className="flex space-x-2">
          {[1000, 2000, 5000, 10000].map((value) => (
            <button
              key={value}
              onClick={() => handleButtonClick(value)}
              className="bg-[#e26178] text-white px-4 py-2 rounded-lg hover:bg-[#b33e54] focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              ₹{value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Amount;
