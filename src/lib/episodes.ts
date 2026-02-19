import fs from "node:fs";
import path from "node:path";

export type Episode = {
  number: number;
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
};

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

      return {
        number: parsed.number,
        title: parsed.title,
        slug: `puntata-${parsed.number}-${slugify(parsed.title)}`,
        content: fs.readFileSync(path.join(episodesDir, filename), "utf8"),
        isPublished: true,
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
        content: "Questa puntata e in arrivo.",
        isPublished: false,
      });
    }
  }

  return [...byNumber.values()].sort((a, b) => a.number - b.number);
}

export function getEpisodeBySlug(slug: string): Episode | null {
  const episodes = getEpisodes();
  return episodes.find((episode) => episode.slug === slug) ?? null;
}
