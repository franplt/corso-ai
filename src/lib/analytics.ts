"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { capturePostHogEvent } from "@/lib/posthog";
import { SITE_NAME } from "@/lib/site";

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
  item_brand: SITE_NAME,
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

  const enriched: AnalyticsParameters = { ...parameters };

  // Add safe context helpful for funnels/breakdowns without leaking query params.
  if (typeof window !== "undefined") {
    enriched.page_path ??= window.location.pathname;
  }

  // Convenience aliases so CTA analysis doesn't depend on GA4-specific naming.
  const contentId = (parameters as Record<string, unknown>).content_id;
  const contentType = (parameters as Record<string, unknown>).content_type;
  if (typeof contentId === "string") enriched.cta_id ??= contentId;
  if (typeof contentType === "string") enriched.cta_type ??= contentType;

  let sent = false;
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    sendGAEvent("event", name, enriched);
    sent = true;
  }
  if (capturePostHogEvent(name, enriched)) sent = true;
  return sent;
}
