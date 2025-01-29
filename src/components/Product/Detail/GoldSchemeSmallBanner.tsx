import React, { useState } from "react";
import Link from "next/link";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";
import FlashAlert from "@/components/Other/FlashAlert";

const client = new ApolloClient({
  uri: graphqlbaseUrl,
  // headers: {
  //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
  // },
  cache: new InMemoryCache(),
});

const GET_ALL_TRY_AT_HOME_PINCODE = gql`
  query GetAllTryAtHomePincode {
    getAllTryAtHomePincode
  }
`;

export default function GoldSchemeSmallBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [pincode, setPincode] = useState("");
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("error");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    appointmentDate: "",
    message: "",
  });


  const checkAvailability = async () => {
    try {
      const { data } = await client.query({
        query: GET_ALL_TRY_AT_HOME_PINCODE,
      });

      if (data.getAllTryAtHomePincode.includes(pincode)) {
        setIsFormVisible(true);
        setFlashMessage("Try at home available!");
        setFlashType("success");
      } else {
        setIsFormVisible(false);
        setFlashMessage("Pincode not available in this location.");
        setFlashType("error");
      }
    } catch (error) {
      setFlashMessage("An error occurred while checking pincode.");
      setFlashType("error");
      console.error("GraphQL error:", error);
    }
  };

  const handleSubmit = () => {
    console.log(formData);
    setFlashMessage("Form submitted successfully!");
    setFlashType("success");
    setIsModalOpen(false);
  };

  const close = () => {
    setIsModalOpen(false);
    setIsFormVisible(false);
  };

  return (
    <>
      <FlashAlert message={flashMessage} type={flashType} />
      <div className="mt-4 flex items-center justify-between gap-1 bg-[#f7f7f7] p-1 md:p-4 lg:w-[90%]">
        <div>
          <span className="text-xs md:text-base">
            <span className="text-[#e26178]">Try at your home </span>
            (Try up to 5 items a day!)
          </span>
        </div>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-28 bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-2 py-3 text-center text-sm text-white transition-all duration-200 hover:from-[#d16991] hover:via-[#ad77c0] hover:to-[#9a83d9] md:w-[150px]"
          >
            Check Availability
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-1 bg-[#f7f7f7] p-1 md:p-4 lg:w-[90%]">
        <div>
          <span className="text-xs md:text-base">
            <span className="text-[#e26178]">Gold 10+1 Monthly Plan </span>
            (Pay 11 Installments, Get up to 100% Off on 12th Installment)
          </span>
        </div>
        <div className="">
          <Link href={"/benefit"}>
            <button className="w-28 bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-2 py-3 text-center text-sm text-white transition-all duration-200 hover:from-[#d16991] hover:via-[#ad77c0] hover:to-[#9a83d9] md:w-[150px]">
              Subscribe
            </button>
          </Link>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90%] max-w-md  bg-white p-6">
            <button
              onClick={() => close()}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            {!isFormVisible ? (
              <div>
                <h2 className="mb-4 text-center text-xl font-semibold">
                  Check Availability
                </h2>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter your Pincode"
                  className="mb-4 w-full border border-gray-300 p-2"
                />
                <button
                  onClick={checkAvailability}
                  className="w-full  bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-3 text-white"
                >
                  Check
                </button>
              </div>
            ) : (
              <div className="animate-fade-in">
                <h2 className="mb-4 text-center text-xl font-semibold">
                  Fill Your Details
                </h2>
                <form>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Full Name"
                    className="mb-4 w-full  border border-gray-300 p-2"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Email"
                    className="mb-4 w-full  border border-gray-300 p-2"
                  />
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    placeholder="Mobile"
                    className="mb-4 w-full  border border-gray-300 p-2"
                  />
                  <input
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        appointmentDate: e.target.value,
                      })
                    }
                    className="mb-4 w-full  border border-gray-300 p-2"
                  />
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Message"
                    className="mb-4 w-full border border-gray-300 p-2"
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={() => close()}
                      className=" border border-gray-300 px-6 py-2 text-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className=" bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-6 py-2 text-white"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
