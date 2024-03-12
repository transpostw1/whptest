"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import { ProductType } from "@/type/ProductType";
import productData from "@/data/Product.json";
import Product from "@/components/Product/Product";
import HandlePagination from "@/components/Other/HandlePagination";
import NavHoverMenu from "@/components/Header/Menu/NavHoverMenu";
import NavTwo from "@/components/Header/TopNav/NavTwo";
import * as Icon from "@phosphor-icons/react/dist/ssr";

const SearchResult = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [data, setData] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;
  const offset = currentPage * productsPerPage;
  let filteredData = data;

  const router = useRouter();

  async function getData() {
    const res = await fetch("http://164.92.120.19/api/getall-products/");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }

  async function singleProduct() {
    const product = await getData();
    setData(product);
    if (query === null) {
      query = "dress";
    }
    const filteredData = data.filter((product) =>
      product?.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  useEffect(() => {
    singleProduct();
  }, []);

  const handleSearch = (value: string) => {
    router.push(`/search-result?query=${value}`);
    setSearchKeyword("");
  };

  const searchParams = useSearchParams();
  let query = searchParams.get("query") as string;

  if (filteredData.length === 0) {
    filteredData = [
      {
        productId: -1,
        SKU: "no-data",
        variantId: -1,
        title: "no-data",
        displayTitle: "no-data",
        shortDesc: "no-data",
        longDesc: "no-data",
        url: "no-data",
        tags: [],
        collectionName: "no-data",
        shopFor: [],
        occasion: "no-data",
        theme: "no-data",
        length: "no-data",
        breadth: "no-data",
        height: "no-data",
        weightRange: "no-data",
        addDate: "no-data",
        lastModificationDate: "no-data",
        created_at: "no-data",
        updated_at: "no-data",
        sizeId: -1,
        productSize: "no-data",
        productQty: -1,
        attributedId: -1,
        preSalesProductQueries: "no-data",
        isReplaceable: -1,
        isReturnable: -1,
        isInternationalShippingAvailable: -1,
        customizationAvailability: -1,
        fastDelivery: -1,
        tryAtHome: -1,
        isActive: -1,
        grossWeight: -1,
        netWeight: -1,
        productAttributes: [],
        discountId: -1,
        discountCategory: "no-data",
        discountActive: -1,
        typeOfDiscount: "no-data",
        discountValue: "no-data",
        discountAmount: "no-data",
        discountPrice: "no-data",
        offerStartDate: "no-data",
        offerEndDate: "no-data",
        mediaId: "no-data",
        imageDetails: [],
        videoDetails: [],
        materialId: -1,
        metalType: "no-data",
        metalPurity: "no-data",
        metalWeight: "no-data",
        makingType: "no-data",
        makingChargesPerGrams: "no-data",
        additionalCost: "no-data",
        productPrice: "no-data",
        stoneDetails: [],
        diamondDetails: [],
      },
    ];
  }

  // Find page number base on filteredData
  const pageCount = Math.ceil(filteredData.length / productsPerPage);

  // If page number 0, set current page = 0
  if (pageCount === 0) {
    setCurrentPage(0);
  }

  // Get product data for current page
  let currentProducts: ProductType[];

  if (filteredData.length > 0) {
    currentProducts = filteredData.slice(offset, offset + productsPerPage);
  } else {
    currentProducts = [];
  }

  const handlePageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  return (
    <>
      {console.log(data, "aaditya")}
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <NavTwo props="style-three bg-white" />
      <div id="header" className="relative w-full">
        <NavHoverMenu props="bg-white" />
        <Breadcrumb heading="Search Result" subHeading="Search Result" />
      </div>
      <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
        <div className="container">
          <div className="heading flex flex-col items-center">
            <div className="heading4 text-center">
              Found {filteredData.length} results for {String.raw`"`}
              {query}
              {String.raw`"`}
            </div>
            <div className="input-block lg:w-1/2 sm:w-3/5 w-full md:h-[52px] h-[44px] sm:mt-8 mt-5">
              <div className="w-full h-full relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="caption1 w-full h-full pl-4 md:pr-[150px] pr-32 rounded-xl border border-line"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSearch(searchKeyword)
                  }
                />
                <button
                  className="button-main absolute top-1 bottom-1 right-1 flex items-center justify-center"
                  onClick={() => handleSearch(searchKeyword)}
                >
                  search
                </button>
              </div>
            </div>
          </div>
          <div className="list-product-block relative md:pt-10 pt-6">
            <div className="heading6">product Search: {query}</div>
            <div
              className={`list-product hide-product-sold grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-5`}
            >
              {filteredData.map((item) =>
                item.productId === -1 ? (
                  <div key={item.productId} className="no-data-product">
                    No products match the selected criteria.
                  </div>
                ) : (
                  <Product key={item.productId} data={item} />
                )
              )}
            </div>

            {pageCount > 1 && (
              <div className="list-pagination flex items-center justify-center md:mt-10 mt-7">
                <HandlePagination
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResult;
