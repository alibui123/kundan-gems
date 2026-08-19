import Link from "next/link";
import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { SignatureHero } from "@/components/SignatureHero";
import {
  formatPrice,
  getProducts,
  productHref,
} from "@/lib/products";
import { kundanProductImages } from "@/lib/product-assets";

export const metadata: Metadata = {
  title: "Signature Collection — Kundan",
  description:
    "Explore the Kundan signature edit — limited pieces composed with museum-like precision.",
};

export default async function SignatureCollectionPage() {
  const products = await getProducts({ isSignature: true });
  const primary =
    products[0]?.image ?? kundanProductImages.rings;
  const secondary =
    products[1]?.image ??
    products[0]?.gallery?.[1] ??
    kundanProductImages.necklaces;

  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="dark" />

      <SignatureHero
        pieceCount={products.length}
        primaryImage={primary}
        secondaryImage={secondary}
      />

      <main className="pb-8 md:pb-12">
        <div className="container-luxury pt-16 md:pt-24">
          <div className="mb-12 flex flex-col justify-between gap-6 border-b border-border pb-8 md:mb-16 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="mb-3 text-[11px] tracking-[0.24em] text-gold uppercase">
                The edit
              </p>
              <h2
                id="signature-grid"
                className="scroll-mt-28 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.05] text-ink"
              >
                Signature pieces
              </h2>
              <p className="mt-4 text-[15px] leading-[1.85] text-muted">
                Selected across rings, necklaces, and bracelets — each marked in
                the atelier as a defining work of the maison.
              </p>
            </div>
            <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
              {products.length} pieces · Maison select
            </p>
          </div>

          {products.length === 0 ? (
            <p className="py-20 text-center text-sm text-muted">
              Signature pieces will appear here shortly.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-7">
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
                  aspect="portrait"
                  size={product.sizes[1] ?? product.sizes[0]}
                />
              ))}
            </div>
          )}

          <div className="mt-20 grid gap-6 border-t border-border pt-14 md:grid-cols-3 md:gap-8">
            {[
              {
                title: "Atelier chosen",
                copy: "Only pieces that define the maison’s hand are marked signature.",
              },
              {
                title: "Numbered care",
                copy: "Each edit arrives with lifelong service and quiet documentation.",
              },
              {
                title: "Across the form",
                copy: "Rings, necklaces, and bracelets — one standard of finish.",
              },
            ].map((item) => (
              <div key={item.title}>
                <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-4">
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
            <Link
              href="/collections/bracelets"
              className="text-[11px] tracking-[0.16em] text-muted uppercase transition-colors hover:text-gold"
            >
              Bracelets →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
