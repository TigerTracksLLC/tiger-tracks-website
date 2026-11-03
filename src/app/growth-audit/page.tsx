import type { Metadata } from 'next';
import { HeroDiagnosticForm } from '@/components/HeroDiagnosticForm';

export const metadata: Metadata = {
  alternates: { canonical: '/growth-audit' },
  title: 'Get your Strategic Diagnostic',
  description:
    'Request a strategic diagnostic. Ex-Google performance marketing leaders build you a 90-day roadmap across paid, organic, creative, and attribution. Free, no strings.',
};

export default function GrowthAuditPage() {
  return (
    <main className="relative min-h-screen text-white font-sans animated-mesh-bg pb-24">
      <section className="mx-auto max-w-xl px-6 pt-32 lg:pt-40">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-tt-orange">
            Strategic Diagnostic
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Get your Strategic Diagnostic
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-tt-gray-300">
            Tell us about your business and our team will map exactly where your
            revenue is leaking, then build the 90-day plan to fix it.
          </p>
        </div>

        <HeroDiagnosticForm />
      </section>
    </main>
  );
}
