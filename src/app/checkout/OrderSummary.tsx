import React from "react";
import OrderSummaryProducts from "./OrderSummaryProducts";

interface OrderSummaryProps {
  totalProductPrice: any;
  discountDifference: any;
  price: any;
  totalDiscount: any;
  totalCart: any;
  cartItems: any[];
  isBuyNow: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  discountDifference,
  totalProductPrice,
  totalDiscount,
  price,
  totalCart,
  cartItems,
  isBuyNow,
}) => {
  let totalPrice = totalCart - totalDiscount;
  return (
    <div className="">
      <OrderSummaryProducts cartItems={cartItems} isBuyNow={isBuyNow} />
      <div className="bg-gray-100 p-2 mt-2">
        <div className="">
          <div className="flex justify-between font-medium">
            <h3>Product Total</h3>
            <h3>
              ₹
              {Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
              }).format(Math.round(parseInt(totalProductPrice)))}
            </h3>
          </div>
          <div className="flex justify-between font-medium">
            <h3>Product Discount</h3>
            <h3>
              -₹
              {Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
              }).format(Math.round(parseInt(discountDifference)))}
            </h3>
          </div>
          <div className="flex justify-between font-medium">
            <h3>Subtotal</h3>
            <h3>
              ₹
              {Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
              }).format(Math.round(parseInt(price)))}
            </h3>
          </div>
          <div className="flex justify-between font-medium">
            <h3>Discount</h3>
            <h3>
              ₹
              {Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
              }).format(Math.round(parseInt(totalDiscount)))}
            </h3>
          </div>
          <div className="flex justify-between font-medium">
            <h3>Shipping Charges</h3>
            <h3>
              ₹
              {Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
              }).format(Math.round(0))}
            </h3>
          </div>
          <div className="flex justify-between font-bold">
            <h3 className="text-gray-800">Total Price</h3>
            <h3>
              ₹
              {Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
              }).format(Math.round(parseInt(totalPrice.toString())))}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;