import type { Metadata } from "next";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getPublicPageMarkdown } from "@/lib/public-pages";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const CONTACT_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contatti — Corso AI in 10 puntate",
  url: `${SITE_URL}/contatti`,
  inLanguage: "it",
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  about: { "@id": `${SITE_URL}/#organization` },
};

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta Francesco Paltrinieri per domande sul Corso AI in 10 puntate, sull'account, sui pagamenti o sui tuoi dati.",
  alternates: {
    canonical: "/contatti",
  },
  openGraph: {
    title: "Contatti",
    description:
      "Contatta Francesco Paltrinieri per domande sul Corso AI in 10 puntate, sull'account, sui pagamenti o sui tuoi dati.",
    url: "/contatti",
    type: "article",
  },
};

export default async function ContattiPage() {
  const markdown = getPublicPageMarkdown("contatti");
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_PAGE_JSON_LD) }}
      />
      <MarkdownContent markdown={markdown} />
    </main>
  );
}
