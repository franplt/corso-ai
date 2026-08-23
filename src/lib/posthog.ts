"use client";

import posthog from "posthog-js";
import type { AnalyticsParameters } from "@/lib/analytics";

let initialized = false;

function hasConsent() {
  return (
    typeof window !== "undefined" &&
    localStorage.getItem("cookie-consent") === "accepted"
  );
}

export function initPostHog() {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!token || !hasConsent()) return false;

  if (initialized) {
    posthog.opt_in_capturing();
    posthog.startSessionRecording();
    return true;
  }

  posthog.init(token, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
    ui_host: "https://eu.posthog.com",
    defaults: "2026-05-30",
    person_profiles: "identified_only",
    autocapture: true,
    capture_pageview: "history_change",
    capture_pageleave: true,
    capture_dead_clicks: true,
    capture_exceptions: true,
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "[data-ph-mask]",
      blockSelector: "[data-ph-block]",
    },
  });
  initialized = true;
  return true;
}

export function capturePostHogEvent(
  name: string,
  parameters: AnalyticsParameters,
) {
  if (!initPostHog()) return false;
  posthog.capture(name, parameters);
  return true;
}

export function identifyPostHogUser(userId: string) {
  if (!initPostHog()) return;
  posthog.identify(userId);
}

export function resetPostHogUser() {
  if (!initialized) return;
  posthog.reset();
}

export function stopPostHog() {
  if (!initialized) return;
  posthog.stopSessionRecording();
  posthog.opt_out_capturing();
}

