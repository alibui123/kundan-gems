"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { brand, navLinks } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import { BrandLogo } from "@/components/BrandLogo";
import { MenuToggle, MobileMenu } from "@/components/MobileMenu";

gsap.registerPlugin(useGSAP);

type NavigationProps = {
  variant?: "auto" | "light" | "dark";
};

/**
 * Floating nav — logo-only on film heroes (home + catalogs); GSAP open/close
 * masthead as content covers / reveals the hero.
 */
export function Navigation({ variant: _variant = "auto" }: NavigationProps) {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";
  const isCatalog = pathname.startsWith("/catalogs/");
  const isFilmPage = isHome || isCatalog;

  const headerRef = useRef<HTMLElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const mastRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const linksWrapRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linkItemsRef = useRef<HTMLLIElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const readyRef = useRef(false);

  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    const sync = () => {
      if (isHome) {
        const boutique = document.querySelector(".boutique");
        if (boutique) {
          setScrolled(
            boutique.getBoundingClientRect().top < window.innerHeight * 0.88
          );
          return;
        }
        setScrolled(window.scrollY > 64);
        return;
      }

      if (isCatalog) {
        const hero = document.querySelector(".catalog-hero");
        if (hero) {
          setScrolled(
            hero.getBoundingClientRect().bottom < window.innerHeight * 0.88
          );
          return;
        }
        setScrolled(window.scrollY > 64);
        return;
      }

      setScrolled(true);
    };

    // Remount film state when route changes
    readyRef.current = false;
    setScrolled(!isFilmPage);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [isHome, isCatalog, isFilmPage]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = open || scrolled || !isFilmPage;
  const onHero = isFilmPage && !scrolled && !open;

  useGSAP(
    () => {
      const chrome = chromeRef.current;
      const left = leftRef.current;
      const right = rightRef.current;
      const linksWrap = linksWrapRef.current;
      const logo = logoRef.current;
      const mast = mastRef.current;
      const links = linkItemsRef.current.filter(Boolean);
      if (!chrome || !left || !right || !linksWrap || !logo || !mast) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const setCollapsed = () => {
        gsap.set(chrome, { autoAlpha: 0 });
        gsap.set(left, { autoAlpha: 0, x: -14 });
        gsap.set(right, { autoAlpha: 0, x: 14 });
        gsap.set(linksWrap, { autoAlpha: 0, height: 0 });
        gsap.set(links, { autoAlpha: 0, y: 10 });
        gsap.set(mast, { paddingTop: 16, paddingBottom: 16 });
        gsap.set(logo, { filter: "brightness(0) invert(1)" });
        left.style.pointerEvents = "none";
        right.style.pointerEvents = "none";
      };

      const setExpanded = () => {
        gsap.set(chrome, { autoAlpha: 1 });
        gsap.set(left, { autoAlpha: 1, x: 0 });
        gsap.set(right, { autoAlpha: 1, x: 0 });
        gsap.set(linksWrap, { autoAlpha: 1, height: "auto" });
        gsap.set(links, { autoAlpha: 1, y: 0 });
        gsap.set(mast, { paddingTop: 12, paddingBottom: 12 });
        gsap.set(logo, { filter: "none" });
        left.style.pointerEvents = "auto";
        right.style.pointerEvents = "auto";
      };

      // First paint — no animation, match scroll position
      if (!readyRef.current) {
        readyRef.current = true;
        if (onHero) setCollapsed();
        else setExpanded();
        return;
      }

      if (reduce) {
        if (onHero) setCollapsed();
        else setExpanded();
        return;
      }

      tlRef.current?.kill();

      if (onHero) {
        // —— CLOSE masthead (boutique leaves, hero returns) ——
        const tl = gsap.timeline({
          defaults: { ease: "power2.in" },
          onComplete: () => {
            left.style.pointerEvents = "none";
            right.style.pointerEvents = "none";
          },
        });
        tlRef.current = tl;

        tl.to(
          links,
          {
            autoAlpha: 0,
            y: -10,
            duration: 0.22,
            stagger: { each: 0.03, from: "end" },
            ease: "power2.in",
          },
          0
        )
          .to(
            linksWrap,
            { height: 0, autoAlpha: 0, duration: 0.32, ease: "power2.inOut" },
            0.08
          )
          .to(
            left,
            { autoAlpha: 0, x: -16, duration: 0.28, ease: "power2.in" },
            0.06
          )
          .to(
            right,
            { autoAlpha: 0, x: 16, duration: 0.28, ease: "power2.in" },
            0.06
          )
          .to(
            chrome,
            { autoAlpha: 0, duration: 0.35, ease: "power2.inOut" },
            0.1
          )
          .to(
            mast,
            {
              paddingTop: 16,
              paddingBottom: 16,
              duration: 0.35,
              ease: "power2.inOut",
            },
            0.08
          )
          .to(
            logo,
            {
              filter: "brightness(0) invert(1)",
              duration: 0.3,
              ease: "power2.inOut",
            },
            0.12
          );
      } else {
        // —— OPEN masthead (boutique covers hero) ——
        gsap.set(linksWrap, { height: "auto", autoAlpha: 0 });
        const linksH = linksWrap.scrollHeight;
        gsap.set(linksWrap, { height: 0 });
        gsap.set(links, { autoAlpha: 0, y: 14 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onStart: () => {
            left.style.pointerEvents = "auto";
            right.style.pointerEvents = "auto";
          },
        });
        tlRef.current = tl;

        tl.to(chrome, { autoAlpha: 1, duration: 0.45 }, 0)
          .to(
            mast,
            {
              paddingTop: 12,
              paddingBottom: 12,
              duration: 0.45,
              ease: "power2.out",
            },
            0
          )
          .to(
            logo,
            { filter: "none", duration: 0.4, ease: "power2.out" },
            0.04
          )
          .to(left, { autoAlpha: 1, x: 0, duration: 0.42 }, 0.1)
          .to(right, { autoAlpha: 1, x: 0, duration: 0.42 }, 0.1)
          .to(
            linksWrap,
            {
              height: linksH,
              autoAlpha: 1,
              duration: 0.48,
              ease: "power2.out",
            },
            0.14
          )
          .to(
            links,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.05,
              ease: "power3.out",
            },
            0.28
          )
          .set(linksWrap, { height: "auto" });
      }

      return () => {
        tlRef.current?.kill();
      };
    },
    { scope: headerRef, dependencies: [onHero] }
  );

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

  const primaryLinks = navLinks.filter(
    (l) => !["Home", "Contact"].includes(l.label)
  );

  const menuLinks = navLinks.map((link) => ({
    label: link.label,
    href: resolveHref(link.label, link.href),
  }));

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
        <div
          ref={chromeRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 material-glass"
        />

        <div
          ref={mastRef}
          className="nav-mast relative mx-auto w-full max-w-[1200px] px-5 py-4 sm:px-8"
        >
          <div className="relative grid h-11 grid-cols-[1fr_auto_1fr] items-center lg:h-12">
            <div
              ref={leftRef}
              className="flex items-center gap-1 justify-self-start overflow-hidden"
            >
              <MenuToggle
                open={open}
                onClick={toggleMenu}
                className={`pressable rounded-full p-1 ${
                  open || solid ? "text-ink" : "text-ivory"
                }`}
              />
            </div>

            <Link
              ref={logoRef}
              href="/"
              className="z-[70] col-start-2 inline-flex justify-self-center pressable"
              aria-label={brand.name}
              onClick={closeMenu}
            >
              <BrandLogo
                size="mark"
                priority
                className="h-9 w-auto lg:h-10"
              />
            </Link>

            <div
              ref={rightRef}
              className="flex items-center justify-self-end overflow-hidden"
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
            </div>
          </div>

          <div ref={linksWrapRef} className="overflow-hidden">
            <nav
              aria-label="Primary"
              className="mt-1 hidden justify-center pb-2 lg:flex"
              aria-hidden={onHero}
            >
              <ul className="flex items-center gap-7 xl:gap-9">
                {primaryLinks.map((link, i) => (
                  <li
                    key={link.label}
                    ref={(el) => {
                      if (el) linkItemsRef.current[i] = el;
                    }}
                  >
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
