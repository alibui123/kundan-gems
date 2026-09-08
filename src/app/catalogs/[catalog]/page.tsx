import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CatalogHero } from "@/components/CatalogHero";
import { CatalogLookbook } from "@/components/CatalogLookbook";
import {
  CATALOGS,
  catalogMeta,
  isCatalog,
  type Catalog,
} from "@/lib/catalogs";
import {
  MATERIALS,
  getProducts,
  materialMeta,
} from "@/lib/products";

type PageProps = {
  params: Promise<{ catalog: string }>;
};

export function generateStaticParams() {
  return CATALOGS.map((catalog) => ({ catalog }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { catalog: raw } = await params;
  if (!isCatalog(raw)) return { title: "Catalog — Kundan" };
  const meta = catalogMeta[raw];
  return {
    title: `${meta.title} — Kundan`,
    description: meta.description,
  };
}

export default async function CatalogPage({ params }: PageProps) {
  const { catalog: raw } = await params;
  if (!isCatalog(raw)) notFound();
  const catalog = raw as Catalog;
  const meta = catalogMeta[catalog];
  const products = await getProducts({ catalog });
  const others = CATALOGS.filter((c) => c !== catalog);

  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="dark" />

      <CatalogHero catalog={catalog} />

      <main>
        <CatalogLookbook meta={meta} products={products} />

        <div className="container-luxury border-t border-border py-16 md:py-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] text-ink">
                Continue exploring
              </h2>
              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-muted">
                Other houses of the maison, and the materials that compose them.
              </p>
            </div>
            <nav
              aria-label="Related collections"
              className="flex flex-wrap gap-x-8 gap-y-3"
            >
              {others.map((c) => (
                <Link
                  key={c}
                  href={`/catalogs/${c}`}
                  className="text-[12px] tracking-[0.14em] text-ink/60 uppercase transition-colors hover:text-gold"
                >
                  {catalogMeta[c].title}
                </Link>
              ))}
              {MATERIALS.map((m) => (
                <Link
                  key={m}
                  href={`/materials/${m}`}
                  className="text-[12px] tracking-[0.14em] text-ink/60 uppercase transition-colors hover:text-gold"
                >
                  {materialMeta[m].title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
