"use client";

import Image from "next/image";
import { useCallback, useRef, type MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { brand } from "@/lib/data";
import { BrandLogo } from "@/components/BrandLogo";

gsap.registerPlugin(useGSAP);

const NAV_OFFSET = 88;

/** White-studio product shots — multiply + soft mask dissolve into ivory. */
const PIECES = [
  {
    id: "main",
    src: "https://images.unsplash.com/photo-1680068099049-0263ffbcefd8?auto=format&fit=crop&w=1600&q=90",
    alt: "Gold and diamond necklace",
    className:
      "hero-piece absolute left-[6%] top-[8%] h-[78%] w-[78%] sm:left-[8%] sm:top-[6%] sm:h-[82%] sm:w-[82%]",
  },
  {
    id: "ring",
    src: "https://images.unsplash.com/photo-1718312267215-58bbba315a15?auto=format&fit=crop&w=1000&q=90",
    alt: "Pearl and gold strands",
    className:
      "hero-piece absolute -right-[2%] top-[4%] h-[38%] w-[42%] sm:right-[0%] sm:top-[8%] sm:h-[36%] sm:w-[40%]",
  },
  {
    id: "side",
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=90",
    alt: "Gold bracelet stack",
    className:
      "hero-piece absolute bottom-[4%] left-[2%] h-[32%] w-[42%] sm:bottom-[8%] sm:left-[4%] sm:h-[30%] sm:w-[38%]",
  },
] as const;

/**
 * Homepage landing — continuous ivory stage.
 * Floating jewellery pieces blend into the hero (no framed media box).
 */
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
          stop?: () => void;
          start?: () => void;
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
        // Allow another jump after settle
        window.setTimeout(() => {
          scrollingRef.current = false;
        }, 120);
      };

      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(y, {
          duration: 1.2,
          onComplete: finish,
        });
        // Safety if onComplete never fires
        window.setTimeout(() => {
          if (scrollingRef.current) finish();
        }, 1600);
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

      gsap.set(".hero-brand", { autoAlpha: 0, y: 28 });
      gsap.set(".hero-rule", { scaleX: 0 });
      gsap.set(
        [".hero-eyebrow", ".hero-line", ".hero-support", ".hero-cta"],
        { autoAlpha: 0, y: 18 }
      );
      gsap.set(".hero-piece", { autoAlpha: 0, scale: 0.94 });
      gsap.set(".hero-mote", { autoAlpha: 0 });

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
            ".hero-mote",
          ],
          { clearProps: "all" }
        );
        return;
      }

      const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });

      entrance
        .to(".hero-eyebrow", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.15)
        .to(".hero-brand", { autoAlpha: 1, y: 0, duration: 1.15 }, 0.3)
        .to(
          ".hero-rule",
          { scaleX: 1, duration: 0.95, ease: "power2.inOut" },
          0.65
        )
        .to(".hero-line", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.85)
        .to(".hero-support", { autoAlpha: 1, y: 0, duration: 0.85 }, 1)
        .to(".hero-cta", { autoAlpha: 1, y: 0, duration: 0.8 }, 1.15)
        .to(
          ".hero-piece-main",
          { autoAlpha: 1, scale: 1, duration: 1.35, ease: "power2.out" },
          0.35
        )
        .to(
          ".hero-piece-ring",
          { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power2.out" },
          0.65
        )
        .to(
          ".hero-piece-side",
          { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power2.out" },
          0.85
        )
        .to(".hero-mote", { autoAlpha: 1, duration: 1, stagger: 0.04 }, 1);

      // Ambient float on INNER nodes only — never fights pointer parallax
      gsap.to(".hero-float-main", {
        y: -14,
        rotation: 0.6,
        duration: 5.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-float-ring", {
        y: 12,
        rotation: -3,
        duration: 4.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-float-side", {
        y: -10,
        rotation: 2.5,
        duration: 6.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".hero-glow-a", {
        x: 40,
        y: -30,
        scale: 1.15,
        duration: 7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-glow-b", {
        x: -32,
        y: 28,
        scale: 1.1,
        duration: 8.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".hero-spark", {
        scale: 1.35,
        autoAlpha: 0.9,
        duration: 1.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.35, from: "random" },
      });

      gsap.utils.toArray<HTMLElement>(".hero-mote").forEach((mote, i) => {
        gsap.to(mote, {
          y: gsap.utils.random(-36, -64),
          x: gsap.utils.random(-22, 22),
          duration: gsap.utils.random(3.4, 5.8),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.18,
        });
      });

      const media = mediaRef.current;
      if (!media) return;

      // Parallax on OUTER pieces via quickTo — no overwrite wars
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
        qxMain(nx * 18);
        qyMain(ny * 10);
        qxRing(nx * -22);
        qyRing(ny * 14);
        qxSide(nx * 14);
        qySide(ny * -10);
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
        <div className="relative z-10 flex w-full shrink-0 flex-col justify-center px-5 py-8 md:px-12 lg:w-[42%] lg:shrink lg:px-16 lg:py-16 xl:w-[40%] xl:pl-20 xl:pr-12">
          <div className="max-w-md">
            <p className="hero-eyebrow text-[10px] font-medium tracking-[0.38em] text-gold uppercase">
              Maison de Joaillerie
            </p>

            <div className="hero-brand mt-4 lg:mt-5">
              <BrandLogo size="hero" priority className="mb-3 sm:mb-4" />
              <p className="font-display text-[clamp(2.5rem,6vw,5.25rem)] font-light leading-[0.95] tracking-[0.22em] text-ink uppercase">
                {brand.name}
              </p>
            </div>

            <div className="hero-rule mt-5 h-px w-14 origin-left bg-gold lg:mt-6" />

            <h1 className="hero-line mt-5 font-display text-[clamp(1.35rem,2.4vw,2rem)] font-light italic leading-snug tracking-[-0.01em] text-ink/90 lg:mt-7">
              Crafted for forever
            </h1>

            <p className="hero-support mt-3 max-w-sm text-[14px] leading-relaxed text-muted lg:mt-4">
              A Pakistan atelier — bridal catalogs, high jewellery, and everyday
              gold, crafted to be worn for generations.
            </p>

            <div className="hero-cta mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-10">
              <a
                href="#catalogs"
                onClick={(e) => goToSection(e, "catalogs")}
                className="hero-cta-primary group relative inline-flex h-[52px] shrink-0 items-center gap-5 overflow-hidden rounded-full border border-gold bg-gold px-8 text-[11px] font-medium tracking-[0.22em] text-void uppercase transition-[color,background-color,border-color] duration-500 hover:bg-transparent hover:text-gold"
              >
                <span className="relative z-10">Shop catalogs</span>
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
                className="hero-cta-secondary group inline-flex h-[52px] shrink-0 items-center gap-3 whitespace-nowrap text-[11px] font-medium tracking-[0.22em] text-muted uppercase transition-colors duration-300 hover:text-gold"
              >
                <span className="relative">
                  The materials
                  <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                </span>
                {/* Fixed-width affordance — transform only, never grow layout (avoids wrap flicker) */}
                <span
                  className="flex w-10 shrink-0 items-center gap-2 text-gold/70 transition-colors duration-300 group-hover:text-gold"
                  aria-hidden
                >
                  <span className="h-px w-6 origin-left bg-current transition-transform duration-500 group-hover:scale-x-[1.35]" />
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="transition-transform duration-500 group-hover:translate-x-0.5"
                  >
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
          </div>
        </div>

        <div
          ref={mediaRef}
          className="relative order-first min-h-[48svh] flex-1 bg-ivory lg:order-none lg:min-h-0 lg:w-[58%] xl:w-[60%]"
        >
          <div
            className="hero-glow-a pointer-events-none absolute -top-[10%] right-[6%] h-[58%] w-[58%] rounded-full bg-[radial-gradient(circle,rgba(200,169,106,0.32)_0%,transparent_70%)] blur-3xl"
            aria-hidden
          />
          <div
            className="hero-glow-b pointer-events-none absolute bottom-[-6%] left-[2%] h-[50%] w-[50%] rounded-full bg-[radial-gradient(circle,rgba(200,169,106,0.2)_0%,transparent_72%)] blur-3xl"
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

          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="hero-mote absolute h-1 w-1 rounded-full bg-gold"
                style={{
                  left: `${10 + ((i * 6.5) % 78)}%`,
                  top: `${16 + ((i * 9) % 68)}%`,
                  opacity: 0.35,
                  boxShadow: "0 0 8px rgba(200,169,106,0.55)",
                }}
              />
            ))}
            {[
              { left: "62%", top: "28%" },
              { left: "28%", top: "58%" },
              { left: "74%", top: "62%" },
              { left: "48%", top: "18%" },
            ].map((pos, i) => (
              <span
                key={`spark-${i}`}
                className="hero-spark absolute h-1.5 w-1.5 rounded-full bg-gold-bright"
                style={{
                  left: pos.left,
                  top: pos.top,
                  opacity: 0.45,
                  boxShadow: "0 0 12px rgba(212,188,132,0.8)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
