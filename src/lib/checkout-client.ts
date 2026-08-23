type CheckoutResponse = {
  error?: string;
  url?: string;
};

import { COURSE_ITEM, trackEvent } from "@/lib/analytics";

export async function createCheckoutUrl(source: string): Promise<string> {
  const response = await fetch("/api/checkout", { method: "POST" });
  const data = (await response.json()) as CheckoutResponse;

  if (!response.ok || !data.url) {
    throw new Error(data.error ?? "Impossibile avviare il checkout.");
  }

  if (data.url.startsWith("http")) {
    trackEvent("begin_checkout", {
      currency: "EUR",
      value: 9.9,
      checkout_source: source,
      items: [COURSE_ITEM],
    });
  }

  return data.url;
}
