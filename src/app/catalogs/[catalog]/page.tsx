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
    <div className="min-h-screen bg-ivory">
      <Navigation variant="dark" />

      <CatalogHero catalog={catalog} pieceCount={products.length} />

      <main>
        <CatalogLookbook meta={meta} products={products} />

        <div className="container-luxury border-t border-border pb-16 pt-14 md:pb-24">
          <p className="mb-6 text-[11px] tracking-[0.24em] text-gold uppercase">
            Continue exploring
          </p>
          <div className="flex flex-wrap gap-4">
            {others.map((c) => (
              <Link
                key={c}
                href={`/catalogs/${c}`}
                className="inline-flex h-12 items-center rounded-full border border-border px-6 text-[11px] tracking-[0.16em] text-ink uppercase transition-colors hover:border-gold hover:text-gold"
              >
                {catalogMeta[c].title}
              </Link>
            ))}
            {MATERIALS.map((m) => (
              <Link
                key={m}
                href={`/materials/${m}`}
                className="inline-flex h-12 items-center rounded-full border border-border px-6 text-[11px] tracking-[0.16em] text-ink uppercase transition-colors hover:border-gold hover:text-gold"
              >
                {materialMeta[m].title}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
