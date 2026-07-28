"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CatalogMeta, CatalogScene } from "@/lib/catalogs";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, productHref } from "@/lib/products";
import { isLocalPublicSrc } from "@/lib/local-image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type CatalogLookbookProps = {
  meta: CatalogMeta;
  products: Product[];
};

function SceneRow({
  scene,
  reverse,
}: {
  scene: CatalogScene;
  reverse?: boolean;
}) {
  return (
    <div className="lb-scene grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div
        className={`lb-scene-media lg:col-span-7 ${
          reverse ? "lg:order-2" : ""
        }`}
      >
        <div className="lb-frame group relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] lg:aspect-[5/4] lg:rounded-[1.75rem]">
            <Image
              src={scene.image}
              alt={scene.title}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              unoptimized={isLocalPublicSrc(scene.image)}
              className="lb-parallax-img object-cover will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              style={{ objectPosition: scene.objectPosition ?? "50% 25%" }}
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/25"
              aria-hidden
            />
          </div>
        </div>
      </div>
      <div
        className={`lb-scene-copy max-w-md lg:col-span-5 ${
          reverse ? "lg:order-1 lg:justify-self-end lg:text-right" : ""
        }`}
      >
        <p className="mb-3 text-[11px] tracking-[0.24em] text-gold uppercase">
          {scene.caption}
        </p>
        <h3 className="font-display text-[clamp(1.85rem,3vw,2.75rem)] font-light leading-[1.1] text-ink">
          {scene.title}
        </h3>
        <p
          className={`mt-5 text-[15px] leading-[1.85] text-muted ${
            reverse ? "lg:ml-auto" : ""
          }`}
        >
          {scene.body}
        </p>
        <span
          className={`mt-8 inline-block h-px w-12 bg-gold ${
            reverse ? "lg:ml-auto" : ""
          }`}
          aria-hidden
        />
      </div>
    </div>
  );
}

/** Editorial lookbook with scroll-driven motion. */
export function CatalogLookbook({ meta, products }: CatalogLookbookProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [first, second, third] = meta.scenes;
  const mid = Math.ceil(products.length / 2);
  const firstHalf = products.slice(0, mid);
  const secondHalf = products.slice(mid);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      const root = rootRef.current;
      if (!root) return;

      // Intro
      gsap.from(".lb-intro > *", {
        y: 36,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".lb-intro",
          start: "top 85%",
          once: true,
        },
      });

      // Opening trio — rise + soft scale
      gsap.utils.toArray<HTMLElement>(".lb-mosaic-cell").forEach((cell, i) => {
        gsap.fromTo(
          cell,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.95,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: ".lb-mosaic",
              start: "top 85%",
              once: true,
            },
          }
        );
        const img = cell.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 1.25,
              ease: "power2.out",
              delay: i * 0.1,
              scrollTrigger: {
                trigger: ".lb-mosaic",
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });

      // Scene rows — alternate slide + fade
      gsap.utils.toArray<HTMLElement>(".lb-scene").forEach((scene, i) => {
        const media = scene.querySelector(".lb-scene-media");
        const copy = scene.querySelector(".lb-scene-copy");
        const fromX = i % 2 === 0 ? -48 : 48;

        if (media) {
          gsap.fromTo(
            media,
            { x: fromX, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: scene,
                start: "top 80%",
                once: true,
              },
            }
          );
        }
        if (copy) {
          gsap.fromTo(
            copy,
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
              delay: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: scene,
                start: "top 80%",
                once: true,
              },
            }
          );
        }

        const pImg = scene.querySelector(".lb-parallax-img");
        if (pImg) {
          gsap.fromTo(
            pImg,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: scene,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });

      // Product cards stagger
      gsap.utils.toArray<HTMLElement>(".lb-products").forEach((grid) => {
        const cards = grid.querySelectorAll(".lb-card");
        gsap.set(cards, { y: 48, autoAlpha: 0 });
        ScrollTrigger.batch(cards, {
          start: "top 92%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              y: 0,
              autoAlpha: 1,
              duration: 0.85,
              stagger: 0.08,
              ease: "power2.out",
              overwrite: true,
            });
          },
        });
      });

      // Full-bleed band — ken burns + copy
      const band = root.querySelector(".lb-band");
      if (band) {
        const bandImg = band.querySelector("img");
        const bandCopy = band.querySelector(".lb-band-copy");
        if (bandImg) {
          gsap.fromTo(
            bandImg,
            { scale: 1.15 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: band,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
        if (bandCopy) {
          gsap.fromTo(
            bandCopy,
            { x: -40, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: band,
                start: "top 75%",
                once: true,
              },
            }
          );
        }
      }

      // Safety: force visible if ST never fires
      const safety = window.setTimeout(() => {
        root.querySelectorAll(".lb-card, .lb-scene-copy, .lb-scene-media").forEach((el) => {
          if (getComputedStyle(el).opacity === "0") {
            gsap.set(el, { autoAlpha: 1, clearProps: "transform" });
          }
        });
      }, 2800);

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => window.clearTimeout(safety);
    },
    { scope: rootRef, dependencies: [meta.slug] }
  );

  return (
    <div ref={rootRef} className="bg-ivory">
      <div className="container-luxury border-b border-border py-16 md:py-20">
        <div className="lb-intro mx-auto max-w-2xl text-center">
          <p className="mb-3 text-[11px] tracking-[0.28em] text-gold uppercase">
            {meta.urduHint} · lookbook
          </p>
          <h2
            id="catalog-grid"
            className="scroll-mt-28 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.05] text-ink"
          >
            Inside {meta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-[1.85] text-muted">
            {meta.description}
          </p>
        </div>
      </div>

      <div className="lb-mosaic container-luxury py-12 md:py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:items-end sm:gap-5 md:gap-7">
          {(meta.gallery.length >= 3
            ? meta.gallery.slice(0, 3)
            : [
                meta.gallery[0] ?? meta.secondaryImage,
                meta.gallery[1] ?? meta.image,
                meta.gallery[2] ?? meta.secondaryImage,
              ]
          ).map((src, i) => (
            <div
              key={`${src}-${i}`}
              className={`lb-mosaic-cell lb-frame group ${
                i === 1 ? "sm:-translate-y-6 md:-translate-y-10" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-[1.35rem] md:rounded-[1.6rem] ${
                  i === 1 ? "aspect-[3/4.2]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  unoptimized={isLocalPublicSrc(src)}
                  className="object-cover object-[50%_18%] will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20"
                  aria-hidden
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {first && (
        <div className="container-luxury py-16 md:py-24">
          <SceneRow scene={first} />
        </div>
      )}

      {firstHalf.length > 0 && (
        <div className="container-luxury pb-8 md:pb-12">
          <div className="lb-intro mb-10 flex items-end justify-between gap-6 border-b border-border pb-6">
            <div>
              <p className="mb-2 text-[11px] tracking-[0.24em] text-gold uppercase">
                The pieces
              </p>
              <h3 className="font-display text-3xl font-light text-ink md:text-4xl">
                Selected for {meta.title}
              </h3>
            </div>
            <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
              {products.length} pieces
            </p>
          </div>
          <div className="lb-products grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {firstHalf.map((product) => (
              <div key={product.id} className="lb-card">
                <ProductCard
                  id={product.id}
                  slug={product.slug}
                  href={productHref(product)}
                  name={product.name}
                  price={formatPrice(product.price)}
                  priceValue={product.price}
                  image={product.image}
                  aspect="square"
                  size={product.sizes[1] ?? product.sizes[0]}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {second && (
        <div className="container-luxury py-16 md:py-24">
          <SceneRow scene={second} reverse />
        </div>
      )}

      <div className="lb-band relative my-4 aspect-[21/9] min-h-[220px] w-full overflow-hidden md:my-8 md:min-h-[320px]">
        <Image
          src={meta.image}
          alt=""
          fill
          sizes="100vw"
          unoptimized={isLocalPublicSrc(meta.image)}
          className="object-cover will-change-transform"
          style={{ objectPosition: meta.objectPosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/20 to-transparent" />
        <div className="lb-band-copy absolute inset-y-0 left-0 flex max-w-md flex-col justify-end p-8 md:p-14">
          <p className="text-[11px] tracking-[0.24em] text-gold uppercase">
            {meta.subtitle}
          </p>
          <p className="mt-3 font-display text-3xl font-light italic text-ivory md:text-4xl">
            {meta.tagline}
          </p>
        </div>
      </div>

      {secondHalf.length > 0 && (
        <div className="container-luxury py-16 md:py-20">
          <div className="mb-10">
            <p className="mb-2 text-[11px] tracking-[0.24em] text-gold uppercase">
              Continue the edit
            </p>
            <h3 className="font-display text-3xl font-light text-ink md:text-4xl">
              More from {meta.title}
            </h3>
          </div>
          <div className="lb-products grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {secondHalf.map((product) => (
              <div key={product.id} className="lb-card">
                <ProductCard
                  id={product.id}
                  slug={product.slug}
                  href={productHref(product)}
                  name={product.name}
                  price={formatPrice(product.price)}
                  priceValue={product.price}
                  image={product.image}
                  aspect="square"
                  size={product.sizes[1] ?? product.sizes[0]}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {products.length === 0 && (
        <p className="container-luxury py-16 text-center text-sm text-muted">
          Pieces in {meta.title} are arriving soon.
        </p>
      )}

      {third && (
        <div className="container-luxury py-16 md:pb-28 md:pt-24 pb-20">
          <SceneRow scene={third} />
        </div>
      )}
    </div>
  );
}
