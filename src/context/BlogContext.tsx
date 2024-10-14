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
  termsData: Showcase | null;
  diamondData: Showcase | null;
  gemstoneData: Showcase | null;
  preciousmetalData: Showcase | null;
  ringSizeGuide: any;
  bangleSizeGuide: any;
  chainSizeGuide: any;
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
  const [diamondData, setDiamondData] = useState<Showcase | null>(null);
  const [gemstoneData, setGemstoneData] = useState<Showcase | null>(null);
  const [preciousmetalData, setPreciousmetalData] = useState<Showcase | null>(
    null,
  );
  const [ringSizeGuide, setRingSizeGuide] = useState<Showcase | null>(null);
  const [bangleSizeGuide, setBangleSizeGuide] = useState<Showcase | null>(null);
  const [chainSizeGuide, setChainSizeGuide] = useState<Showcase | null>(null);

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
        (showcase: Showcase) => showcase.url === "about-whpjewellers",
      );

      const DiamondShowcase = data.getAllShowCase.find(
        (showcase: Showcase) => showcase.url === "diamond-guide",
      );
      const RingSizeGuide = data.getAllShowCase.find(
        (showcase: Showcase) => showcase.url === "ring-size-guide",
      );
      const ChainSizeGuide = data.getAllShowCase.find(
        (showcase: Showcase) => showcase.url === "chain-size-guide",
      );
      const BangleSizeGuide = data.getAllShowCase.find(
        (showcase: Showcase) => showcase.url === "bangle-size-guide",
      );
      const GemsShowcase = data.getAllShowCase.find(
        (showcase: Showcase) => showcase.url === "gemstone-guide",
      );
      const PreciousShowcase = data.getAllShowCase.find(
        (showcase: Showcase) => showcase.url === "precious-metal-guide",
      );

      const termsShowcase = data.getAllShowCase.find(
        (showcase: Showcase) => showcase.url === "terms-and-condition",
      );

      if (aboutUsShowcase) {
        setAboutusData(aboutUsShowcase);
      }

      if (termsShowcase) {
        setTermsData(termsShowcase);
      }
      if (DiamondShowcase) {
        setDiamondData(DiamondShowcase);
      }
      if (GemsShowcase) {
        setGemstoneData(GemsShowcase);
      }
      if (PreciousShowcase) {
        setPreciousmetalData(PreciousShowcase);
      }
      if (RingSizeGuide) {
        setRingSizeGuide(RingSizeGuide);
      }
      if (ChainSizeGuide) {
        setChainSizeGuide(ChainSizeGuide);
      }
      if (BangleSizeGuide) {
        setBangleSizeGuide(BangleSizeGuide);
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
  }, [jobCategories]);

  return (
    <BlogContext.Provider
      value={{
        blogData,
        aboutusData,
        termsData,
        careersData,
        diamondData,
        gemstoneData,
        preciousmetalData,
        ringSizeGuide,
        chainSizeGuide,
        bangleSizeGuide,
        jobCategories,
        loading,
        selectedUrl,
        setSelectedUrl,
        fetchBlogData,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
