"use client";

import Image from "next/image";
import Link from "next/link";
import { materialMeta } from "@/lib/products";
import { usePosterCursor } from "@/components/PosterCursor";

const RUBY_HREF = "/materials/ruby";

/** Runway Look 03 — Ruby. */
export function RubySpotlight() {
  const meta = materialMeta.ruby;
  const { bind, cue } = usePosterCursor("Ruby");

  return (
    <section id="ruby" className="bg-[#c05638]" aria-label="Look 03 — Ruby">
      <Link
        href={RUBY_HREF}
        className="group/poster spotlight-stage relative block min-h-[100svh] w-full overflow-hidden"
        aria-label={`Look 03 — ${meta.campaign.title}`}
        {...bind}
      >
        <div className="absolute inset-0" data-parallax-media>
          <div
            className="spotlight-parallax absolute inset-[-10%] will-change-transform"
            data-parallax-layer
          >
            <div className="spotlight-media absolute inset-0">
              <Image
                src="/materials/ruby.jpeg"
                alt={meta.campaign.imageAlt}
                fill
                sizes="100vw"
                unoptimized
                className="poster-zoom-img object-contain object-center md:object-cover md:object-[center_30%]"
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
              "linear-gradient(180deg, rgba(14,12,10,0.3) 0%, transparent 40%, rgba(14,12,10,0.72) 100%)",
          }}
        />

        <div className="spotlight-cta absolute inset-0 z-[2] flex flex-col items-center justify-end px-6 pb-16 text-center sm:pb-20">
          <p className="text-[10px] tracking-[0.4em] text-[#f0b0b8] uppercase">
            Look 03 · Ruby
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.75rem,8vw,6rem)] font-normal leading-[0.92] tracking-[0.04em] text-ivory uppercase">
            {meta.campaign.title}
          </h2>
          <span className="btn-solid-luxe mt-10 inline-flex h-12 items-center px-8 text-[10px] font-medium tracking-[0.26em] uppercase">
            Shop ruby
          </span>
        </div>
        {cue}
      </Link>
    </section>
  );
}
