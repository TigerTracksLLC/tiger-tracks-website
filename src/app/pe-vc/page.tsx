'use client';

import Link from 'next/link';
import { motion, useInView as useMotionInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { CTASection } from '@/components/CTASection';
import { useCountUp } from '@/hooks/useCountUp';
import { useInView } from '@/hooks/useInView';

/** Wrapper around framer-motion useInView with a fallback timer */
function useMotionInViewSafe(
  ref: React.RefObject<HTMLElement | null>,
  opts?: Parameters<typeof useMotionInView>[1],
) {
  const framerInView = useMotionInView(ref, opts);
  const [fallback, setFallback] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFallback(true), 1000);
    return () => clearTimeout(t);
  }, []);
  return framerInView || fallback;
}

/* ================================================================== */
/*  ANIMATION PRESETS                                                  */
/* ================================================================== */

const stagger = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } },
  item: { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

/* ================================================================== */
/*  GLASSMORPHISM CARD                                                 */
/* ================================================================== */

const glassCard = {
  background: 'rgba(0, 0, 0, 0.14)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.07)',
} as const;

const glassCardHoverOrange = 'hover:border-tt-orange/30';
const glassCardHoverTeal = 'hover:border-tt-teal/30';

/* ================================================================== */
/*  1. HERO — Cinematic Authority                                      */
/* ================================================================== */

function HeroSection() {
  return (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden">
      {/* Deep layered background */}
      <div className="absolute inset-0" style={{
        background: `
          #052E3F
        `,
      }} />

      {/* Slow-moving abstract grid */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035]" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(127, 202, 211, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(127, 202, 211, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridDrift 25s linear infinite',
        }} />
      </div>

      {/* Radial glow behind text */}
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true" style={{
        background: 'transparent',
      }} />

      {/* MJ hero image, very faint */}
      <div className="pointer-events-none absolute inset-0 z-[3]" aria-hidden="true" style={{
        backgroundImage: 'none' /* brand: no busy photo backgrounds; was url(/images/pevc-hero.webp) */,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.18,
        mixBlendMode: 'luminosity',
      }} />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 py-28 md:py-36"
        variants={stagger.container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={stagger.item}
          className="text-xs font-semibold uppercase tracking-[5px] text-tt-orange"
        >
          For PE &amp; VC funds
        </motion.p>

        <motion.h1
          variants={stagger.item}
          className="mt-7 text-5xl font-extrabold leading-[1.06] tracking-tight text-white md:text-7xl lg:text-[5.25rem]"
        >
          Your portfolio companies
          <br />
          are leaking revenue.
          <br />
          <span className="text-tt-orange">We find where.</span>
        </motion.h1>

        <motion.p
          variants={stagger.item}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-tt-gray-400 md:text-xl"
        >
          Tiger Tracks is a scalable marketing partner for PE and VC funds, built to
          drive EBITDA growth across entire portfolios. Strategic Diagnostics, proprietary
          AI, and a team built at Google.
        </motion.p>

        <motion.div variants={stagger.item} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/get-started"
            className="inline-block rounded-full bg-tt-orange px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-tt-orange-dark hover:-translate-y-0.5 active:translate-y-0"
          >
            Request a Portfolio Audit
          </Link>
          <a
            href="#partner-program"
            className="inline-block rounded-full border border-white/10 bg-black/[0.14] px-8 py-4 text-base font-semibold text-tt-gray-300 backdrop-blur-sm transition-all duration-200 hover:border-tt-teal/40 hover:text-tt-teal hover:-translate-y-0.5"
          >
            See the Partner Program
          </a>
        </motion.div>
      </motion.div>

      {/* CSS keyframe for grid drift */}
      <style jsx>{`
        @keyframes gridDrift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
      `}</style>
    </section>
  );
}

/* ================================================================== */
/*  TRUST BAR — Data ownership, NDA, scoped access                     */
/* ================================================================== */

const trustItems = [
  {
    label: 'Your Accounts, Your Data',
    icon: (
      <svg className="h-5 w-5 text-[#FE5E16]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    label: 'NDA Available on Request',
    icon: (
      <svg className="h-5 w-5 text-[#FE5E16]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    label: 'Least-Privilege Access',
    sublabel: 'Access scoped to the engagement',
    icon: (
      <svg className="h-5 w-5 text-[#FE5E16]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
] as const;

function TrustBar() {
  const ref = useRef(null);
  const isInView = useMotionInViewSafe(ref, { once: true, margin: '-40px' });

  return (
    <section className="relative py-6 px-6" style={{ background: '#052E3F' }}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeUp}
        className="mx-auto max-w-4xl"
      >
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-2xl px-6 py-5 sm:flex-row sm:gap-8"
          style={{
            background: 'rgba(0, 0, 0, 0.14)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {trustItems.map((item, i) => (
            <div key={item.label} className="flex items-center gap-3">
              {i > 0 && (
                <div className="hidden h-5 w-px bg-white/10 sm:block sm:-ml-4 sm:mr-0" aria-hidden="true" />
              )}
              <div className="flex items-center gap-2.5">
                {item.icon}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-tt-gray-300">{item.label}</span>
                  {'sublabel' in item && item.sublabel && (
                    <span className="text-[11px] text-tt-gray-500">{item.sublabel}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================== */
/*  2. THE HIDDEN DRAG — Bento Grid with glowing leak borders          */
/* ================================================================== */

const painPoints = [
  {
    title: 'No Pre-Deal Marketing Diligence',
    description:
      'Funds evaluate financials, operations, and legal with surgical precision but hand a PortCo\'s $500K/month ad budget to a generalist CMO without forensic review.',
    icon: (
      <svg className="h-6 w-6 text-tt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    title: 'No Standardized Reporting',
    description:
      'Every PortCo tracks different KPIs in different dashboards. Fund partners lack a unified view of marketing ROI across the portfolio.',
    icon: (
      <svg className="h-6 w-6 text-tt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    ),
  },
  {
    title: 'EBITDA Blind Spots',
    description:
      'CMOs spending without accountability to unit economics. Unchecked waste drives margin compression that erodes exit multiples over every quarter of a 3-to-5-year hold period.',
    icon: (
      <svg className="h-6 w-6 text-tt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
] as const;

function HiddenDragSection() {
  const containerRef = useRef(null);
  const isInView = useMotionInViewSafe(containerRef, { once: true, margin: '-80px' });
  const { ref: statRef, inView: statInView } = useInView({ threshold: 0.3 });

  return (
    <section className="relative py-28 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger.container}
          className="text-center"
        >
          <motion.p variants={stagger.item} className="text-xs font-semibold uppercase tracking-[5px] text-tt-orange mb-4">
            The Problem
          </motion.p>
          <motion.h2 variants={stagger.item} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The hidden drag on portfolio performance
          </motion.h2>
        </motion.div>

        {/* Giant stat */}
        <div ref={statRef} className="mx-auto mt-16 max-w-md text-center">
          <p
            className={`text-8xl font-extrabold tracking-tighter text-tt-orange transition-all duration-700 sm:text-9xl ${
              statInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
            }`}
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            20%
          </p>
          <p className={`mt-3 text-base text-tt-gray-500 transition-all duration-700 delay-200 ${
            statInView ? 'opacity-100' : 'opacity-0'
          }`}>
            Our thesis: about a fifth of a typical PortCo&apos;s digital ad budget does no work.{' '}
            <a
              href="/intelligence/the-20-percent-problem-why-every-pe-portfolio-company-is-wasting-a-fifth-of-its-ad-budget-and-how-to-find-it-in-14-days"
              className="underline underline-offset-2 text-white"
            >
              Read the analysis
            </a>
          </p>
        </div>

        {/* Bento grid with glassmorphism + orange leak glow on hover */}
        <motion.div
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger.container}
        >
          {painPoints.map((point) => (
            <motion.div
              key={point.title}
              variants={stagger.item}
              className={`group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${glassCardHoverOrange}`}
              style={glassCard}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-transparent border border-tt-orange/40 mb-5 transition-colors duration-300 group-hover:bg-tt-orange/15">
                {point.icon}
              </div>
              <h3 className="text-base font-semibold text-white">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-tt-gray-400">{point.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  3. THREE WAYS WE ACCELERATE — Bento Grid                          */
/* ================================================================== */

const offerings = [
  {
    number: '01',
    title: 'Pre-Deal Digital Diligence Audit',
    tagline: 'Know before you close.',
    description:
      'A forensic marketing audit delivered in 14 days. We evaluate spend efficiency, attribution accuracy, incrementality testing gaps, competitive positioning, technical infrastructure, and growth potential so you can underwrite marketing with the same rigor you bring to financials.',
    deliverables: [
      'Channel-by-channel spend efficiency scorecard',
      'True CAC and LTV:CAC by acquisition source',
      'Growth headroom estimate with EBITDA impact projections',
    ],
  },
  {
    number: '02',
    title: 'The 100-Day PortCo Turnaround',
    tagline: 'From close to compounding growth.',
    description:
      'A structured execution plan deployed immediately post-acquisition to drive measurable EBITDA improvement within the first 100 days. We embed with the PortCo marketing team, restructure campaigns, fix tracking, and build fund-level reporting.',
    deliverables: [
      'Days 1-14: Strategic Diagnostic and quick-win identification',
      'Days 15-45: Campaign architecture rebuild and quick wins',
      'Days 46-100: Optimization, scaling, EBITDA impact quantified',
    ],
  },
  {
    number: '03',
    title: 'Portfolio-Wide Data Standardization',
    tagline: 'One dashboard for every PortCo.',
    description:
      'A unified marketing intelligence layer across your entire portfolio. Standardized KPIs, consistent attribution, and a single fund-level dashboard so operating partners can compare performance and allocate resources without calling five different CMOs.',
    deliverables: [
      'Unified fund-level performance dashboard',
      'Cross-PortCo benchmarking and anomaly detection',
      'Monthly portfolio marketing health reports',
    ],
  },
] as const;

function AccelerateSection() {
  const containerRef = useRef(null);
  const isInView = useMotionInViewSafe(containerRef, { once: true, margin: '-60px' });

  return (
    <section className="py-28 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div ref={containerRef} className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger.container}
          className="text-center mb-16"
        >
          <motion.p variants={stagger.item} className="text-xs font-semibold uppercase tracking-[5px] text-tt-orange mb-4">
            Specialized for M&amp;A
          </motion.p>
          <motion.h2 variants={stagger.item} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Three ways we accelerate portfolio growth
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 lg:grid-cols-3"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger.container}
        >
          {offerings.map((item) => (
            <motion.div
              key={item.number}
              variants={stagger.item}
              className={`group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${glassCardHoverTeal}`}
              style={glassCard}
            >
              <span className="text-5xl font-extrabold tracking-tighter text-tt-teal">{item.number}</span>
              <h3 className="mt-3 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-1 text-sm font-medium text-tt-gray-200">{item.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-tt-gray-400">{item.description}</p>

              <ul className="mt-5 space-y-2">
                {item.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-xs text-tt-gray-500">
                    <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  4. BY THE NUMBERS — Strict 3x2 grid with donut + count-up         */
/* ================================================================== */

function CountUpStat({ end, suffix = '', prefix = '', label, sublabel }: {
  end: number; suffix?: string; prefix?: string; label: string; sublabel: string;
}) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const count = useCountUp(end, 2200, 0, inView);

  return (
    <div
      ref={ref}
      className={`group flex flex-col justify-between rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${glassCardHoverTeal}`}
      style={glassCard}
    >
      <p className="text-5xl font-extrabold tracking-tight text-tt-gray-200" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {prefix}{Math.round(count)}{suffix}
      </p>
      <div className="mt-4">
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="mt-1 text-xs text-tt-gray-500">{sublabel}</p>
      </div>
    </div>
  );
}

function DonutStat({ percent = 90, label, sublabel }: { percent?: number; label: string; sublabel: string }) {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const animatedPercent = useCountUp(percent, 2000, 0, inView);

  const size = 128;
  const strokeWidth = 2;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercent / 100) * circumference;

  return (
    <div
      ref={ref}
      className={`group flex flex-col items-center justify-center rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${glassCardHoverOrange}`}
      style={glassCard}
    >
      <div className="relative">
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full transition-opacity duration-700"
          style={{
            boxShadow: 'none',
            opacity: inView ? 1 : 0,
          }}
        />
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth={strokeWidth}
          />
          {/* Neon orange progress arc */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke="#FE5E16"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={inView ? offset : circumference}
            className="transition-all duration-[2000ms] ease-out"
            style={{ filter: 'none' }}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-2xl font-extrabold tracking-tight text-white"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {Math.round(animatedPercent)}%
        </span>
      </div>
      <p className="mt-5 text-sm font-semibold text-white">{label}</p>
      <p className="mt-1 text-xs text-center text-tt-gray-500">{sublabel}</p>
    </div>
  );
}

function Sparkline({ color = '#FE5E16', seed = 0 }: { color?: string; seed?: number }) {
  // Deterministic upward-trending line points
  const points = [
    [0, 28 - seed * 2],
    [12, 24 - seed],
    [24, 26 - seed * 1.5],
    [36, 18 - seed],
    [48, 20 - seed * 0.5],
    [60, 12],
    [72, 14 - seed * 0.3],
    [84, 6],
    [96, 4],
  ] as const;
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  const areaD = `${pathD} L96,32 L0,32 Z`;

  return (
    <svg viewBox="0 0 96 32" className="h-10 w-24 flex-shrink-0" fill="none">
      {/* Gradient fill under line */}
      <defs>
        <linearGradient id={`spark-fill-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={color} fillOpacity={0.1} />
      <path d={pathD} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const portfolioResults = [
  { client: 'AG1', stat: '+51% customers', secondary: '-5% CAC, -31% Brand Search CAC', color: '#FE5E16', seed: 0 },
  { client: 'Monarch Money', stat: '+368% users', secondary: 'VC-backed fintech', color: '#7FCAD3', seed: 3 },
  { client: 'Online Labels', stat: '+151% profit', secondary: '+42% revenue in 90 days', color: '#FE5E16', seed: 1 },
  { client: 'Rho Nutrition', stat: '+78% revenue', secondary: 'During partnership', color: '#7FCAD3', seed: 2 },
] as const;

function PortfolioResultsSection() {
  const containerRef = useRef(null);
  const isInView = useMotionInViewSafe(containerRef, { once: true, margin: '-60px' });

  return (
    <section className="py-28 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div ref={containerRef} className="mx-auto max-w-4xl">
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger.container} className="text-center mb-14">
          <motion.p variants={stagger.item} className="text-xs font-semibold uppercase tracking-[5px] text-tt-orange mb-4">Proven Results</motion.p>
          <motion.h2 variants={stagger.item} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Results from growth-stage brands</motion.h2>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger.container}
        >
          {portfolioResults.map((r) => (
            <motion.div
              key={r.client}
              variants={stagger.item}
              className="group flex items-center gap-6 rounded-2xl px-8 py-6 transition-all duration-300 hover:-translate-y-0.5"
              style={glassCard}
            >
              {/* Brand name */}
              <div className="w-24 sm:w-36 flex-shrink-0">
                <p className="text-xs font-bold uppercase tracking-wider text-tt-gray-500">{r.client}</p>
              </div>

              {/* Primary stat */}
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-extrabold tracking-tight text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {r.stat}
                </p>
                <p className="mt-0.5 text-xs text-tt-gray-500">{r.secondary}</p>
              </div>

              {/* Sparkline */}
              <div className="hidden sm:block">
                <Sparkline color={r.color} seed={r.seed} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <Link href="/results" className="text-sm font-semibold text-tt-orange transition-colors hover:text-tt-orange">
            View all case studies &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  6. WHAT SUCCESS LOOKS LIKE — Glowing vertical timeline             */
/* ================================================================== */

const timelineSteps = [
  {
    period: 'Week 1-2',
    title: 'Discovery & Audit',
    items: ['Forensic ad account audit', 'Competitive landscape analysis', 'Attribution model review', 'Quick-win identification'],
  },
  {
    period: 'Week 3-4',
    title: 'Strategy & Restructure',
    items: ['Campaign architecture redesign', 'Creative testing framework', 'Tracking infrastructure fixes', 'Baseline KPI dashboard'],
  },
  {
    period: 'Month 2-3',
    title: 'Optimize & Scale',
    items: ['Measurable KPI uplift', 'Cross-channel optimization', 'Expansion roadmap delivery', 'Fund-level reporting live'],
  },
  {
    period: 'Month 4-12',
    title: 'Compound & Expand',
    items: ['Compounding cross-channel impact', 'Project-to-retainer conversion', 'Increased managed ad spend', 'Portfolio-wide playbook rollout'],
  },
] as const;

function TimelineSection() {
  const containerRef = useRef(null);
  const isInView = useMotionInViewSafe(containerRef, { once: true, margin: '-60px' });

  return (
    <section className="py-28 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger.container}
          className="text-center mb-16"
        >
          <motion.p variants={stagger.item} className="text-xs font-semibold uppercase tracking-[5px] text-tt-orange mb-4">
            Post-Acquisition Execution
          </motion.p>
          <motion.h2 variants={stagger.item} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What success looks like
          </motion.h2>
          <motion.p variants={stagger.item} className="mt-4 text-base text-tt-gray-400">
            From audit to compounding growth
          </motion.p>
        </motion.div>

        <motion.div
          ref={containerRef}
          className="relative"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger.container}
        >
          {/* 1px vertical line */}
          <div
            className="absolute left-[7px] top-4 bottom-4 w-px"
            style={{ background: 'rgba(159, 176, 183, 0.12)' }}
          />

          <div className="space-y-10">
            {timelineSteps.map((step) => (
              <motion.div key={step.period} variants={stagger.item} className="relative flex gap-8 md:gap-10">
                {/* Glowing neon orange dot */}
                <div className="relative z-10 flex-shrink-0 mt-2">
                  <div className="h-[14px] w-[14px] rounded-full bg-tt-orange" style={{
                    boxShadow: 'none',
                  }} />
                </div>

                {/* Glassmorphism card */}
                <div
                  className={`flex-1 rounded-2xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-0.5 ${glassCardHoverTeal}`}
                  style={glassCard}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-xs font-bold tracking-tight text-tt-orange"
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      {step.period}
                    </span>
                    <span className="h-px flex-1 bg-black/[0.14]" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-white mb-4">{step.title}</h3>
                  <ul className="space-y-2">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-tt-gray-400">
                        <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  7. PARTNER PROGRAM                                                 */
/* ================================================================== */

const partnerBenefits = [
  {
    title: 'Dedicated Fund Account Lead',
    description: 'A single senior point of contact who understands your portfolio thesis, hold period, and value creation plan.',
    icon: (
      <svg className="h-6 w-6 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: 'Priority Onboarding',
    description: 'When you close a deal, we start the 100-Day Plan within 48 hours. No intake queue.',
    icon: (
      <svg className="h-6 w-6 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Portfolio Pricing',
    description: 'Economies of scale across 5+ PortCos: reduced audit fees, bundled retainer rates, shared infrastructure.',
    icon: (
      <svg className="h-6 w-6 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    title: 'Quarterly Portfolio Reviews',
    description: 'Structured QBRs covering cross-PortCo performance, benchmarks, and strategic recommendations.',
    icon: (
      <svg className="h-6 w-6 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: 'Pre-Deal Diligence on Demand',
    description: 'Evaluating a new target? We deliver a Strategic Diagnostic in 14 days to inform your acquisition thesis.',
    icon: (
      <svg className="h-6 w-6 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    title: 'Proprietary Technology Access',
    description: 'Wayfinder AI and Feed Optimization Platform provide fund-level visibility across every portfolio company we support.',
    icon: (
      <svg className="h-6 w-6 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 14.5M14.25 3.104c.251.023.501.05.75.082M19.8 14.5l-2.116 2.116a4.502 4.502 0 01-6.368 0L9.2 14.5m10.6 0l.4.4a2.25 2.25 0 010 3.182l-3.068 3.068a2.25 2.25 0 01-3.182 0l-.4-.4m0 0l-3.068-3.068a2.25 2.25 0 010-3.182l.4-.4" />
      </svg>
    ),
  },
] as const;

function PartnerProgramSection() {
  const containerRef = useRef(null);
  const isInView = useMotionInViewSafe(containerRef, { once: true, margin: '-60px' });

  return (
    <section id="partner-program" className="py-28 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div ref={containerRef} className="mx-auto max-w-6xl">
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger.container} className="mx-auto max-w-3xl text-center mb-16">
          <motion.p variants={stagger.item} className="text-xs font-semibold uppercase tracking-[5px] text-tt-orange mb-4">
            Fund Partner Program
          </motion.p>
          <motion.h2 variants={stagger.item} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            One partner for your entire portfolio
          </motion.h2>
          <motion.p variants={stagger.item} className="mt-4 text-base text-tt-gray-400">
            When a PE firm brings us 5 or more portfolio companies, they get a dedicated infrastructure designed for fund-level oversight and speed to value.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger.container}
        >
          {partnerBenefits.map((b) => (
            <motion.div
              key={b.title}
              variants={stagger.item}
              className={`group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${glassCardHoverTeal}`}
              style={glassCard}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tt-teal/10 mb-5 transition-colors duration-300 group-hover:bg-tt-teal/15">
                {b.icon}
              </div>
              <h3 className="text-base font-bold text-white">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-tt-gray-400">{b.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="mt-12 text-center"
        >
          <Link
            href="/get-started"
            className="inline-block rounded-full bg-tt-orange px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-tt-orange-dark hover:-translate-y-0.5"
          >
            Explore the Partner Program
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  8. MEET THE FOUNDERS                                               */
/* ================================================================== */

function FoundersSection() {
  const containerRef = useRef(null);
  const isInView = useMotionInViewSafe(containerRef, { once: true, margin: '-60px' });

  return (
    <section className="py-28 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div ref={containerRef} className="mx-auto max-w-2xl">
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger.container}>
          <motion.div variants={stagger.item} className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[5px] text-tt-orange mb-4">Leadership</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Built at Google. Proven in the P&amp;L.</h2>
            <p className="mt-6 text-base text-tt-gray-400 leading-relaxed max-w-xl mx-auto">
              Led by an ex-Google founder and a President who has run growth and operations at global agencies, with senior operators in every pod.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  9. SOCIAL PROOF                                                    */
/* ================================================================== */

function SocialProofSection() {
  const containerRef = useRef(null);
  const isInView = useMotionInViewSafe(containerRef, { once: true, margin: '-40px' });

  return (
    <section className="py-24 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <motion.div
        ref={containerRef}
        className="mx-auto max-w-3xl"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={stagger.container}
      >
        {/* Badge row */}
        <motion.div variants={stagger.item} className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="rounded-full border border-tt-orange/30 bg-transparent px-4 py-2 font-semibold text-tt-orange text-xs tracking-wide">
            Inc. 5000 #123
          </span>
          <span className="rounded-full border border-white/8 bg-black/[0.14] px-4 py-2 text-xs text-tt-gray-400">
            Meta Business Partner
          </span>
          <span className="rounded-full border border-white/8 bg-black/[0.14] px-4 py-2 text-xs text-tt-gray-400">
            Founded by ex-Google
          </span>
        </motion.div>

        <motion.p variants={stagger.item} className="mx-auto mt-5 max-w-md text-center text-xs text-tt-gray-600">
          2,954% three-year revenue growth &bull; Inc. 5000 #123 (2025)
        </motion.p>

        {/* CEO Quote */}
        <motion.blockquote variants={stagger.item} className="mt-14 border-l-2 border-tt-teal/40 pl-7">
          <p className="text-lg leading-relaxed text-tt-gray-300 sm:text-xl">
            &ldquo;As an organization, we credit our accelerated growth to the
            innovative approach we take to optimizing customer acquisition
            programs. This applies to both the brands we work directly with, and
            to the private equity and venture funds we partner with to grow
            their key portfolio companies.&rdquo;
          </p>
          <footer className="mt-5">
            <p className="text-sm font-semibold text-white">Cliff Simmons</p>
            <p className="text-xs text-tt-gray-500">CEO &amp; Co-Founder, Tiger Tracks</p>
          </footer>
        </motion.blockquote>
      </motion.div>
    </section>
  );
}

/* ================================================================== */
/*  10. THE 100-DAY PORTCO TURNAROUND PLAN                             */
/* ================================================================== */

const turnaroundPhases = [
  {
    phase: 'Days 1-14',
    title: 'Strategic Diagnostic & Wayfinder Deep Dive',
    description:
      'Deep-dive into every ad account, attribution model, and spend line. Our proprietary Wayfinder platform maps the full acquisition funnel to surface hidden waste, misattributed conversions, and quick-win opportunities before any restructuring begins.',
  },
  {
    phase: 'Days 15-45',
    title: 'Restructuring & Quick Wins',
    description:
      'Campaign architecture rebuilt from the ground up. We stabilize CAC by cutting dead spend, consolidating audiences, fixing tracking gaps, and launching high-confidence tests that deliver measurable lift within weeks.',
  },
  {
    phase: 'Days 46-100',
    title: 'Full-Funnel Scale & EBITDA Expansion',
    description:
      'With a clean foundation in place, we scale winning channels, layer in cross-platform synergies, and build the reporting infrastructure that ties marketing directly to EBITDA. Fund-level dashboards go live for ongoing visibility.',
  },
] as const;

function TurnaroundPlanSection() {
  const containerRef = useRef(null);
  const isInView = useMotionInViewSafe(containerRef, { once: true, margin: '-60px' });

  return (
    <section className="py-28 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div ref={containerRef} className="mx-auto max-w-3xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger.container}
          className="text-center mb-16"
        >
          <motion.p variants={stagger.item} className="text-xs font-semibold uppercase tracking-[5px] text-tt-orange mb-4">
            Execution Playbook
          </motion.p>
          <motion.h2 variants={stagger.item} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The 100-day PortCo turnaround plan
          </motion.h2>
          <motion.p variants={stagger.item} className="mt-4 text-base text-tt-gray-400">
            A structured path from close to compounding growth
          </motion.p>
        </motion.div>

        {/* Timeline container with animated vertical line */}
        <motion.div
          className="relative"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger.container}
        >
          {/* Animated teal-to-orange gradient vertical line */}
          <div className="absolute left-[7px] top-4 bottom-4 w-px overflow-hidden">
            <div
              className="h-full w-full"
              style={{
                background: '#7FCAD3',
                animation: isInView ? 'lineGrow 1.5s ease-out forwards' : 'none',
                transformOrigin: 'top',
              }}
            />
          </div>

          <div className="space-y-10">
            {turnaroundPhases.map((phase, index) => (
              <motion.div key={phase.phase} variants={stagger.item} className="relative flex gap-8 md:gap-10">
                {/* Glowing node dot */}
                <div className="relative z-10 flex-shrink-0 mt-2">
                  <div
                    className="h-[14px] w-[14px] rounded-full"
                    style={{
                      background: index === 2
                        ? '#7FCAD3'
                        : index === 1
                        ? '#7FCAD3'
                        : '#7FCAD3',
                      boxShadow: index === 2
                        ? 'none'
                        : 'none',
                    }}
                  />
                </div>

                {/* Dark glass card */}
                <div
                  className={`flex-1 rounded-2xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-0.5 ${glassCardHoverTeal}`}
                  style={glassCard}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold tracking-tight text-tt-teal">
                      {phase.phase}
                    </span>
                    <span className="h-px flex-1 bg-tt-teal/20" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-white mb-3">{phase.title}</h3>
                  <p className="text-sm leading-relaxed text-tt-gray-400">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes lineGrow {
          0% { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}

/* ================================================================== */
/*  11. EBITDA IMPACT CALCULATOR (Visual Shell)                        */
/* ================================================================== */

function EBITDACalculatorSection() {
  const containerRef = useRef(null);
  const isInView = useMotionInViewSafe(containerRef, { once: true, margin: '-60px' });

  return (
    <section className="py-28 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div ref={containerRef} className="mx-auto max-w-2xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger.container}
          className="text-center mb-12"
        >
          <motion.p variants={stagger.item} className="text-xs font-semibold uppercase tracking-[5px] text-tt-orange mb-4">
            Model Your Upside
          </motion.p>
          <motion.h2 variants={stagger.item} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            EBITDA impact calculator
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="relative"
        >
          {/* Calculator card */}
          <div
            className="relative rounded-2xl p-8 md:p-10 overflow-hidden"
            style={{
              ...glassCard,
              border: '1px solid rgba(127, 202, 211, 0.15)',
            }}
          >
            {/* Subtle corner glow */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-30" style={{
              background: 'transparent',
            }} />

            {/* Input: Current Ad Spend */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-white">Current Monthly Ad Spend</label>
                <span className="text-sm font-bold text-tt-teal tabular-nums">$125,000</span>
              </div>
              <div className="relative h-2 rounded-full bg-black/[0.14] overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: '50%',
                    background: '#7FCAD3',
                    boxShadow: 'none',
                  }}
                />
                {/* Thumb indicator */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-tt-teal bg-[#052E3F]"
                  style={{
                    left: 'calc(50% - 8px)',
                    boxShadow: 'none',
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-tt-gray-600">
                <span>$10K</span>
                <span>$500K+</span>
              </div>
            </div>

            {/* Input: Target CAC */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-white">Target CAC Reduction</label>
                <span className="text-sm font-bold text-tt-teal tabular-nums">34%</span>
              </div>
              <div className="relative h-2 rounded-full bg-black/[0.14] overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: '68%',
                    background: '#7FCAD3',
                    boxShadow: 'none',
                  }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-tt-teal bg-[#052E3F]"
                  style={{
                    left: 'calc(68% - 8px)',
                    boxShadow: 'none',
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-tt-gray-600">
                <span>10%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-white/10 mb-8" />

            {/* Output: Projected EBITDA Lift */}
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[4px] text-tt-gray-500 mb-3">
                Projected Annual EBITDA Lift
              </p>
              <p
                className="text-5xl font-extrabold tracking-tight sm:text-6xl"
                style={{
                  background: '#FE5E16',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'none',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                $510,000
              </p>
              <p className="mt-2 text-xs text-tt-gray-500">Illustrative estimate. Adjust the inputs to your portfolio.</p>
            </div>

            {/* Request Access button */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-full border border-tt-orange/30 bg-transparent px-6 py-3 text-sm font-semibold text-tt-orange transition-all duration-200 hover:bg-transparent hover:border-tt-orange/50"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Request Full Calculator Access
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  PAGE ASSEMBLY                                                      */
/* ================================================================== */

export default function PEVCPage() {
  return (
    <div>
      <HeroSection />
      <TrustBar />
      <HiddenDragSection />
      <AccelerateSection />
      <PortfolioResultsSection />
      <TimelineSection />
      <PartnerProgramSection />
      <SocialProofSection />
      <TurnaroundPlanSection />
      <EBITDACalculatorSection />
      <CTASection
        headline="Schedule a portfolio review"
        subheadline="See exactly where your portfolio companies are overspending, and how to fix it in 100 days."
        primaryCTA={{ text: 'Request a Portfolio Audit', href: '/get-started' }}
        secondaryCTA={{ text: 'View Case Studies', href: '/results' }}
        dark
        badges={[
          'Inc. 5000 #123',
          'Founded by Ex-Google',
          'NDA Available on Request',
        ]}
      />
    </div>
  );
}
