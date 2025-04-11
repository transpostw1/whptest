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
  const { recentlyViewedProducts } = useRecentlyViewedProducts();
  const { category, setCustomcategory } = useCategory();
  const [keywords, setKeyWords] = useState("");
  const router = useRouter();

  const handleSearch = (value: string) => {
    const formattedValue = value.replace(/ /g, "_").toLowerCase();
    console.log("Formatted Value", formattedValue);
  
    // if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "search", {
        search_term: formattedValue,
      });
    // } else {
      // console.warn("Google Analytics gtag is not defined");
    // }
    const currentUrl = window.location.href;
    const updatedUrl = currentUrl.includes("pc-")
      ? currentUrl.replace(/pc-[^&]+/, "")
      : currentUrl;
  
    router.push(`/products?url=search-${formattedValue}&source=search`);
  
    setCustomcategory(value);
    closeModal();
  };
  return (
    <div
      className={`no-scrollbar fixed left-0 top-0 h-full w-full ${
        isModalOpen ? "visible opacity-100" : "invisible opacity-0"
      } duration-400 z-[100] overflow-y-auto bg-black bg-opacity-60 transition-all ease-in-out`}
      onClick={closeModal}
    >
      <div
        className="relative z-[100] mx-auto mt-32 w-full max-w-[600px] rounded-lg bg-white p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center">
          {/* Add the close button */}
          <button
            className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={closeModal}
          >
            <IoMdArrowBack size={24} />
          </button>

          {/* Search bar */}
          <div className="form-search relative flex-1">
            <Icon.MagnifyingGlass className="heading5 absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer" />
            <input
              type="text"
              placeholder="Searching..."
              className="text-button-lg border-line h-14 w-full border-b pl-6 pr-12 focus:outline-none"
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
          <div className="collection-items mt-4 flex flex-wrap gap-3">
            <div
              className="item border-line cursor-pointer rounded-full border px-4 py-1.5 duration-300 hover:bg-black hover:text-white"
              onClick={() => {
                handleSearch("rings");
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
              className="item border-line cursor-pointer rounded-full border px-4 py-1.5 duration-300 hover:bg-black hover:text-white"
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
              className="item border-line cursor-pointer rounded-full border px-4 py-1.5 duration-300 hover:bg-black hover:text-white"
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
              className="item border-line cursor-pointer rounded-full border px-4 py-1.5 duration-300 hover:bg-black hover:text-white"
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
              className="item border-line cursor-pointer rounded-full border px-4 py-1.5 duration-300 hover:bg-black hover:text-white"
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
              className="item border-line cursor-pointer rounded-full border px-4 py-1.5 duration-300 hover:bg-black hover:text-white"
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
              className="item border-line cursor-pointer rounded-full border px-4 py-1.5 duration-300 hover:bg-black hover:text-white"
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
              className="item border-line cursor-pointer rounded-full border px-4 py-1.5 duration-300 hover:bg-black hover:text-white"
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
              className="item border-line cursor-pointer rounded-full border px-4 py-1.5 duration-300 hover:bg-black hover:text-white"
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
