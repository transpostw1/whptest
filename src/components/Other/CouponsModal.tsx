"use client";
import React, { useRef, useEffect, FormEvent } from "react";

interface Props {
  handleCouponCheck: () => void;
  onClose: () => void;
  couponCode: (e: any) => void;
}
const CouponsModal: React.FC<Props> = ({
  handleCouponCheck,
  onClose,
  couponCode,
}) => {
  const inputRef = useRef<any>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handleFormSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCouponCheck();
    onClose();
  };
  const handleCouponChange = (e: any) => {
    couponCode(e.target.value);
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
      <div className="loading-container flex h-full items-center justify-center">
        <div className="bg-white p-2">
          <form onSubmit={handleFormSumbit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#e26178]">
                Enter Coupon Code:
              </label>
              <input
                type="text"
                ref={inputRef}
                onChange={(e) => handleCouponChange(e)}
                placeholder="Enter coupon code"
                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-[#e26178] focus:ring-[#e26178] sm:text-sm"
                required
              />
            </div>
            <button className="flex w-full justify-center rounded-2xl bg-[#e26178] px-3 py-2 text-white">
              Check
            </button>
          </form>
          <div className="mt-3 rounded-lg bg-[#d4c3c6] p-3">
            <p>Other Offer at WHP JEWELLERS</p>

            <div className="mt-4 flex rounded-lg bg-[#b37ca7]">
              <div className="rounded-bl-lg rounded-tl-lg bg-[#e26178]">
                <p className="-rotate-90 text-lg text-white">5% OFF</p>
              </div>
              <div className="text-white p-2">
                <p>DISCOUNT 5%</p>
                <p>Valid till 31 July 2024</p>
                <div className="mt-4">
                  <p>
                    Get 5% off on Making Charges <br />
                    for any gold product
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponsModal;
