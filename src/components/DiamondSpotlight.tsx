"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ProductImageFrame } from "@/components/ProductImageFrame";
import { kundanProductImages } from "@/lib/product-assets";
import { materialMeta, type Product } from "@/lib/products";

const DIAMOND_HREF = "/materials/diamond";
const AUTO_MS = 2200;

const FALLBACK_SLIDES: { id: string; name: string; image: string }[] = [
  { id: "d-f1", name: "Aurora Solitaire", image: kundanProductImages.rings },
  { id: "d-f2", name: "Heritage Halo", image: kundanProductImages.rings },
  { id: "d-f3", name: "River Pendant", image: kundanProductImages.necklaces },
  { id: "d-f4", name: "Lumen Line", image: kundanProductImages.bracelets },
  { id: "d-f5", name: "Celeste Band", image: kundanProductImages.rings },
];

type DiamondSpotlightProps = {
  products: Product[];
};

export function DiamondSpotlight({ products }: DiamondSpotlightProps) {
  const meta = materialMeta.diamond;
  const slides =
    products.length > 0
      ? products.slice(0, 5).map((p) => ({
          id: p.id,
          name: p.name,
          image: p.image,
        }))
      : FALLBACK_SLIDES;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const timer = window.setTimeout(next, AUTO_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, next, slides.length]);

  return (
    <section
      id="diamond"
      className="relative overflow-hidden bg-white"
      aria-label="Diamond salon"
    >
      <div className="grid min-h-[100svh] lg:grid-cols-2">
        <div
          className="reveal-item flex flex-col justify-between bg-white px-6 py-16 sm:px-10 lg:px-16 lg:py-20 xl:px-24"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div>
            <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
              The diamond salon
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.08] text-ink">
              {meta.campaign.title}
            </h2>
            <p className="mt-4 max-w-sm text-[14px] leading-[1.75] text-muted">
              {meta.campaign.tagline}
            </p>
          </div>

          <div className="mx-auto w-full max-w-[min(72vw,340px)] py-10">
            <div className="relative">
              {slides.map((item, i) => (
                <Link
                  key={item.id}
                  href={DIAMOND_HREF}
                  aria-hidden={i !== active}
                  tabIndex={i === active ? 0 : -1}
                  aria-label={`View diamond collection — ${item.name}`}
                  className={`block transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    i === active
                      ? "relative opacity-100 scale-100"
                      : "pointer-events-none absolute inset-0 opacity-0 scale-[0.98]"
                  }`}
                >
                  <ProductImageFrame
                    src={item.image}
                    alt={item.name}
                    aspect="square"
                    sizes="(max-width: 1024px) 72vw, 340px"
                    padding="thumb"
                    hoverScale
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-6">
            {slides.length > 1 ? (
              <div
                className="flex gap-2.5"
                role="tablist"
                aria-label="Diamond pieces"
              >
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Show piece ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                      i === active ? "bg-ink" : "bg-border hover:bg-muted/40"
                    }`}
                  />
                ))}
              </div>
            ) : null}
            <Link href={DIAMOND_HREF} className="btn-diamond-liquid">
              <span>Enter the salon</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2.5 7h9M7.5 3.5L11 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        <Link
          href={DIAMOND_HREF}
          className="reveal-image group relative block min-h-[420px] overflow-hidden lg:min-h-full"
          aria-label={`${meta.campaign.title} — diamond collection`}
        >
          <div
            data-parallax-drift
            className="absolute inset-[-8%] will-change-transform"
          >
            <Image
              src="/materials/diamond.jpeg"
              alt={meta.campaign.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
              className="object-cover object-[center_18%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
