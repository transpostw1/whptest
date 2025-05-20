import React, { useState, useRef, useEffect } from 'react';
import MobileMainCategorySwiper from '@/components/Home1/MobileMainCategorySwiper';
import FilterSidebar from '@/components/Shop/FilterSidebar';
import { useCategory } from '@/context/CategoryContex';
import { useProductFilters } from './hooks/useProductFilters';
import { useProductSorting } from './hooks/useProductSorting';
import { useProductFetching } from './hooks/useProductFetching';
import ProductList from './components/ProductList';
import SortOptions from './components/SortOptions';
import MobileFilterBar from './components/MobileFilterBar';
import * as Icon from '@phosphor-icons/react/dist/ssr';

const ShopBreadCrumb1 = () => {
  const [sortOption, setSortOption] = useState<boolean>(false);
  const { category } = useCategory();
  const [mobileFilter, setMobileFilter] = useState<boolean>(false);
  const productsListRef = useRef<HTMLDivElement>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [skuList, setSkuList] = useState<string[]>([]);
  const [isSkuListLoaded, setIsSkuListLoaded] = useState(false);
  const productsPerPage = 51;
  const [offset, setOffset] = useState<number>(0);
  const [fetchProducts, setFetchProducts] = useState<boolean>(false);

  const {
    selectedOptions,
    setSelectedOptions,
    initialOptions,
    handleOptionSelect,
    formatPriceRange
  } = useProductFilters();

  const getCombinedOptions = (initialOptions: any, selectedOptions: any) => {
    const combinedOptions: any = {};
    combinedOptions.category = [
      ...(initialOptions.Category || []),
      ...(selectedOptions.Category || []),
    ];
    combinedOptions.search = [
      ...(initialOptions.Search || []),
      ...(selectedOptions.Search || []),
    ];
    combinedOptions.priceFilter = [
      ...(initialOptions.Price || []),
      ...(selectedOptions.Price || []),
    ].map((price: string) => {
      if (price == "Less than 10K") {
        const min = parseFloat("1");
        const max = parseFloat("10000");
        return { min, max };
      } else {
        const value = formatPriceRange(price);
        const [minStr, maxStr] = value.split("to");
        const min = minStr ? parseFloat(minStr.trim()) : 1;
        const max = maxStr ? parseFloat(maxStr.trim()) : null;
        return { min, max };
      }
    });
    combinedOptions.shop_for = [
      ...(initialOptions.Shop_For || []),
      ...(selectedOptions.Shop_For || []),
    ];
    combinedOptions.karat = [
      ...(initialOptions.Karat || []),
      ...(selectedOptions.Karat || []),
    ];
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
    return combinedOptions;
  };

  const combinedOptions = getCombinedOptions(initialOptions, selectedOptions);

  const {
    isLoading,
    filteredProducts,
    filters,
    isLoadMore,
    setIsLoadMore
  } = useProductFetching(combinedOptions, productsPerPage, offset);

  const {
    selectedSortOption,
    sortedProducts,
    handleSortOptionChange
  } = useProductSorting(filteredProducts);

  const triggerFetchData = () => {
    setFetchProducts(true);
  };

  useEffect(() => {
    if (isLoadMore) {
      setOffset((prevOffset) => prevOffset + productsPerPage);
      triggerFetchData();
    }
  }, [isLoadMore]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedOptions]);

  const handleLoadMore = () => {
    setIsLoadMore(!isLoadMore);
  };

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
        setTimeout(() => {
          if (typeof window.getSkusListWithTryOn === "function") {
            resolve();
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
      await loadScript();
      const skus = await window.getSkusListWithTryOn({
        companyName: "whpjewellers",
      });
      setSkuList(skus);
      setIsSkuListLoaded(true);
    } catch (error) {
      console.error("Error fetching SKU list:", error);
    }
  };

  useEffect(() => {
    fetchSkusList();
  }, []);

  const removeUnderscores = (str: any) => {
    return str?.replace(/(category-|search-|gender-|price-|metal-|pc-|_)/g, " ");
  };

  const modifiedString = removeUnderscores(category);
  const breadcrumbs = filteredProducts?.[0]?.breadcrumbs || [];
  const lastBreadcrumbTitle = breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].title : "";
  const finalString = modifiedString || lastBreadcrumbTitle;

  return (
    <>
      <MobileMainCategorySwiper />
      <div className="shop-product breadcrumb1">
        <div className="container">
          <div className="flex gap-y-8 pt-4 max-md:flex-col-reverse max-md:flex-wrap">
            <FilterSidebar
              data={[]}
              filters={filters}
              filteredProducts={filteredProducts}
              onFilterChange={(options) => setSelectedOptions(options)}
              mobileFilter={mobileFilter}
              setMobileFilter={setMobileFilter}
              selectedOptions={selectedOptions}
              handleOptionSelect={handleOptionSelect}
              productsListRef={productsListRef}
              handleLoadMore={handleLoadMore}
              category={category}
            />
            <div className="list-product-block no-scrollbar w-full md:w-2/3 md:pl-3 lg:w-3/4">
              <div className="">
                <p className="text-4xl font-bold uppercase">{finalString}</p>
              </div>
              <div className="mt-5 flex justify-between">
                <div className="sm:w-[100%] lg:w-[70%]">
                  <div className="flex flex-wrap sm:block md:hidden lg:hidden">
                    {Object.entries(selectedOptions).flatMap(
                      ([category, options]) =>
                        (options as string[]).map(
                          (option: string, index: number) => (
                            <div
                              key={`${category}-${index}`}
                              className="mr-1 mt-1 border border-[#e26178] bg-[#fcff4f6] px-[10px] py-[5px] text-[#e26178]"
                            >
                              {option.replace(/_/g, " ").replace(/,?$/, "")}
                              <button
                                className="mb-1 ml-2 align-middle"
                                onClick={() =>
                                  handleOptionSelect(option, category)
                                }
                              >
                                <Icon.X size={20} />
                              </button>
                            </div>
                          ),
                        ),
                    )}
                  </div>
                </div>

                <SortOptions
                  selectedSortOption={selectedSortOption}
                  handleSortOptionChange={handleSortOptionChange}
                />
              </div>

              <ProductList
                filteredProducts={sortedProducts}
                isLoading={isLoading}
                productsListRef={productsListRef}
                skuList={skuList}
              />
            </div>
          </div>
        </div>
        <MobileFilterBar
          sortOption={sortOption}
          setSortOption={setSortOption}
          mobileFilter={mobileFilter}
          setMobileFilter={setMobileFilter}
          handleSortOptionChange={handleSortOptionChange}
        />
      </div>
    </>
  );
};

export default ShopBreadCrumb1; 