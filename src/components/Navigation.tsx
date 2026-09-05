"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { brand, navLinks } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import { BrandLogo } from "@/components/BrandLogo";
import { MenuToggle, MobileMenu } from "@/components/MobileMenu";
import { SPRING } from "@/lib/motion";

type NavigationProps = {
  variant?: "auto" | "light" | "dark";
};

/**
 * Translucent floating chrome — materializes on scroll, content passes beneath.
 * Logo-only on hero film; full masthead once boutique content arrives.
 */
export function Navigation({ variant: _variant = "auto" }: NavigationProps) {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";
  const reduce = useReducedMotion();

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

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
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
  const onHero = isHome && !scrolled && !open;
  const onFilm = onHero;

  const primaryLinks = navLinks.filter(
    (l) => !["Home", "Contact"].includes(l.label)
  );

  const menuLinks = navLinks.map((link) => ({
    label: link.label,
    href: resolveHref(link.label, link.href),
  }));

  const chromeTransition = reduce
    ? { duration: 0.2 }
    : SPRING.default;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <motion.div
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${
            solid ? "material-glass" : ""
          }`}
          initial={false}
          animate={{ opacity: solid ? 1 : 0 }}
          transition={chromeTransition}
        />

        <div
          className={`nav-mast relative mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${
            onHero ? "py-4" : "py-3"
          }`}
        >
          <div className="relative grid h-11 grid-cols-[1fr_auto_1fr] items-center lg:h-12">
            <motion.div
              className="flex items-center gap-1 justify-self-start overflow-hidden"
              initial={false}
              animate={{
                opacity: onHero ? 0 : 1,
                x: onHero ? -8 : 0,
              }}
              transition={chromeTransition}
              style={{ pointerEvents: onHero ? "none" : "auto" }}
            >
              <MenuToggle
                open={open}
                onClick={toggleMenu}
                className={`pressable rounded-full p-1 ${
                  open || solid ? "text-ink" : "text-ivory"
                }`}
              />
            </motion.div>

            <Link
              href="/"
              className="z-[70] col-start-2 inline-flex justify-self-center pressable"
              aria-label={brand.name}
              onClick={closeMenu}
            >
              <BrandLogo
                size="mark"
                priority
                className={`h-9 w-auto transition-[filter] duration-300 lg:h-10 ${
                  onFilm ? "brightness-0 invert" : ""
                }`}
              />
            </Link>

            <motion.div
              className="flex items-center justify-self-end overflow-hidden"
              initial={false}
              animate={{
                opacity: onHero ? 0 : 1,
                x: onHero ? 8 : 0,
              }}
              transition={chromeTransition}
              style={{ pointerEvents: onHero ? "none" : "auto" }}
            >
              <button
                type="button"
                aria-label={`Cart, ${count} items`}
                tabIndex={onHero ? -1 : 0}
                onClick={() => {
                  closeMenu();
                  openCart();
                }}
                className={`pressable relative rounded-full p-1.5 transition-colors duration-200 ${
                  solid ? "text-ink" : "text-ivory"
                }`}
              >
                <CartIcon />
                {count > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-void">
                    {count}
                  </span>
                )}
              </button>
            </motion.div>
          </div>

          <div
            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              onHero
                ? "grid-rows-[0fr] opacity-0"
                : "grid-rows-[1fr] opacity-100"
            }`}
          >
            <div className="overflow-hidden">
              <nav
                aria-label="Primary"
                className="mt-1 hidden justify-center pb-2 lg:flex"
                aria-hidden={onHero}
              >
                <ul className="flex items-center gap-7 xl:gap-9">
                  {primaryLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={resolveHref(link.label, link.href)}
                        tabIndex={onHero ? -1 : 0}
                        className={`pressable relative rounded-md px-1 py-0.5 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-200 ${
                          solid
                            ? "text-ink/65 hover:text-ink"
                            : "text-ivory/70 hover:text-ivory"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
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
