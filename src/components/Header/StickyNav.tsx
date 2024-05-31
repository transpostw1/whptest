"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModalSearch from "@/components/Modal/ModalSearch";
import { useUser } from "@/context/UserContext";

const StickyNav = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [clicked, setClicked] = useState<number>(1);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const { isLoggedIn, userDetails, getUser } = useUser();
  const pathname = usePathname();
  const toggleSearchModal = () => {
    setIsSearchModalOpen((prevState) => !prevState);
  };

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
      <div className="fixed bottom-4 left-[20px] w-[90%] p-4 bg-white z-10 rounded-2xl">
        <div className="flex justify-evenly items-center">
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
          <Link href={"/"}>
            <div
              className={`${pathname.includes("/search-result") ? "text-[#e26178]" : ""
                } flex flex-col items-center`}
              onClick={toggleSearchModal} // Open the search modal when clicked
            >
              <Icon.MagnifyingGlass size={25} />
              <p>Search</p>
            </div>
          </Link>
          <Link href={"/offers"}>
            <div
              className={`${pathname.includes("offers") ? "text-[#e26178]" : ""
                } flex flex-col items-center`}
              onClick={() => handleOptionClicked(3)}
            >
              <Icon.Percent size={25} />
              <p>Offers</p>
            </div>
          </Link>
          <Link href={`${isLoggedIn?"/profile":"/register"}`}>
            <div
              className={`${pathname.includes("profile") ? "text-[#e26178]" : ""
                } flex flex-col items-center`}
              onClick={() => handleOptionClicked(4)}
            >
              <Icon.User size={25} />
              {isLoggedIn ? (
                <h4 className="text-sm">{userDetails?.customer?.firstname}</h4>
              ) : (
                <p>Login</p>
              )}
            </div>
          </Link>
          <Link href={"/checkout"}>
            <div
              className={`${pathname.includes("checkout") ? "text-[#e26178]" : ""
                } flex flex-col items-center`}
              onClick={() => handleOptionClicked(5)}
            >
              <Icon.ShoppingCart size={25} />
              <p>Cart</p>
            </div>
          </Link>
        </div>
      </div>
      {isSearchModalOpen && (
        <ModalSearch
          searchKeyword=""
          setSearchKeyword={() => { }}
          handleSearch={() => { }}
          closeModal={toggleSearchModal}
          isModalOpen={isSearchModalOpen}
        />
      )}
    </>
  );
};

export default StickyNav;
