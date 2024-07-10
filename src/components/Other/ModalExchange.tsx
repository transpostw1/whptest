import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalExchange: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div
      id="modal-container"
      className="fixed inset-x-0 inset-y-48 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg w-11/12 md:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={onClose} className="text-lg">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalExchange;
