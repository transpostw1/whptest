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
      }
    };

    // Initial page view
    sendPageView();

    // Create a MutationObserver to watch for route changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          sendPageView();
        }
      });
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Handle route changes
    const handleRouteChange = () => {
      // Wait for the page to be fully loaded
      setTimeout(sendPageView, 100);
    };

    // Listen for route changes
    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("pushState", handleRouteChange);
    window.addEventListener("replaceState", handleRouteChange);

    // Additional check for Next.js App Router navigation
    const handleNextNavigation = () => {
      setTimeout(sendPageView, 100);
    };

    // Listen for Next.js navigation events
    window.addEventListener("nextjs:routeChangeComplete", handleNextNavigation);

    return () => {
      observer.disconnect();
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("pushState", handleRouteChange);
      window.removeEventListener("replaceState", handleRouteChange);
      window.removeEventListener("nextjs:routeChangeComplete", handleNextNavigation);
    };
  }, [pathname, searchParams]);

  // Additional effect to handle pathname changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      const url = searchParams.toString() 
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      window.gtag("event", "page_view", {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title
      });
    }
  }, [pathname]);

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