import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, productHref, type Product } from "@/lib/products";

export function BestSellers({ products }: { products: Product[] }) {
  return (
    <section id="best-sellers" className="section-reveal bg-ivory pb-24 md:pb-36">
      <div className="container-luxury">
        <div className="reveal-item mb-14 flex flex-col items-center text-center md:mb-20">
          <p className="mb-3 text-[11px] font-medium tracking-[0.24em] text-gold uppercase">
            Most Desired
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light text-ink">
            Best Sellers
          </h2>
          <Link
            href="/collections/best-sellers"
            className="mt-8 inline-flex h-[52px] items-center rounded-full bg-gold px-8 text-[12px] font-medium tracking-[0.16em] text-void uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-bright hover:shadow-[0_8px_24px_rgba(200,169,106,0.35)]"
          >
            View the ranking
          </Link>
        </div>

        <div className="product-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
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
      </div>
    </section>
  );
}
