import type { Metadata } from "next";
import { ChapterCard } from "@/components/ChapterCard";
import { TrackedLink } from "@/components/TrackedLink";
import { getEpisodes } from "@/lib/episodes";

export const metadata: Metadata = {
  title: "Tutte le puntate",
  description:
    "Scopri le 10 puntate del corso AI per non tecnici: dai token ai Transformer, fino a RAG e agenti. La prima puntata è gratuita.",
  alternates: {
    canonical: "/chapters",
  },
  openGraph: {
    title: "Tutte le puntate — Corso AI in 10 puntate",
    description:
      "Scopri le 10 puntate del corso AI per non tecnici. La prima puntata è gratuita.",
    url: "/chapters",
    type: "website",
  },
};

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
        <TrackedLink
          href="/chapters/puntata-1-perche-adesso"
          className="btn btn-primary mt-6"
          eventName="select_content"
          eventParameters={{
            content_type: "chapter_catalog_cta",
            content_id: "free_chapter",
            chapter_number: 1,
          }}
        >
          Inizia dalla prima puntata gratis
        </TrackedLink>
      </div>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {episodes.map((episode) => (
          <ChapterCard key={episode.slug} episode={episode} />
        ))}
      </section>
    </main>
  );
}
