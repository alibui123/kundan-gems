"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, productHref, type Product } from "@/lib/products";

const EASE = [0.23, 1, 0.32, 1] as const;

type MaisonEditProps = {
  newArrivals: Product[];
  bestSellers: Product[];
};

export function MaisonEdit({ newArrivals, bestSellers }: MaisonEditProps) {
  const [tab, setTab] = useState<"new" | "best">("new");
  const reduce = useReducedMotion();
  const products = tab === "new" ? newArrivals : bestSellers;
  const viewAllHref =
    tab === "new" ? "/collections/new-arrivals" : "/collections/best-sellers";

  return (
    <section
      id="the-edit"
      className="section-y relative overflow-hidden border-t border-border bg-white"
      aria-label="The edit"
    >
      <div className="container-luxury">
        <div className="reveal-item mb-10 flex flex-col gap-8 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-lg">
            <h2 className="font-display text-[clamp(2.5rem,4.6vw,3.85rem)] leading-[1.06] tracking-[0.01em] text-ink">
              On the floor
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-muted">
              New arrivals and enduring favourites, composed for the floor.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div
              className="relative flex items-center gap-1"
              role="tablist"
              aria-label="Product edit"
            >
              {(["new", "best"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`relative px-1 pb-3 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors ${
                    tab === key ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {key === "new" ? "New arrivals" : "Best sellers"}
                  {tab === key ? (
                    <motion.span
                      layoutId="edit-tab"
                      className="absolute inset-x-0 -bottom-px h-px bg-gold"
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  ) : null}
                </button>
              ))}
            </div>
            <Link
              href={viewAllHref}
              className="hidden text-[11px] font-medium tracking-[0.16em] text-ink/60 uppercase transition-colors hover:text-gold sm:inline-flex"
            >
              View all
            </Link>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="reveal-item border border-dashed border-border bg-white px-6 py-16 text-center">
            <p className="font-display text-2xl text-ink">
              Pieces will appear here
            </p>
            <p className="mx-auto mt-3 max-w-sm text-[14px] text-muted">
              Connect the atelier database to load arrivals and bestsellers.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
              data-lenis-prevent
              className="-mx-5 flex gap-5 overflow-x-auto overscroll-x-contain px-5 pb-2 snap-x snap-mandatory scrollbar-none md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4"
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  href={productHref(product)}
                  name={product.name}
                  price={formatPrice(product.price)}
                  priceValue={product.price}
                  image={product.image}
                  aspect={tab === "new" ? "portrait" : "square"}
                  size={product.sizes[1] ?? product.sizes[0]}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        <div className="mt-8 sm:hidden">
          <Link
            href={viewAllHref}
            className="inline-flex text-[11px] font-medium tracking-[0.16em] text-ink/60 uppercase"
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}
