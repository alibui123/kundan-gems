"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, type MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { brand } from "@/lib/data";
import { StoryScrollCue } from "@/components/story/StoryScrollCue";

const HERO_FILM = "/hero/bridal-gold.mp4";
const HERO_POSTER = "/hero/bridal-gold-poster.jpg";
const NAV_OFFSET = 72;

/**
 * Single-screen cinematic hero. The film and the full wordmark carry the
 * identity; the boutique rises over it on scroll via `position: sticky`
 * (cheap, no pin/scrub math).
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollingRef = useRef(false);

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
      window.scrollTo({ top: y, behavior: "smooth" });
      window.setTimeout(finish, 600);
    },
    []
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const sync = () => {
      if (document.hidden) {
        video.pause();
        return;
      }
      const boutique = document.querySelector(".boutique");
      const covered =
        boutique !== null &&
        boutique.getBoundingClientRect().top < window.innerHeight * 0.3;
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
    video.playbackRate = 0.85;
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", sync);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, []);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set(
          [".hero-mark", ".hero-sub", ".hero-line", ".hero-ctas", ".hero-cue"],
          { clearProps: "all", opacity: 1 }
        );
        return;
      }

      const kenburns = rootRef.current?.querySelector<HTMLElement>(
        ".hero-kenburns"
      );
      if (kenburns) {
        gsap.set(kenburns, { scale: 1, transformOrigin: "50% 40%" });
        gsap.to(kenburns, {
          scale: 1.06,
          duration: 26,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      gsap.set(".hero-mark-inner", { yPercent: 115 });
      gsap.set(".hero-sub-inner", { yPercent: 115 });
      gsap.set(".hero-line-inner", { yPercent: 115 });
      gsap.set(".hero-ctas", { opacity: 0, y: 16 });
      gsap.set(".hero-cue", { opacity: 0 });

      gsap
        .timeline({ defaults: { ease: "power3.out" }, delay: 0.3 })
        .to(".hero-mark-inner", { yPercent: 0, duration: 1.15 }, 0)
        .to(".hero-sub-inner", { yPercent: 0, duration: 0.9 }, 0.28)
        .to(".hero-line-inner", { yPercent: 0, duration: 1, stagger: 0.06 }, 0.46)
        .to(".hero-ctas", { opacity: 1, y: 0, duration: 0.8 }, 0.75)
        .to(".hero-cue", { opacity: 1, duration: 0.8 }, 1.15);
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="hero"
      className="hero sticky top-0 z-0 h-[100svh] min-h-[100svh] overflow-hidden bg-void"
      aria-label={brand.fullName}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-kenburns absolute inset-0 will-change-transform md:inset-[-4%]">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-[center_30%] sm:object-[48%_26%] md:object-[48%_center] motion-reduce:hidden"
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
          <Image
            src={HERO_POSTER}
            alt={`${brand.fullName} — bridal gold jewellery`}
            fill
            priority
            sizes="100vw"
            className="hidden object-cover object-[center_30%] motion-reduce:block sm:object-[48%_26%] md:object-[48%_center]"
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(14,12,10,0.42) 0%, rgba(14,12,10,0.05) 40%, rgba(14,12,10,0.72) 100%)",
        }}
      />
      <div className="cinematic-grain pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 flex h-full min-h-[100svh] flex-col items-center justify-end px-6 pb-24 text-center sm:pb-28 md:pb-32">
        <h1 className="hero-mark overflow-hidden">
          <span className="hero-mark-inner block font-display type-display font-medium tracking-[-0.03em] text-ivory">
            {brand.name}
          </span>
        </h1>

        <p className="hero-sub mt-2 overflow-hidden sm:mt-3">
          <span className="hero-sub-inner cinematic-glow-text block text-[13px] font-semibold tracking-[0.34em] text-gold-bright uppercase sm:text-[14px]">
            Gems and Jewellers
          </span>
        </p>

        <p className="mt-6 max-w-md overflow-hidden">
          <span className="hero-line-inner block text-[15px] leading-[1.6] text-ivory/70 sm:text-[16px]">
            For the morning of, and every year after.
          </span>
        </p>

        <div className="hero-ctas mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#catalogs"
            onClick={(e) => goToSection(e, "catalogs")}
            className="btn-hero-atelier pressable"
          >
            <span>Shop catalogs</span>
          </a>
          <a
            href="#materials"
            onClick={(e) => goToSection(e, "materials")}
            className="btn-hero-secondary pressable"
          >
            Discover the Collection
          </a>
        </div>

        <div className="hero-cue mt-12">
          <StoryScrollCue visible />
        </div>
      </div>
    </section>
  );
}
