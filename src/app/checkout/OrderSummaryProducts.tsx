import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";
interface OrderSummaryProductsProps {
  cartItems: any[];
  isBuyNow: boolean;
}

const OrderSummaryProducts: React.FC<OrderSummaryProductsProps> = ({
  cartItems,
  isBuyNow,
}) => {
  const { formatPrice } = useCurrency();
  const displayedItems = isBuyNow ? cartItems.slice(0, 1) : cartItems;
  console.log(displayedItems);

  return (
    <div className="list-product-main mb-2 hidden w-full lg:block">
      {displayedItems?.length < 1 ? (
        <p className="pt-3 text-center text-xl font-medium">
          There is nothing here!
        </p>
      ) : (
        displayedItems?.map((product, index) => (
          <div
            className="mb-2 flex w-full items-center border border-gray-200"
            key={index}
          >
            <Link href={`products/${product.productId}/${product.url}`}>
              <Image
                src={product.image}
                width={100}
                height={200}
                alt={product.name}
                className="rounded-lg object-cover"
                unoptimized
              />
            </Link>
            <div className="flex flex-col p-4">
              <div className="text-title">
                <Link href={`products/${product.productId}/${product.url}`}>
                  {product.name}
                </Link>
                <span className="font-normal lowercase">
                  {" "} X {product.quantity}
                </span>
              </div>
              <div className="text-title text-start">
                {formatPrice(product.price)}
              </div>
              {/* <h3>Estimated Delivery Date: 29/2/2024</h3> */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderSummaryProducts;
