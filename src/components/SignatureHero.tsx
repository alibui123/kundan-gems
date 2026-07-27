"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type SignatureHeroProps = {
  pieceCount: number;
  primaryImage: string;
  secondaryImage: string;
};

export function SignatureHero({
  pieceCount,
  primaryImage,
  secondaryImage,
}: SignatureHeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      gsap.set(".sig-line", { yPercent: 110 });
      gsap.set(
        [
          ".sig-crumb",
          ".sig-eyebrow",
          ".sig-copy",
          ".sig-meta",
          ".sig-cta",
          ".sig-media",
          ".sig-rule",
        ],
        { autoAlpha: 0, y: 24 }
      );
      gsap.set(".sig-secondary", { autoAlpha: 0, x: 40, y: 20 });
      gsap.set(".sig-glow", { scale: 0.8, autoAlpha: 0 });
      gsap.set(".sig-shimmer", { xPercent: -120, autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".sig-glow", { scale: 1, autoAlpha: 1, duration: 1.7 }, 0)
        .to(".sig-crumb", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.12)
        .to(".sig-eyebrow", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.22)
        .to(".sig-line", { yPercent: 0, duration: 1.15, stagger: 0.1 }, 0.32)
        .to(".sig-rule", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.55)
        .to(".sig-copy", { autoAlpha: 1, y: 0, duration: 0.85 }, 0.65)
        .to(".sig-media", { autoAlpha: 1, y: 0, duration: 1.15 }, 0.4)
        .to(".sig-secondary", { autoAlpha: 1, x: 0, y: 0, duration: 1.05 }, 0.75)
        .to(".sig-meta", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.9)
        .to(".sig-cta", { autoAlpha: 1, y: 0, duration: 0.75 }, 1)
        .to(
          ".sig-shimmer",
          {
            xPercent: 120,
            autoAlpha: 0.5,
            duration: 1.45,
            ease: "power2.inOut",
          },
          0.85
        );

      gsap.to(".sig-glow", {
        scale: 1.08,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.7,
      });

      gsap.to(".sig-primary", {
        y: -8,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.9,
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden bg-ivory text-ink"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(200,169,106,0.16),transparent_50%)]" />
      <div className="sig-glow pointer-events-none absolute top-[8%] left-[4%] h-[48vw] max-h-[560px] w-[48vw] max-w-[560px] rounded-full bg-[radial-gradient(circle,rgba(255,236,200,0.16),transparent_68%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ivory to-transparent" />

      <div className="container-luxury relative z-10 pt-28 pb-16 md:pt-36 md:pb-24 lg:pb-28">
        <nav className="sig-crumb mb-12 text-[11px] tracking-[0.16em] text-muted uppercase md:mb-16">
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-gold">Signature</span>
        </nav>

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="sig-eyebrow mb-5 text-[11px] font-medium tracking-[0.28em] text-gold uppercase">
              Maison edit
            </p>

            <h1 className="font-display text-[clamp(3.75rem,10vw,7.5rem)] font-light leading-[0.88] tracking-[-0.03em]">
              <span className="block overflow-hidden">
                <span className="sig-line inline-block">Our</span>
              </span>
              <span className="mt-1 block overflow-hidden">
                <span className="sig-line inline-block italic text-gold-bright">
                  Signature
                </span>
              </span>
            </h1>

            <div className="sig-rule mt-8 h-px w-16 bg-gradient-to-r from-gold to-transparent" />

            <div className="sig-copy mt-7 max-w-md">
              <p className="text-[15px] leading-[1.85] text-muted">
                A study in restraint and radiance — pieces composed with
                museum-like precision, where proportion, light, and touch are
                considered as carefully as the stone itself.
              </p>
            </div>

            <div className="sig-cta mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#signature-grid"
                className="inline-flex h-[52px] items-center rounded-full bg-gold px-8 text-[12px] font-medium tracking-[0.16em] text-void uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-bright hover:shadow-[0_8px_24px_rgba(200,169,106,0.35)]"
              >
                View the edit
              </a>
              <Link
                href="/collections/rings"
                className="inline-flex h-[52px] items-center rounded-full border border-gold/50 px-8 text-[12px] font-medium tracking-[0.16em] text-gold uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
              >
                Browse rings
              </Link>
            </div>

            <div className="sig-meta mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-6 text-[11px] tracking-[0.18em] text-muted uppercase">
              <span>
                <em className="not-italic text-gold">{pieceCount}</em> signature
                pieces
              </span>
              <span className="hidden h-3 w-px bg-border sm:block" />
              <span>Limited editions</span>
              <span className="hidden h-3 w-px bg-border sm:block" />
              <span>Lifetime care</span>
            </div>
          </div>

          <div className="sig-media relative lg:col-span-7">
            {/* Vertical filament — signature visual mark */}
            <div className="pointer-events-none absolute top-8 -left-2 hidden h-[70%] w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent lg:block xl:-left-4" />

            <div className="relative mx-auto aspect-[4/5] max-w-[560px] lg:ml-auto lg:mr-0 lg:max-w-none lg:aspect-[5/6]">
              <div className="sig-primary absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
                <Image
                  src={primaryImage}
                  alt="Signature piece from the Kundan maison"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 55vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" />
                <div className="sig-shimmer pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-18deg]" />
              </div>

              <div className="sig-secondary absolute -right-3 -bottom-6 w-[44%] overflow-hidden rounded-[22px] border border-border shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:-right-6 sm:-bottom-8 md:w-[40%] lg:-right-4 lg:-bottom-10 xl:-right-8">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={secondaryImage}
                    alt="Signature detail"
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
