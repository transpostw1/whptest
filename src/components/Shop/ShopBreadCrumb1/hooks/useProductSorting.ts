import { useState, useEffect } from 'react';
import { ProductType } from '@/type/ProductType';

export const useProductSorting = (filteredProducts: ProductType[]) => {
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>(filteredProducts);

  useEffect(() => {
    if (selectedSortOption === "Price-Low To High") {
      const sorted = [...filteredProducts].sort((a: any, b: any) => {
        const priceA: any = a.discountActive === true ? a.discountPrice : a.productPrice;
        const priceB: any = b.discountActive === true ? b.discountPrice : b.productPrice;
        return priceA - priceB;
      });
      setSortedProducts(sorted);
    } else if (selectedSortOption === "Price-High To Low") {
      const sorted = [...filteredProducts].sort((a: any, b: any) => {
        const priceA: any = a.discountActive === true ? a.discountPrice : a.productPrice;
        const priceB: any = b.discountActive === true ? b.discountPrice : b.productPrice;
        return priceB - priceA;
      });
      setSortedProducts(sorted);
    } else if (selectedSortOption === "Newest First") {
      const sorted = [...filteredProducts].sort((a: any, b: any) => {
        const product1: any = a.addDate;
        const product2: any = b.addDate;
        return product2 - product1;
      });
      setSortedProducts(sorted);
    } else {
      setSortedProducts(filteredProducts);
    }
  }, [selectedSortOption, filteredProducts]);

  const handleSortOptionChange = (option: string) => {
    setSelectedSortOption(option);
  };

  return {
    selectedSortOption,
    sortedProducts,
    handleSortOptionChange
  };
}; 