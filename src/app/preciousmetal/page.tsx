"use client"
import React from "react";
import Loader from "@/components/Other/Loader";
import { useBlog } from "@/context/BlogContext";

const Preciousguide: React.FC  = () => {
  const { preciousmetalData, loading } = useBlog();

  if (loading) {
    return <Loader />;
  }

  if (!preciousmetalData) {
    return <div>No T&C data available</div>;
  }

  return (
    <>
      <div className="mx-5">
        <h1 className="my-8 text-center text-3xl font-bold text-[#e26178]">
          {preciousmetalData.name}
        </h1>
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: preciousmetalData.content }} />
      </div>
    </>
  );
};

export default Preciousguide;
