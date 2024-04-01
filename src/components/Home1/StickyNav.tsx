"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";

const StickyNav = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [clicked, setClicked] = useState<number>(1);

  const handleOptionClicked = (option: number) => {
    setClicked(option);
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (e: any) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);
  if (!isMobile) {
    return null;
  }
  return (
    <div className="fixed bottom-4 left-[20px] w-[90%] p-4 bg-white z-10 rounded-2xl">
      <div className="flex justify-evenly items-center">
        <div
          className={`${clicked === 1 ? "text-[#e26178]" : ""} flex flex-col items-center`}
          onClick={() => handleOptionClicked(1)}
        >
          <Icon.HouseLine size={25} />
          <p>Home</p>
        </div>
        <div
          className={`${clicked === 2 ? "text-[#e26178]" : ""} flex flex-col items-center`}
          onClick={() => handleOptionClicked(2)}
        >
          <Icon.MagnifyingGlass size={25} />
          <p>Search</p>
        </div>
        <div
          className={`${clicked === 3 ? "text-[#e26178]" : ""} flex flex-col items-center`}
          onClick={() => handleOptionClicked(3)}
        >
          <Icon.Percent size={25} />
          <p>Offers</p>
        </div>
        <div
          className={`${clicked === 4 ? "text-[#e26178]" : ""} flex flex-col items-center`}
          onClick={() => handleOptionClicked(4)}
        >
          <Icon.User size={25} />
          <p>Profile</p>
        </div>
        <div
          className={`${clicked === 5 ? "text-[#e26178]" : ""}flex flex-col items-center`}
          onClick={() => handleOptionClicked(5)}
        >
          <Icon.ShoppingCart size={25} />
          <p>Cart</p>
        </div>
      </div>
    </div>
  );
};

export default StickyNav;
