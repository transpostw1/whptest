"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import useLoginPopup from "@/store/useLoginPopup";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useCart } from "@/context/CartContext";

interface Props {
  props: string;
}

const NavTwo: React.FC<Props> = ({ props }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { openLoginPopup, handleLoginPopup } = useLoginPopup();
  const { openModalWishlist } = useModalWishlistContext();
  const { openModalCart } = useModalCartContext();
  const { cartState } = useCart();

  const router = useRouter();

  const handleSearch = (value: string) => {
    router.push(`/search-result?query=${value}`);
    setSearchKeyword("");
  };
  return (
    <>
      <div className={`top-nav md:h-[65px] h-[65px]  text-rose-950 ${props}`}>
        <div className="container mx-auto h-full py-2 ">
          <div className="top-nav-main flex justify-between max-md:justify-center items-center ">
            <div className="left-content flex items-center ">
              <Image
                src={"/images/other/Logo.png"}
                width={80}
                height={80}
                alt="80x80"
                className=" object-cover"
              />
              <h1 className="text-rose-400 text-2xl ">WhpJewellers</h1>
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
            <div className="right-content flex items-center  max-md:hidden ">
              <div className="right flex gap-12 relative z-[1] ">
                <div className="list-action flex items-center gap-11 ">
                  <div className="user-icon flex  items-center justify-between cursor-pointer gap-11">
                    <div className="flex flex-col items-center">
                      <Icon.Percent size={28} />
                      <h4 className="text-sm">Offers</h4>
                    </div>
                    <div className="flex flex-col items-center">
                      <Icon.MapPin size={28} />
                      <h4 className="text-sm">Store</h4>
                    </div>
                    <div className="flex flex-col items-center">
                      <Icon.Newspaper size={28} />
                      <h4 className="text-sm">Blog</h4>
                    </div>
                    <div className="flex flex-col items-center">
                      <Icon.Headphones size={28} />
                      <h4 className="text-sm">Support</h4>
                    </div>

                    <div className="user-icon flex items-center justify-center cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Icon.User
                          size={28}
                          color="black"
                          onClick={handleLoginPopup}
                        />
                        <h4 className="text-sm">User</h4>
                      </div>

                      <div
                        className={`login-popup absolute top-[114px] w-[320px] p-7 rounded-xl bg-surface box-shadow-small 
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
                  <div
                    className="max-md:hidden cart-icon flex items-center relative cursor-pointer"
                    onClick={openModalCart}
                  >
                    <div className="flex flex-col items-center">
                      <Icon.Handbag size={28} color="black" />
                      <h4 className="text-sm">Cart</h4>
                    </div>

                    <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">
                      {cartState.cartArray.length}
                    </span>
                  </div>
                  <div className="choose-currency flex items-center ">
                    <select
                      name="currency"
                      id="chooseCurrency"
                      className="caption2  text-black"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                    <Icon.CaretDown size={24} color="grey" />
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
