"use client";
import React, { useState, useEffect, useRef } from "react";
import { graphqlbaseUrl } from "@/utils/constants";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import FlashAlert from "@/components/Other/FlashAlert";
import Loader from "@/components/Other/Loader";

interface Props {
  title: string;
  closeModal: () => void;
}

const BookExchangeModal: React.FC<Props> = ({ title, closeModal }) => {
  const inputRef = useRef<any>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    date: "",
  });
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"error" | "success" | "info">("success");

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });

      const STORE_CUSTOMER_QUERY = gql`
        mutation StoreCustomerQueries(
          $customerQueries: [CustomerQueriesInput!]!
        ) {
          StoreCustomerQueries(customerQueries: $customerQueries) {
            message
          }
        }
      `;

      const { data } = await client.mutate({
        mutation: STORE_CUSTOMER_QUERY,
        variables: {
          customerQueries: [
            {
              name: formData.name,
              email: formData.email,
              number: phone,
              message: formData.message,
              date: formData.date,
            },
          ],
        },
      });

      setMessage("Your Request Has Been Submitted. We Will Contact You Soon");
      setType("success");
    } catch (error) {
      setMessage("Error in Booking Appointment");
      setType("error");
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      setFormData({ name: "", email: "", message: "", date: "" });
      setPhone("+91");
      closeModal();
    }, 2000);
  };

  if (isLoading) {
    return <Loader />;
  }
0
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-5 backdrop-blur-sm"
      id="container"
      onClick={(e) => e.target.id === "container" && closeModal()}
    >
      <div className="w-[65%] max-w-md rounded-md bg-white p-6 shadow-md max-sm:w-[70%]">
        <div className="float-right cursor-pointer" onClick={closeModal}>
          <Icon.X size={25} />
        </div>
        <h2 className="mb-4 text-xl font-semibold text-[#e26178]">{title}</h2>

        <form onSubmit={handleSubmit} ref={inputRef}>
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
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-[#e26178] focus:ring-[#e26178] sm:text-sm"
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
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-[#e26178] focus:ring-[#e26178] sm:text-sm"
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
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={handlePhoneChange}
              inputStyle={{
                width: "100%",
                boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
                borderColor: "#d1d5db",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
              }}
              containerStyle={{
                width: "100%",
              }}
              buttonStyle={{
                borderColor: "#d1d5db",
              }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Select Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={getTodayDate()}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-[#e26178] focus:ring-[#e26178] sm:text-sm"
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
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-[#e26178] focus:ring-[#e26178] sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-[#e26178] px-4 py-2 text-sm font-medium text-white hover:bg-[#e26178] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>

        {message && <FlashAlert message={message} type={type} />}
      </div>
    </div>
  );
};

export default BookExchangeModal;
