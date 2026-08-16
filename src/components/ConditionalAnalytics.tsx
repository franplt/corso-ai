"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Vercel Analytics + Speed Insights, gated behind the cookie consent banner.
 *
 * Both are held back until the visitor explicitly accepts, which is what the
 * banner promises ("questo sito usa cookie analitici"). Loading either one
 * before consent would make the banner misleading.
 */
export function ConditionalAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const read = () => setConsented(localStorage.getItem("cookie-consent") === "accepted");
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
  }, []);

  if (!consented) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
