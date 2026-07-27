"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type NewArrivalsHeroProps = {
  pieceCount: number;
  primaryImage: string;
  secondaryImage: string;
};

export function NewArrivalsHero({
  pieceCount,
  primaryImage,
  secondaryImage,
}: NewArrivalsHeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      gsap.set(".na-line", { yPercent: 110 });
      gsap.set(
        [
          ".na-crumb",
          ".na-eyebrow",
          ".na-copy",
          ".na-meta",
          ".na-cta",
          ".na-media",
          ".na-rule",
        ],
        { autoAlpha: 0, y: 24 }
      );
      gsap.set(".na-secondary", { autoAlpha: 0, x: -36, y: 24 });
      gsap.set(".na-glow", { scale: 0.85, autoAlpha: 0 });
      gsap.set(".na-shimmer", { xPercent: -120, autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".na-glow", { scale: 1, autoAlpha: 1, duration: 1.6 }, 0)
        .to(".na-crumb", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.12)
        .to(".na-eyebrow", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.22)
        .to(".na-line", { yPercent: 0, duration: 1.15, stagger: 0.1 }, 0.32)
        .to(".na-rule", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.55)
        .to(".na-copy", { autoAlpha: 1, y: 0, duration: 0.85 }, 0.65)
        .to(".na-media", { autoAlpha: 1, y: 0, duration: 1.15 }, 0.4)
        .to(".na-secondary", { autoAlpha: 1, x: 0, y: 0, duration: 1.05 }, 0.75)
        .to(".na-meta", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.9)
        .to(".na-cta", { autoAlpha: 1, y: 0, duration: 0.75 }, 1)
        .to(
          ".na-shimmer",
          {
            xPercent: 120,
            autoAlpha: 0.5,
            duration: 1.4,
            ease: "power2.inOut",
          },
          0.85
        );

      gsap.to(".na-glow", {
        scale: 1.08,
        duration: 4.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden bg-void text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(200,169,106,0.14),transparent_55%)]" />
      <div className="na-glow pointer-events-none absolute top-[12%] right-[6%] h-[42vw] max-h-[480px] w-[42vw] max-w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,236,200,0.14),transparent_68%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-void to-transparent" />

      <div className="container-luxury relative z-10 pt-28 pb-16 md:pt-36 md:pb-24 lg:pb-28">
        <nav className="na-crumb mb-12 text-[11px] tracking-[0.16em] text-white/45 uppercase md:mb-16">
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <span className="mx-2 text-white/25">/</span>
          <span className="text-gold">New Arrivals</span>
        </nav>

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="na-eyebrow mb-5 text-[11px] font-medium tracking-[0.28em] text-gold uppercase">
              Just arrived
            </p>

            <h1 className="font-display text-[clamp(3.5rem,9vw,7rem)] font-light leading-[0.9] tracking-[-0.03em]">
              <span className="block overflow-hidden">
                <span className="na-line inline-block">New</span>
              </span>
              <span className="mt-1 block overflow-hidden">
                <span className="na-line inline-block italic text-gold-bright">
                  Arrivals
                </span>
              </span>
            </h1>

            <div className="na-rule mt-8 h-px w-16 bg-gradient-to-r from-gold to-transparent" />

            <div className="na-copy mt-7 max-w-md">
              <p className="text-[15px] leading-[1.85] text-white/60">
                Fresh from the atelier — newly composed pieces entering the
                boutique, marked for first wear and quiet discovery.
              </p>
            </div>

            <div className="na-cta mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#new-arrivals-grid"
                className="inline-flex h-[52px] items-center bg-gold px-8 text-[12px] font-medium tracking-[0.16em] text-void uppercase transition-colors duration-300 hover:bg-gold-bright"
              >
                View the arrivals
              </a>
              <Link
                href="/collections/best-sellers"
                className="inline-flex h-[52px] items-center border border-gold/50 px-8 text-[12px] font-medium tracking-[0.16em] text-gold uppercase transition-colors duration-300 hover:border-gold hover:bg-gold/10"
              >
                Best sellers
              </Link>
            </div>

            <div className="na-meta mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-[11px] tracking-[0.18em] text-white/40 uppercase">
              <span>
                <em className="not-italic text-gold">{pieceCount}</em> new
                pieces
              </span>
              <span className="hidden h-3 w-px bg-white/15 sm:block" />
              <span>Atelier fresh</span>
              <span className="hidden h-3 w-px bg-white/15 sm:block" />
              <span>Limited first release</span>
            </div>
          </div>

          <div className="na-media relative lg:col-span-7">
            <div className="relative mx-auto aspect-[4/5] max-w-[560px] lg:ml-auto lg:mr-0 lg:max-w-none lg:aspect-[5/6]">
              <div className="absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
                <Image
                  src={primaryImage}
                  alt="New arrival from the Kundan atelier"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 55vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/55 via-transparent to-void/10" />
                <div className="na-shimmer pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-18deg]" />
              </div>

              <div className="na-secondary absolute -bottom-6 -left-4 w-[42%] overflow-hidden rounded-[20px] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.45)] md:-bottom-8 md:-left-8 md:w-[38%]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={secondaryImage}
                    alt="Detail of a new Kundan piece"
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
