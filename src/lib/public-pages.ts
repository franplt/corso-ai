import fs from "node:fs";
import path from "node:path";

export type PublicPageKey = "il-corso" | "contatti";

const pagesDir = path.join(process.cwd(), "content", "pages");

const PAGE_FILES: Record<PublicPageKey, string> = {
  "il-corso": "il-corso.md",
  contatti: "contatti.md",
};

export function getPublicPageMarkdown(key: PublicPageKey): string {
  const filename = PAGE_FILES[key];
  const filePath = path.join(pagesDir, filename);
  return fs.readFileSync(filePath, "utf8");
}

