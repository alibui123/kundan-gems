import Link from "next/link";
import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { FormCollectionHero } from "@/components/FormCollectionHero";
import {
  formatPrice,
  getNewArrivals,
  productHref,
} from "@/lib/products";

export const metadata: Metadata = {
  title: "New Arrivals — Kundan",
  description:
    "Discover the latest pieces from the Kundan atelier — freshly composed for the boutique.",
};

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();

  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="dark" />

      <FormCollectionHero
        title="New Arrivals"
        accent="Fresh"
        description="The latest pieces from the atelier — freshly composed for the boutique floor."
      />

      <main className="pb-8 md:pb-12">
        <div className="container-luxury pt-16 md:pt-24">
          <div className="mb-12 flex flex-col justify-between gap-6 border-b border-border pb-8 md:mb-16 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="mb-3 text-[11px] tracking-[0.24em] text-gold uppercase">
                Just arrived
              </p>
              <h2
                id="new-arrivals-grid"
                className="scroll-mt-28 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.05] text-ink"
              >
                The arrivals
              </h2>
              <p className="mt-4 text-[15px] leading-[1.85] text-muted">
                Pieces flagged as new in the atelier — ordered for first
                discovery across rings, necklaces, and bracelets.
              </p>
            </div>
            <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
              {products.length} pieces · Fresh edit
            </p>
          </div>

          {products.length === 0 ? (
            <p className="py-20 text-center text-sm text-muted">
              New arrivals will appear here shortly.
            </p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <div key={product.id} className="relative">
                  <span className="pointer-events-none absolute top-3 left-3 z-20 bg-void/80 px-3 py-1.5 text-[10px] tracking-[0.16em] text-gold uppercase backdrop-blur-sm">
                    New
                  </span>
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
          )}

          <div className="mt-20 flex flex-wrap gap-4 border-t border-border pt-12">
            <Link
              href="/collections/signature"
              className="text-[11px] tracking-[0.16em] text-muted uppercase transition-colors hover:text-gold"
            >
              Signature →
            </Link>
            <Link
              href="/collections/best-sellers"
              className="text-[11px] tracking-[0.16em] text-muted uppercase transition-colors hover:text-gold"
            >
              Best sellers →
            </Link>
            <Link
              href="/collections/rings"
              className="text-[11px] tracking-[0.16em] text-muted uppercase transition-colors hover:text-gold"
            >
              Rings →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
