import React, { useState, useEffect } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Product from "../Product/Productgraphql";
import "rc-slider/assets/index.css";
import ReactPaginate from "react-paginate";
import MobileMainCategorySwiper from "../Home1/MobileMainCategorySwiper";
import SortBy from "../Other/SortBy";
import { useSearchParams } from "next/navigation";
import FilterSidebar from "./FilterSidebar";
import ProductSkeleton from "./ProductSkeleton";
import { ProductType } from "@/type/ProductType";
import WhpApp from "../Home1/WhpApp";
import { useCategory } from "@/context/CategoryContex";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const ShopBreadCrumb1 = () => {
  const { category, setCustomcategory } = useCategory();
  const [sortOption, setSortOption] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mobileFilter, setMobileFilter] = useState<boolean>(false);
  const [data, setData] = useState<ProductType[]>([]);
  const [filteredData, setFilteredData] = useState<ProductType[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(0);
  const productsPerPage = 15;
  const pagesVisited = pageNumber * productsPerPage;
  const param = useSearchParams();
  const name = param.get("url");

  const pageCount = Math.ceil(filteredData.length / productsPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const handleSortOptionChange = (option: string) => {
    setSelectedSortOption(option);
  };

  const handleFilterChange = (filteredProducts: ProductType[]) => {
    setFilteredData(filteredProducts);
    setPageNumber(0);
  };

  const handleOptionSelect = (option: string, category: string) => {
    setSelectedOptions((prevSelectedOptions: any) => {
      const updatedOptions = { ...prevSelectedOptions };
      if (updatedOptions[category]) {
        if (updatedOptions[category].includes(option)) {
          updatedOptions[category] = updatedOptions[category].filter(
            (selectedOption: any) => selectedOption !== option
          );
        } else {
          updatedOptions[category].push(option);
        }
      } else {
        updatedOptions[category] = [option];
      }
      return updatedOptions;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setCustomcategory(localStorage.getItem("category"));
      console.log("category:", category);

      try {
        setIsLoading(true);
        const client = new ApolloClient({
          uri: "http://localhost:4000/graphql",
          cache: new InMemoryCache(),
        });

        const query = gql`
          query {
            products(category: "${category}") {
              productId
              SKU
              variantId
              isParent
              title
              displayTitle
              shortDesc
              longDesc
              url
              tags
              collectionName
              shopFor
              occasion
              theme
              length
              breadth
              height
              weightRange
              addDate
              lastModificationDate
              productSize
              productQty
              attributeId
              preSalesProductQueries
              isReplaceable
              isReturnable
              isInternationalShippingAvailable
              customizationAvailability
              fastDelivery
              tryAtHome
              isActive
              grossWeight
              netWeight
              discountId
              discountCategory
              discountActive
              typeOfDiscount
              discountValue
              discountAmount
              discountPrice
              offerStartDate
              offerEndDate
              mediaId
              metalType
              metalPurity
              metalWeight
              metalRate
              makingType
              makingChargesPerGrams
              makingCharges
              gst
              additionalCost
              productPrice
              rating
              imageDetails {
                image_path
                order
                alt_text
              }
              videoDetails {
                video_path
                order
                alt_text
              }
              productAttributes {
                goldDetails {
                  goldCertifiedBy
                  goldSetting
                }
                gemstoneDetails
                diamondDetails
                silverDetails {
                  poojaArticle
                  utensils
                  silverWeight
                }
              }
              stoneDetails
              diamondDetails
            }
          }
        `;
        console.log(query);

        const { data } = await client.query({ query });
        console.log('product image details:');
        console.log(data.products[0].imageDetails); 

        if (data && data.products) {
          setData(data.products);
          setFilteredData(data.products);
          setIsLoading(false);
        } else {
          console.error("Error: No products data received");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [category, setCustomcategory]);

  useEffect(() => {
    let sortedData = [...filteredData];

    if (selectedSortOption === "All") {
      sortedData = filteredData;
    } else if (selectedSortOption === "Price-High To Low") {
      sortedData.sort(
        (a, b) => parseInt(b.discountPrice) - parseInt(a.discountPrice)
      );
    } else if (selectedSortOption === "Price-Low To High") {
      sortedData.sort(
        (a, b) => parseInt(a.discountPrice) - parseInt(b.discountPrice)
      );
    } else if (selectedSortOption === "Newest First") {
      sortedData.sort(
        (a, b) => new Date(b.addDate).getTime() - new Date(a.addDate).getTime()
      );
    }

    setFilteredData(sortedData);
    setPageNumber(0);
  }, [selectedSortOption]);

  return (
    <div className="shop-product breadcrumb1">
      <div className="container">
        <MobileMainCategorySwiper />
        <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">
          <FilterSidebar
            data={data}
            onFilterChange={handleFilterChange}
            mobileFilter={mobileFilter}
            setMobileFilter={setMobileFilter}
            selectedOptions={selectedOptions}
            handleOptionSelect={handleOptionSelect}
          />

          <div className="list-product-block lg:w-3/4 md:w-2/3 w-full md:pl-3 no-scrollbar">
            <div className="">
              <p className="text-4xl font-bold uppercase">{category}</p>
            </div>
            <div className="flex justify-between mt-5">
              <div className="lg:w-[70%] sm:w-[100%]">
                Earrings are a form of self-expression. They effortlessly
                transform an outfit, framing the face with style and grace.
                <div className="flex flex-wrap lg:hidden sm:block md:hidden">
                  {Object.entries(selectedOptions).flatMap(
                    ([category, options]) =>
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
              </div>

              <div className="hidden lg:block relative">
                <label className="font-semibold">Sort By: </label>
                <select
                  onChange={(e) => handleSortOptionChange(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option className="bg-[#f7f7f7]" value="All">
                    All
                  </option>
                  <option className="bg-[#f7f7f7]" value="Newest First">
                    Newest First
                  </option>
                  <option className="bg-[#f7f7f7]" value="Price-Low To High">
                    Price-Low To High
                  </option>
                  <option className="bg-[#f7f7f7]" value="Price-High To Low">
                    Price-High To Low
                  </option>
                </select>
                <div className="pointer-events-none ml-3 absolute inset-y-7 bottom-0 right-0 flex items-center px-2 text-gray-700">
                  <Icon.CaretDown size={18} />
                </div>
              </div>
            </div>

            {isLoading ? (
              <ProductSkeleton />
            ) : filteredData.length > 0 ? (
              <div className="list-product hide-product-sold grid md:grid-cols-2 lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[40px] mt-7 mb-5">
                {filteredData
                  .slice(pagesVisited, pagesVisited + productsPerPage)
                  .map((item: any) => {
                    //console.log('item',item);
                    return (
                      <div key={item.productId}>
                        {/* <span>{item.title}</span> */}
                        <Product data={item} />
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          {pageCount > 1 && (
            <div className="list-pagination flex items-center md:mt-10 mt-7 mb-4">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel="..."
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          )}
        </div>
        <WhpApp />
      </div>

      <div className="fixed bg-[#e26178] bottom-0 left-0 z-10 w-[100%] lg:hidden sm:block md:hidden h-[52px] ">
        <div className="flex justify-center align-middle mt-4 text-white">
          <div className="mr-5" onClick={() => setSortOption(!sortOption)}>
            SortBy
          </div>
          <div className="flex" onClick={() => setMobileFilter(!mobileFilter)}>
            <p>Filter </p>
          </div>
        </div>
      </div>
      {sortOption && (
        <SortBy
          visible={sortOption}
          onClose={() => setSortOption(false)}
          onSortOptionChange={handleSortOptionChange}
        />
      )}
    </div>
  );
};

export default ShopBreadCrumb1;