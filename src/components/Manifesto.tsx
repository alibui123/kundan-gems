"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * About the maison — centered, bold, one breath. The manifesto line
 * carries the weight; the background story stays to a single line.
 */
export function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const lines = gsap.utils.toArray<HTMLElement>(".manifesto-line-inner");

      if (reduce) {
        gsap.set(lines, { clearProps: "all" });
        return;
      }

      gsap.set(lines, { yPercent: 110 });

      let played = false;
      const reveal = () => {
        if (played) return;
        played = true;
        gsap.to(lines, {
          yPercent: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.1,
        });
      };

      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 85%",
        once: true,
        invalidateOnRefresh: true,
        onEnter: reveal,
      });

      // Layout can shift after images/fonts settle (this section sits right
      // under the sticky hero) — refresh so the trigger's start position is
      // measured against the final layout, and check once more in case the
      // section was already in view before that refresh landed.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const raf = requestAnimationFrame(() => {
        refresh();
        const rect = rootRef.current?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight * 0.85) reveal();
      });

      // Belt and braces — never leave the headline permanently invisible.
      const safety = window.setTimeout(reveal, 2500);

      return () => {
        window.clearTimeout(safety);
        window.removeEventListener("load", refresh);
        cancelAnimationFrame(raf);
        st.kill();
      };
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative bg-white px-6 py-16 text-center sm:py-20 md:py-24"
      aria-label="About the maison"
    >
      <p className="manifesto-line mx-auto overflow-hidden">
        <span className="manifesto-line-inner block font-display text-[clamp(2.25rem,5.6vw,4.25rem)] font-medium leading-[1.1] tracking-[-0.015em] text-ink">
          Jewellery is not seasonal.
        </span>
      </p>
      <p className="manifesto-line mx-auto overflow-hidden">
        <span className="manifesto-line-inner block font-display text-[clamp(2.25rem,5.6vw,4.25rem)] font-medium leading-[1.1] tracking-[-0.015em] text-gold">
          It is inherited.
        </span>
      </p>

      <span className="gold-divider reveal-item mx-auto mt-6 block" aria-hidden />

      <p className="reveal-item mx-auto mt-6 max-w-lg text-[15px] leading-[1.8] text-muted">
        Born at a single workbench in Lahore, where kundan-setting —
        pressing uncut stone into gold — passed hand to hand long before
        it was ever a shop. It still starts there today.
      </p>

      <p
        className="reveal-item mt-5 font-display text-2xl tracking-[0.1em] text-gold/60"
        lang="ur"
        dir="rtl"
      >
        کندن
      </p>
    </section>
  );
}
