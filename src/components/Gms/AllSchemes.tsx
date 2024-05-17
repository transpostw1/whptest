"use client";
import React, { useState } from "react";
import Image from "next/image";

const AllSchemes = () => {
  const [schemes, setSchemes] = useState("gold");
  const handleSchemes = (args: string) => {
    setSchemes(args);
  };
  return (
    <>
      <Image
        src={"/images/banner/grow_your_gold.png"}
        alt={"Image"}
        height={1000}
        width={1000}                                                                                                                                                                                         x
      />
      <div className="w-full flex h-[500px] justify-center items-center">
        <div className="relative w-full">
          <div
            className={`bg-green-700 absolute  ${
              schemes === "gold" ? "z-10 " : "z-0"
            }`}
            onClick={() => handleSchemes("gold")}
          >
            <p>Gold</p>
            <p>Total Installment Paid:4</p>
            <p>Installment Remaining:6</p>
            <p>Total Amount Paid:8000</p> <p>Next Installment:2000</p>
            <button className="bg-[#e26178] px-2 text-white">Pay Now</button>
          </div>
          <div
            className={`bg-blue-700 absolute left-[40px] ${
              schemes === "diamond" ? "z-10 " : null
            }`}
            onClick={() => handleSchemes("diamond")}
          >
            <p>Diamond</p>
            <p>Total Installment Paid:4</p>
            <p>Installment Remaining:6</p>
            <p>Total Amount Paid:8000</p> <p>Next Installment:2000</p>
            <button className="bg-[#e26178] px-2 text-white">Pay Now</button>
          </div>
          <div
            className={`bg-orange-700 absolute left-[20px] ${
              schemes === "sliver" ? "z-10" : null
            }`}
            onClick={() => handleSchemes("sliver")}
          >
            <p>Sliver</p>
            <p>Total Installment Paid:4</p>
            <p>Installment Remaining:6</p>
            <p>Total Amount Paid:8000</p> <p>Next Installment:2000</p>
            <button className="bg-[#e26178] px-2 text-white">Pay Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllSchemes;
