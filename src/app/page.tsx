import type { Metadata } from "next";
import Link from "next/link";
import { ChapterCard } from "@/components/ChapterCard";
import { TrackedLink } from "@/components/TrackedLink";
import { getEpisodes } from "@/lib/episodes";

const SITE_URL = "https://corso-intelligenza-artificiale.com";

export const metadata: Metadata = {
  title: "Corso AI in 10 puntate — Capisci davvero come funziona l'AI",
  description:
    "Un percorso online per non tecnici: 10 puntate per capire token, modelli, RAG e agenti AI. Prima puntata gratis.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Corso AI in 10 puntate",
    description:
      "Un percorso online per non tecnici: 10 puntate per capire token, modelli, RAG e agenti AI. Prima puntata gratis.",
    url: SITE_URL,
    type: "website",
  },
};

export default function Home() {
  const episodes = getEpisodes();

  return (
    <main>
      {/* Hero */}
      <section className="mb-20 sm:mb-28">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[var(--accent)]">
          Corso online · 10 puntate
        </p>
        <h1 className="font-heading mb-6 max-w-2xl text-4xl font-semibold leading-[1.15] tracking-tight text-[var(--ink)] sm:text-5xl md:text-6xl">
          Capisci davvero come funziona l&apos;AI. Senza tecnicismi inutili.
        </h1>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-[var(--ink-muted)] sm:text-xl">
          Un percorso pensato per chi non è tecnico: pochi minuti a puntata per
          imparare i concetti chiave e usare l&apos;AI meglio ogni giorno.
        </p>
        <div className="flex flex-wrap gap-3">
          <TrackedLink
            href="/chapters/puntata-1-perche-adesso"
            className="btn btn-primary"
            eventName="select_content"
            eventParameters={{ content_type: "hero_cta", content_id: "free_chapter" }}
          >
            Leggi la prima puntata gratis
          </TrackedLink>
          <TrackedLink
            href="/chapters"
            className="btn btn-secondary"
            eventName="select_content"
            eventParameters={{ content_type: "hero_cta", content_id: "chapter_catalog" }}
          >
            Vedi tutti i capitoli
          </TrackedLink>
        </div>
      </section>

      {/* What you get */}
      <section className="mb-20">
        <h2 className="font-heading mb-8 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
          Cosa impari
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {[
            "Dalle basi: dati, token, embedding e Transformer.",
            "Come un modello si allena e come genera testo.",
            "Uso pratico: RAG, tools, agenti e scelta del modello.",
            "Formato breve: 10 capitoli da leggere in pochi minuti.",
          ].map((item, i) => (
            <li
              key={i}
              className="flex gap-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow)] transition-shadow hover:shadow-[var(--shadow-hover)]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-muted)] font-heading text-sm font-semibold text-[var(--accent)]">
                {i + 1}
              </span>
              <span className="text-[var(--ink)]">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Chapter preview */}
      <section className="mb-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-heading text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
            Le puntate
          </h2>
          <Link
            href="/chapters"
            className="shrink-0 text-sm font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            Vedi tutte →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.slice(0, 6).map((episode) => (
            <ChapterCard key={episode.slug} episode={episode} />
          ))}
        </div>
      </section>

      {/* Author */}
      <section className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-8 sm:p-10">
        <p className="mb-1 text-sm font-medium uppercase tracking-widest text-[var(--accent)]">
          Chi c&apos;è dietro al corso
        </p>
        <h2 className="font-heading mb-4 text-2xl font-semibold text-[var(--ink)]">
          Francesco Paltrinieri
        </h2>
        <p className="max-w-2xl leading-relaxed text-[var(--ink-muted)]">
          Lavoro con l&apos;AI ogni giorno e ho scritto questo corso perché continuavo a
          incontrare persone intelligenti che si sentivano escluse dalla conversazione —
          non per mancanza di interesse, ma perché nessuno si era preso la briga di
          spiegarla davvero. Questi dieci capitoli sono quello che avrei voluto leggere
          io quando ho iniziato.
        </p>
      </section>
    </main>
  );
}
