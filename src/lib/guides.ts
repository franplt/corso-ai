import fs from "node:fs";
import path from "node:path";

export type Guide = {
  slug: string;
  urlPath: string;
  title: string;
  markdown: string;
};

const guidesDir = path.join(process.cwd(), "content", "guides");

function parseSlugLine(firstLine: string): string | null {
  const match = firstLine
    .trim()
    .match(/^<!--\s*(?:slug:\s*)?(\/guida\/[a-z0-9-]+)\s*-->$/i);
  if (!match) return null;
  return match[1];
}

function extractTitle(markdown: string): string {
  const lines = markdown.split("\n");
  const titleLine = lines.find((line) => line.startsWith("# "));
  return titleLine ? titleLine.replace(/^#\s+/, "").trim() : "Guida";
}

export function getGuides(): Guide[] {
  if (!fs.existsSync(guidesDir)) return [];

  const guides: Guide[] = [];

  for (const filename of fs.readdirSync(guidesDir)) {
    if (!filename.endsWith(".md")) continue;
    const filePath = path.join(guidesDir, filename);
    const raw = fs.readFileSync(filePath, "utf8");

    const [firstLine, ...rest] = raw.split("\n");
    const urlPath = firstLine ? parseSlugLine(firstLine) : null;
    if (!urlPath) {
      continue;
    }

    const markdown = rest.join("\n").trimStart();
    const slug = urlPath.replace(/^\/guida\//, "");
    guides.push({
      slug,
      urlPath,
      title: extractTitle(markdown),
      markdown,
    });
  }

  guides.sort((a, b) => a.urlPath.localeCompare(b.urlPath));
  return guides;
}

export function getGuideBySlug(slug: string): Guide | null {
  return getGuides().find((guide) => guide.slug === slug) ?? null;
}

