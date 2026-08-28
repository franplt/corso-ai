import "server-only";

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalRateLimits = globalThis as typeof globalThis & {
  corsoTutorRateLimits?: Map<string, RateLimitEntry>;
};

const entries =
  globalRateLimits.corsoTutorRateLimits ??
  (globalRateLimits.corsoTutorRateLimits = new Map<string, RateLimitEntry>());

export function checkTutorRateLimit(key: string, now = Date.now()) {
  const current = entries.get(key);

  if (!current || current.resetAt <= now) {
    entries.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
