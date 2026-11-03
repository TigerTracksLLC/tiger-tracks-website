'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroTestimonial() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
      className="mx-auto max-w-3xl mt-12"
    >
      <div
        className="flex flex-col md:flex-row items-center gap-6 rounded-2xl backdrop-blur-xl border border-white/10 p-6"
        style={{
          background: 'rgba(0, 0, 0, 0.14)',
          boxShadow: 'none',
        }}
      >
        {/* AG1 Brand Badge */}
        <div
          className="relative shrink-0 w-24 h-16 rounded-xl overflow-hidden border border-white/20 bg-[#052E3F] p-2"
          style={{
            boxShadow: 'none',
          }}
        >
          <Image
            src="/images/AG1_(company)_logo.png"
            alt="AG1 Logo"
            fill
            className="object-contain p-2"
          />
        </div>

        {/* Quote + Attribution */}
        <div className="text-center md:text-left">
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{
              color: '#A9B6BA',
            }}
          >
            &ldquo;Partnering with Tiger Tracks has been amazing. They work fast, execute
            flawlessly and apply specialized knowledge of ad platforms with a relentless
            focus on hitting growth goals.&rdquo;
          </p>
          <p className="mt-3 text-xs font-semibold text-white uppercase tracking-wide">
            Jason Marshall, Chief Growth Officer, AG1
          </p>
        </div>
      </div>
    </motion.div>
  );
}
