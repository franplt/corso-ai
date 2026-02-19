"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type DevUnlockBannerProps = {
  unlocked: boolean;
};

export function DevUnlockBanner({ unlocked: initial }: DevUnlockBannerProps) {
  const [unlocked, setUnlocked] = useState(initial);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function toggle() {
    await fetch("/api/dev-unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unlock: !unlocked }),
    });
    setUnlocked(!unlocked);
    startTransition(() => router.refresh());
  }

  return (
    <div
      title="Dev only — non visibile in produzione"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-dashed border-amber-400 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 shadow-md"
    >
      <span className="h-2 w-2 rounded-full" style={{ background: unlocked ? "#16a34a" : "#d97706" }} />
      <span>{unlocked ? "Paywall disattivato" : "Paywall attivo"}</span>
      <button
        onClick={toggle}
        disabled={pending}
        className="ml-1 rounded-full bg-amber-200 px-2 py-0.5 text-amber-800 transition hover:bg-amber-300 disabled:opacity-50"
      >
        {pending ? "..." : unlocked ? "Riattiva" : "Disattiva"}
      </button>
    </div>
  );
}
