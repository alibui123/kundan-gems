"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { catalogMeta, type Catalog } from "@/lib/catalogs";

gsap.registerPlugin(useGSAP);

type CatalogHeroProps = {
  catalog: Catalog;
  pieceCount: number;
};

/** Full-bleed poster hero — uses heroImage (distinct from homepage stage). */
export function CatalogHero({ catalog, pieceCount }: CatalogHeroProps) {
  const meta = catalogMeta[catalog];
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      gsap.set(".ch-line", { yPercent: 110 });
      gsap.set(
        [".ch-crumb", ".ch-eyebrow", ".ch-urdu", ".ch-copy", ".ch-meta", ".ch-cta"],
        { autoAlpha: 0, y: 24 }
      );
      gsap.set(".ch-bg-img", { scale: 1.12 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".ch-bg-img", { scale: 1, duration: 2.2, ease: "power2.out" }, 0)
        .to(".ch-crumb", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.15)
        .to(".ch-eyebrow", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.25)
        .to(".ch-urdu", { autoAlpha: 1, y: 0, duration: 0.85 }, 0.32)
        .to(".ch-line", { yPercent: 0, duration: 1.1 }, 0.4)
        .to(".ch-copy", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.7)
        .to(".ch-meta", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.9)
        .to(".ch-cta", { autoAlpha: 1, y: 0, duration: 0.7 }, 1);
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative isolate h-[100svh] overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <Image
          src={meta.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="ch-bg-img object-cover will-change-transform"
          style={{ objectPosition: meta.heroObjectPosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/50 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/25" />
      </div>

      <div className="container-luxury relative z-10 flex h-full flex-col justify-end pb-16 pt-28 md:pb-20 md:pt-36">
        <nav className="ch-crumb mb-10 text-[11px] tracking-[0.16em] text-ivory/50 uppercase md:mb-14">
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <span className="mx-2 text-ivory/25">/</span>
          <Link href="/#catalogs" className="transition-colors hover:text-gold">
            Catalogs
          </Link>
          <span className="mx-2 text-ivory/25">/</span>
          <span className="text-gold">{meta.title}</span>
        </nav>

        <div className="max-w-xl">
          <p className="ch-eyebrow mb-4 text-[11px] font-medium tracking-[0.28em] text-gold uppercase">
            {meta.subtitle}
          </p>
          <p className="ch-urdu mb-3 font-display text-3xl font-light text-gold/80">
            {meta.urduHint}
          </p>

          <h1 className="font-display text-[clamp(3.25rem,8vw,6rem)] font-light leading-[0.95] tracking-[-0.02em] text-ivory">
            <span className="inline-block overflow-hidden align-bottom">
              <span className="ch-line inline-block">{meta.title}</span>
            </span>
          </h1>

          <p className="ch-copy mt-6 max-w-md text-[15px] leading-[1.85] text-ivory/65">
            {meta.story}
          </p>

          <div className="ch-meta mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ivory/15 pt-6 text-[11px] tracking-[0.18em] text-ivory/45 uppercase">
            <span>{pieceCount} pieces</span>
            <span className="hidden h-3 w-px bg-ivory/20 sm:block" />
            <span>Pakistan atelier</span>
          </div>

          <div className="ch-cta mt-10">
            <a
              href="#catalog-grid"
              className="inline-flex h-12 items-center rounded-full bg-gold px-7 text-[11px] tracking-[0.18em] text-void uppercase transition-all hover:-translate-y-0.5 hover:bg-gold-bright"
            >
              View the edit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
