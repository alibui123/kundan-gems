"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Mount children after the first paint + a short delay so hero
 * text animation isn’t competing with heavy images on mobile.
 */
export function DeferBelowFold({
  children,
  delayMs = 900,
}: {
  children: ReactNode;
  delayMs?: number;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const raf = requestAnimationFrame(() => {
      timeoutId = setTimeout(() => {
        if (!cancelled) setReady(true);
      }, delayMs);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [delayMs]);

  if (!ready) return null;
  return children;
}
