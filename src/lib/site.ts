/**
 * Canonical origin for the site.
 *
 * The apex domain 301-redirects to the www host, so this MUST include `www`.
 * Pointing canonical tags and sitemap entries at the apex sends search engines
 * to a redirect on every single URL, which wastes crawl budget and muddies
 * which version of a page is authoritative.
 */
export const SITE_URL = "https://www.corso-intelligenza-artificiale.com";

export const SITE_NAME = "Corso AI in 10 puntate";

export const SITE_DESCRIPTION =
  "Capisci davvero come funziona l'AI. 10 puntate per chi non è tecnico, dai token ai modelli agli agenti.";
