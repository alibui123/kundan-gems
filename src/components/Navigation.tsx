"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { brand, navLinks } from "@/lib/data";
import { useCart } from "@/components/CartProvider";

type NavigationProps = {
  /** auto: home-style (transparent → ivory). dark: start transparent on dark heroes. light: always ivory */
  variant?: "auto" | "light" | "dark";
};

export function Navigation({ variant = "auto" }: NavigationProps) {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [heroComplete, setHeroComplete] = useState(false);
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";
  const startTransparent =
    variant === "dark" || (variant === "auto" && isHome);
  // Home: stay transparent over the hero until the final frame, then ivory.
  const light =
    variant === "light" ||
    (startTransparent
      ? isHome
        ? heroComplete
        : scrolled
      : true);

  useEffect(() => {
    setHeroComplete(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) return;
    const onComplete = () => setHeroComplete(true);
    window.addEventListener("kundan:hero-complete", onComplete);
    return () => window.removeEventListener("kundan:hero-complete", onComplete);
  }, [isHome]);

  useEffect(() => {
    if (!startTransparent) {
      setScrolled(true);
      return;
    }
    if (isHome) return; // home uses heroComplete instead of early scrollY
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [startTransparent, isHome]);

  const homeLinks = navLinks.map((link) => ({
    ...link,
    href: link.href.startsWith("#")
      ? pathname === "/"
        ? link.href
        : `/${link.href}`
      : link.href,
  }));

  const resolveHref = (link: (typeof homeLinks)[number]) => {
    if (link.label === "Collections") return "/collections/rings";
    if (link.label === "Best Sellers") return "/collections/best-sellers";
    if (link.label === "New Arrivals") return "/collections/new-arrivals";
    if (link.href === "#") return "/";
    return link.href;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        light
          ? "bg-ivory/95 shadow-[0_1px_20px_rgba(37,37,37,0.06)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container-luxury flex h-[72px] items-center justify-between lg:h-20">
        <Link
          href="/"
          className={`font-display text-2xl tracking-[0.2em] uppercase transition-colors duration-500 ${
            light ? "text-ink" : "text-white"
          }`}
        >
          {brand.name}
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {homeLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={resolveHref(link)}
                className={`group relative text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 ${
                  light
                    ? "text-ink/80 hover:text-ink"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label="Search"
            className={`transition-colors duration-300 ${
              light ? "text-ink" : "text-white"
            }`}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            aria-label={`Cart, ${count} items`}
            onClick={openCart}
            className={`relative transition-colors duration-300 ${
              light ? "text-ink" : "text-white"
            }`}
          >
            <CartIcon />
            <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-medium text-void">
              {count}
            </span>
          </button>
          <button
            type="button"
            aria-label="Menu"
            className={`lg:hidden ${light ? "text-ink" : "text-white"}`}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-border/40 bg-ivory transition-all duration-500 lg:hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-luxury flex flex-col gap-5 py-6">
          {homeLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={resolveHref(link)}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
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

function CartIcon() {
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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
