import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRODUCTION_HOSTS = new Set([
  "www.corso-intelligenza-artificiale.com",
  "corso-intelligenza-artificiale.com",
]);

function getHostname(request: NextRequest): string | null {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host =
    (forwardedHost ? forwardedHost.split(",")[0] : null)?.trim() ?? request.headers.get("host");

  if (!host) return null;

  const withoutPort = host.split(":")[0]?.trim().toLowerCase();
  if (!withoutPort) return null;

  // Some proxies may include a trailing dot in the Host header.
  return withoutPort.endsWith(".") ? withoutPort.slice(0, -1) : withoutPort;
}

export function middleware(request: NextRequest) {
  const hostname = getHostname(request);

  // If we can't determine the host, be safe and prevent indexing.
  const isProductionHost = hostname ? PRODUCTION_HOSTS.has(hostname) : false;
  if (isProductionHost) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-robots-tag": "noindex, nofollow",
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set("x-robots-tag", "noindex, nofollow");
  return response;
}

