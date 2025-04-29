"use client";
import React, { useState, useEffect } from "react";
import { Metadata } from "next";
import Default from "@/components/Product/Detail/Default";

interface PageProps {
  params: Promise<{ productUrl: number }>;
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [apiData, setApiData] = useState<any>(null);
  const [productUrl, setProductUrl] = useState<number | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setProductUrl(resolvedParams.productUrl);
    });
  }, [params]);

  const handleApiData = (data: any) => {
    setApiData(data);
  };
  console.log(apiData, "APDATA");
  return (
    <div>
      {/* Main content */}
      <head>
        <title>{apiData?.productDetails?.title || "Details"}</title>
        <meta
          name="product details"
          content={
            apiData?.productDetails?.description || "Discover our amazing products at WHP Jewellers."
          }
        />
      </head>
      {productUrl && <Default productId={productUrl} onDataFetched={handleApiData} />}
    </div>
  );
};

export default Page;