"use client";
import useUserTracking from "@/hooks/useUserTracking";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const UserTracking = () => {
  useUserTracking();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views when route changes
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-KS3DVFD5ZW", {
        page_path: pathname + searchParams.toString(),
      });
    }
  }, [pathname, searchParams]);

  return <></>;
};

export default UserTracking;
