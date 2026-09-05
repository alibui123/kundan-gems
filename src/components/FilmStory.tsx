"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, type MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brand } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const NAV_OFFSET = 72;
const HERO_FILM = "/hero/bridal-gold.mp4";
const HERO_POSTER = "/hero/bridal-gold-poster.jpg";

/**
 * Film + type prologue — Apple-restrained scroll story.
 * Three type beats over one pinned film; then normal homepage resumes.
 */
export function FilmStory() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollingRef = useRef(false);

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
        lenis.scrollTo(y, { duration: 0.85, onComplete: finish });
        window.setTimeout(() => {
          if (scrollingRef.current) finish();
        }, 1500);
      } else {
        window.scrollTo({ top: y, behavior: "smooth" });
        window.setTimeout(finish, 600);
      }
    },
    []
  );

  useEffect(() => {
    const video = videoRef.current;
    const story = rootRef.current;
    if (!video || !story) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const sync = () => {
      if (document.hidden) {
        video.pause();
        return;
      }
      // Keep playing while the prologue is on screen (including pinned scroll)
      const rect = story.getBoundingClientRect();
      const inPrologue = rect.bottom > 0 && rect.top < window.innerHeight;
      if (inPrologue) {
        if (video.paused) void video.play().catch(() => {});
        return;
      }
      video.pause();
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
    video.playbackRate = 0.9;
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", sync);

    type LenisLike = {
      on: (e: string, cb: () => void) => void;
      off: (e: string, cb: () => void) => void;
    };
    const getLenis = () =>
      (window as Window & { __lenis?: LenisLike }).__lenis;
    getLenis()?.on("scroll", sync);

    const retry = window.setInterval(() => {
      const l = getLenis();
      if (l) {
        l.on("scroll", sync);
        window.clearInterval(retry);
      }
    }, 200);
    window.setTimeout(() => window.clearInterval(retry), 3000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", sync);
      window.clearInterval(retry);
      getLenis()?.off("scroll", sync);
      video.pause();
    };
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      const pin = pinRef.current;
      if (!root || !pin) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { reduce } = ctx.conditions!;
          const film = pin.querySelector<HTMLElement>("[data-film-layer]");
          const veil = pin.querySelector<HTMLElement>("[data-film-veil]");
          const c1 = pin.querySelector<HTMLElement>("[data-chapter='1']");
          const c2 = pin.querySelector<HTMLElement>("[data-chapter='2']");
          const c3 = pin.querySelector<HTMLElement>("[data-chapter='3']");
          const chapters = [c1, c2, c3].filter(Boolean) as HTMLElement[];

          if (reduce) {
            gsap.set(c1, { opacity: 1, y: 0 });
            gsap.set(c2, { autoAlpha: 0 });
            gsap.set(c3, { autoAlpha: 0 });
            const reduceCtas = pin.querySelector<HTMLElement>(
              "[data-reduce-ctas]"
            );
            if (reduceCtas) gsap.set(reduceCtas, { autoAlpha: 1 });
            return;
          }

          const reduceCtas = pin.querySelector<HTMLElement>(
            "[data-reduce-ctas]"
          );
          if (reduceCtas) gsap.set(reduceCtas, { autoAlpha: 0 });

          gsap.set(c1, { opacity: 1, y: 0 });
          gsap.set([c2, c3], { opacity: 0, y: 28 });
          if (film) gsap.set(film, { scale: 1.04, transformOrigin: "50% 50%" });
          if (veil) gsap.set(veil, { opacity: 0.35 });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: () => `+=${Math.round(window.innerHeight * 2.35)}`,
              pin: pin,
              pinSpacing: true,
              scrub: 0.55,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Text chapters only — film keeps playing; subtle scale for depth
          tl.to(c1, { opacity: 0, y: -20, duration: 0.9 }, 0.15)
            .to(c2, { opacity: 1, y: 0, duration: 0.9 }, 0.35)
            .to(film, { scale: 1.08, duration: 1.6 }, 0)
            .to(veil, { opacity: 0.55, duration: 1.0 }, 0.2);

          // Beat 2 → 3: belief softens, invitation + CTAs
          tl.to(c2, { opacity: 0, y: -18, duration: 0.85 }, 1.35)
            .to(
              c3,
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                onStart: () => {
                  c3?.removeAttribute("aria-hidden");
                  c2?.setAttribute("aria-hidden", "true");
                },
              },
              1.55
            )
            .to(film, { scale: 1.11, duration: 1.2 }, 1.35)
            .to(veil, { opacity: 0.7, duration: 1.0 }, 1.4);

          // Hold final beat briefly so CTAs remain readable
          tl.to({}, { duration: 0.45 });

          // Mark chapter 2 for screen readers when it peaks
          tl.call(
            () => {
              c1?.setAttribute("aria-hidden", "true");
              c2?.removeAttribute("aria-hidden");
            },
            undefined,
            0.6
          );

          const refresh = () => ScrollTrigger.refresh();
          window.addEventListener("load", refresh);
          const raf = requestAnimationFrame(() => {
            refresh();
            window.setTimeout(refresh, 400);
          });

          return () => {
            window.removeEventListener("load", refresh);
            cancelAnimationFrame(raf);
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      id="hero"
      ref={rootRef}
      className="film-story relative z-0 bg-void"
      aria-label={`${brand.fullName} — prologue`}
    >
      <div
        ref={pinRef}
        className="film-story__stage relative h-[100svh] min-h-[100svh] overflow-hidden"
      >
        {/* Film — fixed layer; text chapters scroll over it */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            data-film-layer
            className="absolute inset-0 will-change-transform md:inset-[-8%]"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover object-[center_32%] sm:object-[48%_28%] md:object-[48%_center] motion-reduce:hidden"
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
              alt=""
              fill
              priority
              sizes="100vw"
              className="hidden object-cover object-[center_32%] motion-reduce:block sm:object-[48%_28%] md:object-[48%_center]"
              aria-hidden
            />
          </div>
        </div>

        <div
          data-film-veil
          className="pointer-events-none absolute inset-0 z-[1] will-change-[opacity]"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(14,12,10,0.55) 0%, rgba(14,12,10,0.12) 42%, rgba(14,12,10,0.72) 100%)",
          }}
        />

        {/* Chapter 1 — brand */}
        <div
          data-chapter="1"
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end px-6 pb-24 text-center sm:px-10 sm:pb-28 md:pb-32"
        >
          <div className="mx-auto max-w-[980px]">
            <p className="type-eyebrow text-gold/90">{brand.tagline}</p>
            <h1 className="mt-5 font-display font-normal text-ivory">
              <span className="type-display block font-medium tracking-[-0.03em]">
                {brand.name}
              </span>
              <span className="type-subhead mt-3 block text-ivory/75">
                Timeless jewellery, composed for the moments that become memory.
              </span>
            </h1>
            <div
              data-reduce-ctas
              className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-3 opacity-0 sm:gap-4"
            >
              <a
                href="#catalogs"
                onClick={(e) => goToSection(e, "catalogs")}
                className="btn-hero-atelier pressable"
              >
                <span>Shop collection</span>
              </a>
              <a
                href="#materials"
                onClick={(e) => goToSection(e, "materials")}
                className="btn-hero-secondary pressable"
              >
                Explore materials
              </a>
            </div>
            <p className="mt-10 text-[12px] font-medium tracking-[-0.01em] text-ivory/40 motion-reduce:hidden">
              Scroll to continue
            </p>
          </div>
        </div>

        {/* Chapter 2 — belief */}
        <div
          data-chapter="2"
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center sm:px-10"
          aria-hidden
        >
          <div className="mx-auto max-w-[22ch]">
            <p className="type-eyebrow text-gold">The maison believes</p>
            <p className="mt-8 font-display type-headline font-medium text-ivory">
              Jewellery is not seasonal. It is{" "}
              <span className="text-gold">inherited</span>.
            </p>
          </div>
        </div>

        {/* Chapter 3 — invitation */}
        <div
          data-chapter="3"
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end px-6 pb-24 text-center sm:px-10 sm:pb-28 md:pb-32"
          aria-hidden
        >
          <div className="mx-auto max-w-[520px]">
            <p className="type-eyebrow text-gold/90">Enter the atelier</p>
            <p className="mt-5 font-display type-headline font-medium text-ivory">
              Three materials. One maison.
            </p>
            <p className="mx-auto mt-4 max-w-sm text-[15px] leading-[1.55] tracking-[-0.01em] text-ivory/60">
              Gold, diamond, and ruby — composed for the aisle, the night, and
              every day after.
            </p>
            <div className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="#catalogs"
                onClick={(e) => goToSection(e, "catalogs")}
                className="btn-hero-atelier pressable"
              >
                <span>Shop collection</span>
              </a>
              <a
                href="#materials"
                onClick={(e) => goToSection(e, "materials")}
                className="btn-hero-secondary pressable"
              >
                Explore materials
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
