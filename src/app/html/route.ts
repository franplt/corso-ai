import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

function mergeVary(existing: string | null, add: string[]) {
  const parts = (existing ?? "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  const merged = new Set<string>();
  for (const v of add) merged.add(v);
  for (const v of parts) merged.add(v);
  return [...merged].join(", ");
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") ?? "/";

  if (!path.startsWith("/") || path.startsWith("//")) {
    return new Response("Bad Request", { status: 400 });
  }

  const targetUrl = `${SITE_URL}${path}`;

  const upstreamHeaders = new Headers();
  upstreamHeaders.set("accept", "text/html,*/*;q=0.8");
  upstreamHeaders.set("x-internal-html-proxy", "1");

  const userAgent = request.headers.get("user-agent");
  if (userAgent) upstreamHeaders.set("user-agent", userAgent);

  const cookie = request.headers.get("cookie");
  if (cookie) upstreamHeaders.set("cookie", cookie);

  const upstream = await fetch(targetUrl, {
    method: "GET",
    headers: upstreamHeaders,
    redirect: "follow",
    cache: "no-store",
  });

  const body = await upstream.text();
  const headers = new Headers(upstream.headers);

  // The Fetch implementation may transparently decode the upstream body.
  // Avoid sending upstream transfer metadata that could mismatch the decoded body.
  headers.delete("content-encoding");
  headers.delete("content-length");

  headers.set("vary", mergeVary(upstream.headers.get("vary"), ["Accept"]));

  // Ensure the internal marker never leaks to clients.
  headers.delete("x-internal-html-proxy");

  return new Response(body, {
    status: upstream.status,
    headers,
  });
}

