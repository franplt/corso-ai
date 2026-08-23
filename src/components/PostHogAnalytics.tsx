"use client";

import { useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  identifyPostHogUser,
  initPostHog,
  resetPostHogUser,
  stopPostHog,
} from "@/lib/posthog";

export function PostHogAnalytics() {
  useEffect(() => {
    if (!initPostHog()) return;

    const hasSupabaseConfig = Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );
    if (!hasSupabaseConfig) return stopPostHog;

    const supabase = createSupabaseBrowserClient();
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (data.session?.user.id) identifyPostHogUser(data.session.user.id);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!active) return;
        if (session?.user.id) identifyPostHogUser(session.user.id);
        else resetPostHogUser();
      },
    );

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
      stopPostHog();
    };
  }, []);

  return null;
}

