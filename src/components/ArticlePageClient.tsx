'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { BlogPost } from '@/data/blogPosts';
import { publishedPosts as blogPosts } from '@/data/publishedPosts';
import { CTASection } from '@/components/CTASection';
import {
  NotionBlockRenderer,
  shouldSkipOptimizer,
  richTextToPlain,
  headingId,
} from '@/components/NotionBlockRenderer';
import type { NotionBlock } from '@/lib/notion';
import { submitNewsletter } from '@/app/actions/submitNewsletter';

/* ------------------------------------------------------------------ */
/*  Category Image Mapping (for related cards)                         */
/* ------------------------------------------------------------------ */

const CATEGORY_IMAGES: Record<string, string> = {
  'AI & Automation': '/images/ai-automation-abstract-brand.png',
  'Platform Strategy': '/images/seo-organic-discovery-brand.png',
  'Measurement & Attribution': '/images/conversion-optimization-abstract-brand.png',
  'Creative & Content': '/images/creative-ugc-performance-brand.png',
  'Agency Strategy': '/images/agency-strategy-abstract-brand.png',
  'PE/VC': '/images/pe-vc-financial-tech-brand.png',
};

/* ------------------------------------------------------------------ */
/*  Reading Progress Bar                                               */
/* ------------------------------------------------------------------ */

function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left print:hidden"
      style={{
        scaleX,
        background: '#7FCAD3',
        boxShadow: 'none',
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Share Bar                                                          */
/* ------------------------------------------------------------------ */

function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () =>
    typeof window !== 'undefined' ? window.location.href : '';

  const shareLinkedIn = () => {
    const url = getUrl();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer,width=600,height=500'
    );
  };

  const shareX = () => {
    const url = getUrl();
    window.open(
      `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      '_blank',
      'noopener,noreferrer,width=600,height=500'
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: do nothing */
    }
  };

  const btnClass =
    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 print:hidden';

  return (
    <div className="flex flex-wrap items-center gap-2 print:hidden">
      <button
        onClick={shareLinkedIn}
        className={btnClass}
        style={{ background: 'rgba(127, 202, 211, 0.08)', border: '1px solid rgba(127, 202, 211, 0.2)', color: '#7FCAD3' }}
        aria-label="Share on LinkedIn"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </button>

      <button
        onClick={shareX}
        className={btnClass}
        style={{ background: 'rgba(0, 0, 0, 0.14)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#C5CDCF' }}
        aria-label="Share on X"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        X
      </button>

      <button
        onClick={copyLink}
        className={btnClass}
        style={{
          background: copied ? 'rgba(127, 202, 211, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          border: copied ? '1px solid rgba(127, 202, 211, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
          color: copied ? '#7FCAD3' : '#C5CDCF',
        }}
        aria-label="Copy link"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {copied ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          )}
        </svg>
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Content Loading Fallback (when Notion blocks are unavailable)      */
/* ------------------------------------------------------------------ */

function ContentFallback({ article }: { article: BlogPost }) {
  return (
    <div className="py-12 text-center">
      <p className="text-[#EFF0EF] text-base font-sans mb-4">
        This article is loading its content from Notion.
      </p>
      {article.excerpt && (
        <p className="text-[#EFF0EF]/60 text-base font-sans max-w-lg mx-auto mb-8">
          {article.excerpt}
        </p>
      )}
      <p className="text-sm text-[#EFF0EF]/40 font-sans">
        If this persists, the content may be temporarily unavailable. Please try refreshing in a moment.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Related Article Card                                               */
/* ------------------------------------------------------------------ */

function RelatedCard({ post }: { post: BlogPost }) {
  const [isHovered, setIsHovered] = useState(false);
  const imgSrc = CATEGORY_IMAGES[post.category];

  return (
    <Link
      href={`/intelligence/${post.slug}`}
      className="group relative block rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
      style={{
        background: '#052E3F',
        border: isHovered
          ? '1px solid rgba(127, 202, 211, 0.35)'
          : '1px solid rgba(255, 255, 255, 0.06)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(127, 202, 211, 0.10)',
            }}
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(5, 46, 63, 0.35)' }}
        />
      </div>

      <div className="p-6">
        <span className="inline-block rounded-full bg-[#7FCAD3]/10 border border-[#7FCAD3]/20 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#7FCAD3]">
          {post.category}
        </span>
        <h3 className="mt-3 text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#7FCAD3] line-clamp-2 leading-snug">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-[#A9B6BA] line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono text-[#A9B6BA]">
          <span>{post.date}</span>
          <span className="text-[#7FCAD3]">&bull;</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-px transition-all duration-500"
        style={{
          width: isHovered ? '100%' : '0%',
          background: '#7FCAD3',
          boxShadow: isHovered ? 'none' : 'none',
        }}
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Format date for metadata line                                      */
/* ------------------------------------------------------------------ */

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

/* ------------------------------------------------------------------ */
/*  Table of Contents                                                   */
/*  Built from the article's heading blocks. Anchors match the ids      */
/*  emitted by NotionBlockRenderer's heading components.                */
/* ------------------------------------------------------------------ */

interface TocEntry {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(blocks?: NotionBlock[]): TocEntry[] {
  if (!blocks) return [];
  const levels: Record<string, number> = {
    heading_1: 1,
    heading_2: 2,
    heading_3: 3,
  };
  const entries: TocEntry[] = [];
  for (const b of blocks) {
    const level = levels[b.type];
    if (!level) continue;
    const text = richTextToPlain(b.data.rich_text).trim();
    if (!text) continue;
    entries.push({ id: headingId(b), text, level });
  }
  return entries;
}

function TableOfContents({ blocks }: { blocks?: NotionBlock[] }) {
  const [open, setOpen] = useState(true);
  const headings = extractHeadings(blocks);

  // Only worth showing when there are at least three headings.
  if (headings.length < 3) return null;

  // Normalise so the shallowest heading sits flush-left.
  const minLevel = Math.min(...headings.map((h) => h.level));

  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 rounded-2xl border border-white/[0.08] bg-black/[0.14] p-5 print:hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[3px] text-[#7FCAD3]">
          On this page
        </span>
        <svg
          className={`h-4 w-4 text-[#A9B6BA] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ol className="mt-4 space-y-1.5">
          {headings.map((h) => (
            <li key={h.id} style={{ paddingLeft: `${(h.level - minLevel) * 16}px` }}>
              <a
                href={`#${h.id}`}
                className="block text-sm leading-snug text-[#A9B6BA] transition-colors duration-200 hover:text-[#7FCAD3]"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Author Bio                                                          */
/* ------------------------------------------------------------------ */

function AuthorBio({ article }: { article: BlogPost }) {
  const isPerson = !!article.author && article.author !== 'Tiger Tracks';
  const name = isPerson ? (article.author as string) : 'Tiger Tracks';
  const role = isPerson
    ? article.authorPedigree || 'Tiger Tracks'
    : 'Performance marketing, built by ex-Google leaders';
  const bio = isPerson
    ? `${article.authorPedigree ? article.authorPedigree + '. ' : ''}Writing for the Eye of the Tiger intelligence series.`
    : 'Tiger Tracks is an Inc. 5000 performance marketing agency founded by former Google leaders. The Eye of the Tiger series shares the strategic research and tactical playbooks we use to manage ad spend across our client portfolio.';

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <aside className="mt-10 flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-black/[0.14] p-5 print:hidden">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ background: '#7FCAD3' }}
        aria-hidden="true"
      >
        {initials}
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#7FCAD3]">
          {isPerson ? 'Author' : 'About the author'}
        </p>
        <p className="mt-1 text-base font-semibold text-[#EFF0EF]">{name}</p>
        <p className="text-sm text-[#A9B6BA]">{role}</p>
        <p className="mt-2 text-sm leading-relaxed text-[#A9B6BA]">{bio}</p>
        <Link
          href="/company"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#7FCAD3] transition hover:gap-2.5"
        >
          Meet the team
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Newsletter Signup                                                   */
/* ------------------------------------------------------------------ */

function NewsletterSignup({ title }: { title: string }) {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState(''); // honeypot - must stay empty
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const getHutk = () => {
    if (typeof document === 'undefined') return undefined;
    const match = document.cookie.match(/hubspotutk=([^;]+)/);
    return match ? match[1] : undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    startTransition(async () => {
      const result = await submitNewsletter({
        email,
        hp,
        source: title,
        hutk: getHutk(),
        pageUri: typeof window !== 'undefined' ? window.location.href : undefined,
        pageName: typeof document !== 'undefined' ? document.title : undefined,
      });
      setStatus(result.success ? 'ok' : 'error');
      setMessage(result.message);
      if (result.success) setEmail('');
    });
  };

  return (
    <section
      className="mt-10 rounded-2xl border border-[#7FCAD3]/20 p-6 sm:p-8 print:hidden"
      style={{ background: 'rgba(127, 202, 211, 0.10)' }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[3px] text-[#7FCAD3]">
        Eye of the Tiger
      </p>
      <h3 className="mt-2 text-xl font-bold text-[#EFF0EF]">
        Get our research in your inbox
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#A9B6BA]">
        Strategic research and tactical playbooks for operators and investors. No spam, unsubscribe anytime.
      </p>

      {status === 'ok' ? (
        <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#7FCAD3]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {message}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
          {/* Honeypot: hidden from real users, catches bots. */}
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full flex-1 rounded-full border border-white/10 bg-[#052E3F] px-5 py-3 text-sm text-[#EFF0EF] placeholder-[#A9B6BA]/60 outline-none transition focus:border-[#7FCAD3]/60"
          />
          <button
            type="submit"
            disabled={isPending}
            className="shrink-0 rounded-full bg-tt-orange px-6 py-3 text-sm font-semibold text-tt-ink transition hover:bg-white disabled:opacity-60"
          >
            {isPending ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="mt-3 text-sm text-red-400" role="alert">
          {message}
        </p>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Article Page (Main Export) - Notion-Style Layout                    */
/* ------------------------------------------------------------------ */

interface ArticlePageClientProps {
  article: BlogPost;
  blocks?: NotionBlock[];
}

export function ArticlePageClient({ article, blocks }: ArticlePageClientProps) {
  const hasNotionContent = blocks && blocks.length > 0;

  /* Related articles */
  const sameCat = blogPosts.filter(
    (p) => p.category === article.category && p.slug !== article.slug,
  );
  const otherPosts = blogPosts.filter(
    (p) => p.category !== article.category && p.slug !== article.slug,
  );
  const related = [...sameCat, ...otherPosts].slice(0, 3);

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* ============================================================ */}
      {/*  Full Page Background (#052E3F = Notion dark mode)            */}
      {/* ============================================================ */}
      <section
        className="relative min-h-screen py-12 md:py-20 px-4 sm:px-6 print:py-0 print:px-0 print:bg-white"
        style={{ background: '#052E3F' }}
      >
        {/* Back navigation */}
        <div className="mx-auto max-w-[720px] mb-6 print:hidden">
          <Link
            href="/intelligence"
            className="inline-flex items-center gap-1.5 text-sm text-tt-gray-400 transition hover:text-[#7FCAD3]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Intelligence
          </Link>
        </div>

        {/* ========================================================== */}
        {/*  Content Container (720px, no manuscript border)            */}
        {/* ========================================================== */}
        <motion.article
          className="mx-auto max-w-[720px] print:bg-white print:max-w-none print:p-[1in]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ====================================================== */}
          {/*  Cover Image                                            */}
          {/* ====================================================== */}
          {article.coverImage && (
            <div className="mb-8">
              <Image
                src={article.coverImage}
                alt={article.title}
                width={720}
                height={405}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 720px"
                priority
                unoptimized={shouldSkipOptimizer(article.coverImage)}
              />
            </div>
          )}

          {/* ====================================================== */}
          {/*  Title                                                   */}
          {/* ====================================================== */}
          <header className="mb-8">
            <h1
              className="font-sans text-[40px] font-bold text-[#EFF0EF] leading-[48px] print:text-black"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {article.title}
            </h1>

            {/* Metadata line: italic, 16px */}
            <p className="mt-4 text-base font-sans text-[#EFF0EF]/60 print:text-tt-gray-500">
              Tiger Tracks &middot; Eye of the Tiger &middot; {article.category} &middot; {formatDate(article.date)}
            </p>

            {/* Share bar */}
            <div className="mt-4">
              <ShareBar title={article.title} />
            </div>
          </header>

          {/* Divider */}
          <hr className="border-t border-white/[0.08] mb-6 print:border-tt-gray-300" />

          {/* ====================================================== */}
          {/*  Table of Contents (auto-built from headings)            */}
          {/* ====================================================== */}
          {hasNotionContent && <TableOfContents blocks={blocks} />}

          {/* ====================================================== */}
          {/*  Article Body                                            */}
          {/* ====================================================== */}
          {hasNotionContent ? (
            <NotionBlockRenderer blocks={blocks} />
          ) : (
            <ContentFallback article={article} />
          )}

          {/* ====================================================== */}
          {/*  Author Bio + Newsletter Capture                         */}
          {/* ====================================================== */}
          <AuthorBio article={article} />
          <NewsletterSignup title={article.title} />

          {/* ====================================================== */}
          {/*  Footer                                                  */}
          {/* ====================================================== */}
          <hr className="border-t border-white/[0.08] mt-10 mb-6 print:border-tt-gray-300" />

          <div className="flex items-center justify-between print:hidden">
            <ShareBar title={article.title} />
          </div>

          {/* Print footer */}
          <div className="hidden print:block mt-12 pt-6 border-t border-tt-gray-300 text-center text-xs text-tt-gray-500">
            <p>Tiger Tracks &bull; tigertracks.ai</p>
          </div>
        </motion.article>
      </section>

      {/* ============================================================ */}
      {/*  Related Research                                             */}
      {/* ============================================================ */}
      <section className="py-20 px-6 print:hidden" style={{ background: '#052E3F' }}>
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px flex-1 bg-[#7FCAD3]/30" />
            <h2 className="text-sm font-bold uppercase tracking-[4px] text-[#7FCAD3] whitespace-nowrap">
              Related Research
            </h2>
            <div className="h-px flex-1 bg-[#7FCAD3]/30" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.map((post) => (
              <RelatedCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="print:hidden">
        <CTASection
          headline="Put this research into action"
          subheadline="Book a free Strategic Diagnostic and see how these insights apply to your specific business."
          primaryCTA={{ text: 'Request a Strategic Diagnostic', href: '/get-started' }}
          secondaryCTA={{ text: 'Read More Research', href: '/intelligence' }}
          dark
        />
      </div>
    </>
  );
}
