"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { baseUrl, blogs } from "@/utils/constants";
interface Props {
  title:string;
  params: { blogUrl: string };
}
const BlogDetail:React.FC<Props>= ({params}) => {
    const { blogUrl } = params;
  const [blogData, setBlogData] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        if (typeof blogUrl === "string") {
          const response = await axios.get(`${baseUrl}${blogs}`);
          const matchingBlog = response.data.find(
            (blog: any) => blog.blogUrl === blogUrl
          );
        //   console.log(matchingblog,"Matchingg bloggg")
          if (matchingBlog) {
            setBlogData(matchingBlog);
          } else {
            console.log("Blog not found");
          }
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
    return <Loader />;
  }

  if (!blogData) {
    return <p>Blog not found</p>;
  }

  return (
    <>
      <div className="mx-11">
        <Image
          src={blogData.image}
          alt={"blog"}
          className="object-contain mb-6 w-[100%]"
          height={700}
          width={700}
        />
        <h1 className="text-xl font-semibold pb-5">{blogData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
      </div>
    </>
  );
};

export default BlogDetail;
