"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { collections } from "@/lib/data";
import { ProductImageFrame } from "@/components/ProductImageFrame";
import { SPRING } from "@/lib/motion";

const [rings, necklaces, bracelets] = collections;

/**
 * Shop by form — one large lead card (rings) beside a stacked pair.
 * Deliberately not three equal columns.
 */
export function FeaturedCollections() {
  const reduce = useReducedMotion();

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
          <CollectionTile item={rings} reduce={reduce} aspect="aspect-[4/5]" large />

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-1">
            <CollectionTile
              item={necklaces}
              reduce={reduce}
              aspect="aspect-[16/12]"
            />
            <CollectionTile
              item={bracelets}
              reduce={reduce}
              aspect="aspect-[16/12]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CollectionTile({
  item,
  reduce,
  aspect,
  large = false,
}: {
  item: (typeof collections)[number];
  reduce: boolean | null;
  aspect: string;
  large?: boolean;
}) {
  return (
    <motion.div
      className="reveal-item group"
      whileHover={reduce ? undefined : { y: -10, scale: 1.012 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={SPRING.snappy}
    >
      <Link href={item.href} className="flex flex-col pressable">
        <div className={`overflow-hidden rounded-2xl ${aspect}`}>
          <ProductImageFrame
            src={item.image}
            alt={item.title}
            sizes={large ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 640px) 100vw, 27vw"}
            fillContainer
            hoverScale
            className="h-full"
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="type-eyebrow text-muted">{item.subtitle}</p>
            <h3
              className={`mt-1 font-display font-medium leading-tight tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-gold ${
                large ? "text-[1.85rem]" : "text-[1.4rem]"
              }`}
            >
              {item.title}
            </h3>
          </div>
          <span className="shrink-0 text-[13px] font-medium tracking-[-0.01em] text-gold opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Shop →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
