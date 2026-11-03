'use client';

import { useEffect, useRef } from 'react';

interface ParticleFieldProps {
  particleCount?: number;
  color?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 91, g: 164, b: 164 };
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

export function ParticleField({
  particleCount = 80,
  color = '#7FCAD3',
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rgb = hexToRgb(color);
    const connectionDistance = 150;

    // Cached dimensions: reading parent.clientWidth/Height every frame
    // forces layout while other code dirties styles -> layout thrash.
    let cw = 0;
    let ch = 0;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      cw = parent.clientWidth;
      ch = parent.clientHeight;
      canvas!.width = cw * dpr;
      canvas!.height = ch * dpr;
      canvas!.style.width = `${cw}px`;
      canvas!.style.height = `${ch}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      const w = cw;
      const h = ch;
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: 1 + Math.random(),
        });
      }
      particlesRef.current = particles;
    }

    function animate() {
      const w = cw;
      const h = ch;
      const particles = particlesRef.current;

      ctx!.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) {
          p.x = 0;
          p.vx = Math.abs(p.vx);
        } else if (p.x > w) {
          p.x = w;
          p.vx = -Math.abs(p.vx);
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy = Math.abs(p.vy);
        } else if (p.y > h) {
          p.y = h;
          p.vy = -Math.abs(p.vy);
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.4)`;
        ctx!.fill();
      }

      // Single batched path for all connection lines (one stroke call)
      ctx!.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = dx * dx + dy * dy;
          if (dist < connectionDistance * connectionDistance) {
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
          }
        }
      }
      ctx!.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.08)`;
      ctx!.lineWidth = 1;
      ctx!.stroke();

      animationRef.current = requestAnimationFrame(animate);
    }

    resize();
    initParticles();

    // Only animate while visible: pause when scrolled out of view
    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          isVisible = true;
          animationRef.current = requestAnimationFrame(animate);
        } else if (!entry.isIntersecting && isVisible) {
          isVisible = false;
          cancelAnimationFrame(animationRef.current);
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [particleCount, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
