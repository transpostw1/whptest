"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { baseUrl, getSubBanners } from "@/utils/constants";
import axios from "axios";
const Explore = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchSubBanners = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}${getSubBanners}`);
        setData(response.data.subbanners);
      } catch (error) {
        console.log("Error Occured", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubBanners();
  }, []);
  if (loading) {
    return (
      <div className="flex">
        <div>
          <Skeleton height={300}/>
        </div>
        <div>
          <Skeleton height={300}/>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="banner-block style-one grid sm:grid-cols-2">
        {data &&
          data.map((item: any) => (
            <div key={item.id}>
              <Link
                href={"/products"}
                className="banner-item relative block overflow-hidden duration-500"
              >
                <div className="banner-img">
                  <Image
                    src={item.image}
                    width={2000}
                    height={1300}
                    style={{width:"auto",height:"auto"}}
                    alt="banner1"
                    className="duration-1000"
                  />
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default Explore;
