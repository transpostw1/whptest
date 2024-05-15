import React,{useState} from "react";
import PieChart from "./PieChart";

const GoldCard: React.FC = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(2000);
  const [error, setError] = useState<string | null>(null);
  const numberOfMonths = 10;
  const totalAmount = monthlyDeposit * numberOfMonths;

  const handleIncrement = () => {
    if (monthlyDeposit % 1000 !== 0) {
      setError("Amount must be a multiple of 1000");
      return;
    }
    if (monthlyDeposit + 1000 <= 50000) {
      setMonthlyDeposit((prev) => prev + 1000);
      setError(null);
    }
  };

  const handleDecrement = () => {
    if (monthlyDeposit % 1000 !== 0) {
      setError("Amount must be a multiple of 1000");
      return;
    }
    if (monthlyDeposit - 1000 >= 2000) {
      setMonthlyDeposit((prev) => prev - 1000);
      setError(null);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value)) {
      setMonthlyDeposit(2000);
      setError("Invalid input. Setting to default.");
    } else {
      // Round down to nearest multiple of 1000
      const newValue = Math.floor(value / 1000) * 1000;
      if (newValue < 2000) {
        setMonthlyDeposit(2000);
        setError("Minimum deposit is 2000");
      } else if (newValue > 50000) {
        setMonthlyDeposit(50000);
        setError("Maximum deposit is 50000");
      } else {
        setMonthlyDeposit(newValue);
        setError(null);
      }
    }
  };

  return (
    <div className="bg-[#f8c2cc] h-full border-4 border-[#D4AF37] rounded-lg">
      <h3 className="font-semibold">Gold</h3>
      <h1 className="text-center text-4xl font-semibold py-5">
        BENEFIT CALCULATOR FOR GOLD
      </h1>
      <div className="flex flex-col md:flex-row justify-around items-center rounded-lg font-sans">
        <div className="mb-5 md:mb-0 text-center">
          <h2 className="mb-2">I want to deposit</h2>
          <div className="flex items-center justify-center rounded p-2 border border-gray-700 bg-white mb-2">
            <span className="text-4xl">₹</span>
            <input
              type="number"
              className="text-4xl font-bold mx-2 w-32 text-center remove-arrows"
              value={monthlyDeposit}
              onChange={handleChange}
              min="2000"
              max="50000"
              step="1000"
            />
            <div className="flex flex-col">
              <button
                className="w-8 h-8 mb-1 text-lg bg-[#E26178] text-white border-none cursor-pointer hover:bg-[#c83d56]"
                onClick={handleIncrement}
              >
                +
              </button>
              <button
                className="w-8 h-8 mt-1 text-lg bg-[#E26178] text-white border-none cursor-pointer hover:bg-[#c83d56]"
                onClick={handleDecrement}
              >
                -
              </button>
            </div>
          </div>
          <p>per month in my Account.</p>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="text-center">
          <h2 className="mb-2">Your total amount</h2>
          <div className="flex items-center justify-center border border-gray-700 rounded p-2 bg-white mb-2 h-24">
            <span className="text-4xl">₹</span>
            <span className="text-4xl font-bold mx-2">
              {totalAmount.toLocaleString("en-IN")}
            </span>
          </div>
          <p>for {numberOfMonths} months</p>
        </div>
      </div>
      <h1 className="text-center mt-20 font-semibold">
        TOTAL VALUE OF REDEMPTION ON 13TH MONTH(₹): NIL{" "}
      </h1>
      <div className="flex justify-center items-center">
        <PieChart />
      </div>
    </div>
  );
};

export default GoldCard