import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";

/** Tertiary path — silhouette first. */
export function FeaturedCollections() {
  return (
    <section id="collections" className="section-y border-t border-border bg-ivory">
      <div className="container-luxury">
        <div className="reveal-item">
          <SectionHeader
            eyebrow="Shop by form"
            title="Rings, necklaces & bracelets"
            description="Prefer silhouette first? Refine by material inside each form."
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {collections.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="reveal-item group flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#efe9e0]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="label-caps text-[10px]">{item.subtitle}</p>
                  <h3 className="mt-1.5 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-light leading-none text-ink transition-colors duration-300 group-hover:text-gold">
                    {item.title}
                  </h3>
                </div>
                <span
                  className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all duration-400 group-hover:border-gold group-hover:text-gold"
                  aria-hidden
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7h7M7 3.5 10.5 7 7 10.5"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
