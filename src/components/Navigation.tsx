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

/**
 * On homepage hero: logo only.
 * After scroll: white field fades in + full masthead.
 */
export function Navigation({ variant: _variant = "auto" }: NavigationProps) {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    const sync = () => {
      if (!isHome) {
        setScrolled(true);
        return;
      }
      const boutique = document.querySelector(".boutique");
      if (boutique) {
        setScrolled(
          boutique.getBoundingClientRect().top < window.innerHeight * 0.88
        );
        return;
      }
      setScrolled(window.scrollY > 64);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    type LenisLike = {
      on: (e: string, cb: () => void) => void;
      off: (e: string, cb: () => void) => void;
    };
    const getLenis = () =>
      (window as Window & { __lenis?: LenisLike }).__lenis;

    getLenis()?.on("scroll", sync);

    const retry = window.setInterval(() => {
      const l = getLenis();
      if (l) {
        l.on("scroll", sync);
        window.clearInterval(retry);
      }
    }, 200);
    window.setTimeout(() => window.clearInterval(retry), 3000);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.clearInterval(retry);
      getLenis()?.off("scroll", sync);
    };
  }, [isHome]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const resolveHref = (label: string, href: string) => {
    if (label === "Catalogs") return isHome ? "#catalogs" : "/#catalogs";
    if (label === "Materials") return isHome ? "#materials" : "/#materials";
    if (label === "Forms") return isHome ? "#collections" : "/#collections";
    if (label === "The Edit") return isHome ? "#the-edit" : "/#the-edit";
    if (label === "Atelier") return isHome ? "#atelier" : "/#atelier";
    if (label === "Contact") return isHome ? "#newsletter" : "/#newsletter";
    if (href === "#") return "/";
    return href.startsWith("#") ? (isHome ? href : `/${href}`) : href;
  };

  const solid = open || scrolled || !isHome;
  const logoOnly = isHome && !scrolled && !open;
  const onFilm = isHome && !solid;

  const primaryLinks = navLinks.filter(
    (l) => !["Home", "Contact"].includes(l.label)
  );

  const menuLinks = navLinks.map((link) => ({
    label: link.label,
    href: resolveHref(link.label, link.href),
  }));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Glossy glass field — fades in on scroll */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{
            opacity: solid ? 1 : 0,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.28) 100%)",
            backdropFilter: "blur(14px) saturate(140%)",
            WebkitBackdropFilter: "blur(14px) saturate(140%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.55), 0 1px 0 rgba(26,23,20,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.22)",
          }}
        />

        <div
          className={`nav-mast relative mx-auto w-full max-w-[1600px] px-4 transition-[padding] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] sm:px-6 lg:px-10 ${
            logoOnly ? "py-5" : "pt-3 pb-0"
          }`}
        >
          {/* Three-slot bar — logo always dead-center */}
          <div className="relative grid h-11 grid-cols-[1fr_auto_1fr] items-center lg:h-12">
            <div
              className={`flex items-center gap-1 justify-self-start overflow-hidden transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                logoOnly
                  ? "pointer-events-none -translate-x-2 opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <MenuToggle
                open={open}
                onClick={toggleMenu}
                className={open || solid ? "text-ink" : "text-ivory"}
              />
            </div>

            <Link
              href="/"
              className="z-[70] col-start-2 inline-flex justify-self-center"
              aria-label={brand.name}
              onClick={closeMenu}
            >
              <BrandLogo
                size="mark"
                priority
                className={`h-9 w-auto transition-[filter] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] lg:h-10 ${
                  onFilm ? "brightness-0 invert" : ""
                }`}
              />
            </Link>

            <div
              className={`flex items-center justify-self-end overflow-hidden transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                logoOnly
                  ? "pointer-events-none translate-x-2 opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <button
                type="button"
                aria-label={`Cart, ${count} items`}
                tabIndex={logoOnly ? -1 : 0}
                onClick={() => {
                  closeMenu();
                  openCart();
                }}
                className={`relative transition-colors duration-700 ${
                  solid ? "text-ink" : "text-ivory"
                }`}
              >
                <CartIcon />
                {count > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-medium text-void">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Links + rule — fade/slide in with the white field */}
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              logoOnly
                ? "grid-rows-[0fr] opacity-0"
                : "grid-rows-[1fr] opacity-100"
            }`}
          >
            <div className="overflow-hidden">
              <nav
                aria-label="Primary"
                className="mt-2 hidden justify-center pb-3 lg:flex"
                aria-hidden={logoOnly}
              >
                <ul className="flex items-center gap-8 xl:gap-10">
                  {primaryLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={resolveHref(link.label, link.href)}
                        tabIndex={logoOnly ? -1 : 0}
                        className="nav-link-draw relative text-[10px] font-medium tracking-[0.26em] text-ink/70 uppercase transition-colors duration-500 hover:text-ink"
                      >
                        {link.label}
                        <span className="nav-underline" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div
                className="mt-1 h-[3px] border-t border-b border-ink/8"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={closeMenu} links={menuLinks} />
    </>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 7h12l-1 12H7L6 7z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M9 7V5a3 3 0 016 0v2"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}
