"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { isLocalPublicSrc } from "@/lib/local-image";
import { materialMeta, type Material } from "@/lib/products";

gsap.registerPlugin(useGSAP);

type MaterialHeroProps = {
  material: Material;
};

/** Wide campaign hero — title only, centered on both axes. */
export function MaterialHero({ material }: MaterialHeroProps) {
  const meta = materialMeta[material];
  const rootRef = useRef<HTMLElement>(null);
  const heroSrc = meta.heroWide || meta.image;
  const campaignHero = isLocalPublicSrc(heroSrc);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      gsap.set(".mh-product", { autoAlpha: 0, scale: 1.04 });
      gsap.set(".mh-campaign-title", { autoAlpha: 0, y: 16 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".mh-product", { autoAlpha: 1, scale: 1, duration: 1.25 }, 0)
        .to(".mh-campaign-title", { autoAlpha: 1, y: 0, duration: 0.85 }, 0.28);
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
      className="material-hero relative isolate overflow-hidden bg-[#b7cce6]"
      aria-label={`${meta.title} — ${campaign.title}`}
    >
      <div className="relative mx-auto aspect-[16/10] w-full min-h-[360px] max-h-[560px] sm:aspect-[16/9] sm:min-h-[400px] md:max-h-[520px] lg:max-h-[560px]">
        <div className="mh-product absolute inset-0">
          <Image
            src={heroSrc}
            alt={campaign.imageAlt}
            fill
            priority
            sizes="100vw"
            unoptimized
            className="object-cover object-[center_58%] sm:object-[center_55%] md:object-center"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/25 via-void/15 to-void/35"
          aria-hidden
        />

        <div className="absolute inset-0 z-10 flex items-center justify-center px-5 sm:px-8">
          <h1 className="mh-campaign-title max-w-3xl text-center font-display text-[clamp(1.75rem,5vw,3.5rem)] leading-[0.95] tracking-[0.08em] text-white uppercase drop-shadow-[0_2px_18px_rgba(0,0,0,0.4)]">
            {campaign.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
