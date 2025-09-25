"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCategory } from "@/context/CategoryContex";
import { motion } from "framer-motion";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";

const GET_ALL_GIFTS = gql`
  query GetAllGiftsTemplates {
    getAllGiftsTemplates {
      id
      title
      url
      image
      position
    }
  }
`;

const Gifts = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const { setCustomcategory } = useCategory();

  // Fetch gifts from GraphQL
  const fetchGifts = async () => {
    try {
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });

      const { data } = await client.query({
        query: GET_ALL_GIFTS,
      });

      const gifts = data.getAllGiftsTemplates;

      if (gifts && gifts.length > 0) {
        // Make a copy before sorting (Apollo returns frozen array)
        const sortedGifts = [...gifts].sort(
          (a: any, b: any) => a.position - b.position
        );
        setCategories(sortedGifts);
      }
    } catch (error) {
      console.error("Error fetching gifts:", error);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  // Detect mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (e: any) => setIsMobile(e.matches);
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const fadeUp = {
    hidden: {  y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="my-16 w-full px-8 text-rose-950">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-col items-start justify-between"
      >
        <h1 className="pb-2 text-[1.5rem] font-medium uppercase">
          Gifts that speak from the heart
        </h1>
        <p className="w-[100%] text-[16px] font-light lg:w-[50%]">
          Discover the joy of gifting with our curated selection, where every
          piece reflects thoughtfulness and timeless charm, making every
          occasion extra-special.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-3 grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {categories.map((category) => {
          // Extract internal query param from API URL
          const urlObj = new URL(category.url);
          const queryUrl = urlObj.searchParams.get("url");

          return (
            <motion.div key={category.id} variants={fadeUp}>
              <Link
                href={{
                  pathname: "/products",
                  query: { url: queryUrl },
                }}
                onClick={() => setCustomcategory(category.title)}
              >
                <div className="relative flex flex-col gap-2">
                  <div className="effect10 img hover:shadow-2xl">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="inline-flex">
                    <span className="me-2 cursor-pointer text-sm text-[#E26178] underline">
                      View All
                    </span>
                    <span className="flex">
                      <Image
                        src={"/images/icons/rightarrow.svg"}
                        alt="Right Arrow"
                        width={20}
                        height={20}
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Gifts;
