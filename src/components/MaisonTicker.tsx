"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const PHRASES = [
  "Handcrafted in Pakistan",
  "22K heirloom gold",
  "Private appointments",
  "Certified stones",
  "Complimentary insured shipping",
  "Lifetime atelier care",
  "Bridal · High jewellery · Everyday",
];

/** Quiet luxury ticker — GSAP infinite marquee. */
export function MaisonTicker() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loop = [...PHRASES, ...PHRASES];

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      // Width of one phrase set (half the duplicated track).
      const half = track.scrollWidth / 2;
      if (half <= 0) return;

      gsap.set(track, { x: 0 });
      const tween = gsap.to(track, {
        x: -half,
        duration: 36,
        ease: "none",
        repeat: -1,
      });

      const pause = () => tween.pause();
      const play = () => tween.play();
      track.addEventListener("pointerenter", pause);
      track.addEventListener("pointerleave", play);

      return () => {
        track.removeEventListener("pointerenter", pause);
        track.removeEventListener("pointerleave", play);
      };
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="overflow-hidden border-y border-border bg-white py-7 md:py-8"
      aria-hidden
    >
      <div
        ref={trackRef}
        className="flex w-max items-center gap-10 pr-10 will-change-transform"
      >
        {loop.map((phrase, i) => (
          <span key={`${phrase}-${i}`} className="flex items-center gap-10">
            <span className="font-display text-[1.15rem] tracking-[0.04em] text-ink/80 whitespace-nowrap md:text-[1.35rem]">
              {phrase}
            </span>
            <span className="h-px w-8 bg-gold/70" />
          </span>
        ))}
      </div>
    </section>
  );
}
