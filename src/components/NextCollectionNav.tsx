"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getAdjacentCollections } from "@/lib/collections";

gsap.registerPlugin(useGSAP);

export function NextCollectionNav({ currentSlug }: { currentSlug: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const { prev, next } = getAdjacentCollections(currentSlug);

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
        root.querySelectorAll("[data-next-card]")
      );

      const cleanups = cards.map((card) => {
        const img = card.querySelector<HTMLElement>("[data-next-img]");
        const cta = card.querySelector<HTMLElement>("[data-next-cta]");
        if (img) gsap.set(img, { scale: 1 });
        if (cta) gsap.set(cta, { y: 0 });

        const enter = () => {
          if (img) {
            gsap.to(img, {
              scale: 1.05,
              duration: 0.9,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          if (cta) {
            gsap.to(cta, {
              y: -2,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };
        const leave = () => {
          if (img) {
            gsap.to(img, {
              scale: 1,
              duration: 0.75,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          if (cta) {
            gsap.to(cta, {
              y: 0,
              duration: 0.35,
              ease: "power2.out",
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
    <section ref={rootRef} className="border-t border-border bg-white text-ink">
      <div className="container-luxury py-20 md:py-28">
        <p className="mb-3 text-center text-[11px] tracking-[0.24em] text-gold uppercase">
          Continue the journey
        </p>
        <h2 className="mb-12 text-center font-display text-[clamp(2rem,4vw,3.25rem)] font-light text-ink md:mb-16">
          Next collections
        </h2>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {prev && (
            <Link
              href={prev.href}
              data-next-card
              className="relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[24px] p-8 md:min-h-[340px] md:p-10"
            >
              <div
                data-next-img
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={prev.image}
                  alt={prev.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/35 to-void/10" />
              <div className="relative z-10">
                <p className="text-[11px] tracking-[0.2em] text-white/55 uppercase">
                  Previous · {prev.subtitle}
                </p>
                <h3 className="mt-2 font-display text-3xl md:text-4xl">
                  ← {prev.title}
                </h3>
              </div>
            </Link>
          )}

          {next && (
            <Link
              href={next.href}
              data-next-card
              className={`relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[24px] p-8 md:min-h-[340px] md:p-10 ${
                !prev ? "md:col-span-2" : ""
              }`}
            >
              <div
                data-next-img
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={next.image}
                  alt={next.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/35 to-void/10" />
              <div className="relative z-10">
                <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
                  Next page · {next.subtitle}
                </p>
                <h3 className="mt-2 font-display text-3xl md:text-4xl">
                  {next.title} →
                </h3>
                <p className="mt-3 max-w-sm text-sm text-white/60">
                  {next.description}
                </p>
                <span
                  data-next-cta
                  className="mt-6 inline-flex h-11 items-center rounded-full bg-gold px-6 text-[11px] font-medium tracking-[0.16em] text-void uppercase"
                >
                  Enter collection
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
