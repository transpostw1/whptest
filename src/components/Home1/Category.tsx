import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAllCategoryContext } from "@/context/AllCategoryContext";
import { useCategory } from "@/context/CategoryContex";
import * as Icon from "@phosphor-icons/react/dist/ssr";

const Category = () => {
  const router = useRouter();
  const { categories } = useAllCategoryContext();
  const { setCustomcategory } = useCategory();

  // State to track the number of items to display
  const [visibleItems, setVisibleItems] = useState(8);

  // Function to show more items
  const showMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
  };

  // Function to show less items
  const showLessItems = () => {
    setVisibleItems(8); // Reset to initial visible item count
  };

  if (categories.length == 0) return null;
  return (
    <>
      <div className="my-16 w-full px-8 font-[500] text-[#39161C]">
        <div className="flex flex-col items-start justify-between">
          <h1 className="pb-1 font-medium uppercase sm:text-[18px] lg:text-[32px]">
            SHOP BY CATEGORY
          </h1>
          <p className="text-sm font-light md:w-[50%]">
            Effortlessly find your perfect piece by exploring our jewellery
            categories. From stunning necklaces to exquisite rings, our
            collections cater to every style and taste.
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 justify-items-center gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.slice(0, visibleItems).map((category) => (
            <div
              key={category.id}
              className="relative flex flex-col items-start justify-between"
            >
              <Link
                href={{
                  pathname: "/products",
                  query: { url: category.url.split("=")[1] },
                }}
                onClick={() => {
                  const cleanUrl = category.url.split("=")[1];
                  setCustomcategory(cleanUrl);
                }}
              >
                <div className="effect14 cursor-pointer">
                  <img
                    src={category.parentImg}
                    alt={`category images ${category.name}`}
                    width={400}
                    height={400}
                    // unoptimized
                  />
                </div>
              </Link>

              <div>
                <h1 className="break-word font-semibold uppercase sm:text-lg">
                  {category.name}
                </h1>
                <Link
                  href={`/products?url=${category.url}`}
                  className="inline-flex items-center"
                  onClick={() => {
                    setCustomcategory(category.url);
                  }}
                >
                  <span className="me-2 cursor-pointer text-sm text-[#E26178] underline">
                    View All
                  </span>
                  <span className="flex items-center">
                    <Image
                      src={"/images/icons/rightarrow.svg"}
                      alt="Right Arrow"
                      width={20}
                      height={20}
                      unoptimized
                    />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          {visibleItems < categories.length && (
            <div
              className="mx-2 flex cursor-pointer rounded text-[#e26178]"
              onClick={showMoreItems}
            >
              Show More
              <Icon.CaretDown className="ml-1 mt-1" />
            </div>
          )}
          {visibleItems > 8 && (
            <div
              className="mx-2 flex cursor-pointer rounded text-[#e26178]"
              onClick={showLessItems}
            >
              Show Less
              <Icon.CaretUp className="ml-1 mt-1" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
