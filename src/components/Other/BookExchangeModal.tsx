import React, { useState } from "react";
import { baseUrl, contactForm } from "@/utils/constants";
import axios from "axios";

interface Props {
  closeModal: () => void;
}
const BookExchangeModal: React.FC<Props> = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnClose = (e: any) => {
    if (e.target.id === "container") {
      closeModal();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("formdata", formData.email);

    // Submit form logic (here you would typically make an API call or send the data to a server)
    const response = await axios.post(`${baseUrl}${contactForm}`, {
      name: formData.name,
      email: formData.email,
      number: formData.phone,
      message: formData.message,
    });
    // Show popup
    setShowPopup(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-10 bg-blur- z-50 flex justify-center items-center"
      id="container"
      onClick={handleOnClose}
    >
      <div className="max-w-md w-[65%] max-sm:w-[70%] bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-[#e26178]">
          Contact Form
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 focus:ring-[#e26178] focus:border-[#e26178] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 focus:ring-[#e26178] focus:border-[#e26178] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-2 focus:ring-[#e26178] focus:border-[#e26178] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message:
            </label>
            <input
              type="text"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 p-2 focus:ring-[#e26178] focus:border-[#e26178] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#e26178] hover:bg-[#e26178] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>

        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md">
              <p className="text-center">Your Request Has Been Submitted</p>
              <p className="text-center">We Will Contact You Soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookExchangeModal;
