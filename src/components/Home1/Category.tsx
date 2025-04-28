import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAllCategoryContext } from "@/context/AllCategoryContext";
import { useCategory } from "@/context/CategoryContex";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";

const Category = () => {
  const router = useRouter();
  const { categories } = useAllCategoryContext();
  const { setCustomcategory } = useCategory();
  const [visibleItems, setVisibleItems] = useState(8);
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };
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
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-start justify-between"
        >
          <h1 className="pb-1 text-[1.5rem] font-medium uppercase">
            SHOP BY CATEGORY
          </h1>
          <p className="text-sm font-light md:w-[50%]">
            Effortlessly find your perfect piece by exploring our jewellery
            categories. From stunning necklaces to exquisite rings, our
            collections cater to every style and taste.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-3 grid grid-cols-2 justify-items-center gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {categories.slice(0, visibleItems).map((category) => (
            <motion.div
              key={category.id}
              variants={fadeUp}
              className="hover:scale-105 hover:shadow-md"
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
                <div className="cursor-pointer">
                  {category.parentImg ? (
                    <Image
                      src={category.parentImg}
                      alt={`category images ${category.name}`}
                      width={400}
                      height={400}
                      unoptimized
                    />
                  ) : (
                    <Image
                      src="/images/other/Logo.png"
                      alt={`category images ${category.name}`}
                      width={400}
                      height={400}
                      unoptimized
                    />
                  )}
                </div>
              </Link>

              <div>
                <h1 className="break-word font-semibold uppercase sm:text-lg">
                  {category.name}
                </h1>
                <Link
                  href={category.url}
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
            </motion.div>
          ))}
        </motion.div>
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
