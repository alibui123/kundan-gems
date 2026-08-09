"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useRef, type MouseEvent } from "react";
import { brand } from "@/lib/data";

const NAV_OFFSET = 72;
/** Studio mockup — Pakistani gold jewellery, light ground for seamless blend */
const HERO_MODEL = "/hero/blend-model-gold.png";

/**
 * Aurélia-style maison hero: ivory stage, left copy, right model
 * blended into the background (no framed photo box).
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollingRef = useRef(false);
  const reduce = useReducedMotion();

  const getLenis = () =>
    (
      window as Window & {
        __lenis?: {
          scrollTo: (
            target: number | string | HTMLElement,
            opts?: { duration?: number; onComplete?: () => void }
          ) => void;
        };
      }
    ).__lenis;

  const goToSection = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      event.preventDefault();
      event.stopPropagation();
      if (scrollingRef.current) return;

      const target = document.getElementById(sectionId);
      if (!target) return;

      scrollingRef.current = true;
      const y =
        target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

      const finish = () => {
        history.replaceState(null, "", `#${sectionId}`);
        window.setTimeout(() => {
          scrollingRef.current = false;
        }, 120);
      };

      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(y, { duration: 1.05, onComplete: finish });
        window.setTimeout(() => {
          if (scrollingRef.current) finish();
        }, 1500);
      } else {
        window.scrollTo({ top: y, behavior: "smooth" });
        window.setTimeout(finish, 700);
      }
    },
    []
  );

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero relative min-h-[100svh] overflow-hidden bg-white"
      aria-label={`${brand.name} — Embrace timeless brilliance`}
    >
      {/* Soft ambient wash — keeps the studio field alive */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 78% 45%, rgba(255,255,255,0.55) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1440px] items-center lg:grid-cols-12">
        {/* Copy — left */}
        <div className="relative z-20 flex flex-col justify-center px-6 pt-28 pb-10 sm:px-10 md:px-14 lg:col-span-5 lg:px-16 lg:pt-24 lg:pb-20 xl:pl-20">
          <motion.p
            className="label-caps mb-5 text-gold"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            {brand.name} · Fine jewellery
          </motion.p>

          <motion.h1
            className="font-display text-[clamp(2.75rem,6.5vw,4.75rem)] leading-[1.05] tracking-[0.02em] text-ink uppercase"
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
          >
            Embrace
            <br />
            timeless
            <br />
            brilliance
          </motion.h1>

          <motion.p
            className="mt-6 max-w-sm text-[15px] leading-[1.75] text-muted"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.4 }}
          >
            Discover heirloom gold and kundan craftsmanship — composed in
            Pakistan, designed to last generations.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.55 }}
          >
            <a
              href="#catalogs"
              onClick={(e) => goToSection(e, "catalogs")}
              className="inline-flex h-12 items-center bg-ink px-8 text-[11px] font-medium tracking-[0.18em] text-ivory uppercase transition-colors duration-300 hover:bg-gold hover:text-void"
            >
              Shop the collection
            </a>
            <a
              href="#browse"
              onClick={(e) => goToSection(e, "browse")}
              className="group inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.16em] text-ink/50 uppercase transition-colors hover:text-ink"
            >
              How to shop
              <span
                className="h-px w-7 bg-current transition-all duration-300 group-hover:w-10 group-hover:bg-gold"
                aria-hidden
              />
            </a>
          </motion.div>
        </div>

        {/* Model — right, blended into ivory (no card / no frame) */}
        <div className="relative z-10 min-h-[52vh] lg:col-span-7 lg:min-h-[100svh]">
          <motion.div
            className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-[-8%]"
            initial={reduce ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.15, ease, delay: 0.25 }}
          >
            <div
              className="absolute inset-0"
              style={{
                // Soft left edge dissolve so she sits in the page, not a box
                maskImage:
                  "linear-gradient(90deg, transparent 0%, black 18%, black 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, black 18%, black 100%)",
              }}
            >
              <Image
                src={HERO_MODEL}
                alt="Kundan fine jewellery — Pakistani model in gold haar, jhumkas and bangles"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                unoptimized
                className="object-cover object-[68%_center] sm:object-[72%_center] lg:object-[78%_center]"
              />
            </div>

            {/* Extra ivory wash from the left for a perfect seam */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-ivory via-ivory/85 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ivory to-transparent lg:hidden"
              aria-hidden
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
