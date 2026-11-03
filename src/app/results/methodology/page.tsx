import type { Metadata } from 'next';
import Link from 'next/link';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'How We Measure & Verify Results',
  description:
    'Our measurement methodology: how Tiger Tracks attributes performance, defines metrics like CAC, ROAS, LTV, and CVR, runs incrementality tests, and the honest limitations of attribution.',
  alternates: { canonical: '/results/methodology' },
  openGraph: {
    title: 'How We Measure & Verify Results | Tiger Tracks',
    description:
      'How Tiger Tracks attributes performance, defines core metrics, runs incrementality tests, and where attribution has real limits.',
    url: 'https://tigertracks.ai/results/methodology',
    images: [{ url: 'https://tigertracks.ai/images/og-brand.png' }],
  },
};

/* ------------------------------------------------------------------ */
/*  Small presentational helpers                                       */
/* ------------------------------------------------------------------ */

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[3px] text-tt-orange mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">{title}</h2>
      <div className="space-y-4 text-tt-gray-400 leading-relaxed text-[15px] md:text-base">
        {children}
      </div>
    </section>
  );
}

function MetricCard({
  label,
  abbr,
  definition,
  measured,
}: {
  label: string;
  abbr: string;
  definition: string;
  measured: string;
}) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: 'rgba(5, 46, 63, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-lg font-bold text-tt-teal">{abbr}</span>
        <span className="text-sm text-tt-gray-500">{label}</span>
      </div>
      <p className="text-sm text-tt-gray-300 leading-relaxed">{definition}</p>
      <p className="mt-3 text-xs text-tt-gray-500 leading-relaxed">
        <span className="font-semibold text-tt-gray-400">How we measure it: </span>
        {measured}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MethodologyPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden px-6"
        style={{
          background: `
            #052E3F
          `,
        }}
      >
        <div className="relative z-10 mx-auto max-w-3xl py-24">
          <Link
            href="/results"
            className="inline-flex items-center gap-1 text-tt-gray-400 hover:text-tt-orange transition-colors text-sm mb-10"
          >
            &larr; Back to Case Studies
          </Link>
          <p className="text-tt-orange uppercase tracking-[4px] text-sm font-semibold mb-5">
            Measurement & Verification
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
            How we measure &amp; verify results
          </h1>
          <p className="mt-6 text-lg text-tt-gray-400 leading-relaxed">
            Every number we publish is grounded in a defined method. This page
            explains how we attribute performance, how we define the metrics we
            report, how we test for incrementality, and where the limits of
            measurement honestly sit. We would rather show you a smaller number
            we can defend than a larger one we cannot.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="px-6" style={{ background: '#052E3F' }}>
        <div className="mx-auto max-w-3xl py-20">
          <Section eyebrow="Attribution" title="Our Attribution Approach">
            <p>
              No single model tells the whole truth. We triangulate across three
              lenses and reconcile the differences rather than trusting any one in
              isolation.
            </p>
            <p>
              <span className="font-semibold text-tt-gray-300">
                Platform-reported attribution
              </span>{' '}
              (Meta, Google, and similar) is fast and granular, but it tends to
              over-claim because each platform credits conversions to itself
              within its own window. We use it for in-flight optimization, not as
              the final word on contribution.
            </p>
            <p>
              <span className="font-semibold text-tt-gray-300">
                Multi-touch attribution
              </span>{' '}
              distributes credit across the touchpoints in a customer journey. It
              gives a more balanced cross-channel view than last-click, but it is
              still a modeling choice and depends on the quality of the underlying
              tracking.
            </p>
            <p>
              <span className="font-semibold text-tt-gray-300">
                Incrementality
              </span>{' '}
              answers the question the others cannot: what would have happened
              anyway. Where the stakes and budget justify it, incrementality
              testing is the standard we anchor to, because it measures the lift a
              channel actually caused rather than the conversions it merely
              touched.
            </p>
          </Section>

          <Section eyebrow="Definitions" title="How We Define the Core Metrics">
            <p>
              Metrics only mean something when their definition is fixed. Here is
              how we define and measure the headline numbers you will see in our
              case studies.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 mt-6">
              <MetricCard
                abbr="CAC"
                label="Customer Acquisition Cost"
                definition="Total acquisition spend divided by the number of new customers acquired in the same period."
                measured="We agree up front on which costs count (media, fees, sometimes creative) so the denominator is consistent period over period."
              />
              <MetricCard
                abbr="ROAS"
                label="Return on Ad Spend"
                definition="Revenue attributed to advertising divided by the advertising spend that produced it."
                measured="We report the attribution source (platform vs blended) alongside the figure, because a ROAS is only interpretable next to its window and model."
              />
              <MetricCard
                abbr="LTV"
                label="Lifetime Value"
                definition="The total gross profit or revenue a customer is expected to generate over their relationship with the brand."
                measured="Early-stage programs use a defined-horizon proxy (for example 12-month value) rather than a speculative lifetime figure, and we label it as such."
              />
              <MetricCard
                abbr="CVR"
                label="Conversion Rate"
                definition="The share of sessions or users that complete a defined conversion action."
                measured="We fix the numerator (which event counts as a conversion) and the denominator (which traffic is in scope) before any number is reported."
              />
            </div>
          </Section>

          <Section eyebrow="Causality" title="Incrementality Testing">
            <p>
              Incrementality testing is how we separate marketing that caused a
              result from marketing that simply rode alongside one. The common
              methods we use, matched to budget and risk, include:
            </p>
            <ul className="space-y-3 list-none">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-tt-teal shrink-0" />
                <span>
                  <span className="font-semibold text-tt-gray-300">
                    Geo holdouts:
                  </span>{' '}
                  suppressing or scaling spend in matched regions and comparing
                  outcomes against control regions.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-tt-teal shrink-0" />
                <span>
                  <span className="font-semibold text-tt-gray-300">
                    Audience-level experiments:
                  </span>{' '}
                  platform-native conversion lift studies that compare exposed and
                  held-out audiences.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-tt-teal shrink-0" />
                <span>
                  <span className="font-semibold text-tt-gray-300">
                    Spend-step tests:
                  </span>{' '}
                  deliberate increases or pauses, read against a forecast baseline
                  to estimate the marginal contribution of additional budget.
                </span>
              </li>
            </ul>
            <p>
              Results are reported with the test design noted, so the reader knows
              whether a figure reflects measured lift or modeled attribution.
            </p>
          </Section>

          <Section eyebrow="Windows" title="Time Windows & Reporting Periods">
            <p>
              Attribution windows materially change a number, so we state them.
              Click and view windows are agreed at the start of an engagement and
              held constant for the duration, which is what makes period-over-period
              comparison meaningful.
            </p>
            <p>
              For results that compound, we report a clearly labeled before period
              and after period rather than cherry-picking a single peak month.
              Seasonality and promotional spikes are called out where they
              materially affect a result.
            </p>
          </Section>

          <Section eyebrow="Honesty" title="Caveats & Limitations">
            <p>
              Measurement is a discipline of approximation, not certainty. We think
              naming the limits is part of doing it well.
            </p>
            <ul className="space-y-3 list-none">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-tt-orange shrink-0" />
                <span>
                  Signal loss from privacy changes, cookie deprecation, and
                  consent gating means tracked conversions undercount reality, and
                  modeled conversions fill the gap imperfectly.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-tt-orange shrink-0" />
                <span>
                  Attribution assigns credit; it does not prove causation. Only
                  controlled tests get close, and even those carry confidence
                  intervals.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-tt-orange shrink-0" />
                <span>
                  External factors (brand momentum, pricing, PR, market shifts)
                  influence results and cannot always be isolated from marketing
                  effect.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-tt-orange shrink-0" />
                <span>
                  Case-study figures reflect a specific brand, period, and context.
                  They are evidence of what is possible, not a guarantee of what any
                  other brand will achieve.
                </span>
              </li>
            </ul>
            <p>
              When a case study cannot be cleanly measured, we say so. The goal is
              not the most impressive number, it is the most defensible one.
            </p>
          </Section>
        </div>
      </section>

      <CTASection
        headline="Want this level of rigor on your account?"
        subheadline="Book a diagnostic and we will walk you through exactly how we would measure your program."
        primaryCTA={{ text: 'Request a Strategic Diagnostic', href: '/get-started' }}
        secondaryCTA={{ text: 'View Case Studies', href: '/results' }}
        dark
      />
    </div>
  );
}
