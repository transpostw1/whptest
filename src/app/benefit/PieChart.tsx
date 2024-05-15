import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PieChart: React.FC = () => {
  const data = {
    labels: ["You Pay", "Special Discount", "100% Discount"],
    datasets: [
      {
        data: [19500, 500, 2000],
        backgroundColor: ["#f8c2cc", "#28a745", "#002d62"],
        hoverBackgroundColor: ["#f8c2cc", "#28a745", "#002d62"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="relative w-64 h-64">
      <Pie data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-sm">You Pay</p>
          <p className="text-xl line-through">₹20,000</p>
          <p className="text-2xl font-bold">₹19,500</p>
        </div>
        <div className="absolute top-1/4 left-3/4 text-center">
          <p className="text-sm">Special Discount</p>
          <p className="text-xl font-bold text-green-700">₹500</p>
        </div>
        <div className="absolute bottom-1/4 left-1/4 text-center">
          <p className="text-sm">100% Discount*</p>
          <p className="text-xl font-bold text-blue-900">₹2,000</p>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
