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
import axios from "@/utils/axios";

interface Props {
  props: string;
}

const NavHoverMenu: React.FC<Props> = ({ props }) => {
  const [data, setData] = useState<CategoryType[] | null>(null);

  const pathname = usePathname();

  const { openMenuMobile, handleMenuMobile } = useMenuMobile();
  const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null);
  const { openModalSearch } = useModalSearchContext();

  const handleOpenSubNavMobile = (index: number) => {
    setOpenSubNavMobile(openSubNavMobile === index ? null : index);
  };

  const [fixedHeader, setFixedHeader] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFixedHeader(scrollPosition > 0 && scrollPosition < lastScrollPosition || scrollPosition > lastScrollPosition);
      setLastScrollPosition(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  async function getData() {
    const res = await fetch("http://164.92.120.19/api/getAllParentCategories");
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
    console.log(data, "at at at");
  }, [data]);

  // const handleGenderClick = (gender: string) => {
  //   router.push(`/shop/breadcrumb1?gender=${gender}`);
  // };

  // const handleCategoryClick = (category: string) => {
  //   router.push(`/shop/breadcrumb1?category=${category}`);
  // };

  // const handleTypeClick = (type: string) => {
  //   router.push(`/shop/breadcrumb1?type=${type}`);
  // };

  return (
    <>
      <div
        className={`header-menu-navHoverMenu style-one ${
          fixedHeader ? " fixed" : "relative"
        } w-full md:h-[60px] h-[40px] ${props}`}
      >
        <div className="container mx-auto h-full">
          <div className="header-main flex items-center justify-between h-full">
            <div
              className="menu-mobile-icon lg:hidden flex items-center"
              onClick={handleMenuMobile}
            >
              <i className="icon-category text-2xl"></i>
            </div>
            <Link href={"/"} className="flex items-center lg:hidden">
              <div className="heading4">WHP</div>
            </Link>

            <div className="menu-main h-full xl:w-full flex items-center justify-center max-lg:hidden xl:absolute xl:top-1/2 xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
              <ul className="flex items-center justify-between gap-12 h-full  text-rose-950">
                <li className="h-full relative">
                  <Link
                    href=""
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${
                      pathname.includes("/shop/breadcrumb1") ? "active" : ""
                    }`}
                  >
                    All Jewellery
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
                      <li>Men</li>
                      <li>Women</li>
                    </ul>

                    <ul>
                      <li>
                        <p className="font-bold text-black">Shop by type</p>
                      </li>
                      <li>
                        <Link
                          href="/homepages/jewelry"
                          className={`text-secondary duration-300 ${
                            pathname === "/homepages/jewelry" ? "active" : ""
                          }`}
                        >
                          Gold
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/homepages/furniture"
                          className={`text-secondary duration-300 ${
                            pathname === "/homepages/furniture" ? "active" : ""
                          }`}
                        >
                          Rose Gold
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/homepages/furniture"
                          className={`text-secondary duration-300 ${
                            pathname === "/homepages/furniture" ? "active" : ""
                          }`}
                        >
                          White Gold
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/homepages/furniture"
                          className={`text-secondary duration-300 ${
                            pathname === "/homepages/furniture" ? "active" : ""
                          }`}
                        >
                          Diamond
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/homepages/furniture"
                          className={`text-secondary duration-300 ${
                            pathname === "/homepages/furniture" ? "active" : ""
                          }`}
                        >
                          Gemstones
                        </Link>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p className="font-bold text-black">Shop By Price</p>
                      </li>
                      <li>
                        <Link
                          href="/homepages/yoga"
                          className={`text-secondary duration-300`}
                        >
                          less than 10k
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/homepages/organic"
                          className="text-secondary duration-300"
                        >
                          10k to 20k
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/homepages/organic"
                          className="text-secondary duration-300"
                        >
                          20k to 30k
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/homepages/organic"
                          className="text-secondary duration-300"
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
                  <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
                    <ul className="w-full">
                      <li>
                        <Link
                          href="/blog/default"
                          className={`text-secondary duration-300 ${
                            pathname === "/blog/default" ? "active" : ""
                          }`}
                        >
                          Blog Default
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog/list"
                          className={`text-secondary duration-300 ${
                            pathname === "/blog/list" ? "active" : ""
                          }`}
                        >
                          Blog List
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog/grid"
                          className={`text-secondary duration-300 ${
                            pathname === "/blog/grid" ? "active" : ""
                          }`}
                        >
                          Blog Grid
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog/detail1"
                          className={`text-secondary duration-300 ${
                            pathname === "/blog/detail1" ? "active" : ""
                          }`}
                        >
                          Blog Detail 1
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog/detail2"
                          className={`text-secondary duration-300 ${
                            pathname === "/blog/detail2" ? "active" : ""
                          }`}
                        >
                          Blog Detail 2
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="h-full relative">
                  <Link
                    href="#!"
                    className="text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    Gifts
                  </Link>
                  <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
                    <ul className="w-full">
                      <li>
                        <Link
                          href="/pages/about"
                          className={`text-secondary duration-300 ${
                            pathname === "/pages/about" ? "active" : ""
                          }`}
                        >
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pages/contact"
                          className={`text-secondary duration-300 ${
                            pathname === "/pages/contact" ? "active" : ""
                          }`}
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pages/store-list"
                          className={`text-secondary duration-300 ${
                            pathname === "/pages/store-list" ? "active" : ""
                          }`}
                        >
                          Store List
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pages/page-not-found"
                          className={`text-secondary duration-300 ${
                            pathname === "/pages/page-not-found" ? "active" : ""
                          }`}
                        >
                          404
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pages/faqs"
                          className={`text-secondary duration-300 ${
                            pathname === "/pages/faqs" ? "active" : ""
                          }`}
                        >
                          FAQs
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pages/coming-soon"
                          className={`text-secondary duration-300 ${
                            pathname === "/pages/coming-soon" ? "active" : ""
                          }`}
                        >
                          Coming Soon
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pages/customer-feedbacks"
                          className={`text-secondary duration-300 ${
                            pathname === "/pages/customer-feedbacks"
                              ? "active"
                              : ""
                          }`}
                        >
                          Customer Feedbacks
                        </Link>
                      </li>
                    </ul>
                  </div>
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

      <div id="menu-mobile" className={`${openMenuMobile ? "open" : ""}`}>
        <div className="menu-container bg-white h-full">
          <div className="container h-full">
            <div className="menu-main h-full overflow-hidden">
              <div className="heading py-2 relative flex items-center justify-center">
                <div
                  className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                  onClick={handleMenuMobile}
                >
                  <Icon.X size={14} />
                </div>
                <Link
                  href={"/"}
                  className="logo text-3xl font-semibold text-center"
                >
                  WHP
                </Link>
              </div>
              <div className="form-search relative mt-2">
                <Icon.MagnifyingGlass
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className=" h-12 rounded-lg border border-line text-sm w-full pl-10 pr-4"
                />
              </div>
              <div className="list-nav mt-6">
                <ul>
                  <li
                    className={`${openSubNavMobile === 1 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(1)}
                  >
                    <a
                      href={"#!"}
                      className={`text-xl font-semibold flex items-center justify-between`}
                    >
                      All Jewellery
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                    <div className="sub-nav-mobile">
                      <div
                        className="back-btn flex items-center gap-3"
                        onClick={() => handleOpenSubNavMobile(1)}
                      >
                        <Icon.CaretLeft />
                        Back
                      </div>
                      <div className="list-nav-item w-full grid grid-cols-2 pt-2 pb-6">
                        <ul>
                          <li>
                            <Link
                              href="/homepages/cosmetic1"
                              className={`nav-item-mobile text-secondary duration-300 ${
                                pathname === "/homepages/cosmetic1"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              Home Cosmetic 1
                            </Link>
                          </li>

                          <li>
                            <Link
                              href="/homepages/yoga"
                              className={`nav-item-mobile text-secondary duration-300 ${
                                pathname === "/homepages/yoga" ? "active" : ""
                              }`}
                            >
                              Home Yoga
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/homepages/organic"
                              className={`nav-item-mobile text-secondary duration-300 ${
                                pathname === "/homepages/organic"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              Home Organic
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${openSubNavMobile === 2 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(2)}
                  >
                    <a
                      href={"#!"}
                      className="text-xl font-semibold flex items-center justify-between mt-5"
                    >
                      New Arrivals
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                  </li>
                  <li
                    className={`${openSubNavMobile === 3 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(3)}
                  >
                    <a
                      href={"#!"}
                      className="text-xl font-semibold flex items-center justify-between mt-5"
                    >
                      Earrings
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                  </li>
                  <li
                    className={`${openSubNavMobile === 4 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(4)}
                  >
                    <a
                      href={"#!"}
                      className="text-xl font-semibold flex items-center justify-between mt-5"
                    >
                      Pendants
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                  </li>
                  <li
                    className={`${openSubNavMobile === 5 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(5)}
                  >
                    <a
                      href={"#!"}
                      className="text-xl font-semibold flex items-center justify-between mt-5"
                    >
                      Blog
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                    <div className="sub-nav-mobile">
                      <div
                        className="back-btn flex items-center gap-3"
                        onClick={() => handleOpenSubNavMobile(5)}
                      >
                        <Icon.CaretLeft />
                        Back
                      </div>
                      <div className="list-nav-item w-full pt-2 pb-6">
                        <ul className="w-full">
                          <li>
                            <Link
                              href="/blog/default"
                              className={`text-secondary duration-300 ${
                                pathname === "/blog/default" ? "active" : ""
                              }`}
                            >
                              Blog Default
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/blog/list"
                              className={`text-secondary duration-300 ${
                                pathname === "/blog/list" ? "active" : ""
                              }`}
                            >
                              Blog List
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/blog/grid"
                              className={`text-secondary duration-300 ${
                                pathname === "/blog/grid" ? "active" : ""
                              }`}
                            >
                              Blog Grid
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/blog/detail1"
                              className={`text-secondary duration-300 ${
                                pathname === "/blog/detail1" ? "active" : ""
                              }`}
                            >
                              Blog Detail 1
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/blog/detail2"
                              className={`text-secondary duration-300 ${
                                pathname === "/blog/detail2" ? "active" : ""
                              }`}
                            >
                              Blog Detail 2
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${openSubNavMobile === 6 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(6)}
                  >
                    <a
                      href={"#!"}
                      className="text-xl font-semibold flex items-center justify-between mt-5"
                    >
                      Pages
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                    <div className="sub-nav-mobile">
                      <div
                        className="back-btn flex items-center gap-3"
                        onClick={() => handleOpenSubNavMobile(6)}
                      >
                        <Icon.CaretLeft />
                        Back
                      </div>
                      <div className="list-nav-item w-full pt-2 pb-6">
                        <ul className="w-full">
                          <li>
                            <Link
                              href="/pages/about"
                              className={`text-secondary duration-300 ${
                                pathname === "/pages/about" ? "active" : ""
                              }`}
                            >
                              About Us
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/contact"
                              className={`text-secondary duration-300 ${
                                pathname === "/pages/contact" ? "active" : ""
                              }`}
                            >
                              Contact Us
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/store-list"
                              className={`text-secondary duration-300 ${
                                pathname === "/pages/store-list" ? "active" : ""
                              }`}
                            >
                              Store List
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/page-not-found"
                              className={`text-secondary duration-300 ${
                                pathname === "/pages/page-not-found"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              404
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/faqs"
                              className={`text-secondary duration-300 ${
                                pathname === "/pages/faqs" ? "active" : ""
                              }`}
                            >
                              FAQs
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/coming-soon"
                              className={`text-secondary duration-300 ${
                                pathname === "/pages/coming-soon"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              Coming Soon
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/customer-feedbacks"
                              className={`text-secondary duration-300 ${
                                pathname === "/pages/customer-feedbacks"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              Customer Feedbacks
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavHoverMenu;
