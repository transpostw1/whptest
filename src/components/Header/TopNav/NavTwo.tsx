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
  const pathname = usePathname();
  const { allMenus } = useMainMenuContext();
  const handleOnClose = () => {
    setAppointmentModal(false);
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
  const toggleAccordion = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const toggleChildAccordion = (index: any) => {
    setChildIndex(childIndex === index ? null : index);
  };
  const handleContactPopup = () => {
    setContactPopUp(!contactPopUp);
  };
  return (
    <div ref={contactRef}>
      <div
        className={`top-nav header-menu h-[65px] w-full max-sm:h-[48px] md:h-[65px] ${
          fixedHeader ? "fixed" : "relative"
        } text-rose-950 ${props}`}
        ref={divRef}
      >
        <div className="container mx-auto h-full py-2">
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
            <div className="form-search relative w-72 max-lg:hidden">
              <Icon.MagnifyingGlass
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              />
              <input
                type="text"
                placeholder="Search"
                readOnly={true}
                className="border-line caption2 h-10 w-full rounded-lg border bg-[#f7f7f7] pl-4 pr-4 focus:outline-none"
                value={searchKeyword}
                onClick={() => setIsModalOpen(true)}
              />
            </div>
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
                <div className="list-action flex items-center gap-8">
                  <div className="user-icon flex cursor-pointer items-center justify-between gap-8">
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
                        <Icon.ShoppingCart size={30} />
                        <p className="text-sm">Cart</p>
                      </div>
                      {cartLength > 0 && (
                        <span className="quantity cart-quantity absolute right-0 top-1 flex h-4 w-4 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-[#E26178] text-xs text-white">
                          {cartLength}
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="h-[40px] w-[2px] bg-[#E9E9E9]"></div>
                  <div className="choose-currency flex items-center bg-[#E9E9E9] bg-opacity-[0.1] p-2">
                    <select
                      name="currency"
                      id="chooseCcurrency"
                      value={currency}
                      className="caption2 cursor-pointer bg-[#E9E9E9] bg-opacity-[0.1] p-2 pe-2 text-[16px] font-[500]"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="menu-mobile" className={`${openMenuMobile ? "open" : ""}`}>
        <TopNavOne textColor="text-white" />
        <div className="menu-container h-full overflow-y-auto bg-white">
          <div className="container h-full">
            <div className="menu-main h-full overflow-hidden">
              <div className="heading relative flex items-center justify-end py-2">
                <div
                  className="close-menu-mobile-btn bg-surface absolute left-0 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full"
                  onClick={handleMenuMobile}
                >
                  <Icon.X size={40} />
                </div>
                {isLoggedIn ? (
                  <div onClick={handleLogOut}>
                    <p className="text-lg font-semibold">Logout</p>
                  </div>
                ) : (
                  <div onClick={handleMenuMobile} className="flex items-center">
                    <Link href={"/register"}>
                      <p className="text-lg font-semibold">Login</p>
                    </Link>
                    <div
                      onClick={handleMenuMobile}
                      className="mx-4"
                    ></div>
                  </div>
                )}
              </div>
              <div className="form-search relative mt-2 flex">
                <div className="mr-3">
                  <Image
                    src="/dummy/tryAtHomeButton.png"
                    alt="try_at_home"
                    width={160}
                    height={60}
                  />
                </div>
                <div
                  className="flex w-[190px] items-center justify-center bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] text-white"
                  onClick={() => setAppointmentModal(true)}
                >
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
                {appointmentModal && (
                  <BookExchangeModal
                    title={"Exchange Your Gold"}
                    closeModal={handleOnClose}
                  />
                )}
              </div>
              <div className="list-nav mt-6">
                {/* <ul>
                  <li
                    className={`${openSubNavMobile === 1 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(1);
                      setCustomcategory("new_Arrival");
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/products",
                        query: { url: "c-new_Arrival" },
                      }}
                      onClick={handleMenuMobile}
                    >
                      <p className="mt-5 flex items-center justify-between text-xl font-semibold">
                        New Arrivals
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 2 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(2);
                      setCustomcategory("14kt");
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/products",
                        query: { url: "k-14kt" },
                      }}
                      onClick={handleMenuMobile}
                    >
                      <p className="mt-5 flex items-center justify-between text-xl font-semibold">
                        14 Karat
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 3 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(3);
                      setCustomcategory("ring");
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/products",
                        query: { url: "c-ring" },
                      }}
                      onClick={handleMenuMobile}
                    >
                      <p className="mt-5 flex items-center justify-between text-xl font-semibold">
                        Rings
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 4 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(4);
                      setCustomcategory("earring");
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/products",
                        query: { url: "c-earring" },
                      }}
                      onClick={handleMenuMobile}
                    >
                      <p className="mt-5 flex items-center justify-between text-xl font-semibold">
                        Earrings
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 5 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(5);
                      setCustomcategory("pendant");
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/products",
                        query: { url: "c-pendant" },
                      }}
                      onClick={handleMenuMobile}
                    >
                      <p className="mt-5 flex items-center justify-between text-xl font-semibold">
                        Pendants
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 6 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(6);
                      setCustomcategory("chain");
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/products",
                        query: { url: "c-chain" },
                      }}
                      onClick={handleMenuMobile}
                    >
                      <p className="mt-5 flex items-center justify-between text-xl font-semibold">
                        Chains
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 7 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(7)}
                  >
                    <p className="mt-5 flex items-center text-xl font-semibold">
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
                      <div className="list-nav-item grid h-full w-full grid-cols-2 pb-6 pt-2">
                        <ul>
                          {categories &&
                            categories.map((item: any, index: any) => (
                              <div
                                key={item.id}
                                onClick={() => {
                                  handleMenuMobile(),
                                    setCustomcategory(item.url);
                                }}
                              >
                                <li className="leading-[0px]">
                                  <Link
                                    href={{
                                      pathname: "/products",
                                      query: { url: item.url },
                                    }}
                                    className="text-secondary duration-300"
                                  >
                                    <div className="flex">
                                      <Image
                                        src={item.menuImg}
                                        alt={item.name}
                                        height={25}
                                        width={25}
                                        className="mr-1"
                                        unoptimized
                                      />
                                      <p>{item.name}</p>
                                    </div>
                                  </Link>
                                </li>
                              </div>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${openSubNavMobile === 8 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(8);
                      setCustomcategory("_men");
                    }}
                  >
                    <Link
                      href={{ pathname: "/products", query: { url: "g-men" } }}
                      onClick={handleMenuMobile}
                    >
                      <p className="mt-5 flex items-center justify-between text-xl font-semibold">
                        Men's Jewellery
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 8 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(8);
                    }}
                  >
                    <Link href={"/gifts"} onClick={handleMenuMobile}>
                      <p
                        className={`mt-5 flex items-center text-xl font-semibold`}
                      >
                        Gifts
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 9 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(9);
                    }}
                  >
                    <Link href={"/benefit"} onClick={handleMenuMobile}>
                      <p
                        className={`mt-5 flex items-center text-xl font-semibold`}
                      >
                        Gold Services
                      </p>
                    </Link>
                  </li>
                </ul> */}
                <ul>
                  {allMenus.map((item: any, index: any) => (
                    <li key={index}>
                      <Link
                        href={item.url}
                        onClick={(e) => {
                          if (item.name.toLowerCase() === "all jewellery") {
                            e.preventDefault();
                            toggleAccordion(index);
                          } else {
                            setCustomcategory(item.label);
                            toggleAccordion(index);
                          }
                        }}
                      >
                        <div className="flex justify-between">
                          <div className="mt-3 flex items-center text-xl font-semibold">
                            {item.name}
                          </div>
                          {item.subCategory.length > 0 && (
                            <div className="mt-3">
                              {activeIndex === index ? (
                                <>
                                  <Icon.CaretUp scale={23} />
                                </>
                              ) : (
                                <>
                                  <Icon.CaretDown scale={23} />
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </Link>
                      {activeIndex == index && (
                        <div>
                          {item.subCategory.map(
                            (childItem: any, index: any) => (
                              <React.Fragment key={index}>
                                <div
                                  className="flex justify-between"
                                  onClick={() => toggleChildAccordion(index)}
                                >
                                  <div className="mt-2 flex items-center font-semibold">
                                    {childItem.name}
                                  </div>
                                  {childItem.subCategory.length > 0 && (
                                    <div className="mt-2">
                                      {childIndex === index ? (
                                        <>
                                          <Icon.CaretUp scale={23} />
                                        </>
                                      ) : (
                                        <>
                                          <Icon.CaretDown scale={23} />
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                                {childIndex === index && (
                                  <div>
                                    {childItem.subCategory.map(
                                      (item: any, index: any) => (
                                        <div key={index}>
                                          <Link
                                            href={item.url}
                                            className="text-secondary duration-300"
                                            onClick={() => {
                                              setCustomcategory(item.label);
                                              handleMenuMobile();
                                            }}
                                          >
                                            {item.name}
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
                </ul>
              </div>
              {/* <div className="flex mt-2 bg-[#fdf4f6] p-2">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavTwo;
