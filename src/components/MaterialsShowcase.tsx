"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MATERIALS, materialMeta } from "@/lib/products";
import { isLocalPublicSrc } from "@/lib/local-image";

gsap.registerPlugin(useGSAP);

/**
 * Secondary category — materials as refined specimen rows.
 * Image + title hover motion via GSAP.
 */
export function MaterialsShowcase() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const fine = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;
      if (reduce || !fine) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-material-card]")
      );

      const cleanups = cards.map((card) => {
        const img = card.querySelector<HTMLElement>("[data-material-img]");
        const title = card.querySelector<HTMLElement>("[data-material-title]");
        if (img) gsap.set(img, { scale: 1 });

        const enter = () => {
          if (img) {
            gsap.to(img, {
              scale: 1.03,
              duration: 0.85,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          if (title) {
            gsap.to(title, {
              color: "var(--color-gold)",
              duration: 0.35,
              overwrite: "auto",
            });
          }
        };
        const leave = () => {
          if (img) {
            gsap.to(img, {
              scale: 1,
              duration: 0.7,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          if (title) {
            gsap.to(title, {
              color: "var(--color-ink)",
              duration: 0.35,
              overwrite: "auto",
            });
          }
        };

        card.addEventListener("pointerenter", enter);
        card.addEventListener("pointerleave", leave);
        return () => {
          card.removeEventListener("pointerenter", enter);
          card.removeEventListener("pointerleave", leave);
        };
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="materials"
      className="relative overflow-hidden border-b border-border bg-white section-y"
      aria-label="Shop by material"
    >
      <div className="container-luxury">
        <div className="reveal-item mb-12 max-w-xl md:mb-16">
          <p className="label-caps mb-3">Materials</p>
          <h2 className="font-display text-[clamp(2.35rem,4.2vw,3.5rem)] leading-[1.08] tracking-[0.01em] text-ink">
            Shop by stone &amp; metal
          </h2>
          <p className="mt-4 text-[15px] leading-[1.75] text-muted">
            Prefer diamond fire, warm gold, or living ruby? Enter a full material
            edit of the atelier.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {MATERIALS.map((slug) => {
            const item = materialMeta[slug];
            return (
              <Link
                key={slug}
                href={`/materials/${slug}`}
                data-material-card
                className="reveal-item"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-white">
                  <div
                    data-material-img
                    className="absolute inset-0 will-change-transform"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized={isLocalPublicSrc(item.image)}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="mt-5 border-t border-border pt-5">
                  <p className="text-[10px] tracking-[0.2em] text-gold uppercase">
                    {item.subtitle}
                  </p>
                  <h3
                    data-material-title
                    className="mt-2 font-display text-[2rem] leading-none tracking-[0.01em] text-ink"
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
