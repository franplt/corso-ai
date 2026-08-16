"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";

export function ConditionalAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    setConsented(stored === "accepted");

    // Listen for storage changes (in case consent is given while page is open)
    function onStorage(e: StorageEvent) {
      if (e.key === "cookie-consent") {
        setConsented(e.newValue === "accepted");
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!consented) return null;

  return <Analytics />;
}
