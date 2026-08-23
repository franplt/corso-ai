"use client";

import { useEffect, useRef } from "react";
import { AnalyticsParameters, trackEvent } from "@/lib/analytics";

type AnalyticsEventProps = {
  name: string;
  parameters?: AnalyticsParameters;
  oncePerSessionKey?: string;
};

export function AnalyticsEvent({
  name,
  parameters = {},
  oncePerSessionKey,
}: AnalyticsEventProps) {
  const sent = useRef(false);

  useEffect(() => {
    function send() {
      if (sent.current) return;

      const storageKey = oncePerSessionKey
        ? `analytics-event:${oncePerSessionKey}`
        : null;
      if (storageKey && sessionStorage.getItem(storageKey)) return;

      if (!trackEvent(name, parameters)) return;
      sent.current = true;
      if (storageKey) sessionStorage.setItem(storageKey, "sent");
    }

    send();
    window.addEventListener("cookie-consent-change", send);
    return () => window.removeEventListener("cookie-consent-change", send);
  }, [name, oncePerSessionKey, parameters]);

  return null;
}
