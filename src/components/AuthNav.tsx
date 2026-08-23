"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthState = "loading" | "signedIn" | "signedOut";

/**
 * Client-side auth-aware navigation.
 *
 * This exists so the root layout can stay a static, non-async server component.
 * Reading the Supabase session on the server inside the root layout opted every
 * single route into dynamic rendering, which meant zero CDN caching sitewide
 * (every response was x-vercel-cache: MISS) plus a blocking round-trip to
 * Supabase before the first byte of HTML. Doing it here instead lets the
 * homepage, the chapter index and the free episode render statically.
 */
export function AuthNav({ variant }: { variant: "header" | "footer" }) {
  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const [state, setState] = useState<AuthState>(() =>
    hasSupabaseConfig ? "loading" : "signedOut",
  );

  useEffect(() => {
    if (!hasSupabaseConfig) return;

    const supabase = createSupabaseBrowserClient();
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active) setState(data.session ? "signedIn" : "signedOut");
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setState(session ? "signedIn" : "signedOut");
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [hasSupabaseConfig]);

  if (variant === "footer") {
    // Render a stable placeholder while loading so the footer doesn't jump.
    if (state === "loading") {
      return <span className="text-sm text-transparent select-none">Account</span>;
    }
    return (
      <Link
        href={state === "signedIn" ? "/account" : "/signup"}
        className="text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
      >
        {state === "signedIn" ? "Account" : "Iscriviti"}
      </Link>
    );
  }

  if (state === "loading") {
    // Reserve roughly the same width as the signed-out pair of links so the
    // header does not visibly reflow once the session resolves.
    return <span aria-hidden className="inline-block h-9 w-[9.5rem]" />;
  }

  if (state === "signedIn") {
    return (
      <Link
        href="/account"
        className="rounded-full px-3 py-2 text-sm font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--border)] hover:text-[var(--ink)] sm:px-4"
      >
        Account
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className="rounded-full px-3 py-2 text-sm font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--border)] hover:text-[var(--ink)] sm:px-4"
      >
        Accedi
      </Link>
      <Link href="/signup" className="btn btn-primary btn-sm">
        Inizia
      </Link>
    </>
  );
}
