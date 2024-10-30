"use client";
import React, { useState } from "react";
import axios from "axios";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";
import Loader from "@/components/Other/Loader";
export default function CheckPincode() {
  const [pincode, setPincode] = useState("");
  const [savedPincode, setSavedPincode] = useState("");
  const [apiResponse, setApiResponse] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleSavePincode = async () => {
    localStorage.setItem("pincode", pincode);
    setLoading(true);
    try {
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });

      const CHECK_PINCODE_MUTATION = gql`
        mutation CheckPincode($input: CheckPincodeInput!) {
          checkPincode(input: $input) {
            message
          }
        }
      `;

      const { data } = await client.mutate({
        mutation: CHECK_PINCODE_MUTATION,
        variables: {
          input: {
            pincode: pincode,
          },
        },
        fetchPolicy: "no-cache",
      });
      console.log("Response from backend:", data);
      setApiResponse(data.checkPincode);
      setSavedPincode(data.checkPincode.message);
      setLoading(false);
      console.log("Saved PinCode:", pincode);
    } catch (error) {
      console.error("Error making the request:", error);
    }
  };
  
  if (loading) return <Loader />;
  return (
    <div className="mt-4 bg-white p-4 lg:w-[65%]">
      <p className="mb-3">Enter pincode to check delivery</p>
      <div className="mb-3 flex justify-between border border-gray-400 bg-white p-2">
        <input
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="w-100 border-none shadow-none outline-none"
        />
        <p
          className="cursor-pointer text-[#e26178] underline"
          onClick={handleSavePincode}
        >
          Check
        </p>
      </div>
      {savedPincode && <p className="font-bold">{savedPincode}</p>}
    </div>
  );
}