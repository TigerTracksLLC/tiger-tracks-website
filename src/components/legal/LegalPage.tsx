import type { ReactNode } from 'react';

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-tt-paper text-tt-ink">
      <section className="bg-tt-ink text-white px-6 pt-40 pb-20">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-display font-extrabold tracking-tight">{title}</h1>
          <p className="mt-6 text-sm text-white/70">Last updated {updated}</p>
        </div>
      </section>
      <article className="legal-prose mx-auto max-w-3xl px-6 py-16">{children}</article>
    </div>
  );
}
