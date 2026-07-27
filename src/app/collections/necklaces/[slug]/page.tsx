import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NecklaceProductDetail } from "@/components/NecklaceProductDetail";
import { ProductCard } from "@/components/ProductCard";
import {
  formatPrice,
  getProductBySlug,
  getProducts,
  productHref,
  toNecklaceProduct,
} from "@/lib/products";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug("necklaces", slug);
  if (!product) return { title: "Necklace — Kundan" };
  return {
    title: `${product.name} — Kundan`,
    description: product.description,
  };
}

export default async function NecklaceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const raw = await getProductBySlug("necklaces", slug);
  if (!raw) notFound();

  const product = toNecklaceProduct(raw);
  const related = (await getProducts({ category: "necklaces", limit: 5 }))
    .filter((n) => n.id !== raw.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation variant="light" />

      <main className="pt-28 pb-16 md:pt-32 md:pb-24">
        <NecklaceProductDetail product={product} />

        {related.length > 0 && (
          <section className="container-luxury mt-24 border-t border-border pt-16">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[11px] tracking-[0.24em] text-gold uppercase">
                  You may also like
                </p>
                <h2 className="font-display text-3xl font-light text-ink">
                  Related necklaces
                </h2>
              </div>
              <Link
                href="/collections/necklaces"
                className="text-[11px] tracking-[0.16em] text-muted uppercase hover:text-gold"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  slug={item.slug}
                  href={productHref(item)}
                  name={item.name}
                  price={formatPrice(item.price)}
                  priceValue={item.price}
                  image={item.image}
                  aspect="square"
                  size={item.sizes[1] ?? item.sizes[0]}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
