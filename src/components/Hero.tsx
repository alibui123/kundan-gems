"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, type MouseEvent } from "react";
import { brand } from "@/lib/data";

const NAV_OFFSET = 72;
const HERO_FILM = "/hero/bridal-gold.mp4";
const HERO_POSTER = "/hero/bridal-gold-poster.jpg";
const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Campaign hero — bridal gold film, maison name, two actions.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
        lenis.scrollTo(y, { duration: 1.2, onComplete: finish });
        window.setTimeout(() => {
          if (scrollingRef.current) finish();
        }, 1800);
      } else {
        window.scrollTo({ top: y, behavior: "smooth" });
        window.setTimeout(finish, 700);
      }
    },
    []
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce) return;

    const syncPlayback = () => {
      if (document.hidden) {
        video.pause();
        return;
      }

      const boutique = document.querySelector(".boutique");
      const covered =
        boutique !== null &&
        boutique.getBoundingClientRect().top < window.innerHeight * 0.4;

      if (covered) {
        video.pause();
        return;
      }

      if (video.paused) {
        void video.play().catch(() => {});
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        syncPlayback();
      });
    };

    void video.play().catch(() => {});
    syncPlayback();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero sticky top-0 z-0 h-[100svh] min-h-[100svh] overflow-hidden bg-[#1a140e]"
      aria-label={brand.fullName}
    >
      <div
        data-hero-cover
        className="relative h-full w-full will-change-transform"
      >
        <motion.div
          className="absolute inset-0"
          initial={
            reduce ? false : { opacity: 0, clipPath: "inset(6% 8% 6% 8%)" }
          }
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <div
            data-hero-parallax
            className="absolute inset-[-6%] will-change-transform"
          >
            {reduce ? (
              <Image
                src={HERO_POSTER}
                alt={`${brand.fullName} — bridal gold jewellery`}
                fill
                priority
                sizes="100vw"
                className="object-cover object-[40%_28%] sm:object-[44%_center]"
              />
            ) : (
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover object-[40%_28%] sm:object-[44%_center]"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={HERO_POSTER}
                disablePictureInPicture
                aria-hidden
              >
                <source src={HERO_FILM} type="video/mp4" />
              </video>
            )}
          </div>
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(16,10,6,0.28) 0%, rgba(16,10,6,0.04) 34%, rgba(16,10,6,0.18) 62%, rgba(16,10,6,0.82) 100%)",
          }}
        />

        <div className="relative z-10 flex h-full min-h-[100svh] items-end justify-center">
          <div className="flex w-full max-w-[44rem] flex-col items-center px-6 pb-12 text-center sm:pb-14 md:pb-16">
            <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-ivory [text-shadow:0_2px_32px_rgba(8,4,2,0.4)]">
              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block italic"
                  initial={reduce ? false : { y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.28 }}
                >
                  Kundan
                </motion.span>
                <motion.span
                  className="ml-[0.28em] inline-block"
                  initial={reduce ? false : { y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.38 }}
                >
                  Gems
                </motion.span>
              </span>
            </h1>

            <motion.span
              className="mt-6 block h-px w-14 origin-center bg-gold"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.72 }}
              aria-hidden
            />

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.86 }}
            >
              <a
                href="#catalogs"
                onClick={(e) => goToSection(e, "catalogs")}
                className="btn-gold-liquid"
              >
                <span>Shop the collection</span>
              </a>
              <a
                href="#gold"
                onClick={(e) => goToSection(e, "gold")}
                className="btn-hero-pearl"
              >
                <span>Explore materials</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
