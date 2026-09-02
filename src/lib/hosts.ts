const PRODUCTION_HOSTS = new Set([
  "www.corso-intelligenza-artificiale.com",
  "corso-intelligenza-artificiale.com",
]);

function normalizeHost(rawHost: string | null): string | null {
  if (!rawHost) return null;
  const first = rawHost.split(",")[0]?.trim();
  if (!first) return null;
  const withoutPort = first.split(":")[0]?.trim();
  if (!withoutPort) return null;
  return withoutPort.toLowerCase();
}

type HeadersLike = {
  get(name: string): string | null;
};

export function getRequestHost(headers: HeadersLike): string | null {
  const forwardedHost = headers.get("x-forwarded-host");
  const host = forwardedHost || headers.get("host");
  return normalizeHost(host);
}

export function isProductionHost(host: string | null): boolean {
  if (!host) return false;
  return PRODUCTION_HOSTS.has(host);
}

