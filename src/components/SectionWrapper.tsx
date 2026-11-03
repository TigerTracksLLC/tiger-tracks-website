'use client';

import { useInView } from '@/hooks/useInView';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export function SectionWrapper({
  children,
  className = '',
  id,
  dark = false,
}: SectionWrapperProps) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      id={id}
      className={`py-24 px-6 ${
        dark ? 'text-white' : 'bg-white text-tt-gray-800'
      } ${inView ? 'revealed' : 'reveal'} ${className}`}
      style={dark ? {
        background: `
          #052E3F
        `,
      } : undefined}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
