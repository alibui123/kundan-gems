"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { materialMeta, type Material } from "@/lib/products";

gsap.registerPlugin(useGSAP);

type MaterialHeroProps = {
  material: Material;
  pieceCount: number;
};

export function MaterialHero({ material, pieceCount }: MaterialHeroProps) {
  const meta = materialMeta[material];
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      gsap.set(".mh-line", { yPercent: 110 });
      gsap.set(
        [".mh-crumb", ".mh-eyebrow", ".mh-copy", ".mh-meta", ".mh-cta", ".mh-media"],
        { autoAlpha: 0, y: 24 }
      );
      gsap.set(".mh-secondary", { autoAlpha: 0, x: 36, y: 20 });
      gsap.set(".mh-glow", { scale: 0.85, autoAlpha: 0 });
      gsap.set(".mh-shimmer", { xPercent: -120, autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".mh-glow", { scale: 1, autoAlpha: 1, duration: 1.6 }, 0)
        .to(".mh-crumb", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.12)
        .to(".mh-eyebrow", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.22)
        .to(".mh-line", { yPercent: 0, duration: 1.15, stagger: 0.1 }, 0.32)
        .to(".mh-copy", { autoAlpha: 1, y: 0, duration: 0.85 }, 0.65)
        .to(".mh-media", { autoAlpha: 1, y: 0, duration: 1.15 }, 0.4)
        .to(".mh-secondary", { autoAlpha: 1, x: 0, y: 0, duration: 1.05 }, 0.75)
        .to(".mh-meta", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.9)
        .to(".mh-cta", { autoAlpha: 1, y: 0, duration: 0.75 }, 1)
        .to(
          ".mh-shimmer",
          {
            xPercent: 120,
            autoAlpha: 0.5,
            duration: 1.4,
            ease: "power2.inOut",
          },
          0.85
        );

      gsap.to(".mh-glow", {
        scale: 1.08,
        duration: 4.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden bg-void text-white"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${meta.accent}`}
      />
      <div className="mh-glow pointer-events-none absolute top-[10%] right-[8%] h-[44vw] max-h-[540px] w-[44vw] max-w-[540px] rounded-full bg-[radial-gradient(circle,rgba(255,236,200,0.16),transparent_68%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-void to-transparent" />

      <div className="container-luxury relative z-10 pt-28 pb-16 md:pt-36 md:pb-24 lg:pb-28">
        <nav className="mh-crumb mb-12 text-[11px] tracking-[0.16em] text-white/45 uppercase md:mb-16">
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <span className="mx-2 text-white/25">/</span>
          <Link href="/#materials" className="transition-colors hover:text-gold">
            Materials
          </Link>
          <span className="mx-2 text-white/25">/</span>
          <span className="text-gold">{meta.title}</span>
        </nav>

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="mh-eyebrow mb-5 text-[11px] font-medium tracking-[0.28em] text-gold uppercase">
              {meta.subtitle}
            </p>

            <h1 className="font-display text-[clamp(3.75rem,10vw,7.5rem)] font-light leading-[0.88] tracking-[-0.03em]">
              <span className="block overflow-hidden">
                <span className="mh-line inline-block">{meta.title}</span>
              </span>
            </h1>

            <div className="mh-copy mt-8 max-w-md">
              <div className="mb-6 h-px w-14 bg-gradient-to-r from-gold to-transparent" />
              <p className="text-[15px] leading-[1.85] text-white/60">
                {meta.story}
              </p>
            </div>

            <div className="mh-cta mt-10 flex flex-wrap gap-4">
              <a
                href="#material-grid"
                className="inline-flex h-[52px] items-center rounded-full bg-gold px-8 text-[12px] font-medium tracking-[0.16em] text-void uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-bright hover:shadow-[0_8px_24px_rgba(200,169,106,0.35)]"
              >
                Shop {meta.title.toLowerCase()}
              </a>
              <Link
                href="/collections/rings"
                className="inline-flex h-[52px] items-center rounded-full border border-gold/50 px-8 text-[12px] font-medium tracking-[0.16em] text-gold uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
              >
                Browse rings
              </Link>
            </div>

            <div className="mh-meta mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-[11px] tracking-[0.18em] text-white/40 uppercase">
              <span>
                <em className="not-italic text-gold">{pieceCount}</em> pieces
              </span>
              <span className="hidden h-3 w-px bg-white/15 sm:block" />
              <span>Rings · Necklaces · Bracelets</span>
            </div>
          </div>

          <div className="mh-media relative lg:col-span-7">
            <div className="relative mx-auto aspect-[4/5] max-w-[560px] lg:ml-auto lg:mr-0 lg:max-w-none lg:aspect-[5/6]">
              <div className="absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
                <Image
                  src={meta.image}
                  alt={`${meta.title} from the Kundan atelier`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 55vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-void/10" />
                <div className="mh-shimmer pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-18deg]" />
              </div>

              <div className="mh-secondary absolute -right-3 -bottom-6 w-[44%] overflow-hidden rounded-[22px] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:-right-6 sm:-bottom-8 md:w-[40%] lg:-right-4 lg:-bottom-10">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={meta.secondaryImage}
                    alt={`${meta.title} detail`}
                    fill
                    sizes="(max-width: 1024px) 40vw, 22vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-void/15" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
