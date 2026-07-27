"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type RingsHeroProps = {
  pieceCount: number;
};

export function RingsHero({ pieceCount }: RingsHeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) return;

      gsap.set(".rh-line", { yPercent: 110 });
      gsap.set(
        [".rh-crumb", ".rh-eyebrow", ".rh-copy", ".rh-meta", ".rh-cta", ".rh-media"],
        { autoAlpha: 0, y: 28 }
      );
      gsap.set(".rh-media-secondary", { autoAlpha: 0, x: 40, y: 24 });
      gsap.set(".rh-glow", { scale: 0.85, autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".rh-glow", { scale: 1, autoAlpha: 1, duration: 1.6 }, 0)
        .to(".rh-crumb", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.15)
        .to(".rh-eyebrow", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.25)
        .to(".rh-line", { yPercent: 0, duration: 1.15, stagger: 0.1 }, 0.35)
        .to(".rh-copy", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.7)
        .to(".rh-media", { autoAlpha: 1, y: 0, duration: 1.2 }, 0.45)
        .to(
          ".rh-media-secondary",
          { autoAlpha: 1, x: 0, y: 0, duration: 1.1 },
          0.75
        )
        .to(".rh-meta", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.95)
        .to(".rh-cta", { autoAlpha: 1, y: 0, duration: 0.8 }, 1.05);

      gsap.to(".rh-glow", {
        scale: 1.08,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      });

      gsap.to(".rh-media-primary", {
        y: -8,
        duration: 3.6,
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
      className="relative isolate overflow-hidden bg-void text-white"
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(200,169,106,0.14),transparent_55%)]" />
      <div className="rh-glow pointer-events-none absolute top-[12%] right-[8%] h-[42vw] max-h-[520px] w-[42vw] max-w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,236,200,0.16),transparent_68%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />

      {/* Fine grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="container-luxury relative z-10 pt-28 pb-16 md:pt-36 md:pb-24 lg:pb-28">
        <nav className="rh-crumb mb-12 text-[11px] tracking-[0.16em] text-white/45 uppercase md:mb-16">
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <span className="mx-2 text-white/25">/</span>
          <span className="text-gold">Rings</span>
        </nav>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* Copy */}
          <div className="lg:col-span-5 xl:col-span-5">
            <p className="rh-eyebrow mb-5 text-[11px] font-medium tracking-[0.28em] text-gold uppercase">
              Atelier Collection
            </p>

            <h1 className="font-display text-[clamp(4.5rem,12vw,8.5rem)] font-light leading-[0.88] tracking-[-0.03em]">
              <span className="block overflow-hidden">
                <span className="rh-line inline-block">Rings</span>
              </span>
              <span className="mt-1 block overflow-hidden">
                <span className="rh-line inline-block italic text-gold-bright">
                  Eternal
                </span>
              </span>
            </h1>

            <div className="rh-copy mt-8 max-w-md">
              <div className="mb-6 h-px w-12 bg-gradient-to-r from-gold to-transparent" />
              <p className="text-[15px] leading-[1.85] text-white/60">
                Bands shaped for light, proportion, and the quiet certainty of
                forever — finished by hand in our atelier.
              </p>
            </div>

            <div className="rh-cta mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#rings-grid"
                className="inline-flex h-[52px] items-center rounded-full bg-gold px-8 text-[12px] font-medium tracking-[0.16em] text-void uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-bright hover:shadow-[0_8px_24px_rgba(200,169,106,0.35)]"
              >
                Browse the collection
              </a>
              <Link
                href="/"
                className="inline-flex h-[52px] items-center rounded-full border border-gold/50 px-8 text-[12px] font-medium tracking-[0.16em] text-gold uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
              >
                Back home
              </Link>
            </div>

            <div className="rh-meta mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-[11px] tracking-[0.18em] text-white/40 uppercase">
              <span>
                <em className="not-italic text-gold">{pieceCount}</em> pieces
              </span>
              <span className="hidden h-3 w-px bg-white/15 sm:block" />
              <span>Handcrafted</span>
              <span className="hidden h-3 w-px bg-white/15 sm:block" />
              <span>Certified diamonds</span>
            </div>
          </div>

          {/* Editorial media collage */}
          <div className="rh-media relative lg:col-span-7 xl:col-span-7">
            <div className="relative mx-auto aspect-[4/5] max-w-[560px] lg:ml-auto lg:mr-0 lg:max-w-none lg:aspect-[5/6]">
              {/* Primary — edge-aware, dominant plane */}
              <div className="rh-media-primary absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
                <Image
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1400&q=90"
                  alt="Diamond solitaire ring on dark stone"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 55vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-void/10" />
              </div>

              {/* Secondary overlapping plate — editorial collage */}
              <div className="rh-media-secondary absolute -bottom-6 -left-4 w-[46%] overflow-hidden rounded-[22px] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:-bottom-8 sm:-left-8 md:w-[42%] lg:-bottom-10 lg:-left-6 xl:-left-10">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&q=90"
                    alt="Heritage halo ring detail"
                    fill
                    sizes="(max-width: 1024px) 40vw, 22vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-void/15" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Soft transition into ivory grid */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ivory/0" />
    </section>
  );
}
