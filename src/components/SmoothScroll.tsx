"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers fire resize events when the address bar collapses/expands
// mid-scroll. Left unhandled, ScrollTrigger re-measures pinned sections
// mid-gesture and the materials river pin can drop.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Homepage smooth scroll via Lenis, synced to GSAP's ticker so
 * ScrollTrigger pins/scrubs stay frame-aligned.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    const coarse = window.matchMedia("(pointer: coarse)").matches;

    // Snappy lerp reads smoother than a long duration ease — heavy duration
    // is what makes the page feel behind the wheel / finger.
    const lenis = new Lenis({
      autoRaf: false,
      lerp: coarse ? 0.14 : 0.1,
      smoothWheel: true,
      // Touch: gentle sync so materials pin stays tied to scroll without
      // GSAP normalizeScroll (which felt laggy on this page).
      syncTouch: coarse,
      syncTouchLerp: 0.08,
      touchInertiaExponent: 1.5,
      wheelMultiplier: coarse ? 1 : 0.85,
      touchMultiplier: 1.15,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    const w = window as Window & { __lenis?: Lenis };
    w.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 1200);

    const onVisibility = () => {
      if (document.visibilityState === "visible") lenis.start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.removeEventListener("visibilitychange", onVisibility);
      gsap.ticker.remove(ticker);
      if (w.__lenis === lenis) delete w.__lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
