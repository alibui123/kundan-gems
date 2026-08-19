import Link from "next/link";
import { brand, promises } from "@/lib/data";
import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border bg-white pb-28 pt-16 text-ink md:pb-14 md:pt-20 lg:pt-24"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container-luxury">
        <div className="grid gap-12 border-b border-border pb-14 lg:grid-cols-12 lg:gap-10 lg:pb-16">
          <div className="lg:col-span-5 xl:col-span-4">
            <Link href="/" className="inline-block" aria-label={brand.name}>
              <BrandLogo size="footer" />
            </Link>
            <p className="mt-5 max-w-sm font-display text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.35] tracking-[0.01em] text-ink">
              {brand.tagline}
            </p>
            <p className="mt-4 max-w-sm text-[14px] leading-[1.75] text-muted">
              A Pakistan atelier — bridal catalogs, high jewellery, and everyday
              gold, composed to be worn across generations.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <a
                href="https://www.instagram.com/kundan.atelier/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium tracking-[0.18em] text-ink/55 uppercase transition-colors hover:text-gold"
              >
                Instagram
              </a>
              <a
                href="mailto:hello@kundan.atelier"
                className="text-[11px] font-medium tracking-[0.18em] text-ink/55 uppercase transition-colors hover:text-gold"
              >
                Email
              </a>
              <a
                href="tel:+923001234567"
                className="text-[11px] font-medium tracking-[0.18em] text-ink/55 uppercase transition-colors hover:text-gold"
              >
                Call
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:gap-8 xl:col-span-8 xl:grid-cols-3">
            <div>
              <p className="label-caps mb-3">Visit the maison</p>
              <address className="not-italic text-[14px] leading-[1.8] text-muted">
                <p className="text-ink">Kundan Atelier</p>
                <p>MM Alam Road</p>
                <p>Lahore, Pakistan</p>
              </address>
              <p className="mt-5 text-[13px] leading-relaxed text-muted">
                <span className="block text-[10px] tracking-[0.2em] text-gold uppercase">
                  Hours
                </span>
                <span className="mt-1.5 block">
                  Tue–Sun · 11:00 – 19:00
                  <br />
                  Closed Mondays
                </span>
              </p>
              <a
                href="#"
                className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-ink uppercase transition-colors hover:text-gold"
              >
                Book an appointment
                <span className="h-px w-6 bg-current" aria-hidden />
              </a>
            </div>

            <div>
              <p className="label-caps mb-3">Concierge</p>
              <ul className="space-y-3 text-[14px] leading-relaxed text-muted">
                <li>
                  <span className="block text-[10px] tracking-[0.18em] text-gold/80 uppercase">
                    Client services
                  </span>
                  <a
                    href="mailto:hello@kundan.atelier"
                    className="mt-1 inline-block text-ink transition-colors hover:text-gold"
                  >
                    hello@kundan.atelier
                  </a>
                </li>
                <li>
                  <span className="block text-[10px] tracking-[0.18em] text-gold/80 uppercase">
                    Bridal desk
                  </span>
                  <a
                    href="mailto:bridal@kundan.atelier"
                    className="mt-1 inline-block text-ink transition-colors hover:text-gold"
                  >
                    bridal@kundan.atelier
                  </a>
                </li>
                <li>
                  <span className="block text-[10px] tracking-[0.18em] text-gold/80 uppercase">
                    WhatsApp
                  </span>
                  <a
                    href="https://wa.me/923001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-ink transition-colors hover:text-gold"
                  >
                    +92 300 123 4567
                  </a>
                </li>
              </ul>
            </div>

            <div className="sm:col-span-2 xl:col-span-1">
              <p className="label-caps mb-3">Promises</p>
              <ul className="space-y-4">
                {promises.map((item) => (
                  <li
                    key={item.title}
                    className="border-b border-border/80 pb-3 last:border-0 last:pb-0"
                  >
                    <p className="text-[13px] font-medium tracking-[0.02em] text-ink">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <p className="font-display text-xl tracking-[0.02em] text-ink md:text-2xl">
              {brand.name}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-muted">
              © {year} {brand.name} Atelier. Crafted in Pakistan.
            </p>
          </div>

          <nav
            aria-label="Legal"
            className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-muted"
          >
            <a href="#" className="transition-colors hover:text-ink">
              Privacy policy
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Terms of use
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Cookie preferences
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Accessibility
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
