"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCategory } from "@/context/CategoryContex";
import { IoIosTrendingUp, IoMdArrowBack } from "react-icons/io";
import useRecentlyViewedProducts from "@/hooks/useRecentlyViewedProducts";
import handleOptionSelect from "@/components/Shop/ShopBreadCrumb1";

interface ModalSearchProps {
  closeModal: () => void;
  isModalOpen: boolean;
}

const ModalSearch: React.FC<ModalSearchProps> = ({
  closeModal,
  isModalOpen,
}) => {
  const {recentlyViewedProducts}=useRecentlyViewedProducts()
  const { category, setCustomcategory } = useCategory();
  const [keywords, setKeyWords] = useState("");
  const router = useRouter();

  const handleSearch = (value: string) => {
    const formattedValue = value.replace(/ /g, "_");
    const value2 = formattedValue.toLowerCase();
    console.log("Formatted Value", value2);
  
    const currentUrl = window.location.href;
    const updatedUrl = currentUrl.includes('pc-') ? currentUrl.replace(/pc-[^&]+/, '') : currentUrl;
  
    if (value2 === 'earrings' || value2 === 'ring' || value2 === 'mangalsutra' || value2 === 'pendants' || value2 === 'bangle' || value2 === 'bracelet' || value2 === 'necklace') {
      router.push(`/products?url=category-${value2}&source=search`);
    } else {
      router.push(`/products?url=search-${value2}&source=search`);
    }
  
    setCustomcategory(value);
    closeModal();
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full no-scrollbar ${isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-all duration-400 ease-in-out bg-black bg-opacity-60 z-[100] overflow-y-auto`}
      onClick={closeModal}
    >
      <div
        className="bg-white p-5 rounded-lg max-w-[600px] w-full mx-auto mt-32 relative z-[100]"
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
            <Icon.MagnifyingGlass className="absolute heading5 right-6 top-1/2 -translate-y-1/2 cursor-pointer" />
            <input
              type="text"
              placeholder="Searching..."
              className="text-button-lg h-14 border-b border-line w-full pl-6 pr-12 focus:outline-none"
              value={keywords}
              onChange={(e) => {
                setKeyWords(e.target.value);
              }}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  // const formattedValue = e.target.value.replace(/ /g, "_");
                  handleSearch(e.target.value);
                }
              }}
              autoFocus
            />
          </div>
        </div>

        <div className="trendingsearches mt-8">
          <div className="heading5">Trending Keywords</div>
          <div className="collection-items flex flex-wrap gap-3 mt-4">
            <div
              className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
              onClick={() => {
                handleSearch("ring");
              }}
            >
              <div className="flex items-center">
                {" "}
                {/* Add this container */}
                <IoIosTrendingUp />
                <span className="ml-2">Rings</span>
                {/* Adjust margin as needed */}
              </div>
            </div>
            <div
              className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
              onClick={() => {
                handleSearch("mangalsutra");
              }}
            >
              <div className="flex items-center">
                <IoIosTrendingUp />
                <span className="ml-2">Mangalsutra</span>
              </div>
            </div>

            <div
              className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
              onClick={() => {
                handleSearch("pendants");
              }}
            >
              <div className="flex items-center">
                <IoIosTrendingUp />
                <span className="ml-2">Pendants</span>
              </div>
            </div>

            <div
              className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
              onClick={() => {
                handleSearch("bangle");
              }}
            >
              <div className="flex items-center">
                <IoIosTrendingUp />
                <span className="ml-2">Bangles</span>
              </div>
            </div>

            <div
              className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
              onClick={() => {
                handleSearch("earring");
              }}
            >
              <div className="flex items-center">
                <IoIosTrendingUp />
                <span className="ml-2">Earrings</span>
              </div>
            </div>

            <div
              className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
              onClick={() => {
                handleSearch("chain");
              }}
            >
              <div className="flex items-center">
                <IoIosTrendingUp />
                <span className="ml-2">Chains</span>
              </div>
            </div>

            {/* <div
              className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
              onClick={() => {handleSearch("Solitaire"); setCustomcategory("solitare")}}
            >
              <div className="flex items-center">
                <IoIosTrendingUp />
                <span className="ml-2">Solitaire</span>
              </div>
            </div> */}

            <div
              className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
              onClick={() => {
                handleSearch("necklace");
              }}
            >
              <div className="flex items-center">
                <IoIosTrendingUp />
                <span className="ml-2">Necklace</span>
              </div>
            </div>

            <div
              className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
              onClick={() => {
                handleSearch("silver");
              }}
            >
              <div className="flex items-center">
                <IoIosTrendingUp />
                <span className="ml-2">Silver</span>
              </div>
            </div>

            <div
              className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
              onClick={() => {
                handleSearch("gold_coin");
              }}
            >
              <div className="flex items-center">
                <IoIosTrendingUp />
                <span className="ml-2">Gold Coin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSearch;