"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, productHref, type Product } from "@/lib/products";

gsap.registerPlugin(useGSAP);

type MaisonEditProps = {
  newArrivals: Product[];
  bestSellers: Product[];
};

export function MaisonEdit({ newArrivals, bestSellers }: MaisonEditProps) {
  const [tab, setTab] = useState<"new" | "best">("new");
  const rootRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Record<"new" | "best", HTMLButtonElement | null>>({
    new: null,
    best: null,
  });
  const products = tab === "new" ? newArrivals : bestSellers;
  const viewAllHref =
    tab === "new" ? "/collections/new-arrivals" : "/collections/best-sellers";

  const placeIndicator = (key: "new" | "best", animate: boolean) => {
    const btn = tabRefs.current[key];
    const ind = indicatorRef.current;
    const list = btn?.parentElement;
    if (!btn || !ind || !list) return;
    const left = btn.offsetLeft;
    const width = btn.offsetWidth;
    gsap.to(ind, {
      x: left,
      width,
      duration: animate ? 0.4 : 0,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  useLayoutEffect(() => {
    placeIndicator(tab, false);
  }, []);

  useGSAP(
    () => {
      placeIndicator(tab, true);
      const grid = gridRef.current;
      if (!grid) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        gsap.set(grid, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        grid,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" }
      );
    },
    { scope: rootRef, dependencies: [tab], revertOnUpdate: false }
  );

  return (
    <section
      ref={rootRef}
      id="the-edit"
      className="relative overflow-hidden border-t border-border bg-white py-10 md:py-36 lg:py-44"
      aria-label="The edit"
    >
      <div className="container-luxury">
        <div className="reveal-item mb-6 flex flex-col gap-5 sm:mb-10 sm:gap-8 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-lg">
            <h2 className="font-display text-[clamp(1.85rem,6vw,3.85rem)] leading-[1.06] tracking-[0.01em] text-ink sm:text-[clamp(2.5rem,4.6vw,3.85rem)]">
              On the floor
            </h2>
            <p className="mt-2 max-w-md text-[13px] leading-[1.6] text-muted sm:mt-4 sm:text-[15px] sm:leading-[1.75]">
              New arrivals and enduring favourites, composed for the floor.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
                  ref={(el) => {
                    tabRefs.current[key] = el;
                  }}
                  onClick={() => setTab(key)}
                  className={`relative px-1 pb-2.5 text-[10px] font-medium tracking-[0.16em] uppercase sm:pb-3 sm:text-[11px] ${
                    tab === key ? "text-ink" : "text-muted"
                  }`}
                >
                  {key === "new" ? "New arrivals" : "Best sellers"}
                </button>
              ))}
              <span
                ref={indicatorRef}
                className="pointer-events-none absolute bottom-0 left-0 h-px bg-gold"
                style={{ width: 0 }}
                aria-hidden
              />
            </div>
            <Link
              href={viewAllHref}
              className="hidden text-[11px] font-medium tracking-[0.16em] text-ink/60 uppercase sm:inline-flex"
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
          <div
            ref={gridRef}
            className="product-grid"
          >
            {products.map((product) => (
              <ProductCard
                key={`${tab}-${product.id}`}
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
            ))}
          </div>
        )}

        <div className="mt-6 sm:mt-8 sm:hidden">
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
