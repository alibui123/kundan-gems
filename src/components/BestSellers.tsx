import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, productHref, type Product } from "@/lib/products";

export function BestSellers({ products }: { products: Product[] }) {
  return (
    <section
      id="best-sellers"
      className="relative overflow-hidden border-t border-border bg-chalk section-y"
    >
      <div className="container-luxury">
        <div className="reveal-item mb-10 grid gap-6 md:mb-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="label-caps mb-3">Most desired</p>
            <h2 className="font-display text-[clamp(2.25rem,4vw,3.35rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
              Best sellers
            </h2>
          </div>
          <div className="md:col-span-5 md:text-right">
            <p className="text-[14px] leading-relaxed text-muted md:ml-auto md:max-w-xs">
              Pieces guests ask for by name — quiet bestsellers from the floor.
            </p>
            <Link
              href="/collections/best-sellers"
              className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-ink/65 uppercase transition-colors hover:text-gold"
            >
              View ranking
              <span className="h-px w-7 bg-current" />
            </Link>
          </div>
        </div>

        <div className="product-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <div key={product.id} className="reveal-item relative">
              <span className="mb-3 block font-display text-sm text-lacquer/80 tabular-nums">
                {String(i + 1).padStart(2, "0")}
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
      </div>
    </section>
  );
}
