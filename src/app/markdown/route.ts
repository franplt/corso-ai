import { getEpisodes } from "@/lib/episodes";
import { getGuideBySlug } from "@/lib/guides";
import { getPublicPageMarkdown } from "@/lib/public-pages";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

const NOT_FOUND_MARKDOWN = `# Pagina non trovata
Questa URL non esiste su corso-intelligenza-artificiale.com.
Home: https://www.corso-intelligenza-artificiale.com/
Prima puntata (gratis): https://www.corso-intelligenza-artificiale.com/chapters/puntata-1-perche-adesso
Mappa per agenti: https://www.corso-intelligenza-artificiale.com/llms.txt
Sitemap: https://www.corso-intelligenza-artificiale.com/sitemap.xml
`;

function homeMarkdown(): string {
  const episodes = getEpisodes().filter((e) => e.isPublished);

  const lines: string[] = [];
  lines.push("# Corso AI in 10 puntate");
  lines.push("");
  lines.push("Corso online · 10 puntate");
  lines.push("");
  lines.push("## Capisci davvero come funziona l'AI. Senza tecnicismi inutili.");
  lines.push("");
  lines.push(
    "Un percorso pensato per chi non è tecnico: pochi minuti a puntata per imparare i concetti chiave e usare l'AI meglio ogni giorno.",
  );
  lines.push("");
  lines.push(`[Leggi la prima puntata gratis](${SITE_URL}/chapters/puntata-1-perche-adesso)`);
  lines.push(`[Vedi tutti i capitoli](${SITE_URL}/chapters)`);
  lines.push("");
  lines.push("Prima puntata gratis. Il resto è un pagamento unico di 9,90 €, accesso a vita.");
  lines.push("");
  lines.push("## Cosa impari");
  lines.push("");
  lines.push("- Dalle basi: dati, token, embedding e Transformer.");
  lines.push("- Come un modello si allena e come genera testo.");
  lines.push("- Uso pratico: RAG, tools, agenti e scelta del modello.");
  lines.push("- Formato breve: 10 capitoli da leggere in pochi minuti.");
  lines.push("");
  lines.push("## Le puntate");
  lines.push("");
  for (const episode of episodes) {
    lines.push(`- [Puntata ${episode.number}: ${episode.title}](${SITE_URL}/chapters/${episode.slug})`);
  }
  lines.push("");

  return lines.join("\n");
}

function ok(markdown: string) {
  return new Response(markdown, {
    status: 200,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      vary: "Accept",
    },
  });
}

function notFound() {
  return new Response(NOT_FOUND_MARKDOWN, {
    status: 404,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      vary: "Accept",
    },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") ?? "/";

  if (path === "/") return ok(homeMarkdown());
  if (path === "/il-corso") return ok(getPublicPageMarkdown("il-corso"));
  if (path === "/contatti") return ok(getPublicPageMarkdown("contatti"));

  if (path.startsWith("/guida/")) {
    const slug = path.replace(/^\/guida\//, "");
    const guide = getGuideBySlug(slug);
    if (!guide) return notFound();
    return ok(guide.markdown);
  }

  return notFound();
}

