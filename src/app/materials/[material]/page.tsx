import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { MaterialHero } from "@/components/MaterialHero";
import {
  MATERIALS,
  formatPrice,
  getProducts,
  isMaterial,
  materialMeta,
  productHref,
  type Material,
} from "@/lib/products";

type PageProps = {
  params: Promise<{ material: string }>;
};

export function generateStaticParams() {
  return MATERIALS.map((material) => ({ material }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { material: raw } = await params;
  if (!isMaterial(raw)) return { title: "Material — Kundan" };
  const meta = materialMeta[raw];
  return {
    title: `${meta.title} — Kundan`,
    description: meta.description,
  };
}

export default async function MaterialPage({ params }: PageProps) {
  const { material: raw } = await params;
  if (!isMaterial(raw)) notFound();
  const material = raw as Material;
  const meta = materialMeta[material];
  const products = await getProducts({ material });

  const others = MATERIALS.filter((m) => m !== material);

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation variant="dark" />

      <MaterialHero material={material} pieceCount={products.length} />

      <main className="pb-8 md:pb-12">
        <div className="container-luxury pt-16 md:pt-24">
          <div className="mb-12 flex flex-col justify-between gap-6 border-b border-border pb-8 md:mb-16 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="mb-3 text-[11px] tracking-[0.24em] text-gold uppercase">
                The edit
              </p>
              <h2
                id="material-grid"
                className="scroll-mt-28 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.05] text-ink"
              >
                {meta.title} pieces
              </h2>
              <p className="mt-4 text-[15px] leading-[1.85] text-muted">
                {meta.description}
              </p>
            </div>
            <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
              {products.length} pieces
            </p>
          </div>

          {products.length === 0 ? (
            <p className="py-20 text-center text-sm text-muted">
              Pieces in {meta.title.toLowerCase()} are arriving soon.
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
                  aspect="square"
                  size={product.sizes[1] ?? product.sizes[0]}
                />
              ))}
            </div>
          )}

          <div className="mt-20 border-t border-border pt-14">
            <p className="mb-6 text-[11px] tracking-[0.24em] text-gold uppercase">
              Continue exploring
            </p>
            <div className="flex flex-wrap gap-4">
              {others.map((m) => (
                <Link
                  key={m}
                  href={`/materials/${m}`}
                  className="inline-flex h-12 items-center rounded-full border border-border px-6 text-[11px] tracking-[0.16em] text-ink uppercase transition-colors hover:border-gold hover:text-gold"
                >
                  {materialMeta[m].title}
                </Link>
              ))}
              <Link
                href="/collections/rings"
                className="inline-flex h-12 items-center rounded-full bg-gold px-6 text-[11px] tracking-[0.16em] text-void uppercase transition-all hover:-translate-y-0.5 hover:bg-gold-bright"
              >
                All rings
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
