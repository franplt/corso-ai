import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

function wantsMarkdown(request: NextRequest): boolean {
  const accept = request.headers.get("accept");
  return Boolean(accept && accept.toLowerCase().includes("text/markdown"));
}

function isMarkdownExcludedPath(pathname: string): boolean {
  if (pathname === "/llms.txt") return true;
  if (pathname === "/__markdown") return true;
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/api")) return true;
  if (pathname.startsWith("/account")) return true;
  if (pathname.startsWith("/login")) return true;
  if (pathname.startsWith("/signup")) return true;
  if (pathname.startsWith("/reset-password")) return true;
  if (pathname.startsWith("/payment")) return true;
  if (pathname.startsWith("/chapters")) return true;
  if (pathname.startsWith("/privacy")) return true;
  if (pathname.startsWith("/terms")) return true;
  if (pathname.includes(".")) return true; // assets (png, ico, etc.)
  return false;
}

function needsSessionRefresh(pathname: string): boolean {
  if (pathname.startsWith("/account")) return true;
  if (pathname === "/login") return true;
  if (pathname === "/signup") return true;
  if (pathname.startsWith("/payment")) return true;
  if (pathname.startsWith("/reset-password")) return true;
  if (
    pathname.startsWith("/chapters/") &&
    pathname !== "/chapters/puntata-1-perche-adesso"
  ) {
    return true;
  }
  return false;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (wantsMarkdown(request) && !isMarkdownExcludedPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/__markdown";
    url.search = "";
    url.searchParams.set("path", pathname);
    return NextResponse.rewrite(url);
  }

  if (needsSessionRefresh(pathname)) {
    return updateSession(request);
  }

  return NextResponse.next({
    request,
  });
}

export const config = {
  /**
   * Only run the Supabase session refresh on routes that actually need a
   * signed-in user.
   *
   * The previous matcher ran on every request, including the homepage, the
   * chapter index and the free episode. Each of those paid a blocking
   * round-trip to Supabase (`auth.getUser()`) before any HTML was produced,
   * on top of the identical call the root layout was already making.
   *
   * Public marketing and content pages are now left alone so they can be
   * served straight from the CDN.
   */
  matcher: ["/:path*"],
};
