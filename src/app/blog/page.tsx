"use client";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Latest from "@/components/Blogcomp/Latest";
import Trending from "@/components/Blogcomp/Trending";
import Card from "@/components/Blogcomp/Card";
import axios from "axios";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { baseUrl, blogs, graphqlbaseUrl } from "@/utils/constants";

const Blogs = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const client = new ApolloClient({
          uri: graphqlbaseUrl,
          cache: new InMemoryCache(),
        });
        const GetAllBlogs = gql`
          query GetAllBlogs {
            getAllBlogs {
              id
              categoryId
              title
              addDate
              metaTitle
              keywords
              blogUrl
              image
              content
              categoryName
            }
          }
        `;
        const { data } = await client.query({
          query: GetAllBlogs,
        });
        setBlogData(data.getAllBlogs);
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
      <Trending blogData={blogData} />
      <Latest blogData={blogData} />
      <Card />
    </div>
  );
};

export default Blogs;
