import React from "react";
import Image from "next/image";

interface Props {
  singleOrder: any;
}

const SingleOrderDetails: React.FC<Props> = ({ singleOrder }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <p>Order No.:{singleOrder[0].orderNo}</p>
        </div>
        <div className="flex">
          <p className="mr-1">Tracking Status:</p>
          <p className="text-green-600 font-bold text-lg">
            {singleOrder[0]?.order_list.name}
          </p>
        </div>
      </div>
      {singleOrder[0]?.productDetails.map((items: any, index: any) => (
        <div
          key={index}
          className="flex justify-between p-4 border border-black"
        >
          {items.productDetails.map((product: any, index: any) => (
            <div className="flex" key={index}>
              <div className="mr-3">
                <Image
                  src={product?.imageDetails[0].image_path}
                  alt={"image"}
                  width={85}
                  height={85}
                />
              </div>
              <div>
                <p className="text-xl font-semibold">{product?.displayTitle}</p>
                <p>
                  {product?.metalType}-{product?.metalWeight}
                </p>
              </div>
            </div>
          ))}
          <p>
            <div className="font-semibold">
              ₹
              {Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
              }).format(Math.round(parseInt(items?.discountedTotal)))}
            </div>
          </p>
          <p>{items?.quantity}</p>

          <div className="font-semibold">
            ₹
            {Intl.NumberFormat("en-IN", {
              minimumFractionDigits: 2,
            }).format(
              Math.round(
                parseInt(items?.discountedTotal) * parseInt(items?.quantity)
              )
            )}
          </div>
          {items?.isReturnable && <button>Return Here</button>}
        </div>
      ))}
      <div className="flex">
        <div className="border border-black w-[30%] mb-2 mt-4 ">
          <p className=" border-black border-b p-2 font-semibold">
            Billing Address
          </p>
          <p className="w-full border-black border-b p-2">
            {singleOrder[0]?.billingAddressId[0]?.full_address},
            {singleOrder[0]?.billingAddressId[0]?.landmark},
            {singleOrder[0]?.billingAddressId[0]?.pincode},
            {singleOrder[0]?.billingAddressId[0]?.state},
            {singleOrder[0]?.billingAddressId[0]?.city}
            <p>
              Address Type:{singleOrder[0]?.billingAddressId[0]?.address_type}
            </p>
          </p>
          <p className="border-black border-b p-2 font-semibold">
            Shipping Address
          </p>
          <p className="p-2">
            {singleOrder[0]?.shippingAddressId[0].full_address},
            {singleOrder[0]?.shippingAddressId[0]?.landmark},
            {singleOrder[0]?.shippingAddressId[0]?.pincode},
            {singleOrder[0]?.shippingAddressId[0]?.state},
            {singleOrder[0]?.shippingAddressId[0]?.city}
            <p>
              Address Type:{singleOrder[0]?.shippingAddressId[0]?.address_type}
            </p>
          </p>
        </div>
        <div className="border border-black w-[30%] mb-2 mt-4 ml-2">
          <p className=" border-black border-b font-semibold p-2 mb-2">
            Payment Details
          </p>
          <p className="px-2">Order Date:{singleOrder[0]?.payments[0]?.date}</p>
          <p className="px-2">
            Payment Method: {singleOrder[0]?.payments[0]?.paymentMethod}
          </p>
          <p className="px-2">
            Transaction No.: {singleOrder[0]?.payments[0]?.transactionNo}
          </p>
          <p className="px-2">
            Amount: ₹
            {Intl.NumberFormat("en-IN", {
              minimumFractionDigits: 2,
            }).format(Math.round(singleOrder[0]?.payments[0]?.amount))}
          </p>
        </div>
      </div>

      {singleOrder[0]?.orderStatus === "4" ||
      singleOrder[0]?.orderStatus === "5" ? null : (
        <div>
          <button className="bg-[#e26178] text-white px-3 py-2 rounded-sm">
            Order Cancel
          </button>
        </div>
      )}
      {/* {message && <FlashAlert message={message} type={"success"} />} */}
    </div>
  );
};

export default SingleOrderDetails;
