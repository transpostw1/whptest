"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCategory } from "@/context/CategoryContex";
import MobileMainCategorySwiper from "@/components/Home1/MobileMainCategorySwiper";
import { useMainMenuContext } from "@/context/MainMenuContext";

const NavHoverMenu2 = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { setCustomcategory } = useCategory();
  const [fixedHeader, setFixedHeader] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const { allMenus } = useMainMenuContext();
  const [hoverMenuVisible, setHoverMenuVisible] = useState<number | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSelectedMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  if (isMobile) {
    return null;
  }

  const handleMenuClick = (index: number, label: string) => {
    setSelectedMenu(index);
    setCustomcategory(label);
    setHoverMenuVisible(null); // Hide the hover menu
  };

  const handleSubCategoryClick = (parentIndex: number, label: string) => {
    setSelectedMenu(parentIndex);
    setCustomcategory(label);
    setHoverMenuVisible(null);
  };

  return (
    <>
      <div
        className={`header-menu-navHoverMenu style-one z-[36px] ${
          fixedHeader ? "fixed" : "relative"
        } h-[40px] w-full md:h-[37px]`}
        ref={menuRef}
      >
        <div className="container mx-auto h-full">
          <MobileMainCategorySwiper />
          <div className="header-main flex h-full w-full items-center justify-evenly">
            <div className="menu-main flex h-full w-full items-center max-lg:hidden xl:absolute xl:left-1/2 xl:top-1/2 xl:w-full xl:-translate-x-1/2 xl:-translate-y-1/2">
              {allMenus.map((item: any, index: any) => (
                <ul
                  key={index}
                  className="flex h-full w-full items-center justify-evenly text-black"
                  onMouseEnter={() => setHoverMenuVisible(index)}
                  onMouseLeave={() => setHoverMenuVisible(null)}
                >
                  <li className="relative h-full">
                    <Link
                      href={item.url}
                      onClick={(e) => {
                        if (item.name.toLowerCase() === "all jewellery") {
                          e.preventDefault();
                        } else {
                          handleMenuClick(index, item.label);
                        }
                      }}
                      className={`flex h-full items-center justify-center gap-1 text-sm uppercase duration-300 
                        ${selectedMenu === index ? "text-[#E26178] " : "hover:text-[#E26178]"} 
                        ${index === 0 ? "ready-to-ship-animation  hover:text-white" : ""} 
                        ${selectedMenu === 0 && index === 0 ? "text-white" : ""}
                      `}
                    >
                      {item.name}
                    </Link>
                    {hoverMenuVisible === index &&
                      item.subCategory.length > 0 && (
                        <div
                          className={`mega-menu absolute left-0 grid w-screen grid-cols-7 gap-1 bg-white p-3 lg:top-[131px] xl:top-[36px]`}
                        >
                          {item.subCategory.map(
                            (subItem: any, subIndex: any) => (
                              <ul key={subIndex}>
                                <Link
                                  href={subItem.url}
                                  className="font-semibold text-black "
                                  onClick={() =>
                                    handleSubCategoryClick(index, subItem.label)
                                  }
                                >
                                  {subItem.name}
                                </Link>
                                {subItem.subCategory.map(
                                  (subSubItem: any, subSubIndex: any) => (
                                    <li key={subSubIndex}>
                                      <Link
                                        href={subSubItem.url}
                                        className="text-secondary duration-300"
                                        onClick={() =>
                                          handleSubCategoryClick(
                                            index,
                                            subSubItem.label,
                                          )
                                        }
                                      >
                                        <div className="text-secondary flex cursor-pointer duration-300 hover:text-[#E26178]">
                                          {subSubItem.image && (
                                            <div>
                                              <Image
                                                src={subSubItem.image}
                                                alt={subSubItem.name}
                                                height={30}
                                                width={30}
                                                className="mr-1"
                                                // style={{
                                                //   width: "auto",
                                                //   height: "auto",
                                                // }}
                                                unoptimized
                                              />
                                            </div>
                                          )}
                                          <div>{subSubItem.name}</div>
                                        </div>
                                      </Link>
                                    </li>
                                  ),
                                )}
                              </ul>
                            ),
                          )}
                          <div className="col-span-2 w-full">
                            {index !== 0 && index !== 1 && item.image && (
                              <Image
                                className="object-contain"
                                src={item.image}
                                alt={item.name}
                                width={360}
                                height={360}
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
