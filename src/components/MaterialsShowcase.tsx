import Image from "next/image";
import Link from "next/link";
import { MATERIALS, materialMeta } from "@/lib/products";

const materialTone: Record<string, string> = {
  diamond: "text-ink",
  gold: "text-brown",
  ruby: "text-[#7a2430]",
};

/** Secondary browse — material specimens on ivory, type below the photo. */
export function MaterialsShowcase() {
  return (
    <section
      id="materials"
      className="section-reveal relative overflow-hidden bg-ivory py-20 md:py-28"
    >
      <div className="container-luxury">
        <div className="reveal-item mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-lg">
            <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-gold uppercase">
              Shop by material
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.08] text-ink">
              Diamond, gold
              <span className="italic text-brown"> &amp; ruby</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-[1.85] text-muted">
              Second path — filter the atelier by the metal or stone itself.
            </p>
          </div>
          <Link
            href="#catalogs"
            className="text-[11px] tracking-[0.2em] text-muted uppercase transition-colors hover:text-gold"
          >
              ← Back to catalogs
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-10">
          {MATERIALS.map((slug) => {
            const item = materialMeta[slug];
            return (
              <Link
                key={slug}
                href={`/materials/${slug}`}
                className="reveal-item group flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  {/* Dissolve into ivory — no dark card overlay */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ivory via-ivory/70 to-transparent" />
                </div>

                <div className="relative z-10 -mt-6 flex flex-1 flex-col px-1">
                  <p className="text-[10px] tracking-[0.26em] text-gold uppercase">
                    {item.subtitle}
                  </p>
                  <h3
                    className={`mt-2 font-display text-[clamp(2rem,3vw,2.75rem)] font-light leading-none ${materialTone[slug] ?? "text-ink"}`}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-4 line-clamp-2 text-[14px] leading-[1.75] text-muted">
                    {item.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-3 text-[11px] tracking-[0.2em] text-ink uppercase transition-colors group-hover:text-gold">
                    Explore
                    <span
                      className="h-px w-8 origin-left bg-current transition-transform duration-500 group-hover:scale-x-150"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
