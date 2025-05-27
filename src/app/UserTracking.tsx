"use client";
import useUserTracking from "@/hooks/useUserTracking";
import React, { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: object) => void;
  }
}

const Analytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
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
    };

    // Track initial page view
    handleRouteChange();

    // Track subsequent page views
    const handleRouteComplete = () => {
      // Small delay to ensure page content is loaded
      setTimeout(handleRouteChange, 100);
    };

    window.addEventListener('popstate', handleRouteComplete);
    router.events?.on('routeChangeComplete', handleRouteComplete);

    return () => {
      window.removeEventListener('popstate', handleRouteComplete);
      router.events?.off('routeChangeComplete', handleRouteComplete);
    };
  }, [pathname, searchParams, router]);

  // Additional effect to handle immediate URL changes
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