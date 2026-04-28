"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export default function GtmRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip the very first run — GTM already fires its own pageview on initial load.
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (!window.dataLayer) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    window.dataLayer.push({
      event: "page_view",
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
