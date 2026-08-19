import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { RingsHero } from "@/components/RingsHero";
import { RingsFeatured } from "@/components/RingsFeatured";
import { RingsGuide } from "@/components/RingsGuide";
import {
  CollectionPagination,
  KeepGridInView,
} from "@/components/CollectionPagination";
import { NextCollectionNav } from "@/components/NextCollectionNav";
import {
  MATERIAL_FILTERS,
  formatPrice,
  getProducts,
  getProductsPage,
  parseMaterialFilter,
  productHref,
  toRingProduct,
} from "@/lib/products";

export const metadata: Metadata = {
  title: "Rings Collection — Kundan",
  description:
    "Explore eternal bands and signature rings from the Kundan atelier.",
};

type PageProps = {
  searchParams: Promise<{ page?: string; material?: string }>;
};

export default async function RingsCollectionPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const material = parseMaterialFilter(params.material);
  const activeFilter = material ?? "all";

  const requested = Number(params.page ?? "1");
  const { items, page, totalPages, total } = await getProductsPage(
    "rings",
    Number.isFinite(requested) ? requested : 1,
    8,
    material
  );

  const allRings = await getProducts({ category: "rings" });
  const featuredRaw =
    allRings.find((r) => r.is_signature) ??
    allRings.find((r) => r.badge === "Signature") ??
    allRings[0];
  const featured = featuredRaw ? toRingProduct(featuredRaw) : null;

  const paginationQuery = material ? { material } : undefined;

  const heading =
    activeFilter === "all"
      ? "All rings"
      : `${activeFilter.charAt(0).toUpperCase()}${activeFilter.slice(1)} rings`;

  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="dark" />
      <RingsHero pieceCount={allRings.length} />

      {featured && <RingsFeatured product={featured} />}

      <main className="pb-8 md:pb-12">
        <div className="container-luxury pt-16 md:pt-24">
          <Suspense fallback={null}>
            <KeepGridInView anchorId="rings-grid" />
          </Suspense>

          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-[11px] tracking-[0.24em] text-gold uppercase">
                The edit
              </p>
              <h2
                id="rings-grid"
                className="scroll-mt-28 font-display text-3xl font-light text-ink md:text-4xl"
              >
                {heading}
              </h2>
            </div>
            <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
              {total} pieces · Page {page} of {totalPages}
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {MATERIAL_FILTERS.map((filter) => {
              const active = filter.value === activeFilter;
              const href =
                filter.value === "all"
                  ? "/collections/rings#rings-grid"
                  : `/collections/rings?material=${filter.value}#rings-grid`;

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

          {items.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted">
              No rings in this material yet.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-7">
              {items.map((product) => (
                <ProductCard
                  key={product.id}
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

          <CollectionPagination
            basePath="/collections/rings"
            page={page}
            totalPages={totalPages}
            query={paginationQuery}
            anchorId="rings-grid"
          />
        </div>

        <RingsGuide />
      </main>

      <NextCollectionNav currentSlug="rings" />
      <Footer />
    </div>
  );
}
