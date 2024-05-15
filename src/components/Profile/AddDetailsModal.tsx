import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDetailsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-gray-200 rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <Icon.X size={24} className="cursor-pointer" onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                First name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-400 p-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Last name
              </label>
              <input
                type="text"
                id="name"
                name="lastname"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-400 p-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-400 p-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Phone"
                className="block text-gray-700 font-semibold mb-2"
              >
                Phone
              </label>
              <input
                type="number"
                id="email"
                name="Phone"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-400 p-2 rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#e26178] text-white py-2 px-4 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDetailsModal;
