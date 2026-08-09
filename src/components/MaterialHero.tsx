"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { isLocalPublicSrc } from "@/lib/local-image";
import { materialMeta, type Material } from "@/lib/products";

gsap.registerPlugin(useGSAP);

type MaterialHeroProps = {
  material: Material;
  pieceCount: number;
};

/**
 * Diamond uses a clean studio product hero.
 * Gold / ruby keep the classic split editorial layout.
 */
export function MaterialHero({ material, pieceCount }: MaterialHeroProps) {
  const meta = materialMeta[material];
  const rootRef = useRef<HTMLElement>(null);
  const studioHero = material === "diamond" && isLocalPublicSrc(meta.image);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      gsap.set(".mh-line", { yPercent: 110 });
      gsap.set(
        [
          ".mh-crumb",
          ".mh-eyebrow",
          ".mh-copy",
          ".mh-meta",
          ".mh-cta",
          ".mh-media",
        ],
        { autoAlpha: 0, y: 24 }
      );
      gsap.set(".mh-secondary", { autoAlpha: 0, x: 36, y: 20 });
      gsap.set(".mh-shimmer", { xPercent: -120, autoAlpha: 0 });
      gsap.set(".mh-product", { autoAlpha: 0, scale: 1.04 });
      gsap.set(".mh-campaign-title", { autoAlpha: 0, y: 18 });
      gsap.set(".mh-campaign-center", { autoAlpha: 0, y: 10 });
      gsap.set(".mh-campaign-tag", { autoAlpha: 0, y: 12 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".mh-product", { autoAlpha: 1, scale: 1, duration: 1.4 }, 0)
        .to(".mh-crumb", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.15)
        .to(".mh-campaign-title", { autoAlpha: 1, y: 0, duration: 1 }, 0.35)
        .to(".mh-campaign-center", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.55)
        .to(".mh-campaign-tag", { autoAlpha: 1, y: 0, duration: 0.85 }, 0.75)
        .to(".mh-cta", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.95)
        .to(".mh-line", { yPercent: 0, duration: 1.05, stagger: 0.08 }, 0.28)
        .to(".mh-eyebrow", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.18)
        .to(".mh-copy", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.55)
        .to(".mh-media", { autoAlpha: 1, y: 0, duration: 1 }, 0.35)
        .to(".mh-secondary", { autoAlpha: 1, x: 0, y: 0, duration: 1 }, 0.7)
        .to(".mh-meta", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.8)
        .to(
          ".mh-shimmer",
          {
            xPercent: 120,
            autoAlpha: 0.45,
            duration: 1.3,
            ease: "power2.inOut",
          },
          0.75
        );
    },
    { scope: rootRef }
  );

  if (studioHero) {
    return (
      <section
        ref={rootRef}
        className="relative isolate overflow-hidden bg-[#b7cce6]"
        aria-label="Diamond — River of Lights"
      >
        {/*
          Match the campaign frame (16:9) so object-cover doesn't crop
          the necklace or teal ledge. On small screens, use a taller crop
          focused on the jewellery.
        */}
        <div className="relative mx-auto w-full aspect-[4/5] max-h-[100svh] sm:aspect-[3/4] md:aspect-[16/9] md:max-h-none lg:aspect-[16/9]">
          <div className="mh-product absolute inset-0">
            <Image
              src={meta.image}
              alt="Diamond high jewellery necklace — fancy yellow and white diamonds"
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
                href="/#materials"
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
                  backgroundImage:
                    "linear-gradient(180deg, #e8d5a3 0%, #b8955a 45%, #8a6a35 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                River of Lights
              </h1>
            </div>

            {/* Center aperture of the necklace ~ mid of sky portion */}
            <div className="mh-campaign-center relative z-20 mx-auto mt-[14%] flex w-full max-w-[min(58vw,320px)] justify-center px-4 text-center sm:mt-[12%] md:mt-[10%] md:max-w-[360px]">
              <p className="font-display text-[clamp(0.8rem,1.7vw,1.15rem)] font-normal italic leading-[1.5] text-[#4d5a66] drop-shadow-[0_1px_8px_rgba(255,255,255,0.55)]">
                Crafted with fancy intense yellow and flawless white diamonds, in
                a composition of pure celestial elegance.
              </p>
            </div>

            <div className="mh-campaign-tag relative z-20 mt-auto mb-[18%] flex w-full flex-col items-center gap-4 px-6 text-center sm:mb-[16%] md:mb-[14%] lg:mb-[12%]">
              <p
                className="text-[clamp(0.65rem,1.4vw,0.8rem)] font-medium tracking-[0.28em] uppercase"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #e8d5a3 0%, #b8955a 50%, #8a6a35 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Elegance reimagined
              </p>

              <div className="mh-cta flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#material-grid"
                  className="inline-flex h-10 items-center bg-ink px-6 text-[10px] font-medium tracking-[0.18em] text-ivory uppercase transition-colors hover:bg-gold hover:text-void md:h-11 md:px-7"
                >
                  Shop the collection
                </a>
                <span className="text-[10px] tracking-[0.16em] text-ink/40 uppercase">
                  {pieceCount} diamond pieces
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden bg-ivory text-ink"
    >
      <div className="container-luxury relative z-10 pt-28 pb-16 md:pt-36 md:pb-24 lg:pb-28">
        <nav className="mh-crumb mb-12 text-[11px] tracking-[0.16em] text-muted uppercase md:mb-16">
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <Link href="/#materials" className="transition-colors hover:text-gold">
            Materials
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-gold">{meta.title}</span>
        </nav>

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="mh-eyebrow mb-5 text-[11px] font-medium tracking-[0.28em] text-gold uppercase">
              {meta.subtitle}
            </p>

            <h1 className="font-display text-[clamp(3.75rem,10vw,7.5rem)] font-light leading-[0.88] tracking-[-0.03em] text-ink">
              <span className="block overflow-hidden">
                <span className="mh-line inline-block">{meta.title}</span>
              </span>
            </h1>

            <div className="mh-copy mt-8 max-w-md">
              <div className="mb-6 h-px w-14 bg-gradient-to-r from-gold to-transparent" />
              <p className="text-[15px] leading-[1.85] text-muted">
                {meta.story}
              </p>
            </div>

            <div className="mh-cta mt-10 flex flex-wrap gap-4">
              <a
                href="#material-grid"
                className="inline-flex h-12 items-center bg-ink px-8 text-[11px] font-medium tracking-[0.16em] text-ivory uppercase transition-colors hover:bg-gold hover:text-void"
              >
                Shop {meta.title.toLowerCase()}
              </a>
              <Link
                href="/collections/rings"
                className="inline-flex h-12 items-center border border-border px-8 text-[11px] font-medium tracking-[0.16em] text-ink uppercase transition-colors hover:border-gold hover:text-gold"
              >
                Browse rings
              </Link>
            </div>

            <div className="mh-meta mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-6 text-[11px] tracking-[0.18em] text-muted uppercase">
              <span>
                <em className="not-italic text-gold">{pieceCount}</em> pieces
              </span>
              <span className="hidden h-3 w-px bg-border sm:block" />
              <span>Rings · Necklaces · Bracelets</span>
            </div>
          </div>

          <div className="mh-media relative lg:col-span-7">
            <div className="relative mx-auto aspect-[4/5] max-w-[560px] overflow-hidden bg-stone lg:ml-auto lg:mr-0 lg:max-w-none lg:aspect-[5/6]">
              <Image
                src={meta.image}
                alt={`${meta.title} from the Kundan atelier`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 55vw"
                unoptimized={isLocalPublicSrc(meta.image)}
                className="object-cover object-center"
              />
              <div className="mh-shimmer pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-18deg]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
