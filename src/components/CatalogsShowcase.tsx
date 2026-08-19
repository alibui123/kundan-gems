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
 * Catalog house stage — full-bleed background swaps with each house name.
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
        ".cat-head > *",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
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

    gsap.fromTo(
      layer,
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }
    );
  }, [active]);

  return (
    <section
      ref={rootRef}
      id="catalogs"
      className="relative isolate min-h-[85svh] overflow-hidden bg-void text-ivory md:min-h-[90svh]"
      aria-label="Shop by catalog"
    >
      {/* Full-section background — fills entire stage */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          data-catalog-stage
          className="absolute inset-0 will-change-transform"
        >
          <div key={meta.slug} data-cat-bg className="absolute inset-0">
            <Image
              src={meta.image}
              alt=""
              fill
              priority={meta.slug === "mehr"}
              sizes="100vw"
              unoptimized={isLocalPublicSrc(meta.image)}
              className="object-cover"
              style={{ objectPosition: meta.objectPosition }}
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-void/88 via-void/55 to-void/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-void/75 via-transparent to-void/35" />
      </div>

      <div className="container-luxury relative z-10 flex min-h-[85svh] flex-col justify-center py-16 md:min-h-[90svh] md:py-20 lg:py-24">
        <header className="cat-head mb-10 max-w-xl md:mb-14">
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.05] tracking-[0.01em] text-ivory">
            Three houses
          </h2>
            <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-ivory/55">
              Mehr for the dulhan. Noor for the night. Rozana for every day.
              Hover a house — the salon light changes.
            </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6 xl:col-span-5">
            <nav
              aria-label="Catalog houses"
              className="border-t border-ivory/15"
            >
              {CATALOGS.map((slug, i) => {
                const item = catalogMeta[slug];
                const isActive = active === slug;
                return (
                  <Link
                    key={slug}
                    href={`/catalogs/${slug}`}
                    className="group flex w-full items-start gap-5 border-b border-ivory/15 py-5 text-left transition-colors md:gap-7 md:py-6"
                    onMouseEnter={() => select(slug)}
                    onFocus={() => select(slug)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span
                      className={`mt-2 font-body text-[10px] tracking-[0.22em] tabular-nums transition-colors ${
                        isActive ? "text-gold" : "text-ivory/25"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span
                          className={`font-display text-[clamp(2.35rem,4.5vw,3.5rem)] leading-[0.92] tracking-[0.02em] transition-colors duration-400 ${
                            isActive
                              ? "text-ivory"
                              : "text-ivory/30 group-hover:text-ivory/60"
                          }`}
                        >
                          {item.title}
                        </span>
                        <span
                          className={`font-display text-xl transition-colors duration-400 md:text-2xl ${
                            isActive ? "text-gold" : "text-ivory/20"
                          }`}
                        >
                          {item.urduHint}
                        </span>
                      </span>

                      <span
                        className={`mt-2 block overflow-hidden transition-all duration-500 ${
                          isActive
                            ? "max-h-28 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <span className="block text-[10px] tracking-[0.22em] text-gold uppercase">
                          {item.subtitle}
                        </span>
                        <span className="mt-2 block max-w-sm text-[14px] leading-relaxed text-ivory/60">
                          {item.tagline}
                        </span>
                      </span>
                    </span>

                    <span
                      className={`mt-4 hidden h-px shrink-0 bg-gold transition-all duration-500 sm:block ${
                        isActive ? "w-12 opacity-100" : "w-0 opacity-0"
                      }`}
                      aria-hidden
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <p className="text-[10px] tracking-[0.28em] text-gold uppercase">
              Now viewing · {meta.subtitle}
            </p>
            <p className="mt-3 max-w-md font-display text-[clamp(1.5rem,2.5vw,2.15rem)] italic leading-snug text-ivory">
              {meta.tagline}
            </p>
            <p className="mt-4 max-w-md text-[14px] leading-[1.75] text-ivory/60">
              {meta.description}
            </p>
            <Link
              href={`/catalogs/${meta.slug}`}
              className="mt-6 inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.16em] text-ivory/80 uppercase transition-colors hover:text-gold"
            >
              Open the house
              <span className="h-px w-8 bg-current" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
