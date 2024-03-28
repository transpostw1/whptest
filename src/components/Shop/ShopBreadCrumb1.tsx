"use client";

import React, { useState, useEffect } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Product from "../Product/Product";
import "rc-slider/assets/index.css";
import ReactPaginate from "react-paginate";
import SortBy from "../Other/SortBy";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import FilterOptions from "./FilterOptions";
import FilterSidebar from "./FilterSidebar";
import ProductSkeleton from "./ProductSkeleton";
import { ProductType } from "@/type/ProductType";
import { baseUrl } from "@/utils/constants";

const ShopBreadCrumb1 = () => {
  const [sortOption, setSortOption] = useState<boolean|null>(false);
  const [isLoading, setIsLoading] = useState<boolean|null>(true);
  const [mobileFilter, setMobileFilter] = useState<boolean|null>(false);
  const [data, setData] = useState<ProductType[]>([]);
  const [filteredData, setFilteredData] = useState<ProductType[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(0);
  const productsPerPage = 9;
  const pagesVisited = pageNumber * productsPerPage;
  const param = useSearchParams();
  const name = param.get("url");

  const pageCount = Math.ceil(filteredData.length / productsPerPage);

  const changePage = ({ selected }:any) => {
    setPageNumber(selected);
  };

  const handleSortOptionChange = (option:string) => {
    setSelectedSortOption(option);
  };

  const handleFilterChange = (filteredProducts:ProductType[]) => {
    console.log("Filtered products:", filteredProducts);
    setFilteredData(filteredProducts);
    setPageNumber(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/getall-products`
        );
        setData(response.data);
        setFilteredData(response.data);
        setIsLoading(false)
      } catch (error) {
        console.log("data is unable to fetch");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let sortedData = [...filteredData];

    if (selectedSortOption === "all") {
      sortedData=filteredData
    } else if (selectedSortOption === "priceHighToLow") {
      sortedData.sort(
        (a, b) => parseInt(b.discountPrice) - parseInt(a.discountPrice)
      );
    } else if (selectedSortOption === "priceLowToHigh") {
      sortedData.sort(
        (a, b) => parseInt(a.discountPrice) - parseInt(b.discountPrice)
      );
    } else if (selectedSortOption == "newestFirst") {
      sortedData.sort(
        (a, b) => new Date(a.addDate).getTime() - new Date(b.addDate).getTime()
      );
    }

    setFilteredData(sortedData);
    setPageNumber(0);
  }, [selectedSortOption]);

  return (
    <div className="shop-product breadcrumb1 sm:py-10 lg:py-0">
      <div className="container">
        <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">
          <FilterSidebar
            data={data}
            onFilterChange={handleFilterChange}
            mobileFilter={mobileFilter}
            setMobileFilter={setMobileFilter}
          />

          <div className="list-product-block lg:w-3/4 md:w-2/3 w-full md:pl-3 h-[650px] overflow-y-auto no-scrollbar">
            <div className="">
              <p className="text-4xl font-bold uppercase">{name}</p>
            </div>
            <div className="flex justify-between mt-5">
              <div className="lg:w-[70%] sm:w-[100%]">
                Earrings are a form of self-expression. They effortlessly
                transform an outfit, framing the face with style and grace.
              </div>
              <div className="hidden lg:block relative">
                <label className="font-semibold">Sort By: </label>
                <select
                  onChange={(e) => handleSortOptionChange(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option className="bg-[#f7f7f7]"  value="all">All</option>
                  <option className="bg-[#f7f7f7]" value="newestFirst">
                    Newest First
                  </option>
                  <option className="bg-[#f7f7f7]" value="priceLowToHigh">
                    Price-Low To High
                  </option>
                  <option className="bg-[#f7f7f7]" value="priceHighToLow">
                    Price-High To Low
                  </option>
                </select>
                <div className="pointer-events-none ml-3 absolute inset-y-7 bottom-0 right-0 flex items-center px-2 text-gray-700">
                  <Icon.CaretDown size={18} />
                </div>
              </div>
            </div>
            {isLoading === true ? (
                <ProductSkeleton />
              ) : (
                <div className="list-product hide-product-sold grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[40px] mt-7">
                  {filteredData
                    .slice(pagesVisited, pagesVisited + productsPerPage)
                    .map((item: any) => (
                      <Product key={item.productId} data={item} />
                    ))}
                </div>
              )}
          </div>
        </div>
        <div className="flex justify-center">
          {pageCount > 1 && (
            <div className="list-pagination flex items-center md:mt-10 mt-7">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          )}
        </div>
      </div>

      <div className="fixed bg-[#e26178] bottom-0 left-0 z-10 w-[100%] lg:hidden block h-[52px]">
        <div className="flex justify-center align-middle mt-4 text-white">
          <div className="mr-5" onClick={() => setSortOption(!sortOption)}>
            SortBy
          </div>
          <div className="flex" onClick={() => setMobileFilter(!mobileFilter)}>
            <p>Filter </p>
          </div>
        </div>
      </div>
      {sortOption && <SortBy visible={sortOption} onClose={() => setSortOption(false)} onSortOptionChange={handleSortOptionChange} />}
      
    </div>
  );
};

export default ShopBreadCrumb1;