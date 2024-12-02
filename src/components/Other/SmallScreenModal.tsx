import React from "react";

interface SmallScreenModalProps {
  show: boolean;
  onClose: () => void;
  onVerify: () => void;
}

const SmallScreenModal: React.FC<SmallScreenModalProps> = ({
  show,
  onClose,
  onVerify,
}) => {
  if (!show) return null;

  return (
    <div className="absolute top-60 bottom-0 left-0 right-0 z-[1000] flex items-center justify-center  m-5">
      <div className="w-full rounded-lg bg-white p-3 shadow-lg">
        <h2 className="text-center text-lg font-bold text-gray-700">
          Complete PAN Verification
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your PAN verification is incomplete. Please verify to proceed.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <button
            className=" rounded bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-2 text-white"
            onClick={onVerify}
          >
            Verify Now
          </button>
          <button
            className=" rounded bg-gray-300 px-3 py-2 text-gray-800"
            onClick={onClose}
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallScreenModal;
