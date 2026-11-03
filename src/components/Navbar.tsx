'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '@/components/MagneticButton';

/* ------------------------------------------------------------------ */
/*  Mega-menu data                                                     */
/* ------------------------------------------------------------------ */

interface MegaMenuItem {
  label: string;
  href: string;
  description: string;
  subs?: { label: string; href: string }[];
}

interface MegaMenuConfig {
  items: MegaMenuItem[];
  feature: {
    title: string;
    description: string;
    href: string;
    image: string;
  };
}

const megaMenus: Record<string, MegaMenuConfig> = {
  Capabilities: {
    items: [
      {
        label: 'Demand Gen',
        href: '/capabilities#media-buying',
        description: 'Paid media that scales without breaking CAC',
        subs: [
          { label: 'Paid Search', href: '/capabilities#paid-search' },
          { label: 'Paid Social', href: '/capabilities#paid-social' },
          { label: 'Programmatic', href: '/capabilities#programmatic' },
          { label: 'Retail', href: '/capabilities#retail' },
        ],
      },
      {
        label: 'Creative',
        href: '/capabilities#creative',
        description: 'Performance creative that converts',
        subs: [
          { label: 'Content Strategy', href: '/capabilities#creative-strategy' },
          { label: 'Production', href: '/capabilities#production' },
          { label: 'UGC', href: '/capabilities#ugc' },
          { label: 'Influencer', href: '/capabilities#influencer' },
        ],
      },
      {
        label: 'CRO',
        href: '/capabilities#website-cro',
        description: 'Conversion lifts that compound wave over wave',
        subs: [
          { label: 'Website Design & Development', href: '/capabilities#web-design-dev' },
          { label: 'A/B Testing', href: '/capabilities#ab-testing' },
        ],
      },
      {
        label: 'Analytics',
        href: '/capabilities#analytics',
        description: 'Measurement boards and CFOs can act on',
        subs: [
          { label: 'MMM', href: '/capabilities#mmm' },
          { label: 'Attribution', href: '/capabilities#attribution' },
          { label: 'Reporting', href: '/capabilities#reporting' },
          { label: 'Data Architecture', href: '/capabilities#data-architecture' },
        ],
      },
      {
        label: 'Organic',
        href: '/capabilities#organic-growth',
        description: 'Own the rankings and the AI answers',
        subs: [
          { label: 'Social', href: '/capabilities#organic-social' },
          { label: 'SEO', href: '/capabilities#seo' },
          { label: 'GEO/AEO', href: '/capabilities#geo-aeo' },
          { label: 'ASO', href: '/capabilities#aso' },
        ],
      },
      {
        label: 'Lifecycle',
        href: '/capabilities#lifecycle',
        description: 'An AI engine on your ESP that grows LTV',
        subs: [
          { label: 'Email & SMS', href: '/capabilities#email-sms' },
          { label: 'CRM', href: '/capabilities#crm' },
          { label: 'Personalization', href: '/capabilities#personalization' },
        ],
      },
    ],
    feature: {
      title: 'Explore Wayfinder AI',
      description:
        'Our proprietary engine that finds and fixes revenue leaks across your entire funnel.',
      href: '/wayfinder',
      image: '/images/nav-feature-brand.png',
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Nav links                                                          */
/* ------------------------------------------------------------------ */

const navLinks = [
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Results', href: '/results' },
  { label: 'AI Tools', href: '/ai-tools' },
  { label: 'PE & VC Partners', href: '/pe-vc' },
  { label: 'Thought Leadership & Intelligence', href: '/intelligence' },
  { label: 'Company', href: '/company' },
];

/* ------------------------------------------------------------------ */
/*  Desktop dropdown animation variants                                */
/* ------------------------------------------------------------------ */

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: { duration: 0.15, ease: 'easeIn' as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Mobile accordion sub-component                                     */
/* ------------------------------------------------------------------ */

function MobileAccordion({
  label,
  href,
  items,
  isOpen,
  onToggle,
  onNavigate,
  index,
  menuOpen,
}: {
  label: string;
  href: string;
  items: MegaMenuItem[];
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  index: number;
  menuOpen: boolean;
}) {
  return (
    <div
      className="border-b border-white/5"
      style={{ transitionDelay: menuOpen ? `${index * 50}ms` : '0ms' }}
    >
      {/* Accordion trigger row */}
      <div className="flex items-center">
        <Link
          href={href}
          onClick={onNavigate}
          className="flex-1 text-lg text-tt-gray-300 transition-all duration-300 hover:text-white py-3"
        >
          {label}
        </Link>
        <button
          onClick={onToggle}
          className="p-2 -mr-2 text-[#91A2A9] hover:text-white transition-colors"
          aria-label={`Expand ${label} sub-menu`}
        >
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </button>
      </div>

      {/* Accordion body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="accordion-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-3 space-y-0.5">
              {items.map((item) => (
                <div key={item.href} className="rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-white/[0.04]">
                  <Link href={item.href} onClick={onNavigate} className="block">
                    <span className="block text-sm font-medium text-white/80 transition-colors duration-200 hover:text-[#7FCAD3]">
                      {item.label}
                    </span>
                    <span className="block text-xs mt-0.5 text-[#91A2A9]">
                      {item.description}
                    </span>
                  </Link>
                  {item.subs && (
                    <span className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                      {item.subs.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={onNavigate}
                          className="text-[11px] font-medium text-tt-orange transition-colors duration-200 hover:text-white"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Navbar                                                        */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close mega on outside click */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMega(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setMobileAccordion(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Close mobile menu on ESC */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setActiveMega(null);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const openMega = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(label);
  }, []);

  const scheduleMegaClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMega(null), 200);
  }, []);

  const cancelMegaClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileAccordion(null);
  }, []);

  const megaData = activeMega ? megaMenus[activeMega] : null;

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-tt-ink/95 border-b border-white/[0.08]'
          : 'bg-tt-ink/95 border-b border-transparent'
      }`}
    >
      {/* Scroll-progress gradient indicator bar */}
      <div
        className="absolute bottom-0 left-0 h-px"
        style={{
          width: `${scrollProgress * 100}%`,
          background: '#7FCAD3',
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="group relative flex items-center z-[60]">
          <Image
            src="/brand/tigertracks-logo-white.svg"
            alt="Tiger Tracks"
            width={293}
            height={161}
            priority
            unoptimized
            className="h-10 w-auto md:h-12 object-contain transition-opacity duration-300 group-hover:opacity-80"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const hasMega = link.label in megaMenus;
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => hasMega && openMega(link.label)}
                onMouseLeave={scheduleMegaClose}
              >
                <Link
                  href={link.href}
                  className={`relative text-sm transition-colors duration-300 hover:text-white group flex items-center gap-1 pb-1 border-b-2 ${
                    isActive
                      ? 'border-[#7FCAD3] text-white'
                      : 'border-transparent text-tt-gray-400'
                  }`}
                >
                  {link.label}
                  {hasMega && (
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeMega === link.label ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>
              </div>
            );
          })}

          {/* Magnetic-pull CTA */}
          <MagneticButton
            as="a"
            href="/get-started"
            className="relative overflow-hidden rounded-full bg-tt-orange px-6 py-2.5 text-sm font-semibold text-white hover:shadow-tt-orange/20 active:translate-y-0 inline-block"
            attractRadius={60}
            strength={0.3}
            textParallax={1.8}
          >
            Request a Strategic Diagnostic
          </MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="relative flex flex-col gap-1.5 lg:hidden p-2 -m-2 z-[60]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              mobileOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              mobileOpen ? 'opacity-0 scale-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              mobileOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* ============================================================ */}
      {/*  DESKTOP MEGA-MENU DROPDOWN (hidden on < lg)                  */}
      {/* ============================================================ */}
      <AnimatePresence>
        {megaData && (
          <motion.div
            key={activeMega}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 right-0 top-full z-40 hidden lg:block"
            onMouseEnter={cancelMegaClose}
            onMouseLeave={scheduleMegaClose}
          >
            <div
              className="mx-auto max-w-7xl px-6 py-8"
              style={{
                background: 'rgba(5, 46, 63, 0.80)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
                borderRight: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <div className="grid grid-cols-5 gap-8">
                {/* Left: Nav links */}
                <div className="col-span-3 grid grid-cols-2 gap-x-8 gap-y-1">
                  {megaData.items.map((item, i) => (
                    <div
                      key={item.href}
                      className="group rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-white/[0.04]"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.04,
                          duration: 0.3,
                          ease: 'easeOut',
                        }}
                      >
                        <Link href={item.href} onClick={() => setActiveMega(null)} className="block">
                          <span className="block text-sm font-medium text-white transition-colors duration-200 group-hover:text-[#7FCAD3]">
                            {item.label}
                          </span>
                          <span className="block text-xs mt-0.5 text-[#91A2A9] transition-colors duration-200 group-hover:text-[#A9B6BA]">
                            {item.description}
                          </span>
                        </Link>
                        {item.subs && (
                          <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                            {item.subs.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setActiveMega(null)}
                                className="text-[11px] font-medium text-tt-teal transition-colors duration-200 hover:text-white"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </span>
                        )}
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* Right: Featured promo card */}
                <div className="col-span-2">
                  <Link
                    href={megaData.feature.href}
                    onClick={() => setActiveMega(null)}
                    className="group block rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.04]"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      background: 'rgba(5, 46, 63, 0.6)',
                    }}
                  >
                    {/* Image placeholder */}
                    <div className="relative w-full h-32 rounded-lg overflow-hidden mb-4 bg-[#052E3F]">
                      <Image
                        src={megaData.feature.image}
                        alt={megaData.feature.title}
                        fill
                        className="object-cover opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                        sizes="400px"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-tt-ink/40" />
                    </div>
                    <p className="text-sm font-semibold text-white mb-1 transition-colors duration-200 group-hover:text-[#7FCAD3]">
                      {megaData.feature.title}
                    </p>
                    <p className="text-xs text-[#91A2A9] leading-relaxed">
                      {megaData.feature.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-[#7FCAD3] transition-all duration-200 group-hover:gap-2">
                      Learn more
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/*  MOBILE FULL-SCREEN OVERLAY                                   */}
      {/* ============================================================ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm lg:hidden z-[51]"
              onClick={closeMobile}
            />

            {/* Slide-out panel */}
            <motion.div
              key="mobile-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring' as const,
                damping: 30,
                stiffness: 300,
              }}
              className="fixed inset-y-0 right-0 w-full max-w-sm lg:hidden z-[52] overflow-y-auto overscroll-contain"
              style={{
                background: 'rgba(5, 46, 63, 0.97)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {/* Close zone / top padding */}
              <div className="h-20" />

              <div className="flex flex-col px-8 pb-12">
                {navLinks.map((link, i) => {
                  const megaConfig = megaMenus[link.label];

                  /* Links WITH accordion sub-menus */
                  if (megaConfig) {
                    return (
                      <MobileAccordion
                        key={link.href}
                        label={link.label}
                        href={link.href}
                        items={megaConfig.items}
                        isOpen={mobileAccordion === link.label}
                        onToggle={() =>
                          setMobileAccordion(
                            mobileAccordion === link.label
                              ? null
                              : link.label
                          )
                        }
                        onNavigate={closeMobile}
                        index={i}
                        menuOpen={mobileOpen}
                      />
                    );
                  }

                  /* Standard links */
                  const isMobileActive = pathname === link.href || pathname.startsWith(link.href + '/');
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className={`text-lg transition-all duration-300 hover:text-white hover:translate-x-2 py-3 border-b ${
                        isMobileActive
                          ? 'text-white border-b-2 border-[#7FCAD3]'
                          : 'text-tt-gray-300 border-white/5'
                      }`}
                      style={{
                        transitionDelay: mobileOpen
                          ? `${i * 50}ms`
                          : '0ms',
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* CTA */}
                <Link
                  href="/get-started"
                  onClick={closeMobile}
                  className="mt-8 text-center rounded-full py-3.5 font-semibold text-tt-ink text-sm transition-all duration-300"
                  style={{
                    background:
                      '#FE5E16',
                    boxShadow: 'none',
                  }}
                >
                  Request a Strategic Diagnostic
                </Link>

                {/* Contact shortcut */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <p className="text-xs uppercase tracking-wider text-[#91A2A9] mb-3 font-medium">
                    Get in touch
                  </p>
                  <a
                    href="mailto:info@tigertracks.ai"
                    className="text-sm text-[#7FCAD3] hover:text-white transition-colors"
                  >
                    info@tigertracks.ai
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
