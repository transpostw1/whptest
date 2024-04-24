"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import Product from "@/components/Product/Product";
import productData from "@/data/Product.json";
import useMenuMobile from "@/store/useMenuMobile";
import { useModalSearchContext } from "@/context/ModalSearchContext";
import { CategoryType } from "@/type/CategoryType";
import { useCategory } from "@/context/CategoryContex";
import axios from "@/utils/axios";
import { baseUrl } from "@/utils/constants";
import TopNavOne from "../TopNav/TopNavOne";

interface Props {
  props: string;
}

const NavHoverMenu: React.FC<Props> = ({ props }) => {
  const [data, setData] = useState<CategoryType[] | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const {setCustomcategory}=useCategory()

  const [fixedHeader, setFixedHeader] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFixedHeader(
        (scrollPosition > 0 && scrollPosition < lastScrollPosition) ||
          scrollPosition > lastScrollPosition
      );
      setLastScrollPosition(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  async function getData() {
    const res = await fetch(`${baseUrl}/getAllParentCategories`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }

  async function getAllCategories() {
    try {
      const category = await getData();
      if (category) {
        setData(category);
      }
    } catch (error) {
      console.error("Error getting categories:", error);
    }
  }
  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (e: any) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  if (isMobile) {
    return null;
  }
  return (
    <>
      <div
        className={`header-menu-navHoverMenu style-one ${
          fixedHeader ? " fixed" : "relative"
        } w-full md:h-[60px] h-[40px] ${props}`}
      >
        <div className="container mx-auto h-full">
          <div className="header-main flex items-center justify-between h-full">
            <div className="menu-main h-full xl:w-full flex items-center justify-center max-lg:hidden xl:absolute xl:top-1/2 xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
              <ul className="flex items-center justify-between  gap-[25px] h-full  text-rose-950">
                <li className="h-full relative">
                  <Link
                    href=""
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${
                      pathname.includes("/shop/breadcrumb1") ? "active" : ""
                    }`}
                  >
                    All Jewellery
                    <Image
                      className="cursor-pointer"
                      src={"/images/icons/arrow.svg"}
                      alt="Arrow"
                      width={20}
                      height={20}
                    />
                  </Link>
                  <div className="sub-menu absolute py-3 px-5 -left-4 w-max grid grid-cols-5 gap-5 bg-white rounded-b-xl">
                    <ul className="">
                      <p className="font-bold text-black">Explore Categories</p>

                      {data &&
                        data.map((item, index) => (
                          <React.Fragment key={item.id}>
                            <li className="leading-[0px]">
                              <Link
                                href={{
                                  pathname: "/shop/breadcrumb1",
                                  query: { url: item.url },
                                }}
                                className=" text-secondary duration-300"
                                onClick={()=>setCustomcategory(item.name)}
                              >
                                <div className="flex">
                                  <Image
                                    src={item.menuImg}
                                    alt={item.name}
                                    height={25}
                                    width={25}
                                    className="mr-1"
                                  />
                                  <p>{item.name}</p>
                                </div>
                              </Link>
                            </li>
                          </React.Fragment>
                        ))}
                    </ul>
                    <ul>
                      <li className="font-bold text-black">Shop For</li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link href={"/shop/breacrumb1"}>Men</Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link href={"/shop/breacrumb1"}>Women</Link>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p className="font-bold text-black">Shop by type</p>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link href={"/shop/breacrumb1"}>Gold</Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link href={"/shop/breacrumb1"}>Rose Gold</Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link href={"/shop/breacrumb1"}>White Gold</Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link href={"/shop/breacrumb1"}>Diamond</Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link href={"/shop/breacrumb1"}>Gemstones</Link>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p className="font-bold text-black">Shop By Price</p>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link href={"/shop/breacrumb1"}>less than 10k</Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link href={"/shop/breacrumb1"}>10k to 20k</Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link href={"/shop/breacrumb1"}>20k to 30k</Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link href={"/shop/breacrumb1"}>30k and Above</Link>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p className="font-bold text-black">Shop By Karat</p>
                      </li>
                      <li>
                        <Link href={"/shop/breadcrumb1"}>14kt</Link>
                      </li>
                      <li>
                        <Link href={"/shop/breadcrumb1"}>18kt</Link>
                      </li>
                      <li>
                        <Link href={"/shop/breadcrumb1"}>22kt</Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="h-full">
                  <Link
                    href="#!"
                    className="text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li className="h-full">
                  <Link
                    href="#!"
                    className="text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    Earrings
                  </Link>
                </li>

                <li className="h-full">
                  <Link
                    href="#!"
                    className="text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    Pendants
                  </Link>
                </li>
                <li className="h-full">
                  <Link
                    href="#!"
                    className="text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    Bangles
                  </Link>
                </li>
                <li className="h-full">
                  <Link
                    href="#!"
                    className="text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    Necklace
                  </Link>
                </li>
                <li className="h-full relative">
                  <Link
                    href="#!"
                    className="text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    Offers
                  </Link>
                  {/* <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
                  </div> */}
                </li>
                <li className="h-full relative">
                  <Link
                    href="#!"
                    className="text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    Gifts
                  </Link>
                  {/* <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
                  </div> */}
                </li>
                <li className="h-full">
                  <Link
                    href="#!"
                    className="text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    Gold Services
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavHoverMenu;
