"use client";

import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, blogs } from "@/utils/constants";

const BlogDetail = () => {
  const searchParams = useSearchParams();
  const blogUrl = searchParams.get("blogUrl");
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${baseUrl}${blogs}`);
        const matchingBlog = response.data.find(
          (blog:any) => blog.blogUrl == blogUrl
        );
        if (matchingBlog) {
          setBlogData(matchingBlog);
        } else {
          console.log("Blog not found");
        }
      } catch (error) {
        console.log("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [blogUrl]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blogData) {
    return <p>Blog not found</p>;
  }

  return (
    <div className="mx-11">
      <h1>{blogData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
    </div>
  );
};

export default BlogDetail;
