// Blogs.tsx
"use client";
import React from "react";
import Loader from "./loading";
import Latest from "@/components/Blogcomp/Latest";
import Trending from "@/components/Blogcomp/Trending";
import Card from "@/components/Blogcomp/Card";
import { useBlog } from "@/context/BlogContext"; // Adjust the import path as necessary

const Blogs: React.FC = () => {
  const { blogData, loading } = useBlog();

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <head>
        <title>Blogs</title>
        <meta name="blog" content={"WHP Blogs."} />
      </head>
      <Trending blogData={blogData} />
      <Latest blogData={blogData} />
      <Card />
    </div>
  );
};

export default Blogs;
