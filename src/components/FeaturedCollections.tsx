"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { collections } from "@/lib/data";
import { ProductImageFrame } from "@/components/ProductImageFrame";

gsap.registerPlugin(useGSAP);

const [rings, necklaces, bracelets] = collections;

/**
 * Shop by form — one large lead card (rings) beside a stacked pair.
 * Tile lift + title cue driven by GSAP (not CSS/Motion).
 */
export function FeaturedCollections() {
  return (
    <section
      id="collections"
      className="section-y relative overflow-hidden bg-white"
      aria-label="Shop by form"
    >
      <div className="container-luxury">
        <div className="reveal-item mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display type-headline font-medium text-ink">
              Shop by silhouette
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-[1.55] tracking-[-0.01em] text-muted">
              Start with the shape of the piece, then refine by material inside
              each collection.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1.3fr_1fr]">
          <CollectionTile item={rings} aspect="aspect-[4/5]" large />

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-1">
            <CollectionTile item={necklaces} aspect="aspect-[16/12]" />
            <CollectionTile item={bracelets} aspect="aspect-[16/12]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CollectionTile({
  item,
  aspect,
  large = false,
}: {
  item: (typeof collections)[number];
  aspect: string;
  large?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const fine = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;
      if (reduce || !fine) return;

      const title = root.querySelector<HTMLElement>("[data-tile-title]");
      const cue = root.querySelector<HTMLElement>("[data-tile-cue]");

      gsap.set(root, { y: 0, scale: 1 });
      if (cue) gsap.set(cue, { autoAlpha: 0 });

      const enter = () => {
        gsap.to(root, {
          y: -10,
          scale: 1.012,
          duration: 0.55,
          ease: "power3.out",
          overwrite: "auto",
        });
        if (title) {
          gsap.to(title, {
            color: "var(--color-gold)",
            duration: 0.35,
            overwrite: "auto",
          });
        }
        if (cue) {
          gsap.to(cue, {
            autoAlpha: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const leave = () => {
        gsap.to(root, {
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
        if (title) {
          gsap.to(title, {
            color: "var(--color-ink)",
            duration: 0.35,
            overwrite: "auto",
          });
        }
        if (cue) {
          gsap.to(cue, {
            autoAlpha: 0,
            duration: 0.3,
            overwrite: "auto",
          });
        }
      };

      root.addEventListener("pointerenter", enter);
      root.addEventListener("pointerleave", leave);
      return () => {
        root.removeEventListener("pointerenter", enter);
        root.removeEventListener("pointerleave", leave);
      };
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="reveal-item will-change-transform">
      <Link href={item.href} className="flex flex-col pressable">
        <div className={`overflow-hidden rounded-2xl ${aspect}`}>
          <ProductImageFrame
            src={item.image}
            alt={item.title}
            sizes={
              large
                ? "(max-width: 1024px) 100vw, 55vw"
                : "(max-width: 640px) 100vw, 27vw"
            }
            fillContainer
            hoverScale
            className="h-full"
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="type-eyebrow text-muted">{item.subtitle}</p>
            <h3
              data-tile-title
              className={`mt-1 font-display font-medium leading-tight tracking-[-0.02em] text-ink ${
                large ? "text-[1.85rem]" : "text-[1.4rem]"
              }`}
            >
              {item.title}
            </h3>
          </div>
          <span
            data-tile-cue
            className="shrink-0 text-[13px] font-medium tracking-[-0.01em] text-gold opacity-0"
          >
            Shop →
          </span>
        </div>
      </Link>
    </div>
  );
}
