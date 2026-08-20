"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, type MouseEvent } from "react";
import { brand } from "@/lib/data";

const NAV_OFFSET = 96;
const HERO_FILM = "/hero/bridal-gold.mp4";
const HERO_POSTER = "/hero/bridal-gold-poster.jpg";
const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Hallmark Manifesto × runway — declaration over film.
 * Roman display only (no italic headers). Oversized solid CTA below the fold cue.
 */
export function Hero() {
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
        lenis.scrollTo(y, { duration: 1.35, onComplete: finish });
        window.setTimeout(() => {
          if (scrollingRef.current) finish();
        }, 2000);
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
    const sync = () => {
      if (document.hidden) {
        video.pause();
        return;
      }
      const boutique = document.querySelector(".boutique");
      const covered =
        boutique !== null &&
        boutique.getBoundingClientRect().top < window.innerHeight * 0.36;
      if (covered) {
        video.pause();
        return;
      }
      if (video.paused) void video.play().catch(() => {});
    };
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        sync();
      });
    };
    void video.play().catch(() => {});
    video.playbackRate = 0.88;
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", sync);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [reduce]);

  return (
    <section
      id="hero"
      className="hero sticky top-0 z-0 h-[100svh] min-h-[100svh] overflow-hidden bg-void"
      aria-label={brand.fullName}
    >
      <div
        data-hero-cover
        className="relative h-full w-full will-change-transform"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            data-hero-parallax
            className="absolute inset-0 will-change-transform md:inset-[-8%]"
          >
            {reduce ? (
              <Image
                src={HERO_POSTER}
                alt={`${brand.fullName} — bridal gold jewellery`}
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_32%] sm:object-[48%_28%] md:object-[48%_center]"
              />
            ) : (
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover object-[center_32%] sm:object-[48%_28%] md:object-[48%_center]"
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
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(14,12,10,0.45) 0%, rgba(14,12,10,0.15) 40%, rgba(14,12,10,0.55) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex h-full min-h-[100svh] max-w-[1600px] flex-col items-center justify-end px-6 pb-20 pt-28 text-center sm:px-10 sm:pb-24 md:pb-28 lg:pb-32">
          <motion.p
            className="text-[10px] font-medium tracking-[0.4em] text-ivory/50 uppercase"
            initial={reduce ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          >
           
          </motion.p>

          <h1 className="mt-8 font-display font-normal text-ivory">
            <span className="block overflow-hidden">
              <motion.span
                className="block text-[clamp(4rem,14vw,9.5rem)] leading-[0.85] tracking-[0.04em] uppercase"
                initial={reduce ? false : { x: "-12%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                transition={{ duration: 1.15, ease: EASE, delay: 0.35 }}
              >
                Kundan
              </motion.span>
            </span>
            <span className="mt-2 block overflow-hidden">
              <motion.span
                className="block text-[clamp(1.5rem,4vw,2.75rem)] leading-none tracking-[0.35em] uppercase text-gold"
                initial={reduce ? false : { x: "12%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                transition={{ duration: 1.15, ease: EASE, delay: 0.5 }}
              >
                GEMS
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-10 max-w-md text-[14px] leading-[1.75] text-ivory/65"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.85 }}
          >
            
          </motion.p>

          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-6"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
          >
            <a
              href="#catalogs"
              onClick={(e) => goToSection(e, "catalogs")}
              className="btn-hero-atelier group"
            >
              <span>Shop Collection</span>
            </a>
            <a
              href="#materials"
              onClick={(e) => goToSection(e, "materials")}
              className="link-draw link-draw-gold text-[10px] font-medium tracking-[0.26em] text-ivory/55 uppercase hover:text-gold"
            >
              Materials
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
