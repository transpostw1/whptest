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
    const sendPageView = () => {
      if (typeof window !== "undefined" && window.gtag) {
        const url = searchParams.toString() 
          ? `${pathname}?${searchParams.toString()}`
          : pathname;

        // Send page view event
        window.gtag("event", "page_view", {
          page_path: url,
          page_location: window.location.href,
          page_title: document.title
        });

        // Also send config update
        window.gtag("config", "G-KS3DVFD5ZW", {
          page_path: url,
          page_location: window.location.href,
          page_title: document.title
        });
      }
    };

    // Initial page view
    sendPageView();

    // Handle route changes
    const handleRouteChange = () => {
      // Wait for the page to be fully loaded
      setTimeout(sendPageView, 100);
    };

    // Listen for route changes
    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("pushState", handleRouteChange);
    window.addEventListener("replaceState", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("pushState", handleRouteChange);
      window.removeEventListener("replaceState", handleRouteChange);
    };
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