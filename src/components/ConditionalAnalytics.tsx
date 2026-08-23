"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { PostHogAnalytics } from "@/components/PostHogAnalytics";

/**
 * Vercel Analytics + Speed Insights, gated behind the cookie consent banner.
 *
 * Both are held back until the visitor explicitly accepts, which is what the
 * banner promises ("questo sito usa cookie analitici"). Loading either one
 * before consent would make the banner misleading.
 */
export function ConditionalAnalytics() {
  const [consented, setConsented] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    const read = () => {
      const accepted = localStorage.getItem("cookie-consent") === "accepted";
      setConsented(accepted);

      if (gaId) {
        (window as Window & Record<string, unknown>)[`ga-disable-${gaId}`] = !accepted;
      }

      if (!accepted) {
        for (const cookie of document.cookie.split(";")) {
          const name = cookie.split("=")[0]?.trim();
          if (name === "_ga" || name?.startsWith("_ga_")) {
            document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
          }
        }
      }
    };
    read();

    // Consent given in this tab (CookieConsent dispatches this on click).
    window.addEventListener("cookie-consent-change", read);
    // Consent given in another tab.
    function onStorage(e: StorageEvent) {
      if (e.key === "cookie-consent") read();
    }
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("cookie-consent-change", read);
      window.removeEventListener("storage", onStorage);
    };
  }, [gaId]);

  if (!consented) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      <PostHogAnalytics />
    </>
  );
}
