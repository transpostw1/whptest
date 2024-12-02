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
      className="absolute top-0 bottom-0 left-32 right-0 flex items-center justify-center  z-50 w-full"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg w-1/3"
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
