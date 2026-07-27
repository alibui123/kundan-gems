import Image from "next/image";
import Link from "next/link";
import type { RingProduct } from "@/lib/rings";

export function RingsFeatured({ product }: { product: RingProduct }) {
  return (
    <section className="border-y border-border bg-card">
      <div className="container-luxury grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="max-w-lg lg:py-8">
          <p className="mb-3 text-[11px] font-medium tracking-[0.24em] text-gold uppercase">
            Editor&apos;s piece
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] text-ink">
            {product.name}
          </h2>
          <div className="my-6 h-px w-12 bg-gradient-to-r from-gold to-transparent" />
          <p className="text-[15px] leading-[1.85] text-muted">
            {product.description}
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-[11px] tracking-[0.16em] text-muted uppercase">
                Metal
              </dt>
              <dd className="mt-1 text-ink">{product.metal}</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.16em] text-muted uppercase">
                Diamond
              </dt>
              <dd className="mt-1 text-ink">{product.carat}</dd>
            </div>
          </dl>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <p className="font-display text-3xl text-ink">{product.priceLabel}</p>
            <Link
              href={`/collections/rings/${product.slug}`}
              className="inline-flex h-[52px] items-center rounded-full bg-gold px-8 text-[12px] font-medium tracking-[0.16em] text-void uppercase transition-all hover:-translate-y-0.5 hover:bg-gold-bright"
            >
              View piece
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
