import Link from "next/link";
import type { Episode } from "@/lib/episodes";

type ChapterCardProps = {
  episode: Episode;
};

export function ChapterCard({ episode }: ChapterCardProps) {
  const isFree = episode.number === 1;

  return (
    <Link
      href={`/chapters/${episode.slug}`}
      className="group surface surface-hover flex h-full flex-col rounded-[var(--radius-lg)] p-6 transition-all duration-200"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="font-heading text-3xl font-semibold text-[var(--accent)]">
          {String(episode.number).padStart(2, "0")}
        </span>
        {isFree ? (
          <span className="rounded-full bg-[var(--accent-muted)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
            Gratis
          </span>
        ) : (
          <span className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--ink-muted)]">
            Premium
          </span>
        )}
      </div>
      <h3 className="font-heading mb-2 text-lg font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
        {episode.title}
      </h3>
      {episode.description && (
        <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--ink-muted)]">
          {episode.description}
        </p>
      )}
      <div className="mt-auto flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] group-hover:gap-2 transition-all">
          {isFree ? "Leggi" : "Apri"}
          <span aria-hidden>→</span>
        </span>
        {episode.readingTimeMinutes > 0 && (
          <span className="text-xs text-[var(--ink-faint)]">
            {episode.readingTimeMinutes} min
          </span>
        )}
      </div>
    </Link>
  );
}
