"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { catalogMeta, type Catalog } from "@/lib/catalogs";
import { isLocalPublicSrc } from "@/lib/local-image";

gsap.registerPlugin(useGSAP);

type CatalogHeroProps = {
  catalog: Catalog;
  pieceCount: number;
};

/** Full-bleed catalog hero — calm, photographic, maison-grade. */
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
      gsap.set([".ch-crumb", ".ch-urdu", ".ch-copy", ".ch-cta"], {
        autoAlpha: 0,
        y: 20,
      });
      gsap.set(".ch-bg-img", { scale: 1.08 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".ch-bg-img", { scale: 1, duration: 1.8, ease: "power2.out" }, 0)
        .to(".ch-crumb", { autoAlpha: 1, y: 0, duration: 0.65 }, 0.2)
        .to(".ch-urdu", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.3)
        .to(".ch-line", { yPercent: 0, duration: 1 }, 0.35)
        .to(".ch-copy", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.55)
        .to(".ch-cta", { autoAlpha: 1, y: 0, duration: 0.65 }, 0.75);
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative isolate min-h-[88svh] overflow-hidden md:min-h-[92svh]"
      aria-label={`${meta.title} — ${meta.subtitle}`}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <Image
          src={meta.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          unoptimized={isLocalPublicSrc(meta.heroImage)}
          className="ch-bg-img object-cover will-change-transform"
          style={{ objectPosition: meta.heroObjectPosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-ink/20" />
      </div>

      <div className="container-luxury relative z-10 flex min-h-[88svh] flex-col justify-end pb-14 pt-28 md:min-h-[92svh] md:pb-20 md:pt-36">
        <nav className="ch-crumb mb-auto text-[11px] tracking-[0.16em] text-ivory/50 uppercase">
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

        <div className="mt-16 max-w-xl md:mt-20">
          <p className="ch-urdu font-display text-2xl text-gold/75 md:text-[1.75rem]">
            {meta.urduHint}
          </p>

          <h1 className="mt-3 font-display text-[clamp(3.5rem,9vw,6.5rem)] leading-[0.92] tracking-[-0.02em] text-ivory">
            <span className="inline-block overflow-hidden align-bottom">
              <span className="ch-line inline-block">{meta.title}</span>
            </span>
          </h1>

          <p className="ch-copy mt-5 max-w-md text-[15px] leading-[1.75] text-ivory/70 md:mt-6">
            {meta.tagline}
          </p>

          <div className="ch-cta mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#catalog-grid"
              className="inline-flex h-12 items-center bg-gold px-8 text-[11px] font-medium tracking-[0.18em] text-void uppercase transition-colors hover:bg-gold-bright"
            >
              View the collection
            </a>
            <span className="text-[11px] tracking-[0.18em] text-ivory/45 uppercase">
              {pieceCount > 0 ? `${pieceCount} pieces` : meta.subtitle}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
