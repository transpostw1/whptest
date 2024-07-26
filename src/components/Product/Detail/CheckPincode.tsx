"use client";
import React, { useState } from "react";
import axios from "axios";
export default function CheckPincode() {
  const [pincode, setPincode] = useState("");
  const [savedPincode, setSavedPincode] = useState("");
  const [apiResponse, setApiResponse] = useState<any>({});


  const handleSavePincode = async () => {
    localStorage.setItem("pincode", pincode);
    
    try {
      const response = await axios.post(
        "http://edd-service.eshipz.com/edd?shop=whpjewellers.com",
        {
          destination_pincode: pincode,
          origin_pincodes: [pincode],
        },
        {
          headers: {
            'x-api-token': '5d5657e57e233b3920eb4729', 
            'Content-Type': 'application/json',
          },
        }
      );
  
      setApiResponse(response.data); 
      setSavedPincode(pincode);
      console.log("Saved PinCode:", pincode);
    } catch (error) {
      console.error("Error making the request:", error);
    }
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
