import React from 'react';
import { ArrowRight } from '@phosphor-icons/react';

interface ProceedButtonProps {
  isMobile: boolean;
  proceedButtonTitle: string;
  handleOrderComplete: () => void;
  handleProceed: () => void;
}

const ProceedButton: React.FC<ProceedButtonProps> = ({
  isMobile,
  proceedButtonTitle,
  handleOrderComplete,
  handleProceed,
}) => {
  const handleClick = () => {
    if (proceedButtonTitle === 'Place Order') {
      handleOrderComplete();
    } else {
      handleProceed();
    }
  };

  return (
    <div className="flex flex-col mt-3 relative">
      {/* Render different buttons based on screen size */}
      {isMobile ? (
        <div className="w-full sticky top-0 p-4 flex justify-between">
          <div>
            <h3 className="font-semibold">₹24237.59</h3>
            <h2 className="text-red-500 font-medium">View Order Summary</h2>
          </div>
          <button
            onClick={handleClick}
            className="w-52 flex justify-center hover:to-blue-900 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-rose-600 "
          >
            {proceedButtonTitle}
            <ArrowRight style={{ marginLeft: '10px', marginRight: '10px' }} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="flex justify-center items-center hover:to-blue-900 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded"
        >
          {proceedButtonTitle}
          <ArrowRight style={{ marginLeft: '10px', marginRight: '10px' }} />
        </button>
      )}
    </div>
  );
};

export default ProceedButton;