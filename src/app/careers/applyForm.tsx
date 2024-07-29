import React from 'react'
import { MdOutlineRefresh } from "react-icons/md";
import { IoMdClose } from "react-icons/io";


interface ApplyFormProps {
    closeModal: () => void; // Define the type for closeModal as a function
  }
  
  const ApplyForm: React.FC<ApplyFormProps> = ({ closeModal }) => {
    return (
        <div className="flex flex-col md:h-full h-full ">
          <div className="flex justify-end px-4 py-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-black text-white p-2 rounded-full"
            >
              <IoMdClose />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            <form className=" p-2 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="input p-2 rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="p-2 input rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="input p-2 rounded-lg"
                  required
                />
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Mobile No."
                  className="input p-2 rounded-lg w-full mb-4"
                  required
                />
                <label className="block text-white mb-2" htmlFor="resume">
                  Upload Resume:
                </label>
                <input type="file" id="resume" className="input" required />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] hover:bg-[#4d97cb] text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}

export default ApplyForm;