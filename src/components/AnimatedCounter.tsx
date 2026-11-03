'use client';

import { useCountUp } from '@/hooks/useCountUp';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  value: string;
  label: string;
  className?: string;
}

function parseValue(value: string): {
  prefix: string;
  number: number;
  suffix: string;
  hasDecimal: boolean;
} {
  const match = value.match(/^([^\d]*?)([\d,]+\.?\d*)(.*?)$/);
  if (!match) {
    return { prefix: '', number: 0, suffix: value, hasDecimal: false };
  }

  const prefix = match[1];
  const numStr = match[2].replace(/,/g, '');
  const number = parseFloat(numStr);
  const suffix = match[3];
  const hasDecimal = numStr.includes('.');

  return { prefix, number, suffix, hasDecimal };
}

function formatNumber(num: number, hasDecimal: boolean): string {
  if (hasDecimal) {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    });
  }
  return Math.round(num).toLocaleString('en-US');
}

export function AnimatedCounter({
  value,
  label,
  className = '',
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({ threshold: 0.05 });
  const { prefix, number, suffix, hasDecimal } = parseValue(value);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const count = useCountUp(number, 2200, 0, hasBeenInView);
  const [completed, setCompleted] = useState(false);

  // Latch inView so we only animate once and never reset to 0
  useEffect(() => {
    if (inView && !hasBeenInView) {
      setHasBeenInView(true);
    }
  }, [inView, hasBeenInView]);

  // Detect completion for glow pulse
  useEffect(() => {
    if (hasBeenInView && count >= number * 0.99) {
      const t = setTimeout(() => setCompleted(true), 100);
      return () => clearTimeout(t);
    }
  }, [count, number, hasBeenInView]);

  // Show the final static value until animation has actually started producing
  // a non-zero count. This prevents a flash of "0%" / "#0" etc. on the frame
  // between hasBeenInView becoming true and the first rAF callback firing.
  const animationStarted = hasBeenInView && count > 0;
  const displayValue = animationStarted
    ? `${prefix}${formatNumber(count, hasDecimal)}${suffix}`
    : value;

  return (
    <div ref={ref} className={`text-center group ${className}`}>
      <div
        className={`text-[clamp(1.6rem,7vw,3rem)] font-extrabold tracking-tight transition-all duration-700 ${
          inView ? 'text-white opacity-100 translate-y-0' : 'text-white opacity-100 translate-y-0'
        }`}
      >
        <span
          className={`inline-block gradient-text transition-all duration-500 ${
            completed ? 'scale-100' : hasBeenInView ? 'scale-105' : 'scale-100'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {displayValue}
        </span>
      </div>
      <div
        className={`mt-3 text-sm uppercase tracking-widest text-tt-gray-500 transition-all duration-700 delay-200 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-0'
        }`}
      >
        {label}
      </div>
      {/* Glow pulse line on completion */}
      <div
        className={`mx-auto mt-4 h-px w-16 transition-all duration-1000 delay-500 ${
          completed
            ? 'opacity-100 scale-x-100'
            : hasBeenInView
            ? 'opacity-60 scale-x-75'
            : 'opacity-30 scale-x-50'
        }`}
        style={{
          background: 'rgba(127, 202, 211, 0.5)',
        }}
      />
    </div>
  );
}
