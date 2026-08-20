"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductImageFrame } from "@/components/ProductImageFrame";
import { usePosterCursor } from "@/components/PosterCursor";
import { kundanProductImages } from "@/lib/product-assets";
import { materialMeta, type Product } from "@/lib/products";

const DIAMOND_HREF = "/materials/diamond";

type DiamondSpotlightProps = {
  products: Product[];
};

/** Runway Look 02 — Diamond. */
export function DiamondSpotlight({ products }: DiamondSpotlightProps) {
  const meta = materialMeta.diamond;
  const { bind, cue } = usePosterCursor("Diamond");
  const thumbs =
    products.length > 0
      ? products.slice(0, 3)
      : [
          {
            id: "d1",
            name: "Aurora Solitaire",
            image: kundanProductImages.rings,
          },
          {
            id: "d2",
            name: "Heritage Halo",
            image: kundanProductImages.rings,
          },
          {
            id: "d3",
            name: "River Pendant",
            image: kundanProductImages.necklaces,
          },
        ];

  return (
    <section id="diamond" className="bg-white" aria-label="Look 02 — Diamond">
      <Link
        href={DIAMOND_HREF}
        className="group/poster reveal-image relative block min-h-[100svh] w-full overflow-hidden bg-void"
        aria-label={`Look 02 — ${meta.campaign.title}`}
        {...bind}
      >
        <div className="absolute inset-0" data-parallax-media>
          <div
            className="absolute inset-0 will-change-transform md:inset-[-10%]"
            data-parallax-layer
            data-parallax-drift
          >
            <Image
              src="/materials/diamond.jpeg"
              alt={meta.campaign.imageAlt}
              fill
              sizes="100vw"
              unoptimized
              className="poster-zoom-img object-cover object-[center_36%] sm:object-[center_28%] md:object-[center_22%]"
            />
          </div>
        </div>
        <div className="poster-glow" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(14,12,10,0.35) 0%, transparent 40%, rgba(14,12,10,0.7) 100%)",
          }}
        />
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-end px-6 pb-16 text-center sm:pb-20">
          <p className="text-[10px] tracking-[0.4em] text-gold uppercase">
            Look 02 · Diamond
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.75rem,8vw,6rem)] font-normal leading-[0.92] tracking-[0.04em] text-ivory uppercase">
            {meta.campaign.title}
          </h2>
          <span className="btn-solid-luxe mt-10 inline-flex h-12 items-center px-8 text-[10px] font-medium tracking-[0.26em] uppercase">
            Shop diamond
          </span>
        </div>
        {cue}
      </Link>

      <div className="border-b border-border bg-white">
        <div className="container-maison grid gap-10 px-6 py-16 sm:px-10 md:grid-cols-12 md:items-center md:gap-8 md:py-20">
          <p className="reveal-item text-center text-[14px] leading-[1.85] text-muted md:col-span-5 md:text-left">
            {meta.campaign.tagline}
          </p>
          <div className="reveal-item grid grid-cols-3 gap-4 md:col-span-6 md:col-start-7 lg:gap-6">
            {thumbs.map((item) => (
              <Link
                key={item.id}
                href={DIAMOND_HREF}
                className="group block"
                aria-label={`View diamond — ${item.name}`}
              >
                <ProductImageFrame
                  src={item.image}
                  alt={item.name}
                  aspect="square"
                  sizes="140px"
                  padding="thumb"
                  hoverScale
                />
                <p className="mt-3 truncate text-center text-[9px] tracking-[0.16em] text-muted uppercase transition-colors duration-500 group-hover:text-ink">
                  {item.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
