"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import { useAllCategoryContext } from "@/context/AllCategoryContext";
import { CategoryType } from "@/type/CategoryType";
import { useCategory } from "@/context/CategoryContex";
import axios from "@/utils/axios";
import { baseUrl } from "@/utils/constants";

interface Props {
  props: string;
}

const NavHoverMenu: React.FC<Props> = ({ props }) => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { categories } = useAllCategoryContext();
  const { category, setCustomcategory } = useCategory();
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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1022px)");
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
          <div className="header-main flex items-center justify-evenly w-full h-full">
            <div className="menu-main h-full xl:w-full flex items-center w-full max-lg:hidden xl:absolute xl:top-1/2 xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
              <ul className="flex items-center justify-evenly h-full w-full text-rose-950">
                <li className="h-full relative">
                  <Link
                    href=""
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 `}
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
                    <ul>
                      <p className="font-bold text-black">Explore Categories</p>

                      {categories &&
                        categories.map((item: any, index: any) => (
                          <React.Fragment key={item.id}>
                            <li className="leading-[0px]">
                              <Link
                                href={{
                                  pathname: "/products",
                                  query: { url: item.url },
                                }}
                                className=" text-secondary duration-300"
                                onClick={() => setCustomcategory(item.url)}
                              >
                                <div className="flex">
                                  <Image
                                    src={item.menuImg}
                                    alt={item.name}
                                    height={25}
                                    width={25}
                                    className="mr-1"
                                    style={{ width: "auto", height: "auto" }}
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
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "men" },
                          }}
                          onClick={() => setCustomcategory("men")}
                        >
                          Men
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "women" },
                          }}
                          onClick={() => setCustomcategory("women")}
                        >
                          Women
                        </Link>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p className="font-bold text-black">Shop by type</p>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "gold" },
                          }}
                          onClick={() => setCustomcategory("gold")}
                        >
                          Gold
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "rose Gold" },
                          }}
                          onClick={() => setCustomcategory("rose Gold")}
                        >
                          Rose Gold
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "whiteGold" },
                          }}
                          onClick={() => setCustomcategory("white Gold")}
                        >
                          White Gold
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "diamond" },
                          }}
                          onClick={() => setCustomcategory("diamond")}
                        >
                          Diamond
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "gemstones" },
                          }}
                          onClick={() => setCustomcategory("gemstones")}
                        >
                          Gemstones
                        </Link>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p className="font-bold text-black">Shop By Price</p>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "lessthan10K" },
                          }}
                          onClick={() => setCustomcategory("lessthan10k")}
                        >
                          less than 10k
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "10kto20k" },
                          }}
                          onClick={() => setCustomcategory("10kto20k")}
                        >
                          10k to 20k
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "20kto30k" },
                          }}
                          onClick={() => setCustomcategory("20kto30k")}
                        >
                          20k to 30k
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "30kandAbove" },
                          }}
                          onClick={() => setCustomcategory("30kandabove")}
                        >
                          30k and Above
                        </Link>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p className="font-bold text-black">Shop By Karat</p>
                      </li>
                      <li>
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "14kt" },
                          }}
                          onClick={() => setCustomcategory("14kt")}
                        >
                          14kt
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "18kt" },
                          }}
                          onClick={() => setCustomcategory("18kt")}
                        >
                          18kt
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "22kt" },
                          }}
                          onClick={() => setCustomcategory("22kt")}
                        >
                          22kt
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "23kt" },
                          }}
                          onClick={() => setCustomcategory("23kt")}
                        >
                          23kt
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "24kt" },
                          }}
                          onClick={() => setCustomcategory("24k")}
                        >
                          24kt
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li
                  className="h-full"
                  onClick={() => setCustomcategory("newArrival")}
                >
                  <Link
                    href={{
                      pathname: "/products",
                      query: { url: "newArrival" },
                    }}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                      category === "newArrival" ? "active" : ""
                    }`}
                  >
                    New Arrival
                  </Link>
                </li>
                <li
                  className="h-full"
                  onClick={() => setCustomcategory("earring")}
                >
                  <Link
                    href={{
                      pathname: "/products",
                      query: { url: "earring" },
                    }}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                      category === "earring" ? "active" : ""
                    }`}
                  >
                    Earrings
                  </Link>
                </li>

                <li
                  className="h-full"
                  onClick={() => setCustomcategory("pendant")}
                >
                  <Link
                    href={{
                      pathname: "/products",
                      query: { url: "pendants" },
                    }}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                      category === "pendant" ? "active" : ""
                    }`}
                  >
                    Pendants
                  </Link>
                </li>
                <li
                  className="h-full"
                  onClick={() => setCustomcategory("bangle")}
                >
                  <Link
                    href={{
                      pathname: "/products",
                      query: { url: "bangle" },
                    }}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                      category === "bangle" ? "active" : ""
                    }`}
                  >
                    Bangles
                  </Link>
                </li>
                <li
                  className="h-full"
                  onClick={() => setCustomcategory("Bracelet")}
                >
                  <Link
                    href={{
                      pathname: "/products",
                      query: { url: "Bracelet" },
                    }}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                      category === "bracelet" ? "active" : ""
                    }`}
                  >
                    Bracelet
                  </Link>
                </li>
                <li
                  className="h-full"
                  onClick={() => setCustomcategory("necklace")}
                >
                  <Link
                    href={{
                      pathname: "/products",
                      query: { url: "necklace" },
                    }}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                      category === "necklace" ? "active" : ""
                    }`}
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
                    href="/benefit"
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
