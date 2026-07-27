import Image from "next/image";
import Link from "next/link";
import { getAdjacentCollections } from "@/lib/collections";

export function NextCollectionNav({ currentSlug }: { currentSlug: string }) {
  const { prev, next } = getAdjacentCollections(currentSlug);

  return (
    <section className="bg-void text-white">
      <div className="container-luxury py-20 md:py-28">
        <p className="mb-3 text-center text-[11px] tracking-[0.24em] text-gold uppercase">
          Continue the journey
        </p>
        <h2 className="mb-12 text-center font-display text-[clamp(2rem,4vw,3.25rem)] font-light md:mb-16">
          Next collections
        </h2>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {prev && (
            <Link
              href={prev.href}
              className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[24px] p-8 md:min-h-[340px] md:p-10"
            >
              <Image
                src={prev.image}
                alt={prev.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/35 to-void/10" />
              <div className="relative z-10">
                <p className="text-[11px] tracking-[0.2em] text-white/55 uppercase">
                  Previous · {prev.subtitle}
                </p>
                <h3 className="mt-2 font-display text-3xl md:text-4xl">
                  ← {prev.title}
                </h3>
              </div>
            </Link>
          )}

          {next && (
            <Link
              href={next.href}
              className={`group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[24px] p-8 md:min-h-[340px] md:p-10 ${
                !prev ? "md:col-span-2" : ""
              }`}
            >
              <Image
                src={next.image}
                alt={next.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/35 to-void/10" />
              <div className="relative z-10">
                <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
                  Next page · {next.subtitle}
                </p>
                <h3 className="mt-2 font-display text-3xl md:text-4xl">
                  {next.title} →
                </h3>
                <p className="mt-3 max-w-sm text-sm text-white/60">
                  {next.description}
                </p>
                <span className="mt-6 inline-flex h-11 items-center rounded-full bg-gold px-6 text-[11px] font-medium tracking-[0.16em] text-void uppercase transition-transform group-hover:-translate-y-0.5">
                  Enter collection
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
