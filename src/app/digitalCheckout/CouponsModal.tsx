import React from "react";

const CouponsModal: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 h-full">
      <div className="bg-white p-8 flex flex-col justify-between z-50 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">Available Coupons</h2>
        {/* Add your coupons content here */}
        <button className="mt-4 px-4 py-2 text-center w-full inline-block text-white bg-rose-400 border border-transparent rounded-md hover:bg-rose-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default CouponsModal;