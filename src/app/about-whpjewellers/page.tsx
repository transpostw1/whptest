"use client";
import React from "react";
import Image from "next/image";
import { useBlog } from "@/context/BlogContext";
import Loader from "@/components/Other/Loader";

const About = () => {
  const { aboutusData, loading } = useBlog();

  if (loading) {
    return <Loader />;
  }

  if (!aboutusData) {
    return <div>No data available</div>;
  }

  return (
    <div className="mx-5">
      <h1 className="text-center font-bold my-3 text-[#e26178]  text-2xl">{aboutusData.name}</h1>
      {/* <Image
        objectFit="cover"
        src={"/images/banner/waman-hari-pethe-jewellers.png"}
        alt="about"
        width={5000}
        height={5000}
      /> */}
      <div dangerouslySetInnerHTML={{ __html: aboutusData.content }} />
    </div>
  );
};

export default About;
