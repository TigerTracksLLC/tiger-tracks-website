import type { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Trust & Security',
  description:
    'How Tiger Tracks handles your data, our security practices, compliance posture (GDPR/CCPA), platform partnerships, and certification status.',
  alternates: { canonical: '/trust' },
  openGraph: {
    title: 'Trust & Security | Tiger Tracks',
    description:
      'Data handling, security practices, compliance posture, and platform partnerships at Tiger Tracks.',
    url: 'https://tigertracks.ai/trust',
    images: [{ url: 'https://tigertracks.ai/images/og-brand.png' }],
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[3px] text-tt-orange mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">{title}</h2>
      <div className="space-y-4 text-tt-gray-400 leading-relaxed text-[15px] md:text-base">
        {children}
      </div>
    </section>
  );
}

function StatusBadge({
  label,
  status,
}: {
  label: string;
  status: 'active' | 'in-progress';
}) {
  const active = status === 'active';
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-5 py-4"
      style={{
        background: 'rgba(5, 46, 63, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          active ? 'bg-tt-teal' : 'bg-tt-orange'
        }`}
      />
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p
          className={`text-xs ${active ? 'text-tt-teal' : 'text-tt-orange'}`}
        >
          {active ? 'Active' : 'In progress / to confirm'}
        </p>
      </div>
    </div>
  );
}

function PartnerBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-tt-gray-300"
      style={{
        background: 'rgba(0, 0, 0, 0.14)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <svg
        className="w-4 h-4 text-tt-teal"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TrustPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden px-6"
        style={{
          background: `
            #052E3F
          `,
        }}
      >
        <div className="relative z-10 mx-auto max-w-3xl py-24">
          <p className="text-tt-orange uppercase tracking-[4px] text-sm font-semibold mb-5">
            Enterprise Trust
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Trust &amp; security
          </h1>
          <p className="mt-6 text-lg text-tt-gray-400 leading-relaxed">
            When you give an agency access to your ad accounts, analytics, and
            customer data, you are extending real trust. This page sets out how we
            handle that data, the security practices we operate under, our
            compliance posture, and where our certifications stand today. We will
            not claim a certification we do not hold.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="px-6" style={{ background: '#052E3F' }}>
        <div className="mx-auto max-w-3xl py-20">
          {/* Data handling & privacy */}
          <Section eyebrow="Privacy" title="Data Handling & Privacy">
            <p>
              We access client advertising, analytics, and performance data solely
              to deliver the services contracted in our engagement. We do not sell
              client or end-user data, and we do not use it to benefit other
              clients.
            </p>
            <p>
              Data is accessed through each platform&rsquo;s official, permissioned
              integrations (for example, granted access to ad and analytics
              accounts) rather than shared credentials wherever the platform
              supports it. Access is scoped to the people working on your account.
            </p>
            {/* TODO: confirm specifics - data retention period, where client data
                is stored, and the offboarding/data-deletion process at end of
                engagement. */}
          </Section>

          {/* Security practices */}
          <Section eyebrow="Security" title="Security Practices">
            <p>
              Our security model is built on least-privilege access: team members
              receive only the access required for their role, and access is
              reviewed when projects or staffing change.
            </p>
            <ul className="space-y-3 list-none">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-tt-teal shrink-0" />
                <span>
                  <span className="font-semibold text-tt-gray-300">
                    Access controls:
                  </span>{' '}
                  role-based access and account-level permissions, with offboarding
                  procedures that revoke access promptly.
                  {/* TODO: confirm specifics - SSO, enforced MFA on all accounts,
                      access review cadence. */}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-tt-teal shrink-0" />
                <span>
                  <span className="font-semibold text-tt-gray-300">
                    Least privilege:
                  </span>{' '}
                  access granted on a need-to-use basis and removed when no longer
                  required.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-tt-teal shrink-0" />
                <span>
                  <span className="font-semibold text-tt-gray-300">
                    Encryption:
                  </span>{' '}
                  data is encrypted in transit, and data at rest is encrypted in the
                  managed platforms we rely on.
                  {/* TODO: confirm specifics - encryption standards (e.g. TLS 1.2+,
                      AES-256), which internal systems store client data and their
                      encryption-at-rest posture. */}
                </span>
              </li>
            </ul>
          </Section>

          {/* Certifications */}
          <Section eyebrow="Certifications" title="Certifications">
            <p>
              Tiger Tracks does not currently hold a SOC 2 or ISO 27001
              certification, and we do not claim one. What we do today: client
              accounts and data stay in the client&apos;s name, access is
              least-privilege and removed when an engagement ends, and hardware
              security keys are being rolled out across the team.
            </p>
            <p className="text-sm text-tt-gray-500 mt-4">
              If your procurement process requires a security questionnaire, a DPA,
              or current documentation, reach out and we will route it to the right
              person.
            </p>
          </Section>

          {/* Partner badges */}
          <Section eyebrow="Partnerships" title="Platform Partnerships">
            <p>
              Tiger Tracks is a Meta Business Partner, a status that reflects
              sustained spend management, certification and platform standing.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <PartnerBadge label="Meta Business Partner" />
              {/* TODO: confirm specifics - exact partner tier (e.g. Premier) and
                  any additional platform partnerships to list. */}
            </div>
          </Section>

          {/* Compliance posture */}
          <Section eyebrow="Compliance" title="Compliance Posture">
            <p>
              We support clients operating under major privacy regimes including the
              GDPR and CCPA. Our role is to help you run compliant measurement and
              advertising, and to honor data subject and consumer requests that flow
              through your processes.
            </p>
            <ul className="space-y-3 list-none">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-tt-teal shrink-0" />
                <span>
                  <span className="font-semibold text-tt-gray-300">
                    GDPR &amp; CCPA:
                  </span>{' '}
                  we work within client data processing agreements and respect
                  lawful-basis and opt-out requirements.
                  {/* TODO: confirm specifics - whether TT acts as processor vs
                      controller, and standard DPA terms. */}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-tt-teal shrink-0" />
                <span>
                  <span className="font-semibold text-tt-gray-300">
                    Cookie consent:
                  </span>{' '}
                  our own site asks visitors for their analytics and advertising
                  cookie choice and honors Global Privacy Control, and we help clients
                  align tracking with their consent configuration.
                </span>
              </li>
            </ul>
          </Section>
        </div>
      </section>

      <CTASection
        headline="Have a security or procurement question?"
        subheadline="Get in touch and we will connect you with the right person to walk through specifics."
        primaryCTA={{ text: 'Email Our Team', href: 'mailto:info@tigertracks.ai?subject=Security%20or%20procurement%20question' }}
        secondaryCTA={{ text: 'About Tiger Tracks', href: '/company' }}
        dark
        badges={['Meta Business Partner', 'GDPR & CCPA Aware', 'Your Data Stays Yours']}
      />
    </div>
  );
}
