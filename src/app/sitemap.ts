import type { MetadataRoute } from "next";
import { getEpisodes } from "@/lib/episodes";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const episodes = getEpisodes();

  const chapterUrls: MetadataRoute.Sitemap = episodes
    .filter((episode) => episode.isPublished)
    .map((episode) => ({
      url: `${SITE_URL}/chapters/${episode.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: episode.number === 1 ? 0.9 : 0.8,
    }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/chapters`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...chapterUrls,
  ];
}
