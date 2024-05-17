"use client"
import React, { useState, useEffect } from "react";
import AllSchemes from "@/components/Gms/AllSchemes";
import MobileAllSchemes from "@/components/Gms/MobileAllSchemes";

const GMS = () => {
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 540px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  if(isMobile){
    return(
        <MobileAllSchemes/>
    )
  }
  return (
    <div>
      <AllSchemes />
    </div>
  );
};

export default GMS;
