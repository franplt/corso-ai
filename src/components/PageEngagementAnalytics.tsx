"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { registerPostHogProperties } from "@/lib/posthog";

type PageType = "home" | "guida" | "puntata" | "checkout" | "signup" | "other";

const SCROLL_THRESHOLDS = [25, 50, 75, 90] as const;

function getPageType(pathname: string): PageType {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/guida/")) return "guida";
  if (pathname === "/payment/checkout" || pathname.startsWith("/payment/"))
    return "checkout";
  if (pathname === "/signup" || pathname === "/login" || pathname.startsWith("/signup/"))
    return "signup";
  if (isChapterDetailPath(pathname)) return "puntata";
  return "other";
}

function isChapterDetailPath(pathname: string) {
  if (!pathname.startsWith("/chapters/")) return false;
  const parts = pathname.split("/").filter(Boolean);
  return parts.length === 2; // /chapters/[slug]
}

function truncateReferrer(raw: string, maxLen = 200) {
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  return trimmed.length > maxLen ? trimmed.slice(0, maxLen) : trimmed;
}

function readUtmParams() {
  if (typeof window === "undefined") return {};
  const url = new URL(window.location.href);
  const utm_source = url.searchParams.get("utm_source") || undefined;
  const utm_medium = url.searchParams.get("utm_medium") || undefined;
  const utm_campaign = url.searchParams.get("utm_campaign") || undefined;
  return { utm_source, utm_medium, utm_campaign };
}

type EngagementState = {
  pagePath: string;
  pageType: PageType;
  visibleStartedAtMs: number | null;
  secondsVisible: number;
  maxScrollPercent: number;
  scrollSent: Set<number>;
  hadInteraction: boolean;
  leftSent: boolean;
};

function createState(pagePath: string, pageType: PageType): EngagementState {
  return {
    pagePath,
    pageType,
    visibleStartedAtMs: document.visibilityState === "visible" ? performance.now() : null,
    secondsVisible: 0,
    maxScrollPercent: 0,
    scrollSent: new Set<number>(),
    hadInteraction: false,
    leftSent: false,
  };
}

function computeScrollPercent() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  if (available <= 0) return 100;
  return Math.max(0, Math.min(100, (window.scrollY / available) * 100));
}

export function PageEngagementAnalytics() {
  const pathname = usePathname() || "/";
  const pageType = useMemo(() => getPageType(pathname), [pathname]);
  const stateRef = useRef<EngagementState | null>(null);

  useEffect(() => {
    stateRef.current = createState(pathname, pageType);

    function enrichPostHog() {
      const referrer = truncateReferrer(document.referrer);
      const utm = readUtmParams();
      registerPostHogProperties({
        page_path: pathname,
        page_type: pageType,
        ...(referrer ? { referrer } : {}),
        ...utm,
      });
    }

    enrichPostHog();
    window.addEventListener("cookie-consent-change", enrichPostHog);
    return () => window.removeEventListener("cookie-consent-change", enrichPostHog);
  }, [pageType, pathname]);

  useEffect(() => {
    let hiddenTimer: number | null = null;

    function clearHiddenTimer() {
      if (hiddenTimer == null) return;
      window.clearTimeout(hiddenTimer);
      hiddenTimer = null;
    }

    function accumulateVisibleSeconds() {
      const state = stateRef.current;
      if (!state) return;
      if (state.visibleStartedAtMs == null) return;
      state.secondsVisible += (performance.now() - state.visibleStartedAtMs) / 1000;
      state.visibleStartedAtMs = null;
    }

    function ensureVisibleTimerRunning() {
      const state = stateRef.current;
      if (!state) return;
      if (document.visibilityState !== "visible") return;
      if (state.visibleStartedAtMs != null) return;
      state.visibleStartedAtMs = performance.now();
    }

    function sendPageLeft(exitType: "hidden" | "pagehide") {
      const state = stateRef.current;
      if (!state || state.leftSent) return;

      accumulateVisibleSeconds();
      const seconds_visible = Math.round(state.secondsVisible);
      const max_scroll_percent = Math.round(state.maxScrollPercent);
      const engaged =
        state.hadInteraction || max_scroll_percent >= 25 || seconds_visible >= 15;

      const didSend = trackEvent("page_left", {
        page_path: state.pagePath,
        page_type: state.pageType,
        seconds_visible,
        max_scroll_percent,
        engaged,
        exit_type: exitType,
      });
      if (!didSend) return;
      state.leftSent = true;
    }

    function updateScroll() {
      const state = stateRef.current;
      if (!state) return;

      const progress = computeScrollPercent();
      state.maxScrollPercent = Math.max(state.maxScrollPercent, progress);

      if (isChapterDetailPath(state.pagePath)) return;

      for (const threshold of SCROLL_THRESHOLDS) {
        if (progress < threshold) continue;
        if (state.scrollSent.has(threshold)) continue;

        const didSend = trackEvent("scroll_depth", {
          percent: threshold,
          page_path: state.pagePath,
          page_type: state.pageType,
        });
        if (!didSend) continue;
        state.scrollSent.add(threshold);
      }
    }

    function onInteraction() {
      const state = stateRef.current;
      if (!state) return;
      state.hadInteraction = true;
    }

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        clearHiddenTimer();
        hiddenTimer = window.setTimeout(() => sendPageLeft("hidden"), 500);
        return;
      }

      clearHiddenTimer();
      ensureVisibleTimerRunning();
    }

    function onPageHide() {
      clearHiddenTimer();
      sendPageLeft("pagehide");
    }

    // Initial state.
    ensureVisibleTimerRunning();
    updateScroll();

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("cookie-consent-change", updateScroll);
    window.addEventListener("pointerdown", onInteraction, { passive: true });
    window.addEventListener("keydown", onInteraction);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      clearHiddenTimer();
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("cookie-consent-change", updateScroll);
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("keydown", onInteraction);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, []);

  return null;
}

