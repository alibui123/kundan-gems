import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { formatPrice, productHref, type Product } from "@/lib/products";

export function BestSellers({ products }: { products: Product[] }) {
  return (
    <section id="best-sellers" className="section-y bg-ivory pt-0 md:pt-0">
      <div className="container-luxury">
        <div className="reveal-item">
          <SectionHeader
            eyebrow="Most desired"
            title="Best sellers"
            href="/collections/best-sellers"
            linkLabel="View ranking"
            align="center"
          />
        </div>

        <div className="product-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
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
