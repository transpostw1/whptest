"use client"
import React,{useState} from "react";

const GiftWrapModal = () => {
  const [formData, setFormData] = useState({
    name: "",
    wrapOption: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Submit form logic (here you would typically make an API call or send the data to a server)

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: "", wrapOption: ""});
    }, 2000);
  };
  return (
    <div className="fixed inset-0 bg-black bg-blur-sm bg-opacity-15 z-50 flex justify-center items-center">
      <div className="bg-white w-[25%] p-4">
      <h2 className="text-xl font-semibold mb-4 text-[#e26178]">
          Your Gift Message
        </h2>
      <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Gift Message:
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
            
            <input
              type="checkbox"
              id="name"
              name="name"
              value={formData.name}
              checked={true}
              onChange={handleChange}
              required
            /><label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 mr-4"
          >
           Want Your Gift to Wrapped?
          </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#e26178] hover:bg-[#e26178] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GiftWrapModal;
