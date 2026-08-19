"use client";

import Link from "next/link";
import { useState } from "react";
import type { RingProduct } from "@/lib/rings";
import { useCart } from "@/components/CartProvider";
import { ProductImageFrame } from "@/components/ProductImageFrame";

export function RingProductDetail({ product }: { product: RingProduct }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(product.gallery[0] ?? product.image);
  const [size, setSize] = useState(product.size[1] ?? product.size[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      priceLabel: product.priceLabel,
      image: product.image,
      size,
      collectionPath: "/collections/rings",
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="container-luxury grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="relative">
          <ProductImageFrame
            src={activeImage}
            alt={product.name}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            padding="detail"
          />
          {product.badge && (
            <span className="absolute top-5 left-5 rounded-full bg-void/80 px-4 py-2 text-[10px] tracking-[0.18em] text-gold uppercase backdrop-blur-sm">
              {product.badge}
            </span>
          )}
        </div>
        {product.gallery.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {product.gallery.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(src)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden border bg-white transition-colors ${
                  activeImage === src ? "border-gold" : "border-border"
                }`}
              >
                <ProductImageFrame
                  src={src}
                  alt=""
                  sizes="80px"
                  aspect="square"
                  padding="thumb"
                  fillContainer
                  className="h-full w-full"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center lg:py-8">
        <Link
          href="/collections/rings"
          className="mb-6 text-[11px] tracking-[0.2em] text-muted uppercase transition-colors hover:text-gold"
        >
          ← Rings Collection
        </Link>
        <p className="mb-3 text-[11px] font-medium tracking-[0.24em] text-gold uppercase">
          {product.metal}
        </p>
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] text-ink">
          {product.name}
        </h1>
        <p className="mt-4 font-display text-3xl text-ink">{product.priceLabel}</p>
        <p className="mt-6 max-w-md text-[15px] leading-[1.85] text-muted">
          {product.description}
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-border py-6 text-sm">
          <div>
            <dt className="text-[11px] tracking-[0.16em] text-muted uppercase">
              Diamond
            </dt>
            <dd className="mt-1 text-ink">{product.carat}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.16em] text-muted uppercase">
              Metal
            </dt>
            <dd className="mt-1 text-ink">{product.metal}</dd>
          </div>
        </dl>

        <div className="mt-8">
          <p className="mb-3 text-[11px] tracking-[0.16em] text-muted uppercase">
            Select size
          </p>
          <div className="flex flex-wrap gap-2">
            {product.size.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm transition-all ${
                  size === s
                    ? "border-gold bg-gold text-void"
                    : "border-border text-ink hover:border-gold"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="mt-10 inline-flex h-[52px] w-full max-w-sm items-center justify-center rounded-full bg-gold text-[12px] font-medium tracking-[0.16em] text-void uppercase transition-all hover:-translate-y-0.5 hover:bg-gold-bright hover:shadow-[0_8px_24px_rgba(200,169,106,0.35)]"
        >
          {added ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
