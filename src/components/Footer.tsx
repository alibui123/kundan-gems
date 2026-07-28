import Link from "next/link";
import { brand } from "@/lib/data";
import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-ivory pb-24 pt-16 text-ink md:pb-12 md:pt-20">
      <div className="container-luxury">
        <div className="flex flex-col gap-12 border-b border-border pb-12 md:flex-row md:justify-between md:gap-16">
          <div className="max-w-xs">
            <Link href="/" className="inline-block" aria-label={brand.name}>
              <BrandLogo size="footer" />
            </Link>
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              A Pakistan atelier — bridal catalogs, high jewellery, and everyday
              gold, crafted to be worn for generations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-14">
            <div>
              <p className="label-caps mb-4">Explore</p>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/#catalogs"
                    className="text-[14px] text-muted transition-colors hover:text-ink"
                  >
                    Catalogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#materials"
                    className="text-[14px] text-muted transition-colors hover:text-ink"
                  >
                    Materials
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/new-arrivals"
                    className="text-[14px] text-muted transition-colors hover:text-ink"
                  >
                    New arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/best-sellers"
                    className="text-[14px] text-muted transition-colors hover:text-ink"
                  >
                    Best sellers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="label-caps mb-4">Atelier</p>
              <ul className="space-y-2.5 text-[14px] text-muted">
                <li>
                  <Link
                    href="/#atelier"
                    className="transition-colors hover:text-ink"
                  >
                    Craft
                  </Link>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-ink">
                    Appointments
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-ink">
                    Care guide
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="label-caps mb-4">Connect</p>
              <ul className="space-y-2.5 text-[14px] text-muted">
                <li>
                  <a
                    href="https://www.instagram.com/kundan.atelier/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-ink"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@kundan.atelier"
                    className="transition-colors hover:text-ink"
                  >
                    hello@kundan.atelier
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 pt-8 text-[12px] text-muted md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink">
              Privacy
            </a>
            <a href="#" className="hover:text-ink">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
