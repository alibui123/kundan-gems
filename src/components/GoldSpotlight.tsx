"use client";

import Image from "next/image";
import Link from "next/link";
import { materialMeta } from "@/lib/products";
import { usePosterCursor } from "@/components/PosterCursor";

const GOLD_HREF = "/materials/gold";

/** Runway Look 01 — Gold. */
export function GoldSpotlight() {
  const meta = materialMeta.gold;
  const { bind, cue } = usePosterCursor("Gold");

  return (
    <section id="gold" aria-label="Look 01 — Gold">
      <Link
        href={GOLD_HREF}
        className="group/poster spotlight-stage relative block min-h-[100svh] w-full overflow-hidden bg-void"
        aria-label={`Look 01 — ${meta.campaign.title}`}
        {...bind}
      >
        <div className="absolute inset-0" data-parallax-media>
          <div
            className="spotlight-parallax absolute inset-0 will-change-transform md:inset-[-10%]"
            data-parallax-layer
          >
            <div className="spotlight-media absolute inset-0">
              <Image
                src="/materials/gold.jpeg"
                alt={meta.campaign.imageAlt}
                fill
                priority
                sizes="100vw"
                unoptimized
                className="poster-zoom-img object-cover object-[center_28%] sm:object-[32%_center] md:object-center"
              />
            </div>
          </div>
        </div>

        <div className="poster-glow" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(14,12,10,0.35) 0%, transparent 35%, rgba(14,12,10,0.7) 100%)",
          }}
        />

        <div className="spotlight-cta absolute inset-0 z-[2] flex flex-col items-center justify-end px-6 pb-16 text-center sm:pb-20">
          <p className="text-[10px] tracking-[0.4em] text-gold uppercase">
            Look 01 · Gold
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.75rem,8vw,6rem)] font-normal leading-[0.92] tracking-[0.04em] text-ivory uppercase">
            {meta.campaign.title}
          </h2>
          <span className="btn-solid-luxe mt-10 inline-flex h-12 items-center px-8 text-[10px] font-medium tracking-[0.26em] uppercase opacity-95 transition-opacity group-hover/poster:opacity-100">
            Shop gold
          </span>
        </div>
        {cue}
      </Link>
    </section>
  );
}
