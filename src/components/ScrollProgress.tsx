"use client";

import { useEffect, useState } from "react";

/**
 * Thin brass progress line — opacity/transform only, hidden for reduced motion.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    setEnabled(true);

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px"
      aria-hidden
    >
      <div
        className="h-full origin-left bg-gold will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
