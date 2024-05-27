import React, { useState, useEffect, useRef } from "react";
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
  
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  const productsPerPage = 15;
  const pagesVisited = pageNumber * productsPerPage;
  const param = useSearchParams();
  const name = param.get("url");

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const handleSortOptionChange = (option: string) => {
    setSelectedSortOption(option);
  };

  const handleFilterChange = (filteredProducts: ProductType[]) => {
    setFilteredProducts(filteredProducts);
    setIsLoading(false);
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
    setCustomcategory(localStorage.getItem("category"));
    console.log("category:", category);

    const fetchData = async () => {
      try {
        const client = new ApolloClient({
          uri: "https://seashell-app-kswll.ondigitalocean.app/",
          cache: new InMemoryCache(),
        });

        const GET_PRODUCTS = gql`
          query Products(
            $category: String
            $priceFilter: [PriceArrayInput!]
            $gender: String
            $karat: String
            $metal: String
          ) {
            products(
              category: $category
              priceFilter: $priceFilter
              gender: $gender
              karat: $karat
              metal: $metal
            ) {
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
              discountPrice
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

       

        const filterOptions = {};
        const priceRangeMapping = {
          "Less than 10K": { min: 0, max: 10000, key: "lt10k" },
          "10k to 20K": { min: 10000, max: 20000, key: "10kto20k" },
          "20k to 30k": { min: 20000, max: 30000, key: "20kto30k" },
          "30k and Above": { min: 30000, max: 100000000, key: "gt30k" },
        };
          if (category) {
            filterOptions.category = category;
          }

          if (selectedOptions.Price && selectedOptions.Price.length > 0) {
            filterOptions.priceFilter = selectedOptions.Price.map((range) => {
              const { min, max } = priceRangeMapping[range];
              return { min, max };
            });
          }
          
          if (selectedOptions.Gender && selectedOptions.Gender.length > 0) {
            filterOptions.gender = selectedOptions.Gender[0];
          }

          if (selectedOptions.Karat && selectedOptions.Karat.length > 0) {
            filterOptions.karat = selectedOptions.Karat[0];
          }

          if (selectedOptions.Type && selectedOptions.Type.length > 0) {
            filterOptions.metal = selectedOptions.Type[0];
          }
        console.log('filterOptions:', filterOptions); // Add this line

        const { data } = await client.query({
          query: GET_PRODUCTS,
          variables: filterOptions,
        });

        if (data && data.products) {
          setFilteredProducts(data.products);
          setIsLoading(false);
        } else {
          console.error("Error: No products data received");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [category, selectedOptions]);



  useEffect(()=>{
    console.log("fetched Products",filteredProducts)
  },[filteredProducts])

  useEffect(() => {
    const applyFilters = () => {
      let filtered = data;
  
      // Apply price filter
      if (selectedOptions.Price && selectedOptions.Price.length > 0) {
        const minPrice = parseInt(selectedOptions.Price[0]) || 0;
        const maxPrice =
          parseInt(selectedOptions.Price[selectedOptions.Price.length - 1]) || Infinity;
        filtered = filtered.filter(
          (product) =>
            product.discountPrice >= minPrice && product.discountPrice <= maxPrice
        );
      }
  
      // Apply gender filter
      if (selectedOptions.Gender && selectedOptions.Gender.length > 0) {
        filtered = filtered.filter((product) =>
          selectedOptions.Gender.includes(product.gender)
        );
      }
  
      // Apply karat filter
      if (selectedOptions.Karat && selectedOptions.Karat.length > 0) {
        filtered = filtered.filter((product) =>
          selectedOptions.Karat.includes(product.karat)
        );
      }
  
      // Apply metal filter
      if (selectedOptions.Metal && selectedOptions.Metal.length > 0) {
        filtered = filtered.filter((product) =>
          selectedOptions.Metal.includes(product.metal)
        );
      }
  
      // Apply type filter
      if (selectedOptions.Type && selectedOptions.Type.length > 0) {
        filtered = filtered.filter((product) =>
          selectedOptions.Type.includes(product.type)
        );
      }
  
      // Apply style filter
      if (selectedOptions.Style && selectedOptions.Style.length > 0) {
        filtered = filtered.filter((product) =>
          selectedOptions.Style.includes(product.style)
        );
      }
  
      // Apply occasion filter
      if (selectedOptions.Occasion && selectedOptions.Occasion.length > 0) {
        filtered = filtered.filter((product) =>
          selectedOptions.Occasion.includes(product.occasion)
        );
      }
  
      // Apply color filter
      if (selectedOptions.Color && selectedOptions.Color.length > 0) {
        filtered = filtered.filter((product) =>
          selectedOptions.Color.includes(product.color)
        );
      }
  
      setFilteredProducts(filtered);
    };
  
    applyFilters();
  }, [data, selectedOptions]); 

  const productsListRef = useRef<HTMLDivElement>(null);

  return (
    <div className="shop-product breadcrumb1">
      <div className="container">
        <MobileMainCategorySwiper />
        <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">
        <FilterSidebar
        data={data}
        filteredProducts={filteredProducts}
        onFilterChange={(options) => setSelectedOptions(options)}
        mobileFilter={mobileFilter}
        setMobileFilter={setMobileFilter}
        selectedOptions={selectedOptions}
        handleOptionSelect={handleOptionSelect}
        productsListRef={productsListRef}
        category={category}
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
                      className="border border-[#e26178] bg-[#fcff4f6] text-[#e26178] px-[10px] py-[5px] mr-1 mt-1"
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
        ) : filteredProducts.length > 0 ? (
          <div
            className="list-product hide-product-sold grid md:grid-cols-2 lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[40px] mt-7 mb-5"
            ref={productsListRef}
          >
            {filteredProducts
              .slice(pagesVisited, pagesVisited + productsPerPage)
              .map((item: any) => {
                return (
                  <div key={item.productId}>
                    <Product data={item} />
                  </div>
                );
              })}
          </div>
        ) : (
          <div class="list-product hide-product-sold sm:gap-[30px] w-full gap-[40px] mt-7 mb-5 h-[500px]" >
            {/* <p>No products found.</p> */}
            
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Oops! No products found.</h2>
                <p class="text-lg text-gray-600 mb-6">We couldn't find any products matching your current filters.</p>
                <div class="suggestions mb-8">
                  {/* <h3 class="text-xl font-semibold text-gray-800 mb-4">Try exploring further:</h3>
                  <ul class="space-y-2">
                    <li class="text-base text-gray-600">Adjust your filters to broaden your search</li>
                    <li class="text-base text-gray-600">Check out our popular categories</li>
                    <li class="text-base text-gray-600">Browse our latest arrivals</li>
                    <li class="text-base text-gray-600">Explore our bestsellers</li>
                  </ul> */}
                </div>
                <div class="cta-buttons flex justify-center space-x-4">
                  <button class="btn-clear-filters bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300">Clear Filters</button>
                  <button class="btn-explore bg-[#e26178] text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300 ">Explore More</button>
                </div>
              
          </div>
          
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