import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return updateSession(request);
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
  matcher: [
    "/account/:path*",
    "/login",
    "/signup",
    "/payment/:path*",
    "/reset-password/:path*",
    // Gated chapters still need the session refreshed server-side so an expired
    // access token does not silently log a paying reader out mid-course.
    // Episode 1 is free, so it is deliberately excluded and stays static.
    "/chapters/:slug((?!puntata-1-perche-adesso$).+)",
  ],
};
