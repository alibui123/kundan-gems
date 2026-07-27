import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, productHref, type Product } from "@/lib/products";

export function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section id="new-arrivals" className="section-reveal bg-ivory pt-24 pb-24 md:pt-36 md:pb-36">
      <div className="container-luxury">
        <div className="reveal-item mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[11px] font-medium tracking-[0.24em] text-gold uppercase">
              Just Arrived
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] text-ink">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/collections/new-arrivals"
            className="text-[11px] tracking-[0.18em] text-muted uppercase transition-colors hover:text-gold"
          >
            View all pieces
          </Link>
        </div>

        <div className="-mx-5 flex gap-5 overflow-x-auto px-5 pb-4 snap-x snap-mandatory scrollbar-none md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
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
      </div>
    </section>
  );
}
