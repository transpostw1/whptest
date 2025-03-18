"use client";
import React, { useState, useEffect } from "react";
import { ProductData } from "@/type/ProductType";
import { CaretDown } from "@phosphor-icons/react";

interface Props {
  product: ProductData;
  handleVariant: (e: string) => void;
  handleSelectSize: (value: any) => void;
}

const DropDown: React.FC<Props> = ({
  product,
  handleVariant,
  handleSelectSize,
}) => {
  const [selectedVariants, setSelectedVariants] = useState<
    { type: string; name: string; url: string }[]
  >([]);

  useEffect(() => {
    const trueVariants: { type: string; name: string; url: string }[] = [];
    product?.variants?.forEach((item) => {
      item?.VariantOption?.forEach((options) => {
        const productId = Number(product.productId);
        const isSelected = options.ProductId.some((id: any) => id === productId);

        if (isSelected) {
          trueVariants.push({
            type: item.VariantType,
            name: options.VariantName,
            url: options.ProductUrl,
          });
        }
      });
    });

    setSelectedVariants(trueVariants);
    handleSelectSize(trueVariants);
  }, [product]);

  const handleNewVariants = (e: any, variantType: string) => {
    const selectedOption = product.variants
      .flatMap((v) => v.VariantOption)
      .find((opt) => opt.ProductUrl === e.target.value);
    if (selectedOption) {
      const updatedVariants = selectedVariants.map((v) =>
        v.type === variantType ? { ...v, name: selectedOption.VariantName, url: selectedOption.ProductUrl } : v
      );
      setSelectedVariants(updatedVariants);
      handleSelectSize(updatedVariants);
      handleVariant(e.target.value);
    }
  };

  return (
    <div className="mt-2 lg:w-[85%] overflow-x-auto">
      <table className="w-full border border-gray-300 text-left border-collapse">
  <thead className="bg-gray-100">
    <tr>
      <th className="border border-gray-300 p-1 font-semibold">Variant Types</th>
      <th className="border border-gray-300 p-1  font-semibold">Selected Variant</th>
    </tr>
  </thead>
  <tbody>
    {product?.variants?.map((item, index) => (
      <tr key={index} className="bg-white border border-gray-300">
        <td className="p-1 md:p-2 flex items-center gap-1">
          {item.VariantType}
        </td>
        <td className="border border-gray-300 p-1">
          <div className="relative">
            <select
              className="w-full p-1 bg-white outline-none focus:ring-0  appearance-none"
              onChange={(e) => handleNewVariants(e, item.VariantType)}
            >
              {item?.VariantOption?.map((options, idx) => {
                const productId = Number(product.productId);
                const isSelected = options.ProductId.some((id: any) => id === productId);
                return (
                  <option key={idx} value={options.ProductUrl} selected={isSelected}>
                    {options.VariantName}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-600">
              <CaretDown size={16} weight="bold" />
            </div>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default DropDown;
