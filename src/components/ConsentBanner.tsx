'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * First-party cookie consent banner (used when no Cookiebot ID is configured).
 *
 * Consent Mode v2 defaults everything to "denied" (see CookieConsent.tsx).
 * This banner lets visitors grant or decline analytics + advertising storage
 * and remembers the choice. "Cookie settings" in the footer reopens it by
 * dispatching the `tt:open-consent` event.
 *
 * NOTE: Google tags respect Consent Mode automatically. Non-Google tags in GTM
 * (Meta, LinkedIn, HubSpot) must be set to require ad_storage / analytics_storage
 * consent inside GTM, or they will fire regardless of this banner.
 */

const KEY = 'tt_consent_v1';
type Choice = 'granted' | 'denied';

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

function applyConsent(choice: Choice) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  const w = window as GtagWindow;
  const gtag =
    w.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      (window.dataLayer as unknown[]).push(arguments);
    };
  gtag('consent', 'update', {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
    functionality_storage: choice,
    personalization_storage: choice,
  });
  (window.dataLayer as unknown[]).push({ event: 'tt_consent_update', tt_consent: choice });
}

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice) {
  try {
    window.localStorage.setItem(KEY, choice);
  } catch {
    /* storage unavailable: choice applies for this page view only */
  }
}

export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_COOKIEBOT_ID) return; // Cookiebot handles consent
    const stored = readChoice();
    // Honor Global Privacy Control: treat as a decline unless the visitor opts in later.
    const gpc = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
    if (stored) applyConsent(stored);
    else if (gpc) applyConsent('denied');
    else setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener('tt:open-consent', reopen);
    return () => window.removeEventListener('tt:open-consent', reopen);
  }, []);

  if (!open) return null;

  const choose = (c: Choice) => {
    saveChoice(c);
    applyConsent(c);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-[10000] mx-auto max-w-3xl rounded-lg border border-white/15 bg-tt-ink p-5 text-white md:flex md:items-center md:gap-6"
    >
      <p className="text-sm leading-relaxed text-white/85 md:flex-1">
        We use cookies to understand how the site is used and to measure our own advertising. They
        stay off unless you accept.{' '}
        <Link href="/privacy" className="underline underline-offset-2 text-white">
          Privacy Policy
        </Link>
      </p>
      <div className="mt-4 flex shrink-0 gap-3 md:mt-0">
        <button type="button" onClick={() => choose('denied')} className="btn-ghost !px-5 !py-2.5 text-sm">
          Decline
        </button>
        <button type="button" onClick={() => choose('granted')} className="btn-primary !px-5 !py-2.5 text-sm">
          Accept
        </button>
      </div>
    </div>
  );
}

export function openConsentSettings() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('tt:open-consent'));
}
