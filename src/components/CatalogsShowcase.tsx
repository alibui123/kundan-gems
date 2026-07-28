"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CATALOGS, catalogMeta, type Catalog } from "@/lib/catalogs";
import { isLocalPublicSrc } from "@/lib/local-image";

gsap.registerPlugin(useGSAP);

/**
 * Catalog stage: selecting a house fills the entire section
 * with that catalog’s main poster (not a side picture).
 */
export function CatalogsShowcase() {
  const rootRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Catalog>("mehr");
  const meta = catalogMeta[active];

  const select = useCallback((slug: Catalog) => {
    setActive(slug);
  }, []);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      gsap.fromTo(
        ".cat-stage-label",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(
        ".cat-nav-row",
        { autoAlpha: 0, x: -18 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.25,
        }
      );
    },
    { scope: rootRef }
  );

  useEffect(() => {
    const layer = bgRef.current?.querySelector("[data-cat-bg]");
    if (!layer) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    // Opacity-only crossfade — avoid scale crop that pushes subjects out of frame
    gsap.fromTo(
      layer,
      { opacity: 0 },
      { opacity: 1, duration: 0.85, ease: "power2.out" }
    );
  }, [active]);

  return (
    <section
      ref={rootRef}
      id="catalogs"
      className="relative isolate min-h-[100svh] overflow-hidden"
      aria-label="Shop by catalog"
    >
      {/* Full-section poster — swaps with active catalog */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden" aria-hidden>
        <div key={meta.slug} data-cat-bg className="absolute inset-0">
          <Image
            src={meta.image}
            alt=""
            fill
            priority
            sizes="100vw"
            unoptimized={isLocalPublicSrc(meta.image)}
            className="object-cover"
            style={{ objectPosition: meta.objectPosition }}
          />
        </div>
        {/* Readability veil — keeps type clear without hiding the poster */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/20" />
      </div>

      <div className="container-luxury relative z-10 flex min-h-[100svh] flex-col justify-center py-24 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10 lg:items-end">
          <div className="lg:col-span-6 xl:col-span-5">
            <p className="cat-stage-label label-caps mb-3 text-gold">
              The catalogs
            </p>
            <h2 className="cat-stage-label font-display text-[clamp(2.25rem,4.2vw,3.5rem)] font-light leading-[1.06] tracking-[-0.02em] text-ivory">
              Choose a house.
              <span className="mt-1 block italic text-gold-bright">
                Wear the story.
              </span>
            </h2>
            <p className="cat-stage-label mt-5 max-w-sm text-[14px] leading-[1.75] text-ivory/55">
              Three named lines — bridal, high jewellery, everyday gold. Hover to
              preview, click a name to enter.
            </p>

            <nav
              className="mt-12 border-t border-ivory/15"
              aria-label="Catalog index"
            >
              {CATALOGS.map((slug, i) => {
                const item = catalogMeta[slug];
                const isActive = active === slug;
                return (
                  <Link
                    key={slug}
                    href={`/catalogs/${slug}`}
                    onMouseEnter={() => select(slug)}
                    onFocus={() => select(slug)}
                    className={`cat-nav-row group flex w-full items-baseline gap-5 border-b border-ivory/15 py-5 text-left transition-colors duration-500 ${
                      isActive
                        ? "text-ivory"
                        : "text-ivory/40 hover:text-ivory/80"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span
                      className={`font-display text-sm tabular-nums transition-colors ${
                        isActive ? "text-gold" : "text-ivory/25"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-display text-[clamp(1.75rem,3vw,2.35rem)] font-light tracking-[-0.02em]">
                          {item.title}
                        </span>
                        <span className="font-display text-lg text-gold/70">
                          {item.urduHint}
                        </span>
                      </span>
                      <span className="mt-1 block text-[11px] tracking-[0.2em] uppercase opacity-70">
                        {item.subtitle}
                      </span>
                    </span>
                    <span
                      className={`hidden h-px shrink-0 bg-gold transition-all duration-500 sm:block ${
                        isActive ? "w-12 opacity-100" : "w-0 opacity-0"
                      }`}
                      aria-hidden
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href={`/catalogs/${meta.slug}`}
                className="inline-flex h-12 items-center rounded-full bg-gold px-7 text-[11px] font-medium tracking-[0.14em] text-void uppercase transition-colors duration-300 hover:bg-ivory hover:text-ink"
              >
                Enter {meta.title}
              </Link>
              <Link
                href="#materials"
                className="text-[11px] tracking-[0.14em] text-ivory/45 uppercase transition-colors hover:text-gold"
              >
                Or by material
              </Link>
            </div>
          </div>

          {/* Active catalog caption — floats on the open poster */}
          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <p className="text-[10px] tracking-[0.28em] text-gold uppercase">
              {meta.subtitle}
            </p>
            <p className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light italic leading-snug text-ivory">
              {meta.tagline}
            </p>
            <p className="mt-4 max-w-md text-[14px] leading-[1.8] text-ivory/65">
              {meta.description}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-ivory/15 bg-ink/35 backdrop-blur-sm">
        <div className="container-luxury flex flex-col gap-6 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[13px] leading-relaxed text-ivory/50">
            Mix your search — start with a catalog, then refine by stone or
            silhouette.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#materials"
              className="inline-flex h-11 items-center rounded-full border border-ivory/20 px-5 text-[10px] tracking-[0.18em] text-ivory/80 uppercase transition-colors hover:border-gold hover:text-gold"
            >
              Materials
            </Link>
            <Link
              href="#collections"
              className="inline-flex h-11 items-center rounded-full border border-ivory/20 px-5 text-[10px] tracking-[0.18em] text-ivory/80 uppercase transition-colors hover:border-gold hover:text-gold"
            >
              Rings · Necklaces · Bracelets
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
