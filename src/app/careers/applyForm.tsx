import React from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

interface ApplyFormProps {
  closeModal: () => void;
  jobTitle: string;
}

const ApplyForm: React.FC<ApplyFormProps> = ({ closeModal, jobTitle }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);
      formData.append("jobTitle", jobTitle);

      const response = await axios.post(
        "http://164.92.120.19/api/sendEmail",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
          },
          timeout: 15000,
          withCredentials: false
        },
      );
      console.log("Success:", response);
      alert("Application submitted successfully!");
      closeModal(); 
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("There was an error submitting your application.");
    }
  };

  return (
    <div className="flex h-full flex-col md:h-full">
      <div className="flex items-center justify-between px-4 py-4">
        <h1 className="text-center text-xl text-[#e26178] md:ml-36">
          Add Details
        </h1>
        <button
          type="button"
          onClick={closeModal}
          className="rounded-full p-2 text-black"
        >
          <IoMdClose />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        <form className="p-2" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="rounded border border-gray-200 p-2"
              required
            />
          </div>
          <div className="mt-2 grid grid-cols-1 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="rounded border border-gray-200 p-2"
              required
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              name="phone"
              placeholder="Mobile No."
              className="w-full rounded border border-gray-200 p-2"
              required
            />
          </div>
          <div className="mt-2">
            <label className="mb-2 block text-white" htmlFor="resume">
              Upload Resume:
            </label>
            <input
              type="file"
              name="document"
              id="resume"
              className="w-full rounded border border-gray-200"
              required
            />
          </div>
          <div className="mt-4 flex justify-between">
            <button
              type="submit"
              className="w-full rounded bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-white hover:bg-[#4d97cb]"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;