"use client";

import Image from "next/image";
import Link from "next/link";
import { materialMeta } from "@/lib/products";

const RUBY_HREF = "/materials/ruby";

/** Ruby salon — full-bleed campaign, poster is the action. */
export function RubySpotlight() {
  const meta = materialMeta.ruby;

  return (
    <section
      id="ruby"
      className="relative overflow-hidden bg-[#c05638]"
      aria-label="Ruby salon — River of Fire"
    >
      <Link
        href={RUBY_HREF}
        className="spotlight-stage relative block w-full aspect-[4/5] max-h-[100svh] overflow-hidden sm:aspect-[3/4] md:aspect-[16/9] md:max-h-none lg:min-h-[100svh] lg:aspect-auto"
        aria-label={`${meta.campaign.title} — ruby collection`}
      >
        <div className="absolute inset-0">
          <div className="spotlight-media absolute inset-0">
            <Image
              src="/materials/ruby.jpeg"
              alt={meta.campaign.imageAlt}
              fill
              sizes="100vw"
              unoptimized
              className="object-contain object-center"
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

        <div className="spotlight-cta pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-16">
          <div className="max-w-md text-ivory">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#f0b0b8]">
              The ruby salon
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.08]">
              {meta.campaign.title}
            </h2>
          </div>
        </div>
      </Link>
    </section>
  );
}
