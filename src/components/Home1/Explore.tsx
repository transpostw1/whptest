"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { graphqlbaseUrl } from "@/utils/constants";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";


const Explore = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getGridCols = (length: number) => {
    switch (length) {
      case 2:
        return "md:grid-cols-2";
      case 3:
        return "md:grid-cols-3";
      case 4:
        return "md:grid-cols-4";
      default:
        return "md:grid-cols-2";
    }
  };
  const getAspectRatio = (length: number) => {
    if (length === 2) {
      return "aspect-[16/6] md:aspect-[16/10]"; 
    }
    return "aspect-[16/6] md:aspect-[4/5]"; 
  };
  useEffect(() => {
    const fetchSubBanners = async () => {
      try {
        setLoading(true);
        const client = new ApolloClient({
          uri: graphqlbaseUrl,
          cache: new InMemoryCache(),
        });
        const GET_ALLSUBBANNERS = gql`
          query GetAllSubBanners {
            getAllSubBanners {
              id
              parentTitle
              title
              url
              desktopImage
              mobileImage
            }
          }
        `;
        const { data } = await client.query({
          query: GET_ALLSUBBANNERS,
        });

        setData(data.getAllSubBanners);
      } catch (error) {
        console.log("Error in fetching SubBanners", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubBanners();
  }, []);

  if (loading) {
    return (
      <div>
        <Skeleton height={300} />
      </div>
    );
  }
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
    <div
      className={`grid grid-cols-1 gap-4 ${getGridCols(data.length)} md:gap-3`}
    >
      {data && data.map((item: any) => (
        <div
          key={item.id}
          className="group relative w-full overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <Link href={item.url}>
            <div className={`relative ${getAspectRatio(data.length)}`}>
              {/* Mobile image */}
              <Image
                src={item.mobileImage}
                fill
                alt={item.title}
                className="block object-cover transition-transform duration-700 group-hover:scale-110 md:hidden"
                priority
              />
              {/* Desktop image */}
              <Image
                src={item.desktopImage}
                fill
                alt={item.title}
                className="hidden object-contain transition-transform duration-700 group-hover:scale-110 md:block"
                unoptimized
                priority
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  </section>
  );
};
export default Explore;
