"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export default function GtmRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pathname = usePathname();
    setTimeout(() => {
      window.dataLayer = window.dataLayer || [];

      window.dataLayer.push({
        event: "virtual_pageview",
        page_location: window.location.href,
        page_path: pathname,
        page_title: document.title,
      });
    }, 0);
  }, [pathname, searchParams]);

  return null;
}
