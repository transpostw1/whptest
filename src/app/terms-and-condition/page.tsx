"use client"
import React from "react";
import Loader from "@/components/Other/Loader";
import { useBlog } from "@/context/BlogContext";

const Terms = () => {
  const { termsData, loading } = useBlog();

  if (loading) {
    return <Loader />;
  }

  if (!termsData) {
    return <div>No T&C data available</div>;
  }

  return (
    <>
      <div className="mx-5">
        <h1 className="my-3 text-center text-2xl font-bold text-[#e26178]">
          {termsData.name}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: termsData.content }} />
      </div>
    </>
  );
};

export default Terms;
