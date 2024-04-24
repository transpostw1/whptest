import React from 'react';
import OrderSummaryProducts from './OrderSummaryProducts';

interface OrderSummaryProps {
  totalCart: number;
  cartItems: any[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ totalCart, cartItems }) => {
  return (
    <div className="">
      <OrderSummaryProducts cartItems={cartItems} />
      <div className="bg-gray-100 p-2 ">
        <div className="">
          <div className="flex justify-between font-medium">
            <h3>Subtotal</h3>
            <h3>₹{totalCart}</h3>
          </div>
          <div className="flex justify-between font-medium">
            <h3>Discount</h3>
            <h3>₹00</h3>
          </div>
          <div className="flex justify-between font-medium">
            <h3>Shipping Charges</h3>
            <h3>₹0</h3>
          </div>
          <div className="flex justify-between font-medium">
            <h3>G.S.T</h3>
            <h3>₹951.27</h3>
          </div>
          <div className="flex justify-between font-bold">
            <h3 className="text-gray-800">Total Price</h3>
            <h3>₹{totalCart}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;