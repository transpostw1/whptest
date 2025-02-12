import React from "react";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType } from "@/type/ProductType";

interface props {
  filteredProducts: ProductType[];
}

const Breadcrumb: React.FC = ({ filteredProducts }) => {
  const breadcrumbs =
    filteredProducts.length > 0
      ? filteredProducts[0].breadcrumbs.filter(
          (breadcrumb) => breadcrumb.category_url !== null,
        )
      : [];

  const pageTitle =
    breadcrumbs.map((breadcrumb) => breadcrumb.title).join(" | ") || "WHP";

  return (
    <>
      <head>
        <title>{pageTitle}</title>
        <meta name="description" content={"Sign Up to WHP."} />
      </head>
      <nav aria-label="breadcrumb">
        <ol className="flex space-x-2 p-2">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.id} className="flex items-center">
              {index > 0 && (
                <span className="mx-2">
                  <Icon.CaretRight size={20} />
                </span>
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-[#e26178]">{breadcrumb.title}</span>
              ) : (
                <Link href={breadcrumb.category_url} className="text-gray-400">
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
