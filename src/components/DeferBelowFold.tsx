"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Mount children after the first paint + a short idle window so hero
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
    let timeoutId = 0;
    let idleId = 0;

    const show = () => setReady(true);

    const start = () => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(show, { timeout: delayMs });
      } else {
        timeoutId = window.setTimeout(show, delayMs);
      }
    };

    // Wait one frame so the hero timeline can bind first.
    const raf = requestAnimationFrame(() => {
      timeoutId = window.setTimeout(start, 120);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeoutId);
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [delayMs]);

  if (!ready) return null;
  return children;
}
