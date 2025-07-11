"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCategory } from "@/context/CategoryContex";
import { motion } from "framer-motion";
const Gifts = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { setCustomcategory } = useCategory();
  let categories = [
 
    {
      id: 1,
      url: "pc-gift_for_special_occasion",
      head: "special",
      type: "Gift For Special Occasion",
      image: (
        <Image
          src={"/images/gifts/SpecialOccasion.jpg"}
          alt=""
          width={400}
          height={400}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />
      ),
    },
    {
      id: 2,
      url: "pc-silver_article_silver_gifting_rakhi",
      head: "silver_rakhi",
      type: "Silver Rakhi",
      image: (
        <Image
          src={"/images/gifts/Rakhi.png"}
          alt=" "
          width={400}
          height={400}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />
      ),
    },
       {
      id: 3,
      url: "pc-all_jewellery_mens_jewellery_rings",
      head: "Men's Rings",
      type: "Men's Rings",
      image: (
        <Image
          src={"/images/gifts/RingForMen.jpg"}
          alt=""
          width={400}
          height={400}
          unoptimized
        />
      ),
    },
    {
      id: 4,
      url: "pc-rings_engagement_ring",
      head: "engagement_ring",
      type: "Engagement Ring",
      image: (
        <Image
          src={"/images/gifts/RingForWomen.jpg"}
          alt=""
          width={400}
          height={400}
          unoptimized
        />
      ),
    },
       {
      id: 5,
      url: "pc-gift_for_her",
      head: "for_her",
      type: "For Her",
      image: (
        <Image
          src={"/images/gifts/GiftHer.jpg"}
          alt=""
          height={400}
          width={400}
          unoptimized
        />
      ),
    },
    {
      id: 6,
      url: "pc-gift_for_him",
      head: "for_him",
      type: "for Him",
      image: (
        <Image
          src={"/images/gifts/GiftHim.jpg"}
          alt=""
          width={400}
          height={400}
          unoptimized
        />
      ),
    },
    {
      id: 7,
      url: "pc-little_star_collection",
      head: "new_born_baby",
      type: "Little Star Collection",
      image: (
        <Image
          src={"/images/gifts/LittleStarCollection.jpg"}
          alt=""
          width={400}
          height={400}
          unoptimized
        />
      ),
    },
    {
      id: 8,
      url: "pc-self_gifting_tresures",
      head: "house_warming",
      type: "Self Gifting",
      image: (
        <Image
          src={"/images/gifts/SelfGifting.jpg"}
          alt=""
          width={400}
          height={400}
          unoptimized
        />
      ),
    },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (e: any) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <>
      <div className="my-16 w-full px-8 text-rose-950">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-start justify-between"
        >
          <h1 className="pb-2 text-[1.5rem] font-medium uppercase">
            Gifts that speak from the heart
          </h1>
          <p className="w-[100%] text-[16px] font-light lg:w-[50%]">
            Discover the joy of gifting with our curated selection,where every
            piece reflects thoughtfulness and timeless charm, making evey
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
          {categories.map((category) => (
            <motion.div key={category.id} variants={fadeUp}>
              <Link
                href={{
                  pathname: "/products",
                  query: { url: `${category.url}` },
                }}
                onClick={() => setCustomcategory(category.head)}
              >
                <div className="relative flex flex-col gap-2">
                  <div className="effect10 img hover:shadow-2xl">
                    {category.image}{" "}
                  </div>
                  {/* {isMobile && (
                  <div className="text-md break-words">{category.type}</div>
                )} */}
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
                        unoptimized
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Gifts;
