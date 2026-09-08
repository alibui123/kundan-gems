import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NextCollectionNav } from "@/components/NextCollectionNav";
import type { CollectionMeta } from "@/lib/collections";

type Props = {
  collection: CollectionMeta;
  previews: { name: string; image: string }[];
};

export function CollectionLanding({ collection, previews }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="dark" />

      <section className="relative isolate overflow-hidden bg-white text-ink">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(200,169,106,0.12),transparent_55%)]" />
        <div className="container-luxury relative z-10 grid items-center gap-12 pt-28 pb-20 md:pt-36 md:pb-28 lg:grid-cols-2">
          <div>
            <nav className="mb-10 text-[11px] tracking-[0.16em] text-muted uppercase">
              <Link href="/" className="hover:text-gold">
                Home
              </Link>
              <span className="mx-2 text-border">/</span>
              <span className="text-gold">{collection.title}</span>
            </nav>
            <p className="mb-4 text-[11px] tracking-[0.28em] text-gold uppercase">
              {collection.subtitle}
            </p>
            <h1 className="font-display text-[clamp(3.5rem,9vw,7rem)] font-light leading-[0.9] tracking-[-0.03em]">
              {collection.title}
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-[1.85] text-muted">
              {collection.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/collections/rings"
                className="inline-flex h-[52px] items-center rounded-full bg-gold px-8 text-[12px] tracking-[0.16em] text-void uppercase"
              >
                Browse rings
              </Link>
              <a
                href="#preview"
                className="inline-flex h-[52px] items-center rounded-full border border-gold/50 px-8 text-[12px] tracking-[0.16em] text-gold uppercase"
              >
                Preview pieces
              </a>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-[28px] lg:ml-auto">
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <main className="pb-8">
        <div id="preview" className="container-luxury scroll-mt-28 py-16 md:py-24">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-[11px] tracking-[0.24em] text-gold uppercase">
                First look
              </p>
              <h2 className="font-display text-3xl text-ink md:text-4xl">
                Coming to the atelier
              </h2>
            </div>
            <p className="hidden text-[11px] tracking-[0.16em] text-muted uppercase sm:block">
              Full edit arriving soon
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {previews.map((piece) => (
              <article
                key={piece.name}
                className="overflow-hidden rounded-[20px] bg-white shadow-[0_8px_30px_rgba(37,37,37,0.06)]"
              >
                <div className="relative aspect-square bg-white">
                  <Image
                    src={piece.image}
                    alt={piece.name}
                    fill
                    sizes="33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-ink">{piece.name}</h3>
                  <p className="mt-1 text-[11px] tracking-[0.14em] text-muted uppercase">
                    Notify me
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-[24px] border border-border bg-white px-8 py-12 text-center md:px-12">
            <p className="text-[11px] tracking-[0.24em] text-gold uppercase">
              Be first
            </p>
            <h3 className="mt-3 font-display text-3xl text-ink">
              Join the private list for {collection.title.toLowerCase()}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted">
              Receive a quiet note when new pieces arrive — never noise.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-[52px] items-center rounded-full bg-gold px-8 text-[12px] tracking-[0.16em] text-void uppercase"
            >
              Join the list
            </Link>
          </div>
        </div>
      </main>

      <NextCollectionNav currentSlug={collection.slug} />
      <Footer />
    </div>
  );
}
