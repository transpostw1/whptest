"use client";

import React from "react";
import { useRouter } from "next/navigation";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import productData from "@/data/Product.json";
import Product from "../Product/Product";
import Image from "next/image";
import { IoIosTrendingUp, IoMdArrowBack } from "react-icons/io";
import useRecentlyViewedProducts from '@/hooks/useRecentlyViewedProducts';

interface ModalSearchProps {
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (value: string) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  handleModalToggle: () => void;
}

const ModalSearch: React.FC<ModalSearchProps> = ({
  searchKeyword,
  setSearchKeyword,
  handleSearch,
  closeModal,
  isModalOpen,
}) => {
  const handleKeywordSearch = (value: string) => {
    handleSearch(value);
    closeModal();
  };
  const { recentlyViewedProducts } = useRecentlyViewedProducts();

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full ${
        isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-all duration-400 ease-in-out bg-black bg-opacity-60 z-[1000] overflow-y-auto`}
      onClick={closeModal}
    >
      <div
        className="bg-white p-5 rounded-lg max-w-[600px] w-full mx-auto mt-32 relative z-[99999]"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-center">
            {/* Add the close button */}
            <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none mr-4"
            onClick={closeModal}
            >
            <IoMdArrowBack size={24} />
            </button>

            {/* Search bar */}
            <div className="form-search relative flex-1">
                <Icon.MagnifyingGlass
                    className="absolute heading5 right-6 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => handleKeywordSearch(searchKeyword)}
                />
                <input
                    type="text"
                    placeholder="Searching..."
                    className="text-button-lg h-14 border-b border-line w-full pl-6 pr-12 focus:outline-none"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleKeywordSearch(searchKeyword)}
                    autoFocus
                />
            </div>

        </div>
        
        
        <div className="trendingsearches mt-8">
          <div className="heading5">Trending Keywords</div>
          <div className="collection-items flex flex-wrap gap-3 mt-4">
                <div
                    className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
                    onClick={() => handleSearch('rings')}
                    >
                    <div className="flex items-center"> {/* Add this container */}
                        <IoIosTrendingUp />
                        <span className="ml-2">Rings</span> {/* Adjust margin as needed */}
                    </div>
                </div>
                <div className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white" onClick={() => handleSearch('Mangalsutra')}>
                <div className="flex items-center">
                    <IoIosTrendingUp />
                    <span className="ml-2">Mangalsutra</span>
                    </div>
                </div>

                <div className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white" onClick={() => handleSearch('Pendants')}>
                    <div className="flex items-center">
                    <IoIosTrendingUp />
                    <span className="ml-2">Pendants</span>
                    </div>
                </div>

                <div className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white" onClick={() => handleSearch('Bangles')}>
                    <div className="flex items-center">
                    <IoIosTrendingUp />
                    <span className="ml-2">Bangles</span>
                    </div>
                </div>

                <div className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white" onClick={() => handleSearch('Earrings')}>
                    <div className="flex items-center">
                    <IoIosTrendingUp />
                    <span className="ml-2">Earrings</span>
                    </div>
                </div>

                <div className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white" onClick={() => handleSearch('Gold Chains')}>
                    <div className="flex items-center">
                    <IoIosTrendingUp />
                    <span className="ml-2">Gold Chains</span>
                    </div>
                </div>

                <div className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white" onClick={() => handleSearch('Solitaire')}>
                    <div className="flex items-center">
                    <IoIosTrendingUp />
                    <span className="ml-2">Solitaire</span>
                    </div>
                </div>

                <div className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white" onClick={() => handleSearch('Necklace')}>
                    <div className="flex items-center">
                    <IoIosTrendingUp />
                    <span className="ml-2">Necklace</span>
                    </div>
                </div>

                <div className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white" onClick={() => handleSearch('Silver')}>
                    <div className="flex items-center">
                    <IoIosTrendingUp />
                    <span className="ml-2">Silver</span>
                    </div>
                </div>

                <div className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white" onClick={() => handleSearch('Gold Bars')}>
                    <div className="flex items-center">
                    <IoIosTrendingUp />
                    <span className="ml-2">Gold Bars</span>
                    </div>
                </div>
                          
          </div>

          <div className="list-recent mt-8">
            <div className="heading5">Continue Browsing...</div>
            <div className="list-product pb-5 hide-product-sold grid xl:grid-cols-4 sm:grid-cols-2 gap-7 mt-4">
                {recentlyViewedProducts.map((product) => (
                product ? ( // Check if product is not null
                    <Product key={product.id} data={product} />
                ) : null
                ))}
            </div>
           </div>
        
        <div className="heading5 mt-8">Top Collections</div>
        <div className="list-keyword grid grid-cols-3 gap-6 mt-4">
        <div className="item flex flex-col items-center cursor-pointer">
            <Image
            src="/images/trendingcollections/forher.png"
            alt="For Her"
            width={80}
            height={80}
            className="rounded-full"
            />
            <span className="mt-2">For Her</span>
        </div>
        <div className="item flex flex-col items-center cursor-pointer">
            <Image
            src="/images/trendingcollections/forhim.png"
            alt="For Him"
            width={80}
            height={80}
            className="rounded-full"
            />
            <span className="mt-2">For Him</span>
        </div>
        <div className="item flex flex-col items-center cursor-pointer">
            <Image
            src="/images/trendingcollections/investors.png"
            alt="Investors"
            width={80}
            height={80}
            className="rounded-full"
            />
            <span className="mt-2">Investors</span>
        </div>
        <div className="item flex flex-col items-center cursor-pointer">
            <Image
            src="/images/trendingcollections/mangalsutra.png"
            alt="Mangalsutra"
            width={80}
            height={80}
            className="rounded-full"
            />
            <span className="mt-2">Mangalsutra</span>
        </div>
        <div className="item flex flex-col items-center cursor-pointer">
            <Image
            src="/images/trendingcollections/selfgift.png"
            alt="Self Gift"
            width={80}
            height={80}
            className="rounded-full"
            />
            <span className="mt-2">Self Gift</span>
        </div>
        <div className="item flex flex-col items-center cursor-pointer">
            <Image
            src="/images/trendingcollections/wedding.png"
            alt="Wedding"
            width={80}
            height={80}
            className="rounded-full"
            />
            <span className="mt-2">Wedding</span>
        </div>
        </div>


        
        </div>
       
      </div>
    </div>
  );
};

export default ModalSearch;