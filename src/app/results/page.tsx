'use client';

import { useState } from 'react';
import { caseStudies, industryFilters, challengeTypes } from '@/data/caseStudies';
import { STATS } from '@/lib/stats';
import { CaseStudyCard } from '@/components/CaseStudyCard';
import { CTASection } from '@/components/CTASection';
import { useInView } from '@/hooks/useInView';

/* ------------------------------------------------------------------ */
/*  Section 1 - Hero                                                   */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section className="relative min-h-[40vh] flex items-center overflow-hidden" style={{
      background: `
        #052E3F
      `,
    }}>
      {/* MJ casestudies-hero background */}
      <div className="pointer-events-none absolute inset-0 z-[0]" aria-hidden="true" style={{
        backgroundImage: 'none' /* brand: no busy photo backgrounds; was url(/images/casestudies-hero.webp) */,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.3,
      }} />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-5xl px-6 py-28 md:py-36 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-tt-orange uppercase tracking-[4px] text-sm font-semibold mb-6">
          CASE STUDIES
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.08] tracking-tight">
          Results that speak{' '}
          <br className="hidden md:block" />
          for themselves
        </h1>
        <p className="mt-6 text-xl text-tt-gray-400 max-w-3xl leading-relaxed">
          {caseStudies.length} case studies with hard metrics: CAC, LTV, ROAS, and revenue impact.
          Each result is reported against the metric the client hired us to move.
        </p>
        {/* Aggregate stats */}
        <div className="mt-10 flex flex-wrap gap-8">
          {[
            { value: String(caseStudies.length), label: 'Case Studies' },
            { value: String(new Set(caseStudies.map((c) => c.industry)).size), label: 'Industries' },
            { value: STATS.revenueGrowth, label: 'Inc. 5000 Growth' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold text-white">{stat.value}</p>
              <p className="text-sm text-tt-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 - Dual Filter Bar                                        */
/* ------------------------------------------------------------------ */

function FilterBar({
  activeIndustry,
  activeChallenge,
  onIndustryChange,
  onChallengeChange,
}: {
  activeIndustry: string;
  activeChallenge: string;
  onIndustryChange: (f: string) => void;
  onChallengeChange: (f: string) => void;
}) {
  return (
    <div className="sticky top-16 z-30 border-b border-white/5" style={{
      background: 'rgba(5, 46, 63, 0.85)',
      backdropFilter: 'blur(16px) saturate(150%)',
      WebkitBackdropFilter: 'blur(16px) saturate(150%)',
    }}>
      <div className="mx-auto max-w-6xl px-6 py-4">
        {/* Challenge row */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-tt-gray-500 font-semibold mb-2">Challenge</p>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mb-1">
            {challengeTypes.map((filter) => (
              <button
                key={filter}
                onClick={() => onChallengeChange(filter)}
                className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition cursor-pointer ${
                  activeChallenge === filter
                    ? 'bg-tt-orange text-white'
                    : 'bg-black/[0.14] text-tt-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 - Case Study Grid                                        */
/* ------------------------------------------------------------------ */

function CaseStudyGrid({
  activeIndustry,
  activeChallenge,
}: {
  activeIndustry: string;
  activeChallenge: string;
}) {
  const { ref, inView } = useInView({ threshold: 0.05 });

  const filtered = caseStudies.filter((cs) => {
    const industryMatch =
      activeIndustry === 'All Industries' || cs.industry === activeIndustry;
    const challengeMatch =
      activeChallenge === 'All Challenges' || cs.challengeType === activeChallenge;
    return industryMatch && challengeMatch;
  });

  return (
    <section className="py-20 px-6" style={{
      background: `
        #052E3F
      `,
    }}>
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Result count */}
        <p className="text-sm text-tt-gray-500 mb-8">
          Showing {filtered.length} case stud{filtered.length === 1 ? 'y' : 'ies'}
          {activeChallenge !== 'All Challenges' && ` for ${activeChallenge}`}
        </p>

        {filtered.length > 0 ? (
          <div
            key={`${activeIndustry}-${activeChallenge}`}
            className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0 transition-all duration-500 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {filtered.map((cs, i) => (
              <div
                key={cs.slug}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <CaseStudyCard
                  slug={cs.slug}
                  client={cs.client}
                  heroMetric={cs.heroMetric}
                  heroMetricLabel={cs.heroMetricLabel}
                  category={cs.category}
                  channels={cs.channels}
                  industry={cs.industry}
                  challengeType={cs.challengeType}
                  summary={cs.summary}
                  wayfinderTitle={cs.wayfinderTactic.title}
                  resultCount={cs.results.length}
                  heroImage={cs.heroImage}
                  isPlaceholder={cs.isPlaceholder}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-tt-gray-500">
              No case studies match these filters.
            </p>
            <p className="text-sm text-tt-gray-600 mt-2">
              Try adjusting your industry or challenge selection.
            </p>
          </div>
        )}
      </div>

      {/* Fade-in keyframe */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out both;
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CaseStudiesPage() {
  const [activeIndustry, setActiveIndustry] = useState('All Industries');
  const [activeChallenge, setActiveChallenge] = useState('All Challenges');

  return (
    <div>
      <HeroSection />
      <FilterBar
        activeIndustry={activeIndustry}
        activeChallenge={activeChallenge}
        onIndustryChange={setActiveIndustry}
        onChallengeChange={setActiveChallenge}
      />
      <CaseStudyGrid
        activeIndustry={activeIndustry}
        activeChallenge={activeChallenge}
      />
      <CTASection
        headline="Get results like these"
        subheadline="Book a free Strategic Diagnostic and get a 90-day roadmap built around your actual numbers."
        primaryCTA={{ text: 'Request a Strategic Diagnostic', href: '/get-started' }}
        dark
      />
    </div>
  );
}
