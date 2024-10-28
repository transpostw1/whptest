import React, { useEffect, useState, ChangeEvent, FC } from "react";
import { useCurrency } from "@/context/CurrencyContext";

interface AmountProps {
  onAmountChange: (amount: number) => void;
}

const Amount: FC<AmountProps> = ({ onAmountChange }) => {
  const [amount, setAmount] = useState<string>(""); 
  const [rawAmount, setRawAmount] = useState<number>(0);
  const { formatPrice, currency } = useCurrency();


  const formatWithCommas = (value: string | number): string => {
    return Number(value).toLocaleString("en-IN");
  };

  const parseRawAmount = (value: string): number => {
    return Number(value.replace(/,/g, ""));
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const formattedValue = formatWithCommas(value.replace(/,/g, ""));
    setAmount(formattedValue);

    
    const rawValue = parseRawAmount(value);
    setRawAmount(rawValue);
    onAmountChange(rawValue);
  };

  useEffect(() => {
    handleButtonClick(rawAmount); 
  }, [currency]);

  const handleButtonClick = (value: number) => {
    let convertedValue = value;
    if (currency === "USD") {
      convertedValue = value * 0.012;
    } else if (currency === "EUR") {
      convertedValue = value * 0.011;
    }

  
    setAmount(formatWithCommas(convertedValue));
    setRawAmount(convertedValue);
    onAmountChange(convertedValue);
  };

  return (
    <div className="flex flex-col items-center justify-evenly space-y-4 p-4 py-6 md:flex-row md:space-x-4 md:space-y-0">
      <div className="flex flex-col items-center">
        <label
          htmlFor="amount"
          className="text-center font-semibold text-gray-700"
        >
          Enter an Amount
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">
            {currency === "INR" ? "₹" : currency === "USD" ? "$" : "€"}
          </span>
          <input
            id="amount"
            type="text" // Change input type to text to allow formatting
            value={amount}
            onChange={handleAmountChange}
            className="w-48 rounded-lg border border-black py-2 pl-8 pr-4 md:w-64"
            placeholder="Amount"
          />
        </div>
      </div>
      <div>
        <p className="text-center font-semibold text-gray-700">Or</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-center font-semibold text-gray-700">
          Pick a Common Denomination
        </p>
        <div className="flex space-x-2">
          {[1000, 2000, 5000, 10000].map((value) => (
            <button
              key={value}
              onClick={() => handleButtonClick(value)}
              className="rounded-lg bg-[#e26178] px-4 py-2 text-white hover:bg-[#b33e54] focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {formatPrice(value)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Amount;
