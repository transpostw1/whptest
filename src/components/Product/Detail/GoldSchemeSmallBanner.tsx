import React,{useState} from "react";
import Link from "next/link";

export default function GoldSchemeSmallBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [pincode, setPincode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    appointmentDate: "",
    message: "",
  });

  const checkAvailability = () => {
    if (pincode === "123456") {
      setIsFormVisible(true); 
    } else {
      alert("Pincode not available");
    }
  };
  const handleSubmit = () => {
    console.log(formData);
    alert("Form submitted!");
    setIsModalOpen(false);
  };

  const close = ()=>{
    setIsModalOpen(false)
    setIsFormVisible(false)
  }
  return (
    <>
    <div className="mt-7 flex justify-between items-center bg-[#f7f7f7] gap-1 md:p-4 p-1 lg:w-[90%]">
      <div>
        <span className="text-xs md:text-base">
          <span className="text-[#e26178]">Try at your home </span>
          (Try up to 5 items a day!)
        </span>
      </div>
      <div>
      <button  onClick={() => setIsModalOpen(true)} className="mr-5 text-sm  w-[90%] bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] md:p-4 p-2  text-center text-white">
          Check Availability
        </button>
      </div>
       
    </div>
    <div className="mt-7 flex justify-between md:items-center bg-[#f7f7f7] md:p-4 p-1 gap-1 lg:w-[90%]">
      <div>
        <span className="text-xs md:text-base">
          <span className="text-[#e26178]">Gold 10+1 Monthly Plan </span>
          (Pay 11 Installments, Get up to 100% Off on 12th Installment)
        </span>
      </div>
      <Link href={"/benefit"}>
        <button className="mr-5 w-[90%] bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] md:p-4 p-2 text-center text-white">
        Subscribe
        </button>
      </Link>
    </div>
    {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90%] max-w-md bg-white rounded-lg p-6">
            <button
              onClick={() => close()}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            {!isFormVisible ? (
              <div>
                <h2 className="mb-4 text-xl font-semibold text-center">
                  Check Availability
                </h2>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter your Pincode"
                  className="mb-4 w-full rounded-md border border-gray-300 p-2"
                />
                <button
                  onClick={checkAvailability}
                  className="w-full bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-3 text-white rounded-md"
                >
                  Check
                </button>
              </div>
            ) : (
              <div className="animate-fade-in">
                <h2 className="mb-4 text-xl font-semibold text-center">
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
                    className="mb-4 w-full rounded-md border border-gray-300 p-2"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Email"
                    className="mb-4 w-full rounded-md border border-gray-300 p-2"
                  />
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    placeholder="Mobile"
                    className="mb-4 w-full rounded-md border border-gray-300 p-2"
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
                    className="mb-4 w-full rounded-md border border-gray-300 p-2"
                  />
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Message"
                    className="mb-4 w-full rounded-md border border-gray-300 p-2"
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={() => close()}
                      className="px-6 py-2 text-gray-500 border border-gray-300 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 text-white bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] rounded-md"
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
