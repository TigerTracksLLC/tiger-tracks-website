'use client';

import Link from 'next/link';
import Image from 'next/image';

interface CaseStudyCardProps {
  slug: string;
  client: string;
  heroMetric: string;
  heroMetricLabel: string;
  category: string;
  channels: string[];
  industry: string;
  challengeType: string;
  summary: string;
  wayfinderTitle: string;
  resultCount: number;
  heroImage?: string;
  isPlaceholder?: boolean;
}

/* Brand-recolored visuals used when a case study has no hero image. */
const FALLBACK_IMAGES = [
  '/images/media-buying-dashboard-brand.png',
  '/images/network-connection-map-brand.png',
  '/images/scatter-plot-data-viz-brand.png',
  '/images/conversion-optimization-abstract-brand.png',
  '/images/precision-targeting-ui-brand.png',
  '/images/full-funnel-automation-ui-brand.png',
  '/images/ltv-extension-ui-brand.png',
  '/images/seo-organic-discovery-brand.png',
];

function fallbackImage(key: string): string {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return FALLBACK_IMAGES[h % FALLBACK_IMAGES.length];
}

export function CaseStudyCard({
  slug,
  client,
  heroMetric,
  heroMetricLabel,
  category,
  channels,
  industry,
  challengeType,
  summary,
  wayfinderTitle,
  resultCount,
  heroImage,
  isPlaceholder,
}: CaseStudyCardProps) {
  return (
    <Link
      href={`/results/${slug}`}
      className="group block relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-tt-teal/30"
      style={{
        background: 'rgba(0, 0, 0, 0.14)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Placeholder badge */}
      {isPlaceholder && (
        <div className="absolute top-3 right-3 z-20 rounded-full bg-transparent border border-tt-orange/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-tt-orange">
          Representative
        </div>
      )}

      {/* Hero image area (top 50%) */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-tt-teal/10 ">
        <Image
          src={heroImage || fallbackImage(`${client}${heroMetric}${heroMetricLabel}`)}
          alt={`${client} case study`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-tt-ink/55" />

        {/* Overlay badges on image */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          <span className="rounded-full bg-tt-ink border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-tt-gray-300">
            {challengeType}
          </span>
        </div>

        {/* Hero metric overlaid at bottom of image */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <p className="text-5xl font-extrabold tabular-nums tracking-tight text-white group-hover:text-tt-gray-200 transition-colors duration-500 leading-none drop-shadow-lg">
            {heroMetric}
          </p>
          <p className="mt-1.5 text-sm text-tt-gray-300 drop-shadow-md">{heroMetricLabel}</p>
        </div>
      </div>

      {/* Content section (bottom 50%) */}
      <div className="relative p-6 pt-4">
        {/* Client name */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-bold uppercase tracking-wider text-tt-teal">
            {client}
          </span>
          <span className="h-px flex-1 bg-tt-teal/20" />
        </div>

        {/* Summary */}
        <p className="text-sm leading-relaxed text-tt-gray-400 line-clamp-3 mb-4">
          {summary}
        </p>

        {/* Channel tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {channels.map((channel) => (
            <span
              key={channel}
              className="rounded-full bg-black/[0.14] border border-white/8 px-3 py-1 text-xs font-medium text-tt-gray-500"
            >
              {channel}
            </span>
          ))}
        </div>

        {/* Wayfinder AI badge */}
        <div className="flex items-center gap-2 py-3 px-3 rounded-lg bg-tt-teal/5 border border-tt-teal/10">
          <svg className="w-4 h-4 text-tt-teal flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
          </svg>
          <span className="text-xs text-tt-teal font-medium">
            Wayfinder AI: {wayfinderTitle}
          </span>
        </div>

        {/* Bottom bar */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-tt-gray-500">
            {resultCount} metric{resultCount !== 1 ? 's' : ''}
          </span>
          <div className="flex items-center gap-2 text-sm font-semibold text-tt-orange group-hover:text-tt-orange transition-colors">
            <span>Full story</span>
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
  );
}
