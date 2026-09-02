import { TrackedLink } from "@/components/TrackedLink";

export function CourseContinuationCard() {
  return (
    <aside
      className="my-10 rounded-[var(--radius-lg)] border-2 border-[var(--accent)] bg-[var(--accent-muted)]/30 p-6 sm:p-8"
      aria-label="Continua il corso"
    >
      <div className="max-w-2xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
          Hai concluso la puntata gratuita
        </p>
        <h2 className="font-heading text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
          Continua con le puntate 2–10
        </h2>
        <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">
          Prosegui dalle basi fino a RAG, agenti e scelta del modello. L&apos;accesso
          completo costa <strong className="text-[var(--ink)]">9,90 € una tantum</strong> e
          resta tuo: nessun abbonamento.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <TrackedLink
            href="/signup?intent=buy"
            className="btn btn-primary"
            eventName="select_content"
            eventParameters={{
              content_type: "course_continuation_cta",
              content_id: "free_chapter_completion",
              chapter_number: 1,
            }}
          >
            Crea un account e continua · 9,90 €
          </TrackedLink>
          <TrackedLink
            href="/chapters"
            className="btn btn-secondary"
            eventName="select_content"
            eventParameters={{
              content_type: "course_continuation_catalog",
              content_id: "free_chapter_completion",
              chapter_number: 1,
            }}
          >
            Vedi il programma
          </TrackedLink>
        </div>
      </div>
    </aside>
  );
}
