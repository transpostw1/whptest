"use client";
import React, { useState, useEffect, useRef } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import FilterOptions from "./FilterOptions";
import { ProductType } from "@/type/ProductType";

interface Props {
  data: any;
  filters: any;
  filteredProducts: ProductType[];
  onFilterChange: (options: any) => void;
  mobileFilter: boolean;
  setMobileFilter: (arg: boolean) => void;
  selectedOptions: any;
  handleOptionSelect: (arg: string, arg2: string) => void;
  productsListRef: React.RefObject<HTMLDivElement>;
  category: string;
}

const FilterSidebar: React.FC<Props> = ({
  filteredProducts,
  filters,
  onFilterChange,
  mobileFilter,
  setMobileFilter,
  selectedOptions,
  handleOptionSelect,
  productsListRef,
}) => {
  const [filterDropDown, setFilterDropDown] = useState<string>("");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSidebarFixed, setIsSidebarFixed] = useState<boolean>(false);

  const handleFilterDropdown = (item: string) => {
    setFilterDropDown(item);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sidebarElement = sidebarRef.current;
      const productsListElement = productsListRef.current;

      if (sidebarElement && productsListElement) {
        const sidebarTop = sidebarElement.offsetTop;

        const sidebarBottom =
          sidebarElement.offsetTop + sidebarElement.offsetHeight;
        const productsListBottom =
          productsListElement.offsetTop + productsListElement.offsetHeight;
        const windowHeight = window.innerHeight + window.pageYOffset;
        const isAboveProductsList = windowHeight > sidebarTop;
        const isAtProductsListBottom =
          sidebarBottom >= productsListBottom &&
          windowHeight >= productsListBottom; // Check for end of products

        const isSidebarInViewport =
          isAboveProductsList && !isAtProductsListBottom;
        const isAtTop = window.pageYOffset <= sidebarTop;

        setIsSidebarFixed(isSidebarInViewport && !isAtTop);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [productsListRef]);

  const handleMobileFilter = () => {
    setMobileFilter(false);
  };

  useEffect(() => {
    onFilterChange(selectedOptions);
  }, [selectedOptions, onFilterChange]);

  return (
    <>
      <div
        className={`sidebar hidden w-full pt-4 md:block md:w-1/3 lg:block lg:w-[300px]`}
        ref={sidebarRef}
      >
        <div
          className={`filter-type border-line custom-scrollbar h-[450px] overflow-y-auto pb-8 md:h-[380px] ${
            isSidebarFixed ? "fixed w-[300px]" : "relative"
          }`}
          style={{
            position: isSidebarFixed ? "fixed" : "relative",
            top: isSidebarFixed ? "120px" : "auto",
            width: isSidebarFixed ? "250px" : "250px",
          }}
        >
          <div className="heading6 border-b-2">FILTER BY</div>
          <div className="mt-5">
            <p className="heading7">Applied Filters</p>
          </div>
          <div className="flex flex-wrap">
            {Object.entries(selectedOptions).flatMap(([category, options]) =>
              (options as string[]).map((option: string, index: number) => (
                <div
                  key={`${category}-${index}`}
                  className="mr-1 mt-1 border border-[#e26178] bg-[#fcf4f6] px-[10px] py-[5px] text-[#e26178]"
                >
                  {option}
                  <button
                    className="mb-1 ml-2 align-middle"
                    onClick={() => handleOptionSelect(option, category)}
                  >
                    <Icon.X size={20} />
                  </button>
                </div>
              )),
            )}
          </div>
          <div className="list-type mt-4">
            <FilterOptions
              filters={filters}
              handleMobileFilter={handleMobileFilter}
              filterDropDown={filterDropDown}
              handleFilterDropdown={handleFilterDropdown}
              handleOptionSelect={handleOptionSelect}
              selectedOptions={selectedOptions}
            />
          </div>
        </div>
      </div>
      {mobileFilter && (
        <div className="fixed inset-0 z-10 h-[100vh] bg-white">
          <div className="mt-20 p-4">
            <Icon.X size={25} onClick={() => setMobileFilter(false)} />
            <div className="no-scrollbar h-[350px] overflow-y-auto">
              <div className="mt-5">
                <p className="heading7">Filter</p>
              </div>
              <div className="list-type mt-4">
                <FilterOptions
                  filters={filters}
                  handleMobileFilter={handleMobileFilter}
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
