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
import Loader from "../Other/Loader";

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
    options: [
      "Less than 10K",
      "10K to 20K",
      "20K to 30K",
      "30K to 50K",
      "50K Above",
    ],
  },
  {
    title: "Karat",
    options: ["14KT", "18KT", "22KT", "24KT"],
  },
  {
    title: "Weight",
    options: ["0-2 gms", "2-5 gms", "5-10 gms", "10 gms and above"],
  },
  {
    title: "Gender",
    options: ["Men", "Women", "Kids"],
  },
  {
    title: "Occasion",
    options: [
      "Everyday",
      "Work Wear",
      "Wedding",
      "Desk to Dinner",
      "Casual Wear",
      "Evening",
      "Party Wear",
    ],
  },
  { title: "Delivery", options: ["Fast Delivery", "Cash On Delivery", "EMI"] },
];
const ShopBreadCrumb1: React.FC<Props> = ({}) => {
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
  const [data, setData] = useState<ProductType[]>([]);
  const [filteredData, setFilteredData] = useState<ProductType[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(
    "All"
  );
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100,
  });
  const [length, setLength] = useState<number | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const param = useSearchParams();
  const name = param.get("url");
  const text: string =
    "Earrings are a form of self-expression. They effortlessly transform an outfit, framing the face with style and grace.";

  const truncatedText = text.split(" ").slice(0, 200).join(" ");


  const toggleShowFullText = () => {
    setShowFullDescription(!showFullDescription);
  };
  const [filter, setFilter] = useState([
    { option: "Less than 10K", selected: false },
    { option: "10K to 20K", selected: false },
    { option: "20K to 30K", selected: false },
    { option: "30K to 50K", selected: false },
    { option: "50K Above", selected: false },
    { option: "14KT", selected: false },
    { option: "18KT", selected: false },
    { option: "22KT", selected: false },
    { option: "24KT", selected: false },
    { option: "0-2 gms", selected: false },
    { option: "2-5 gms", selected: false },
    { option: "5-10 gms", selected: false },
    { option: "10 gms and above", selected: false },
    { option: "Men", selected: false },
    { option: "Women", selected: false },
    { option: "Kids", selected: false },
]);
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
    toggleSelection(option);
  };
  
    function toggleSelection(option:string) {
      const updatedFilter = filter.map(item => {
          if (item.option === option) {
              return { ...item, selected: !item.selected };
          }
          return item;
      });
      setFilter(updatedFilter);
    }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.get<ProductType[]>(
          "http://164.92.120.19/api/getall-products"
        );
        setData(response.data);
        setFilteredData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("data is unable to fetch");
      }
    };
    fetchData();
  }, []);

  if(isLoading){
    <Loader/>
  }


  // useEffect(() => {
  //   console.log("Selected Options:", selectedOptions);
  //   console.log("Filtered Data:", filteredData);

  //   let filteredArray: ProductType[] = filteredData.slice();
  //   console.log(filteredArray, "I AM Here");

  //   if (selectedOptions.length > 0) {
  //     filteredArray = filteredData.filter((product) => {
  //       const price = parseInt(product.discountPrice.toString());
  //       const karat = product.metalPurity;
  //       const gender: string = product.shopFor[0];
  //       const metalWeight = product.weightRange;
  //       const occasion = product.occasion;
  //       return selectedOptions.some((option: string) => {
  //         if (option === "Less than 10K") {
  //           return price < 10000;
  //         }
  //         if (option === "10K to 20K") {
  //           console.log(option, price);
  //           return price >= 10000 && price <= 20000;
  //         }
  //         if (option === "20K to 30K") {
  //           return price >= 20000 && price <= 30000;
  //         }
  //         if (option === "30K to 50K") {
  //           console.log(option, price, "AAA");
  //           return price >= 30000 && price <= 50000;
  //         }
  //         if (option === "50K Above") {
  //           return price >= 50000;
  //         }
  //         if (option === "14KT" || option === "22KT" || option === "18KT" || option === "24KT") {
  //           return karat === option;
  //         }
  //         if (option === "Women" || option === "Men" || option === "Kids") {
  //           return gender === option;
  //         }
  //         if (option === "0-2 gms" || option === "2-5 gms" || option === "5-10 gms" || option === "10 gms and above") {
  //           return metalWeight === option;
  //         }
  //         if (option === "Casual Wear" || option === "Everyday" || option === "Work Wear" || option === "Wedding" || option === "Evening" || option === "Party Wear") {
  //           return occasion === option;
  //         }
  //         return false; // Handle null option case if needed
  //       });
  //     });
  //   } else {
  //     filteredArray = data; // If no options selected, keep the data unchanged
  //   }

  //   console.log("Filtered Array:", filteredArray);
  //   setFilteredData(filteredArray);
  // }, [selectedOptions, filteredData]);
  useEffect(()=>{
    const selectedOptions = filter.filter(item => item.selected === true);
    console.log("Selected items:", selectedOptions);
    let filteredArray =[];

    if (selectedOptions.length > 0) {
           filteredArray = data.filter((product) => {
            const price = parseInt(product.discountPrice.toString());
            const karat = product.metalPurity;
            const gender: string = product.shopFor[0];
            const metalWeight = product.weightRange;
            const occasion = product.occasion;
            return selectedOptions.every((option) => {
             const options = option.option;
             console.log("Options",options);
             
              if (options === "Less than 10K") {
                return price < 10000;
              }
              if (options === "10K to 20K") {
                return price >= 10000 && price <= 20000;
              }
              if (options === "20K to 30K") {
                return price >= 20000 && price <= 30000;
              }
              if (options === "30K to 50K") {
                console.log(option, price, "AAA");
                return price >= 30000 && price <= 50000;
              }
              if (options === "50K Above") {
                return price >= 50000;
              }
              if (options === "14KT" || options === "22KT" || options === "18KT" || options === "24KT") {
                return karat === options;
              }
              if (options === "Women" || options === "Men" || options === "Kids") {
                return gender === options;
              }
              if (options === "0-2 gms" || options === "2-5 gms" || options === "5-10 gms" || options === "10 gms and above") {
                return metalWeight === options;
              }
              if (options === "Casual Wear" || options === "Everyday" || options === "Work Wear" || options === "Wedding" || options === "Evening" || options === "Party Wear") {
                return occasion === options;
              }
              return false; // Handle null option case if needed
            });
          });
        } else {
          filteredArray = data; // If no options selected, keep the data unchanged
        }

        console.log("Filtereddd Arrayyy", filteredArray);
        setFilteredData(filteredArray);

  },[filter]);

  const handleSelectedSortOption = (value: string) => {
    setSelectedSortOption(value);
  };

//   useEffect(() => {
//     console.log("this is a sorting useEffect");
//     let sortedData = [...filteredData];
//     if(selectedSortOption === "All") {
//         setFilteredData(data);
//     } else if (selectedSortOption === "Price - High To Low") {
//         sortedData.sort((a, b) => parseFloat(b.discountPrice) - parseFloat(a.discountPrice));
//         setFilteredData(sortedData);
//     }
//     console.log("sorted Array:", filteredData);
// }, [selectedSortOption, filteredData, data]);

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
                <p className="text-4xl font-bold uppercase">
                  {name || "Earring"}
                </p>
              </div>
              <div className="flex justify-between mt-5">
                <div className="lg:w-[70%] sm:w-[100%] ">
                  <p>
                    Earrings are a form of self-expression. They effortlessly
                    transform an outfit, framing the face with style and grace.
                  </p>
                </div>
                <div className="hidden lg:block relative">
                  <label className="font-semibold">Sort By: </label>
                  <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option>All</option>
                    <option className="bg-[#f7f7f7]">Recommended</option>
                    <option
                      className="bg-[#f7f7f7]"
                      onClick={()=>{handleSelectedSortOption("Newest First")}}
                    >
                      Newest First
                    </option>
                    <option className="bg-[#f7f7f7]">Price - Low To High</option>
                    <option className="bg-[#f7f7f7]"  onClick={() =>
                        handleSelectedSortOption("Price - High To Low")
                      }>Price - High To Low</option>
                   
                  </select>
                  <div className="pointer-events-none ml-3 absolute inset-y-7 bottom-0 right-0 flex items-center px-2 text-gray-700">
                    <Icon.CaretDown size={18} />
                  </div>
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
              

              <div className="list-product hide-product-sold grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[40px] mt-7">
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
