"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import ShopBreadCrumb1 from "@/components/Shop/ShopBreadCrumb1";

import productData from "@/data/Product.json";
import Footer from "@/components/Footer/Footer";
import NavHoverMenu from "@/components/Header/Menu/NavHoverMenu";
import NavTwo from "@/components/Header/TopNav/NavTwo";

export default function BreadCrumb1() {
  const searchParams = useSearchParams();
  let [type, setType] = useState<string | null | undefined>();
  let datatype = searchParams.get("type");
  let gender = searchParams.get("gender");
  let category = searchParams.get("category");

  useEffect(() => {
    setType(datatype);
  }, [datatype]);

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <NavTwo props="style-three bg-white" />

      <div id="header" className="relative w-full">
        <NavHoverMenu props="bg-white" />
      </div>

      <ShopBreadCrumb1
        data={productData}
        productPerPage={9}
        dataType={type}
        gender={gender}
        category={category}
      />
      <Footer />
    </>
  );
}
