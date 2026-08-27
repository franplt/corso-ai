import type { Metadata } from "next";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getPublicPageMarkdown } from "@/lib/public-pages";

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
      <MarkdownContent markdown={markdown} />
    </main>
  );
}

