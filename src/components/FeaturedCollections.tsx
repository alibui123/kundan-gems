"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { collections } from "@/lib/data";
import { ProductImageFrame } from "@/components/ProductImageFrame";

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Tertiary category — form / silhouette browse.
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
        <div className="reveal-item mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(2.5rem,4.6vw,3.85rem)] leading-[1.06] tracking-[0.01em] text-ink">
              Shop by silhouette
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-muted">
              Start with the shape of the piece, then refine by material inside
              each collection.
            </p>
          </div>
        </div>

        <div className="grid items-start gap-8 sm:grid-cols-3 sm:gap-5 lg:gap-8">
          {collections.map((item) => (
            <motion.div
              key={item.title}
              className="reveal-item group"
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <Link href={item.href} className="flex flex-col">
                <ProductImageFrame
                  src={item.image}
                  alt={item.title}
                  aspect="portrait"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  hoverScale
                />
                <div className="mt-5 flex items-center justify-between gap-3 pt-1">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-muted uppercase">
                      {item.subtitle}
                    </p>
                    <h3 className="mt-1.5 font-display text-[1.85rem] leading-none tracking-[0.01em] text-ink transition-colors duration-300 group-hover:text-gold">
                      {item.title}
                    </h3>
                  </div>
                  <span className="shrink-0 text-[11px] font-medium tracking-[0.18em] text-gold uppercase opacity-0 translate-x-2 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0 group-hover:opacity-100">
                    Shop
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
