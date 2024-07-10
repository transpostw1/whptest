"use client";
import React, { useState } from "react";
import axios from "axios";
export default function CheckPincode() {
  const [pincode, setPincode] = useState("");
  const [savedPincode, setSavedPincode] = useState("");
  

  const handleSavePincode = async () => {
    typeof window !=="undefined"?   localStorage.setItem("pincode", pincode):null;
    const response = axios.post("url", {
      pincode: pincode,
    });
    setSavedPincode(pincode);
    console.log("Saved PinCode:", pincode);
  };

  return (
    <div className="bg-[#f7f7f7] lg:w-[65%] p-4 mt-4">
      <p className="mb-3">Enter pincode to check delivery</p>
      <div className="flex bg-white justify-between p-2">
        <input
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="outline-none"
        />
        <p
          className="underline text-[#e26178] cursor-pointer"
          onClick={handleSavePincode}
        >
          Check
        </p>
      </div>
      <ul className="mt-3">
        <li>Same day delivery available. Extra Charge- ₹99</li>
        <li>Free delivery in 2 days.</li>
      </ul>
      {savedPincode && (
        <p className="text-green-500">Saved Pincode: {savedPincode}</p>
      )}
    </div>
  );
}
