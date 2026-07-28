"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scroll for fine-pointer desktops only.
 * Touch / coarse pointers use native scroll — Lenis often "sticks" on mobile
 * and some laptop trackpads when nested with ScrollTrigger.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (reduceMotion || !finePointer) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.2,
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
      // Resume if a prior stop left Lenis frozen after a cancelled nav gesture
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
