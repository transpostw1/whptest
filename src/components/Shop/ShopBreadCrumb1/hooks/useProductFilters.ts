import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const useProductFilters = () => {
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [initialOptions, setInitialOptions] = useState<any>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOptionSelect = (option: string, category: string) => {
    setSelectedOptions((prevSelectedOptions: any) => {
      const updatedOptions = { ...prevSelectedOptions };

      if (category === "Category" || category === "productCategory") {
        if (updatedOptions["productCategory"]?.[0] === option) {
          delete updatedOptions["productCategory"];
        } else {
          delete updatedOptions["Category"];
          updatedOptions["productCategory"] = [option];
        }
      } else {
        if (updatedOptions[category]) {
          const formattedOption = formatPriceRange(option);
          if (updatedOptions[category].includes(formattedOption)) {
            updatedOptions[category] = updatedOptions[category].filter(
              (selectedOption: any) => selectedOption !== formattedOption,
            );
            if (updatedOptions[category].length === 0) {
              delete updatedOptions[category];
            }
          } else {
            updatedOptions[category].push(formattedOption);
          }
        } else {
          updatedOptions[category] = [formatPriceRange(option)];
        }
      }

      updateURL(updatedOptions);
      return updatedOptions;
    });
  };

  const updateURL = (options: any) => {
    const searchParams = new URLSearchParams(window.location.search);
    const source = searchParams.get("source");
    if (source === "search") {
      return;
    }

    const urlParts: string[] = [];
    if (options.productCategory?.length > 0) {
      urlParts.push(`pc-${options.productCategory[0]}`);
    } else if (options.Category?.length > 0) {
      urlParts.push(`pc-${options.Category[0]}`);
    }
    if (options.Search?.length > 0) {
      urlParts.push(`search-${options.Search.join(",")}`);
    }
    if (options.Shop_For?.length > 0) {
      urlParts.push(`gender-${options.Shop_For.join(",")}`);
    }
    if (options.Karat?.length > 0) {
      urlParts.push(`karat-${options.Karat.join(",")}`);
    }
    if (options.Price?.length > 0) {
      urlParts.push(`price-${options.Price.join("|")}`);
    }
    if (options.Metal?.length > 0) {
      urlParts.push(`metal-${options.Metal.join(",")}`);
    }
    if (options.Weight?.length > 0) {
      urlParts.push(`weight-${options.Weight.join(",")}`);
    }
    if (options.Occasion?.length > 0) {
      urlParts.push(`occasion-${options.Occasion.join(",")}`);
    }

    const url = `${window.location.pathname}?url=${urlParts.join("+")}`;
    router.replace(url);
  };

  const formatPriceRange = (price: string) => {
    if (price === "Less than 10K") {
      return "0to10000";
    } else if (price === "10Kto20K") {
      return "10000to20000";
    } else if (price === "20Kto30K") {
      return "20000to30000";
    } else if (price === "30Kto40K") {
      return "30000to40000";
    } else if (price === "40Kto50K") {
      return "40000to50000";
    } else if (price === "50000toInfinity") {
      return "50000toInfinity";
    }
    return price;
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const queryValue = params.get("url") || "";

    const initialOptions: any = {};

    const parts = queryValue.split(" ");
    parts.forEach((part) => {
      const [key, value] = part.split("-");

      if (key === "category") {
        initialOptions.Category = value.split(",");
      }
      if (key === "search") {
        initialOptions.Search = value.split(",");
      }
      if (key === "gender") {
        initialOptions.Shop_For = value.split(",");
      }
      if (key === "karat") {
        initialOptions.Karat = value.split(",");
      }
      if (key === "price") {
        initialOptions.Price = value.split("|");
      }
      if (key === "metal") {
        initialOptions.Metal = value.split(",");
      }
      if (key === "weight") {
        initialOptions.Weight = value.split(",");
      }
      if (key === "occasion") {
        initialOptions.Occasion = value.split(",");
      }
      if (key === "pc") {
        initialOptions.productCategory = value.split(",");
      }
    });
    setSelectedOptions(initialOptions);
  }, [searchParams]);

  return {
    selectedOptions,
    setSelectedOptions,
    initialOptions,
    handleOptionSelect,
    formatPriceRange
  };
}; 