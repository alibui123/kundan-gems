import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/data";

export function FeaturedCollections() {
  return (
    <section id="collections" className="section-reveal bg-ivory pb-24 md:pb-36">
      <div className="container-luxury">
        <div className="reveal-item mb-14 max-w-lg md:mb-20">
          <p className="mb-3 text-[11px] font-medium tracking-[0.24em] text-gold uppercase">
            Collections
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] text-ink">
            Curated for the
            <br />
            discerning eye
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {collections.map((item) => {
            const className =
              "reveal-item group relative block aspect-[3/4] overflow-hidden rounded-[24px]";

            return (
              <Link key={item.title} href={item.href} className={className}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-void/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                  <p className="text-[11px] tracking-[0.2em] text-white/60 uppercase">
                    {item.subtitle}
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-white md:text-4xl">
                    {item.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] text-gold uppercase">
                    Discover
                    <span className="h-px w-6 bg-gold transition-all duration-300 group-hover:w-10" />
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
