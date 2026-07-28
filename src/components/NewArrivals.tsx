import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { formatPrice, productHref, type Product } from "@/lib/products";

export function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section
      id="new-arrivals"
      className="section-y border-t border-border bg-ivory"
    >
      <div className="container-luxury">
        <div className="reveal-item">
          <SectionHeader
            eyebrow="Just arrived"
            title="New arrivals"
            href="/collections/new-arrivals"
            linkLabel="View all"
          />
        </div>

        <div
          data-lenis-prevent
          className="-mx-5 flex gap-5 overflow-x-auto overscroll-x-contain px-5 pb-2 snap-x snap-mandatory scrollbar-none md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4"
        >
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
