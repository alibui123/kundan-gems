"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type BraceletsHeroProps = {
  pieceCount: number;
  image: string;
  description: string;
};

export function BraceletsHero({
  pieceCount,
  image,
  description,
}: BraceletsHeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) return;

      gsap.set(".bh-line", { yPercent: 110 });
      gsap.set(
        [
          ".bh-crumb",
          ".bh-eyebrow",
          ".bh-copy",
          ".bh-meta",
          ".bh-cta",
          ".bh-media",
        ],
        { autoAlpha: 0, y: 28 }
      );
      gsap.set(".bh-media-secondary", { autoAlpha: 0, x: -36, y: 28 });
      gsap.set(".bh-glow", { scale: 0.85, autoAlpha: 0 });
      gsap.set(".bh-shimmer", { xPercent: -120, autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".bh-glow", { scale: 1, autoAlpha: 1, duration: 1.6 }, 0)
        .to(".bh-crumb", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.15)
        .to(".bh-eyebrow", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.25)
        .to(".bh-line", { yPercent: 0, duration: 1.15, stagger: 0.12 }, 0.35)
        .to(".bh-copy", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.7)
        .to(".bh-media", { autoAlpha: 1, y: 0, duration: 1.2 }, 0.45)
        .to(
          ".bh-media-secondary",
          { autoAlpha: 1, x: 0, y: 0, duration: 1.1 },
          0.8
        )
        .to(".bh-meta", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.95)
        .to(".bh-cta", { autoAlpha: 1, y: 0, duration: 0.8 }, 1.05)
        .to(
          ".bh-shimmer",
          { xPercent: 120, autoAlpha: 0.55, duration: 1.4, ease: "power2.inOut" },
          0.9
        );

      gsap.to(".bh-glow", {
        scale: 1.1,
        duration: 4.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      });

      gsap.to(".bh-media-primary", {
        y: -10,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      });

      gsap.to(".bh-media-secondary", {
        y: 6,
        duration: 4.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.1,
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden bg-ivory text-ink"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_65%_35%,rgba(200,169,106,0.15),transparent_55%)]" />
      <div className="bh-glow pointer-events-none absolute top-[10%] right-[6%] h-[44vw] max-h-[540px] w-[44vw] max-w-[540px] rounded-full bg-[radial-gradient(circle,rgba(255,236,200,0.18),transparent_68%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory to-transparent" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="container-luxury relative z-10 pt-28 pb-16 md:pt-36 md:pb-24 lg:pb-28">
        <nav className="bh-crumb mb-12 text-[11px] tracking-[0.16em] text-muted uppercase md:mb-16">
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-gold">Bracelets</span>
        </nav>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <div className="lg:col-span-5">
            <p className="bh-eyebrow mb-5 text-[11px] font-medium tracking-[0.28em] text-gold uppercase">
              Atelier Collection
            </p>

            <h1 className="font-display text-[clamp(3.75rem,10vw,7.5rem)] font-light leading-[0.88] tracking-[-0.03em]">
              <span className="block overflow-hidden">
                <span className="bh-line inline-block">Bracelets</span>
              </span>
              <span className="mt-1 block overflow-hidden">
                <span className="bh-line inline-block italic text-gold-bright">
                  Soft
                </span>
              </span>
              <span className="mt-1 block overflow-hidden">
                <span className="bh-line inline-block italic text-gold-bright/90">
                  Brilliance
                </span>
              </span>
            </h1>

            <div className="bh-copy mt-8 max-w-md">
              <div className="mb-6 h-px w-12 bg-gradient-to-r from-gold to-transparent" />
              <p className="text-[15px] leading-[1.85] text-muted">
                {description} Shop the current edit — and glimpse what is still
                arriving at the atelier.
              </p>
            </div>

            <div className="bh-cta mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#shop"
                className="inline-flex h-[52px] items-center rounded-full bg-gold px-8 text-[12px] font-medium tracking-[0.16em] text-void uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-bright hover:shadow-[0_8px_24px_rgba(200,169,106,0.35)]"
              >
                Shop now
              </a>
              <a
                href="#preview"
                className="inline-flex h-[52px] items-center rounded-full border border-gold/50 px-8 text-[12px] font-medium tracking-[0.16em] text-gold uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
              >
                Coming soon
              </a>
            </div>

            <div className="bh-meta mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-6 text-[11px] tracking-[0.18em] text-muted uppercase">
              <span>
                <em className="not-italic text-gold">{pieceCount}</em> pieces
              </span>
              <span className="hidden h-3 w-px bg-border sm:block" />
              <span>Cuffs &amp; tennis</span>
              <span className="hidden h-3 w-px bg-border sm:block" />
              <span>Ready to ship</span>
            </div>
          </div>

          <div className="bh-media relative lg:col-span-7">
            <div className="relative mx-auto aspect-[4/5] max-w-[560px] lg:ml-auto lg:mr-0 lg:max-w-none lg:aspect-[5/6]">
              <div className="bh-media-primary absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
                <Image
                  src={image}
                  alt="Bracelet from the Kundan collection"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 55vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/10" />
                {/* Light sweep */}
                <div className="bh-shimmer pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-18deg]" />
              </div>

              <div className="bh-media-secondary absolute -right-3 -bottom-6 w-[44%] overflow-hidden rounded-[22px] border border-border shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:-right-6 sm:-bottom-8 md:w-[40%] lg:-right-4 lg:-bottom-10 xl:-right-8">
                <div className="relative aspect-square">
                  <Image
                    src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=90"
                    alt="Tennis bracelet detail"
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
