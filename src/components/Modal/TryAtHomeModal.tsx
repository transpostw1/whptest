import React, { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";
import FlashAlert from "@/components/Other/FlashAlert";

const client = new ApolloClient({
  uri: graphqlbaseUrl,
  cache: new InMemoryCache(),
});

const GET_ALL_TRY_AT_HOME_PINCODE = gql`
  query GetAllTryAtHomePincode {
    getAllTryAtHomePincode
  }
`;

interface TryAtHomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TryAtHomeModal: React.FC<TryAtHomeModalProps> = ({ isOpen, onClose }) => {
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[90%] max-w-md bg-white p-6">
        <FlashAlert message={flashMessage} type={flashType} />
        <button
          onClick={onClose}
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
              className="w-full bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-3 text-white"
            >
              Check
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <h2 className="mb-4 text-center text-xl text-[#e26178] font-semibold">
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
                className="mb-4 w-full border border-gray-300 p-2"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                className="mb-4 w-full border border-gray-300 p-2"
              />
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                placeholder="Mobile"
                className="mb-4 w-full border border-gray-300 p-2"
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
                className="mb-4 w-full border border-gray-300 p-2"
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
                  onClick={onClose}
                  className="border border-gray-300 px-6 py-2 text-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-6 py-2 text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TryAtHomeModal;