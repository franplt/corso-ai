import type { Metadata } from "next";
import { MarkdownContent } from "@/components/MarkdownContent";
import { TrackedLink } from "@/components/TrackedLink";
import { getPublicPageMarkdown } from "@/lib/public-pages";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const ABOUT_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Il Corso AI in 10 puntate",
  url: `${SITE_URL}/il-corso`,
  inLanguage: "it",
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  about: { "@id": `${SITE_URL}/#course` },
};

export const metadata: Metadata = {
  title: "Il Corso AI in 10 puntate",
  description:
    "È un corso di testo, in italiano, per chi non è tecnico e vuole capire come funziona l'intelligenza artificiale. Dieci puntate brevi: dati, token, modelli, come si genera il testo, RAG, agenti, e come scegliere lo strumento.",
  alternates: {
    canonical: "/il-corso",
  },
  openGraph: {
    title: "Il Corso AI in 10 puntate",
    description:
      "È un corso di testo, in italiano, per chi non è tecnico e vuole capire come funziona l'intelligenza artificiale. Dieci puntate brevi: dati, token, modelli, come si genera il testo, RAG, agenti, e come scegliere lo strumento.",
    url: "/il-corso",
    type: "article",
  },
};

export default async function IlCorsoPage() {
  const markdown = getPublicPageMarkdown("il-corso");
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_PAGE_JSON_LD) }}
      />
      <MarkdownContent markdown={markdown} />
      <aside
        className="mt-10 rounded-[var(--radius-lg)] border-2 border-[var(--accent)] bg-[var(--accent-muted)]/30 p-6 sm:p-8"
        aria-label="Sblocca il corso"
      >
        <h2 className="font-heading text-2xl font-semibold text-[var(--ink)]">
          Pronto a continuare?
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-[var(--ink-muted)]">
          Sblocca le puntate 2–10 con un pagamento unico di 9,90 € su Stripe: accesso a
          vita, nessun abbonamento. Nessuna registrazione obbligatoria prima del pagamento.
        </p>
        <TrackedLink
          href="/payment/checkout?source=course_page"
          className="btn btn-primary mt-6"
          eventName="select_content"
          eventParameters={{
            content_type: "course_page_cta",
            content_id: "purchase_intent",
          }}
        >
          Sblocca le puntate 2–10 · 9,90 €
        </TrackedLink>
      </aside>
    </main>
  );
}

