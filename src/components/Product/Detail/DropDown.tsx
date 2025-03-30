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

  const handleNewVariants = (
    e: React.ChangeEvent<HTMLSelectElement>,
    variantType: string,
  ) => {
    const variantGroup = product.variants.find(
      (v) => v.VariantType === variantType,
    );
    const selectedName = e.target.value;

    // Find option by VariantName instead of ProductUrl
    const selectedOption = variantGroup?.VariantOption.find(
      (opt) => opt.VariantName === selectedName,
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
    <div className="my-2 overflow-x-auto lg:w-[85%]">
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead className="bg-gradient-to-r from-[#fed258] via-[#fda385] to-[#fc46c6]">
          <tr className="border border-gray-300 p-1 text-sm font-normal md:text-base">
            <th colSpan={2} className="p-2 font-normal" >Customize Your Jewellery</th>
          </tr>
        </thead>
        <tbody>
          {product?.variants?.map((item: any, index: any) => (
            <tr key={index} className="border border-gray-300 bg-white">
              <td className="flex items-center gap-1 p-1 text-sm md:p-2 md:text-base">
                {item.VariantType}
              </td>
              <td className="border border-gray-300 p-1">
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-white p-1 text-sm outline-none focus:ring-0 md:text-base"
                    value={
                      selectedVariants.find((v) => v.type === item.VariantType)
                        ?.name || ""
                    }
                    onChange={(e) => handleNewVariants(e, item.VariantType)}
                  >
                    {item?.VariantOption?.map((options: any, idx: any) => (
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
