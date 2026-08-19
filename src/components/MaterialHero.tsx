"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { isLocalPublicSrc } from "@/lib/local-image";
import { materialMeta, type Material } from "@/lib/products";

gsap.registerPlugin(useGSAP);

const GOLD_GRADIENT =
  "linear-gradient(180deg, #e8d5a3 0%, #b8955a 45%, #8a6a35 100%)";

type MaterialHeroProps = {
  material: Material;
  pieceCount: number;
};

export function MaterialHero({ material, pieceCount }: MaterialHeroProps) {
  const meta = materialMeta[material];
  const rootRef = useRef<HTMLElement>(null);
  const campaignHero = isLocalPublicSrc(meta.image);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      gsap.set(".mh-product", { autoAlpha: 0, scale: 1.04 });
      gsap.set(".mh-crumb", { autoAlpha: 0, y: 24 });
      gsap.set(".mh-campaign-title", { autoAlpha: 0, y: 18 });
      gsap.set(".mh-campaign-center", { autoAlpha: 0, y: 10 });
      gsap.set(".mh-campaign-tag", { autoAlpha: 0, y: 12 });
      gsap.set(".mh-cta", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".mh-product", { autoAlpha: 1, scale: 1, duration: 1.4 }, 0)
        .to(".mh-crumb", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.15)
        .to(".mh-campaign-title", { autoAlpha: 1, y: 0, duration: 1 }, 0.35)
        .to(".mh-campaign-center", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.55)
        .to(".mh-campaign-tag", { autoAlpha: 1, y: 0, duration: 0.85 }, 0.75)
        .to(".mh-cta", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.95);
    },
    { scope: rootRef }
  );

  if (!campaignHero) {
    return null;
  }

  const { campaign } = meta;

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden bg-[#b7cce6]"
      aria-label={`${meta.title} — ${campaign.title}`}
    >
      <div className="relative mx-auto w-full aspect-[4/5] max-h-[100svh] sm:aspect-[3/4] md:aspect-[16/9] md:max-h-none lg:aspect-[16/9]">
        <div className="mh-product absolute inset-0">
          <Image
            src={meta.image}
            alt={campaign.imageAlt}
            fill
            priority
            sizes="100vw"
            unoptimized
            className="object-cover object-[center_28%] sm:object-[center_32%] md:object-center"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent"
          aria-hidden
        />

        <div className="absolute inset-0 z-10 flex flex-col">
          <nav className="mh-crumb px-5 pt-[max(5.5rem,12%)] text-center text-[10px] tracking-[0.2em] text-ink/45 uppercase sm:px-8">
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span className="mx-2 text-ink/25">/</span>
            <Link
              href="/#gold"
              className="transition-colors hover:text-gold"
            >
              Materials
            </Link>
            <span className="mx-2 text-ink/25">/</span>
            <span className="text-gold">{meta.title}</span>
          </nav>

          <div className="mh-campaign-title relative z-20 mx-auto mt-[2%] max-w-[min(92vw,920px)] px-4 text-center">
            <h1
              className="font-display text-[clamp(1.85rem,6.5vw,5rem)] leading-[0.95] tracking-[0.08em] uppercase"
              style={{
                backgroundImage: GOLD_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {campaign.title}
            </h1>
          </div>

          <div className="mh-campaign-center relative z-20 mx-auto mt-[14%] flex w-full max-w-[min(58vw,320px)] justify-center px-4 text-center sm:mt-[12%] md:mt-[10%] md:max-w-[360px]">
            <p className="font-display text-[clamp(0.8rem,1.7vw,1.15rem)] font-normal italic leading-[1.5] text-[#4d5a66] drop-shadow-[0_1px_8px_rgba(255,255,255,0.55)]">
              {campaign.tagline}
            </p>
          </div>

          <div className="mh-campaign-tag relative z-20 mt-auto mb-[18%] flex w-full flex-col items-center gap-4 px-6 text-center sm:mb-[16%] md:mb-[14%] lg:mb-[12%]">
            <p
              className="text-[clamp(0.65rem,1.4vw,0.8rem)] font-medium tracking-[0.28em] uppercase"
              style={{
                backgroundImage: GOLD_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {campaign.tag}
            </p>

            <div className="mh-cta flex flex-wrap items-center justify-center gap-4">
              <a
                href="#material-grid"
                className="inline-flex h-10 items-center bg-ink px-6 text-[10px] font-medium tracking-[0.18em] text-ivory uppercase transition-colors hover:bg-gold hover:text-void md:h-11 md:px-7"
              >
                Shop the collection
              </a>
              <span className="text-[10px] tracking-[0.16em] text-ink/40 uppercase">
                {pieceCount} {meta.title.toLowerCase()} pieces
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
