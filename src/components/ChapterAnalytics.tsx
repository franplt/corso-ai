"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

type ChapterAnalyticsProps = {
  episodeNumber: number;
  episodeTitle: string;
  access: "free" | "premium" | "preview";
  readingTimeMinutes: number;
};

const THRESHOLDS = [25, 50, 75, 90] as const;

export function ChapterAnalytics({
  episodeNumber,
  episodeTitle,
  access,
  readingTimeMinutes,
}: ChapterAnalyticsProps) {
  const sentProgress = useRef(new Set<number>());
  const sentView = useRef(false);

  useEffect(() => {
    function sendView() {
      if (sentView.current) return;
      sentView.current = trackEvent("chapter_view", {
        chapter_number: episodeNumber,
        chapter_title: episodeTitle,
        access_type: access,
        reading_time_minutes: readingTimeMinutes,
      });
    }

    function updateProgress() {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const progress = available > 0 ? (window.scrollY / available) * 100 : 100;

      for (const threshold of THRESHOLDS) {
        if (progress < threshold || sentProgress.current.has(threshold)) continue;
        const didSend = trackEvent("chapter_progress", {
          chapter_number: episodeNumber,
          chapter_title: episodeTitle,
          access_type: access,
          percent_read: threshold,
        });
        if (!didSend) continue;
        sentProgress.current.add(threshold);

        if (threshold === 90 && access !== "preview") {
          trackEvent("chapter_complete", {
            chapter_number: episodeNumber,
            chapter_title: episodeTitle,
            access_type: access,
          });
        }
      }
    }

    sendView();
    updateProgress();
    window.addEventListener("cookie-consent-change", sendView);
    window.addEventListener("cookie-consent-change", updateProgress);
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      window.removeEventListener("cookie-consent-change", sendView);
      window.removeEventListener("cookie-consent-change", updateProgress);
      window.removeEventListener("scroll", updateProgress);
    };
  }, [access, episodeNumber, episodeTitle, readingTimeMinutes]);

  return null;
}
