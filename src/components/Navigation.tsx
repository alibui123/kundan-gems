"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { brand, navLinks } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import { BrandLogo } from "@/components/BrandLogo";
import { MenuToggle, MobileMenu } from "@/components/MobileMenu";

type NavigationProps = {
  variant?: "auto" | "light" | "dark";
};

export function Navigation({ variant: _variant = "auto" }: NavigationProps) {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const homeLinks = navLinks.map((link) => ({
    ...link,
    href: link.href.startsWith("#")
      ? pathname === "/"
        ? link.href
        : `/${link.href}`
      : link.href,
  }));

  const resolveHref = (link: (typeof homeLinks)[number]) => {
    if (link.label === "Catalogs") return isHome ? "#catalogs" : "/#catalogs";
    if (link.label === "Materials") return isHome ? "#materials" : "/#materials";
    if (link.label === "Forms") return isHome ? "#collections" : "/#collections";
    if (link.label === "The Edit") return isHome ? "#the-edit" : "/#the-edit";
    if (link.label === "Atelier") return isHome ? "#atelier" : "/#atelier";
    if (link.href === "#") return "/";
    return link.href;
  };

  // Home hero is a light ivory stage — keep ink chrome always.
  const linkTone = "text-ink/75 hover:text-ink";
  const iconTone = "text-ink/80 hover:text-ink";

  const menuLinks = homeLinks.map((link) => ({
    label: link.label,
    href: resolveHref(link),
  }));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-400 ${
          open
            ? "bg-ivory"
            : scrolled || !isHome
              ? "bg-ivory/92 shadow-[0_1px_0_rgba(28,25,23,0.06)] backdrop-blur-md"
              : "bg-transparent"
        }`}
      >
        <nav className="relative flex h-16 w-full items-center lg:h-[4.25rem]">
          <div className="relative z-[70] flex shrink-0 items-center self-stretch pl-1 sm:pl-2">
            <MenuToggle open={open} onClick={toggleMenu} className="text-ink" />
          </div>

          <Link
            href="/"
            className="relative z-[70] ml-1 inline-flex shrink-0 items-center sm:ml-2"
            aria-label={brand.name}
            onClick={closeMenu}
          >
            <BrandLogo size="nav" priority />
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-8">
            {homeLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={resolveHref(link)}
                  className={`group relative whitespace-nowrap text-[12px] font-normal tracking-[0.04em] transition-colors duration-300 ${linkTone}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative z-[70] ml-auto flex items-center gap-3 pr-4 sm:gap-4 sm:pr-6 lg:pr-10">
            <button
              type="button"
              aria-label="Search"
              className={`hidden transition-colors duration-300 sm:inline-flex ${iconTone}`}
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              aria-label={`Cart, ${count} items`}
              onClick={() => {
                closeMenu();
                openCart();
              }}
              className={`relative transition-colors duration-300 ${iconTone}`}
            >
              <CartIcon />
              {count > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-medium text-void">
                  {count}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={open} onClose={closeMenu} links={menuLinks} />
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M20 20l-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 7h12l-1 12H7L6 7z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M9 7V5a3 3 0 016 0v2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
