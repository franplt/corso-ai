import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { PaywallCard } from "@/components/PaywallCard";
import { getCurrentUser, isDevUnlocked, userHasAccess } from "@/lib/auth";
import { getEpisodeBySlug, getEpisodes } from "@/lib/episodes";

type ChapterPageProps = {
  params: Promise<{ slug: string }>;
};

function getTeaser(content: string) {
  return content.slice(0, 1000).trimEnd();
}

export async function generateStaticParams() {
  return getEpisodes().map((episode) => ({ slug: episode.slug }));
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  const allEpisodes = getEpisodes();

  if (!episode) notFound();

  const user = await getCurrentUser();
  const devUnlocked = await isDevUnlocked();
  const hasAccess = devUnlocked || (user ? await userHasAccess(user.id) : false);
  const canReadFull = episode.number === 1 || hasAccess;
  const content = canReadFull ? episode.content : getTeaser(episode.content);

  const currentIndex = allEpisodes.findIndex((e) => e.slug === slug);
  const prevEpisode = currentIndex > 0 ? allEpisodes[currentIndex - 1] : null;
  const nextEpisode =
    currentIndex >= 0 && currentIndex < allEpisodes.length - 1
      ? allEpisodes[currentIndex + 1]
      : null;

  return (
    <main>
      {/* Breadcrumb / back */}
      <nav className="mb-8" aria-label="Navigazione">
        <Link
          href="/chapters"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
        >
          ← Tutte le puntate
        </Link>
      </nav>

      {/* Article header */}
      <header className="mb-10">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[var(--accent)]">
          Puntata {episode.number}
        </p>
        <h1 className="font-heading text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
          {episode.title}
        </h1>
      </header>

      {/* Content */}
      <article className="mb-12">
        {episode.isPublished ? (
          <div className="prose">
            <MarkdownContent markdown={content} />
          </div>
        ) : (
          <p className="text-[var(--ink-muted)]">
            Questa puntata non è ancora online. Intanto puoi leggere le altre.
          </p>
        )}
      </article>

      {/* Paywall */}
      {!canReadFull && episode.isPublished && (
        <PaywallCard chapterNumber={episode.number} isLoggedIn={Boolean(user)} />
      )}

      {/* Prev / Next */}
      <nav
        className="mt-14 flex flex-col gap-4 border-t border-[var(--border)] pt-10 sm:flex-row sm:justify-between"
        aria-label="Puntate precedente e successiva"
      >
        {prevEpisode ? (
          <Link
            href={`/chapters/${prevEpisode.slug}`}
            className="group flex max-w-[280px] flex-col rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-elevated)] p-4 transition-colors hover:border-[var(--ink-faint)] hover:bg-[var(--bg)]"
          >
            <span className="text-xs font-medium text-[var(--ink-muted)]">
              ← Precedente
            </span>
            <span className="font-heading mt-1 font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
              {prevEpisode.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {nextEpisode ? (
          <Link
            href={`/chapters/${nextEpisode.slug}`}
            className="group flex max-w-[280px] flex-col rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-right transition-colors hover:border-[var(--ink-faint)] hover:bg-[var(--bg)] sm:items-end"
          >
            <span className="text-xs font-medium text-[var(--ink-muted)]">
              Successiva →
            </span>
            <span className="font-heading mt-1 font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
              {nextEpisode.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
