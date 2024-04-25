"use client";
import React, { useState, useEffect } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import FilterOptions from "./FilterOptions"; // Replace with your hook path
import { ProductType } from "@/type/ProductType";
import StickyBox, { useStickyBox } from "react-sticky-box";
interface Props {
  data: ProductType[];
  onFilterChange: (arg: ProductType[]) => void;
  mobileFilter: boolean;
  setMobileFilter: (arg: boolean) => void;
  selectedOptions: any;
  handleOptionSelect: (arg: string, arg2: string) => void;
}
const FilterSidebar: React.FC<Props> = ({
  data,
  onFilterChange,
  mobileFilter,
  setMobileFilter,
  selectedOptions,
  handleOptionSelect,
}) => {
  const [filterDropDown, setFilterDropDown] = useState<string>("Price");
  const [fixedHeader, setFixedHeader] = useState<boolean>(false);
  const [lastScrollPosition, setLastScrollPosition] = useState<any>(0);

  const handleFilterDropdown = (item: string) => {
    setFilterDropDown(item);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFixedHeader(
        (scrollPosition > 0 && scrollPosition < lastScrollPosition) ||
          scrollPosition > lastScrollPosition
      );
      setLastScrollPosition(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  useEffect(() => {
    let filteredArray = data.slice();
    Object.entries(selectedOptions).forEach(([category, selectedValues]) => {
      if (selectedValues.length > 0) {
        filteredArray = filteredArray.filter((product) => {
          switch (category) {
            case "Price":
              return selectedValues.some((option: string) => {
                const price = parseInt(product?.discountPrice);
                switch (option) {
                  case "Less than 10K":
                    return price < 10000;
                  case "10k to 20K":
                    return price >= 10000 && price < 20000;
                  case "20k to 30k":
                    return price >= 20000 && price < 30000;
                  case "30k and Above":
                    return price >= 30000;
                  default:
                    return false;
                }
              });
            case "Karat":
              return selectedValues.some((option: string) =>
                product.metalPurity.includes(option.slice(0, -1))
              );
            case "Weight":
              return selectedValues.includes(product.weightRange);
            case "Gender":
              return selectedValues.includes(product.shopFor[0]);
            case "Occasion":
              return selectedValues.includes(product.occasion);
            default:
              return true;
          }
        });
      }
    });
    onFilterChange(filteredArray);
  }, [selectedOptions, data]);
  const stickyRef = useStickyBox({ offsetTop: 20, offsetBottom: 20 });

  return (
    <>
      <div
        className={`sidebar lg:w-[300px] md:w-1/3 w-full md:pr-12 lg:block hidden md:block`}
      >
        
          <div
            className={`filter-type pb-8 border-line h-[550px] no-scrollbar overflow-y-auto ${
              fixedHeader ? "fixed top-[121px] w-[250px]" : "relative"
            }`}
          >
            <div className="heading6 border-b-2">FILTER BY</div>
            <div className="mt-5">
              <p className="heading7">Applied Filters</p>
            </div>

            <div className="flex flex-wrap">
              {Object.entries(selectedOptions).flatMap(([category, options]) =>
                options.map((option: string, index: number) => (
                  <div
                    key={`${category}-${index}`}
                    className="border border-[#e26178] bg-[#fcf4f6] text-[#e26178] px-[10px] py-[5px] mr-1 mt-1"
                  >
                    {option}
                    <button
                      className="ml-2 align-middle mb-1"
                      onClick={() => handleOptionSelect(option, category)}
                    >
                      <Icon.X size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="list-type mt-4">
              <FilterOptions
                filterDropDown={filterDropDown}
                handleFilterDropdown={handleFilterDropdown}
                handleOptionSelect={handleOptionSelect}
                selectedOptions={selectedOptions}
              />
            </div>
          </div>
        
      </div>
      {mobileFilter && (
        <div className="fixed inset-0 bg-white z-10 h-[100vh] ">
          <div className="mt-36 p-4">
            <Icon.X size={25} onClick={() => setMobileFilter(false)} />
            <div className="h-[650px] overflow-y-auto no-scrollbar">
              <div className="mt-5">
                <p className="heading7">Filter</p>
              </div>
              <div className="list-type mt-4">
                <FilterOptions
                  filterDropDown={filterDropDown}
                  handleFilterDropdown={handleFilterDropdown}
                  handleOptionSelect={handleOptionSelect}
                  selectedOptions={selectedOptions}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
