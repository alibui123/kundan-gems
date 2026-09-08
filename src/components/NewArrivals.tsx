import { ProductCard } from "@/components/ProductCard";
import { formatPrice, productHref, type Product } from "@/lib/products";
import Link from "next/link";

export function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section
      id="new-arrivals"
      className="section-y relative overflow-hidden bg-white"
    >
      <div className="container-luxury">
        <div className="reveal-item mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-lg">
            <p className="label-caps mb-3">Just from the bench</p>
            <h2 className="font-display text-[clamp(2.25rem,4vw,3.35rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
              New arrivals
            </h2>
          </div>
          <Link
            href="/collections/new-arrivals"
            className="group inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-ink/65 uppercase transition-colors hover:text-gold"
          >
            View all arrivals
            <span className="h-px w-7 bg-current transition-all group-hover:w-10" />
          </Link>
        </div>

        <div className="product-grid">
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
