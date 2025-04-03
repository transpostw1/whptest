"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import useLoginPopup from "@/store/useLoginPopup";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import useMenuMobile from "@/store/useMenuMobile";
import TopNavOne from "./TopNavOne";
import ContactInfo from "@/components/Other/ContactInfo";
import { useAllCategoryContext } from "@/context/AllCategoryContext";
import ModalSearch from "@/components/Modal/ModalSearch";
import { useCategory } from "@/context/CategoryContex";
import { useWishlist } from "@/context/WishlistContext";
import BookExchangeModal from "@/components/Other/BookExchangeModal";
import { useCurrency } from "@/context/CurrencyContext";
import { useMainMenuContext } from "@/context/MainMenuContext";
import { PiTreasureChestLight } from "react-icons/pi";
import TryAtHomeModal from "@/components/Modal/TryAtHomeModal";

interface Props {
  props: string;
}

const NavTwo: React.FC<Props> = ({ props }) => {
  const [searchKeyword, setSearchKeyword] = useState<any>("");
  const { categories } = useAllCategoryContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openLoginPopup, handleLoginPopup, handleCloseLoginPop } =
    useLoginPopup();
  const { openMenuMobile, handleMenuMobile } = useMenuMobile();
  const { wishlistItems } = useWishlist();
  const { cartItems } = useCart();
  const { userDetails, getUser, logOut, isLoggedIn } = useUser();
  // const isLoggedIn = userState.isLoggedIn;
  const router = useRouter();
  const { currency, handleCurrencyChange } = useCurrency();
  const [contactPopUp, setContactPopUp] = useState<boolean>(false);
  const [fixedHeader, setFixedHeader] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const { category, setCustomcategory } = useCategory();
  const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [appointmentModal, setAppointmentModal] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [isTryAtHomeModalOpen, setIsTryAtHomeModalOpen] = useState(false);
  const pathname = usePathname();
  const { allMenus } = useMainMenuContext();
  const handleOnClose = () => {
    setAppointmentModal(false);
  };
  const openTryAtHomeModal = () => {
    setIsTryAtHomeModalOpen(true);
  };

  const closeTryAtHomeModal = () => {
    setIsTryAtHomeModalOpen(false);
  };

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
      } else {
        // setContactPopUp(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLoginDrop = () => {
    typeof window !== "undefined"
      ? localStorage.setItem("redirectPath", pathname)
      : null;
    handleLoginPopup();
  };

  const handleLogOut = () => {
    logOut();
    router.push("/");
  };

  const handleProfilePage = () => {
    router.push("/profile");
  };

  const handleOpenSubNavMobile = (index: number) => {
    setOpenSubNavMobile(openSubNavMobile === index ? null : index);
  };

  const handleCurrency = (event: any) => {
    const value = event.target.value;
    handleCurrencyChange(value);
  };

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

  const cartLength: number = cartItems ? cartItems.length : 0;
  const [activeIndex, setActiveIndex] = useState(null);
  const [childIndex, setChildIndex] = useState(null);

  const toggleAccordion = (index: any, e: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (activeIndex === index) {
      setActiveIndex(null);
      setChildIndex(null); // Reset child index when closing the parent
    } else {
      setActiveIndex(index);
    }
  };

  const toggleChildAccordion = (index: any, e: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setChildIndex(childIndex === index ? null : index);
  };

  const handleContactPopup = () => {
    setContactPopUp(!contactPopUp);
  };

  return (
    <div ref={contactRef}>
      <TryAtHomeModal
        isOpen={isTryAtHomeModalOpen}
        onClose={closeTryAtHomeModal}
      />
      <div
        className={`top-nav header-menu z-[36] h-[65px] w-full max-sm:h-[48px] md:h-[65px] ${
          fixedHeader ? "fixed" : "relative"
        } text-rose-950 ${props}`}
        ref={divRef}
      >
        <div className="mx-auto h-full px-7 py-2">
          <div className="top-nav-main flex items-center justify-between">
            <div className="left-content flex items-center">
              <Link href={"/"}>
                <Image
                  src={"/images/other/main_logo.png"}
                  width={35}
                  height={32}
                  alt="80x80"
                  className="mr-2 object-cover"
                />
              </Link>
              <div className="max-sm:hidden md:hidden lg:block">
                <Link href={"/"}>
                  <Image
                    src={"/images/other/whp_name_logo.png"}
                    width={156}
                    height={50}
                    alt="80x80"
                    className="object-cover"
                  />
                </Link>
              </div>
            </div>
            <div className="flex justify-between sm:block md:hidden lg:hidden">
              <Link href={"/blog"}>
                <div>
                  <Image
                    src={"/images/icons/blog.svg"}
                    alt={"contactIcon"}
                    width={25}
                    height={25}
                  />
                </div>
              </Link>
              <div
                className="ml-4 text-black"
                onClick={() => setIsModalOpen(true)}
              >
                <Icon.MagnifyingGlass size={25} />
              </div>
              <div className="ml-4" onClick={handleContactPopup}>
                <Image
                  src={"/images/icons/contact.svg"}
                  alt={"contactIcon"}
                  width={25}
                  height={25}
                />
              </div>
              {contactPopUp ? <ContactInfo /> : null}
              {/* <div className="ml-4 text-black">
                <Icon.MapPin size={25} />
              </div> */}
              <Link href={"/wishlist"}>
                <div className="ml-4 text-black">
                  <Icon.Heart size={25} />
                  {wishlistItems.length > 0 && (
                    <span className="quantity cart-quantity absolute right-14 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#E26178] text-xs text-white">
                      {wishlistItems.length}
                    </span>
                  )}
                </div>
              </Link>

              <div className="ml-4" onClick={handleMenuMobile}>
                <Image
                  src={"/images/icons/hamBurgerIcon.png"}
                  alt={"hamBurgerIcon"}
                  width={25}
                  height={25}
                  unoptimized
                />
              </div>
            </div>
            <div
              className="search-container max-lg:hidden"
              contentEditable="true"
              suppressContentEditableWarning={true}
              role="textbox"
              aria-label="Search"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="search-text">Search</span>
              <div className="marquee-vertical mb-1.5">
                {categories.map((category: any, index: any) => (
                  <div key={index} className="marquee-content-vertical">
                    {category.name}
                  </div>
                ))}
              </div>
              <div className="search-icon">
                <Icon.MagnifyingGlass
                  size={20}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                />
              </div>
            </div>

            {/* <div className="form-search relative w-72 max-lg:hidden">
              <Icon.MagnifyingGlass
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              />
              <input
                type="text"
                // placeholder="Search"
                readOnly={true}
                className="border-line caption2 h-10 w-full border bg-[#f7f7f7] pl-4 pr-4 focus:outline-none"
                value={searchKeyword}
                onClick={() => setIsModalOpen(true)}
              />
                <div className="marquee-vertical items-center absolute left-2 right-0 bottom-3 w-full">
                  Search
                <div className="marquee-content-vertical ">
                  {categories.map((category: any, index: any) => (
                    <div key={index} className="mx-4 text-sm font-medium text-center">
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>
            // </div> */}
            {isModalOpen && (
              <ModalSearch
                closeModal={() => setIsModalOpen(false)}
                isModalOpen={isModalOpen}
              />
            )}

            <div
              className="right-content flex items-center ps-3 max-md:hidden"
              ref={contactRef}
            >
              <div className="right relative z-[1] flex gap-7">
                <div className="list-action flex items-center gap-5">
                  <div className="user-icon flex cursor-pointer items-center justify-between gap-5">
                    <div
                      className={`flex flex-col items-center ${
                        pathname.includes("/offer") ? "text-[#e26178]" : ""
                      }`}
                    >
                      <Link href={"/offers"}>
                        <Icon.SealPercent size={30} />
                      </Link>
                      <p className="text-sm">Offers</p>
                    </div>
                    <div
                      className="hidden max-lg:block"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <div className="flex flex-col items-center">
                        <Icon.MagnifyingGlass size={28} />
                        <p className="text-sm">Search</p>
                      </div>
                    </div>
                    <Link href={"/blog"}>
                      <div
                        className={`flex flex-col items-center ${
                          pathname.includes("/blog") ? "text-[#e26178]" : ""
                        }`}
                      >
                        <Icon.Newspaper size={30} />
                        <p className="text-sm">Blog</p>
                      </div>
                    </Link>
                    <div
                      className={`flex flex-col items-center ${
                        contactPopUp ? "text-[#e26178]" : ""
                      }`}
                      onClick={handleContactPopup}
                    >
                      <Icon.Headset size={30} />
                      <p className="text-sm">Contact</p>
                    </div>
                    {contactPopUp ? <ContactInfo /> : null}
                    <span className="h-[40px] w-[2px] bg-[#E9E9E9]"></span>
                    <div className="user-icon flex cursor-pointer items-center justify-center">
                      {isLoggedIn ? (
                        <>
                          <div
                            onClick={handleProfilePage}
                            className={`flex flex-col items-center ${
                              pathname.includes("/profile")
                                ? "text-[#e26178]"
                                : ""
                            }`}
                          >
                            <Icon.User size={28} />
                            <p className="text-sm">{userDetails?.firstname}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Link href={"/register"}>
                            <div
                              onClick={handleLoginDrop}
                              className="flex flex-col items-center"
                            >
                              <Icon.User size={28} />
                              <p className="text-sm">Login</p>
                            </div>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="wishlist-icon flex cursor-pointer items-center max-md:hidden">
                    <Link href={"/wishlist"}>
                      <div className="cart-icon relative flex cursor-pointer items-center max-md:hidden">
                        <div
                          className={`flex flex-col items-center ${
                            pathname.includes("/wishlist")
                              ? "text-[#e26178]"
                              : ""
                          }`}
                        >
                          <Icon.Heart size={28} />
                          <p className="text-sm">Wishlists</p>
                        </div>
                        {wishlistItems.length > 0 && (
                          <span className="quantity cart-quantity absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#E26178] text-xs text-white">
                            {wishlistItems.length}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                  <Link href={"/checkout"}>
                    <div className="cart-icon relative flex cursor-pointer items-center max-md:hidden">
                      <div
                        className={`flex flex-col items-center ${
                          pathname.includes("/checkout") ? "text-[#e26178]" : ""
                        }`}
                      >
                        <PiTreasureChestLight size={28} />
                        <p className="text-sm">Box</p>
                      </div>
                      {cartLength > 0 && (
                        <span className="quantity cart-quantity absolute right-0 top-1 flex h-4 w-4 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-[#E26178] text-xs text-white">
                          {cartLength}
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="h-[40px] w-[2px] bg-[#E9E9E9]"></div>
                  <div className="choose-currency flex items-center bg-[#E9E9E9] bg-opacity-[0.1]">
                    <select
                      name="currency"
                      id="chooseCcurrency"
                      value={currency}
                      className="caption2 cursor-pointer bg-[#E9E9E9] bg-opacity-[0.1] pe-2 text-[16px] font-[500]"
                      onChange={handleCurrency}
                    >
                      <option value="INR">&#8377; INR</option>
                      <option value="USD">&#36; USD</option>
                      <option value="EUR">&#8364; EUR</option>
                      {/* <option value="GBP">&#163; GBP</option> */}
                    </select>
                    <Image
                      className="cursor-pointer"
                      src={"/images/icons/arrow.svg"}
                      alt="Arrow"
                      width={30}
                      height={30}
                    />
                  </div>

                  <div className="h-[40px] w-[2px] bg-[#E9E9E9] max-sm:hidden md:block lg:hidden"></div>
                  <div
                    className="max-sm:hidden md:block lg:hidden"
                    onClick={handleMenuMobile}
                  >
                    <Image
                      src={"/images/icons/hamBurgerIcon.png"}
                      alt={"hamBurgerIcon"}
                      width={25}
                      height={25}
                      unoptimized
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
        <div className="menu-container bg-white">
          <div className="container h-full">
            <div className="menu-main h-full overflow-hidden">
              <div className="heading relative mt-2 flex items-center justify-end py-2">
                <div
                  className="close-menu-mobile-btn bg-surface absolute left-0 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full"
                  onClick={handleMenuMobile}
                >
                  <Icon.X size={40} />
                </div>
              </div>
              <div className="form-search relative mt-2 flex">
                <div className="mr-3 flex w-[190px] justify-center bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] p-3 text-white">
                  {isLoggedIn ? (
                    <div onClick={handleLogOut}>
                      <p className="text-md font-normal">Logout</p>
                    </div>
                  ) : (
                    <div
                      onClick={handleMenuMobile}
                      className="flex items-end justify-end text-end"
                    >
                      <Link href={"/register"}>
                        <p className="text-md font-normal">Login</p>
                      </Link>
                      <div onClick={handleMenuMobile}></div>
                    </div>
                  )}
                </div>
                <div
                  className="flex w-[190px] items-center justify-center bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] text-white"
                  onClick={openTryAtHomeModal}
                >
                  <div className="text-md flex">
                    <Icon.HouseLine className="mt-1" weight="fill" />
                    <button className="">Try @ Home</button>
                  </div>
                </div>
                {appointmentModal && (
                  <BookExchangeModal
                    title={"Exchange Your Gold"}
                    closeModal={handleOnClose}
                  />
                )}
              </div>
              <div className="list-nav mt-6 box-border h-[500px] overflow-y-auto p-0">
                {/* <ul>
                  {allMenus.map((item: any, index: number) => (
                    <li key={index} className="">
                      <div className="flex justify-between w-full">
                        {item.subCategory.length > 0 ? (
                          <div className="flex-grow cursor-pointer">
                            <div className="mt-3 flex items-center text-xl font-semibold">
                              {item.name}
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={item.url}
                            onClick={() => handleMenuMobile()}
                            className="flex-grow"
                          >
                            <div className="mt-3 flex items-center text-xl font-semibold">
                              {item.name}
                            </div>
                          </Link>
                        )}

                        {item.subCategory.length > 0 && (
                          <div
                            className="mt-3 cursor-pointer min-w-[40px] flex justify-center items-center"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleAccordion(index, e);
                            }}
                          >
                            {activeIndex === index ? (
                              <Icon.CaretUp scale={23} />
                            ) : (
                              <Icon.CaretDown scale={23} />
                            )}
                          </div>
                        )}
                      </div>

                      {activeIndex === index && (
                        <div className="pl-4 mt-2">
                          {item.subCategory.map(
                            (childItem: any, childIdx: number) => (
                              <React.Fragment key={childIdx}>
                                <div className="flex justify-between w-full border-t border-gray-100 pt-2 mt-2">
                                  {childItem.subCategory.length > 0 ? (
                                    <div className="flex-grow cursor-pointer">
                                      <div className="mt-2 flex items-center font-semibold">
                                        {childItem.name}
                                      </div>
                                    </div>
                                  ) : (
                                    <Link 
                                      href={childItem.url}
                                      className="flex-grow"
                                      onClick={() => handleMenuMobile()}
                                    >
                                      <div className="mt-2 flex items-center font-semibold">
                                        {childItem.name}
                                      </div>
                                    </Link>
                                  )}
                                  
                                  {childItem.subCategory.length > 0 && (
                                    <div
                                      className="mt-2 cursor-pointer min-w-[40px] flex justify-center items-center"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        toggleChildAccordion(childIdx, e);
                                      }}
                                    >
                                      {childIndex === childIdx ? (
                                        <Icon.CaretUp scale={23} />
                                      ) : (
                                        <Icon.CaretDown scale={23} />
                                      )}
                                    </div>
                                  )}
                                </div>
                                
                                {childIndex === childIdx && (
                                  <div className="pl-4 mt-1">
                                    {childItem.subCategory.map(
                                      (subItem: any, subIdx: number) => (
                                        <div key={subIdx} className="py-1 border-t border-gray-100 mt-1">
                                          <Link
                                            href={subItem.url}
                                            className="text-secondary duration-300 flex items-center"
                                            onClick={() => {
                                              setCustomcategory(subItem.label);
                                              handleMenuMobile();
                                            }}
                                          >
                                            {subItem.image && (
                                              <div className="mr-2">
                                                <Image
                                                  src={subItem.image}
                                                  alt={subItem.label}
                                                  width={25}
                                                  height={25}
                                                />
                                              </div>
                                            )}
                                            <div>{subItem.name}</div>
                                          </Link>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                )}
                              </React.Fragment>
                            ),
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul> */}
                <ul>
                  {allMenus.map((item: any, index: any) => (
                    <li key={index} className="py-1">
                      <div className="flex justify-between">
                        <Link href={item.url} onClick={()=> handleMenuMobile()}>
                          <p className="font-semibold">{item.name}</p>
                        </Link>
                        {item.subCategory.length > 0 && (
                          <div onClick={(e) => toggleAccordion(index, e)}>
                            <Icon.CaretDown />
                          </div>
                        )}
                      </div>
                      <div>
                        {activeIndex === index &&
                          item.subCategory.map((child: any, childIdx: any) => (
                            <React.Fragment key={childIdx}>
                              <div className="flex justify-between">
                                <Link href={child.url} onClick={()=> handleMenuMobile()}>
                                  <p className="font-medium">{child.name}</p>
                                </Link>
                                {child.subCategory.length > 0 && (
                                  <div
                                    onClick={(e) =>
                                      toggleChildAccordion(childIdx, e)
                                    }
                                  >
                                    <Icon.CaretDown />
                                  </div>
                                )}
                              </div>
                              {childIndex === childIdx &&
                                child.subCategory.map(
                                  (subChild: any, subChildIdx: any) => (
                                    <div key={subChildIdx} className="flex" onClick={()=> handleMenuMobile()}>
                                      <Link href={subChild.url} className="flex" >
                                        <Image
                                          src={subChild.image}
                                          alt={subChild.name}
                                          height={25}
                                          width={25}
                                          className="mr-1"
                                        />
                                        <p>{subChild.name}</p>
                                      </Link>
                                    </div>
                                  ),
                                )}
                            </React.Fragment>
                          ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavTwo;
