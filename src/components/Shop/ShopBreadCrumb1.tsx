"use Client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Product from "../Product/Productgraphql";
import ReactPaginate from "react-paginate";
import "rc-slider/assets/index.css";
import MobileMainCategorySwiper from "../Home1/MobileMainCategorySwiper";
import SortBy from "../Other/SortBy";
import FilterSidebar from "./FilterSidebar";
import ProductSkeleton from "./ProductSkeleton";
import { ProductType } from "@/type/ProductType";
import { useCategory } from "@/context/CategoryContex";
import BreadCrumb from "@/components/Shop/BreadCrumb";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { graphqlProductUrl } from "@/utils/constants";

const ShopBreadCrumb1 = () => {
  const [sortOption, setSortOption] = useState<boolean>(false);
  const { category } = useCategory();
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mobileFilter, setMobileFilter] = useState<boolean>(false);
  const [data, setData] = useState<ProductType[]>([]);
  const productsListRef = useRef<HTMLDivElement>(null);
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [skuList, setSkuList] = useState<string[]>([]);
  const [isSkuListLoaded, setIsSkuListLoaded] = useState(false);
  const productsPerPage = 50;
  const pagesVisited = pageNumber * productsPerPage;
  const searchParams = useSearchParams();
  const [initialOptions, setInitialOptions] = useState<any>({});
  const [fetchProducts, setFetchProducts] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const router = useRouter();

  const handleProducts = () => {
    setIsLoadMore(true);
  };
  const triggerFetchData = () => {
    setFetchProducts(true);
  };
  useEffect(() => {
    if (isLoadMore) {
      setOffset((prevOffset) => prevOffset + productsPerPage);
      triggerFetchData();
      setIsLoadMore(false); // Reset isLoadMore here
    }
  }, [isLoadMore]);
  useEffect(() => {
    if (fetchProducts) {
      const combinedOptions = getCombinedOptions(
        initialOptions,
        selectedOptions,
      );
      fetchData(combinedOptions);
      setFetchProducts(false); // Reset to prevent unnecessary fetches
    }
  }, [fetchProducts, offset]); // Add offset dependency

  const handleSortOptionChange = (option: string) => {
    setSelectedSortOption(option);
  };

  // const handleFilterChange = (filteredProducts: ProductType[]) => {
  //   setFilteredProducts(filteredProducts);
  //   setIsLoading(false);
  //   setPageNumber(0);
  // };

  const fetchData = async (combinedOptions: any) => {
    if (
      combinedOptions.category.length > 0 ||
      combinedOptions.search.length > 0 ||
      combinedOptions.priceFilter.length > 0 ||
      combinedOptions.shop_for.length > 0 ||
      combinedOptions.karat.length > 0 ||
      combinedOptions.metal.length > 0 ||
      combinedOptions.occasion.length > 0 ||
      combinedOptions.productCategory.length > 0
    ) {
      try {
        setIsLoading(false);
        const client = new ApolloClient({
          uri: graphqlProductUrl,
          cache: new InMemoryCache(),
        });
        const GET_PRODUCTS = gql`
          query Products(
            $category: [CategoryArrayInput!]
            $search: [SearchArrayInput!]
            $priceFilter: [PriceArrayInput!]
            $gender: [GenderArrayInput!]
            $karat: [KaratArrayInput!]
            $metal: [MetalArrayInput!]
            $weightRange: [WeightRangeArrayInput!]
            $occasion: [OccasionArrayInput!]
            $sortBy: String
            $productCategory: String
            $sortOrder: String
            $limit: Int
            $offset: Int
          ) {
            products(
              category: $category
              search: $search
              priceFilter: $priceFilter
              gender: $gender
              karat: $karat
              metal: $metal
              weightRange: $weightRange
              productCategory: $productCategory
              occasion: $occasion
              sortBy: $sortBy
              sortOrder: $sortOrder
              limit: $limit
              offset: $offset
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
              weightRange
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
        let variables = {};
        if (combinedOptions.category[0] === "new_Arrival") {
          variables = {
            category: [{ value: "" }],
            search: [{ value: "" }],
            priceFilter: combinedOptions.priceFilter,
            gender: combinedOptions.shop_for.map((gender: string) => ({
              value: gender,
            })),
            karat: combinedOptions.karat.map((karat: string) => ({
              value: karat,
            })),
            metal: combinedOptions.metal.map((metal: string) => ({
              value: metal,
            })),
            weightRange: combinedOptions.weight.map((weight: string) => ({
              value: weight,
            })),
            occasion: combinedOptions.occasion.map((occasion: string) => ({
              value: occasion,
            })),
            sortBy: "addDate",
            sortOrder: "DESC",
            productCategory: combinedOptions.productCategory[0],
            limit: productsPerPage,
            offset: offset,
          };
        } else {
          variables = {
            category: combinedOptions.category.map((category: string) => ({
              value: category,
            })),
            search: combinedOptions.search.map((search: string) => ({
              value: search,
            })),
            priceFilter: combinedOptions.priceFilter,
            gender: combinedOptions.shop_for.map((gender: string) => ({
              value: gender,
            })),
            karat: combinedOptions.karat.map((karat: string) => ({
              value: karat,
            })),
            metal: combinedOptions.metal.map((metal: string) => ({
              value: metal,
            })),
            weightRange: combinedOptions.weight.map((weight: string) => ({
              value: weight,
            })),
            occasion: combinedOptions.occasion.map((occasion: string) => ({
              value: occasion,
            })),
            sortBy: "addDate",
            sortOrder: "DESC",
            productCategory: combinedOptions.productCategory[0],
            limit: productsPerPage,
            offset: offset,
          };
        }
        console.log("Variables passed for api call", variables);
        const { data } = await client.query({
          query: GET_PRODUCTS,
          variables,
        });
        if (data && data.products && isLoadMore) {
          console.log("AAditya", isLoadMore, offset);
          setFilteredProducts((prevProducts) =>
            isLoadMore ? [...prevProducts, ...data.products] : data.products,
          );
          setSelectedSortOption("All");
        } else if (data && data.products && !isLoadMore) {
          console.log("telange", isLoadMore, offset);
          setFilteredProducts((prevProducts) => [
            ...prevProducts,
            ...data.products,
          ]);
          setSelectedSortOption("All");
          setIsLoading(false);
        } else {
          setIsLoading(true);
          console.error("Error: No products data received");
        }
      } catch (error) {
        setIsLoading(true);
        console.log("Error Occurred from ShopBreadCrumb1 GraphQL", error);
      } finally {
        setIsLoading(true);
      }
    }
  };

  const getCombinedOptions = (initialOptions: any, selectedOptions: any) => {
    const combinedOptions: any = {};

    // Combine category options
    combinedOptions.category = [
      ...(initialOptions.Category || []),
      ...(selectedOptions.Category || []),
    ];

    combinedOptions.search = [
      ...(initialOptions.Search || []),
      ...(selectedOptions.Search || []),
    ];

    // Combine price options
    combinedOptions.priceFilter = [
      ...(initialOptions.Price || []),
      ...(selectedOptions.Price || []),
    ].map((price: string) => {
      // console.log("price ",price)
      if (price == "Less than 10K") {
        const min = parseFloat("1");
        const max = parseFloat("10000");
        return { min, max };
      } else {
        const value = formatPriceRange(price);
        const [minStr, maxStr] = value.split("to");
        // console.log("MIN", minStr);
        // console.log("MAX", maxStr);
        const min = minStr ? parseFloat(minStr.trim()) : 1;
        const max = maxStr ? parseFloat(maxStr.trim()) : null;
        return { min, max };
      }
    });

    combinedOptions.shop_for = [
      ...(initialOptions.Shop_for || []),
      ...(selectedOptions.Shop_for || []),
    ];

    // Combine karat options
    combinedOptions.karat = [
      ...(initialOptions.Karat || []),
      ...(selectedOptions.Karat || []),
    ];

    // Combine metal options
    combinedOptions.metal = [
      ...(initialOptions.Metal || []),
      ...(selectedOptions.Metal || []),
    ];

    combinedOptions.weight = [
      ...(initialOptions.Weight || []),
      ...(selectedOptions.Weight || []),
    ];
    combinedOptions.occasion = [
      ...(initialOptions.Occasion || []),
      ...(selectedOptions.Occasion || []),
    ];
    combinedOptions.productCategory = [
      ...(initialOptions.productCategory || []),
      ...(selectedOptions.productCategory || []),
    ];
    console.log(combinedOptions, "COMBINEDDDDD");
    return combinedOptions;
  };

  const updateURL = (options: any) => {
    const urlParts: string[] = [];
    console.log("filterOptions", options);
    if (options.Category && options.Category.length > 0) {
      urlParts.push(`c-${options.Category.join(",")}`);
    }

    if (options.Search && options.Search.length > 0) {
      urlParts.push(`s-${options.Search.join(",")}`);
    }

    if (options.Shop_for && options.Shop_for.length > 0) {
      urlParts.push(`g-${options.Shop_for.join(",")}`);
    }

    if (options.Karat && options.Karat.length > 0) {
      urlParts.push(`k-${options.Karat.join(",")}`);
    }

    if (options.Price && options.Price.length > 0) {
      urlParts.push(`p-${options.Price.join("|")}`);
    }

    if (options.Metal && options.Metal.length > 0) {
      urlParts.push(`m-${options.Metal.join(",")}`);
    }
    if (options.Weight && options.Weight.length > 0) {
      urlParts.push(`w-${options.Weight.join(",")}`);
    }
    if (options.Occasion && options.Occasion.length > 0) {
      urlParts.push(`o-${options.Occasion.join(",")}`);
    }
    if (options.productCategory) {
      urlParts.push(`pc-${options.productCategory}`);
    }
    const url = `${window.location.pathname}?url=${urlParts.join("+")}`;
    router.push(url);
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = data;

      // Apply price filter
      if (selectedOptions.Price && selectedOptions.Price.length > 0) {
        const minPrice = parseInt(selectedOptions.Price[0]) || 0;
        const maxPrice =
          parseInt(selectedOptions.Price[selectedOptions.Price.length - 1]) ||
          Infinity;
        filtered = filtered.filter(
          (product: any) =>
            product.discountPrice >= minPrice &&
            product.discountPrice <= maxPrice,
        );
      }

      // Apply gender filter
      if (selectedOptions.Shop_for && selectedOptions.Shop_for.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Shop_for.includes(product.shop_for),
        );
      }

      // Apply karat filter
      if (selectedOptions.Karat && selectedOptions.Karat.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Karat.includes(product.karat),
        );
      }

      // Apply metal filter
      if (selectedOptions.Metal && selectedOptions.Metal.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Metal.includes(product.metal),
        );
      }

      // Apply type filter
      if (selectedOptions.Type && selectedOptions.Type.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Type.includes(product.type),
        );
      }

      if (selectedOptions.Weight && selectedOptions.Weight.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Weight.includes(product.weightRange),
        );
      }

      // Apply style filter
      if (selectedOptions.Style && selectedOptions.Style.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Style.includes(product.style),
        );
      }

      // Apply occasion filter
      if (selectedOptions.Occasion && selectedOptions.Occasion.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Occasion.includes(product.occasion),
        );
      }

      // Apply color filter
      if (selectedOptions.Color && selectedOptions.Color.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Color.includes(product.color),
        );
      }
      if (selectedOptions.productCategory) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.productCategory.includes(product.productCategory),
        );
      }
      console.log(filtered, "FILTEREDDDD");
      setFilteredProducts(filtered);
      setSelectedSortOption("All");
      setPageNumber(0);
    };
    applyFilters();
    console.log("useEffect - selectedOptions:", selectedOptions);
    setOffset(0);
    const combinedOptions = getCombinedOptions(initialOptions, selectedOptions);
    fetchData(combinedOptions);
    console.log("Combined Options", combinedOptions);
    updateURL(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const queryValue = params.get("url") || "";

    const initialOptions: any = {};

    const parts = queryValue.split(" ");
    parts.forEach((part) => {
      // Split each part by the hyphen to get the key and value
      const [key, value] = part.split("-");

      if (key === "c") {
        initialOptions.Category = value.split(",");
      }
      if (key === "s") {
        initialOptions.Search = value.split(",");
      }
      if (key === "g") {
        initialOptions.Shop_For = value.split(",");
      }
      if (key === "k") {
        initialOptions.Karat = value.split(",");
      }
      if (key === "p") {
        initialOptions.Price = value.split("|");
      }
      if (key === "m") {
        initialOptions.Metal = value.split(",");
      }
      if (key === "w") {
        initialOptions.Weight = value.split(",");
      }
      if (key === "o") {
        initialOptions.Occasion = value.split(",");
      }
      if (key === "pc") {
        initialOptions.productCategory = value.split(",");
      }
    });
    setSelectedOptions(initialOptions);
    console.log("Initial selectedOptions from URL:", initialOptions);
  }, [searchParams]);

  const handleOptionSelect = (option: string, category: string) => {
    setSelectedOptions((prevSelectedOptions: any) => {
      const updatedOptions = { ...prevSelectedOptions };
      if (updatedOptions[category]) {
        const formattedOption = formatPriceRange(option);
        if (updatedOptions[category].includes(formattedOption)) {
          updatedOptions[category] = updatedOptions[category].filter(
            (selectedOption: any) => selectedOption !== formattedOption,
          );
        } else {
          updatedOptions[category].push(formattedOption);
        }
      } else {
        updatedOptions[category] = [formatPriceRange(option)];
      }
      // console.log("updatedOptions:", updatedOptions);
      return updatedOptions;
    });
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
    if (selectedSortOption === "Price-Low To High") {
      const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
        const priceA: any =
          a.discountPrice !== undefined ? a.discountPrice : a.productPrice;
        const priceB: any =
          b.discountPrice !== undefined ? b.discountPrice : b.productPrice;
        return priceA - priceB;
      });
      setFilteredProducts(sortedProducts);
      setPageNumber(0);
    } else if (selectedSortOption === "Price-High To Low") {
      const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
        const priceA: any =
          a.discountPrice !== undefined ? a.discountPrice : a.productPrice;
        const priceB: any =
          b.discountPrice !== undefined ? b.discountPrice : b.productPrice;
        return priceB - priceA;
      });
      setFilteredProducts(sortedProducts);
      setPageNumber(0);
    } else if (selectedSortOption === "Newest First") {
      const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
        const product1: any = a.addDate;
        const product2: any = b.addDate;
        return product2 - product1;
      });
      setFilteredProducts(sortedProducts);
      setPageNumber(0);
    }
    // Add other sorting options here
  }, [selectedSortOption]);

  const removeUnderscores = (str: any) => {
    return str.replace(/(c-|s-|g-|p-|m-|_)/g, " ");
  };

  // Modified string
  const modifiedString = removeUnderscores(category);

  console.log("Isloading", isLoading, filteredProducts.length);

  const loadScript = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (
        document.querySelector(
          `script[src="https://camweara.com/integrations/camweara_api.js"]`,
        )
      ) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://camweara.com/integrations/camweara_api.js";
      script.onload = () => {
        // Give some time for the function to be available
        setTimeout(() => {
          if (typeof window.getSkusListWithTryOn === "function") {
            resolve(); // Function is ready
          } else {
            reject(new Error("getSkusListWithTryOn is not defined"));
          }
        }, 1000);
      };
      script.onerror = () => reject(new Error("Failed to load script"));

      document.body.appendChild(script);
    });
  };

  const fetchSkusList = async () => {
    try {
      await loadScript(); // Ensure the script is loaded
      const skus = await window.getSkusListWithTryOn({
        companyName: "whpjewellers",
      });
      setSkuList(skus); // Update SKU list state
      setIsSkuListLoaded(true);
    } catch (error) {
      console.error("Error fetching SKU list:", error);
    }
  };

  useEffect(() => {
    // Fetch SKU list only once on component mount
    fetchSkusList();
  }, []);

  useEffect(() => {
    // Fetch SKU list only once on component mount
    console.log("filteredProducts", filteredProducts);
  }, [filteredProducts]);
  return (
    <div className="shop-product breadcrumb1">
      <div className="container">
        <MobileMainCategorySwiper />
        <div className="flex gap-y-8 pt-4 max-md:flex-col-reverse max-md:flex-wrap">
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
          <div className="list-product-block no-scrollbar w-full md:w-2/3 md:pl-3 lg:w-3/4">
            <div className="">
              <p className="text-4xl font-bold uppercase">{modifiedString}</p>
            </div>
            <div className="mt-5 flex justify-between">
              <div className="sm:w-[100%] lg:w-[70%]">
                {/* Earrings are a form of self-expression. They effortlessly
                transform an outfit, framing the face with style and grace. */}
                <BreadCrumb />
                <div className="flex flex-wrap sm:block md:hidden lg:hidden">
                  {Object.entries(selectedOptions).flatMap(
                    ([category, options]) =>
                      options.map((option: string, index: number) => (
                        <div
                          key={`${category}-${index}`}
                          className="mr-1 mt-1 border border-[#e26178] bg-[#fcff4f6] px-[10px] py-[5px] text-[#e26178]"
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
              </div>

              <div className="relative hidden lg:block">
                <label className="font-semibold">Sort By: </label>
                <select
                  value={selectedSortOption}
                  onChange={(e) => handleSortOptionChange(e.target.value)}
                  className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
                >
                  <option className="bg-[#f7f7f7]" value="All">
                    All
                  </option>
                  {/*<option className="bg-[#f7f7f7]" value="Newest First">
                    Newest First
                  </option> */}
                  <option className="bg-[#f7f7f7]" value="Price-Low To High">
                    Price-Low To High
                  </option>
                  <option className="bg-[#f7f7f7]" value="Price-High To Low">
                    Price-High To Low
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-7 bottom-0 right-0 ml-3 flex items-center px-2 text-gray-700">
                  <Icon.CaretDown size={18} />
                </div>
              </div>
            </div>

            {!isLoading && filteredProducts.length == 0 ? (
              <ProductSkeleton />
            ) : filteredProducts.length > 0 ? (
              <div
                className="list-product hide-product-sold mb-5 mt-7 grid grid-cols-2 gap-[40px] max-sm:gap-[20px] md:grid-cols-2 lg:grid-cols-3"
                ref={productsListRef}
              >
                {filteredProducts.map((item: any) => {
                  return (
                    <div key={item.productId}>
                      <Product data={item} skuList={skuList} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <>
                {isLoading && filteredProducts.length == 0 && (
                  <div
                    className="list-product hide-product-sold mb-5 mt-7 h-[500px] w-full gap-[40px] sm:gap-[30px]"
                    ref={productsListRef}
                  >
                    {/* <p>No products found.</p> */}

                    <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                      Oops! No products found.
                    </h2>
                    <p className="mb-6 text-lg text-gray-600">
                      We couldn't find any products matching your current
                      filters.
                    </p>
                    <div className="suggestions mb-8"></div>
                    <div className="cta-buttons flex justify-center space-x-4">
                      <button className="btn-clear-filters rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition duration-300 hover:bg-gray-300">
                        Clear Filters
                      </button>
                      <button className="btn-explore rounded-md bg-[#e26178] px-4 py-2 text-white transition duration-300 hover:bg-teal-600">
                        Explore More
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            <button
              onClick={handleProducts}
              className="bg-[#e26178] px-3 py-2 text-white"
            >
              Load More
            </button>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 z-10 h-[52px] w-[100%] bg-[#e26178] sm:block md:hidden lg:hidden">
        <div className="mt-4 flex justify-center align-middle text-white">
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
