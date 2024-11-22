"use client";
import React, { useState } from "react";
import { Metadata } from "next";
import Default from "@/components/Product/Detail/Default";

interface PageProps {
  params: {
    productUrl: number;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [apiData, setApiData] = useState<any>(null);

  const handleApiData = (data: any) => {
    setApiData(data);
  };
  console.log(apiData,"APDATA")



  return (
    <div>
      {/* Main content */}
      <head>
        <title>{apiData?.productDetails?.title || "Details"}</title>
        <meta
          name="description"
          content={
            apiData?.productDetails?.description || "Discover our amazing products at WHP Jewellers."
          }
        />
      </head>
      <Default productId={params.productUrl} onDataFetched={handleApiData} />
    </div>
  );
};

export default Page;
