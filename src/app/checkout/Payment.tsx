import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import { CreditCard } from '@phosphor-icons/react';

interface PaymentProps {
  selectedPaymentMethod: string;
  handlePaymentMethodChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Payment: React.FC<PaymentProps> = ({ selectedPaymentMethod, handlePaymentMethodChange }) => {
  return (
    <div className="flex flex-col lg:w-[50rem] md:w-[30rem] sm:w-[30rem] gap-5">
      <h1 className="text-2xl">Payment Method</h1>
      <div className="flex flex-col gap-3">
        <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
          <label htmlFor="upiPayment" className=" flex gap-2 cursor-pointer font-medium">
            <Image src="/images/other/upi-icon.png" alt="upi" width={30} height={30} objectFit="fill" />
            UPI Payment
          </label>
          <input
            type="radio"
            id="upiPayment"
            name="paymentMethod"
            value="upi"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
            checked={selectedPaymentMethod === 'upi'}
            onChange={handlePaymentMethodChange}
          />
        </div>
        <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
          <label htmlFor="cardPayment" className="flex gap-2 cursor-pointer font-medium">
            <CreditCard className="text-2xl text-red-600" />
            Credit or Debit Card
          </label>
          <input
            type="radio"
            id="cardPayment"
            name="paymentMethod"
            value="card"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
            checked={selectedPaymentMethod === 'card'}
            onChange={handlePaymentMethodChange}
          />
        </div>
      </div>
      <h1 className="text-red-950 font-medium">AVAILABLE OFFERS</h1>
      <div>
        <div>
          -10% off on HDFC Bank Credit Card. Use <span className="font-bold">HDFC10</span>
          <span className="text-red-600 underline">View more Offers</span>
        </div>
        <div>
          -7% off on SBI Bank Credit Card. Use <span className="font-bold">SBI7</span>{' '}
          <span className="text-red-600 underline">View more Offers</span>
        </div>
      </div>
    </div>
  );
};

export default Payment;