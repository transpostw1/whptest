"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import useLoginPopup from "@/store/useLoginPopup";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import useMenuMobile from "@/store/useMenuMobile";
import { IconsManifest } from "react-icons/lib";
import TopNavOne from "./TopNavOne";
import { baseUrl } from "@/utils/constants";
import ContactInfo from "@/components/Other/ContactInfo";
import { CategoryType } from "@/type/CategoryType";
import ModalSearch from "@/components/Modal/ModalSearch";
import { useWishlist } from "@/context/WishlistContext";

interface Props {
  props: string;
}

const NavTwo: React.FC<Props> = ({ props }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<CategoryType[] | null>(null);
  const { openLoginPopup, handleLoginPopup, handleCloseLoginPop } =
    useLoginPopup();
  const { openMenuMobile, handleMenuMobile } = useMenuMobile();
  const { wishlistItemsCount, wishlistItems } = useWishlist();
  const { openModalCart } = useModalCartContext();
  const { cartItems } = useCart();
  const { userState,userDetails,getUser } = useUser();
  const isLoggedIn = userState.isLoggedIn;
  const router = useRouter();
  const [contactPopUp, setContactPopUp] = useState<boolean>(false);
  const [fixedHeader, setFixedHeader] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        handleCloseLoginPop();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
    
  useEffect(() => {
    if (isLoggedIn && !userDetails) {
      getUser();
    }
  }, [isLoggedIn, userDetails, getUser]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        contactRef.current &&
        !contactRef.current.contains(event.target as Node)
      ) {
        setContactPopUp(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleModalToggle = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const handleInputClick = () => {
    console.log("clicked");
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKeyword(value);
    if (value.trim() !== "") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };
  const handleProfilePage = () => {
    router.push("/profile");
  };

  const handleOpenSubNavMobile = (index: number) => {
    setOpenSubNavMobile(openSubNavMobile === index ? null : index);
  };
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

  const handleSearch = (value: string) => {
    router.push(`/products?query=${value}`);
    setSearchKeyword("");
    setIsModalOpen(false);
  };

  const handleSearchInModal = (value: string) => {
    setSearchKeyword(value);
    setIsModalOpen(true);
  };

  const cartLength: number = cartItems ? cartItems.length : 0;

  const handleContactPopup = () => {
    setContactPopUp(true);
  };
  return (
    <div ref={contactRef}>
      <div
        className={`top-nav header-menu w-full md:h-[65px] h-[65px] ${
          fixedHeader ? " fixed" : "relative"
        } text-rose-950 ${props}`}
        ref={divRef}
      >
        <div className="container mx-auto h-full py-2 ">
          <div className="top-nav-main flex justify-between items-center ">
            <div className="left-content flex items-center ">
              <Link href={"/"}>
                <Image
                  src={"/images/other/Logo.png"}
                  width={60}
                  height={60}
                  alt="80x80"
                  className=" object-cover"
                />
              </Link>
              <div className="md:hidden lg:block max-sm:hidden">
                <Link href={"/"}>
                  <Image
                    src={"/images/whpnameLogo.png"}
                    width={170}
                    height={80}
                    alt="80x80"
                    className=" object-cover"
                  />
                </Link>
              </div>
            </div>
            <div className="flex sm:block lg:hidden md:hidden justify-between">
              <div>
                <Image
                  src={"/images/icons/blog.svg"}
                  alt={"contactIcon"}
                  width={25}
                  height={25}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <div className="ml-4">
                <Image
                  src={"/images/icons/contact.svg"}
                  alt={"contactIcon"}
                  width={25}
                  height={25}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <div className="ml-4 text-black">
                <Icon.MapPin size={25} />
              </div>
              <div className="ml-4 text-black">
                <Icon.Heart size={25} />
              </div>
              <div className="ml-4" onClick={handleMenuMobile}>
                <Image
                  src={"/images/icons/hamBurgerIcon.png"}
                  alt={"hamBurgerIcon"}
                  width={25}
                  height={25}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </div>
            <div className="form-search w-72 relative max-lg:hidden">
              <Icon.MagnifyingGlass
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  handleSearch(searchKeyword);
                }}
              />

              <input
                type="text"
                placeholder="What are you looking for?"
                className="h-10 rounded-lg border border-line caption2 w-full pl-4 pr-4 bg-[#f7f7f7] focus:outline-none"
                value={searchKeyword}
                onChange={handleInputChange}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSearch(searchKeyword)
                }
              />
            </div>
            {isModalOpen && (
              <ModalSearch
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                handleSearch={handleSearch}
                closeModal={() => setIsModalOpen(false)}
                isModalOpen={isModalOpen}
                handleModalToggle={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            )}

            <div className="ps-3 right-content flex items-center  max-md:hidden ">
              <div className="right flex gap-12 relative z-[1] ">
                <div className="list-action flex items-center gap-8 ">
                  <div className="user-icon flex  items-center justify-between cursor-pointer gap-8">
                    <div className="flex flex-col items-center">
                      <Link href={"/offers"}>
                        <Image
                          src={"/images/icons/offer.svg"}
                          alt="Offer"
                          width={30}
                          height={30}
                        />
                      </Link>
                      <h4 className="text-sm">Offers</h4>
                    </div>
                    <div className="flex flex-col items-center">
                      <Icon.MapPin size={28} />
                      <h4 className="text-sm">Stores</h4>
                    </div>
                    <div className="flex flex-col items-center">
                      <Image
                        src={"/images/icons/blog.svg"}
                        alt="Blog"
                        width={30}
                        height={30}
                      />
                      <h4 className="text-sm">Blog</h4>
                    </div>
                    <div
                      className="flex flex-col items-center"
                      onClick={handleContactPopup}
                    >
                      <Image
                        src={"/images/icons/contact.svg"}
                        alt="Contact"
                        width={30}
                        height={30}
                      />
                      <h4 className="text-sm">Contact</h4>
                    </div>
                    {contactPopUp ? <ContactInfo /> : null}
                    <span className="w-[2px] h-[40px] bg-[#E9E9E9]"></span>
                    <div className="user-icon flex items-center justify-center cursor-pointer">
                      {isLoggedIn ? (
                        <>
                          <div
                            onClick={handleProfilePage}
                            className="flex flex-col items-center"
                          >
                            <Icon.User size={28} color="black" />
                            <h4 className="text-sm">
                             {userDetails?.customer?.firstname}
                            </h4>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            onClick={handleLoginPopup}
                            className="flex flex-col items-center"
                          >
                            <Icon.User size={28} color="black" />
                            <h4 className="text-sm">Login</h4>
                          </div>
                          <div
                            className={` login-popup absolute bg-white top-[114px] w-[320px] p-7 rounded-xl bg-surface box-shadow-small z-10
                                            ${openLoginPopup ? "open" : ""}`}
                          >
                            <Link
                              href={"/login"}
                              className="button-main w-full text-center"
                            >
                              Login With OTP
                            </Link>
                            <div className="text-secondary text-center mt-3 pb-4">
                              Don’t have an account?
                              <Link
                                href={"/register"}
                                className="text-black pl-1 hover:underline"
                              >
                                Signup
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className="max-md:hidden wishlist-icon flex items-center cursor-pointer"
                    // onClick={openModalWishlist}
                  >
                    <Link href={"/wishlist"}>
                      {/* <div>
                        <div className="flex flex-col items-center">
                          <Icon.Heart size={28} color="black" />
                          <h4 className="text-sm">Wishlist</h4>
                        </div>
                        
                      </div> */}
                      <div
                        className="max-md:hidden cart-icon flex items-center relative cursor-pointer"
                        // onClick={openModalWishlist}
                      >
                        <div className="flex flex-col items-center">
                          <Icon.Heart size={28} color="black" />
                          <h4 className="text-sm">Wishlist</h4>
                        </div>
                        {wishlistItems.length > 0 && (
                          <span className="quantity cart-quantity absolute right-1 -top-1.5 text-xs text-white bg-[#E26178] w-4 h-4 flex items-center justify-center rounded-full">
                            {wishlistItems.length}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                  <Link href={"/checkout"}>
                    <div
                      className="max-md:hidden cart-icon flex items-center relative cursor-pointer"
                      // onClick={openModalCart}
                    >
                      <div className="flex flex-col items-center">
                        <Image
                          src={"/images/icons/cart.svg"}
                          alt="Cart"
                          width={30}
                          height={30}
                        />
                        <h4 className="text-sm">Cart</h4>
                      </div>
                      {cartLength > 0 && (
                        <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-[#E26178] w-4 h-4 flex items-center justify-center rounded-full">
                          {cartLength}
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="w-[2px] h-[40px]  bg-[#E9E9E9]"></div>
                  <div className="choose-currency flex items-center p-2 bg-[#e1dcdd] bg-opacity-[0.1] ">
                    <select
                      name="currency"
                      id="chooseCurrency"
                      className="caption2 bg-[#e1dcdd] bg-opacity-[0.1]  text-[16px] font-[500] pe-2 p-2 cursor-pointer"
                    >
                      <option value="INR">&#8377; INR</option>
                      {/* <option value="USD">&#36; USD</option>
                      <option value="EUR">&#8364; EUR</option>
                      <option value="GBP">&#163; GBP</option> */}
                    </select>
                    <Image
                      className="cursor-pointer"
                      src={"/images/icons/arrow.svg"}
                      alt="Arrow"
                      width={30}
                      height={30}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="menu-mobile" className={`${openMenuMobile ? "open" : ""}`}>
        <TopNavOne textColor="text-white" />
        <div className="menu-container bg-white h-full">
          <div className="container h-full">
            <div className="menu-main h-full overflow-hidden">
              <div className="heading py-2 relative flex items-center justify-end">
                <div
                  className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                  onClick={handleMenuMobile}
                >
                  <Icon.X size={40} />
                </div>
                <div className="">
                  <p className="text-xl font-semibold">Login</p>
                </div>
                <div className="ml-3 relative">
                  <Icon.Heart size={25} />
                  <span className="quantity cart-quantity absolute -right-0.5 -top-1.5 text-xs text-white bg-[#E26178] w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlistItems.length}
                  </span>
                </div>
                <Link href={"/checkout"}>
                  <div className="ml-3 relative">
                    <Image
                      src={"/images/icons/cart.svg"}
                      alt="Cart"
                      width={30}
                      height={30}
                    />
                    <span className="quantity cart-quantity absolute -right-0 -top-1.5 text-xs text-white bg-[#E26178] w-4 h-4 flex items-center justify-center rounded-full">
                      {cartLength}
                    </span>
                  </div>
                </Link>
              </div>
              <div className=" flex form-search relative mt-2">
                <div className="mr-3">
                  <Image
                    src="/dummy/tryAtHomeButton.png"
                    alt="try_at_home"
                    width={160}
                    height={60}
                  />
                </div>
                <div className="flex bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-white items-center justify-center w-[190px]">
                  <div className="mr-3">
                    <Image
                      src="/images/icons/exchangeGold.png"
                      alt="Exchange_Gold"
                      width={15}
                      height={15}
                    />
                  </div>
                  <div>
                    <p className="text-md">Exchange Gold</p>
                  </div>
                </div>
              </div>
              <div className="list-nav mt-6">
                <ul>
                  <li
                    className={`${openSubNavMobile === 1 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(1)}
                  >
                    <Link href="/products">
                      <p className="text-xl font-semibold flex items-center justify-between mt-5">
                        New Arrivals
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 2 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(2)}
                  >
                    <Link href="/products">
                      <p className="text-xl font-semibold flex items-center justify-between mt-5">
                        14 Karat
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 3 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(3)}
                  >
                    <Link href="/products">
                      <p className="text-xl font-semibold flex items-center justify-between mt-5">
                        Rings
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 4 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(4)}
                  >
                    <Link href="/products">
                      <p className="text-xl font-semibold flex items-center justify-between mt-5">
                        Earrings
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 5 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(5)}
                  >
                    <Link href="/products">
                      <p className="text-xl font-semibold flex items-center justify-between mt-5">
                        Pendants
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 6 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(6)}
                  >
                    <Link href="/products">
                      <p className="text-xl font-semibold flex items-center justify-between mt-5">
                        Chains
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 7 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(7)}
                  >
                    <p className="text-xl font-semibold flex items-center mt-5">
                      All Jewellery
                      <span className="text-right">
                        <Icon.CaretRight size={20} weight="fill" />
                      </span>
                    </p>
                    <div className="sub-nav-mobile h-full">
                      <div
                        className="back-btn flex items-center gap-3"
                        onClick={() => handleOpenSubNavMobile(1)}
                      >
                        <Icon.CaretLeft />
                        Back
                      </div>
                      <div className="list-nav-item w-full h-full grid grid-cols-2 pt-2 pb-6">
                        <ul>
                          {data &&
                            data.map((item, index) => (
                              <React.Fragment key={item.id}>
                                <li className="leading-[0px]">
                                  <Link
                                    href={{
                                      pathname: "/products",
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
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${openSubNavMobile === 8 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(8)}
                  >
                    <Link href="/products">
                      <p className="text-xl font-semibold flex items-center justify-between mt-5">
                        Men's Jewellery
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 8 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(8)}
                  >
                    <p
                      className={`text-xl font-semibold flex items-center mt-5`}
                    >
                      Gifts
                      <span className="text-right">
                        <Icon.CaretRight size={20} weight="fill" />
                      </span>
                    </p>
                  </li>
                  <li
                    className={`${openSubNavMobile === 9 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(9)}
                  >
                    <p
                      className={`text-xl font-semibold flex items-center  mt-5`}
                    >
                      Gold Services
                      <Icon.CaretRight size={20} weight="fill" />
                    </p>
                  </li>
                </ul>
              </div>
              <div className="flex mt-2 bg-[#fdf4f6] p-2">
                <div>
                  <p className="text-lg font-semibold">Download the WHP App</p>
                  <Image
                    src={"/dummy/appStoreButton.png"}
                    alt={"downloadAppButton"}
                    width={113}
                    height={34}
                  />
                  <Image
                    src={"/dummy/playStoreButton.png"}
                    alt={"downloadAppButton"}
                    width={113}
                    height={34}
                  />
                </div>
                <div>
                  <Image
                    src={"/dummy/dummyPhoneApp.png"}
                    alt={"PhoneAppBanner"}
                    width={140}
                    height={164}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavTwo;
