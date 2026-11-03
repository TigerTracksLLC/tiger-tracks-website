'use client';

import Link from 'next/link';
import { CaseStudy } from '@/data/caseStudies';
import { CTASection } from '@/components/CTASection';
import { HockeyStickChart } from '@/components/HockeyStickChart';
import { useInView } from '@/hooks/useInView';

/* ------------------------------------------------------------------ */
/*  Metric type icon helper                                            */
/* ------------------------------------------------------------------ */

const metricTypeLabels: Record<string, string> = {
  cac: 'Acquisition Cost',
  ltv: 'Lifetime Value',
  roas: 'Return on Ad Spend',
  revenue: 'Revenue',
  leads: 'Lead Generation',
  efficiency: 'Efficiency',
};

/* ------------------------------------------------------------------ */
/*  Section 1 - Hero                                                   */
/* ------------------------------------------------------------------ */

function HeroSection({
  client,
  heroMetric,
  heroMetricLabel,
  industry,
  challengeType,
  channels,
  isPlaceholder,
}: {
  client: string;
  heroMetric: string;
  heroMetricLabel: string;
  industry: string;
  challengeType: string;
  channels: string[];
  isPlaceholder?: boolean;
}) {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section className="relative overflow-hidden" style={{
      background: `
        #052E3F
      `,
    }}>
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" style={{
        background: 'transparent',
      }} />
      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-5xl px-6 py-24 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <Link
          href="/results"
          className="inline-flex items-center gap-1 text-tt-gray-400 hover:text-tt-orange transition-colors text-sm mb-10"
        >
          &larr; Back to Case Studies
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="rounded-full bg-transparent border border-tt-teal/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-tt-orange">
            {industry}
          </span>
          <span className="rounded-full bg-black/[0.14] border border-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-tt-gray-400">
            {challengeType}
          </span>
          {channels.map((ch) => (
            <span key={ch} className="rounded-full bg-black/[0.14] border border-white/8 px-3 py-1 text-xs font-medium text-tt-gray-500">
              {ch}
            </span>
          ))}
          {isPlaceholder && (
            <span className="rounded-full bg-transparent border border-tt-orange/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-tt-orange">
              Representative Case Study
            </span>
          )}
        </div>

        <p className="text-tt-orange uppercase tracking-wider text-sm font-semibold mb-4">
          {client}
        </p>
        <p className="text-7xl md:text-9xl font-extrabold text-white leading-none tracking-tight">
          {heroMetric}
        </p>
        <p className="mt-4 text-2xl text-tt-gray-400">{heroMetricLabel}</p>

        {/* Logo placeholder */}
        <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-black/[0.14] border border-white/8">
          <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-xs font-bold text-tt-gray-400">
            {client.charAt(0)}
          </div>
          <span className="text-sm text-tt-gray-400 font-medium">{client}</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 - Problem                                                */
/* ------------------------------------------------------------------ */

function ProblemSection({ problem }: { problem: string }) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  return (
    <section className="py-20 px-6" style={{ background: '#052E3F' }}>
      <div
        ref={ref}
        className={`mx-auto max-w-4xl transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-transparent border border-tt-orange/50 flex items-center justify-center">
            <svg className="w-6 h-6 text-tt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-tt-teal font-semibold">Step 1</p>
            <h2 className="text-3xl font-bold text-white">The Problem</h2>
          </div>
        </div>
        <p className="text-lg text-tt-gray-300 leading-relaxed">{problem}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 - Solution + Wayfinder Spotlight                         */
/* ------------------------------------------------------------------ */

function SolutionSection({
  solution,
  wayfinderTactic,
}: {
  solution: string;
  wayfinderTactic: { title: string; description: string };
}) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  return (
    <section className="py-20 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div
        ref={ref}
        className={`mx-auto max-w-4xl transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-transparent border border-tt-teal/50 flex items-center justify-center">
            <svg className="w-6 h-6 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384-3.19A.75.75 0 005.25 12.72v6.57a.75.75 0 00.786.72h4.065a.75.75 0 00.704-.486l.62-1.736M11.42 15.17l4.655 2.774a.75.75 0 001.175-.65V6.906a.75.75 0 00-1.175-.65L11.42 9.024" />
            </svg>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-tt-teal font-semibold">Step 2</p>
            <h2 className="text-3xl font-bold text-white">Our Approach</h2>
          </div>
        </div>
        <p className="text-lg text-tt-gray-300 leading-relaxed mb-12">{solution}</p>

        {/* Wayfinder AI Spotlight */}
        <div className="rounded-2xl p-8 border border-tt-teal/20" style={{
          background: 'rgba(127, 202, 211, 0.08)',
        }}>
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-tt-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
            <div>
              <p className="text-xs uppercase tracking-wider text-tt-teal font-semibold">Wayfinder AI in Action</p>
              <p className="text-lg font-bold text-tt-teal">{wayfinderTactic.title}</p>
            </div>
          </div>
          <p className="text-tt-gray-300 leading-relaxed">{wayfinderTactic.description}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 - Impact (Results + Chart)                               */
/* ------------------------------------------------------------------ */

function ImpactSection({
  impact,
  results,
  timeline,
}: {
  impact: string;
  results: CaseStudy['results'];
  timeline: CaseStudy['timeline'];
}) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  return (
    <section className="py-20 px-6" style={{ background: '#052E3F' }}>
      <div
        ref={ref}
        className={`mx-auto max-w-4xl transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-transparent border border-tt-orange/50 flex items-center justify-center">
            <svg className="w-6 h-6 text-tt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-tt-teal font-semibold">Step 3</p>
            <h2 className="text-3xl font-bold text-white">The Impact</h2>
          </div>
        </div>

        <p className="text-lg text-tt-gray-300 leading-relaxed mb-12 max-w-4xl">{impact}</p>

        {/* Metric cards */}
        <div
          className={`grid gap-6 mb-16 ${
            results.length === 1
              ? 'max-w-sm mx-auto'
              : results.length === 2
              ? 'max-w-2xl mx-auto sm:grid-cols-2'
              : results.length === 3
              ? 'sm:grid-cols-3'
              : 'sm:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {results.map((result, i) => (
            <div
              key={result.metric}
              className="rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(5, 46, 63, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <p className="text-4xl font-extrabold text-tt-gray-200">{result.value}</p>
              <p className="text-sm text-tt-gray-400 mt-2">{result.metric}</p>
              {result.metricType && (
                <p className="text-[10px] uppercase tracking-wider text-tt-gray-600 mt-1">
                  {metricTypeLabels[result.metricType] || result.metricType}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Hockey Stick Chart */}
        <div className="rounded-2xl p-6 md:p-10" style={{
          background: 'rgba(5, 46, 63, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Performance Timeline</h3>
              <p className="mt-1 text-xs text-tt-gray-400">Illustrative trend. See the results above for reported figures.</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-tt-teal rounded-full inline-block" />
                <span className="text-tt-gray-500">Before</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-tt-orange rounded-full inline-block" />
                <span className="text-tt-gray-500">After Tiger Tracks</span>
              </span>
            </div>
          </div>
          <HockeyStickChart
            before={timeline.before}
            after={timeline.after}
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 - Attribution Proof                                      */
/* ------------------------------------------------------------------ */

function AttributionSection({ attribution }: { attribution: string }) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  return (
    <section className="py-16 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div
        ref={ref}
        className={`mx-auto max-w-4xl transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="rounded-2xl p-8 border border-white/5" style={{
          background: 'rgba(5, 46, 63, 0.5)',
        }}>
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-5 h-5 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <h3 className="text-lg font-bold text-white">How We Tracked It</h3>
            <Link
              href="/results/methodology"
              className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-tt-teal/10 border border-tt-teal/20 px-3 py-1 text-xs font-semibold text-tt-teal transition-colors hover:bg-tt-teal/20"
            >
              Verified attribution
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <p className="text-tt-gray-400 leading-relaxed">{attribution}</p>
          <p className="mt-4 text-xs text-tt-gray-500">
            <Link
              href="/results/methodology"
              className="text-tt-orange hover:text-tt-orange-muted transition-colors underline underline-offset-2"
            >
              See how we measure and verify results
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6 - Testimonial                                            */
/* ------------------------------------------------------------------ */

function TestimonialSection({
  testimonial,
}: {
  testimonial: { quote: string; name: string; title: string; company: string };
}) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  return (
    <section className="py-20 px-6" style={{ background: '#052E3F' }}>
      <div
        ref={ref}
        className={`mx-auto max-w-4xl text-center transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <span className="block text-6xl leading-none text-tt-teal mb-4 select-none" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote className="text-2xl text-tt-gray-300 leading-relaxed">
          {testimonial.quote}
        </blockquote>
        <span className="block text-6xl leading-none text-tt-teal mt-4 select-none" aria-hidden="true">
          &rdquo;
        </span>
        <div className="mt-8">
          <p className="text-white font-semibold">{testimonial.name}</p>
          <p className="text-tt-gray-500 text-sm">
            {testimonial.title}, {testimonial.company}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Assembly                                                      */
/* ------------------------------------------------------------------ */

export function CaseStudyPageClient({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <>
      <HeroSection
        client={caseStudy.client}
        heroMetric={caseStudy.heroMetric}
        heroMetricLabel={caseStudy.heroMetricLabel}
        industry={caseStudy.industry}
        challengeType={caseStudy.challengeType}
        channels={caseStudy.channels}
        isPlaceholder={caseStudy.isPlaceholder}
      />
      <ProblemSection problem={caseStudy.problem} />
      <SolutionSection
        solution={caseStudy.solution}
        wayfinderTactic={caseStudy.wayfinderTactic}
      />
      <ImpactSection
        impact={caseStudy.impact}
        results={caseStudy.results}
        timeline={caseStudy.timeline}
      />
      <AttributionSection attribution={caseStudy.attribution} />
      {caseStudy.testimonial && <TestimonialSection testimonial={caseStudy.testimonial} />}
      <CTASection
        headline="Get results like these"
        subheadline="Book a free Strategic Diagnostic and see what's possible for your brand."
        primaryCTA={{ text: 'Request a Strategic Diagnostic', href: '/get-started' }}
        secondaryCTA={{ text: 'View More Case Studies', href: '/results' }}
        dark
      />
    </>
  );
}
