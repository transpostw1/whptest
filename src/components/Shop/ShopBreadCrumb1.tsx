"use client";

import React, { useState, useEffect } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType } from "@/type/ProductType";
// import Products from "@/data/Products.json";
import Product from "../Product/Product";
import "rc-slider/assets/index.css";
import Checkbox from "@/components/Other/CheckBox";
import ReactPaginate from "react-paginate";
import SortBy from "../Other/SortBy";
import MobileFilters from "../Other/MobileFilters";
import axios from "axios";
import DownloadAppBanner from "../Other/DownloadAppBanner";
import { useSearchParams } from "next/navigation";

interface Props {
  // data: Array<ProductType>;
  productPerPage: number;
  dataType: string | null | undefined;
  gender: string | null;
  category: string | null;
}

const Filter = [
  {
    title: "Price",
    options: ["Less than 10K", "10k to 20K", "20k to 30k", "30k and Above"],
  },
  {
    title: "Karat",
    options: ["14k", "22k", "24k"],
  },
  {
    title: "Weight",
    options: ["0-2 g", "2-5 g", "5-10 g", "10-20 g"],
  },
  {
    title: "Gender",
    options: ["Men", "Women", "Kids"],
  },
  { title: "Type", options: [] },
  {
    title: "Style",
    options: [],
  },
  {
    title: "Occasion",
    options: [
      "Everyday",
      "Work Wear",
      "Wedding",
      "Desk to Dinner",
      "Evening",
      "Party Wear",
    ],
  },
  { title: "Colours", options: [] },
  { title: "Delivery", options: ["Fast Delivery", "Cash On Delivery", "EMI"] },
  { title: "Categories", options: ["Gold Earrings", "Diamond Earrings"] },
];
const ShopBreadCrumb1: React.FC<Props> = ({}) => {
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortOption, setSortOption] = useState<boolean>(false);
  const [mobileFilter, setMobileFilter] = useState<boolean | null>(false);
  const [color, setColor] = useState<string | null>();
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [checkedOptions, setCheckedOptions] = useState<any>({});
  const [brand, setBrand] = useState<string | null>();
  const [dropdown, setDropdown] = useState<boolean | null>(false);
  const [filterDropDown, setFilterDropDown] = useState<string | null>("Price");
  const [header, setHeader] = useState<boolean | null>(true);
  const [data, setData] = useState<ProductType>([]);
  const [filteredData, setFilteredData] = useState<ProductType[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100,
  });
  const [length, setLength] = useState<number | null>(null);
  const param=useSearchParams()
  const name =param.get("url");
  

  const productsPerPage = 9;
  const pagesVisited = pageNumber * productsPerPage;

  const pageCount = Math.ceil(data.length / productsPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };
  const handleFilterDropdown = (item: any) => {
    setFilterDropDown(item);
  };
  const handleCloseMobileFilters = () => {
    setMobileFilter(false);
  };

  const handleOnClose = () => {
    setSortOption(false);
  };

  const handleOptionSelect = (option: any) => {
    const newCheckedOptions = {
      ...checkedOptions,
      [option]: !checkedOptions[option],
    };
    setCheckedOptions(newCheckedOptions);

    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(
        selectedOptions.filter(
          (selectedOption: any) => selectedOption !== option
        )
      );
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.get<ProductType[]>(
          "http://164.92.120.19/api/getall-products"
        );
        setData(response.data);
        setFilteredData(response.data)
        
      } catch (error) {
        console.log("data is unable to fetch");
      }
    };
    fetchData();
  }, []);

  const handleFilter=()=>{
    selectedOptions.map((item:string)=>{
      switch (item) {
        case "less than 10K":
          let filters=filteredData.filter(product => parseFloat(product.productPrice) < 10000);
      setFilteredData(filters)
      console.log(selectedOptions,"eeeeeee")
          break;
          case "10k to 20K":
            let filters2=filteredData.filter(product => parseFloat(product.productPrice) >= 10000 && parseFloat(product.productPrice)<20000);
      setFilteredData( filters2)
      console.log(selectedOptions,"kkhhd")
          break;
          case "20k to 30K":
          let filters3=filteredData.filter(product => parseFloat(product.productPrice) >= 10000 && parseFloat(product.productPrice)<20000);
      setFilteredData(filters3)
      console.log(selectedOptions,"wwwwww")
          break;
          case "30k and Above":
            let filters4=filteredData.filter(product => parseFloat(product.productPrice) >= 10000 && parseFloat(product.productPrice)<20000);
      setFilteredData(filters4)
      console.log(selectedOptions,"dddddddddd")
        default:
          return []
      }
    })

  }
  useEffect(()=>{
    handleFilter()
  },[selectedOptions])
  
  return (
    <>
      <div className="shop-product breadcrumb1 sm:py-10 lg:py-0">
        <div className="container">
          <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8 ">
            <div
              className={`sidebar lg:w-4/3 md:w-1/3 w-full md:pr-12 lg:block hidden`}
            >
              <div
                className={`filter-type pb-8 border-line h-[550px] no-scrollbar overflow-y-auto `}
              >
                <div className="heading6 border-b-2">FILTER BY</div>
                <div className="mt-5">
                  <p className="heading7">Applied Filters</p>
                </div>

                <div className="flex flex-wrap">
                  {selectedOptions.map((option: string, index: React.Key) => (
                    <div
                      key={index}
                      className="border border-[#e26178] bg-[#fcf4f6] text-[#e26178] px-[10px] py-[5px] mr-1 mt-1"
                    >
                      {option}
                      <button
                        className="ml-2 align-middle mb-1"
                        onClick={() => handleOptionSelect(option)}
                      >
                        <Icon.X size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="list-type mt-4">
                  {Filter.map((item, index) => (
                    <div
                      key={index}
                      className={`item cursor-pointer`}
                      onClick={() => handleFilterDropdown(item.title)}
                    >
                      <div className="text-secondary flex justify-between has-line-before cursor-pointer hover:text-black  capitalize">
                        <p className="text-lg font-semibold">{item.title}</p>

                        <p className="mt-1">
                          <Icon.CaretDown weight="fill" />
                        </p>
                      </div>
                      {/* <div className='text-secondary2'>
                                                ({data.filter(dataItem => dataItem.type === item && dataItem.category === 'fashion').length})
                       </div> */}
                      {filterDropDown === item.title ? (
                        <div>
                          {item.options.map((option, index) => (
                            <div key={option}>
                              <input
                                type="checkbox"
                                id={option}
                                checked={checkedOptions[option]}
                                onChange={() => handleOptionSelect(option)}
                              />
                              <label className="ml-2" htmlFor={option}>
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}

                </div>
              </div>
             
            </div>
            <div className="fixed bg-[#e26178] bottom-0 left-0 z-10 w-[100%] lg:hidden block h-[52px]">
              <div className="flex justify-center align-middle mt-4 text-white">
                <div
                  className="mr-5"
                  onClick={() => setSortOption(!sortOption)}
                >
                  SortBy
                </div>
                <div
                  className="flex"
                  onClick={() => setMobileFilter(!mobileFilter)}
                >
                  <p>Filter </p>
                </div>
              </div>
            </div>
            {sortOption && (
              <SortBy visible={sortOption} onClose={handleOnClose} />
            )}
            {mobileFilter && (
              <div className="fixed inset-0 bg-white z-10 h-[100vh] ">
                <div className="mt-24 p-4">
                  <Icon.X size={25} onClick={() => setMobileFilter(false)} />
                  <div className="h-[650px] overflow-y-auto no-scrollbar">
                    <div className="mt-5">
                      <p className="heading7">Filter</p>
                    </div>
                    <div className="list-type mt-4">
                      {Filter.map((item, index) => (
                        <div
                          key={index}
                          className={`item cursor-pointer`}
                          onClick={() => handleFilterDropdown(item.title)}
                        >
                          <div className="text-secondary flex justify-between has-line-before cursor-pointer hover:text-black  capitalize">
                            <p className="text-lg font-semibold">
                              {item.title}
                            </p>

                            <p className="mt-1">
                              <Icon.CaretDown weight="fill" />
                            </p>
                          </div>
                          {filterDropDown === item.title ? (
                            <div>
                              {item.options.map((option, index) => (
                                <div key={option}>
                                  <input
                                    type="checkbox"
                                    id={option}
                                    checked={checkedOptions[option]}
                                    onChange={() => handleOptionSelect(option)}
                                  />
                                  <label className="ml-2" htmlFor={option}>
                                    {option}
                                  </label>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="list-product-block lg:w-3/4 md:w-2/3 w-full md:pl-3 h-[650px] overflow-y-auto no-scrollbar">
             

              <div className="">
                <p className="text-4xl font-bold uppercase">{name}</p>
              </div>
              <div className="flex justify-between mt-5">
                <div className="lg:w-[70%] sm:w-[100%]">
                  Earrings are a form of self-expression. They effortlessly
                  transform an outfit, framing the face with style and grace.
                </div>
                <div className="hidden lg:block">
                  <span
                    className="flex cursor-pointer font-semibold"
                    onClick={() => {
                      setDropdown(!dropdown);
                    }}
                  >
                    <p>Sort By</p>
                    <p className="mt-1 ml-2 cursor-pointer">
                      <Icon.CaretDown weight="fill" />
                    </p>
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap lg:hidden">
                {selectedOptions.map((option: string, index: React.Key) => (
                  <div
                    key={index}
                    className="border border-[#e26178] bg-[#fcf4f6] text-[#e26178] px-[10px] py-[5px] mr-1 mt-1"
                  >
                    {option}
                    <button
                      className="ml-2 align-middle mb-1"
                      onClick={() => handleOptionSelect(option)}
                    >
                      <Icon.X size={20} />
                    </button>
                  </div>
                ))}
              </div>
              {dropdown && (
                <div className="lg:flex justify-between mt-3 hidden">
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    Hoops
                  </p>
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    Studs
                  </p>
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    Drops
                  </p>
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    Jhumkas
                  </p>
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    Danglers
                  </p>
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    EarCuffs
                  </p>
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    Pearls
                  </p>
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    Chandbali
                  </p>
                </div>
              )}

              <div className="list-product hide-product-sold grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[40px] mt-7">
                {/*   <div key={item.ProductID} className="no-data-product">
                     No products match the selected criteria.
                  </div> */}

                {filteredData
                  .slice(pagesVisited, pagesVisited + productsPerPage)
                  .map((item: any) => (
                    <Product key={item.productId} data={item} />
                  ))}
              </div>
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
      </div>
    </>
  );
};

export default ShopBreadCrumb1;
