import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/data";

/** Tertiary path — silhouette first; staggered tiles, type on ivory. */
export function FeaturedCollections() {
  return (
    <section id="collections" className="section-reveal bg-ivory py-16 md:py-24">
      <div className="container-luxury">
        <div className="reveal-item mb-12 flex flex-col gap-4 border-b border-border pb-8 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-medium tracking-[0.24em] text-gold uppercase">
              Shop by form
            </p>
            <h2 className="font-display text-[clamp(1.85rem,3.2vw,2.75rem)] font-light text-ink">
              Rings, necklaces &amp; bracelets
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-muted">
            Prefer silhouette first? Refine by material inside each form.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {collections.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="reveal-item group flex flex-col"
            >
              <div className="relative overflow-hidden bg-[#efe9e0]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ivory/40 via-transparent to-transparent opacity-80" />
                </div>
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.22em] text-gold uppercase">
                    {item.subtitle}
                  </p>
                  <h3 className="mt-1.5 font-display text-[clamp(1.65rem,2.4vw,2.15rem)] font-light leading-none text-ink transition-colors duration-300 group-hover:text-brown">
                    {item.title}
                  </h3>
                </div>
                <span
                  className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-border text-muted transition-all duration-500 group-hover:border-gold group-hover:text-gold"
                  aria-hidden
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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
              <span className="mt-4 block h-px w-full origin-left scale-x-[0.28] bg-border transition-transform duration-500 group-hover:scale-x-100 group-hover:bg-gold" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
