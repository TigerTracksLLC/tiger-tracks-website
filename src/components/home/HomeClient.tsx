'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/* The only parts of the homepage that need JavaScript: the video player,
   the counting numbers and the track that draws down the page edge. */

/** SXSW video: poster with a play button, the player loads on click. */
export function SxswVideo() {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <video controls autoPlay playsInline className="aspect-video w-full bg-tt-ink object-cover">
        <source src="/cliffypt2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden bg-tt-ink"
      aria-label="Play the SXSW video"
    >
      <Image src="/cliff-sxsw-ag1-poster.jpg" alt="" fill priority sizes="(min-width: 1024px) 620px, 100vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
      <span className="absolute inset-0 bg-tt-ink/20 transition-colors group-hover:bg-tt-ink/5" aria-hidden="true" />
      <span className="absolute bottom-5 left-5 flex h-16 w-16 items-center justify-center rounded-full bg-tt-orange transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20" aria-hidden="true">
        <svg className="ml-1 h-7 w-7 text-tt-ink" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </span>
    </button>
  );
}

/**
 * Counts a figure such as "2,954%" or "+51%" up from zero when it scrolls into
 * view. The final value is in the HTML, so it reads correctly without
 * JavaScript and for visitors who prefer reduced motion.
 */
export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const m = value.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
    if (!el || !m) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen: leave it
    const target = parseFloat(m[2].replace(/,/g, ''));
    const comma = m[2].includes(',');
    const fmt = (v: number) => `${m[1]}${comma ? Math.round(v).toLocaleString('en-US') : Math.round(v)}${m[3]}`;
    setText(fmt(0));
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1400, 1);
          setText(fmt(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {text}
    </span>
  );
}

/**
 * The track: the four-colour brand stripe, turned on its side, that draws
 * down the left edge of the window as the visitor scrolls. It is attached to
 * <body> directly so page transitions cannot move it, and it is removed again
 * when the visitor leaves the homepage.
 */
export function TrackRail() {
  useEffect(() => {
    const rail = document.createElement('div');
    rail.setAttribute('aria-hidden', 'true');
    rail.style.cssText = 'position:fixed;top:0;bottom:0;left:0;width:clamp(6px,0.7vw,10px);z-index:45;pointer-events:none;';
    const fill = document.createElement('div');
    fill.style.cssText =
      'height:100%;clip-path:inset(0 0 100% 0);background:linear-gradient(to bottom,#FE5E16 0 25%,#7FCAD3 25% 50%,#D3E3A0 50% 75%,#EFF0EF 75% 100%);';
    rail.appendChild(fill);
    document.body.appendChild(rail);

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      fill.style.clipPath = `inset(0 0 ${((1 - p) * 100).toFixed(2)}% 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      rail.remove();
    };
  }, []);

  return null;
}
