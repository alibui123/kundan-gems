import Link from "next/link";
import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { BestSellersHero } from "@/components/BestSellersHero";
import {
  formatPrice,
  getBestsellers,
  productHref,
} from "@/lib/products";

export const metadata: Metadata = {
  title: "Best Sellers — Kundan",
  description:
    "Discover the most desired pieces from the Kundan atelier — ranked by client demand.",
};

export default async function BestSellersPage() {
  const products = await getBestsellers();
  const primary =
    products[0]?.image ??
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1400&q=85";
  const secondary =
    products[1]?.image ??
    products[0]?.gallery?.[1] ??
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=90";

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation variant="dark" />

      <BestSellersHero
        pieceCount={products.length}
        primaryImage={primary}
        secondaryImage={secondary}
        topName={products[0]?.name}
      />

      <main className="pb-8 md:pb-12">
        <div className="container-luxury pt-16 md:pt-24">
          <div className="mb-12 flex flex-col justify-between gap-6 border-b border-border pb-8 md:mb-16 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="mb-3 text-[11px] tracking-[0.24em] text-gold uppercase">
                Ranked edit
              </p>
              <h2
                id="best-sellers-grid"
                className="scroll-mt-28 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.05] text-ink"
              >
                The ranking
              </h2>
              <p className="mt-4 text-[15px] leading-[1.85] text-muted">
                Ordered by demand across the maison. Rankings will later reflect
                live purchases — today, a curated stand-in of our most wanted
                pieces.
              </p>
            </div>
            <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
              {products.length} pieces
            </p>
          </div>

          {products.length === 0 ? (
            <p className="py-20 text-center text-sm text-muted">
              Best sellers will appear here shortly.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-7">
              {products.map((product) => (
                <div key={product.id} className="relative">
                  <span className="pointer-events-none absolute top-3 left-3 z-20 rounded-full bg-void/80 px-3 py-1.5 text-[10px] tracking-[0.16em] text-gold uppercase backdrop-blur-sm">
                    No. {String(product.rank).padStart(2, "0")}
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
              href="/collections/rings"
              className="text-[11px] tracking-[0.16em] text-muted uppercase transition-colors hover:text-gold"
            >
              Rings →
            </Link>
            <Link
              href="/collections/necklaces"
              className="text-[11px] tracking-[0.16em] text-muted uppercase transition-colors hover:text-gold"
            >
              Necklaces →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
