import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterContent } from "@/components/ChapterContent";
import { ChapterAnalytics } from "@/components/ChapterAnalytics";
import { CourseContinuationCard } from "@/components/CourseContinuationCard";
import { DevUnlockBanner } from "@/components/DevUnlockBanner";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import { PaywallCard } from "@/components/PaywallCard";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { TutorPanel } from "@/components/TutorPanel";
import { getCurrentUser, isDevUnlocked, userHasAccess } from "@/lib/auth";
import { getEpisodeBySlug, getEpisodes } from "@/lib/episodes";

type ChapterPageProps = {
  params: Promise<{ slug: string }>;
};

function getTeaser(content: string) {
  const targetLength = 1000;
  const nextParagraphBreak = content.indexOf("\n\n", targetLength);

  if (nextParagraphBreak !== -1 && nextParagraphBreak <= targetLength + 400) {
    return content.slice(0, nextParagraphBreak).trimEnd();
  }

  const previousParagraphBreak = content.lastIndexOf("\n\n", targetLength);
  const end = previousParagraphBreak > 0 ? previousParagraphBreak : targetLength;
  return content.slice(0, end).trimEnd();
}

export async function generateStaticParams() {
  return getEpisodes().map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) return {};
  const title = `Puntata ${episode.number}: ${episode.title}`;
  const description = episode.description || `Puntata ${episode.number} del corso AI in 10 puntate.`;
  const url = `/chapters/${episode.slug}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  const allEpisodes = getEpisodes();

  if (!episode) notFound();

  // Episode 1 is free for everyone. Skipping the auth lookups here keeps the
  // single most-shared page in the funnel statically rendered and CDN-cacheable
  // instead of paying a Supabase round-trip on every visit.
  const isFreeEpisode = episode.number === 1;

  const user = isFreeEpisode ? null : await getCurrentUser();
  const devUnlocked = isFreeEpisode ? false : await isDevUnlocked();
  const hasAccess = devUnlocked || (user ? await userHasAccess(user.id) : false);
  const canReadFull = isFreeEpisode || hasAccess;
  const content = canReadFull ? episode.content : getTeaser(episode.content);

  const currentIndex = allEpisodes.findIndex((e) => e.slug === slug);
  const prevEpisode = currentIndex > 0 ? allEpisodes[currentIndex - 1] : null;
  const nextEpisode =
    currentIndex >= 0 && currentIndex < allEpisodes.length - 1
      ? allEpisodes[currentIndex + 1]
      : null;

  return (
    <main>
      <ReadingProgressBar />
      <ChapterAnalytics
        episodeNumber={episode.number}
        episodeTitle={episode.title}
        access={isFreeEpisode ? "free" : canReadFull ? "premium" : "preview"}
        readingTimeMinutes={episode.readingTimeMinutes}
      />
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
        <div className="mb-2 flex items-center gap-3">
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent)]">
            Puntata {episode.number} di {allEpisodes.filter((e) => e.isPublished).length}
          </p>
          {episode.readingTimeMinutes > 0 && (
            <>
              <span className="text-[var(--border)]" aria-hidden>·</span>
              <span className="text-sm text-[var(--ink-faint)]">
                {episode.readingTimeMinutes} min di lettura
              </span>
            </>
          )}
        </div>
        <h1 className="font-heading text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
          {episode.title}
        </h1>
        {episode.description && (
          <p className="mt-3 text-lg text-[var(--ink-muted)] leading-relaxed max-w-2xl">
            {episode.description}
          </p>
        )}
      </header>

      {/* Content */}
      <article className={canReadFull ? "mb-12" : "teaser-preview"}>
        {episode.isPublished ? (
          <ChapterContent episodeNumber={episode.number} content={content} />
        ) : (
          <p className="text-[var(--ink-muted)]">
            Questa puntata non è ancora online. Intanto puoi leggere le altre.
          </p>
        )}
      </article>

      {/* Key takeaways — only show for full readers */}
      {canReadFull && episode.isPublished && (
        <KeyTakeaways episodeNumber={episode.number} />
      )}

      {isFreeEpisode && <CourseContinuationCard />}

      {/* Paywall */}
      {!canReadFull && episode.isPublished && (
        <PaywallCard isLoggedIn={Boolean(user)} />
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

      {process.env.NODE_ENV === "development" && !isFreeEpisode && (
        <DevUnlockBanner unlocked={devUnlocked} />
      )}

      {canReadFull && episode.isPublished && (
        <TutorPanel
          chapterNumber={episode.number}
          chapterSlug={episode.slug}
          isLoggedIn={Boolean(user)}
        />
      )}
    </main>
  );
}
