import { ChapterCard } from "@/components/ChapterCard";
import { getEpisodes } from "@/lib/episodes";

export default function ChaptersPage() {
  const episodes = getEpisodes();

  return (
    <main>
      <div className="mb-10 sm:mb-14">
        <h1 className="font-heading mb-3 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
          Tutte le puntate
        </h1>
        <p className="max-w-xl text-[var(--ink-muted)]">
          La puntata 1 è gratuita. Dalla 2 alla 10 sblocchi tutto il corso con un
          unico pagamento di €9,90.
        </p>
      </div>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {episodes.map((episode) => (
          <ChapterCard key={episode.slug} episode={episode} />
        ))}
      </section>
    </main>
  );
}
