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
      if (item?.VariantOption?.length > 0) {
        // Always select first option initially
        const variantOption = item.VariantOption[0];
        trueVariants.push({
          type: item.VariantType,
          name: variantOption.VariantName,
          url: variantOption.ProductUrl,
        });
      }
    });
    setSelectedVariants(trueVariants);
    handleSelectSize(trueVariants);
  }, [product]);

  const handleNewVariants = (e: React.ChangeEvent<HTMLSelectElement>, variantType: string) => {
    const variantGroup = product.variants.find(v => v.VariantType === variantType);
    const selectedName = e.target.value;
    
    // Find option by VariantName instead of ProductUrl
    const selectedOption = variantGroup?.VariantOption.find(
      opt => opt.VariantName === selectedName
    );

    if (selectedOption) {
      const updatedVariants = selectedVariants
        .filter((v) => v.type !== variantType)
        .concat({
          type: variantType,
          name: selectedOption.VariantName,
          url: selectedOption.ProductUrl,
        });

      setSelectedVariants(updatedVariants);
      handleSelectSize(updatedVariants);
      handleVariant(selectedOption.ProductUrl);
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
                    value={selectedVariants.find(v => v.type === item.VariantType)?.name || ''}
                    onChange={(e) => handleNewVariants(e, item.VariantType)}
                  >
                    {item?.VariantOption?.map((options, idx) => (
                      <option key={idx} value={options.VariantName}>
                        {options.VariantName}
                      </option>
                    ))}
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