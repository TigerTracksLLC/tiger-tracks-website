import Image from 'next/image';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  headshot?: string;
  featured?: boolean;
}

function QuoteMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="32"
      viewBox="0 0 40 32"
      fill="currentColor"
    >
      <path d="M12.8 0C5.728 0 0 5.728 0 12.8c0 10.752 9.6 19.2 19.2 19.2l1.6-6.4C14.4 25.6 6.4 20.48 6.4 12.8h6.4c3.52 0 6.4-2.88 6.4-6.4S16.32 0 12.8 0zm20.8 0c-7.072 0-12.8 5.728-12.8 12.8 0 10.752 9.6 19.2 19.2 19.2l1.6-6.4C35.2 25.6 27.2 20.48 27.2 12.8h6.4c3.52 0 6.4-2.88 6.4-6.4S37.12 0 33.6 0z" />
    </svg>
  );
}

function Avatar({ headshot, name }: { headshot?: string; name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  if (headshot) {
    return (
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
        <Image
          src={headshot}
          alt={name}
          fill
          className="aspect-square rounded-full object-cover"
          sizes="48px"
        />
      </div>
    );
  }

  // Fallback: TT logo avatar
  return (
    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-tt-ink border border-white/10">
      <Image
        src="/brand/tt-avatar.svg"
        alt="Tiger Tracks"
        unoptimized
        fill
        className="aspect-square rounded-full object-cover"
        sizes="48px"
      />
    </div>
  );
}

export function TestimonialCard({
  quote,
  name,
  title,
  company,
  headshot,
  featured = false,
}: TestimonialCardProps) {
  if (featured) {
    return (
      <div className="rounded-2xl bg-tt-black p-10 md:p-14">
        <QuoteMark className="mb-6 text-tt-teal" />
        <blockquote className="text-2xl font-medium leading-relaxed text-white">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="mt-8 flex items-center gap-4">
          <Avatar headshot={headshot} name={name} />
          <div>
            <p className="font-semibold text-white">{name}</p>
            <p className="text-sm text-tt-gray-400">
              {title}, {company}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-8"
      style={{
        background: 'rgba(0, 0, 0, 0.14)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <QuoteMark className="mb-4 text-tt-teal" />
      <blockquote className="text-lg leading-relaxed text-tt-gray-300">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-6 flex items-center gap-4">
        <Avatar headshot={headshot} name={name} />
        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-tt-gray-400">
            {title}, {company}
          </p>
        </div>
      </div>
    </div>
  );
}
