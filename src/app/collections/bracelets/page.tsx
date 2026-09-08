import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { FormCollectionHero } from "@/components/FormCollectionHero";
import { NextCollectionNav } from "@/components/NextCollectionNav";
import { KeepGridInView } from "@/components/CollectionPagination";
import { collectionJourney } from "@/lib/collections";
import { braceletPreviews } from "@/lib/bracelets";
import {
  MATERIAL_FILTERS,
  formatPrice,
  getProducts,
  parseMaterialFilter,
  productHref,
} from "@/lib/products";

const collection = collectionJourney.find((c) => c.slug === "bracelets")!;

export const metadata: Metadata = {
  title: "Bracelets Collection — Kundan",
  description: collection.description,
};

type PageProps = {
  searchParams: Promise<{ material?: string }>;
};

export default async function BraceletsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const material = parseMaterialFilter(params.material);
  const activeFilter = material ?? "all";

  const bracelets = await getProducts({ category: "bracelets", material });

  const heading =
    activeFilter === "all"
      ? "Shop bracelets"
      : `${activeFilter.charAt(0).toUpperCase()}${activeFilter.slice(1)} bracelets`;

  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="dark" />

      <FormCollectionHero
        title="Bracelets"
        accent="Brilliance"
        description={collection.description}
      />

      <main className="pb-8">
        <div id="shop" className="container-luxury scroll-mt-28 py-16 md:py-24">
          <Suspense fallback={null}>
            <KeepGridInView anchorId="shop" />
          </Suspense>

          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-[11px] tracking-[0.24em] text-gold uppercase">
                Available now
              </p>
              <h2 className="font-display text-3xl font-light text-ink md:text-4xl">
                {heading}
              </h2>
            </div>
            <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
              {bracelets.length} pieces · Ready to ship
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {MATERIAL_FILTERS.map((filter) => {
              const active = filter.value === activeFilter;
              const href =
                filter.value === "all"
                  ? "/collections/bracelets#shop"
                  : `/collections/bracelets?material=${filter.value}#shop`;

              return (
                <Link
                  key={filter.value}
                  href={href}
                  scroll={false}
                  className={`rounded-full border px-4 py-2 text-[11px] tracking-[0.14em] uppercase transition-colors ${
                    active
                      ? "border-gold bg-gold/10 text-ink"
                      : "border-border text-muted hover:border-gold/50 hover:text-ink"
                  }`}
                >
                  {filter.label}
                </Link>
              );
            })}
          </div>

          {bracelets.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted">
              No bracelets in this material yet.
            </p>
          ) : (
            <div className="product-grid">
              {bracelets.map((piece) => (
                <ProductCard
                  key={piece.id}
                  id={piece.id}
                  slug={piece.slug}
                  href={productHref(piece)}
                  name={piece.name}
                  price={formatPrice(piece.price)}
                  priceValue={piece.price}
                  image={piece.image}
                  aspect="square"
                  size={piece.sizes[1] ?? piece.sizes[0]}
                />
              ))}
            </div>
          )}
        </div>

        <div id="preview" className="border-t border-border bg-white">
          <div className="container-luxury scroll-mt-28 py-16 md:py-24">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="mb-2 text-[11px] tracking-[0.24em] text-gold uppercase">
                  First look
                </p>
                <h2 className="font-display text-3xl text-ink md:text-4xl">
                  Coming to the atelier
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                  A quiet preview of pieces still being set and finished —
                  available soon by private list.
                </p>
              </div>
              <p className="hidden text-[11px] tracking-[0.16em] text-muted uppercase sm:block">
                Not yet for sale
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {braceletPreviews.map((piece) => (
                <article
                  key={piece.name}
                  className="overflow-hidden rounded-[20px] bg-white shadow-[0_8px_30px_rgba(37,37,37,0.06)]"
                >
                  <div className="relative aspect-square bg-white">
                    <Image
                      src={piece.image}
                      alt={piece.name}
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-void/10" />
                    <span className="absolute top-4 left-4 rounded-full bg-void/75 px-3 py-1.5 text-[10px] tracking-[0.16em] text-gold uppercase backdrop-blur-sm">
                      Soon
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl text-ink">{piece.name}</h3>
                    <p className="mt-1 text-[11px] tracking-[0.14em] text-muted uppercase">
                      {piece.eta}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 rounded-[24px] border border-border bg-white px-8 py-12 text-center md:px-12">
              <p className="text-[11px] tracking-[0.24em] text-gold uppercase">
                Be first
              </p>
              <h3 className="mt-3 font-display text-3xl text-ink">
                Join the private list for bracelets
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted">
                Receive a quiet note when atelier pieces arrive — never noise.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex h-[52px] items-center rounded-full bg-gold px-8 text-[12px] tracking-[0.16em] text-void uppercase"
              >
                Join the list
              </Link>
            </div>
          </div>
        </div>
      </main>

      <NextCollectionNav currentSlug="bracelets" />
      <Footer />
    </div>
  );
}
