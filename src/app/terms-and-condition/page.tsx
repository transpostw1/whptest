"use client"
import React from "react";
import Loader from "@/components/Other/Loader";
import { useBlog } from "@/context/BlogContext";

const Terms: React.FC  = () => {
  const { termsData, loading } = useBlog();

  if (loading) {
    return <Loader />;
  }

  if (!termsData) {
    return <div>No T&C data available</div>;
  }

  return (
    <>
       <head>
        <title>Terms and Conditions.
        </title>
        <meta name="terms and conditions" content={"Terms and Conditions"} />
      </head>
      <div className="mx-5">
      <h1 className="my-8 text-center text-3xl font-bold text-[#e26178]">
          {termsData.name}
        </h1>
        <div  className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: termsData.content }} />
      </div>
    </>
  );
};

export default Terms;