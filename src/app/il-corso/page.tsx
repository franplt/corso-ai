import type { Metadata } from "next";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getPublicPageMarkdown } from "@/lib/public-pages";

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
      <MarkdownContent markdown={markdown} />
    </main>
  );
}

