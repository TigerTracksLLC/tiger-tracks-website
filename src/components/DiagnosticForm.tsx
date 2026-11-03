'use client';

import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitDiagnostic } from '@/app/actions/submitDiagnostic';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const goals = [
  {
    id: 'reduce-cac',
    label: 'Reduce CAC',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898M2.25 6l3 3m-3-3h3m15 0a11.952 11.952 0 00-6.814 5.07" />
      </svg>
    ),
  },
  {
    id: 'scale-volume',
    label: 'Scale Volume',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    id: 'fix-attribution',
    label: 'Fix Attribution',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
  },
  {
    id: 'improve-roas',
    label: 'Improve ROAS',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'launch-channels',
    label: 'Launch New Channels',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    id: 'full-audit',
    label: 'Full-Funnel Audit',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
];

const budgetOptions = [
  { id: 'under-100k', label: 'Under $100k/mo', range: 'Emerging scale' },
  { id: '100k-500k', label: '$100k - $500k/mo', range: 'Growth stage' },
  { id: '500k-plus', label: '$500k+/mo', range: 'Enterprise scale' },
  { id: 'not-sure', label: 'Not sure yet', range: 'Exploring options' },
];

const channelOptions = [
  { id: 'google', label: 'Google Ads' },
  { id: 'meta', label: 'Meta (FB/IG)' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'amazon', label: 'Amazon / Retail' },
  { id: 'programmatic', label: 'Programmatic / CTV' },
  { id: 'seo', label: 'SEO / Organic' },
  { id: 'email-sms', label: 'Email / SMS' },
  { id: 'none', label: 'Starting fresh' },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    filter: 'blur(4px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    filter: 'blur(4px)',
  }),
};

const slideTransition = {
  x: { type: 'spring' as const, stiffness: 300, damping: 30 },
  opacity: { duration: 0.3 },
  filter: { duration: 0.3 },
};

/* ------------------------------------------------------------------ */
/*  Spinner SVG                                                        */
/* ------------------------------------------------------------------ */

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DiagnosticForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyUrl: '',
  });
  const [hp, setHp] = useState(''); // honeypot — must stay empty
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const goForward = (nextStep: number) => {
    setDirection(1);
    setStep(nextStep);
  };

  const goBack = (prevStep: number) => {
    setDirection(-1);
    setStep(prevStep);
  };

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    setTimeout(() => goForward(1), 250);
  };

  const handleBudgetSelect = (budgetId: string) => {
    setSelectedBudget(budgetId);
    setTimeout(() => goForward(2), 250);
  };

  const toggleChannel = (channelId: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channelId)
        ? prev.filter((c) => c !== channelId)
        : [...prev, channelId]
    );
  };

  // Read the HubSpot tracking cookie so submissions attribute correctly.
  const getHutk = () => {
    if (typeof document === 'undefined') return undefined;
    const match = document.cookie.match(/hubspotutk=([^;]+)/);
    return match ? match[1] : undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    startTransition(async () => {
      const result = await submitDiagnostic({
        goal: selectedGoal,
        budget: selectedBudget,
        channels: selectedChannels.join(', '),
        name: formData.name,
        email: formData.email,
        companyUrl: formData.companyUrl,
        hp,
        hutk: getHutk(),
        pageUri: typeof window !== 'undefined' ? window.location.href : undefined,
        pageName: typeof document !== 'undefined' ? document.title : undefined,
      });

      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(result.message);
      }
    });
  };

  const stepLabels = ['Your Goal', 'Your Scale', 'Your Channels', 'Your Details'];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress indicator */}
      {!isSuccess && (
        <div className="flex items-center justify-center gap-3 mb-10">
          {stepLabels.map((label, i) => (
            <button
              key={label}
              onClick={() => (i < step ? goBack(i) : undefined)}
              className={`flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                i < step
                  ? 'text-[#7FCAD3] cursor-pointer'
                  : i === step
                  ? 'text-white'
                  : 'text-[#91A2A9] cursor-default'
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i < step
                    ? 'bg-[#7FCAD3]/20 text-[#7FCAD3] border border-[#7FCAD3]/40'
                    : i === step
                    ? 'bg-[#FE5E16] text-white'
                    : 'bg-black/[0.14] text-[#91A2A9] border border-white/5'
                }`}
              >
                {i < step ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className="hidden sm:inline">{label}</span>
              {i < stepLabels.length - 1 && (
                <div
                  className={`w-8 h-px ml-1 transition-colors duration-300 ${
                    i < step ? 'bg-[#7FCAD3]/40' : 'bg-white/10'
                  }`}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Step content */}
      <div className="relative overflow-hidden" style={{ minHeight: '340px' }}>
        <AnimatePresence mode="wait" custom={direction}>
          {/* ---- Step 1: Goal ---- */}
          {step === 0 && !isSuccess && (
            <motion.div
              key="step-goal"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="w-full"
            >
              <h3 className="text-2xl font-bold text-center mb-2">
                What&rsquo;s your primary growth objective?
              </h3>
              <p className="text-sm text-center mb-8" style={{ color: '#91A2A9' }}>
                Select one to get started
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => handleGoalSelect(goal.id)}
                    className={`group relative rounded-xl px-4 py-5 text-left transition-all duration-300 ${
                      selectedGoal === goal.id
                        ? 'bg-[#7FCAD3]/15 border-[#7FCAD3]/50 scale-[0.97]'
                        : 'hover:bg-white/[0.04] hover:border-white/20 border-white/[0.08]'
                    }`}
                    style={{
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      background:
                        selectedGoal === goal.id
                          ? 'rgba(127, 202, 211, 0.1)'
                          : 'rgba(5, 46, 63, 0.5)',
                      border: `1px solid ${
                        selectedGoal === goal.id
                          ? 'rgba(127, 202, 211, 0.4)'
                          : 'rgba(255, 255, 255, 0.08)'
                      }`,
                    }}
                  >
                    <div
                      className={`mb-3 transition-colors duration-300 ${
                        selectedGoal === goal.id
                          ? 'text-[#7FCAD3]'
                          : 'text-[#91A2A9] group-hover:text-white'
                      }`}
                    >
                      {goal.icon}
                    </div>
                    <span className="block text-sm font-medium text-white">
                      {goal.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ---- Step 2: Scale ---- */}
          {step === 1 && !isSuccess && (
            <motion.div
              key="step-scale"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="w-full"
            >
              <h3 className="text-2xl font-bold text-center mb-2">
                What&rsquo;s your monthly media spend?
              </h3>
              <p className="text-sm text-center mb-8" style={{ color: '#91A2A9' }}>
                This helps us scope the diagnostic
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {budgetOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleBudgetSelect(option.id)}
                    className={`group relative rounded-xl px-6 py-8 text-center transition-all duration-300 ${
                      selectedBudget === option.id
                        ? 'scale-[0.97]'
                        : 'hover:bg-white/[0.04]'
                    }`}
                    style={{
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      background:
                        selectedBudget === option.id
                          ? 'rgba(127, 202, 211, 0.1)'
                          : 'rgba(5, 46, 63, 0.5)',
                      border: `1px solid ${
                        selectedBudget === option.id
                          ? 'rgba(127, 202, 211, 0.4)'
                          : 'rgba(255, 255, 255, 0.08)'
                      }`,
                    }}
                  >
                    <span className="block text-lg font-bold text-white mb-1">
                      {option.label}
                    </span>
                    <span className="block text-xs" style={{ color: '#91A2A9' }}>
                      {option.range}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => goBack(0)}
                className="mx-auto mt-6 flex items-center gap-1.5 text-xs text-[#91A2A9] hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            </motion.div>
          )}

          {/* ---- Step 3: Channels ---- */}
          {step === 2 && !isSuccess && (
            <motion.div
              key="step-channels"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="w-full"
            >
              <h3 className="text-2xl font-bold text-center mb-2">
                What channels are you running today?
              </h3>
              <p className="text-sm text-center mb-8" style={{ color: '#91A2A9' }}>
                Select all that apply
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
                {channelOptions.map((channel) => {
                  const isSelected = selectedChannels.includes(channel.id);
                  return (
                    <button
                      key={channel.id}
                      onClick={() => toggleChannel(channel.id)}
                      className="rounded-xl px-4 py-4 text-center text-sm font-medium transition-all duration-300"
                      style={{
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        background: isSelected
                          ? 'rgba(127, 202, 211, 0.1)'
                          : 'rgba(5, 46, 63, 0.5)',
                        border: `1px solid ${
                          isSelected
                            ? 'rgba(127, 202, 211, 0.4)'
                            : 'rgba(255, 255, 255, 0.08)'
                        }`,
                        color: isSelected ? '#7FCAD3' : '#C5CDCF',
                      }}
                    >
                      {channel.label}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => goBack(1)}
                  className="flex items-center gap-1.5 text-xs text-[#91A2A9] hover:text-white transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <button
                  onClick={() => goForward(3)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-tt-ink transition-all duration-300 hover:brightness-110"
                  style={{
                    background: '#FE5E16',
                    boxShadow: 'none',
                  }}
                >
                  Continue
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {/* ---- Step 4: Details ---- */}
          {step === 3 && !isSuccess && (
            <motion.div
              key="step-details"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="w-full"
            >
              <h3 className="text-2xl font-bold text-center mb-2">
                Almost there. Tell us about you.
              </h3>
              <p className="text-sm text-center mb-8" style={{ color: '#91A2A9' }}>
                We&rsquo;ll reach out within 1 business day
              </p>

              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg p-4 text-sm mb-6"
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#FE5E16',
                  }}
                >
                  {errorMsg}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
                {/* Honeypot: hidden from users, bots fill it. Keep off-screen
                    and out of the tab order; never required. */}
                <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
                  <label htmlFor="company_website">Fax</label>
                  <input
                    id="company_website"
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#A9B6BA' }}
                  >
                    Full Name <span style={{ color: '#FE5E16' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={isPending}
                    className="w-full rounded-lg p-3.5 text-white focus:outline-none transition-all duration-200 disabled:opacity-50"
                    style={{
                      backgroundColor: 'rgba(5, 46, 63, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = 'rgba(127, 202, 211, 0.5)')
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)')
                    }
                    placeholder="Jane Doe"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#A9B6BA' }}
                  >
                    Work Email <span style={{ color: '#FE5E16' }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={isPending}
                    className="w-full rounded-lg p-3.5 text-white focus:outline-none transition-all duration-200 disabled:opacity-50"
                    style={{
                      backgroundColor: 'rgba(5, 46, 63, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = 'rgba(127, 202, 211, 0.5)')
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)')
                    }
                    placeholder="jane@company.com"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#A9B6BA' }}
                  >
                    Company URL
                  </label>
                  <input
                    type="url"
                    value={formData.companyUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, companyUrl: e.target.value })
                    }
                    disabled={isPending}
                    className="w-full rounded-lg p-3.5 text-white focus:outline-none transition-all duration-200 disabled:opacity-50"
                    style={{
                      backgroundColor: 'rgba(5, 46, 63, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = 'rgba(127, 202, 211, 0.5)')
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)')
                    }
                    placeholder="https://company.com"
                  />
                </div>

                {/* Glowing Neon Orange submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full font-bold py-4 rounded-lg transition-all duration-300 mt-2 disabled:cursor-not-allowed relative overflow-hidden group"
                  style={{
                    backgroundColor: isPending ? '#FE5E16' : '#FE5E16',
                    color: '#052E3F',
                    boxShadow: 'none',
                  }}
                >
                  {/* Animated glow pulse */}
                  {!isPending && (
                    <span
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        boxShadow: 'none',
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2.5">
                    {isPending && <Spinner />}
                    {isPending ? 'Transmitting...' : 'Start My Diagnostic'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => goBack(2)}
                  disabled={isPending}
                  className="mx-auto flex items-center gap-1.5 text-xs text-[#91A2A9] hover:text-white transition-colors disabled:opacity-40"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              </form>
            </motion.div>
          )}

          {/* ---- Success state ---- */}
          {isSuccess && (
            <motion.div
              key="step-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-8"
            >
              {/* Animated check ring */}
              <div className="relative w-24 h-24 mx-auto mb-8">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: 'rgba(127, 202, 211, 0.1)',
                    boxShadow: 'none',
                  }}
                />
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0 w-full h-full p-6"
                  style={{ color: '#7FCAD3' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-3xl font-bold mb-3"
                style={{ color: '#7FCAD3' }}
              >
                Diagnostic Request Received
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.4 }}
                className="text-base max-w-sm mx-auto"
                style={{ color: '#A9B6BA' }}
              >
                A team member will be in touch within 1 business day to scope
                your audit and get read-only access set up.
              </motion.p>

              {/* Summary pills */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="flex flex-wrap justify-center gap-2 mt-6"
              >
                {selectedGoal && (
                  <span
                    className="text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: 'rgba(127, 202, 211, 0.1)',
                      border: '1px solid rgba(127, 202, 211, 0.25)',
                      color: '#7FCAD3',
                    }}
                  >
                    {goals.find((g) => g.id === selectedGoal)?.label}
                  </span>
                )}
                {selectedBudget && (
                  <span
                    className="text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(254, 94, 22, 0.25)',
                      color: '#FE5E16',
                    }}
                  >
                    {budgetOptions.find((b) => b.id === selectedBudget)?.label}
                  </span>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
