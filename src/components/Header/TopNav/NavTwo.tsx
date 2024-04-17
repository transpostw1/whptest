"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import useLoginPopup from "@/store/useLoginPopup";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";


interface Props {
  props: string;
}

const NavTwo: React.FC<Props> = ({ props }) => {
  const loginRef = useRef(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { openLoginPopup, handleLoginPopup } = useLoginPopup();
  const { openModalWishlist } = useModalWishlistContext();
  const { openModalCart } = useModalCartContext();
  const { cartItems } = useCart();
  const { userState } = useUser();
  const { logOut } = useUser();

  const isLoggedIn = userState.isLoggedIn;

  const router = useRouter();

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


  const handleSearch = (value: string) => {
    router.push(`/shop/breadcrumb1?query=${value}`);
    setSearchKeyword("");
  };
  const cartLength = cartItems ? cartItems.length : 0;

  const handleLogout = () => {
    logOut();
  };
  return (
    <>
      <div
        className={`top-nav header-menu w-full md:h-[65px] h-[65px] ${
          fixedHeader ? " fixed" : "relative"
        } text-rose-950 ${props}`}
      >
        <div className="container mx-auto h-full py-2 ">
          <div className="top-nav-main flex justify-between max-md:justify-center items-center ">
            <div className="left-content flex items-center ">
              <Link href={"/"}>
                <Image
                  src={"/images/other/Logo.png"}
                  width={80}
                  height={80}
                  alt="80x80"
                  className=" object-cover"
                />
              </Link>
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
            <div className="form-search w-72 relative max-lg:hidden">
              <button>
                <Icon.MagnifyingGlass
                  size={20}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => {
                    handleSearch(searchKeyword);
                  }}
                />
              </button>

              <input
                type="text"
                placeholder="What are you looking for?"
                className=" h-10 rounded-lg border border-line caption2 w-full pl-4 pr-4 bg-[#f7f7f7] focus:outline-none"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSearch(searchKeyword)
                }
              />
            </div>
            <div className="ps-3 right-content flex items-center  max-md:hidden ">
              <div className="right flex gap-12 relative z-[1] ">
                <div className="list-action flex items-center gap-8 ">
                  <div className="user-icon flex  items-center justify-between cursor-pointer gap-8">
                    <div className="flex flex-col items-center">
                      <Image
                        src={"/images/icons/offer.svg"}
                        alt="Offer"
                        width={30}
                        height={30}
                      />
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
                    <div className="flex flex-col items-center ">
                      <Image
                        src={"/images/icons/contact.svg"}
                        alt="Contact"
                        width={30}
                        height={30}
                      />
                      <h4 className="text-sm">Contact</h4>
                    </div>
                    <span className="w-[2px] h-[40px] bg-[#E9E9E9]"></span>
                    <div className="user-icon flex items-center justify-center cursor-pointer">
                      {isLoggedIn ? (
                        <>
                          <div
                            onClick={handleLoginPopup}
                            className="flex flex-col items-center"
                          >
                            <Icon.User size={28} color="red" />
                            <h4 className="text-sm">Profile</h4>
                          </div>

                          <div
                            className={`login-popup absolute top-[114px] w-[320px] p-7 rounded-xl bg-surface box-shadow-small bg-white 
                                            ${
                                              openLoginPopup ? "open" : ""
                                            } z-10`}
                          >
                            <button
                              className="button-main w-full text-center"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                            <div className="text-secondary text-center mt-3 pb-4">
                              Visit Again!
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            onClick={handleLoginPopup}
                            className="flex flex-col items-center"
                          >
                            <Icon.User size={28} color="black" />
                            <h4 className="text-sm">User</h4>
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
                    onClick={openModalWishlist}
                  >
                    <div className="flex flex-col items-center">
                      <Icon.Heart size={28} color="black" />
                      <h4 className="text-sm">Wishlist</h4>
                    </div>
                  </div>
                  {/* <div
                    className="max-md:hidden cart-icon flex items-center relative cursor-pointer"
                    onClick={openModalCart}
                  >
                    <div className="flex flex-col items-center">
                      <Image src={"/images/icons/cart.svg"} alt="Cart" width={30} height={30} />
                      <h4 className="text-sm">Cart</h4>
                    </div>

                    <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">
                      {cartLength}

                    </span>
                  </div> */}
                  <Link href="/checkout">
                    <div className="max-md:hidden cart-icon flex items-center relative cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Image
                          src={"/images/icons/cart.svg"}
                          alt="Cart"
                          width={30}
                          height={30}
                        />
                        <h4 className="text-sm">Cart</h4>
                      </div>

                      <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">
                        {cartLength}
                      </span>
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
                      <option value="USD">&#36; USD</option>
                      <option value="EUR">&#8364; EUR</option>
                      <option value="GBP">&#163; GBP</option>
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
    </>
  );
};

export default NavTwo;
