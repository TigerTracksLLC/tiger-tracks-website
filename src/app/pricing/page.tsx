import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: '/pricing' },
  title: 'Pricing & Engagements',
  description:
    'Engagements built for every stage of growth, from a free strategic diagnostic to a fully embedded, AI-powered performance team.',
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const tiers = [
  {
    name: 'Growth Diagnostic',
    price: 'Free',
    cadence: '',
    tagline: 'See exactly where revenue is leaking.',
    featured: false,
    cta: 'Get your audit',
    href: '/growth-audit',
    features: [
      'Full-funnel audit across paid, organic, creative & data',
      '90-day growth roadmap',
      'Channel-by-channel teardown',
      'Wayfinder AI opportunity scan',
      '100% yours to keep, no commitment',
    ],
  },
  {
    name: 'Performance Partnership',
    price: 'Custom',
    cadence: '',
    tagline: 'Hands-on execution that compounds.',
    featured: true,
    cta: 'Book a call',
    href: '/growth-audit',
    features: [
      'Everything in the Diagnostic',
      'Paid media management (Meta, Google, TikTok, CTV)',
      'Performance creative & UGC',
      'Lifecycle & retention programs',
      'Live dashboards + monthly reporting',
    ],
  },
  {
    name: 'Full-Funnel + AI',
    price: 'Custom',
    cadence: '',
    tagline: 'Your embedded growth team.',
    featured: false,
    cta: 'Book a call',
    href: '/growth-audit',
    features: [
      'Everything in Performance',
      'Dedicated ex-Google strategists',
      'Proprietary Wayfinder AI engine',
      'Attribution & incrementality modeling',
      'Quarterly executive strategy reviews',
    ],
  },
];

const comparison = [
  { feature: 'Strategic audit & 90-day roadmap', diagnostic: true, performance: true, full: true },
  { feature: 'Paid media management', diagnostic: false, performance: 'All channels', full: 'All channels' },
  { feature: 'Performance creative & UGC', diagnostic: false, performance: true, full: true },
  { feature: 'Lifecycle & retention', diagnostic: false, performance: true, full: true },
  { feature: 'Wayfinder AI engine', diagnostic: 'Scan', performance: true, full: 'Full access' },
  { feature: 'Attribution & incrementality', diagnostic: false, performance: false, full: true },
  { feature: 'Dedicated ex-Google team', diagnostic: false, performance: false, full: true },
];

/* ------------------------------------------------------------------ */
/*  Cells                                                              */
/* ------------------------------------------------------------------ */

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <svg className="mx-auto h-5 w-5 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    );
  }
  if (value === false) {
    return (
      <svg className="mx-auto h-4 w-4 text-tt-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }
  return <span className="text-sm text-tt-gray-300">{value}</span>;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden pb-28 font-sans text-white"
      style={{
        background:
          '#052E3F',
      }}
    >
      {/* ---------------- Hero ---------------- */}
      <section className="mx-auto max-w-3xl px-6 pt-32 text-center lg:pt-40">
        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-tt-orange">
          Pricing & Engagements
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl" style={{ letterSpacing: '-0.02em' }}>
          Engagements built for{' '}
          <span className="text-tt-orange">
            every stage of growth.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-tt-gray-300">
          Start with a free strategic diagnostic. Scale into a hands-on partnership.
          No long-term lock-in, just measurable revenue growth.
        </p>
      </section>

      {/* ---------------- Tier cards ---------------- */}
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 ${
                tier.featured
                  ? 'border-2 border-tt-orange/50 bg-black/[0.14] lg:-translate-y-3'
                  : 'border border-white/10 bg-black/[0.14] hover:-translate-y-1'
              }`}
              style={{ boxShadow: 'none' }}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-tt-orange px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  Most popular
                </span>
              )}

              <p className="font-display text-2xl font-bold leading-tight text-white">{tier.name}</p>
              <p className="mt-1 text-sm text-tt-gray-400">{tier.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-white">{tier.price}</span>
                {tier.cadence && <span className="text-sm text-tt-gray-400">{tier.cadence}</span>}
              </div>

              <ul className="mt-7 space-y-4">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 border-b border-white/5 pb-4 last:border-0">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="text-sm leading-snug text-tt-gray-200">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-base font-semibold transition-all duration-300 ${
                  tier.featured
                    ? 'bg-tt-orange text-white'
                    : 'border border-white/20 text-white hover:border-white/40 hover:bg-white/5'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-tt-gray-500">
          Partnership pricing is scoped to your spend, channels, and goals. The Growth Diagnostic is always free.
        </p>
      </section>

      {/* ---------------- Comparison table ---------------- */}
      <section className="mx-auto mt-28 max-w-5xl px-6">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-transparent px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-tt-orange">
            Comparison
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Choose the engagement that fits your business
          </h2>
        </div>

        <p className="md:hidden mb-3 text-xs text-tt-gray-400">Swipe the table to compare all three engagements.</p>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-black/[0.14]">
                <th className="px-5 py-4 text-sm font-semibold text-tt-gray-300">Features</th>
                <th className="px-5 py-4 text-center text-sm font-semibold text-white">Diagnostic</th>
                <th className="px-5 py-4 text-center text-sm font-semibold text-tt-orange">Performance</th>
                <th className="px-5 py-4 text-center text-sm font-semibold text-white">Full-Funnel</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={row.feature} className={i % 2 ? 'bg-black/[0.14]' : ''}>
                  <td className="border-t border-white/5 px-5 py-4 text-sm text-tt-gray-200">{row.feature}</td>
                  <td className="border-t border-white/5 px-5 py-4 text-center"><Cell value={row.diagnostic} /></td>
                  <td className="border-t border-white/5 bg-transparent px-5 py-4 text-center"><Cell value={row.performance} /></td>
                  <td className="border-t border-white/5 px-5 py-4 text-center"><Cell value={row.full} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/growth-audit"
            className="inline-flex items-center justify-center rounded-full bg-tt-orange px-9 py-4 text-base font-semibold text-white transition-all duration-300"
          >
            Start with a free Strategic Diagnostic
          </Link>
        </div>
      </section>
    </main>
  );
}
