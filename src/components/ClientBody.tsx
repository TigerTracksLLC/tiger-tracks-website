'use client';

import { LenisProvider } from '@/components/LenisProvider';

export function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      {children}
    </LenisProvider>
  );
}
