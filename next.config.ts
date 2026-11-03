import type { NextConfig } from 'next';
import { HELD_SLUGS } from './src/data/publishedPosts';

/**
 * Content-Security-Policy.
 *
 * Rolled out in REPORT-ONLY mode first (header: Content-Security-Policy-Report-Only)
 * so violations are logged without blocking anything. Once the reports show no
 * first-party breakage, switch the header name to `Content-Security-Policy` to
 * enforce. Inline scripts (GTM bootstrap + JSON-LD) currently rely on
 * 'unsafe-inline'; hardening to a per-request nonce via middleware is the
 * recommended follow-up before enforcing.
 */
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://assets.calendly.com https://js.hsforms.net https://js.hs-scripts.com https://js.hscollectedforms.net https://js.hs-banner.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' https://fonts.gstatic.com data:",
  "connect-src 'self' https://api.hsforms.com https://forms.hubspot.com https://www.google-analytics.com https://*.calendly.com https://vitals.vercel-insights.com https://*.hubspot.com",
  "frame-src https://calendly.com https://*.calendly.com https://meetings.hubspot.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.hsforms.com",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()',
  },
  { key: 'Content-Security-Policy-Report-Only', value: cspReportOnly },
];

// Vercel handles Next.js natively with SSR/ISR — no need for static export.
// The previous `output: 'export'` has been removed to enable full Next.js
// features on Vercel (API routes, ISR, middleware, image optimization, etc.).
const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    // Allow external article images (Manus CDN + Notion file uploads).
    // Without these, /_next/image rejects remote URLs with a 400 and
    // article images render as broken alt text.
    remotePatterns: [
      { protocol: 'https', hostname: 'files.manuscdn.com' },
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: 'www.notion.so' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/intelligence',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/get-started',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/results',
        permanent: true,
      },
      {
        source: '/insights/case-studies',
        destination: '/results',
        permanent: true,
      },
      {
        source: '/insights/case-study/capezio',
        destination: '/results/capezio',
        permanent: true,
      },
      {
        source: '/insights/case-study/dovetail',
        destination: '/results/dovetail',
        permanent: true,
      },
      {
        source: '/pe-vc-partners',
        destination: '/pe-vc',
        permanent: true,
      },
      // Legacy / duplicate routes → canonical equivalents (avoid duplicate content).
      {
        source: '/about',
        destination: '/company',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/capabilities',
        permanent: true,
      },
      {
        source: '/case-studies/:slug',
        destination: '/results/:slug',
        permanent: true,
      },
      {
        source: '/insights',
        destination: '/intelligence',
        permanent: true,
      },
      // Placeholder (composite) case studies removed Oct 2026.
      { source: '/results/saas-pipeline-acceleration', destination: '/results', permanent: true },
      { source: '/results/b2b-enterprise-lead-gen', destination: '/results', permanent: true },
      { source: '/results/pe-portfolio-turnaround', destination: '/results', permanent: true },
      // Articles on editorial hold (see src/data/publishedPosts.ts)
      ...[...HELD_SLUGS].map((slug) => ({
        source: `/intelligence/${slug}`,
        destination: '/intelligence',
        permanent: false,
      })),
      {
        source: '/insights/:slug',
        destination: '/intelligence/:slug',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
