"use client";

import { useEffect, useRef } from "react";
import { COURSE_ITEM, trackEvent } from "@/lib/analytics";

type PurchaseAnalyticsProps = {
  transactionId: string;
  value: number;
  currency: string;
};

export function PurchaseAnalytics({
  transactionId,
  value,
  currency,
}: PurchaseAnalyticsProps) {
  const sent = useRef(false);

  useEffect(() => {
    function send() {
      if (sent.current) return;

      const key = `ga-purchase:${transactionId}`;
      if (localStorage.getItem(key)) return;

      if (!trackEvent("purchase", {
        transaction_id: transactionId,
        value,
        currency,
        items: [{ ...COURSE_ITEM, price: value }],
      })) return;

      sent.current = true;
      localStorage.setItem(key, "sent");
    }

    send();
    window.addEventListener("cookie-consent-change", send);
    return () => window.removeEventListener("cookie-consent-change", send);
  }, [currency, transactionId, value]);

  return null;
}
