import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/navigation";
import { ProductType } from "@/type/ProductType";
// Importing FontAwesome icons (if using FontAwesome)
import { FaClipboard, FaCheck } from "react-icons/fa";

interface Props {
  product: ProductType | ProductDetails;
}

const Coupons: React.FC<Props> = ({ product }) => {
  const coupons = product.productDetails?.coupons;
  // console.log(product.productDetails,"PRODDDETS IN COUPONS")
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const handleCopyToClipboard = (couponCode: string) => {
    navigator.clipboard.writeText(couponCode).then(() => {
      
      setCopiedCoupon(couponCode);
    });
  };

  const isCouponCopied = (couponCode: string) => copiedCoupon === couponCode;

  return (
    <div>
      <div className="relative w-full pt-2">
        <Swiper
          spaceBetween={2}
          slidesPerView="auto"
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          className="py-4"
        >
          {coupons?.map((coupon:any, index:any) => (
            <SwiperSlide
              key={index}
              className="!w-auto max-w-[calc(100vw-48px)] lg:w-full"
            >
              <div className="w-full flex-shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-red-100 p-2 text-sm text-red-600">
                      {coupon.discountType === "Amount"
                        ? `₹${coupon.discountValue}`
                        : `${coupon.discountValue}%`}{" "}
                      OFF on {coupon.discountOn}
                    </div>
                  </div>

                  {/* Clipboard/Tick Icon Button */}
                  <button
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                    onClick={() => handleCopyToClipboard(coupon.code)}
                  >
                    {isCouponCopied(coupon.code) ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaClipboard className="text-gray-600" />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  Get {coupon.discountType === "Amount" ? "flat " : ""}
                  {coupon.discountType === "Amount"
                    ? `₹${coupon.discountValue}`
                    : `${coupon.discountValue}%`}{" "}
                  off on minimum purchase of ₹{coupon.discountMinAmount}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {/* Coupon Code Display */}
                    Code: {coupon.code}
                  </span>
                  <span className="text-xs text-gray-500">
                    Valid till{" "}
                    {new Date(coupon.discountEndDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Coupons;
