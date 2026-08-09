import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/data";

/**
 * Tertiary category — form / silhouette browse.
 */
export function FeaturedCollections() {
  return (
    <section
      id="collections"
      className="section-y relative overflow-hidden bg-ivory"
      aria-label="Shop by form"
    >
      <div className="container-luxury">
        <div className="reveal-item mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="label-caps mb-3">Forms</p>
            <h2 className="font-display text-[clamp(2.35rem,4.2vw,3.5rem)] leading-[1.08] tracking-[0.01em] text-ink">
              Shop by silhouette
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-muted">
              Start with the shape of the piece, then refine by material inside
              each collection.
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 sm:gap-5 lg:gap-8">
          {collections.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="reveal-item group flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-border pt-5">
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-muted uppercase">
                    {item.subtitle}
                  </p>
                  <h3 className="mt-1.5 font-display text-[1.85rem] leading-none tracking-[0.01em] text-ink transition-colors group-hover:text-gold">
                    {item.title}
                  </h3>
                </div>
                <span
                  className="text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
