'use client';

import { useEffect, useRef, useState } from 'react';
import { TimelineDataPoint } from '@/data/caseStudies';

interface HockeyStickChartProps {
  before: TimelineDataPoint[];
  after: TimelineDataPoint[];
  metricLabel?: string;
  className?: string;
}

export function HockeyStickChart({
  before,
  after,
  metricLabel = 'Performance Index',
  className = '',
}: HockeyStickChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const allPoints = [...before, ...after];
  const allValues = allPoints.map((p) => p.value);
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);
  const range = maxVal - minVal || 1;

  // Chart dimensions
  const W = 700;
  const H = 320;
  const PAD_L = 50;
  const PAD_R = 20;
  const PAD_T = 30;
  const PAD_B = 60;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;

  const totalPoints = allPoints.length;
  const splitIndex = before.length;

  function toX(i: number) {
    return PAD_L + (i / (totalPoints - 1)) * chartW;
  }
  function toY(val: number) {
    return PAD_T + chartH - ((val - minVal) / range) * chartH;
  }

  // Build path
  const pathPoints = allPoints.map((p, i) => ({ x: toX(i), y: toY(p.value) }));

  function buildPath(pts: { x: number; y: number }[]) {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
      const cpx2 = prev.x + (curr.x - prev.x) * 0.6;
      d += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return d;
  }

  const beforePath = buildPath(pathPoints.slice(0, splitIndex));
  const afterPath = buildPath(pathPoints.slice(splitIndex - 1));
  const fullPath = buildPath(pathPoints);

  // Area fill path
  const areaPath = fullPath
    + ` L ${pathPoints[pathPoints.length - 1].x} ${PAD_T + chartH}`
    + ` L ${pathPoints[0].x} ${PAD_T + chartH} Z`;

  // Intersection line x
  const splitX = toX(splitIndex - 1);

  // Y-axis ticks
  const tickCount = 4;
  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => {
    const val = minVal + (range * i) / tickCount;
    return { val, y: toY(val) };
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start: number | null = null;
    const duration = 1800;
    function animate(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const p = Math.min(elapsed / duration, 1);
      // Ease out cubic
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [isVisible]);

  // Format values for axis
  function formatVal(v: number) {
    if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
    if (v >= 100) return Math.round(v).toString();
    if (Number.isInteger(v)) return v.toString();
    return v.toFixed(1);
  }

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7FCAD3" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#7FCAD3" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7FCAD3" />
            <stop offset={`${(splitIndex / totalPoints) * 100}%`} stopColor="#7FCAD3" />
            <stop offset={`${(splitIndex / totalPoints) * 100}%`} stopColor="#FE5E16" />
            <stop offset="100%" stopColor="#FE5E16" />
          </linearGradient>
          <clipPath id="reveal-clip">
            <rect
              x="0"
              y="0"
              width={PAD_L + chartW * progress + PAD_R}
              height={H}
            />
          </clipPath>
        </defs>

        {/* Grid lines */}
        {yTicks.map((tick, i) => (
          <g key={i}>
            <line
              x1={PAD_L}
              y1={tick.y}
              x2={W - PAD_R}
              y2={tick.y}
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth="1"
            />
            <text
              x={PAD_L - 10}
              y={tick.y + 4}
              textAnchor="end"
              fill="rgba(255, 255, 255, 0.35)"
              fontSize="11"
              fontFamily="Inter, sans-serif"
            >
              {formatVal(tick.val)}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {allPoints.map((p, i) => {
          // Show every other label if too many
          if (totalPoints > 8 && i % 2 !== 0 && i !== totalPoints - 1) return null;
          return (
            <text
              key={i}
              x={toX(i)}
              y={H - 15}
              textAnchor="middle"
              fill="rgba(255, 255, 255, 0.35)"
              fontSize="10"
              fontFamily="Inter, sans-serif"
            >
              {p.label}
            </text>
          );
        })}

        {/* Tiger Tracks inflection line */}
        <line
          x1={splitX}
          y1={PAD_T - 10}
          x2={splitX}
          y2={PAD_T + chartH}
          stroke="rgba(254, 94, 22, 0.4)"
          strokeWidth="1"
          strokeDasharray="6 4"
        />
        <text
          x={splitX}
          y={PAD_T - 16}
          textAnchor="middle"
          fill="#FE5E16"
          fontSize="10"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
        >
          TIGER TRACKS STARTS
        </text>

        {/* Animated area + line */}
        <g clipPath="url(#reveal-clip)">
          {/* Area fill */}
          <path d={areaPath} fill="#7FCAD3" fillOpacity={0.1} />
          {/* Line */}
          <path
            d={fullPath}
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Data points (animated) */}
        {pathPoints.map((pt, i) => {
          const pointProgress = i / (totalPoints - 1);
          const visible = pointProgress <= progress;
          const isAfter = i >= splitIndex;
          return (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={visible ? 4 : 0}
              fill={isAfter ? '#FE5E16' : '#7FCAD3'}
              stroke={isAfter ? 'rgba(254, 94, 22, 0.3)' : 'rgba(127, 202, 211, 0.3)'}
              strokeWidth="6"
              style={{
                transition: 'r 0.3s ease-out',
              }}
            />
          );
        })}

        {/* Metric label */}
        <text
          x={PAD_L}
          y={H - 2}
          fill="rgba(255, 255, 255, 0.25)"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          {metricLabel}
        </text>
      </svg>
    </div>
  );
}
