import MarkdownIt from "markdown-it";
import { createHighlighter } from "shiki";

const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
});

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: ["python", "javascript", "typescript", "json", "bash", "text"],
    });
  }
  return highlighterPromise;
}

type MarkdownContentProps = {
  markdown: string;
};

export async function MarkdownContent({ markdown }: MarkdownContentProps) {
  const highlighter = await getHighlighter();

  const mdWithHighlight = new MarkdownIt({
    html: false,
    linkify: true,
    breaks: true,
    highlight(code, lang) {
      const validLang = highlighter.getLoadedLanguages().includes(lang as never) ? lang : "text";
      return highlighter.codeToHtml(code, {
        lang: validLang,
        theme: "github-dark",
      });
    },
  });

  const html = mdWithHighlight.render(markdown);
  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
