import type { Metadata } from "next";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getPublicPageMarkdown } from "@/lib/public-pages";

const ABOUT_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Il Corso AI in 10 puntate",
  url: "https://www.corso-intelligenza-artificiale.com/il-corso",
  inLanguage: "it",
  isPartOf: {
    "@type": "WebSite",
    name: "Corso AI in 10 puntate",
    url: "https://www.corso-intelligenza-artificiale.com/",
  },
  about: { "@id": "https://www.corso-intelligenza-artificiale.com/#course" },
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
    </main>
  );
}

