import React from 'react'
import { MdOutlineRefresh } from "react-icons/md";
import { IoMdClose } from "react-icons/io";


interface ApplyFormProps {
    closeModal: () => void; 
  }
  
  const ApplyForm: React.FC<ApplyFormProps> = ({ closeModal }) => {
    return (
        <div className="flex flex-col md:h-full h-full ">
          <div className="flex justify-between items-center px-4 py-4 ">
          <h1 className='text-center md:ml-36 text-xl text-[#e26178]'>Add Details</h1>
            <button
              type="button"
              onClick={closeModal}
              className=" text-black p-2 rounded-full"
            >
              <IoMdClose />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            <form className=" p-2 ">
              <div className="grid grid-cols-1  gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input p-2 border border-gray-200"
                  required
                />
                {/* <input
                  type="text"
                  placeholder="Last Name"
                  className="p-2 input border border-gray-100"
                  required
                /> */}
              </div>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="input p-2 border border-gray-200"
                  required
                />
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Mobile No."
                  className="input p-2 w-full border border-gray-200"
                  required
                />
              </div>
              <div>
              <label className="block text-white mb-2" htmlFor="resume">
                  Upload Resume:
                </label>
                <input type="file" id="resume" className="input w-full border border-gray-200" required />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] hover:bg-[#4d97cb] text-white py-2 px-4  focus:outline-none focus:shadow-outline w-full"
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