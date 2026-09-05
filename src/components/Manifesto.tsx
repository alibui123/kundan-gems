"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PILLARS = [
  { n: "01", label: "Hand", copy: "Every setting pressed by the same atelier hands." },
  { n: "02", label: "Stone", copy: "Chosen for fire first — certificates follow." },
  { n: "03", label: "Time", copy: "Designed to be worn into the next generation." },
];

/**
 * Maison philosophy — centered dark salon, sticky scrub type only.
 */
export function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!root || !track || !stage) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const eyebrow = stage.querySelector<HTMLElement>("[data-philo-eyebrow]");
      const lines = gsap.utils.toArray<HTMLElement>(
        stage.querySelectorAll("[data-philo-line]")
      );
      const rule = stage.querySelector<HTMLElement>("[data-philo-rule]");
      const body = stage.querySelector<HTMLElement>("[data-philo-body]");
      const urdu = stage.querySelector<HTMLElement>("[data-philo-urdu]");
      const pillars = gsap.utils.toArray<HTMLElement>(
        stage.querySelectorAll("[data-philo-pillar]")
      );

      if (reduce) {
        gsap.set([eyebrow, ...lines, rule, body, urdu, ...pillars], {
          clearProps: "all",
          autoAlpha: 1,
          y: 0,
          yPercent: 0,
        });
        return;
      }

      gsap.set(eyebrow, { autoAlpha: 0, y: 20 });
      gsap.set(lines, { yPercent: 110 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "center center" });
      gsap.set(body, { autoAlpha: 0, y: 24 });
      gsap.set(urdu, { autoAlpha: 0, y: 16 });
      gsap.set(pillars, { autoAlpha: 0, y: 28 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.12 }, 0)
        .to(
          lines,
          { yPercent: 0, duration: 0.22, stagger: 0.08, ease: "power2.out" },
          0.08
        )
        .to(rule, { scaleX: 1, duration: 0.14 }, 0.28)
        .to(body, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.32)
        .to(urdu, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.38)
        .to(
          pillars,
          { autoAlpha: 1, y: 0, duration: 0.16, stagger: 0.05 },
          0.48
        )
        .to({}, { duration: 0.2 });

      const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        cancelAnimationFrame(raf);
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="philosophy"
      className="boutique relative z-10 bg-void text-ivory"
      aria-label="Maison philosophy"
    >
      <div ref={trackRef} className="relative h-[180vh] md:h-[200vh]">
        <div
          ref={stageRef}
          className="sticky top-0 flex min-h-[100svh] items-center justify-center overflow-hidden"
        >
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(191,164,106,0.12) 0%, transparent 62%), radial-gradient(ellipse 50% 40% at 50% 85%, rgba(92,31,42,0.14) 0%, transparent 55%)",
            }}
          />
          <div
            className="cinematic-grain pointer-events-none absolute inset-0 opacity-40"
            aria-hidden
          />

          <div className="relative z-[1] mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-20 text-center sm:px-10 sm:py-24">
            <p
              data-philo-eyebrow
              className="text-[8px] font-medium tracking-[0.32em] text-gold uppercase sm:text-[10px] sm:tracking-[0.38em]"
            >
              Philosophy
            </p>

            <h2 className="mt-6 sm:mt-8">
              <span className="block overflow-hidden">
                <span
                  data-philo-line
                  className="block font-display text-[clamp(2.25rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.02em] text-ivory"
                >
                  Not worn
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  data-philo-line
                  className="block font-display text-[clamp(2.25rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.02em] text-ivory"
                >
                  for a season.
                </span>
              </span>
              <span className="mt-1 block overflow-hidden sm:mt-2">
                <span
                  data-philo-line
                  className="block font-display text-[clamp(2.25rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.02em] text-gold"
                >
                  Kept for
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  data-philo-line
                  className="block font-display text-[clamp(2.25rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.02em] text-gold"
                >
                  a lifetime.
                </span>
              </span>
            </h2>

            <span
              data-philo-rule
              className="mt-8 block h-px w-16 bg-gold sm:mt-10 sm:w-24"
              aria-hidden
            />

            <p
              data-philo-body
              className="mt-6 max-w-lg text-[13px] leading-[1.8] text-ivory/55 sm:mt-8 sm:text-[15px] sm:leading-[1.85]"
            >
              Born at a single workbench in Lahore, where kundan-setting —
              pressing uncut stone into gold — passed hand to hand long before
              it was ever a shop. It still starts there today.
            </p>

            <p
              data-philo-urdu
              className="mt-5 font-display text-2xl tracking-[0.14em] text-gold/45 sm:mt-6 sm:text-3xl"
              lang="ur"
              dir="rtl"
            >
              کندن
            </p>

            <div className="mt-10 grid w-full max-w-xl grid-cols-3 gap-4 sm:mt-14 sm:gap-8">
              {PILLARS.map((p) => (
                <div key={p.n} data-philo-pillar className="text-center">
                  <p className="text-[8px] tracking-[0.24em] text-gold/80 uppercase sm:text-[9px] sm:tracking-[0.28em]">
                    {p.n} · {p.label}
                  </p>
                  <p className="mt-2 text-[11px] leading-snug text-ivory/50 sm:mt-3 sm:text-[13px] sm:leading-relaxed">
                    {p.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
