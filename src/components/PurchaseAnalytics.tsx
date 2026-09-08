"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { COURSE_ITEM, hasAnalyticsConsent } from "@/lib/analytics";
import { capturePostHogEvent } from "@/lib/posthog";

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

      if (!hasAnalyticsConsent()) return;

      const payload = {
        transaction_id: transactionId,
        value,
        currency,
        items: [{ ...COURSE_ITEM, price: value }],
      };

      // Dedupe per-destination: GA and PostHog can fail independently.
      const gaKey = `ga-purchase:${transactionId}`;
      const phKey = `ph-purchase:${transactionId}`;

      const gaConfigured = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
      const shouldSendGA = gaConfigured && !localStorage.getItem(gaKey);
      const shouldSendPH = !localStorage.getItem(phKey);

      let didSend = false;

      if (shouldSendGA) {
        sendGAEvent("event", "purchase", payload);
        localStorage.setItem(gaKey, "sent");
        didSend = true;
      }

      if (shouldSendPH) {
        const phSent = capturePostHogEvent("purchase", payload);
        if (phSent) {
          localStorage.setItem(phKey, "sent");
          didSend = true;
        }
      }

      if (!didSend) return;

      sent.current = true;
    }

    send();
    window.addEventListener("cookie-consent-change", send);
    return () => window.removeEventListener("cookie-consent-change", send);
  }, [currency, transactionId, value]);

  return null;
}
