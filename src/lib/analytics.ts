"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { capturePostHogEvent } from "@/lib/posthog";

export type AnalyticsItem = {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_category?: string;
  price?: number;
  quantity?: number;
};

export type AnalyticsParameters = Record<
  string,
  string | number | boolean | AnalyticsItem[] | undefined
>;

export const COURSE_ITEM: AnalyticsItem = {
  item_id: "corso-ai-10-puntate",
  item_name: "Corso AI in 10 puntate",
  item_brand: "Francesco Paltrinieri",
  item_category: "Corso online",
  price: 9.9,
  quantity: 1,
};

export function hasAnalyticsConsent() {
  return (
    typeof window !== "undefined" &&
    localStorage.getItem("cookie-consent") === "accepted"
  );
}

/** Send only consented, non-identifying data to GA4. */
export function trackEvent(name: string, parameters: AnalyticsParameters = {}) {
  if (!hasAnalyticsConsent()) return false;

  let sent = false;
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    sendGAEvent("event", name, parameters);
    sent = true;
  }
  if (capturePostHogEvent(name, parameters)) sent = true;
  return sent;
}
