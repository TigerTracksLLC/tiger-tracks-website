interface MetricCardProps {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function MetricCard({
  value,
  label,
  prefix = '',
  suffix = '',
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-tt-gray-800 bg-tt-gray-900/50 p-6 backdrop-blur">
      <p className="text-4xl font-extrabold text-tt-gray-200">
        {prefix}
        {value}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-tt-gray-400">{label}</p>
    </div>
  );
}
