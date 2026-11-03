'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * Custom cursor for desktop.
 *
 * - 8px solid neon-orange dot: tracks mouse 1:1
 * - 32px translucent ring: trails with spring physics
 * - Ring scales 1.5x and drops opacity on interactive elements
 * - Hides on mobile / touch devices
 */
export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Raw mouse position (dot follows instantly)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Trailing ring position (spring-delayed)
  const ringSpring = { stiffness: 250, damping: 25, mass: 0.5 };
  const ringX = useSpring(mouseX, ringSpring);
  const ringY = useSpring(mouseY, ringSpring);

  // Scale spring for hover state
  const ringScale = useSpring(1, { stiffness: 300, damping: 20 });

  // Visibility via ref so the mousemove listener never re-registers
  const visibleRef = useRef(false);
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    },
    [mouseX, mouseY],
  );

  const handleMouseEnter = useCallback(() => {
    visibleRef.current = true;
    setIsVisible(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    visibleRef.current = false;
    setIsVisible(false);
  }, []);

  useEffect(() => {
    // Only enable on non-touch desktop devices
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent);

    if (isTouchDevice) return;

    setIsDesktop(true);

    // Add cursor-none to body
    document.body.classList.add('cursor-custom');

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Detect hovering over interactive elements
    const interactiveSelectors =
      'a, button, [role="button"], input, textarea, select, [data-magnetic], [data-cursor-hover]';

    function onPointerOver(e: Event) {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelectors)) {
        setIsHovering(true);
        ringScale.set(1.5);
      }
    }

    function onPointerOut(e: Event) {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelectors)) {
        setIsHovering(false);
        ringScale.set(1);
      }
    }

    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });

    return () => {
      document.body.classList.remove('cursor-custom');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, ringScale]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Dot: 8px solid, tracks 1:1.
          Note: no mix-blend-difference — blending against large blurred
          layers forces expensive compositing on every frame. */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          x: mouseX,
          y: mouseY,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#FE5E16',
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Ring: 32px translucent, trails with spring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997]"
        style={{
          x: ringX,
          y: ringY,
          scale: ringScale,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(254, 94, 22, 0.5)',
          backgroundColor: isHovering
            ? 'rgba(254, 94, 22, 0.06)'
            : 'rgba(254, 94, 22, 0.03)',
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? (isHovering ? 0.6 : 0.8) : 0,
          transition: 'background-color 0.3s ease, opacity 0.3s ease',
        }}
        aria-hidden="true"
      />
    </>
  );
}
