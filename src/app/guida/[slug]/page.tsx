import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getGuideBySlug, getGuides } from "@/lib/guides";
import { getGuideFaqJsonLd } from "@/lib/guide-faq";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}

function firstParagraph(markdown: string): string {
  const lines = markdown.split("\n");
  const startIdx = lines.findIndex((line) => line.trim().length > 0 && !line.startsWith("#"));
  if (startIdx === -1) return "";
  const collected: string[] = [];
  for (let i = startIdx; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.trim() === "") break;
    if (line.startsWith("#")) continue;
    collected.push(line.trim());
  }
  return collected.join(" ").trim();
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const description = firstParagraph(guide.markdown);
  return {
    title: guide.title,
    description,
    alternates: {
      canonical: guide.urlPath,
    },
    openGraph: {
      title: guide.title,
      description,
      url: guide.urlPath,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const faqJsonLd = getGuideFaqJsonLd(guide.urlPath);

  return (
    <main>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <MarkdownContent markdown={guide.markdown} />
    </main>
  );
}

