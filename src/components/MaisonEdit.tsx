"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, productHref, type Product } from "@/lib/products";

type MaisonEditProps = {
  newArrivals: Product[];
  bestSellers: Product[];
};

/**
 * Unified product edit — arrivals and bestsellers under one professional roof.
 */
export function MaisonEdit({ newArrivals, bestSellers }: MaisonEditProps) {
  const [tab, setTab] = useState<"new" | "best">("new");
  const products = tab === "new" ? newArrivals : bestSellers;
  const viewAllHref =
    tab === "new" ? "/collections/new-arrivals" : "/collections/best-sellers";

  return (
    <section
      id="the-edit"
      className="section-y relative overflow-hidden border-t border-border bg-stone"
      aria-label="The edit"
    >
      <div className="container-luxury">
        <div className="reveal-item mb-10 flex flex-col gap-8 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-lg">
            <p className="label-caps mb-3">The edit</p>
            <h2 className="font-display text-[clamp(2.35rem,4.2vw,3.5rem)] leading-[1.08] tracking-[0.01em] text-ink">
              Selected pieces
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div
              className="flex items-center gap-1 border-b border-border"
              role="tablist"
              aria-label="Product edit"
            >
              <button
                type="button"
                role="tab"
                aria-selected={tab === "new"}
                onClick={() => setTab("new")}
                className={`px-1 pb-3 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors ${
                  tab === "new"
                    ? "border-b-2 border-gold text-ink"
                    : "border-b-2 border-transparent text-muted hover:text-ink"
                }`}
              >
                New arrivals
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "best"}
                onClick={() => setTab("best")}
                className={`ml-6 px-1 pb-3 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors ${
                  tab === "best"
                    ? "border-b-2 border-gold text-ink"
                    : "border-b-2 border-transparent text-muted hover:text-ink"
                }`}
              >
                Best sellers
              </button>
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
          <div className="reveal-item border border-dashed border-border bg-ivory/60 px-6 py-16 text-center">
            <p className="font-display text-2xl text-ink">Pieces will appear here</p>
            <p className="mx-auto mt-3 max-w-sm text-[14px] text-muted">
              Connect the atelier database to load arrivals and bestsellers.
            </p>
          </div>
        ) : (
          <div
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
          </div>
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
