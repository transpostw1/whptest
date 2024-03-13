"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ShopBreadCrumb1 from "@/components/Shop/ShopBreadCrumb1";

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
      <ShopBreadCrumb1
        productPerPage={9}
        dataType={type}
        gender={gender}
        category={category}
      />
    </>
  );
}
