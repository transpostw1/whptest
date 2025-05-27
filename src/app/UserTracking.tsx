"use client";
import useUserTracking from "@/hooks/useUserTracking";
import React, { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: object) => void;
  }
}

const Analytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      const url = searchParams.toString() 
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
        
      window.gtag("config", "G-KS3DVFD5ZW", {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
};

const UserTracking = () => {
  useUserTracking();

  return (
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  );
};

export default UserTracking;