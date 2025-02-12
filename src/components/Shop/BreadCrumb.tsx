"use client";

import React,{useEffect} from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType } from "@/type/ProductType";

interface props{
  filteredProducts: ProductType[];
}

const Breadcrumb: React.FC = ({
  filteredProducts
}) => {
  // const breadcrumbs=filteredProducts.breadcrumbs
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const breadcrumbs =
    filteredProducts.length > 0
      ? filteredProducts[0].breadcrumbs.filter((breadcrumb) => breadcrumb.category_url !== null)
      : [];

      const pageTitle = breadcrumbs.map((breadcrumb) => breadcrumb.title).join(" | ") || "WHP";
      


  // const generateBreadcrumbs = () => {
  //   const breadcrumbs = [];

  //   // Add Home
  //   breadcrumbs.push({ label: "Home", href: "/" });

  //   // Add Products
  //   // if (pathname.startsWith("/products")) {
  //   //   breadcrumbs.push({ label: "Products", href: "/products" });
  //   // }

  //   breadcrumbs.push({
  //     label: "Products",
  //     href: "/products?url=category-new_Arrival",
  //   });

  //   const url = searchParams.get("url");
  //   console.log("url", url);
  //   if (url) {
  //     let category = url.split("-")[1];
  //     if (category.includes(" ")) {
  //       category = category.split(" ")[0];
  //     }
  //     if (category && !/^\d/.test(category)) {
  //       breadcrumbs.push({
  //         label: category.charAt(0).toUpperCase() + category.slice(1),
  //         href: `/products?url=${url}`,
  //       });
  //     }
  //   }

  //   // Add Collection
  //   const pc = searchParams.get("pc");
  //   if (pc) {
  //     const collection = pc.replace("_", " ");
  //     breadcrumbs.push({
  //       label: collection.charAt(0).toUpperCase() + collection.slice(1),
  //       href: pathname + "?" + searchParams.toString(),
  //     });
  //   }
  //   return breadcrumbs;
  // };
  // const breadcrumbs = generateBreadcrumbs();

  // const title = breadcrumbs.map((breadcrumb) => breadcrumb.label).join(" | ");
  // console.log("breaddcrumnbbb", breadcrumbs, title);
  return (
    <>
      <head>
        <title>{pageTitle}</title>
        <meta name="description" content={"Sign Up to WHP."} />
      </head>
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2  p-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.id} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 ">
                <Icon.CaretRight size={20} />
              </span>
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className=" text-[#e26178]">{breadcrumb.title}</span>
            ) : (
              <Link
                href={breadcrumb.category_url}
                className="text-gray-400 "
              >
                {breadcrumb.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
    </>
  );
};

export default Breadcrumb;
