"use client";
import React, { useState } from "react";
import axios from "axios";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";
export default function CheckPincode() {
  const [pincode, setPincode] = useState("");
  const [savedPincode, setSavedPincode] = useState("");
  const [apiResponse, setApiResponse] = useState<any>({});

  const handleSavePincode = async () => {
    localStorage.setItem("pincode", pincode);

    try {
      // const response = await axios.post(
      //   "https://edd-service.eshipz.com/edd?shop=whpjewellers.com",
      //   {
      //     destination_pincode: pincode,
      //     origin_pincodes: ["400056"],
      //   },
      //   {
      //     headers: {
      //       'x-api-token': '5d5657e57e233b3920eb4729', 
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // );

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
          }
        },
        fetchPolicy: "no-cache",
      });
      console.log("Response from backend:", data);
      setApiResponse(data.checkPincode);
      setSavedPincode(data.checkPincode.message);
      console.log("Saved PinCode:", pincode);
    } catch (error) {
      console.error("Error making the request:", error);
    }
  };

  return (
    <div className="bg-[#f7f7f7] lg:w-[65%] p-4 mt-4">
      <p className="mb-3">Enter pincode to check delivery</p>
      <div className="flex bg-white border border-gray-400 justify-between p-2 mb-3">
        <input
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="outline-none border-none shadow-none w-100"
        />
        <p
          className="underline text-[#e26178] cursor-pointer"
          onClick={handleSavePincode}
        >
          Check
        </p>
      </div>
      {savedPincode && (
        <p className="font-bold">{savedPincode}</p>
      )}
    </div>
  );
}
