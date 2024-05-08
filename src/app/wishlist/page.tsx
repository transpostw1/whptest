'use client'
import React, { useState } from 'react'
// import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import NavTwo from '@/components/Header/TopNav/NavTwo'
import NavHoverMenu from '@/components/Header/Menu/NavHoverMenu'
// import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import { ProductType } from '@/type/ProductType'
import Product from '@/components/Product/Product'
import { useWishlist } from '@/context/WishlistContext'
import HandlePagination from '@/components/Other/HandlePagination'
import * as Icon from "@phosphor-icons/react/dist/ssr";


const Wishlist = () => {
    const { wishlistState } = useWishlist();
    const [sortOption, setSortOption] = useState('');
    const [layoutCol, setLayoutCol] = useState<number | null>(4)
    const [type, setType] = useState<string | undefined>()
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 12;
    const offset = currentPage * productsPerPage;

    const handleLayoutCol = (col: number) => {
        setLayoutCol(col)
    }

    const handleType = (type: string) => {
        setType((prevType) => (prevType === type ? undefined : type))
    }

    const handleSortChange = (option: string) => {
        setSortOption(option);
    };

    // Filter product data by type
    // let filteredData = wishlistState.wishlistArray.filter(product => {
    //     let isTypeMatched = true;
    //     if (type) {
    //         isTypeMatched = product.type === type;
    //     }

    //     return isTypeMatched
    // })

   


    const handlePageChange = (selected: number) => {
        setCurrentPage(selected);
    };


    return (
      <>
        {/* <TopNavOne textColor="text-white" />
        <NavTwo props="style-three bg-white" />
        <div id="header" className="w-full relative">
          <NavHoverMenu props="bg-white" /> */}
        {/* <Breadcrumb heading="Shopping cart" subHeading="Shopping cart" /> */}
        {/* </div> */}
        <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
          <div className="container">
            <div className="list-product-block relative">
              <div className="filter-heading flex items-center justify-between gap-5 flex-wrap">
                <div className="left flex has-line items-center flex-wrap gap-5"></div>
                <div className="right flex items-center gap-3">
                  <div className="select-block filter-type relative">
                    <select
                      className="caption1 py-2 pl-3 md:pr-12 pr-8 rounded-lg border border-line capitalize"
                      name="select-type"
                      id="select-type"
                      onChange={(e) => handleType(e.target.value)}
                      value={type === undefined ? "Type" : type}
                    >
                      <option value="Type" disabled>
                        Type
                      </option>
                      {[
                        "Rings",
                        "Earrings",
                        "Pendants",
                        "Chains",
                        "Bangles",
                        "Necklaces",
                        "NosePin",
                      ].map((item, index) => (
                        <option
                          key={index}
                          className={`item cursor-pointer ${
                            type === item ? "active" : ""
                          }`}
                        >
                          {item}dfsfs
                        </option>
                      ))}
                    </select>
                    <Icon.CaretDown
                      size={12}
                      className="absolute top-1/2 -translate-y-1/2 md:right-4 right-2"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="list-product hide-product-sold grid md:grid-cols-2 lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[40px] mt-7 mb-5">
                  {/* {filteredData
                    .slice(pagesVisited, pagesVisited + productsPerPage)
                    .map((item: any) => ( */}
                      {/* <Product key={item.productId} data={item} /> */}
                    {/* ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}

export default Wishlist