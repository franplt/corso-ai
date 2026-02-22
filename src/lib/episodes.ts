import fs from "node:fs";
import path from "node:path";

export type Episode = {
  number: number;
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
  description: string;
  readingTimeMinutes: number;
};

const EPISODE_DESCRIPTIONS: Record<number, string> = {
  1: "Tre motivi concreti per cui l'AI ha fatto il salto proprio ora — e perché capire come funziona è più utile che mai.",
  2: "Dal riconoscimento dei gatti ai miliardi di parametri: cosa c'è davvero dentro un modello AI.",
  3: "Il testo che scrivi non è quello che il modello vede. Scopri i token, l'unità base di ogni LLM.",
  4: "Come fa un modello a sapere che 'gatto' e 'felino' sono simili? La risposta sono gli embedding.",
  5: "L'architettura che ha cambiato tutto: come funziona l'attenzione e perché il Transformer scala meglio di tutto il resto.",
  6: "Pre-training, fine-tuning, RLHF: il percorso completo da un corpus grezzo a un assistente conversazionale.",
  7: "L'AI non recupera risposte: le costruisce token per token. Temperatura, sampling e perché questo cambia tutto.",
  8: "Come dare al modello informazioni aggiornate: il pipeline RAG, le API esterne e quando usarli davvero.",
  9: "Quando il modello smette di rispondere e inizia ad agire: il loop osserva–ragiona–agisce spiegato passo per passo.",
  10: "Benchmark, costi, context window e velocità: i criteri pratici per scegliere il modello giusto per ogni uso.",
};

function computeReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

const episodesDir = process.cwd();

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseFilename(filename: string): { number: number; title: string } | null {
  const match = filename.match(/^(\d+)\.\s(.+)\.md$/);
  if (!match) {
    return null;
  }

  return {
    number: Number.parseInt(match[1], 10),
    title: match[2],
  };
}

function readPublishedEpisodes(): Episode[] {
  if (!fs.existsSync(episodesDir)) {
    return [];
  }

  const parsedEpisodes = fs
    .readdirSync(episodesDir)
    .map((filename): Episode | null => {
      const parsed = parseFilename(filename);
      if (!parsed) {
        return null;
      }

      const content = fs.readFileSync(path.join(episodesDir, filename), "utf8");
      return {
        number: parsed.number,
        title: parsed.title,
        slug: `puntata-${parsed.number}-${slugify(parsed.title)}`,
        content,
        isPublished: true,
        description: EPISODE_DESCRIPTIONS[parsed.number] ?? "",
        readingTimeMinutes: computeReadingTime(content),
      };
    })
    .filter((episode): episode is Episode => episode !== null);

  return parsedEpisodes.sort((a, b) => a.number - b.number);
}

export function getEpisodes(): Episode[] {
  const published = readPublishedEpisodes();
  const byNumber = new Map<number, Episode>();

  for (const episode of published) {
    byNumber.set(episode.number, episode);
  }

  for (let number = 1; number <= 10; number += 1) {
    if (!byNumber.has(number)) {
      byNumber.set(number, {
        number,
        title: "In arrivo",
        slug: `puntata-${number}-in-arrivo`,
        content: "Questa puntata è in arrivo.",
        isPublished: false,
        description: EPISODE_DESCRIPTIONS[number] ?? "",
        readingTimeMinutes: 0,
      });
    }
  }

  return [...byNumber.values()].sort((a, b) => a.number - b.number);
}

export function getEpisodeBySlug(slug: string): Episode | null {
  const episodes = getEpisodes();
  return episodes.find((episode) => episode.slug === slug) ?? null;
}
