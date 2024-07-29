"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";

interface Blog {
  id: string;
  categoryId: string;
  title: string;
  addDate: string;
  metaTitle: string;
  keywords: string;
  blogUrl: string;
  image: string;
  content: string;
  categoryName: string;
}

interface Showcase {
  id: string;
  name: string;
  url: string;
  content: string;
}

interface BlogContextType {
  blogData: Blog[];
  aboutusData: Showcase | null;
  loading: boolean;
  fetchBlogData: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

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

const GetAllShowCase = gql`
  query GetAllShowCase {
    getAllShowCase {
      id
      name
      url
      content
    }
  }
`;
const GetAllJobs = gql`
query GetAllJobs {
  getAllJobs {
    id
    title
    content
    url
    category
    addDate
  }
}
`;

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

export const BlogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [careersData, setcareersData] = useState<Careers[]>([]);
  const [aboutusData, setaboutusData] = useState<Showcase | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogData = async () => {
    try {
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });

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

  const fetchShowCaseData = async () => {
    try {
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });

      const { data } = await client.query({
        query: GetAllShowCase,
      });

      const showcase = data.getAllShowCase.find(
        (showcase: Showcase) => showcase.url === "about-whpjewellers"
      );

      if (showcase) {
        setaboutusData(showcase);
      }
    } catch (error) {
      console.error("Error fetching showcase data", error);
    }
  };

  const fetchJobsData = async ()=>{
    try{
      const client = new ApolloClient({
        uri:graphqlbaseUrl,
        cache: new InMemoryCache(),
      });
      const { data } = await client.query({
        query: GetAllJobs,
      });
      setcareersData(data)
      console.log(careersData,"careeeerr")


    }catch(error){
      console.log(error)
    }
  }


  useEffect(() => {
    fetchBlogData();
    fetchShowCaseData();
    fetchJobsData();
  }, []);

  return (
    <BlogContext.Provider value={{ blogData, aboutusData, loading, fetchBlogData }}>
      {children}
    </BlogContext.Provider>
  );
};
