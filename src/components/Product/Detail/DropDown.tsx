"use client";
import React, { useState, useEffect } from "react";
import { ProductData, ProductType } from "@/type/ProductType";
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface Props {
  product: ProductData;
  handleVariant: (e: string) => void;
  handleSelectSize: (value: any) => void;
}

const DropDown: React.FC<Props> = ({ product, handleVariant, handleSelectSize }) => {
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
        const isSelected = options.ProductId.some(
          (id: any) => id === productId,
        );
        if (isSelected) {
          trueVariants.push(options.VariantName);
        }
      });
    });
    setSelectedVariants(trueVariants);
    handleSelectedVariants(trueVariants);
  }, [product]);
  const handleSelectedVariants = (trueVariants:any) => {
    handleSelectSize(trueVariants);
  };
  return (
    <div className="flex border border-[#f3f3f3] p-3 sm:w-[100%] md:w-[65%] lg:w-[75%]">
      {product?.variants?.map((item, index) => (
        <div key={index} className="mr-3">
          <p>{item.VariantType}</p>
          <div className="relative">
            <select
              className="mr-2 block appearance-none bg-[#faf9f9] p-4 pb-2 pt-2 sm:w-20 md:w-[7.5rem] lg:w-36"
              onChange={(e) => {
                handleNewVariants(e);
              }}
            >
              {item?.VariantOption?.map((options, index) => {
                const productId = Number(product.productId);
                const isSelected = options.ProductId.some(
                  (id: any) => id === productId,
                );

                return (
                  <option
                    key={index}
                    className="cursor-pointer p-2 hover:bg-gray-400"
                    value={options.ProductUrl}
                    selected={isSelected}
                  >
                    {options.VariantName}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center px-2 text-gray-700">
              <Icon.CaretDown size={20} weight="fill" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropDown;
