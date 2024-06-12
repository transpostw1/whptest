import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAllCategoryContext } from "@/context/AllCategoryContext";
import { useCategory } from "@/context/CategoryContex";

const Category = () => {
  const router = useRouter();
  const { categories } = useAllCategoryContext();
  const { setCustomcategory } = useCategory();

  // let categories: {
  //   id: number;
  //   type: string;
  //   description: string;
  //   image: JSX.Element;
  //   href: string; // Ensure href is of type Url
  // }[] = [
  //   {
  //     id: 1,
  //     type: "PENDANTS",
  //     description:
  //       "More than an accessory , they're a expressions of personal style.",
  //     image: (
  //       <Image
  //         src={"/images/category/PendantCategory.jpg"}
  //         alt="Pendant"
  //         width={400}
  //         height={400}
  //       />
  //     ),
  //     href: "/products?url=pendant",
  //   },
  //   {
  //     id: 2,
  //     type: "EARRINGS",
  //     description:
  //       "Frame the face and illuminates your style, with elegance and personality",
  //     image: (
  //       <Image
  //         src={"/images/category/earringsjpg.jpg"}
  //         alt="Earrings"
  //         width={400}
  //         height={400}
  //       />
  //     ),
  //     href: "/products?url=earrings",
  //   },
  //   {
  //     id: 3,
  //     type: "RINGS",
  //     description:
  //       "Timeless symbols of commitment individuality emotions, and style.",
  //     image: (
  //       <Image
  //         src={"/images/category/RingsCategory.jpg"}
  //         alt="Rings"
  //         width={400}
  //         height={400}
  //       />
  //     ),
  //     href: "/products?url=rings",
  //   },
  //   {
  //     id: 4,
  //     type: "CHAINS",
  //     description:
  //       "Each chain link tells a story of elegance and sophistication.",
  //     image: (
  //       <Image
  //         src={"/images/category/Bracelet.jpg"}
  //         alt="Chains"
  //         width={400}
  //         height={400}
  //       />
  //     ),
  //     href: "/products?url=chains",
  //   },
  //   {
  //     id: 5,
  //     type: "BRACELET & BANGLES",
  //     description:
  //       "Stunning bangles & bracelets, where every piece is a harmony of style.",
  //     image: (
  //       <Image
  //         src={"/images/category/Bracelet.jpg"}
  //         alt="Bracelets"
  //         width={400}
  //         height={400}
  //       />
  //     ),
  //     href: "/products?url=bracelets",
  //   },
  //   {
  //     id: 6,
  //     type: "MANGALSUTRA",
  //     description:
  //       "Symbolise eternal love with our intricatelly designed Mangalsutras",
  //     image: (
  //       <Image
  //         src={"/images/category/Mangalsutra.jpg"}
  //         alt="Mangalsutra"
  //         width={400}
  //         height={400}
  //       />
  //     ),
  //     href: "/products?url=mangulsutra",
  //   },
  //   {
  //     id: 7,
  //     type: "NECKLACE",
  //     description:
  //       "Exquisite necklaces each piece crafted to adorn and captivate.",
  //     image: (
  //       <Image
  //         src={"/images/category/necklace.jpg"}
  //         alt="Necklace"
  //         width={400}
  //         height={400}
  //       />
  //     ),
  //     href: "/products?url=necklace",
  //   },
  //   {
  //     id: 8,
  //     type: "SILVER JEWELLERY",
  //     description:
  //       "Explore enduring craftsmanship in silver articles,coins,bars.",
  //     image: (
  //       <Image
  //         src={"/images/category/Silver.jpg"}
  //         alt="Silver"
  //         width={400}
  //         height={400}
  //       />
  //     ),
  //     href: "/products?url=silver",
  //   },
  // ];

  return (
    <>
      <div className="w-full px-8 my-16 font-[500]  text-[#39161C]">
        <div className="flex flex-col items-start justify-between">
          <h1 className="font-semibold text-[1.5rem] uppercase pb-2">SHOP BY CATEGORY</h1>
          <p className="">
            Effortlessly find your perfect piece by exploring our jewellery
            categories. <br />
            From stunning necklaces to exquisite rings, our collections cater to
            every style and taste.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3 items-center ">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col relative items-start justify-between "
            >
              <Link
                href={`/products?url=${category.url}`}
                onClick={() => setCustomcategory(category.url)}
              >
                <div className="effect14 cursor-pointer">
                  <Image
                    src={category.parentImg}
                    alt={category.url}
                    width={400}
                    height={400}
                  />
                </div>
              </Link>

              <div>
                <h1 className="text-xl font-semibold uppercase break-word">{category.name}</h1>
                <a className="inline-flex items-center" onClick={() => {
                  router.push(`/products?url=${category.url}`);
                  setCustomcategory(category.url);
                }}>
                  <span className="me-2 text-[#E26178] underline cursor-pointer text-sm">
                    View All
                  </span>
                  <span className="flex items-center">
                    <Image
                      src={"/images/icons/rightarrow.svg"}
                      alt="Right Arrow"
                      width={20}
                      height={20}
                    />
                  </span>
                </a>
                {/* <p className="text-sm font-medium">{category.description}</p> */}
                {/* <h3
                  className="text-red-600 underline font-bold cursor-pointer"
                  onClick={() => {
                    router.push(`/products?url=${category.url}`);
                    setCustomcategory(category.url);
                  }}
                >
                  VIEW ALL
                </h3> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
