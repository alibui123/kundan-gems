"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type BestSellersHeroProps = {
  pieceCount: number;
  primaryImage: string;
  secondaryImage: string;
  topName?: string;
};

export function BestSellersHero({
  pieceCount,
  primaryImage,
  secondaryImage,
  topName,
}: BestSellersHeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      gsap.set(".bs-line", { yPercent: 110 });
      gsap.set(
        [
          ".bs-crumb",
          ".bs-eyebrow",
          ".bs-copy",
          ".bs-meta",
          ".bs-cta",
          ".bs-media",
          ".bs-rank",
        ],
        { autoAlpha: 0, y: 24 }
      );
      gsap.set(".bs-secondary", { autoAlpha: 0, x: -36, y: 24 });
      gsap.set(".bs-glow", { scale: 0.85, autoAlpha: 0 });
      gsap.set(".bs-shimmer", { xPercent: -120, autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".bs-glow", { scale: 1, autoAlpha: 1, duration: 1.6 }, 0)
        .to(".bs-crumb", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.12)
        .to(".bs-eyebrow", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.22)
        .to(".bs-line", { yPercent: 0, duration: 1.15, stagger: 0.1 }, 0.32)
        .to(".bs-rank", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.5)
        .to(".bs-copy", { autoAlpha: 1, y: 0, duration: 0.85 }, 0.65)
        .to(".bs-media", { autoAlpha: 1, y: 0, duration: 1.15 }, 0.4)
        .to(".bs-secondary", { autoAlpha: 1, x: 0, y: 0, duration: 1.05 }, 0.75)
        .to(".bs-meta", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.9)
        .to(".bs-cta", { autoAlpha: 1, y: 0, duration: 0.75 }, 1)
        .to(
          ".bs-shimmer",
          {
            xPercent: 120,
            autoAlpha: 0.5,
            duration: 1.4,
            ease: "power2.inOut",
          },
          0.85
        );

      gsap.to(".bs-glow", {
        scale: 1.08,
        duration: 4.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      });

      gsap.to(".bs-primary", {
        y: -8,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden bg-ivory text-ink"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,rgba(200,169,106,0.15),transparent_52%)]" />
      <div className="bs-glow pointer-events-none absolute top-[12%] right-[8%] h-[42vw] max-h-[520px] w-[42vw] max-w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,236,200,0.16),transparent_68%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ivory to-transparent" />

      <div className="container-luxury relative z-10 pt-28 pb-16 md:pt-36 md:pb-24 lg:pb-28">
        <nav className="bs-crumb mb-12 text-[11px] tracking-[0.16em] text-muted uppercase md:mb-16">
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-gold">Best Sellers</span>
        </nav>

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="bs-eyebrow mb-5 text-[11px] font-medium tracking-[0.28em] text-gold uppercase">
              Most desired
            </p>

            <h1 className="font-display text-[clamp(3.5rem,9vw,7rem)] font-light leading-[0.88] tracking-[-0.03em]">
              <span className="block overflow-hidden">
                <span className="bs-line inline-block">Best</span>
              </span>
              <span className="mt-1 block overflow-hidden">
                <span className="bs-line inline-block italic text-gold-bright">
                  Sellers
                </span>
              </span>
            </h1>

            <p className="bs-rank mt-6 font-display text-5xl font-light italic text-gold/35 md:text-6xl">
              01
            </p>

            <div className="bs-copy mt-4 max-w-md">
              <p className="text-[15px] leading-[1.85] text-muted">
                The pieces clients return for — ranked by desire across the
                atelier. {topName ? (
                  <>
                    Leading the edit:{" "}
                    <span className="text-ink">{topName}</span>.
                  </>
                ) : null}
              </p>
            </div>

            <div className="bs-cta mt-10">
              <a
                href="#best-sellers-grid"
                className="inline-flex h-[52px] items-center rounded-full bg-gold px-8 text-[12px] font-medium tracking-[0.16em] text-void uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-bright hover:shadow-[0_8px_24px_rgba(200,169,106,0.35)]"
              >
                View the ranking
              </a>
            </div>

            <div className="bs-meta mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-6 text-[11px] tracking-[0.18em] text-muted uppercase">
              <span>
                <em className="not-italic text-gold">{pieceCount}</em> ranked
                pieces
              </span>
              <span className="hidden h-3 w-px bg-border sm:block" />
              <span>Updated by demand</span>
            </div>
          </div>

          <div className="bs-media relative lg:col-span-7">
            <div className="relative mx-auto aspect-[4/5] max-w-[560px] lg:ml-auto lg:mr-0 lg:max-w-none lg:aspect-[5/6]">
              <div className="bs-primary absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
                <Image
                  src={primaryImage}
                  alt="Best selling piece from Kundan"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 55vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/10" />
                <div className="bs-shimmer pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-18deg]" />
                <span className="absolute top-5 left-5 rounded-full bg-ink/70 px-4 py-2 text-[10px] tracking-[0.18em] text-gold uppercase backdrop-blur-sm">
                  No. 01
                </span>
              </div>

              <div className="bs-secondary absolute -bottom-6 -left-4 w-[46%] overflow-hidden rounded-[22px] border border-border shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:-bottom-8 sm:-left-8 md:w-[42%] lg:-bottom-10 lg:-left-6 xl:-left-10">
                <div className="relative aspect-square">
                  <Image
                    src={secondaryImage}
                    alt="Best seller detail"
                    fill
                    sizes="(max-width: 1024px) 40vw, 22vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
