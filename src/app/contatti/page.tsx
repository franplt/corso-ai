import type { Metadata } from "next";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getPublicPageMarkdown } from "@/lib/public-pages";

const CONTACT_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contatti — Corso AI in 10 puntate",
  url: "https://www.corso-intelligenza-artificiale.com/contatti",
  inLanguage: "it",
  isPartOf: {
    "@type": "WebSite",
    name: "Corso AI in 10 puntate",
    url: "https://www.corso-intelligenza-artificiale.com/",
  },
  about: { "@id": "https://www.corso-intelligenza-artificiale.com/#organization" },
};

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Per domande sul Corso AI in 10 puntate, sull'account o sui tuoi dati, usa i recapiti già indicati nella informativa sulla privacy (/privacy).",
  alternates: {
    canonical: "/contatti",
  },
  openGraph: {
    title: "Contatti",
    description:
      "Per domande sul Corso AI in 10 puntate, sull'account o sui tuoi dati, usa i recapiti già indicati nella informativa sulla privacy (/privacy).",
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

