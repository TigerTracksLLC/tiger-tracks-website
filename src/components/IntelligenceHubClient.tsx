'use client';

import { useState, useRef, useCallback, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlogPost } from '@/data/blogPosts';
import { CTASection } from '@/components/CTASection';
import { useInView } from '@/hooks/useInView';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CATEGORY_IMAGES: Record<string, string> = {
  'AI & Automation': '/images/ai-automation-abstract-brand.png',
  'Platform Strategy': '/images/seo-organic-discovery-brand.png',
  'Measurement & Attribution': '/images/conversion-optimization-abstract-brand.png',
  'Creative & Content': '/images/creative-ugc-performance-brand.png',
  'Agency Strategy': '/images/agency-strategy-abstract-brand.png',
  'PE/VC': '/images/pe-vc-financial-tech-brand.png',
};

const DEEP_REPORTS = [
  {
    category: 'PE/VC',
    title: "Unlocking General Catalyst's Customer Value Fund",
    desc: 'Top US subscription companies poised for non-dilutive growth capital.',
    slug: 'unlocking-general-catalyst-s-customer-value-fund-the-top-us-subscription-companies-poised-for-non-dilutive-growth',
  },
  {
    category: 'AI & Automation',
    title: 'The AI Efficiency Playbook',
    desc: 'Which model wins for every task. A comprehensive comparison for marketers.',
    slug: 'the-ai-model-wars-what-gpt-5-4-claude-4-5-and-gemini-2-5-mean-for-your-marketing-stack',
  },
];

const CATEGORIES = [
  'All',
  'AI & Automation',
  'Platform Strategy',
  'Measurement & Attribution',
  'Creative & Content',
  'PE/VC',
  'Agency Strategy',
];

/* ------------------------------------------------------------------ */
/*  Mono Byline                                                        */
/* ------------------------------------------------------------------ */

function MonoByline({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono text-[#A9B6BA]">
      <span>{post.date}</span>
      <span className="text-[#7FCAD3]">&bull;</span>
      <span>{post.readTime}</span>
      <span className="text-[#7FCAD3]">&bull;</span>
      <span>Tiger Tracks</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Wide Card (col-span-7) - with Image + Parallax                     */
/* ------------------------------------------------------------------ */

function WideCard({ post, index }: { post: BlogPost; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  const imgSrc = CATEGORY_IMAGES[post.category];

  return (
    <motion.div
      className="md:col-span-7"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '100px 0px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <Link
        ref={cardRef}
        href={`/intelligence/${post.slug}`}
        className="group relative block rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 h-full"
        style={{
          background: '#052E3F',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
      >
        {/* Image with parallax depth */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 58vw"
              style={{
                transform: isHovered
                  ? `scale(1.05) translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`
                  : 'scale(1)',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  'rgba(127, 202, 211, 0.10)',
              }}
            />
          )}
          {/* Bottom fade */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'rgba(5, 46, 63, 0.35)' }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <span className="inline-block rounded-full bg-[#7FCAD3]/10 border border-[#7FCAD3]/20 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#7FCAD3]">
            {post.category}
          </span>

          <h3 className="mt-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#7FCAD3] line-clamp-2 leading-snug">
            {post.title}
          </h3>

          <p className="mt-2 text-sm text-[#A9B6BA] line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-4">
            <MonoByline post={post} />
          </div>
        </div>

        {/* Animated teal bottom border */}
        <div
          className="absolute bottom-0 left-0 h-px transition-all duration-500"
          style={{
            width: isHovered ? '100%' : '0%',
            background: '#7FCAD3',
            boxShadow: isHovered ? 'none' : 'none',
          }}
        />
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Narrow Card (col-span-5) - Typographic only, no image             */
/* ------------------------------------------------------------------ */

function NarrowCard({ post, index }: { post: BlogPost; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="md:col-span-5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '100px 0px' }}
      transition={{ duration: 0.6, delay: index * 0.06 + 0.05, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <Link
        href={`/intelligence/${post.slug}`}
        className="group relative flex flex-col justify-between rounded-2xl p-7 h-full transition-all duration-500 hover:-translate-y-1"
        style={{
          background: '#052E3F',
          border: isHovered ? '1px solid rgba(127, 202, 211, 0.35)' : '1px solid rgba(255, 255, 255, 0.06)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle hover glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: 'transparent',
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <span className="inline-block rounded-full bg-[#7FCAD3]/10 border border-[#7FCAD3]/20 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#7FCAD3]">
              {post.category}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A9B6BA]">
              {post.readTime}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#7FCAD3] line-clamp-3 leading-snug">
            {post.title}
          </h3>

          <p className="mt-3 text-sm text-[#A9B6BA] line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="relative z-10 mt-5 pt-4 border-t border-white/[0.04]">
          <MonoByline post={post} />
        </div>

        {/* Animated teal bottom border */}
        <div
          className="absolute bottom-0 left-0 h-px transition-all duration-500"
          style={{
            width: isHovered ? '100%' : '0%',
            background: '#7FCAD3',
            boxShadow: isHovered ? 'none' : 'none',
          }}
        />
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Spotlight Article (col-span-12, full-width 50/50 split)            */
/* ------------------------------------------------------------------ */

function SpotlightArticle({ post }: { post: BlogPost }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  const imgSrc = CATEGORY_IMAGES[post.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <Link
        ref={cardRef}
        href={`/intelligence/${post.slug}`}
        className="group relative block rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
        style={{
          background: '#052E3F',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
      >
        <div className="grid md:grid-cols-2">
          {/* Left: Text */}
          <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block rounded-full bg-[#7FCAD3]/10 border border-[#7FCAD3]/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#7FCAD3]">
                {post.category}
              </span>
              <span className="inline-block rounded-full bg-transparent border border-[#FE5E16]/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#FE5E16]">
                Featured
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-[#7FCAD3] transition-colors duration-300 leading-tight">
              {post.title}
            </h2>

            <p className="mt-5 text-base text-[#A9B6BA] leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            <div className="mt-6">
              <MonoByline post={post} />
            </div>

            <div className="mt-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-tt-orange px-6 py-3 text-sm font-semibold text-tt-ink transition-all duration-300 hover:bg-white">
                Read the Report
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>

          {/* Right: 16:9 Cinematic Image with parallax */}
          <div className="relative overflow-hidden order-1 md:order-2" style={{ aspectRatio: '16/9' }}>
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                style={{
                  transform: isHovered
                    ? `scale(1.06) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`
                    : 'scale(1)',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: 'rgba(127, 202, 211, 0.15)',
                }}
              />
            )}
            {/* Cinematic vignette: left edge bleed + bottom fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'rgba(5, 46, 63, 0.3)',
              }}
            />
          </div>
        </div>

        {/* Animated teal bottom border */}
        <div
          className="absolute bottom-0 left-0 h-px transition-all duration-500"
          style={{
            width: isHovered ? '100%' : '0%',
            background: '#7FCAD3',
            boxShadow: isHovered ? 'none' : 'none',
          }}
        />
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Deep Reports Banner                                                */
/* ------------------------------------------------------------------ */

function DeepReportsBanner() {
  return (
    <section className="py-16 px-6" style={{ background: '#052E3F' }}>
      <div className="mx-auto max-w-6xl">
        <div
          className="rounded-2xl overflow-hidden p-10 md:p-14"
          style={{
            background: '#052E3F',
            border: '1px solid rgba(127, 202, 211, 0.15)',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-[#7FCAD3]/40" />
            <span className="text-xs font-bold uppercase tracking-[4px] text-[#7FCAD3]">Deep Reports</span>
            <div className="h-px flex-1 bg-[#7FCAD3]/40" />
          </div>

          <p className="text-center text-[#A9B6BA] mb-10 max-w-xl mx-auto">
            In-depth research that goes beyond the blog. Download our premium
            reports and get the full strategic picture.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {DEEP_REPORTS.map((report) => (
              <Link
                key={report.slug}
                href={`/intelligence/${report.slug}`}
                className="group rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(0, 0, 0, 0.14)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <span className="inline-block rounded-full bg-[#7FCAD3]/10 border border-[#7FCAD3]/20 px-3 py-1 text-xs font-semibold text-[#7FCAD3]">
                  {report.category}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white group-hover:text-[#7FCAD3] transition-colors">
                  {report.title}
                </h3>
                <p className="mt-2 text-sm text-[#A9B6BA]">{report.desc}</p>
                <div className="mt-5">
                  <span className="text-sm font-semibold text-[#FE5E16] flex items-center gap-2">
                    Download Report
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email for early access"
              className="w-full rounded-lg bg-black/[0.14] border border-white/10 px-4 py-3 text-sm text-white placeholder-[#91A2A9] focus:outline-none focus:border-[#7FCAD3]/40 transition"
            />
            <button className="shrink-0 rounded-full bg-tt-orange px-6 py-3 text-sm font-semibold text-tt-ink hover:bg-white transition">
              Get Reports
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Asymmetric Grid Renderer                                           */
/*  Row pattern: [7, 5], [5, 7], [7, 5], [5, 7]...                    */
/*  col-span-7 = WideCard (image + parallax)                           */
/*  col-span-5 = NarrowCard (typographic only)                         */
/* ------------------------------------------------------------------ */

function AsymmetricGrid({ posts }: { posts: BlogPost[] }) {
  /* Pair posts into rows of 2 */
  const rows: BlogPost[][] = [];
  for (let i = 0; i < posts.length; i += 2) {
    rows.push(posts.slice(i, i + 2));
  }

  return (
    <div className="space-y-6">
      {rows.map((row, rowIdx) => {
        /* Alternate: even rows = [7, 5], odd rows = [5, 7] */
        const wideFirst = rowIdx % 2 === 0;
        const globalIdx = rowIdx * 2;

        /* Single remaining article gets full wide treatment */
        if (row.length === 1) {
          return (
            <div key={row[0].slug} className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <WideCard post={row[0]} index={globalIdx} />
            </div>
          );
        }

        return (
          <div key={row[0].slug} className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {wideFirst ? (
              <>
                <WideCard post={row[0]} index={globalIdx} />
                <NarrowCard post={row[1]} index={globalIdx + 1} />
              </>
            ) : (
              <>
                <NarrowCard post={row[0]} index={globalIdx} />
                <WideCard post={row[1]} index={globalIdx + 1} />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

const POSTS_PER_PAGE = 8;

export function IntelligenceHubClient({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });

  /* Split posts */
  const featured = posts[0];
  const remaining = posts.slice(1);

  /* Filtered view */
  const isFiltered = activeCategory !== 'All';
  const allFilteredPosts = isFiltered
    ? posts.filter((p) => p.category === activeCategory)
    : remaining;

  /* Reset visible count when category changes */
  const displayPosts = allFilteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < allFilteredPosts.length;
  const remainingCount = allFilteredPosts.length - visibleCount;

  return (
    <>
      {/* ── Hero + Spotlight ──────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ background: '#052E3F' }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: 'transparent',
          }}
        />

        <div
          className={`relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-8 transition-all duration-700 ${
            heroInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <p className="eyebrow">
            Eye of the Tiger
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl max-w-4xl leading-tight">
            Thought leadership and intelligence
          </h1>
          <p className="mt-4 text-lg text-[#A9B6BA] max-w-2xl">
            Strategic research and tactical playbooks for the performance era.
          </p>
        </div>

        {/* Spotlight: col-span-12, full-width 50/50 split */}
        {featured && !isFiltered && (
          <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-8">
            <SpotlightArticle post={featured} />
          </div>
        )}
      </section>

      {/* ── Category Filters (sticky) ─────────────────────────────── */}
      <div
        className="sticky top-16 z-30 border-b border-white/5"
        style={{
          background: 'rgba(5, 46, 63, 0.85)',
          backdropFilter: 'blur(16px) saturate(150%)',
          WebkitBackdropFilter: 'blur(16px) saturate(150%)',
        }}
      >
        <div className="mx-auto max-w-6xl py-4 px-6 overflow-x-auto">
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(POSTS_PER_PAGE);
                }}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === cat
                    ? 'bg-tt-paper text-tt-ink'
                    : 'bg-black/[0.14] text-[#A9B6BA] hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Asymmetric Editorial Grid ─────────────────────────────── */}
      <section
        className="py-16 px-6"
        style={{
          background: '#052E3F',
        }}
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-white mb-8">
            {isFiltered ? activeCategory : 'Latest Thought Leadership & Intelligence'}
          </h2>

          {displayPosts.length === 0 ? (
            <p className="py-16 text-center text-[#91A2A9]">
              No articles in this category yet.
            </p>
          ) : (
            <>
              <AsymmetricGrid posts={displayPosts} />

              {/* Load More */}
              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setVisibleCount((c) => c + POSTS_PER_PAGE)}
                    className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      color: '#FFFFFF',
                  border: '1px solid rgba(239, 240, 239, 0.45)',
                  background: 'transparent',
                    }}
                  >
                    Load More Articles
                    <span className="text-xs text-tt-gray-300">
                      ({remainingCount} remaining)
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Deep Reports ──────────────────────────────────────────── */}
      {!isFiltered && <DeepReportsBanner />}

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <CTASection
        headline="Put this research to work"
        subheadline="Book a free Strategic Diagnostic and see how these ideas apply to your numbers."
        primaryCTA={{ text: 'Request a Strategic Diagnostic', href: '/get-started' }}
        dark
      />
    </>
  );
}
