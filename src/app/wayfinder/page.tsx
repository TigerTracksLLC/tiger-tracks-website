'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CTASection } from '@/components/CTASection';
import { useInView } from '@/hooks/useInView';

/* ------------------------------------------------------------------ */
/*  Pillar Data                                                         */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    id: 'attribution',
    headline: 'See What’s Actually Driving Revenue',
    body: 'Most attribution tools tell you what happened. Wayfinder tells you what caused it. Multi-touch, data-driven attribution that goes beyond last-click to reveal the true contribution of every channel, creative, and audience segment.',
    stat: 'Budget moves to what actually drives revenue',
    icon: 'attribution',
  },
  {
    id: 'mmm',
    headline: 'Optimize Across Channels, Not Just Within Them',
    body: 'Wayfinder’s MMM engine ingests your full media spend, external signals, and seasonality to build a live model of your marketing system. The result: budget allocations that maximize revenue, not platform-reported ROAS.',
    stat: 'Allocations judged on revenue, not platform ROAS',
    icon: 'mmm',
  },
  {
    id: 'geo',
    headline: 'Own the Results AI Is Reading',
    body: 'Generative Engine Optimization is the search channel most agencies don’t know exists yet. Wayfinder identifies where your brand appears (or doesn’t) in AI-generated answers across ChatGPT, Perplexity, and Google AI Overviews, and builds the content and signal strategy to dominate them.',
    stat: 'Visibility audits across ChatGPT, Perplexity and AI Overviews',
    icon: 'geo',
  },
];

/* ------------------------------------------------------------------ */
/*  SVG Icons                                                           */
/* ------------------------------------------------------------------ */

function PillarIcon({ type }: { type: string }) {
  const shared = 'w-10 h-10';

  if (type === 'attribution') {
    // Branching node graph
    return (
      <svg className={shared} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="3.5" stroke="#FE5E16" strokeWidth="1.5" />
        <circle cx="10" cy="32" r="3.5" stroke="#FE5E16" strokeWidth="1.5" />
        <circle cx="30" cy="32" r="3.5" stroke="#FE5E16" strokeWidth="1.5" />
        <circle cx="30" cy="20" r="2.5" stroke="#FE5E16" strokeWidth="1.5" />
        <line x1="20" y1="11.5" x2="10" y2="28.5" stroke="#7FCAD3" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="11.5" x2="30" y2="17.5" stroke="#7FCAD3" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="30" y1="22.5" x2="30" y2="28.5" stroke="#7FCAD3" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'mmm') {
    // Overlapping wave/signal chart
    return (
      <svg className={shared} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 28C8 28 10 14 14 14C18 14 18 24 22 24C26 24 26 10 30 10C34 10 36 20 36 20" stroke="#7FCAD3" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 32C8 32 10 20 14 20C18 20 20 28 24 28C28 28 30 16 34 16C36 16 36 22 36 22" stroke="#FE5E16" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <path d="M4 34C10 34 12 26 16 26C20 26 22 32 26 32C30 32 32 22 36 22" stroke="#7FCAD3" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      </svg>
    );
  }

  // GEO - Expanding radar/search ring
  return (
    <svg className={shared} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="5" stroke="#FE5E16" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="11" stroke="#7FCAD3" strokeWidth="1" opacity="0.6" />
      <circle cx="20" cy="20" r="17" stroke="#7FCAD3" strokeWidth="0.75" opacity="0.3" />
      <line x1="20" y1="2" x2="20" y2="8" stroke="#7FCAD3" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <line x1="20" y1="32" x2="20" y2="38" stroke="#7FCAD3" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <line x1="2" y1="20" x2="8" y2="20" stroke="#7FCAD3" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <line x1="32" y1="20" x2="38" y2="20" stroke="#7FCAD3" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                        */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      style={{
        background: `
          #052E3F
        `,
      }}
    >
      {/* Atmospheric orbs */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background: `transparent`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-sm font-semibold uppercase tracking-[4px] mb-6"
            style={{ color: '#FE5E16' }}
          >
            Proprietary AI Platform
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            <span style={{ color: '#EFF0EF' }}>
              The intelligence layer your agency should have built years ago.
            </span>
          </h1>

          <p
            className="mt-8 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto long-copy"
            style={{ color: '#A9B6BA' }}
          >
            Wayfinder is Tiger Tracks&apos; proprietary AI platform, built by an ex-Google-led team
            to do what no off-the-shelf tool can: optimize your entire media mix in real time,
            across every channel, against your actual business outcomes.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3">
            <Link
              href="/get-started"
              className="inline-block rounded-full px-10 py-4 text-lg font-semibold text-tt-ink transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{ backgroundColor: '#FE5E16' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FE5E16')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FE5E16')}
            >
              Run Wayfinder on Your Account
            </Link>
            <p className="text-sm" style={{ color: '#91A2A9' }}>
              See where your budget is leaking, live, in 30 minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Three-Pillar Feature Section                                        */
/* ------------------------------------------------------------------ */

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div
        className="relative rounded-2xl p-8 sm:p-10 h-full backdrop-blur-sm overflow-hidden"
        style={{
          backgroundColor: 'rgba(5, 46, 63, 0.7)',
          border: '1px solid rgba(127, 202, 211, 0.2)',
        }}
      >
        {/* Subtle top-edge glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3"
          style={{
            background:
              'rgba(127, 202, 211, 0.4)',
          }}
        />

        <div className="flex items-start gap-5">
          <div
            className="flex-shrink-0 rounded-xl p-3"
            style={{ backgroundColor: 'rgba(127, 202, 211, 0.08)' }}
          >
            <PillarIcon type={pillar.icon} />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="text-xl font-bold mb-3"
              style={{ color: '#EFF0EF' }}
            >
              {pillar.headline}
            </h3>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: '#A9B6BA' }}
            >
              {pillar.body}
            </p>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
              style={{
                backgroundColor: 'rgba(127, 202, 211, 0.08)',
                border: '1px solid rgba(127, 202, 211, 0.2)',
                color: '#7FCAD3',
              }}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              {pillar.stat}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PillarsSection() {
  return (
    <section
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background: `
          #052E3F
        `,
      }}
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p
            className="text-sm font-semibold uppercase tracking-[4px] mb-4"
            style={{ color: '#FE5E16' }}
          >
            What Powers Wayfinder
          </p>
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: '#EFF0EF' }}
          >
            Three pillars. One unfair advantage.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.id} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Interactive Budget Reallocation Demo                                */
/* ------------------------------------------------------------------ */

/*
 * Sample data only. These channels, starting allocations, and efficiency
 * scores are illustrative numbers used to demonstrate how Wayfinder shifts
 * budget toward higher-performing channels. They are not from a real account.
 */
type Channel = {
  id: string;
  name: string;
  /* Starting share of total budget, as a percentage. Sums to 100. */
  start: number;
  /* Relative efficiency / ROAS score. Higher means more revenue per dollar. */
  efficiency: number;
};

const DEMO_CHANNELS: Channel[] = [
  { id: 'google', name: 'Google Ads', start: 30, efficiency: 5.2 },
  { id: 'meta', name: 'Meta', start: 28, efficiency: 3.4 },
  { id: 'tiktok', name: 'TikTok', start: 18, efficiency: 2.6 },
  { id: 'ctv', name: 'CTV', start: 14, efficiency: 4.1 },
  { id: 'seo', name: 'SEO / Organic', start: 10, efficiency: 6.0 },
];

/* Baseline blended ROAS, weighted by starting allocation. */
const BASELINE_ROAS =
  DEMO_CHANNELS.reduce((sum, c) => sum + (c.start / 100) * c.efficiency, 0);

/*
 * Reallocate budget toward higher-efficiency channels.
 * `aggressiveness` (0 to 1) controls how far we move from the starting mix
 * toward an efficiency-weighted target mix. A simple, transparent client-side
 * model for illustration.
 */
function optimizeAllocation(aggressiveness: number) {
  const totalEff = DEMO_CHANNELS.reduce((s, c) => s + c.efficiency, 0);

  return DEMO_CHANNELS.map((c) => {
    const target = (c.efficiency / totalEff) * 100;
    const next = c.start + (target - c.start) * aggressiveness;
    return { ...c, allocation: next };
  });
}

function WayfinderDemo() {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const prefersReducedMotion = useReducedMotion();

  /* 0 = starting mix (before), up to 1 = fully optimized (after). */
  const [aggressiveness, setAggressiveness] = useState(0);

  const allocations = useMemo(
    () => optimizeAllocation(aggressiveness),
    [aggressiveness],
  );

  /* Live computed outputs. */
  const projectedRoas = useMemo(
    () =>
      allocations.reduce(
        (sum, c) => sum + (c.allocation / 100) * c.efficiency,
        0,
      ),
    [allocations],
  );

  /* CAC moves inversely with blended ROAS in this simple model. */
  const cacChangePct = useMemo(() => {
    if (BASELINE_ROAS === 0) return 0;
    const change = (BASELINE_ROAS / projectedRoas - 1) * 100;
    return Math.round(change);
  }, [projectedRoas]);

  /* Plain-language insight reflecting the current state. */
  const insight = useMemo(() => {
    if (aggressiveness <= 0.01) {
      return 'This is your current mix. Run the optimization to see where Wayfinder would move budget.';
    }
    const gainer = [...allocations].sort(
      (a, b) => b.allocation - b.start - (a.allocation - a.start),
    )[0];
    const loser = [...allocations].sort(
      (a, b) => a.allocation - a.start - (b.allocation - b.start),
    )[0];
    const shift = Math.round(loser.start - loser.allocation);
    return `Shift roughly ${shift}% of budget from ${loser.name} toward ${gainer.name}, the higher-efficiency channel. Projected blended ROAS rises to ${projectedRoas.toFixed(2)}x.`;
  }, [allocations, aggressiveness, projectedRoas]);

  const roasDelta = projectedRoas - BASELINE_ROAS;

  const handleRun = () => {
    setAggressiveness((prev) => (prev >= 0.99 ? 0 : 1));
  };

  /* Reduced motion: skip the spring, snap to the new width. */
  const barTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 120, damping: 18 };

  return (
    <section
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background: `
          #052E3F
        `,
      }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-14">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: '#EFF0EF' }}
          >
            This is what your budget looks like inside Wayfinder
          </h2>
          <p className="mt-4 text-base" style={{ color: '#A9B6BA' }}>
            Move the slider or run the optimization to watch Wayfinder shift
            spend toward your highest-efficiency channels.
          </p>
        </div>

        <div
          ref={ref}
          className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            className="wayfinder-ui-mockup mx-auto rounded-2xl overflow-hidden"
            style={{
              backgroundColor: '#052E3F',
              border: '1px solid rgba(127, 202, 211, 0.35)',
              boxShadow: 'none',
              maxWidth: '1000px',
            }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
              <div className="flex gap-1.5" aria-hidden="true">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <div className="ml-3 flex items-center gap-2">
                <span
                  className="text-[10px] font-semibold tracking-wider"
                  style={{ color: '#7FCAD3' }}
                >
                  WAYFINDER
                </span>
                <span className="text-[10px]" style={{ color: '#91A2A9' }}>
                  |
                </span>
                <span className="text-[10px]" style={{ color: '#91A2A9' }}>
                  Budget Optimization Demo
                </span>
              </div>
              <span
                className="ml-auto text-[9px] font-semibold uppercase tracking-wider rounded px-2 py-0.5"
                style={{
                  color: '#FE5E16',
                  border: '1px solid rgba(254, 94, 22, 0.35)',
                  backgroundColor: 'transparent',
                }}
              >
                Sample data
              </span>
            </div>

            {/* Demo content */}
            <div className="p-5 md:p-8">
              {/* Live KPI row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div
                  className="rounded-lg p-3"
                  style={{
                    background: 'rgba(0, 0, 0, 0.14)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                  }}
                >
                  <p
                    className="text-[9px] uppercase tracking-wider"
                    style={{ color: '#91A2A9' }}
                  >
                    Projected Blended ROAS
                  </p>
                  <p
                    className="mt-1 text-lg font-bold"
                    style={{ color: '#7FCAD3' }}
                    aria-live="polite"
                  >
                    {projectedRoas.toFixed(2)}x
                  </p>
                  <p
                    className="text-[11px] font-semibold"
                    style={{ color: roasDelta >= 0 ? '#7FCAD3' : '#FE5E16' }}
                  >
                    {roasDelta >= 0 ? '+' : ''}
                    {roasDelta.toFixed(2)}x vs baseline
                  </p>
                </div>

                <div
                  className="rounded-lg p-3"
                  style={{
                    background: 'rgba(0, 0, 0, 0.14)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                  }}
                >
                  <p
                    className="text-[9px] uppercase tracking-wider"
                    style={{ color: '#91A2A9' }}
                  >
                    Projected CAC Change
                  </p>
                  <p
                    className="mt-1 text-lg font-bold text-white"
                    aria-live="polite"
                  >
                    {cacChangePct > 0 ? '+' : ''}
                    {cacChangePct}%
                  </p>
                  <p
                    className="text-[11px] font-semibold"
                    style={{ color: cacChangePct <= 0 ? '#7FCAD3' : '#FE5E16' }}
                  >
                    {cacChangePct <= 0
                      ? 'Lower acquisition cost'
                      : 'Higher acquisition cost'}
                  </p>
                </div>

                <div
                  className="rounded-lg p-3"
                  style={{
                    background: 'rgba(0, 0, 0, 0.14)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                  }}
                >
                  <p
                    className="text-[9px] uppercase tracking-wider"
                    style={{ color: '#91A2A9' }}
                  >
                    Optimization
                  </p>
                  <p
                    className="mt-1 text-lg font-bold text-white"
                    aria-live="polite"
                  >
                    {Math.round(aggressiveness * 100)}%
                  </p>
                  <p
                    className="text-[11px] font-semibold"
                    style={{ color: '#91A2A9' }}
                  >
                    aggressiveness
                  </p>
                </div>
              </div>

              {/* Channel bars (before vs after) */}
              <div
                className="rounded-lg p-4 mb-6"
                style={{
                  background: 'rgba(0, 0, 0, 0.14)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <p
                    className="text-[10px] uppercase tracking-wider"
                    style={{ color: '#91A2A9' }}
                  >
                    Budget Allocation by Channel
                  </p>
                  <div className="flex items-center gap-4 text-[10px]">
                    <span className="flex items-center gap-1.5" style={{ color: '#91A2A9' }}>
                      <span
                        className="inline-block h-2 w-3 rounded-sm"
                        style={{ backgroundColor: 'rgba(159, 176, 183, 0.35)' }}
                        aria-hidden="true"
                      />
                      Before
                    </span>
                    <span className="flex items-center gap-1.5" style={{ color: '#7FCAD3' }}>
                      <span
                        className="inline-block h-2 w-3 rounded-sm"
                        style={{ backgroundColor: '#7FCAD3' }}
                        aria-hidden="true"
                      />
                      After
                    </span>
                  </div>
                </div>

                <ul className="space-y-4">
                  {allocations.map((c) => {
                    const moved = c.allocation - c.start;
                    return (
                      <li key={c.id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className="text-xs font-medium"
                            style={{ color: '#EFF0EF' }}
                          >
                            {c.name}
                            <span
                              className="ml-2 text-[10px] font-normal"
                              style={{ color: '#91A2A9' }}
                            >
                              {c.efficiency.toFixed(1)}x efficiency
                            </span>
                          </span>
                          <span
                            className="text-xs font-semibold tabular-nums"
                            style={{ color: '#7FCAD3' }}
                          >
                            {c.allocation.toFixed(0)}%
                            {Math.abs(moved) >= 0.5 && (
                              <span
                                className="ml-1.5 text-[10px]"
                                style={{
                                  color: moved > 0 ? '#7FCAD3' : '#FE5E16',
                                }}
                              >
                                ({moved > 0 ? '+' : ''}
                                {moved.toFixed(0)})
                              </span>
                            )}
                          </span>
                        </div>
                        {/* Track with a faint "before" reference and an animated "after" fill. */}
                        <div
                          className="relative h-3 w-full rounded-full overflow-hidden"
                          style={{ backgroundColor: 'rgba(0, 0, 0, 0.14)' }}
                          role="img"
                          aria-label={`${c.name}: starting allocation ${c.start} percent, projected allocation ${c.allocation.toFixed(0)} percent`}
                        >
                          {/* Before reference marker */}
                          <div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                              width: `${c.start}%`,
                              backgroundColor: 'rgba(159, 176, 183, 0.22)',
                            }}
                            aria-hidden="true"
                          />
                          {/* Animated after fill */}
                          <motion.div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                              background:
                                '#7FCAD3',
                            }}
                            initial={false}
                            animate={{ width: `${c.allocation}%` }}
                            transition={barTransition}
                            aria-hidden="true"
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Controls */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex-1">
                  <label
                    htmlFor="wf-aggressiveness"
                    className="block text-[11px] uppercase tracking-wider mb-2"
                    style={{ color: '#91A2A9' }}
                  >
                    Optimization aggressiveness
                  </label>
                  <input
                    id="wf-aggressiveness"
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={Math.round(aggressiveness * 100)}
                    onChange={(e) =>
                      setAggressiveness(Number(e.target.value) / 100)
                    }
                    className="w-full accent-[#7FCAD3] cursor-pointer"
                    aria-label="Optimization aggressiveness, percent"
                    aria-valuetext={`${Math.round(aggressiveness * 100)} percent`}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleRun}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-tt-ink transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ backgroundColor: '#FE5E16', outlineColor: '#FE5E16' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#FE5E16')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#FE5E16')
                  }
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                    />
                  </svg>
                  {aggressiveness >= 0.99
                    ? 'Reset to current mix'
                    : 'Run Wayfinder optimization'}
                </button>
              </div>

              {/* AI insight */}
              <div
                className="rounded-lg p-4 flex items-start gap-3"
                style={{
                  background: 'rgba(127, 202, 211, 0.05)',
                  border: '1px solid rgba(127, 202, 211, 0.12)',
                }}
              >
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: 'rgba(127, 202, 211, 0.15)' }}
                  aria-hidden="true"
                >
                  <svg
                    className="w-3 h-3"
                    style={{ color: '#7FCAD3' }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                    />
                  </svg>
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: '#A9B6BA' }}
                  aria-live="polite"
                >
                  <span
                    className="font-semibold"
                    style={{ color: '#7FCAD3' }}
                  >
                    Wayfinder:
                  </span>{' '}
                  {insight}
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p
            className="mx-auto mt-4 max-w-[1000px] text-center text-[11px]"
            style={{ color: '#91A2A9' }}
          >
            Illustrative model with sample data. Numbers shown are for
            demonstration only and do not represent a specific account or a
            guaranteed result.
          </p>
        </div>

        {/* How your data is handled */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{
              backgroundColor: 'rgba(5, 46, 63, 0.6)',
              border: '1px solid rgba(127, 202, 211, 0.18)',
            }}
          >
            <h3
              className="text-lg font-bold mb-3"
              style={{ color: '#EFF0EF' }}
            >
              How your data is handled
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: '#A9B6BA' }}
            >
              Wayfinder connects to your ad platforms with read-only access, so
              it can analyze performance without changing your campaigns unless
              you ask it to. We never sell or share your data, and your account
              data stays yours.
              Access is scoped to what the engagement needs and removed when it ends.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function WayfinderPage() {
  return (
    <main>
      <HeroSection />
      <PillarsSection />
      <WayfinderDemo />
      <CTASection
        headline="See what Wayfinder can do for your brand"
        subheadline="A 30-minute live diagnostic on your own account."
        primaryCTA={{ text: 'Run Wayfinder on Your Account', href: '/get-started' }}
        secondaryCTA={{ text: 'Talk to Our Team', href: '/get-started' }}
        dark
        badges={[
          'Built by Ex-Google Operators',
          'Read-Only by Default',
          'Your Data Stays Yours',
        ]}
      />
    </main>
  );
}
