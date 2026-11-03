'use client';

interface PlaceholderImageProps {
  label?: string;
  aspectRatio?: string;
  className?: string;
}

export function PlaceholderImage({
  label = 'Image',
  aspectRatio = '16/9',
  className = '',
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-lg ${className}`}
      style={{ aspectRatio }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[#052E3F] " />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(127, 202, 211, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(127, 202, 211, 0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Corner accents */}
      <div className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[#7FCAD3]/40" />
      <div className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-[#7FCAD3]/40" />
      <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-[#7FCAD3]/40" />
      <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#7FCAD3]/40" />

      {/* Label */}
      <span className="relative z-10 rounded-full border border-[#7FCAD3]/20 bg-[#052E3F]/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#91A2A9]">
        {label}
      </span>
    </div>
  );
}
