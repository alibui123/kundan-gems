"use client";

import { useCallback, useRef, useState, type MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HeroFrameSequence,
  HERO_AUTOPLAY_COUNT,
  HERO_FRAME_COUNT,
  HERO_SCROLL_END,
  HERO_SCROLL_START,
  type HeroFrameHandle,
} from "@/components/HeroFrameSequence";
import { brand } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AUTOPLAY_FPS = 24;

/**
 * Homepage landing — split stage.
 * Copy left, frame sequence right. Frames 0–71 autoplay; rest scrub on scroll.
 * Once the last frame is reached, playback does not reverse until reload.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const framesRef = useRef<HeroFrameHandle>(null);
  const [autoplayReady, setAutoplayReady] = useState(false);
  const [framesReady, setFramesReady] = useState(false);
  const [autoplayDone, setAutoplayDone] = useState(false);

  const onAutoplayReady = useCallback(() => {
    setAutoplayReady(true);
  }, []);

  const onFramesReady = useCallback(() => {
    setFramesReady(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  const getLenis = () =>
    (
      window as Window & {
        __lenis?: {
          resize?: () => void;
          scrollTo: (
            target: number | string | HTMLElement,
            opts?: { immediate?: boolean; offset?: number }
          ) => void;
        };
      }
    ).__lenis;

  /** Unpin hero if needed, then scroll to a page section in one click. */
  const goToSection = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      event.preventDefault();

      framesRef.current?.setFrame(HERO_SCROLL_END);

      const pin = ScrollTrigger.getById("hero-scroll-frames");
      if (pin) pin.kill(false);

      window.dispatchEvent(new CustomEvent("kundan:hero-complete"));

      requestAnimationFrame(() => {
        const lenis = getLenis();
        lenis?.resize?.();
        ScrollTrigger.refresh();

        const target = document.getElementById(sectionId);
        if (!target) return;

        if (lenis) {
          lenis.scrollTo(target, { offset: 0 });
        } else {
          const top =
            target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top, behavior: "smooth" });
        }

        history.replaceState(null, "", `#${sectionId}`);
      });
    },
    []
  );

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(".hero-media", { autoAlpha: 0, x: 48 });
      gsap.set(".hero-brand", { autoAlpha: 0, y: 28 });
      gsap.set(".hero-rule", { scaleX: 0 });
      gsap.set(
        [
          ".hero-eyebrow",
          ".hero-line",
          ".hero-support",
          ".hero-cta",
          ".hero-scroll",
        ],
        { autoAlpha: 0, y: 18 }
      );

      if (reduce) {
        gsap.set(
          [
            ".hero-media",
            ".hero-brand",
            ".hero-rule",
            ".hero-eyebrow",
            ".hero-line",
            ".hero-support",
            ".hero-cta",
            ".hero-scroll",
          ],
          { clearProps: "all" }
        );
        framesRef.current?.setFrame(HERO_FRAME_COUNT - 1);
        setAutoplayDone(true);
        window.dispatchEvent(new CustomEvent("kundan:hero-complete"));
        return;
      }

      const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });

      entrance
        .to(".hero-media", {
          autoAlpha: 1,
          x: 0,
          duration: 1.6,
          ease: "power2.out",
        })
        .to(".hero-eyebrow", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.25)
        .to(".hero-brand", { autoAlpha: 1, y: 0, duration: 1.15 }, 0.4)
        .to(
          ".hero-rule",
          { scaleX: 1, duration: 0.95, ease: "power2.inOut" },
          0.75
        )
        .to(".hero-line", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.95)
        .to(".hero-support", { autoAlpha: 1, y: 0, duration: 0.85 }, 1.1)
        .to(".hero-cta", { autoAlpha: 1, y: 0, duration: 0.8 }, 1.25);
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      if (!autoplayReady) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        framesRef.current?.setFrame(HERO_SCROLL_START);
        setAutoplayDone(true);
        return;
      }

      const end = HERO_SCROLL_START;
      const proxy = { frame: 0 };
      framesRef.current?.setFrame(0);

      gsap.to(proxy, {
        frame: end,
        duration: Math.max(0.5, HERO_AUTOPLAY_COUNT / AUTOPLAY_FPS),
        ease: "none",
        snap: "frame",
        onUpdate: () => {
          framesRef.current?.setFrame(proxy.frame);
        },
        onComplete: () => {
          framesRef.current?.setFrame(end);
          setAutoplayDone(true);
          gsap.to(".hero-scroll", {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: sectionRef, dependencies: [autoplayReady] }
  );

  useGSAP(
    () => {
      if (!framesReady || !autoplayDone) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        framesRef.current?.setFrame(HERO_SCROLL_END);
        window.dispatchEvent(new CustomEvent("kundan:hero-complete"));
        return;
      }

      const start = HERO_SCROLL_START;
      const end = HERO_SCROLL_END;
      const proxy = { frame: start };
      framesRef.current?.setFrame(start);

      let locked = false;
      let open: gsap.core.Timeline;

      const settleAsNormalSection = (self: ScrollTrigger) => {
        if (locked) return;
        locked = true;

        framesRef.current?.setFrame(end);
        open?.progress(1);

        // Release pin without reverting the final frame — section becomes normal 100svh
        self.kill(false);

        requestAnimationFrame(() => {
          const lenis = (
            window as Window & {
              __lenis?: {
                resize?: () => void;
                scrollTo: (
                  y: number,
                  opts?: { immediate?: boolean }
                ) => void;
              };
            }
          ).__lenis;

          lenis?.resize?.();
          ScrollTrigger.refresh();

          // Keep scroll on/after the hero — never leave Lenis stranded in the
          // old pin-spacer (that black void above the page).
          const heroBottom = sectionRef.current?.offsetHeight ?? window.innerHeight;
          const y = Math.min(Math.max(window.scrollY, 0), heroBottom);
          if (lenis) lenis.scrollTo(y, { immediate: true });
          else window.scrollTo({ top: y, behavior: "auto" });

          window.dispatchEvent(new CustomEvent("kundan:hero-complete"));
          ScrollTrigger.refresh();
        });
      };

      open = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          // One viewport of scrub — snappy reveal, not a long tunnel
          end: "+=100%",
          pin: true,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "hero-scroll-frames",
          onUpdate: (self) => {
            if (self.progress >= 0.995) settleAsNormalSection(self);
          },
          onLeave: (self) => {
            settleAsNormalSection(self);
          },
        },
      });

      open
        .to(
          proxy,
          {
            frame: end,
            snap: "frame",
            duration: 1,
            onUpdate: () => {
              if (!locked) framesRef.current?.setFrame(proxy.frame);
            },
          },
          0
        )
        .to(".hero-scroll", { autoAlpha: 0, duration: 0.2 }, 0);

      ScrollTrigger.refresh();
    },
    {
      scope: sectionRef,
      dependencies: [framesReady, autoplayDone],
      revertOnUpdate: true,
    }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero relative h-[100svh] overflow-hidden bg-void"
      aria-label={`${brand.name} — Crafted for forever`}
    >
      <div className="flex h-full flex-col lg:flex-row">
        {/* Left — brand & copy */}
        <div className="relative z-10 flex w-full shrink-0 flex-col justify-center px-5 py-8 md:px-12 lg:w-[42%] lg:shrink lg:px-16 lg:py-16 xl:w-[40%] xl:pl-20 xl:pr-12">
          <div className="max-w-md">
            <p className="hero-eyebrow text-[10px] font-medium tracking-[0.38em] text-gold uppercase">
              Maison de Joaillerie
            </p>

            <p className="hero-brand mt-4 font-display text-[clamp(2.5rem,6vw,5.25rem)] font-light leading-[0.95] tracking-[0.22em] text-white uppercase lg:mt-5">
              {brand.name}
            </p>

            <div className="hero-rule mt-5 h-px w-14 origin-left bg-gold lg:mt-6" />

            <h1 className="hero-line mt-5 font-display text-[clamp(1.35rem,2.4vw,2rem)] font-light italic leading-snug tracking-[-0.01em] text-white/90 lg:mt-7">
              Crafted for forever
            </h1>

            <p className="hero-support mt-3 max-w-sm text-[14px] leading-relaxed text-white/50 lg:mt-4">
              Designed to celebrate moments — worn across generations.
            </p>

            <div className="hero-cta mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-10">
              <a
                href="#collections"
                onClick={(e) => goToSection(e, "collections")}
                className="hero-cta-primary group relative inline-flex h-[52px] items-center gap-5 overflow-hidden rounded-full border border-gold bg-gold px-8 text-[11px] font-medium tracking-[0.22em] text-void uppercase transition-[color,background-color,border-color] duration-500 hover:bg-transparent hover:text-gold"
              >
                <span className="relative z-10">Enter the boutique</span>
                <span
                  className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-void/20 transition-colors duration-500 group-hover:border-gold/50"
                  aria-hidden
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform duration-500 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M2 7h9M7.5 3.5 11 7l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span
                  className="pointer-events-none absolute inset-[3px] rounded-full border border-void/15 transition-colors duration-500 group-hover:border-gold/35"
                  aria-hidden
                />
              </a>

              <a
                href="#materials"
                onClick={(e) => goToSection(e, "materials")}
                className="hero-cta-secondary group inline-flex h-[52px] items-center gap-4 text-[11px] font-medium tracking-[0.22em] text-white/55 uppercase transition-colors duration-300 hover:text-gold"
              >
                <span className="relative">
                  The materials
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                </span>
                <span
                  className="flex items-center gap-2 text-gold/70 transition-all duration-500 group-hover:gap-3 group-hover:text-gold"
                  aria-hidden
                >
                  <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6h7M6 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>

            <div className="hero-scroll mt-12 hidden items-center gap-3 lg:flex">
              <span className="h-8 w-px bg-gradient-to-b from-gold/75 to-transparent" />
              <span className="text-[9px] tracking-[0.34em] text-white/40 uppercase">
                Scroll to reveal
              </span>
            </div>
          </div>
        </div>

        {/* Right — frame sequence (full-bleed on the right) */}
        <div className="hero-media relative order-first min-h-[46svh] flex-1 lg:order-none lg:min-h-0 lg:w-[58%] xl:w-[60%]">
          <HeroFrameSequence
            ref={framesRef}
            className="absolute inset-0 h-full w-full"
            onAutoplayReady={onAutoplayReady}
            onReady={onFramesReady}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-void to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-void to-transparent lg:hidden" />
        </div>
      </div>

      <div className="hero-scroll pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 lg:hidden">
        <span className="text-[9px] tracking-[0.34em] text-white/40 uppercase">
          Scroll to reveal
        </span>
        <span className="h-7 w-px bg-gradient-to-b from-gold/75 to-transparent" />
      </div>
    </section>
  );
}
