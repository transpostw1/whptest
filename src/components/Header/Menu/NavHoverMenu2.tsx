"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCategory } from "@/context/CategoryContex";
import MobileMainCategorySwiper from "@/components/Home1/MobileMainCategorySwiper";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { graphqlbaseUrl } from "@/utils/constants";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

const NavHoverMenu2 = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { setCustomcategory } = useCategory();
  const [fixedHeader, setFixedHeader] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });
      const GET_ALLCATEGORIES = gql`
        query GetAllMenus {
          getAllMenus {
            id
            name
            label
            url
            image
            parent_id
            subCategory {
              name
              label
              url
              parent_id
              image
              id
              subCategory {
                url
                parent_id
                name
                label
                image
                id
              }
            }
          }
        }
      `;
      const { data } = await client.query({
        query: GET_ALLCATEGORIES,
      });
      setCategories(data.getAllMenus);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFixedHeader(
        (scrollPosition > 0 && scrollPosition < lastScrollPosition) ||
          scrollPosition > lastScrollPosition,
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
          fixedHeader ? "fixed" : "relative"
        } h-[40px] w-full md:h-[37px]`}
      >
        <div className="container mx-auto h-full">
          <MobileMainCategorySwiper />
          <div className="header-main flex h-full w-full items-center justify-evenly">
            <div className="menu-main flex h-full w-full items-center max-lg:hidden xl:absolute xl:left-1/2 xl:top-1/2 xl:w-full xl:-translate-x-1/2 xl:-translate-y-1/2">
              {categories.map((item: any, index: any) => (
                <ul
                  key={index}
                  className="flex h-full w-full items-center justify-evenly text-rose-950"
                >
                  <li className="relative h-full">
                    <Link
                      href={item.url}
                      onClick={(e) => {
                        if (item.name.toLowerCase() === "all jewellery") {
                          e.preventDefault(); // Prevent navigation
                        } else {
                          setCustomcategory(item.label); // Set custom category only when condition is not met
                        }
                      }}
                      className={`text-button-uppercase flex h-full items-center justify-center gap-1 duration-300`}
                    >
                      {item.name}
                    </Link>

                    {item.subCategory.length > 0 && (
                      <div
                        className={`mega-menu absolute left-0 top-[36px] flex w-screen bg-white`}
                      >
                        <div className="grid grid-cols-5 gap-8 p-3">
                          {item.subCategory.map((item: any, index: any) => (
                            <ul key={index}>
                              <p className="font-semibold text-black">
                                {item.name}
                              </p>
                              {item.subCategory.map(
                                (subItem: any, subIndex: any) => (
                                  <li key={subIndex}>
                                    <Link
                                      href={subItem.url}
                                      className="text-secondary duration-300"
                                      onClick={() =>
                                        setCustomcategory(subItem.label)
                                      }
                                    >
                                      <div className="text-secondary flex cursor-pointer duration-300">
                                        {subItem.image && (
                                          <div>
                                            <Image
                                              src={subItem.image}
                                              alt={subItem.name}
                                              height={25}
                                              width={25}
                                              className="mr-1"
                                              style={{
                                                width: "auto",
                                                height: "auto",
                                              }}
                                            />
                                          </div>
                                        )}
                                        <div>{subItem.name}</div>
                                      </div>
                                    </Link>
                                  </li>
                                ),
                              )}
                            </ul>
                          ))}
                        </div>
                        <div className="flex">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={145}
                              height={145}
                              style={{ width: "auto", height: "auto" }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavHoverMenu2;
