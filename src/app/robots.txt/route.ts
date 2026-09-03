import { headers } from "next/headers";

import { SITE_URL } from "@/lib/site";
import { getRequestHost, isProductionHost } from "@/lib/hosts";

export async function GET(): Promise<Response> {
  const host = getRequestHost(await headers());

  if (!isProductionHost(host)) {
    return new Response(["User-Agent: *", "Disallow: /", ""].join("\n"), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  return new Response(
    [
      "User-Agent: *",
      "Allow: /",
      "Disallow: /api/",
      "Disallow: /account",
      `LLMs: ${SITE_URL}/llms.txt`,
      `Sitemap: ${SITE_URL}/sitemap.xml`,
      "",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
}
