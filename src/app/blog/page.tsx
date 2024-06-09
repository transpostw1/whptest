"use client";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Latest from "@/components/Blogcomp/Latest";
import Trending from "@/components/Blogcomp/Trending";
import Card from "@/components/Blogcomp/Card";
import axios from "axios";
import { baseUrl, blogs } from "@/utils/constants";

const Blogs = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${baseUrl}${blogs}`);
        setBlogData(response.data);
      } catch (error) {
        console.log("error fetching data of blog", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Latest blogData={blogData} />
      <Trending blogData={blogData} />
      <Card />
    </div>
  );
};

export default Blogs;
