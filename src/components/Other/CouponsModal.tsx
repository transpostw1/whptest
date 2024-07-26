"use client";
import React, { useRef, useEffect, FormEvent, useState } from "react";

interface Coupon {
  code: string;
  discount: string;
  validity: string;
  description: string;
  applicable: boolean;
}

interface Props {
  handleCouponCheck: (couponCode: string) => void;
  onClose: () => void;
  couponCode: (e: any) => void;
}

const CouponsModal: React.FC<Props> = ({ handleCouponCheck, onClose, couponCode }) => {
  const inputRef = useRef<any>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<string>("");
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      code: "SHAYAUPSELL5",
      discount: "5% OFF",
      validity: "Valid till July 31 2024",
      description: "Get Extra 5% OFF on purchase of 3 or more items",
      applicable: false,
    },
    {
      code: "PERFECT3",
      discount: "3% OFF",
      validity: "Valid till July 31 2024",
      description: "Flat 3% Off on Loose Solitaires Only",
      applicable: false,
    },
    {
      code: "MOUNT5",
      discount: "5% OFF",
      validity: "Valid till July 31 2024",
      description: "Get 5% OFF on all items",
      applicable: false,
    },
  ]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCouponCheck(selectedCoupon);
    onClose();
  };

  const handleCouponChange = (e: any) => {
    setSelectedCoupon(e.target.value);
    couponCode(e.target.value);
  };

  const handleCouponClick = (coupon: Coupon) => {
    setSelectedCoupon(coupon.code);
    handleCouponCheck(coupon.code);
    if (coupon.applicable) {
      onClose();
    }
  };

  const handleOnClose = (e: any) => {
    if (e.target.id === "container") {
      onClose();
    }
  };

  return (
    <div
      id="container"
      className="backdrop fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm"
      onClick={handleOnClose}
    >
      <div className="loading-container flex justify-center items-center h-full">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-center w-full font-semibold text-[#e26178]">Apply Coupon</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Enter Coupon Code:
              </label>
              <input
                type="text"
                ref={inputRef}
                value={selectedCoupon}
                onChange={handleCouponChange}
                placeholder="Enter coupon code"
                className="mt-1 p-2 focus:ring-gray-700 focus:border-gray-700 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            <button className="w-full px-4 py-2 bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d]  text-white rounded-md hover:bg-[#bb547d]">
              Apply
            </button>
          </form>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Other Offers at WHP</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {coupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="flex items-center  border rounded-md shadow-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => handleCouponClick(coupon)}
                >
                  <div className="flex items-center bg-gray-200 p-2 ">
                    <span className="block font-semibold text-gray-800">{coupon.discount}</span>
                  </div>
                  <div className="ml-2 flex-1">
                    <span className="block text-sm text-gray-500">{coupon.validity}</span>
                    <span className="block text-sm text-gray-500">{coupon.description}</span>
                  </div>
                  <div className="text-xs text-red-500 ml-2">
                    {coupon.applicable ? "Applicable" : "Not Applicable"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponsModal;
