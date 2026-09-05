"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers fire resize events when the address bar collapses/expands
// mid-scroll. Left unhandled, ScrollTrigger treats that as a real layout
// change and re-measures pinned sections while the user is inside one —
// which is what breaks pins (like the materials section) on phones.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Site-wide inertia scrolling (fine pointer only).
 * Syncs Lenis → ScrollTrigger for scrubbed parallax / reveals.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (reduceMotion) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    if (!finePointer) {
      // Touch scroll has no Lenis to sync from, and real mobile browsers
      // have enough scroll quirks (address-bar resize, momentum/rubber-band
      // scrolling, layout-vs-visual-viewport drift) that GSAP's pin (the
      // materials section) can silently fail to hold — the page just
      // scrolls straight through it. normalizeScroll is GSAP's own fix for
      // exactly this; scoped to touch only so desktop's Lenis is untouched.
      ScrollTrigger.normalizeScroll(true);
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        ScrollTrigger.normalizeScroll(false);
      };
    }

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.05,
      wheelMultiplier: 0.95,
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

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        lenis.start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      gsap.ticker.remove(ticker);
      if (w.__lenis === lenis) delete w.__lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
