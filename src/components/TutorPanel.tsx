"use client";

import {
  AssistantChat,
  type AssistantChatHandle,
} from "@agent-native/core/client/chat";
import { AgentNativeI18nProvider } from "@agent-native/core/client/i18n";
import type { ChatModelAdapter } from "@assistant-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type TutorPanelProps = {
  chapterNumber: number;
  chapterSlug: string;
  isLoggedIn: boolean;
};

type AuthState = "checking" | "signed-in" | "signed-out";

const MAX_SELECTION_LENGTH = 1_800;
const TUTOR_MESSAGES = {
  agentChat: {
    composer: { stopResponse: "Interrompi la risposta" },
    queue: { followUp: "Scrivi un altro messaggio…" },
    status: { thinking: "Sto pensando…" },
  },
};

function tutorRuntimeErrorStream(message: string) {
  const itemId = "tutor-runtime-error";
  const events = [
    { type: "response.output_text.delta", item_id: itemId, delta: message },
    { type: "response.output_text.done", item_id: itemId, text: message },
    { type: "response.completed", response: { status: "completed" } },
  ];

  return new Response(
    events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join(""),
    {
      status: 200,
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream; charset=utf-8",
      },
    },
  );
}

async function tutorRuntimeFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  try {
    const response = await fetch(input, init);
    if (response.ok) return response;

    const payload = (await response.clone().json().catch(() => null)) as {
      error?: unknown;
    } | null;
    const message =
      typeof payload?.error === "string"
        ? payload.error
        : "Il tutor non è disponibile in questo momento. Riprova tra poco.";

    return tutorRuntimeErrorStream(message);
  } catch {
    return tutorRuntimeErrorStream(
      "Non riesco a contattare il tutor. Controlla la connessione e riprova.",
    );
  }
}

function messageText(content: unknown) {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";

  return content
    .map((part) => {
      if (!part || typeof part !== "object" || !("text" in part)) return "";
      return typeof part.text === "string" ? part.text : "";
    })
    .filter(Boolean)
    .join("\n");
}

async function* tutorTextUpdates(response: Response) {
  if (!response.body) {
    throw new Error("Il tutor non ha restituito una risposta.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let answer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split(/\r?\n\r?\n/);
    buffer = events.pop() ?? "";

    for (const block of events) {
      const data = block
        .split(/\r?\n/)
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trimStart())
        .join("\n");
      if (!data || data === "[DONE]") continue;

      const event = JSON.parse(data) as {
        type?: string;
        delta?: unknown;
        error?: { message?: unknown };
      };

      if (
        event.type === "response.output_text.delta" &&
        typeof event.delta === "string"
      ) {
        answer += event.delta;
        yield { content: [{ type: "text" as const, text: answer }] };
        // Give React one paint between deltas. Upstream providers can deliver
        // many SSE events in a single network chunk; without this yield the
        // browser collapses them into one final render.
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        );
      }

      if (event.type === "response.failed" || event.type === "response.error") {
        throw new Error(
          typeof event.error?.message === "string"
            ? event.error.message
            : "Il tutor non riesce a rispondere in questo momento.",
        );
      }
    }
  }
}

export function TutorPanel({
  chapterNumber,
  chapterSlug,
  isLoggedIn,
}: TutorPanelProps) {
  const pathname = usePathname();
  const chatRef = useRef<AssistantChatHandle>(null);
  const [queryClient] = useState(() => new QueryClient());
  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState("");
  const [authState, setAuthState] = useState<AuthState>(() =>
    isLoggedIn
      ? "signed-in"
      : hasSupabaseConfig
        ? "checking"
        : "signed-out",
  );

  const adapter = useMemo<ChatModelAdapter>(() => {
    return {
      async *run({ messages, abortSignal }) {
        const history = messages
          .filter(
            (message) =>
              message.role === "user" || message.role === "assistant",
          )
          .map((message) => ({
            role: message.role,
            content: [{ type: "text", text: messageText(message.content) }],
          }));
        const prompt =
          [...history]
            .reverse()
            .find((message) => message.role === "user")?.content[0]?.text ?? "";

        const response = await tutorRuntimeFetch("/api/tutor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          signal: abortSignal,
          body: JSON.stringify({
            chapterSlug,
            prompt,
            messages: history,
          }),
        });

        yield* tutorTextUpdates(response);
      },
    };
  }, [chapterSlug]);

  useEffect(() => {
    if (isLoggedIn) {
      return;
    }

    if (!hasSupabaseConfig) {
      return;
    }

    const supabase = createSupabaseBrowserClient();
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active) setAuthState(data.session ? "signed-in" : "signed-out");
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (active) setAuthState(session ? "signed-in" : "signed-out");
      },
    );

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, [hasSupabaseConfig, isLoggedIn]);

  useEffect(() => {
    const captureSelection = () => {
      const selected = window.getSelection()?.toString().trim() ?? "";
      setSelection(selected.slice(0, MAX_SELECTION_LENGTH));
    };

    document.addEventListener("mouseup", captureSelection);
    document.addEventListener("keyup", captureSelection);
    return () => {
      document.removeEventListener("mouseup", captureSelection);
      document.removeEventListener("keyup", captureSelection);
    };
  }, []);

  function togglePanel() {
    setOpen((current) => {
      const next = !current;
      if (next) {
        trackEvent("tutor_open", { chapter_number: chapterNumber });
      }
      return next;
    });
  }

  function explainSelection() {
    if (!selection || !chatRef.current) return;
    setOpen(true);
    trackEvent("tutor_explain_selection", {
      chapter_number: chapterNumber,
      selection_length: selection.length,
    });
    chatRef.current.sendMessage(
      `Spiegami questo passaggio con parole ancora più semplici e con un esempio concreto.\n\n<testo_selezionato>\n${selection}\n</testo_selezionato>`,
    );
  }

  const returnTo = encodeURIComponent(pathname || `/chapters/${chapterSlug}`);

  return (
    <div className="corso-tutor-theme" data-open={open ? "true" : "false"}>
      {selection && authState === "signed-in" && !open && (
        <button
          type="button"
          onClick={explainSelection}
          className="fixed bottom-24 right-5 z-40 rounded-full border border-[hsl(var(--border))] bg-white px-4 py-2 text-sm font-semibold text-[var(--ink)] shadow-lg transition hover:-translate-y-0.5 hover:border-[var(--ink-faint)] sm:right-8"
        >
          Spiega la selezione
        </button>
      )}

      <button
        type="button"
        onClick={togglePanel}
        aria-expanded={open}
        aria-controls="corso-ai-tutor"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#924208] sm:right-8"
      >
        <span aria-hidden>{open ? "×" : "✦"}</span>
        {open ? "Chiudi" : "Chiedi al tutor"}
      </button>

      {open && (
        <section
          id="corso-ai-tutor"
          aria-label="Tutor AI della puntata"
          className="fixed inset-x-3 bottom-20 z-40 flex h-[min(680px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-white shadow-2xl sm:inset-x-auto sm:right-8 sm:w-[420px]"
        >
          <header className="flex items-center justify-between border-b border-[hsl(var(--border))] px-4 py-3">
            <div>
              <p className="font-heading font-semibold text-[var(--ink)]">Tutor AI</p>
              <p className="text-xs text-[var(--ink-muted)]">
                Conosce la puntata {chapterNumber}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Chiudi il tutor"
              className="rounded-full px-3 py-1 text-xl text-[var(--ink-muted)] hover:bg-[hsl(var(--border))] hover:text-[var(--ink)]"
            >
              ×
            </button>
          </header>

          {authState === "checking" ? (
            <div className="grid flex-1 place-items-center px-6 text-center text-sm text-[var(--ink-muted)]">
              Preparo il tutor…
            </div>
          ) : authState === "signed-out" ? (
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <p className="font-heading text-xl font-semibold text-[var(--ink)]">
                Il tutor ricorda la conversazione
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                Accedi per fare domande, chiedere esempi e verificare quello che
                hai imparato.
              </p>
              <Link
                href={`/login?next=${returnTo}`}
                className="btn btn-primary mt-6"
              >
                Accedi
              </Link>
            </div>
          ) : (
            <QueryClientProvider client={queryClient}>
              <AgentNativeI18nProvider
                initialLocale="en-US"
                initialMessages={TUTOR_MESSAGES}
                persistPreference={false}
              >
                <AssistantChat
                  ref={chatRef}
                  createAdapter={() => adapter}
                  tabId={`corso-tutor-${chapterSlug}`}
                  agentChatSurface="app"
                  className="corso-tutor-chat min-h-0 flex-1"
                  externalStreaming
                  showHeader={false}
                  showModelSelector={false}
                  providerStatusChecksEnabled={false}
                  plusMenuMode="hidden"
                  planModeDisabled
                  dynamicSuggestions={false}
                  emptyStateText="Cosa vuoi chiarire di questa puntata?"
                  suggestions={[
                    "Riassumi i tre concetti più importanti",
                    "Fammi un esempio concreto",
                    "Fammi un quiz di 3 domande",
                  ]}
                  composerPlaceholder="Chiedi qualcosa sulla puntata…"
                  onMessageCountChange={(count) => {
                    if (count === 1) {
                      trackEvent("tutor_conversation_started", {
                        chapter_number: chapterNumber,
                      });
                    }
                  }}
                />
              </AgentNativeI18nProvider>
            </QueryClientProvider>
          )}
        </section>
      )}
    </div>
  );
}
