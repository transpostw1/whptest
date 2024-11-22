"use client"
import React from "react";
import Loader from "@/components/Other/Loader";
import { useBlog } from "@/context/BlogContext";

const Gemguide: React.FC  = () => {
  const { gemstoneData, loading } = useBlog();

  if (loading) {
    return <Loader />;
  }

  if (!gemstoneData) {
    return <div>No T&C data available</div>;
  }

  return (
    <>
        <head>
    <title>Gemstone Guide</title>
    <meta
          name="description"
          content={
           "Gemstone Guide."
          }
        />
    </head>
      <div className="mx-5">
        <h1 className="my-8 text-center text-3xl font-bold text-[#e26178]">
          {gemstoneData.name}
        </h1>
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: gemstoneData.content }} />
      </div>
    </>
  );
};

export default Gemguide;
