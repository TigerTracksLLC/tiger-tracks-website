'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { openConsentSettings } from './ConsentBanner';

/* ================================================================
   DATA
   ================================================================ */

const companyLinks = [
  { label: 'Company', href: '/company' },
  { label: 'Careers', href: '/careers' },
  { label: 'Press', href: '/press' },
  { label: 'Trust & Security', href: '/trust' },
];

const solutionLinks = [
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Results', href: '/results' },
  { label: 'How We Measure Results', href: '/results/methodology' },
  { label: 'Thought Leadership & Intelligence', href: '/intelligence' },
  { label: 'PE & VC Partners', href: '/pe-vc' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
];

const offices = [
  { city: 'New York', tz: 'America/New_York' },
] as const;

/* ================================================================
   LIVE CLOCK
   ================================================================ */

function LiveClock({ city, tz }: { city: string; tz: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    function tick() {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setTime(formatted);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-tt-gray-500">
        {city}
      </span>
      <span
        className="text-lg sm:text-xl font-mono font-light text-tt-gray-300 tabular-nums tracking-wider"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {time || ' '}
      </span>
    </div>
  );
}

/* ================================================================
   FOOTER
   ================================================================ */

export function Footer() {
  return (
    <footer className="relative bg-tt-black overflow-hidden">
      {/* Top gradient divider */}
      <div className="brand-stripe" aria-hidden="true"><span /><span /><span /><span /></div>

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full"
          style={{
            background: 'transparent',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* ---- Sign-off ---- */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-12">
        <p className="font-display text-3xl md:text-4xl font-extrabold text-white">
          Track your why.
        </p>
        <p className="mt-2 text-sm text-tt-gray-400">New York based. Fully remote team.</p>
        <div className="mt-10 h-px w-full bg-white/10" />
      </div>

      {/* ---- Navigation Grid ---- */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          {/* Col 1: Logo & tagline */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="group inline-block">
              <Image
                src="/brand/tigertracks-logo-white.svg"
                alt="Tiger Tracks"
                width={293}
                height={161}
                unoptimized
                className="h-14 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-tt-gray-500">
              Performance marketing built by ex-Google leaders.
            </p>
            <div className="mt-6 flex gap-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/tiger-tracks-media/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tt-gray-600 transition-colors duration-300 hover:text-tt-orange"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Company */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-tt-gray-400">
              Company
            </p>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-tt-gray-600 transition-colors duration-300 hover:text-tt-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-tt-gray-400">
              Solutions
            </p>
            <ul className="mt-4 space-y-2.5">
              {solutionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-tt-gray-600 transition-colors duration-300 hover:text-tt-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-tt-gray-400">
              Connect
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="mailto:info@tigertracks.ai"
                  className="text-sm text-tt-gray-600 transition-colors duration-300 hover:text-tt-orange"
                >
                  info@tigertracks.ai
                </a>
              </li>
              <li>
                <Link
                  href="/get-started"
                  className="text-sm text-tt-gray-600 transition-colors duration-300 hover:text-tt-orange"
                >
                  Request a Diagnostic
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-tt-gray-400">
              Legal
            </p>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-tt-gray-600 transition-colors duration-300 hover:text-tt-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openConsentSettings}
                  className="text-sm text-tt-gray-600 transition-colors duration-300 hover:text-tt-teal"
                >
                  Cookie settings
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ---- Massive Wordmark ---- */}
      <div className="relative z-10 overflow-hidden select-none" aria-hidden="true">
        <div
          className="w-full text-center font-extrabold leading-none"
          style={{
            fontSize: 'clamp(6rem, 15vw, 18rem)',
            letterSpacing: '-0.04em',
            color: 'rgba(239, 240, 239, 0.05)',
            lineHeight: 0.85,
            paddingBottom: '0.05em',
          }}
        >
          TIGER TRACKS
        </div>
      </div>

      {/* ---- Bottom Bar ---- */}
      <div className="relative z-10 border-t border-white/[0.04]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-xs text-tt-gray-600">
            &copy; 2026 Tiger Tracks. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-tt-gray-600">
            <span>Inc. 5000</span>
            <span className="h-3 w-px bg-tt-gray-800" />
            <span>Meta Business Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
