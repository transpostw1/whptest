"use client";
import React, { useState, useEffect } from "react";
import { ProductData, ProductType } from "@/type/ProductType";
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface Props {
  product: ProductData;
  handleVariant: (e: string) => void;
}

const DropDown: React.FC<Props> = ({ product, handleVariant }) => {
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const handleNewVariants = (e: any) => {
    console.log("Dropping variants", e.target.value);
    handleVariant(e.target.value);
  };
  useEffect(() => {
    const trueVariants: string[] = [];
    product?.variants?.forEach((item) => {
      item?.VariantOption?.forEach((options) => {
        const productId = Number(product.productId);
        const isSelected = options.ProductId.some((id: any) => id === productId);
        if (isSelected) {
          trueVariants.push(options.VariantName); 
        }
      });
    });
    setSelectedVariants(trueVariants); 
  }, [product]);
  console.log("Selected Variant Names: ", selectedVariants); 
  return (
    <div className="flex border border-[#f3f3f3] lg:w-[75%] sm:w-[100%] md:w-[65%] p-3">
      {product?.variants?.map((item, index) => (
        <div key={index} className="mr-3">
          <p>{item.VariantType}</p>
          <div className="relative">
            <select
              className="bg-[#faf9f9] p-4 pt-2 pb-2 mr-2 block appearance-none lg:w-36 sm:w-20 md:w-[7.5rem]"
              onChange={(e) => {
                handleNewVariants(e);
              }}
            >
              {item?.VariantOption?.map((options, index) => {
                const productId = Number(product.productId);
                const isSelected = options.ProductId.some((id: any) => id === productId);

                return (
                  <option
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-400"
                    value={options.ProductUrl}
                    selected={isSelected}
                  >
                    {options.VariantName}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none ml-3 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <Icon.CaretDown size={20} weight="fill" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropDown;
