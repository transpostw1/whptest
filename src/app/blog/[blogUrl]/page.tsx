"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../loading";
import { useBlog } from "@/context/BlogContext";

interface Props {
  params: { blogUrl: string };
}

const BlogDetail: React.FC<Props> = ({ params }) => {
  const { blogUrl } = params;
  const { blogData } = useBlog();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const fetchBlogData = async () => {
      try {
        const matchingBlog = blogData.find(
          (blog: any) => blog.blogUrl === blogUrl,
        );
        if (matchingBlog) {
          setBlog(matchingBlog);
        } else {
          console.log("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (blogUrl) {
      fetchBlogData();
    }
  }, [blogUrl, blogData]);

  if (loading) {
    return <Loader />;
  }

  if (!blog) {
    return (
      <div className="my-10 text-center text-2xl">
        Uh oh! This blog post was not found.
      </div>
    );
  }

  return (
    <div className="px-5 lg:px-14">
      <Image
        src={blog.image}
        alt={"blog"}
        className="mb-6 w-[100%] object-contain"
        height={700}
        width={700}
      />
      <h1 className="pb-5 text-[24px] font-medium leading-[33px] lg:text-[48px] lg:leading-[67px]">
        {blog.title}
      </h1> 
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default BlogDetail;
