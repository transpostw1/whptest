import React, { useState } from "react";
import OrderSummaryProducts from "./OrderSummaryProducts";
import { useUser } from "@/context/UserContext";
import FlashAlert from "@/components/Other/FlashAlert";
interface OrderSummaryProps {
  wallet: any;
  handleWhpWallet: any;
  totalProductPrice: any;
  discountDifference: any;
  price: any;
  totalDiscount: any;
  totalCart: any;
  cartItems: any[];
  isBuyNow: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  wallet,
  handleWhpWallet,
  discountDifference,
  totalProductPrice,
  totalDiscount,
  price,
  totalCart,
  cartItems,
  isBuyNow,
}) => {
  const { userDetails } = useUser();
  let totalPrice = totalCart - totalDiscount;
  // const [whpWallet, setWhpWallet] = useState<any>();

  // const handleWhpWallet = (e: any) => {
  //   if (e.target.checked) {
  //     setWhpWallet("whp_Wallet");
  //   } else {
  //     setWhpWallet(null);
  //   }
  // };
  return (
    <div className="">
      <OrderSummaryProducts cartItems={cartItems} isBuyNow={isBuyNow} />
      <div className="flex justify-between border p-2">
        <>
          <div className="flex items-center gap-2 font-medium">
            <input
              type="checkbox"
              value="whp_Wallet"
              checked={wallet == "whp_Wallet"}
              onChange={handleWhpWallet}
            />
            <h3>Whp Wallet</h3>
          </div>
        </>
      </div>
      <div className="mt-2 bg-gray-100 p-2">
        <div className="">
          <div className="flex justify-between font-medium">
            <h3>Product Total</h3>
            <h3>
              ₹
              {Intl.NumberFormat("en-IN").format(
                Math.round(parseInt(totalProductPrice)),
              )}
            </h3>
          </div>
          <div className="flex justify-between font-medium">
            <h3>Product Discount</h3>
            <h3>
              -₹
              {Intl.NumberFormat("en-IN").format(
                Math.round(parseInt(discountDifference)),
              )}
            </h3>
          </div>
          <div className="flex justify-between font-medium">
            <h3>Subtotal</h3>
            <h3>
              ₹{Intl.NumberFormat("en-IN").format(Math.round(parseInt(price)))}
            </h3>
          </div>
          <div className="flex justify-between font-medium">
            <h3>Discount</h3>
            <h3>
              -₹
              {Intl.NumberFormat("en-IN").format(
                Math.round(parseInt(totalDiscount)),
              )}
            </h3>
          </div>
          <div className="flex justify-between font-medium">
            <h3>Wallet</h3>
            {wallet === "whp_Wallet" &&
            userDetails?.wallet_amount < totalPrice ? (
              <h3>
                -₹
                {Intl.NumberFormat("en-IN").format(
                  Math.round(parseInt(userDetails?.wallet_amount)),
                )}
              </h3>
            ) : (
              <h3>
                ₹{Intl.NumberFormat("en-IN").format(Math.round(parseInt("0")))}
              </h3>
            )}
          </div>
          <div className="flex justify-between font-medium">
            <h3>Shipping Charges</h3>
            <h3>₹{Intl.NumberFormat("en-IN").format(Math.round(0))}</h3>
          </div>
          <div className="flex justify-between font-bold">
            <h3 className="text-gray-800">Total Price</h3>
            {wallet === "whp_Wallet" &&
            userDetails?.wallet_amount < totalPrice ? (
              <h3>
                ₹
                {Intl.NumberFormat("en-IN").format(
                  Math.round(
                    parseInt(
                      (totalPrice - userDetails?.wallet_amount).toString(),
                    ),
                  ),
                )}
              </h3>
            ) : (
              <h3>
                ₹
                {Intl.NumberFormat("en-IN").format(
                  Math.round(parseInt(totalPrice.toString())),
                )}
              </h3>
            )}
          </div>
        </div>
      </div>
      {wallet == "whp_Wallet" && userDetails?.wallet_amount > totalPrice && (
        <FlashAlert
          message={"Your Cart Value should be greater than your Wallet Amount"}
          type={"error"}
        />
      )}
    </div>
  );
};

export default OrderSummary;
