'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { LogoBar } from '@/components/LogoBar';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { HeroTestimonial } from '@/components/HeroTestimonial';
import { STATS } from '@/lib/stats';

/* ================================================================
   HOOKS
   ================================================================ */

/** Reveal system fires IntersectionObserver to add .revealed */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right').forEach((child) => {
            child.classList.add('revealed');
          });
          if (el.classList.contains('reveal') || el.classList.contains('reveal-scale')) {
            el.classList.add('revealed');
          }
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold]);

  return ref;
}

/** Velocity-damped mouse parallax tracks cursor velocity for natural deceleration */
function useMouseParallax(intensity = 0.02) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Skip entirely on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    let running = false;

    const tick = () => {
      const damping = 0.08; // low = more fluid, high = snappy
      current.x += (target.x - current.x) * damping;
      current.y += (target.y - current.y) * damping;

      el.style.setProperty('--mx', `${current.x.toFixed(2)}px`);
      el.style.setProperty('--my', `${current.y.toFixed(2)}px`);

      // Idle-stop: kill the rAF loop once we've settled so the page
      // isn't doing style recalcs every frame forever.
      if (
        Math.abs(target.x - current.x) < 0.05 &&
        Math.abs(target.y - current.y) < 0.05
      ) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const handleMove = (e: MouseEvent) => {
      // Viewport-based: avoids getBoundingClientRect (forced layout) per event
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      target.x = nx * intensity * 100;
      target.y = ny * intensity * 100;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    el.addEventListener('mousemove', handleMove, { passive: true });

    return () => {
      el.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return ref;
}

/** Perspective tilt on mouse track sets --rx / --ry CSS vars */
function useTilt(maxDeg = 6) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--ry', `${(x - 0.5) * maxDeg}deg`);
    el.style.setProperty('--rx', `${(0.5 - y) * maxDeg}deg`);
  }, [maxDeg]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }, []);

  return { ref, handleMove, handleLeave };
}

/** Cursor proximity glow creates a radial glow that follows the cursor */
function useCursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf = 0;
    let pending = false;
    let px = 0;
    let py = 0;

    // rAF-throttled: high-polling mice fire mousemove far above 60Hz,
    // and each CSS var change repaints the glow gradient layer.
    const handleMove = (e: MouseEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--glow-x', `${px - rect.left}px`);
        el.style.setProperty('--glow-y', `${py - rect.top}px`);
        pending = false;
      });
    };

    el.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      el.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}

/* ================================================================
   MINI COMPONENTS
   ================================================================ */

/** Live sparkline SVG with animated drawing */
function Sparkline({ data, color = '#7FCAD3', areaColor, className = '' }: {
  data: number[];
  color?: string;
  areaColor?: string;
  className?: string;
}) {
  const { ref, inView } = useInViewLocal({ threshold: 0.3 });
  const w = 200;
  const h = 60;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 8) - 4;
    return `${x},${y}`;
  });

  const linePath = `M${points.join(' L')}`;
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`;

  return (
    <svg ref={ref} viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none">
      {areaColor && (
        <path
          d={areaPath}
          fill={areaColor}
          className={`sparkline-area ${inView ? 'drawn' : ''}`}
        />
      )}
      <path
        d={linePath}
        stroke={color}
        className={`sparkline-path ${inView ? 'drawn' : ''}`}
      />
    </svg>
  );
}

/** Simple inView hook for smaller components */
function useInViewLocal(opts: { threshold?: number } = {}) {
  const ref = useRef<SVGSVGElement & HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold: opts.threshold ?? 0.15 }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [opts.threshold]);

  return { ref, inView };
}

/** Animated bar chart */
function AnimatedBars({ bars, inView }: {
  bars: { label: string; value: number; color: string }[];
  inView: boolean;
}) {
  const max = Math.max(...bars.map(b => b.value));

  return (
    <div className="flex items-end gap-2 h-20">
      {bars.map((bar, i) => (
        <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t-sm overflow-hidden relative" style={{ height: '100%' }}>
            <div
              className="absolute bottom-0 left-0 right-0 rounded-t-sm transition-all duration-1000"
              style={{
                height: inView ? `${(bar.value / max) * 100}%` : '0%',
                background: bar.color,
                transitionDelay: `${i * 120}ms`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>
          <span className="text-[9px] text-tt-gray-500 truncate w-full text-center">{bar.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Progress ring SVG */
function ProgressRing({ percent, size = 80, strokeWidth = 4, color = '#7FCAD3', inView }: {
  percent: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  inView: boolean;
}) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={inView ? offset : circ}
        style={{
          transition: 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '0.3s',
        }}
      />
    </svg>
  );
}


/* ================================================================
   SECTION 1 CINEMATIC HERO
   Framer Motion staggered entrance, dark overlays, spotlight gradient,
   glassmorphism stat cards, elite button micro-interactions
   ================================================================ */

const heroFadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function HeroSection() {
  const parallaxRef = useMouseParallax(0.012);
  const cursorGlowRef = useCursorGlow();
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={(el: HTMLDivElement | null) => {
        (parallaxRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (cursorGlowRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `transparent`,
      }}
    >
      {/* Layer 0: MJ hero-streaks background image */}
      <div
        className="pointer-events-none absolute inset-0 z-[0]"
        aria-hidden="true"
        style={{
          backgroundImage: 'none' /* brand: no busy photo backgrounds; was url(/images/hero-streaks.webp) */,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
        }}
      />

      {/* Heavy dark overlay for legibility */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden"
        aria-hidden="true"
      />

      {/* Deep radial spotlight behind headline text */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden="true"
        style={{
          background: 'transparent',
        }}
      />

      {/* Vignette overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        aria-hidden="true"
        style={{
          background: 'transparent',
        }}
      />

      {/* Cursor proximity glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[4] opacity-40"
        style={{
          background: 'transparent',
        }}
      />

      {/* Particle network animation */}
      <div className="pointer-events-none absolute inset-0 z-[10]">
      </div>

      {/* Animated gradient mesh Layer 1 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{
          transform: 'translate(calc(var(--mx, 0px) * 2), calc(var(--my, 0px) * 2))',
          willChange: 'transform',
        }}
      >
        <div
          className="absolute top-[-20%] left-[-15%] h-[800px] w-[800px] rounded-full animate-mesh-drift"
          style={{ background: 'transparent', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full animate-float-slower"
          style={{ background: 'transparent', filter: 'blur(100px)' }}
        />
        <div
          className="absolute top-[35%] right-[10%] h-[400px] w-[400px] rounded-full animate-mesh-pulse"
          style={{ background: 'transparent', filter: 'blur(60px)' }}
        />
      </div>

      {/* Layer 2 mid-depth orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{
          transform: 'translate(calc(var(--mx, 0px) * 0.8), calc(var(--my, 0px) * 0.8))',
          willChange: 'transform',
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full"
          style={{ background: 'transparent', filter: 'blur(40px)' }}
        />
        <div className="absolute inset-0 dot-grid-subtle animate-dot-pulse" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-16 lg:pt-32"
        style={{
          transform: 'translate(calc(var(--mx, 0px) * 0.3), calc(var(--my, 0px) * 0.3))',
          willChange: 'transform',
        }}
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* ---------------- Left: headline ---------------- */}
          <div className="text-center lg:text-left">
            {/* Status badge */}
            <motion.div
              variants={heroFadeUp}
              initial={reduceMotion ? false : 'hidden'}
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-2 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-tt-orange" />
              </span>
              <span className="text-sm font-medium text-tt-paper uppercase tracking-[0.18em]">Inc. 5000 #123</span>
            </motion.div>

            {/* Main headline: TIGER (teal gradient) TRACKS (white).
                LCP element — paints immediately (no blur-in / opacity-0) so
                Largest Contentful Paint is not delayed by the entrance animation. */}
            <motion.div
              variants={heroFadeUp}
              initial={false}
              animate="visible"
              custom={0}
            >
              <h1
                className="text-5xl font-extrabold tracking-tight sm:text-6xl xl:text-[4rem]"
                style={{ letterSpacing: '-0.03em', lineHeight: 1.02 }}
              >
                Most agencies provide activity.{' '}
                <span className="text-tt-orange">We provide evidence.</span>
              </h1>
            </motion.div>

            {/* Sub-headline with 0.2s delay */}
            <motion.div
              variants={heroFadeUp}
              initial={reduceMotion ? false : 'hidden'}
              animate="visible"
              custom={0.2}
              className="space-y-4 mt-6"
            >
              <p
                className="text-lg text-tt-gray-100 sm:text-xl xl:text-2xl font-display font-semibold"
              >
                Track. Capture. Convert.
              </p>

              <p className="mx-auto lg:mx-0 max-w-xl text-base text-tt-gray-100 font-medium leading-relaxed">
                Performance marketing built by ex-Google leaders. Paid media, search, creative,
                CRO and measurement run as one team, reported against the numbers your board watches.
              </p>
            </motion.div>

            {/* CTAs: primary + secondary */}
            <motion.div
              variants={heroFadeUp}
              initial={reduceMotion ? false : 'hidden'}
              animate="visible"
              custom={0.4}
              className="mt-8 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4"
            >
              {/* Primary CTA */}
              <Link
                href="/growth-audit"
                className="group relative inline-flex items-center justify-center rounded-full bg-tt-orange px-8 py-3.5 text-base font-normal tracking-[-0.16px] text-white transition-shadow duration-200"
              >
                <span className="relative block h-6 overflow-hidden leading-6">
                  <span className="block transition-transform duration-[340ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full motion-reduce:transform-none motion-reduce:transition-none">
                    Request a Strategic Diagnostic
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-full block transition-transform duration-[340ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full motion-reduce:hidden"
                  >
                    Request a Strategic Diagnostic
                  </span>
                </span>
              </Link>

              {/* Secondary: Ghost button with thin border */}
              <Link
                href="/results"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-transparent px-8 py-3.5 text-base font-semibold text-tt-gray-200 transition-all duration-300 hover:bg-white/5 hover:border-white/40 hover:text-white"
              >
                View Results
              </Link>
            </motion.div>

            {/* Compact stat row */}
            <motion.div
              variants={heroFadeUp}
              initial={reduceMotion ? false : 'hidden'}
              animate="visible"
              custom={0.6}
              className="mt-10 grid grid-cols-3 gap-3 max-w-md mx-auto lg:max-w-none lg:mx-0"
            >
              {[
                { value: '2,954%', label: 'Inc. 5000 growth' },
                { value: '+51%', label: 'AG1 customers' },
                { value: '+46%', label: 'Broadband CVR' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl backdrop-blur-xl border-t border-l border-white/10 px-3 py-4 text-center transition-all duration-500 hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(0, 0, 0, 0.14)',
                    boxShadow: 'none',
                  }}
                >
                  <AnimatedCounter value={stat.value} label={stat.label} className="[&>div:first-child]:text-xl sm:[&>div:first-child]:text-2xl [&>div:last-of-type]:mt-1 [&>div:last-of-type]:text-[10px] sm:[&>div:last-of-type]:text-[11px] [&>div:last-of-type]:tracking-normal sm:[&>div:last-of-type]:tracking-widest" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* ---------------- Right: SXSW video ---------------- */}
          <motion.div
            variants={heroFadeUp}
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
            custom={0.3}
            className="w-full"
          >
            <div className="mb-4 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-tt-teal/30 bg-transparent px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-tt-orange">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tt-teal opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-tt-teal" />
                </span>
                Featured at SXSW
              </span>
            </div>
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
              <video
                controls
                preload="metadata"
                playsInline
                poster="/cliff-sxsw-ag1-poster.jpg"
                className="w-full aspect-video object-cover bg-tt-black"
              >
                <source src="/cliffypt2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-5 text-center">
              <p className="text-lg sm:text-xl font-bold text-white">
                <span className="text-tt-orange">CMO of AG1</span>{' '}&amp; CEO of Tiger Tracks
              </p>
              <p className="mt-1.5 text-sm text-tt-gray-300">
                &ldquo;Under the AI Microscope&rdquo;
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hero Trust Anchor: AG1 Testimonial — bottom of the hero */}
        <HeroTestimonial />
      </div>

    </section>
  );
}

/* ================================================================
   SECTION 2 LOGO BAR
   ================================================================ */

function LogoBarSection() {
  return (
    <section className="relative bg-atmosphere overflow-hidden">
      <div className="section-divider-glow" />
      <div className="pointer-events-none absolute inset-0 scanlines opacity-40" aria-hidden="true" />
      <div className="relative z-10 py-12">
        <LogoBar />
      </div>
      <div className="section-divider" />
    </section>
  );
}

/* ================================================================
   SECTION 3 CAPABILITIES BENTO GRID
   Uniform 3-col layout, glassmorphism cards, orange glow hover
   ================================================================ */

const capabilities = [
  {
    title: 'Demand Gen',
    href: '/capabilities#media-buying',
    description: 'Profitable scale across every paid channel, measured on ROAS and CAC, not impressions.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    accent: 'teal' as const,
    stat: '+51%',
    statLabel: 'AG1 customers YoY',
    bgImage: '/images/media-buying-dashboard-brand.png',
  },
  {
    title: 'Analytics',
    href: '/capabilities#analytics',
    description: 'Media mix modeling powered by LLMs, deduplicated attribution, and channel-level LTV that unlocks channel-level CAC targets.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    accent: 'teal' as const,
    stat: 'MMM',
    statLabel: 'Bayesian media mix modeling',
    bgImage: '/images/scatter-plot-data-viz-brand.png',
  },

  {
    title: 'CRO',
    href: '/capabilities#website-cro',
    description: 'Landing pages, site builds, and conversion rate optimization that turns traffic into revenue.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    accent: 'teal' as const,
    stat: STATS.broadband.cvrLift,
    statLabel: 'Site CVR, national broadband provider',
    bgImage: '/images/ab-testing-browser-mockup-brand.png',
  },
  {
    title: 'Creative',
    href: '/capabilities#creative',
    description: 'Content strategy, production, UGC, and influencer programs built to perform, with educational video in the mix.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    accent: 'orange' as const,
    stat: 'Pre-flight',
    statLabel: 'Attention scoring before launch',
    bgImage: '/images/creative-ugc-phone-mockup-brand.png',
  },
  {
    title: 'Organic',
    href: '/capabilities#organic-growth',
    description: 'Social, SEO, GEO/AEO, and ASO that win the rankings and the AI answers. Top client: average Google ranking up 21 positions.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    accent: 'teal' as const,
    stat: STATS.broadband.rankingPositions,
    statLabel: 'Google ranking positions, broadband',
    bgImage: '/images/network-connection-map-brand.png',
  },
  {
    title: 'Lifecycle',
    href: '/capabilities#lifecycle',
    description: 'An AI lifecycle engine on top of the ESP you already run. It predicts churn and fires the right save, win-back, or cross-sell at the right moment, measured on LTV, not opens.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    ),
    accent: 'orange' as const,
    stat: 'LTV',
    statLabel: 'Programs built around lifetime value',
    bgImage: '/images/lifecycle-journey-visualization-brand.png',
  },] as const;

function BentoCapabilities() {
  const sectionRef = useReveal(0.08);

  return (
    <section data-tint="ink" className="relative bg-atmosphere py-28 sm:py-36 overflow-hidden glow-top">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-tt-teal/30" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-tt-teal/15" />
        <div
          className="absolute top-[10%] right-[-10%] h-[600px] w-[600px] rounded-full animate-mesh-drift"
          style={{ background: 'transparent', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-[5%] left-[-8%] h-[500px] w-[500px] rounded-full animate-float-slower"
          style={{ background: 'transparent', filter: 'blur(100px)' }}
        />
        <div className="absolute inset-0 dot-grid animate-dot-pulse" />
        <div className="absolute inset-0 crosshatch-grid opacity-40" />
      </div>

      <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <span className="reveal stagger-1 inline-block text-sm font-semibold text-tt-orange uppercase tracking-widest mb-4">
            Capabilities
          </span>
          <h2 className="reveal stagger-2 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl" aria-label="Full-funnel marketing that compounds.">
            Full-funnel marketing<br />
            <span className="gradient-text">that compounds.</span>
          </h2>
          <p className="reveal stagger-3 mt-6 text-lg text-tt-gray-300 leading-relaxed">
            Each layer amplifies the others. Media drives signal, creative converts,
            lifecycle extends value, and measurement fuels smarter decisions.
          </p>
        </div>

        {/* Uniform 3-col grid: all 6 cards identical size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <Link
              key={cap.title}
              href={cap.href}
              className={`reveal stagger-${i + 1} group relative h-full flex flex-col justify-between rounded-2xl p-8 no-underline bento-cap-card hover:-translate-y-1 focus:ring-2 focus:ring-tt-orange focus:outline-none overflow-hidden`}
            >
              {/* Background image — decorative only (alt="" intentional) */}
              {cap.bgImage && (
                <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
                  <img
                    src={cap.bgImage}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.07] transition-all duration-700 group-hover:opacity-[0.15] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-tt-ink/40" />
                </div>
              )}
              {/* Top content */}
              <div className="relative z-10">
                <div
                  className={`mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                    cap.accent === 'teal' ? 'bg-tt-teal/10 text-tt-teal' : 'bg-transparent border border-tt-orange/40 text-tt-orange'
                  }`}
                >
                  {cap.icon}
                </div>
                <h3 className="text-lg font-bold text-tt-teal mb-3 group-hover:text-white transition-colors duration-300">
                  {cap.title}
                </h3>
                <p className="text-sm text-tt-gray-300 leading-relaxed">
                  {cap.description}
                </p>
              </div>

              {/* Bottom stat: consistent across all cards */}
              {cap.stat && (
                <div className="relative z-10 mt-6 pt-5 border-t border-white/5 flex items-baseline gap-2">
                  <span
                    className="text-2xl font-extrabold tracking-tight text-white"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {cap.stat}
                  </span>
                  <span className="text-xs text-tt-gray-400 uppercase tracking-wider">{cap.statLabel}</span>
                </div>
              )}

              {/* Arrow indicator */}
              <span className="absolute top-6 right-6 z-10 text-tt-gray-600 transition-all duration-300 group-hover:text-tt-orange group-hover:translate-x-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-xs text-tt-gray-500 max-w-3xl">
          Figures shown are results from individual client engagements, not portfolio averages.
        </p>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 4 METRICS WITH VERTICAL GLOWING PILLAR DIVIDERS
   ================================================================ */

const metrics = [
  { value: STATS.revenueGrowth, label: 'Three-year revenue growth', glow: true },
  { value: STATS.broadband.cvrLift, label: 'Conversion rate, national broadband provider', glow: false },
  { value: STATS.broadband.purchases, label: 'Purchases, national broadband provider', glow: false },
  { value: STATS.broadband.revenue, label: 'Revenue, national broadband provider', glow: false },
  { value: STATS.broadband.rankingPositions, label: 'Avg Google ranking positions gained', glow: false },
] as const;

function MetricsSection() {
  const sectionRef = useReveal(0.2);

  return (
    <section className="relative py-24 overflow-hidden" style={{
      background: `
        #052E3F
      `,
    }}>
      {/* Layer 0: MJ stats-pillars bg (when available) */}
      <div
        className="pointer-events-none absolute inset-0 z-[0]"
        aria-hidden="true"
        style={{
          backgroundImage: 'none' /* brand: no busy photo backgrounds; was url(/images/stats-pillars.webp) */,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          opacity: 0.2,
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
        <div className="absolute inset-0 dot-grid opacity-50" />
        <div className="absolute inset-0 scanlines opacity-30" />
        {/* Accent orbs behind metrics */}
        <div
          className="absolute top-[-30%] left-[20%] h-[400px] w-[600px] rounded-full animate-mesh-pulse"
          style={{ background: 'transparent', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-[-20%] right-[30%] h-[300px] w-[400px] rounded-full"
          style={{ background: 'transparent', filter: 'blur(80px)' }}
        />
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-0">
          {metrics.map((m, i) => (
            <div key={m.label} className="flex items-stretch">
              <div className={`reveal stagger-${i + 1} flex-1 px-6 md:px-8 py-6`}>
                <AnimatedCounter
                  value={m.value}
                  label={m.label}
                  className={m.glow ? 'metric-glow' : ''}
                />
              </div>
              {/* Vertical glowing pillar divider */}
              {i < metrics.length - 1 && (
                <div className="hidden md:block metric-divider self-stretch my-2" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-divider-glow" />
    </section>
  );
}

/* ================================================================
   SECTION 5 CASE STUDIES (full-bleed immersive with perspective tilt)
   ================================================================ */

const caseStudies = [
  {
    slug: 'ag1-meta',
    client: 'AG1',
    heroMetric: '+51%',
    heroMetricLabel: 'Customers YoY',
    category: 'DTC / Multi-Channel',
    channels: ['Meta', 'Google'],
    summary: 'Restructured Meta campaigns to drive compounding acquisition growth across channels.',
    gradientFrom: 'rgba(127, 202, 211, 0.25)',
    gradientTo: 'rgba(127, 202, 211, 0.03)',
    accentOrb: 'rgba(254, 94, 22, 0.12)',
    patternOpacity: 0.15,
  },
  {
    slug: 'national-broadband-provider',
    client: 'National Broadband Provider',
    heroMetric: STATS.broadband.cvrLift,
    heroMetricLabel: 'Website Conversion Rate (CVR)',
    category: 'Broadband & Telecom / 2026',
    channels: ['Multi-Channel'],
    summary: 'Purchases up 32%, revenue up 15%, and average Google ranking up 21 positions, from two test markets to the national footprint in six months.',
    gradientFrom: 'rgba(127, 202, 211, 0.20)',
    gradientTo: 'rgba(254, 94, 22, 0.06)',
    accentOrb: 'rgba(254, 94, 22, 0.10)',
    patternOpacity: 0.18,
  },
  {
    slug: 'monarch-money',
    client: 'Monarch Money',
    heroMetric: STATS.monarch.seriesB,
    heroMetricLabel: 'Series B at an $850M Valuation',
    category: 'Finance',
    channels: ['Multi-Channel'],
    summary: 'Users up 368% with unit economics that held under investor scrutiny. Monarch went on to raise a $75M Series B.',
    gradientFrom: 'rgba(254, 94, 22, 0.20)',
    gradientTo: 'rgba(127, 202, 211, 0.05)',
    accentOrb: 'rgba(127, 202, 211, 0.15)',
    patternOpacity: 0.12,
  },
] as const;

const CASE_IMAGES: Record<string, string> = {
  'ag1-meta': '/images/media-buying-dashboard-brand.png',
  'national-broadband-provider': '/images/conversion-optimization-abstract-brand.png',
  'monarch-money': '/images/scatter-plot-data-viz-brand.png',
};

function TiltCaseStudyCard({ cs, delay }: {
  cs: typeof caseStudies[number];
  delay: number;
}) {
  const { ref, handleMove, handleLeave } = useTilt(8);

  return (
    <div className={`reveal stagger-${delay}`}>
      <Link
        href={`/results/${cs.slug}`}
        className="group block"
      >
        <div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="tilt-card glass-card gradient-border card-shimmer overflow-hidden transition-all duration-500 hover:scale-[1.02]"
        >
          {/* Brand image header */}
          <div className="relative h-40 overflow-hidden">
            <img
              src={CASE_IMAGES[cs.slug] ?? '/images/media-buying-dashboard-brand.png'}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="relative p-8 md:p-10 pt-4">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-tt-teal/30 group-hover:bg-tt-teal/60 transition-all duration-500" />

            {/* Client & category */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-bold uppercase tracking-wider text-tt-orange">{cs.client}</span>
              <span className="h-px flex-1 bg-tt-teal/20" />
            </div>
            <p className="text-xs text-tt-gray-500 mb-6">{cs.category}</p>

            {/* MASSIVE hero metric dominates the card face */}
            <div className="mb-6">
              <p className="text-6xl md:text-7xl font-extrabold text-white metric-glow group-hover:text-tt-gray-200 transition-colors duration-500 leading-none">
                {cs.heroMetric}
              </p>
              <p className="mt-3 text-sm text-tt-gray-400">{cs.heroMetricLabel}</p>
            </div>

            {/* Channel tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {cs.channels.map((channel) => (
                <span
                  key={channel}
                  className="rounded-full bg-tt-teal/8 border border-tt-teal/15 px-3 py-1 text-xs font-medium text-tt-teal"
                >
                  {channel}
                </span>
              ))}
            </div>

            {/* Summary */}
            <p className="text-sm leading-relaxed text-tt-gray-400">{cs.summary}</p>

            {/* Read more */}
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-tt-orange">
              <span>Read full story</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function CaseStudiesSection() {
  const sectionRef = useReveal(0.08);

  return (
    <section className="relative bg-atmosphere-dark py-28 sm:py-36 overflow-hidden noise-overlay glow-top glow-bottom">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Large center wash */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[900px] rounded-full animate-mesh-drift"
          style={{ background: 'transparent', filter: 'blur(80px)' }}
        />
        {/* Corner accent orbs */}
        <div
          className="absolute top-[-5%] right-[-5%] h-[400px] w-[400px] rounded-full animate-float-slow"
          style={{ background: 'transparent', filter: 'blur(70px)' }}
        />
        <div
          className="absolute bottom-[-5%] left-[-5%] h-[350px] w-[350px] rounded-full animate-float-slower"
          style={{ background: 'transparent', filter: 'blur(60px)' }}
        />
        {/* Crosshatch pattern */}
        <div className="absolute inset-0 crosshatch-grid opacity-30" />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid-subtle animate-dot-pulse" />
      </div>

      <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <span className="reveal stagger-1 inline-block text-sm font-semibold text-tt-orange uppercase tracking-widest mb-4">
            Proof, Not Promises
          </span>
          <h2 className="reveal stagger-2 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl" aria-label="Results that make CFOs smile.">
            Results that make<br />
            <span className="gradient-text-warm">CFOs smile.</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <TiltCaseStudyCard key={cs.slug} cs={cs} delay={i + 1} />
          ))}
        </div>

        <div className="reveal stagger-5 mt-16 text-center">
          <Link href="/results" className="btn-ghost">
            View all results
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 6 PROPRIETARY TECH (animated real-time data viz)
   ================================================================ */

function TechSection() {
  const sectionRef = useReveal(0.08);
  const barsRef = useRef<HTMLDivElement>(null);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    const el = barsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setBarsVisible(true); obs.unobserve(el); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  const feedBars = [
    { label: 'Titles', value: 72, color: '#7FCAD3' },
    { label: 'Desc', value: 58, color: '#7FCAD3' },
    { label: 'Images', value: 85, color: '#7FCAD3' },
    { label: 'Price', value: 92, color: '#7FCAD3' },
    { label: 'GTINs', value: 68, color: '#7FCAD3' },
    { label: 'Custom', value: 45, color: '#7FCAD3' },
    { label: 'Overall', value: 95, color: '#FE5E16' },
  ];

  return (
    <section data-tint="teal" className="relative py-28 sm:py-36 overflow-hidden noise-overlay glow-bottom" style={{
      background: `
        #052E3F
      `,
    }}>
      {/* Scanline overlay - active system / live data signal */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background: 'none',
        }}
      />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 dot-grid opacity-50" />
        <div className="absolute inset-0 scanlines opacity-20" />
        {/* Multiple animated orbs for depth */}
        <div
          className="absolute top-[-10%] left-[20%] h-[700px] w-[700px] rounded-full animate-mesh-drift"
          style={{ background: 'transparent', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-[-15%] right-[10%] h-[500px] w-[500px] rounded-full animate-float-slow"
          style={{ background: 'transparent', filter: 'blur(80px)' }}
        />
        <div
          className="absolute top-[30%] right-[-5%] h-[400px] w-[400px] rounded-full animate-mesh-pulse"
          style={{ background: 'transparent', filter: 'blur(60px)' }}
        />
        {/* Ring pattern */}
        <div className="absolute inset-0 ring-grid opacity-60" />
        {/* Accent lines */}
      </div>

      <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <span className="reveal stagger-1 inline-block text-sm font-semibold text-tt-orange uppercase tracking-widest mb-4">
            Proprietary Technology
          </span>
          <h2 className="reveal stagger-2 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl" aria-label="Other agencies use your tools. We built our own.">
            Other agencies use your tools.<br />
            <span className="gradient-text">We built our own.</span>
          </h2>
        </div>

        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Wayfinder AI with live sparkline */}
          <Link href="/wayfinder" passHref className="reveal stagger-3 group relative gradient-border gradient-border-active glass-card-elevated p-8 md:p-10 block cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#7FCAD3]">
            {/* Orange heat accent glow (2 of 3) */}
            <div className="pointer-events-none absolute -inset-8 z-[-1]" aria-hidden="true" style={{
              background: 'transparent',
              filter: 'blur(40px)',
              borderRadius: '50%',
            }} />
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <span className="block h-3 w-3 rounded-full bg-tt-teal" />
                <span className="absolute inset-0 h-3 w-3 rounded-full bg-tt-teal animate-ping opacity-30" />
              </div>
              <span className="text-xs font-semibold text-tt-orange uppercase tracking-wider">Live</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Wayfinder AI</h3>
            <p className="text-tt-gray-400 leading-relaxed mb-6">
              Predictive budget allocation that optimizes spend across channels in real time. Built by the team that built campaigns at Google.
            </p>

            {/* Live sparkline data viz */}
            <div className="rounded-xl border border-white/5 bg-black/[0.14] p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-tt-gray-500 uppercase tracking-wider">Budget Reallocation Score</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-tt-teal animate-pulse" />
                  <span className="text-[10px] text-tt-teal font-semibold">Optimizing</span>
                </span>
              </div>
              <Sparkline
                data={[22, 28, 25, 35, 32, 45, 42, 55, 50, 62, 58, 72, 68, 80, 75, 85]}
                color="#7FCAD3"
                areaColor="rgba(127, 202, 211, 0.06)"
                className="w-full h-14"
              />
            </div>

            <ul className="space-y-3 mb-8">
              {['Cross-platform intelligence', 'ML-driven recommendations', 'Unified data layer', 'Real-time optimization'].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-tt-gray-300">
                  <svg className="w-4 h-4 text-tt-teal flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-tt-orange group-hover:text-white transition-colors">
              See Wayfinder in action
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>

          {/* Feed Optimization with animated stacked bars */}
          <Link href="/capabilities#analytics" className="reveal stagger-4 group relative glass-card gradient-border p-8 md:p-10 block cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-black/30 hover:border-[#7FCAD3]">
            <div className="flex items-center gap-3 mb-6">
              <span className="block h-3 w-3 rounded-full bg-tt-orange" />
              <span className="text-xs font-semibold text-tt-orange uppercase tracking-wider">Platform</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Feed Optimization</h3>
            <p className="text-tt-gray-400 leading-relaxed mb-6">
              AI-powered product feed management that transforms e-commerce shopping campaigns. Automated at scale, measured to the SKU.
            </p>

            <ul className="space-y-3 mb-6">
              {['AI title & description optimization', 'Real-time processing at scale', 'Quality scoring & ROI tracking'].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-tt-gray-300">
                  <svg className="w-4 h-4 text-tt-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            {/* Animated bar chart */}
            <div ref={barsRef} className="rounded-xl border border-white/5 bg-black/[0.14] p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-tt-gray-500 uppercase tracking-wider">Feed Quality Scores</span>
                <span className="text-[10px] text-tt-gray-400 font-semibold">Illustrative</span>
              </div>
              <div className="flex items-end gap-1.5 h-20">
                {feedBars.map((bar, i) => (
                  <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full relative" style={{ height: '64px' }}>
                      <div
                        className="absolute bottom-0 left-0 right-0 rounded-t-sm transition-all"
                        style={{
                          height: barsVisible ? `${bar.value}%` : '0%',
                          background: bar.color,
                          transitionDuration: '1.2s',
                          transitionDelay: `${i * 100}ms`,
                          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    </div>
                    <span className="text-[8px] text-tt-gray-600 truncate w-full text-center">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 8 PE PARTNERSHIP (interactive timeline + progress ring)
   ================================================================ */

function PEPartnershipSection() {
  const sectionRef = useReveal(0.08);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimelineVisible(true); obs.unobserve(el); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  const timeline = [
    { time: 'Week 1-2', label: 'Strategic Diagnostic & forensics', percent: 100 },
    { time: 'Week 3-4', label: 'Strategy & quick wins deployed', percent: 100 },
    { time: 'Month 2-3', label: 'Full-funnel execution at scale', percent: 75 },
  ];

  return (
    <section data-tint="warm" className="relative bg-cinematic py-28 sm:py-36 overflow-hidden glow-top">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute inset-0 scanlines opacity-20" />
        {/* Animated orbs */}
        <div
          className="absolute top-[10%] right-[-8%] h-[600px] w-[600px] rounded-full animate-float-slower"
          style={{ background: 'transparent', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-[5%] left-[-5%] h-[500px] w-[500px] rounded-full animate-mesh-drift"
          style={{ background: 'transparent', filter: 'blur(90px)' }}
        />
        <div
          className="absolute top-[50%] left-[40%] h-[300px] w-[300px] rounded-full animate-mesh-pulse"
          style={{ background: 'transparent', filter: 'blur(50px)' }}
        />
        {/* Ring pattern */}
        <div className="absolute inset-0 ring-grid opacity-40" />
        {/* Accent lines */}
      </div>

      <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left copy */}
          <div>
            <span className="reveal stagger-1 inline-block text-sm font-semibold text-tt-orange uppercase tracking-widest mb-4">
              For PE & VC Funds
            </span>
            <h2 className="reveal stagger-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Accelerate portfolio growth with operators who have done it before.
            </h2>
            <p className="reveal stagger-3 mt-6 text-lg leading-relaxed text-tt-gray-400">
              We partner with PE and VC funds to inject performance marketing muscle into
              portfolio companies. Strategic Diagnostics, proprietary AI tooling, and a team built at Google deployed on your timeline.
            </p>

            {/* Mini stats with progress rings */}
            <div className="reveal stagger-4 mt-10 grid grid-cols-3 gap-6">
              {[
                { val: '100', label: 'Day operating plan' },
                { val: '2,954%', label: 'Inc. 5000 growth' },
                { val: '#123', label: 'Inc. 5000 rank' },
              ].map((s) => (
                <AnimatedCounter key={s.label} value={s.val} label={s.label} className="metric-glow [&>div:first-child]:text-2xl" />
              ))}
            </div>

            <div className="reveal stagger-5 mt-10">
              <Link href="/pe-vc" className="btn-primary">
                Learn about fund partnerships
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right interactive timeline with animated fill + progress ring */}
          <div className="reveal-right stagger-3 relative">
            <div className="relative glass-card-elevated p-8 md:p-10">
              <p className="text-center text-tt-gray-400 text-sm mb-8">
                The 100-day plan, from first call to fund-level reporting
              </p>

              {/* Animated timeline */}
              <div ref={timelineRef} className="relative">
                {/* Animated fill line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-black/[0.14]" />
                <div
                  className="absolute left-4 top-0 w-px transition-all"
                  style={{
                    height: timelineVisible ? '100%' : '0%',
                    background: '#7FCAD3',
                    transitionDuration: '1.5s',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '0.3s',
                  }}
                />

                {timeline.map((step, i) => (
                  <div key={step.time} className="relative pl-12 pb-8 last:pb-0">
                    {/* Node dot */}
                    <div
                      className="absolute left-[9px] top-1 h-3.5 w-3.5 rounded-full border-2 border-tt-teal bg-tt-black transition-all"
                      style={{
                        borderColor: timelineVisible ? '#7FCAD3' : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: timelineVisible ? 'none' : 'none',
                        transitionDuration: '0.6s',
                        transitionDelay: `${0.5 + i * 0.3}s`,
                      }}
                    />
                    <p
                      className="text-xs font-semibold text-tt-orange uppercase tracking-wider transition-all"
                      style={{
                        opacity: timelineVisible ? 1 : 0,
                        transform: timelineVisible ? 'translateX(0)' : 'translateX(-10px)',
                        transitionDuration: '0.6s',
                        transitionDelay: `${0.6 + i * 0.3}s`,
                      }}
                    >
                      {step.time}
                    </p>
                    <p
                      className="mt-1 text-sm text-tt-gray-300 transition-all"
                      style={{
                        opacity: timelineVisible ? 1 : 0,
                        transform: timelineVisible ? 'translateX(0)' : 'translateX(-10px)',
                        transitionDuration: '0.6s',
                        transitionDelay: `${0.7 + i * 0.3}s`,
                      }}
                    >
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 9 INTELLIGENCE (editorial)
   ================================================================ */

const articles = [
  {
    category: 'AI & Automation',
    title: 'Beyond the Chatbox: The No-Shame Guide to the Agentic AI Era of 2026',
    readTime: '12 min',
    slug: 'beyond-the-chatbox-the-no-shame-guide-to-the-agentic-ai-era-of-2026',
    svgPattern: 'M20 40 Q60 10 100 40 Q140 70 180 35 Q220 5 260 45' as const,
    image: '/images/ai-automation-abstract-brand.png',
  },
  {
    category: 'Platform Strategy',
    title: 'GEO Is the New SEO: Why Generative Engine Optimization Is Not Optional in 2026',
    readTime: '10 min',
    slug: 'geo-is-the-new-seo-why-generative-engine-optimization-is-not-optional-in-2026',
    svgPattern: 'M10 30 Q50 60 100 25 Q150 -5 200 35 Q250 70 280 30' as const,
    image: '/images/seo-organic-discovery-brand.png',
  },
  {
    category: 'Measurement',
    title: 'MMM vs. MTA: The Measurement Debate That Determines Where Your Budget Goes',
    readTime: '5 min',
    slug: 'mmm-vs-mta-the-measurement-debate-that-determines-where-your-budget-goes',
    svgPattern: 'M30 50 Q80 15 130 45 Q180 75 230 30 Q260 10 280 40' as const,
    image: '/images/network-connection-map-brand.png',
  },
] as const;

function IntelligenceSection() {
  const sectionRef = useReveal(0.08);

  return (
    <section className="relative bg-atmosphere-dark py-28 sm:py-36 overflow-hidden noise-overlay glow-top">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 section-divider-glow" />
        {/* Atmospheric orbs */}
        <div
          className="absolute top-[15%] left-[-5%] h-[500px] w-[500px] rounded-full animate-float-slow"
          style={{ background: 'transparent', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-[10%] right-[-5%] h-[400px] w-[400px] rounded-full animate-mesh-drift-alt"
          style={{ background: 'transparent', filter: 'blur(70px)' }}
        />
        <div className="absolute inset-0 crosshatch-grid opacity-25" />
        <div className="absolute inset-0 dot-grid-subtle animate-dot-pulse" />
      </div>

      <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <span className="reveal stagger-1 inline-block text-sm font-semibold text-tt-orange uppercase tracking-widest mb-4">
            Intelligence Series
          </span>
          <h2 className="reveal stagger-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Eye of the Tiger
          </h2>
          <p className="reveal stagger-3 mt-4 text-lg text-tt-gray-400">
            Strategic research designed to give you a forward-looking advantage.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map((article, i) => (
            <Link
              key={article.slug}
              href={`/intelligence/${article.slug}`}
              className={`reveal stagger-${i + 1} group relative glass-card card-shimmer block overflow-hidden`}
            >
              {/* Brand image header */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={article.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-8 pt-4">
                <span className="inline-flex items-center rounded-full bg-tt-teal/10 px-3 py-1 text-xs font-semibold text-tt-teal">
                  {article.category}
                </span>
                <h3 className="mt-5 text-lg font-bold text-white leading-snug group-hover:text-tt-teal transition-colors duration-300">
                  {article.title}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-tt-gray-500">{article.readTime} read</span>
                  <svg
                    className="w-5 h-5 text-tt-gray-600 group-hover:text-tt-teal transition-all duration-300 group-hover:translate-x-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="reveal stagger-5 mt-16 text-center">
          <Link href="/intelligence" className="btn-ghost">
            Explore all research
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 10 FINAL CTA (proximity-reactive gradient mesh)
   ================================================================ */

function FinalCTA() {
  const sectionRef = useReveal(0.15);
  const cursorRef = useCursorGlow();

  return (
    <section
      ref={(el: HTMLDivElement | null) => {
        (cursorRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      data-tint="bronze"
      className="relative py-32 sm:py-40 overflow-hidden noise-overlay"
      style={{
        background: `transparent`,
      }}
    >
      {/* Layer 0: MJ bokeh background (when available) */}
      <div
        className="pointer-events-none absolute inset-0 z-[0]"
        aria-hidden="true"
        style={{
          backgroundImage: 'none' /* brand: no busy photo backgrounds; was url(/images/cta-bokeh.webp) */,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
        }}
      />

      {/* Proximity-reactive gradient mesh follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-60"
        style={{
          background: 'transparent',
        }}
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Large animated orbs */}
        <div
          className="absolute top-[-20%] left-[-10%] h-[700px] w-[700px] rounded-full animate-mesh-drift"
          style={{ background: 'transparent', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full animate-float-slower"
          style={{ background: 'transparent', filter: 'blur(80px)' }}
        />
        <div
          className="absolute top-[20%] right-[20%] h-[400px] w-[400px] rounded-full animate-mesh-pulse"
          style={{ background: 'transparent', filter: 'blur(60px)' }}
        />
        {/* Dense pattern layers */}
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute inset-0 crosshatch-grid opacity-30" />
        <div className="absolute inset-0 scanlines opacity-15" />
        {/* Ring pattern */}
        <div className="absolute inset-0 ring-grid opacity-40" />
        {/* Accent lines */}
      </div>

      <div ref={sectionRef} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="reveal stagger-1 text-4xl font-bold text-white sm:text-5xl lg:text-6xl" aria-label="Your revenue is leaking. We'll find where.">
          Your revenue is leaking.<br />
          <span className="gradient-text-warm">We&apos;ll find where.</span>
        </h2>

        <p className="reveal stagger-2 mt-6 text-xl text-tt-gray-400 max-w-2xl mx-auto">
          A 90-day roadmap built around your actual numbers across paid, organic,
          creative, and attribution.
        </p>

        <p className="reveal stagger-2 mt-4 text-base text-tt-gray-200 max-w-2xl mx-auto">
          Start with a free Strategic Diagnostic. Continue on terms where our fees are
          tied to the numbers we sign up for. You win, we win.
        </p>

        <div className="reveal stagger-3 mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="relative">
            <div className="absolute -inset-5 rounded-[50px] z-[-1]" style={{
              background: 'transparent',
              filter: 'blur(15px)',
            }} />
            <Link href="/get-started" className="btn-primary text-lg">
              Request a Strategic Diagnostic
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <Link href="/results" className="btn-ghost">
            View Results
          </Link>
        </div>

        <div className="reveal stagger-4 mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-tt-gray-500">
          {['Inc. 5000 #123', 'Meta Business Partner', 'Founded by Ex-Google'].map((badge, i) => (
            <span key={badge} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-tt-gray-700" />}
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   ENTERPRISE PAIN MESSAGE BLOCK
   ================================================================ */

function EnterprisePainSection() {
  const sectionRef = useReveal(0.1);

  return (
    <section className="relative surface-paper py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-tt-orange/25" />
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div
          className="absolute top-[0%] right-[-12%] h-[500px] w-[500px] rounded-full animate-float-slower"
          style={{ background: 'transparent', filter: 'blur(90px)' }}
        />
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <span className="reveal stagger-1 inline-block text-sm font-semibold text-tt-orange uppercase tracking-widest mb-4">
          For subscription businesses
        </span>
        <h2 className="reveal stagger-2 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl" aria-label="Traffic down. Conversion flat. That is exactly what we fix.">
          Traffic down. Conversion flat.<br />
          <span className="gradient-text">That is exactly what we fix.</span>
        </h2>
        <p className="reveal stagger-3 mt-6 text-lg text-tt-gray-300 leading-relaxed long-copy">
          The two numbers keeping enterprise growth leaders up at night are declining site
          traffic and a website conversion rate that will not move. Recovering both is the
          core of what Tiger Tracks does: a Strategic Diagnostic that finds where revenue is
          leaking, CRO waves that compound week over week, and organic programs built for how
          customers search now, including the AI engines that answer before Google does.
        </p>
        <div className="reveal stagger-4 mt-10">
          <Link href="/get-started" className="btn-primary">
            Request a Strategic Diagnostic
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   INDUSTRIES STRIP
   ================================================================ */

function IndustriesStrip() {
  const sectionRef = useReveal(0.2);

  return (
    <section className="relative bg-atmosphere overflow-hidden">
      <div className="section-divider" />
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-14 text-center">
        <span className="reveal stagger-1 inline-block text-xs font-semibold text-tt-orange uppercase tracking-[3px] mb-4">
          Industries
        </span>
        <ul className="reveal stagger-2 flex flex-wrap justify-center gap-x-8 gap-y-3 text-lg sm:text-xl font-semibold text-white">
          {['Broadband & Telecom', 'Subscription', 'Fintech', 'DTC & E-commerce'].map((ind) => (
            <li key={ind} className="font-display">{ind}</li>
          ))}
        </ul>
        <p className="reveal stagger-3 mt-3 text-sm text-tt-gray-500">
          Built for businesses where recurring revenue, LTV, and CAC discipline decide the winner.
        </p>
      </div>
      <div className="section-divider" />
    </section>
  );
}

/* ================================================================
   TRUST BLOCK: YOUR ACCOUNTS, YOUR DATA, YOUR CONTRACTS
   ================================================================ */

function TrustBlock() {
  const sectionRef = useReveal(0.15);

  return (
    <section className="relative surface-paper py-20 sm:py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-tt-teal/20" />
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <h2 className="reveal stagger-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Your accounts. Your data. <span className="gradient-text">Your contracts.</span>
        </h2>
        <p className="reveal stagger-2 mt-5 text-lg text-tt-gray-300 leading-relaxed long-copy">
          We work inside your ad accounts, your platforms, and your tools. Every account,
          audience, asset, and insight we build stays yours from day one, and if we ever part
          ways, you keep all of it. No hostage accounts, no black boxes, no handover fees.
        </p>
        <p className="reveal stagger-3 mt-6">
          <Link href="/trust" className="inline-flex items-center gap-2 text-tt-orange font-semibold transition-colors hover:text-white">
            How we handle access and security
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ================================================================
   SERVICES OVERVIEW (deep-linked subheadings) + ADVISORY + CULTURE
   ================================================================ */

const servicesOverview = [
  {
    heading: 'Demand Gen',
    href: '/capabilities#media-buying',
    line: 'Paid search to retail media, one accountable growth engine.',
    subs: [
      { label: 'Paid Search', href: '/capabilities#paid-search' },
      { label: 'Paid Social', href: '/capabilities#paid-social' },
      { label: 'Programmatic', href: '/capabilities#programmatic' },
      { label: 'Retail', href: '/capabilities#retail' },
    ],
  },
  {
    heading: 'Creative',
    href: '/capabilities#creative',
    line: 'From content strategy to influencer programs, creative that answers to revenue.',
    subs: [
      { label: 'Content Strategy', href: '/capabilities#creative-strategy' },
      { label: 'Production', href: '/capabilities#production' },
      { label: 'UGC', href: '/capabilities#ugc' },
      { label: 'Influencer', href: '/capabilities#influencer' },
    ],
  },
  {
    heading: 'CRO',
    href: '/capabilities#website-cro',
    line: 'Conversion rate lifts that compound wave over wave.',
    subs: [
      { label: 'Website Design & Development', href: '/capabilities#web-design-dev' },
      { label: 'A/B Testing', href: '/capabilities#ab-testing' },
    ],
  },
  {
    heading: 'Analytics',
    href: '/capabilities#analytics',
    line: 'The measurement layer boards and CFOs can act on.',
    subs: [
      { label: 'MMM', href: '/capabilities#mmm' },
      { label: 'Attribution', href: '/capabilities#attribution' },
      { label: 'Reporting', href: '/capabilities#reporting' },
      { label: 'Data Architecture', href: '/capabilities#data-architecture' },
    ],
  },
  {
    heading: 'Organic',
    href: '/capabilities#organic-growth',
    line: 'Social, SEO, GEO/AEO, and ASO built for how customers search now.',
    subs: [
      { label: 'Social', href: '/capabilities#organic-social' },
      { label: 'SEO', href: '/capabilities#seo' },
      { label: 'GEO/AEO', href: '/capabilities#geo-aeo' },
      { label: 'ASO', href: '/capabilities#aso' },
    ],
  },
  {
    heading: 'Lifecycle',
    href: '/capabilities#lifecycle',
    line: 'Email, SMS, CRM, and personalization that grow LTV without touching the media budget.',
    subs: [
      { label: 'Email & SMS', href: '/capabilities#email-sms' },
      { label: 'CRM', href: '/capabilities#crm' },
      { label: 'Personalization', href: '/capabilities#personalization' },
    ],
  },
] as const;

function ServicesOverviewSection() {
  const sectionRef = useReveal(0.05);

  return (
    <section data-tint="ink" className="relative bg-atmosphere py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-tt-teal/25" />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-14">
          <span className="reveal stagger-1 inline-block text-sm font-semibold text-tt-orange uppercase tracking-widest mb-4">
            Everything we do
          </span>
          <h2 className="reveal stagger-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            The full menu, <span className="gradient-text">one view.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          {servicesOverview.map((svc, i) => (
            <div key={svc.heading} className={`reveal stagger-${(i % 6) + 1} rounded-2xl border border-white/[0.05] p-6 transition-colors hover:bg-white/[0.02]`}>
              <Link href={svc.href} className="group inline-flex items-baseline gap-2">
                <span className="text-lg font-bold text-white transition-colors group-hover:text-tt-teal">{svc.heading}</span>
                <svg className="w-4 h-4 text-tt-gray-600 transition-all group-hover:text-tt-orange group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="mt-1.5 text-sm text-tt-gray-400 leading-relaxed">{svc.line}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {svc.subs.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="rounded-full border border-tt-teal/25 bg-tt-teal/[0.06] px-3 py-1 text-xs font-medium text-tt-teal transition-colors hover:bg-tt-teal/15 hover:text-white"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="reveal stagger-1 rounded-2xl border border-white/[0.05] p-6 transition-colors hover:bg-white/[0.02] md:col-span-2">
            <Link href="/capabilities#partnerships" className="group inline-flex items-baseline gap-2">
              <span className="text-lg font-bold text-white transition-colors group-hover:text-tt-teal">Strategic Advisory &amp; PE/VC</span>
              <svg className="w-4 h-4 text-tt-gray-600 transition-all group-hover:text-tt-orange group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="mt-1.5 text-sm text-tt-gray-400 leading-relaxed">
              The operators who run your channels, in the room with your leadership.
              Strategic advisory, not just execution: the same team advises on pricing,
              positioning, measurement, and org design. Consultancy is a first-class
              engagement, not an upsell.
            </p>
          </div>
        </div>

        <div className="reveal stagger-2 mt-10 rounded-2xl border border-white/[0.05] bg-black/[0.14] p-6 text-center">
          <p className="text-base text-tt-gray-300 leading-relaxed max-w-4xl mx-auto long-copy">
            <span className="font-bold text-white">{STATS.teamSize} senior specialists. Zero generalists.</span>{' '}
            Tiger Tracks was founded by ex-Google operators who built growth for some of the
            world&apos;s largest brands, and runs as a fully remote team based in New York. Small
            enough that seniors do the work, big enough to run enterprise programs end to end.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PAGE
   ================================================================ */

/** Diagonal SVG divider between sections (used sparingly, 2 places max) */
function DiagonalDivider({ fill = '#052E3F' }: { fill?: string }) {
  return (
    <div className="relative z-[3]" aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
        <path d="M0,0 L1440,40 L1440,60 L0,60 Z" fill={fill} />
      </svg>
    </div>
  );
}

/** Breathing separator line */
function SectionBoundary() {
  return <div className="section-boundary" aria-hidden="true" />;
}

/** Scroll-triggered body tint shifts via IntersectionObserver */
function ScrollTintManager() {
  useEffect(() => {
    const tintMap: [string, string][] = [
      ['[data-tint="ink"]', 'tint-ink'],
      ['[data-tint="teal"]', 'tint-teal'],
      ['[data-tint="warm"]', 'tint-warm'],
      ['[data-tint="bronze"]', 'tint-bronze'],
    ];

    const observers: IntersectionObserver[] = [];

    tintMap.forEach(([selector, className]) => {
      const el = document.querySelector(selector);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            document.body.classList.remove('tint-ink', 'tint-teal', 'tint-warm', 'tint-bronze');
            document.body.classList.add(className);
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  return null;
}

export default function Home() {
  return (
    <div>
      <ScrollTintManager />
      <HeroSection />
      <DiagonalDivider />
      <LogoBarSection />
      <SectionBoundary />
      <EnterprisePainSection />
      <SectionBoundary />
      <BentoCapabilities />
      <SectionBoundary />
      <MetricsSection />
      <DiagonalDivider />
      <CaseStudiesSection />
      <IndustriesStrip />
      <TechSection />
      <SectionBoundary />
      <PEPartnershipSection />
      <SectionBoundary />
      <TrustBlock />
      <SectionBoundary />
      <ServicesOverviewSection />
      <SectionBoundary />
      <IntelligenceSection />
      <SectionBoundary />
      <FinalCTA />
    </div>
  );
}
