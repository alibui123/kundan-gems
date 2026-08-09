import Image from "next/image";
import Link from "next/link";
import { MATERIALS, materialMeta } from "@/lib/products";
import { isLocalPublicSrc } from "@/lib/local-image";

/**
 * Secondary category — materials as refined specimen rows.
 */
export function MaterialsShowcase() {
  return (
    <section
      id="materials"
      className="relative overflow-hidden border-y border-border bg-stone section-y"
      aria-label="Shop by material"
    >
      <div className="container-luxury">
        <div className="reveal-item mb-12 max-w-xl md:mb-16">
          <p className="label-caps mb-3">Materials</p>
          <h2 className="font-display text-[clamp(2.35rem,4.2vw,3.5rem)] leading-[1.08] tracking-[0.01em] text-ink">
            Shop by stone &amp; metal
          </h2>
          <p className="mt-4 text-[15px] leading-[1.75] text-muted">
            Prefer diamond fire, warm gold, or living ruby? Enter a full material
            edit of the atelier.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {MATERIALS.map((slug) => {
            const item = materialMeta[slug];
            return (
              <Link
                key={slug}
                href={`/materials/${slug}`}
                className="reveal-item group"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={isLocalPublicSrc(item.image)}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 border-t border-border pt-5">
                  <p className="text-[10px] tracking-[0.2em] text-gold uppercase">
                    {item.subtitle}
                  </p>
                  <h3 className="mt-2 font-display text-[2rem] leading-none tracking-[0.01em] text-ink transition-colors group-hover:text-gold">
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
