import Link from "next/link";
import { brand } from "@/lib/data";
import { BrandLogo } from "@/components/BrandLogo";

/**
 * Hallmark Ft1 — Mast-headed footer.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="foot-mast border-t border-border bg-white text-ink"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container-maison px-6 py-16 sm:px-10 md:py-20 lg:px-14">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Link href="/" className="inline-flex" aria-label={brand.name}>
              <BrandLogo size="mark" className="h-10 w-auto" />
            </Link>
            <p className="mt-4 font-display text-xl tracking-[0.02em] text-ink md:text-2xl">
              {brand.tagline}
            </p>
            <p className="mt-2 text-[12px] text-muted">
              © {year} {brand.name} · MM Alam Road, Lahore
            </p>
          </div>

          <nav
            aria-label="Maison"
            className="flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-medium tracking-[0.22em] text-muted uppercase"
          >
            <Link
              href="/#catalogs"
              className="link-draw link-draw-gold hover:text-gold"
            >
              Catalogs
            </Link>
            <Link
              href="/#materials"
              className="link-draw link-draw-gold hover:text-gold"
            >
              Materials
            </Link>
            <Link
              href="/#collections"
              className="link-draw link-draw-gold hover:text-gold"
            >
              Forms
            </Link>
            <a
              href="https://www.instagram.com/kundan.atelier/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw link-draw-gold hover:text-gold"
            >
              Instagram
            </a>
            <a
              href="mailto:hello@kundan.atelier"
              className="link-draw link-draw-gold hover:text-gold"
            >
              Email
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
