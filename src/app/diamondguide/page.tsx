"use client"
import React from "react";
import Loader from "@/components/Other/Loader";
import { useBlog } from "@/context/BlogContext";

const Diamondguide: React.FC  = () => {
  const { diamondData, loading } = useBlog();

  if (loading) {
    return <Loader />;
  }

  if (!diamondData) {
    return <div>No T&C data available</div>;
  }

  return (
    <>
      <div className="mx-5">
        <h1 className="my-8 text-center text-3xl font-bold text-[#e26178]">
          {diamondData.name}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: diamondData.content }} />
      </div>
    </>
  );
};

export default Diamondguide;
