import Image from "next/image";
import Link from "next/link";
import { MATERIALS, materialMeta } from "@/lib/products";

export function MaterialsShowcase() {
  return (
    <section
      id="materials"
      className="section-reveal relative overflow-hidden bg-void py-24 text-white md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,169,106,0.12),transparent_55%)]" />

      <div className="container-luxury relative z-10">
        <div className="reveal-item mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-gold uppercase">
            The materials
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-light leading-[1.05]">
            Diamond, gold
            <br />
            <span className="italic text-gold-bright">&amp; ruby</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.85] text-white/55">
            Three languages of light. Each material is a world of its own —
            enter the atelier edit composed around it.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {MATERIALS.map((slug) => {
            const item = materialMeta[slug];
            return (
              <Link
                key={slug}
                href={`/materials/${slug}`}
                className="reveal-item group relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[28px] md:min-h-[520px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${item.accent}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-void/10" />

                {/* Signature: fine vertical filament unique to materials band */}
                <div className="pointer-events-none absolute top-10 left-8 h-16 w-px bg-gradient-to-b from-gold/70 to-transparent opacity-80" />

                <div className="relative z-10 p-8 md:p-10">
                  <p className="text-[11px] tracking-[0.22em] text-white/55 uppercase">
                    {item.subtitle}
                  </p>
                  <h3 className="mt-3 font-display text-4xl font-light tracking-[-0.02em] md:text-5xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                    {item.description}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-3 text-[11px] tracking-[0.18em] text-gold uppercase">
                    Enter the edit
                    <span className="h-px w-8 bg-gold transition-all duration-300 group-hover:w-14" />
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
