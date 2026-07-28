import Image from "next/image";
import Link from "next/link";
import { MATERIALS, materialMeta } from "@/lib/products";
import { SectionHeader } from "@/components/SectionHeader";

const materialTone: Record<string, string> = {
  diamond: "text-ink",
  gold: "text-brown",
  ruby: "text-[#7a2430]",
};

/** Secondary browse — material specimens on ivory. */
export function MaterialsShowcase() {
  return (
    <section
      id="materials"
      className="section-y relative overflow-hidden bg-ivory"
    >
      <div className="container-luxury">
        <div className="reveal-item">
          <SectionHeader
            eyebrow="Shop by material"
            title="Diamond, gold & ruby"
            description="Second path — filter the atelier by the metal or stone itself."
            href="/#catalogs"
            linkLabel="Back to catalogs"
          />
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
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ivory/80 to-transparent" />
                </div>

                <div className="relative z-10 mt-5 flex flex-1 flex-col px-0.5">
                  <p className="label-caps text-[10px]">{item.subtitle}</p>
                  <h3
                    className={`mt-2 font-display text-[clamp(1.85rem,2.8vw,2.5rem)] font-light leading-none ${materialTone[slug] ?? "text-ink"}`}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-[14px] leading-[1.7] text-muted">
                    {item.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.14em] text-ink/70 uppercase transition-colors group-hover:text-gold">
                    Explore
                    <span
                      className="h-px w-6 bg-current transition-all duration-400 group-hover:w-9"
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
