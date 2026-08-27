import type { NextConfig } from "next";
import path from "path";

const scriptSources = [
  "'self'",
  "'unsafe-inline'",
  "https://js.stripe.com",
  "https://va.vercel-scripts.com",
  "https://www.googletagmanager.com",
  "https://*.posthog.com",
];

if (process.env.NODE_ENV === "development") {
  scriptSources.push("'unsafe-eval'");
}

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src ${scriptSources.join(" ")}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.supabase.co https://api.stripe.com https://va.vercel-scripts.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.posthog.com",
      "worker-src 'self' blob: data:",
      "frame-src https://js.stripe.com",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const publicHtmlVaryHeader = {
  key: "Vary",
  value: "Accept, rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch",
};

const nextConfig: NextConfig = {
  agentRules: false,
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/il-corso",
        permanent: true,
      },
      {
        source: "/chi-sono",
        destination: "/il-corso",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contatti",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/",
        headers: [publicHtmlVaryHeader],
      },
      {
        source: "/il-corso",
        headers: [publicHtmlVaryHeader],
      },
      {
        source: "/contatti",
        headers: [publicHtmlVaryHeader],
      },
      {
        source: "/guida/:path*",
        headers: [publicHtmlVaryHeader],
      },
    ];
  },
};

export default nextConfig;
