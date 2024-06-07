// src/components/RecipientForm.tsx

import React, { useState, ChangeEvent, FC } from "react";

interface FormData {
  recipientName: string;
  recipientMobile: string;
  recipientEmail: string;
  confirmEmail: string;
  message: string;
  senderName: string;
}

const Delivery: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    recipientName: "",
    recipientMobile: "",
    recipientEmail: "",
    confirmEmail: "",
    message: "",
    senderName: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form className="space-y-4 p-4 max-w-md mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="recipientName" className="block text-gray-700">
            Recipient's Name
          </label>
          <input
            id="recipientName"
            name="recipientName"
            type="text"
            value={formData.recipientName}
            onChange={handleChange}
            className="border border-black rounded-lg px-4 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="recipientMobile" className="block text-gray-700">
            Recipient's Mobile
          </label>
          <input
            id="recipientMobile"
            name="recipientMobile"
            type="text"
            value={formData.recipientMobile}
            onChange={handleChange}
            className="border border-black rounded-lg px-4 py-2 w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="recipientEmail" className="block text-gray-700">
            Recipient's Email
          </label>
          <input
            id="recipientEmail"
            name="recipientEmail"
            type="email"
            value={formData.recipientEmail}
            onChange={handleChange}
            className="border border-black rounded-lg px-4 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="confirmEmail" className="block text-gray-700">
            Confirm Email
          </label>
          <input
            id="confirmEmail"
            name="confirmEmail"
            type="email"
            value={formData.confirmEmail}
            onChange={handleChange}
            className="border border-black rounded-lg px-4 py-2 w-full"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-gray-700">
          Leave a Message for the Recipient
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="border border-black rounded-lg px-4 py-2 w-full"
          rows={4}
        ></textarea>
      </div>
      <div>
        <label htmlFor="senderName" className="block text-gray-700">
          Sender's Name
        </label>
        <input
          id="senderName"
          name="senderName"
          type="text"
          value={formData.senderName}
          onChange={handleChange}
          className="border border-black rounded-lg px-4 py-2 w-full"
        />
      </div>
    </form>
  );
};

export default Delivery;
