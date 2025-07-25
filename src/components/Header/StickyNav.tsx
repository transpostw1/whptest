"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { PiTreasureChestLight } from "react-icons/pi";
import { usePathname } from "next/navigation";
import ModalSearch from "@/components/Modal/ModalSearch";
import { useUser } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";

const StickyNav = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [clicked, setClicked] = useState<number>(1);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const { isLoggedIn, userDetails, getUser } = useUser();
  const { cartItems } = useCart();
  const pathname = usePathname();
  const toggleSearchModal = () => {
    setIsSearchModalOpen((prevState) => !prevState);
  };

  const cartLength: number = cartItems ? cartItems.length : 0;

  const handleOptionClicked = (option: number) => {
    setClicked(option);
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
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
    if (isLoggedIn && !userDetails) {
      getUser();
    }
  }, [isLoggedIn, userDetails, getUser]);
  if (!isMobile) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-4 left-[20px] z-10 w-[90%] rounded-2xl bg-white p-4">
        <div className="flex items-center justify-evenly">
          <Link href={"/"}>
            <div
              className={`${
                pathname.includes("") &&
                !pathname.includes("profile") &&
                !pathname.includes("offers") &&
                !pathname.includes("checkout")
                  ? "text-[#e26178]"
                  : ""
              } flex flex-col items-center`}
              onClick={() => handleOptionClicked(1)}
            >
              <Icon.HouseLine size={25} />
              <p>Home</p>
            </div>
          </Link>

          <div
            className={`${
              pathname.includes("/search-result") ? "text-[#e26178]" : ""
            } flex flex-col items-center`}
            onClick={toggleSearchModal} // Open the search modal when clicked
          >
            <Icon.MagnifyingGlass size={25} />
            <p>Search</p>
          </div>

          <Link href={"/offers"}>
            <div
              className={`${
                pathname.includes("offers") ? "text-[#e26178]" : ""
              } flex flex-col items-center`}
              onClick={() => handleOptionClicked(3)}
            >
              <Icon.SealPercent size={25} />
              <p>Offers</p>
            </div>
          </Link>
          <Link href={`${isLoggedIn ? "/profile" : "/register"}`}>
            <div
              className={`${
                pathname.includes("profile") ? "text-[#e26178]" : ""
              } flex flex-col items-center`}
              onClick={() => handleOptionClicked(4)}
            >
              <Icon.User size={25} />
              {isLoggedIn ? <p> {userDetails?.firstname}</p> : <p>Login</p>}
            </div>
          </Link>
          <Link href={"/checkout"}>
            <div
              className={`${
                pathname.includes("checkout") ? "text-[#e26178]" : ""
              } flex flex-col items-center`}
              onClick={() => handleOptionClicked(5)}
            >
              <div>
                <PiTreasureChestLight size={25} />
                {cartLength > 0 && (
                  <span className="quantity cart-quantity absolute right-12 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#E26178] text-xs text-white">
                    {cartLength}
                  </span>
                )}
              </div>

              <p>Box</p>
            </div>
          </Link>
        </div>
      </div>
      {isSearchModalOpen && (
        <ModalSearch
          closeModal={toggleSearchModal}
          isModalOpen={isSearchModalOpen}
        />
      )}
    </>
  );
};

export default StickyNav;
