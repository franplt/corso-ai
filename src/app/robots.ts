import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { SITE_URL } from "@/lib/site";
import { getRequestHost, isProductionHost } from "@/lib/hosts";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = getRequestHost(await headers());

  if (!isProductionHost(host)) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/account"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
