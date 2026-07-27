import Image from "next/image";
import Link from "next/link";

export function SignatureCollection() {
  return (
    <section
      id="signature"
      className="section-reveal overflow-hidden bg-ivory pb-24 md:pb-36"
    >
      <div className="container-luxury grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="reveal-image relative aspect-[4/5] overflow-hidden rounded-[24px] md:aspect-[5/6]">
          <Image
            src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1400&q=85"
            alt="Signature diamond ring on warm marble"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="reveal-item max-w-lg lg:py-10">
          <p className="mb-4 text-[11px] font-medium tracking-[0.24em] text-gold uppercase">
            Editorial
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-light leading-[1.05] text-ink">
            Our Signature
            <br />
            Collection
          </h2>
          <div className="gold-divider my-8" />
          <p className="text-[15px] leading-[1.85] text-muted">
            A study in restraint and radiance. Each signature piece is composed
            with museum-like precision — proportion, light, and touch considered
            as carefully as the stone itself.
          </p>
          <p className="mt-5 text-[15px] leading-[1.85] text-muted">
            Limited editions, numbered and accompanied by a lifetime of care.
          </p>
          <Link
            href="/collections/signature"
            className="mt-10 inline-flex h-[52px] items-center rounded-full bg-gold px-8 text-[12px] font-medium tracking-[0.16em] text-void uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-bright hover:shadow-[0_8px_24px_rgba(200,169,106,0.35)]"
          >
            Explore Signature
          </Link>
        </div>
      </div>
    </section>
  );
}
