"use client";

import Image from "next/image";
import { useCallback, useRef, type MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { brand } from "@/lib/data";
import { BrandLogo } from "@/components/BrandLogo";

gsap.registerPlugin(useGSAP);

const NAV_OFFSET = 72;

const PIECES = [
  {
    id: "main",
    src: "https://images.unsplash.com/photo-1680068099049-0263ffbcefd8?auto=format&fit=crop&w=1600&q=90",
    alt: "Gold and diamond necklace",
    className:
      "hero-piece absolute left-[8%] top-[10%] h-[74%] w-[74%] sm:left-[10%] sm:top-[8%] sm:h-[78%] sm:w-[78%]",
  },
  {
    id: "ring",
    src: "https://images.unsplash.com/photo-1718312267215-58bbba315a15?auto=format&fit=crop&w=1000&q=90",
    alt: "Pearl and gold strands",
    className:
      "hero-piece absolute right-[0%] top-[6%] h-[34%] w-[38%] sm:right-[2%] sm:top-[10%] sm:h-[34%] sm:w-[36%]",
  },
  {
    id: "side",
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=90",
    alt: "Gold bracelet stack",
    className:
      "hero-piece absolute bottom-[6%] left-[4%] h-[28%] w-[38%] sm:bottom-[10%] sm:left-[6%] sm:h-[28%] sm:w-[34%]",
  },
] as const;

/** Brand-first landing — quiet motion, clear CTA. */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const scrollingRef = useRef(false);

  const getLenis = () =>
    (
      window as Window & {
        __lenis?: {
          scrollTo: (
            target: number | string | HTMLElement,
            opts?: {
              immediate?: boolean;
              offset?: number;
              duration?: number;
              onComplete?: () => void;
            }
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
        lenis.scrollTo(y, { duration: 1.1, onComplete: finish });
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

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(".hero-brand", { autoAlpha: 0, y: 20 });
      gsap.set(".hero-rule", { scaleX: 0 });
      gsap.set(
        [".hero-eyebrow", ".hero-line", ".hero-support", ".hero-cta"],
        { autoAlpha: 0, y: 14 }
      );
      gsap.set(".hero-piece", { autoAlpha: 0, scale: 0.96 });

      if (reduce) {
        gsap.set(
          [
            ".hero-brand",
            ".hero-rule",
            ".hero-eyebrow",
            ".hero-line",
            ".hero-support",
            ".hero-cta",
            ".hero-piece",
          ],
          { clearProps: "all" }
        );
        return;
      }

      const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });

      entrance
        .to(".hero-eyebrow", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.1)
        .to(".hero-brand", { autoAlpha: 1, y: 0, duration: 1 }, 0.22)
        .to(
          ".hero-rule",
          { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
          0.5
        )
        .to(".hero-line", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.65)
        .to(".hero-support", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.78)
        .to(".hero-cta", { autoAlpha: 1, y: 0, duration: 0.65 }, 0.92)
        .to(
          ".hero-piece-main",
          { autoAlpha: 1, scale: 1, duration: 1.15, ease: "power2.out" },
          0.28
        )
        .to(
          ".hero-piece-ring",
          { autoAlpha: 1, scale: 1, duration: 0.95, ease: "power2.out" },
          0.5
        )
        .to(
          ".hero-piece-side",
          { autoAlpha: 1, scale: 1, duration: 0.95, ease: "power2.out" },
          0.65
        );

      gsap.to(".hero-float-main", {
        y: -10,
        duration: 5.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-float-ring", {
        y: 8,
        duration: 4.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-float-side", {
        y: -8,
        duration: 5.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      const media = mediaRef.current;
      if (!media) return;

      const qxMain = gsap.quickTo(".hero-piece-main", "x", {
        duration: 0.9,
        ease: "power2.out",
      });
      const qyMain = gsap.quickTo(".hero-piece-main", "y", {
        duration: 0.9,
        ease: "power2.out",
      });
      const qxRing = gsap.quickTo(".hero-piece-ring", "x", {
        duration: 1,
        ease: "power2.out",
      });
      const qyRing = gsap.quickTo(".hero-piece-ring", "y", {
        duration: 1,
        ease: "power2.out",
      });
      const qxSide = gsap.quickTo(".hero-piece-side", "x", {
        duration: 1.05,
        ease: "power2.out",
      });
      const qySide = gsap.quickTo(".hero-piece-side", "y", {
        duration: 1.05,
        ease: "power2.out",
      });

      const onMove = (e: globalThis.MouseEvent) => {
        const rect = media.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        qxMain(nx * 12);
        qyMain(ny * 8);
        qxRing(nx * -16);
        qyRing(ny * 10);
        qxSide(nx * 10);
        qySide(ny * -8);
      };

      const onLeave = () => {
        qxMain(0);
        qyMain(0);
        qxRing(0);
        qyRing(0);
        qxSide(0);
        qySide(0);
      };

      media.addEventListener("mousemove", onMove);
      media.addEventListener("mouseleave", onLeave);
      return () => {
        media.removeEventListener("mousemove", onMove);
        media.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero relative h-[100svh] overflow-hidden bg-ivory"
      aria-label={`${brand.name} — Crafted for forever`}
    >
      <div className="flex h-full flex-col lg:flex-row">
        <div className="relative z-10 flex w-full shrink-0 flex-col justify-center px-5 py-10 md:px-12 lg:w-[44%] lg:px-16 lg:py-16 xl:w-[42%] xl:pl-20 xl:pr-10">
          <div className="max-w-md">
            <p className="hero-eyebrow label-caps">Maison de joaillerie</p>

            <div className="hero-brand mt-5 lg:mt-6">
              <BrandLogo size="hero" priority className="mb-3 sm:mb-4" />
              <p className="font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-light leading-[0.92] tracking-[0.14em] text-ink uppercase">
                {brand.name}
              </p>
            </div>

            <div className="hero-rule mt-6 h-px w-12 origin-left bg-gold" />

            <h1 className="hero-line mt-6 font-display text-[clamp(1.35rem,2.2vw,1.85rem)] font-light italic leading-snug text-ink/85">
              Crafted for forever
            </h1>

            <p className="hero-support mt-4 max-w-sm text-[14px] leading-[1.75] text-muted">
              Bridal catalogs, high jewellery, and everyday gold — composed in
              Pakistan to be worn across generations.
            </p>

            <div className="hero-cta mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#catalogs"
                onClick={(e) => goToSection(e, "catalogs")}
                className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-[11px] font-medium tracking-[0.14em] text-ivory uppercase transition-colors duration-300 hover:bg-gold hover:text-void"
              >
                Shop catalogs
              </a>
              <a
                href="#materials"
                onClick={(e) => goToSection(e, "materials")}
                className="group inline-flex h-12 items-center gap-2 text-[11px] font-medium tracking-[0.14em] text-muted uppercase transition-colors duration-300 hover:text-ink"
              >
                The materials
                <span
                  className="h-px w-5 bg-current transition-all duration-300 group-hover:w-8 group-hover:bg-gold"
                  aria-hidden
                />
              </a>
            </div>
          </div>
        </div>

        <div
          ref={mediaRef}
          className="relative order-first min-h-[46svh] flex-1 bg-ivory lg:order-none lg:min-h-0 lg:w-[56%] xl:w-[58%]"
        >
          <div
            className="pointer-events-none absolute -top-[8%] right-[8%] h-[50%] w-[50%] rounded-full bg-[radial-gradient(circle,rgba(184,149,90,0.22)_0%,transparent_70%)] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-[-4%] left-[4%] h-[42%] w-[42%] rounded-full bg-[radial-gradient(circle,rgba(184,149,90,0.14)_0%,transparent_72%)] blur-3xl"
            aria-hidden
          />

          {PIECES.map((piece) => (
            <div
              key={piece.id}
              className={`hero-piece-${piece.id} ${piece.className}`}
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse 68% 68% at 50% 48%, #000 42%, transparent 78%)",
                maskImage:
                  "radial-gradient(ellipse 68% 68% at 50% 48%, #000 42%, transparent 78%)",
              }}
            >
              <div className={`hero-float-${piece.id} relative h-full w-full`}>
                <Image
                  src={piece.src}
                  alt={piece.alt}
                  fill
                  priority={piece.id === "main"}
                  sizes="(max-width: 1024px) 70vw, 40vw"
                  className="object-contain mix-blend-multiply"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
