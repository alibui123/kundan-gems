import Link from "next/link";
import { brand, navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-void pb-10 pt-20 text-white">
      <div className="container-luxury">
        <div className="flex flex-col gap-12 border-b border-white/10 pb-14 md:flex-row md:justify-between">
          <div>
            <Link
              href="/"
              className="font-display text-3xl tracking-[0.22em] text-gold uppercase"
            >
              {brand.name}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
              Timeless jewellery, crafted for forever. A boutique for those who
              collect moments in gold and light.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            <div>
              <p className="mb-4 text-[11px] tracking-[0.2em] text-gold uppercase">
                Explore
              </p>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/collections/rings"
                    className="text-sm text-white/55 transition-colors hover:text-gold"
                  >
                    Rings
                  </Link>
                </li>
                {navLinks.slice(2).map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                      className="text-sm text-white/55 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[11px] tracking-[0.2em] text-gold uppercase">
                Atelier
              </p>
              <ul className="space-y-3 text-sm text-white/55">
                <li>
                  <a href="#" className="transition-colors hover:text-gold">
                    Care Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-gold">
                    Appointments
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-gold">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[11px] tracking-[0.2em] text-gold uppercase">
                Connect
              </p>
              <ul className="space-y-3 text-sm text-white/55">
                <li>
                  <a
                    href="https://www.instagram.com/kundan.atelier/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-gold">
                    Pinterest
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@kundan.com"
                    className="transition-colors hover:text-gold"
                  >
                    hello@kundan.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-8 text-xs tracking-wide text-white/35 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Kundan Atelier. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">
              Privacy
            </a>
            <a href="#" className="hover:text-gold">
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border/60 bg-ivory/95 backdrop-blur-md md:hidden">
        <a
          href="/collections/new-arrivals"
          className="flex flex-1 flex-col items-center gap-1 py-3 text-[10px] tracking-[0.14em] text-ink uppercase"
        >
          <BagIcon />
          Search
        </a>
        <a
          href="#collections"
          className="flex flex-1 flex-col items-center gap-1 border-x border-border/60 py-3 text-[10px] tracking-[0.14em] text-ink uppercase"
        >
          <GemIcon />
          Shop
        </a>
        <button
          type="button"
          className="flex flex-1 flex-col items-center gap-1 py-3 text-[10px] tracking-[0.14em] text-ink uppercase"
        >
          <BagIcon />
          Cart
        </button>
      </div>
    </footer>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M20 20l-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 7h12l-1 12H7L6 7z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9 7V5a3 3 0 016 0v2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GemIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l7 7-7 11L5 10l7-7z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
