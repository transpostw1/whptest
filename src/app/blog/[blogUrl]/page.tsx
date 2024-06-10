"use client";
import Image from "next/image";

import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { baseUrl, blogs } from "@/utils/constants";

const BlogDetail = () => {
  const searchParams = useSearchParams();
  const blogUrl = searchParams.get("blogUrl");
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        console.log("INNINININ",blogUrl)
        const response = await axios.get(`${baseUrl}${blogs}`);
        const matchingBlog = response.data.find(
          (blog:any) => blog.blogUrl === blogUrl
        );
        if (matchingBlog) {
            console.log(matchingBlog,"matchingblooo")
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
    return <Loader/>;
  }

  if (!blogData) {
    return <p>Blog not found</p>;
  }

  return (
    <>
      <div className="mx-11">
        <h1 className="text-xl font-semibold py-5">{blogData.title}</h1>
        <Image
          src={blogData.image}
          alt={"blog"}
          className="object-contain my-6"
          height={300}
          width={300}
        />
        <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
      </div>
    </>
  );
};

export default BlogDetail;
