'use client';

import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitDiagnostic } from '@/app/actions/submitDiagnostic';

/* ------------------------------------------------------------------ */
/*  Options                                                            */
/* ------------------------------------------------------------------ */

/* Must match the options on the HubSpot form property
   `projected_annual_revenue` exactly. */
const revenueOptions = [
  'Less than $1M',
  '$1M - $5M',
  '$5M - $25M',
  '$25M - $50M',
  '$50M+',
];

const goalOptions = [
  'Reduce CAC',
  'Scale Volume',
  'Fix Attribution',
  'Improve ROAS',
  'Launch New Channels',
  'Full-Funnel Audit',
];

const budgetOptions = [
  'Under $100k/mo',
  '$100k - $500k/mo',
  '$500k+/mo',
  'Not sure yet',
];

const channelOptions = [
  'Google Ads',
  'Meta (FB/IG)',
  'TikTok',
  'Amazon / Retail',
  'Programmatic / CTV',
  'SEO / Organic',
  'Email / SMS',
  'Starting fresh',
];

const MEETING_URL = 'https://meetings.hubspot.com/gtempleton/deeperdiscovery';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getHutk(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? match[1] : undefined;
}

const inputClass =
  'w-full rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-tt-gray-500 focus:outline-none transition-all duration-200 disabled:opacity-50';

const inputStyle: React.CSSProperties = {
  backgroundColor: 'rgba(5, 46, 63, 0.55)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.target.style.borderColor = 'rgba(127, 202, 211, 0.55)';
}
function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function HeroDiagnosticForm() {
  const [stage, setStage] = useState<1 | 2>(1);
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [hp, setHp] = useState(''); // honeypot — must stay empty

  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    annualRevenue: '',
    goal: '',
    budget: '',
    channels: [] as string[],
  });

  const set = (key: string, value: string) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggleChannel = (c: string) =>
    setData((d) => ({
      ...d,
      channels: d.channels.includes(c)
        ? d.channels.filter((x) => x !== c)
        : [...d.channels, c],
    }));

  const stage1Valid =
    data.name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    data.phone.trim() &&
    data.company.trim() &&
    data.website.trim() &&
    data.annualRevenue;

  const handleStage1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stage1Valid) {
      setErrorMsg('Please complete all fields to continue.');
      return;
    }
    setErrorMsg('');
    setStage(2);
  };

  const submit = () => {
    setErrorMsg('');
    startTransition(async () => {
      const result = await submitDiagnostic({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        website: data.website,
        annualRevenue: data.annualRevenue,
        goal: data.goal || undefined,
        budget: data.budget || undefined,
        channels: data.channels.length ? data.channels.join(', ') : undefined,
        hp,
        hutk: getHutk(),
        pageUri:
          typeof window !== 'undefined' ? window.location.href : undefined,
        pageName: typeof document !== 'undefined' ? document.title : undefined,
      });
      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(result.message);
      }
    });
  };

  return (
    <div
      id="diagnostic-form"
      className="w-full rounded-2xl backdrop-blur-xl border border-white/10 p-6 sm:p-7 text-left scroll-mt-28"
      style={{
        background: 'rgba(0, 0, 0, 0.14)',
        boxShadow: 'none',
      }}
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          /* ---------------- Success ---------------- */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-6 text-center"
          >
            <div
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                backgroundColor: 'rgba(127, 202, 211, 0.12)',
                border: '1px solid rgba(127, 202, 211, 0.4)',
              }}
            >
              <svg
                className="h-7 w-7 text-tt-teal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Request received.
            </h3>
            <p className="text-sm text-tt-gray-300 mb-6">
              We&rsquo;ll reach out within 1 business day. Want to skip the
              line?
            </p>
            <a
              href={MEETING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-tt-orange px-7 py-3 text-sm font-semibold text-white transition-all duration-300"
            >
              Book your diagnostic call now
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>
        ) : stage === 1 ? (
          /* ---------------- Stage 1: required ---------------- */
          <motion.div
            key="stage1"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Request a Strategic Diagnostic
            </h2>
            <p className="text-sm text-tt-gray-400 mb-5">
              A 90-day roadmap built around your actual numbers. Free, no
              strings.
            </p>

            <form onSubmit={handleStage1} className="space-y-3.5">
              {/* Honeypot: off-screen, not tabbable; bots fill it, humans don't. */}
              <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
                <label htmlFor="hero_company_website">Fax</label>
                <input
                  id="hero_company_website"
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => set('name', e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                  placeholder="Full name *"
                  aria-label="Full name"
                  required
                />
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => set('email', e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                  placeholder="Work email *"
                  aria-label="Work email"
                  required
                />
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                  placeholder="Phone number *"
                  aria-label="Phone number"
                  required
                />
                <input
                  type="text"
                  value={data.company}
                  onChange={(e) => set('company', e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                  placeholder="Company name *"
                  aria-label="Company name"
                  required
                />
                <input
                  type="text"
                  value={data.website}
                  onChange={(e) => set('website', e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                  placeholder="Website *"
                  aria-label="Website"
                  required
                />
                <select
                  value={data.annualRevenue}
                  onChange={(e) => set('annualRevenue', e.target.value)}
                  className={`${inputClass} ${data.annualRevenue ? 'text-white' : 'text-tt-gray-500'}`}
                  style={inputStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                  aria-label="Annual revenue"
                  required
                >
                  <option value="" disabled>
                    Annual revenue *
                  </option>
                  {revenueOptions.map((o) => (
                    <option key={o} value={o} className="bg-[#052E3F]">
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              {errorMsg && (
                <p className="text-xs" style={{ color: '#FE5E16' }}>
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="group relative w-full rounded-full bg-tt-orange py-3.5 text-sm font-normal tracking-[-0.16px] text-white transition-shadow duration-200"
              >
                <span className="relative mx-auto block h-5 overflow-hidden leading-5">
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
              </button>

              <p className="text-center text-[11px] text-tt-gray-500">
                Response within 1 business day. No spam, ever.
              </p>
            </form>
          </motion.div>
        ) : (
          /* ---------------- Stage 2: optional ---------------- */
          <motion.div
            key="stage2"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              One last step <span className="text-tt-gray-400 text-base font-normal">(optional)</span>
            </h2>
            <p className="text-sm text-tt-gray-400 mb-5">
              Help us prepare a sharper diagnostic, or skip straight to
              submit.
            </p>

            <div className="space-y-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-tt-gray-400">
                  Primary goal
                </p>
                <div className="flex flex-wrap gap-2">
                  {goalOptions.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => set('goal', data.goal === g ? '' : g)}
                      className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200"
                      style={{
                        backgroundColor:
                          data.goal === g
                            ? 'rgba(127, 202, 211, 0.2)'
                            : 'rgba(255, 255, 255, 0.04)',
                        border:
                          data.goal === g
                            ? '1px solid rgba(127, 202, 211, 0.6)'
                            : '1px solid rgba(255, 255, 255, 0.1)',
                        color: data.goal === g ? '#7FCAD3' : '#7FCAD3',
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-tt-gray-400">
                  Monthly ad budget
                </p>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => set('budget', data.budget === b ? '' : b)}
                      className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200"
                      style={{
                        backgroundColor:
                          data.budget === b
                            ? 'rgba(127, 202, 211, 0.2)'
                            : 'rgba(255, 255, 255, 0.04)',
                        border:
                          data.budget === b
                            ? '1px solid rgba(127, 202, 211, 0.6)'
                            : '1px solid rgba(255, 255, 255, 0.1)',
                        color: data.budget === b ? '#7FCAD3' : '#7FCAD3',
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-tt-gray-400">
                  Current channels
                </p>
                <div className="flex flex-wrap gap-2">
                  {channelOptions.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleChannel(c)}
                      className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200"
                      style={{
                        backgroundColor: data.channels.includes(c)
                          ? 'rgba(127, 202, 211, 0.2)'
                          : 'rgba(255, 255, 255, 0.04)',
                        border: data.channels.includes(c)
                          ? '1px solid rgba(127, 202, 211, 0.6)'
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        color: data.channels.includes(c)
                          ? '#7FCAD3'
                          : '#7FCAD3',
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs" style={{ color: '#FE5E16' }}>
                  {errorMsg}
                </p>
              )}

              <button
                type="button"
                onClick={submit}
                disabled={isPending}
                className="w-full rounded-lg bg-tt-orange py-3.5 text-base font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? 'Submitting…' : 'Submit request'}
              </button>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStage(1)}
                  disabled={isPending}
                  className="text-xs text-tt-gray-400 transition-colors hover:text-white"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={submit}
                  disabled={isPending}
                  className="text-xs text-tt-gray-400 underline underline-offset-4 transition-colors hover:text-white"
                >
                  Skip and submit
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
