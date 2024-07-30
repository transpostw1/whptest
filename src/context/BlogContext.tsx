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

interface Job {
  id: string;
  title: string;
  content: string;
  url: string;
  category: string;
  addDate: string;
  location: string[];
}

interface BlogContextType {
  blogData: Blog[];
  aboutusData: Showcase | null;
  termsData:Showcase|null;
  careersData: Job[];
  jobCategories: string[];
  loading: boolean;
  selectedUrl: string | null;
  setSelectedUrl: React.Dispatch<React.SetStateAction<string | null>>;
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
      location
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
  const [careersData, setCareersData] = useState<Job[]>([]);
  const [jobCategories, setJobCategories] = useState<string[]>([]);
  const [aboutusData, setAboutusData] = useState<Showcase | null>(null);
  const [termsData, setTermsData] = useState<Showcase | null>(null);

  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
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
  
      const aboutUsShowcase = data.getAllShowCase.find(
        (showcase: Showcase) => showcase.url === "about-whpjewellers"
      );
  
      const termsShowcase = data.getAllShowCase.find(
        (showcase: Showcase) => showcase.url === "terms-and-condition"
      );
  
      if (aboutUsShowcase) {
        setAboutusData(aboutUsShowcase);
      }
  
      if (termsShowcase) {
        setTermsData(termsShowcase);
      }
    } catch (error) {
      console.error("Error fetching showcase data", error);
    }
  };
  const fetchJobsData = async () => {
    try {
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });
      const { data } = await client.query({
        query: GetAllJobs,
      });
      setCareersData(data.getAllJobs);
      const categories = data.getAllJobs.map((job: Job) => job.category);
      setJobCategories(categories);
      console.log(data.getAllJobs)
      console.log(careersData, "careers data");
      console.log(jobCategories, "job categories");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchShowCaseData();
    fetchJobsData();
  }, []);

  useEffect(() => {
    console.log(jobCategories, "job categories");
  }, [jobCategories]);

  return (
    <BlogContext.Provider value={{ blogData, aboutusData,termsData, careersData, jobCategories, loading, selectedUrl, setSelectedUrl, fetchBlogData }}>
      {children}
    </BlogContext.Provider>
  );
};
