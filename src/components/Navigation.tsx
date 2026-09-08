"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { brand, collections, navLinks } from "@/lib/data";
import { CATALOGS, catalogMeta } from "@/lib/catalogs";
import { materialMeta, type Material } from "@/lib/products";
import { kundanProductImages } from "@/lib/product-assets";
import { useCart } from "@/components/CartProvider";
import { BrandLogo } from "@/components/BrandLogo";
import { MenuToggle, MobileMenu } from "@/components/MobileMenu";

gsap.registerPlugin(useGSAP);

type MegaPanel = "catalogs" | "materials" | "forms" | "edit" | null;

const MATERIAL_NAV: Material[] = ["gold", "diamond", "ruby"];

const EDIT_NAV = [
  {
    title: "New Arrivals",
    subtitle: "Just arrived",
    tagline: "Fresh compositions from the atelier",
    href: "/collections/new-arrivals",
    image: kundanProductImages.necklaces,
  },
  {
    title: "Best Sellers",
    subtitle: "Most sought",
    tagline: "Pieces the maison returns to",
    href: "/collections/best-sellers",
    image: kundanProductImages.rings,
  },
  {
    title: "Signature",
    subtitle: "Maison edit",
    tagline: "Limited works with museum precision",
    href: "/collections/signature",
    image: kundanProductImages.bracelets,
  },
] as const;

const MEGA_LABELS: Record<Exclude<MegaPanel, null>, string> = {
  catalogs: "Catalogs",
  materials: "Materials",
  forms: "Forms",
  edit: "The Edit",
};

type NavigationProps = {
  variant?: "auto" | "light" | "dark";
};

/**
 * Floating nav — logo-only on film heroes; GSAP masthead open/close.
 * Primary items open page destinations (mega panels or direct routes).
 */
export function Navigation({ variant: _variant = "auto" }: NavigationProps) {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<MegaPanel>(null);
  const isHome = pathname === "/";
  const isCatalog = pathname.startsWith("/catalogs/");
  const isMaterialPage = pathname.startsWith("/materials/");
  const isFilmPage = isHome || isCatalog || isMaterialPage;

  const headerRef = useRef<HTMLElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const mastRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const linksWrapRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const catalogsPanelRef = useRef<HTMLDivElement>(null);
  const materialsPanelRef = useRef<HTMLDivElement>(null);
  const formsPanelRef = useRef<HTMLDivElement>(null);
  const editPanelRef = useRef<HTMLDivElement>(null);
  const panelTlRef = useRef<gsap.core.Timeline | null>(null);
  const megaWasRef = useRef<MegaPanel>(null);
  const linkItemsRef = useRef<HTMLLIElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const readyRef = useRef(false);

  const closeMenu = useCallback(() => setOpen(false), []);
  const closeMega = useCallback(() => setMega(null), []);
  const toggleMenu = useCallback(() => {
    setMega(null);
    setOpen((v) => !v);
  }, []);
  const toggleMega = useCallback((panel: Exclude<MegaPanel, null>) => {
    setOpen(false);
    setMega((v) => (v === panel ? null : panel));
  }, []);

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

      if (isMaterialPage) {
        const hero = document.querySelector(".material-hero");
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

    readyRef.current = false;
    setScrolled(!isFilmPage);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [isHome, isCatalog, isMaterialPage, isFilmPage]);

  useEffect(() => {
    setOpen(false);
    setMega(null);
  }, [pathname]);

  useEffect(() => {
    if (!mega) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMega(null);
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (headerRef.current && !headerRef.current.contains(t)) {
        setMega(null);
      }
    };
    const onScroll = () => setMega(null);

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mega]);

  useGSAP(
    () => {
      const panels: Record<Exclude<MegaPanel, null>, HTMLElement | null> = {
        catalogs: catalogsPanelRef.current,
        materials: materialsPanelRef.current,
        forms: formsPanelRef.current,
        edit: editPanelRef.current,
      };
      if (Object.values(panels).some((p) => !p)) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const hidePanel = (panel: HTMLElement) => {
        const cards = panel.querySelectorAll("[data-mega-card]");
        gsap.set(panel, {
          autoAlpha: 0,
          height: 0,
          pointerEvents: "none",
          visibility: "hidden",
          overflow: "hidden",
        });
        gsap.set(cards, { autoAlpha: 0, y: 18 });
      };

      const openPanel = (panel: HTMLElement) => {
        const cards = gsap.utils.toArray<HTMLElement>(
          panel.querySelectorAll("[data-mega-card]")
        );
        gsap.set(panel, {
          autoAlpha: 1,
          pointerEvents: "auto",
          visibility: "visible",
          overflow: "hidden",
        });
        gsap.set(panel, { height: "auto" });
        const h = panel.offsetHeight;

        if (reduce) {
          gsap.set(panel, { height: "auto", overflow: "visible" });
          gsap.set(cards, { autoAlpha: 1, y: 0 });
          return;
        }

        gsap.set(panel, { height: 0 });
        gsap.set(cards, { autoAlpha: 0, y: 18 });
        panelTlRef.current = gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(panel, { height: h, duration: 0.42, ease: "power2.out" })
          .to(
            cards,
            { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.07 },
            0.12
          )
          .set(panel, { height: "auto", overflow: "visible" });
      };

      const closePanel = (panel: HTMLElement) => {
        const cards = gsap.utils.toArray<HTMLElement>(
          panel.querySelectorAll("[data-mega-card]")
        );

        if (reduce) {
          hidePanel(panel);
          return;
        }

        const h = panel.offsetHeight || panel.scrollHeight;
        gsap.set(panel, {
          height: h,
          overflow: "hidden",
          pointerEvents: "none",
          visibility: "visible",
          autoAlpha: 1,
        });

        panelTlRef.current = gsap
          .timeline({
            defaults: { ease: "power2.in" },
            onComplete: () => {
              gsap.set(panel, {
                autoAlpha: 0,
                height: 0,
                visibility: "hidden",
              });
            },
          })
          .to(
            cards,
            {
              autoAlpha: 0,
              y: -12,
              duration: 0.22,
              stagger: { each: 0.04, from: "end" },
            },
            0
          )
          .to(panel, { height: 0, duration: 0.36, ease: "power2.inOut" }, 0.08);
      };

      panelTlRef.current?.kill();

      const prev = megaWasRef.current;
      const panelFor = (key: MegaPanel) =>
        key ? panels[key] : null;

      if (mega) {
        const incoming = panelFor(mega)!;
        const outgoing = prev && prev !== mega ? panelFor(prev) : null;
        if (outgoing) hidePanel(outgoing);
        megaWasRef.current = mega;
        openPanel(incoming);
        return;
      }

      if (!prev) {
        (Object.keys(panels) as Exclude<MegaPanel, null>[]).forEach((key) =>
          hidePanel(panels[key]!)
        );
        return;
      }

      megaWasRef.current = null;
      closePanel(panelFor(prev)!);
    },
    { dependencies: [mega] }
  );

  const solid = open || scrolled || !isFilmPage || mega !== null;
  const onHero = isFilmPage && !scrolled && !open && mega === null;

  useGSAP(
    () => {
      const chrome = chromeRef.current;
      const left = leftRef.current;
      const right = rightRef.current;
      const linksWrap = linksWrapRef.current;
      const logo = logoRef.current;
      const mast = mastRef.current;
      if (!chrome || !left || !right || !linksWrap || !logo || !mast) return;

      const links = () => linkItemsRef.current.filter(Boolean);
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, isMobile, reduceMotion } = context.conditions!;

          const setCollapsedDesktop = () => {
            gsap.set(chrome, { autoAlpha: 0, y: 0 });
            gsap.set(left, { autoAlpha: 0, x: -14 });
            gsap.set(right, { autoAlpha: 0, x: 14 });
            gsap.set(linksWrap, { autoAlpha: 0, height: 0 });
            gsap.set(links(), { autoAlpha: 0, y: 10 });
            gsap.set(mast, { paddingTop: 16, paddingBottom: 16 });
            gsap.set(logo, { filter: "brightness(0) invert(1)" });
            left.style.pointerEvents = "none";
            right.style.pointerEvents = "none";
          };

          const setExpandedDesktop = () => {
            gsap.set(chrome, { autoAlpha: 1, y: 0 });
            gsap.set(left, { autoAlpha: 1, x: 0 });
            gsap.set(right, { autoAlpha: 1, x: 0 });
            gsap.set(linksWrap, { autoAlpha: 1, height: "auto" });
            gsap.set(links(), { autoAlpha: 1, y: 0 });
            gsap.set(mast, { paddingTop: 12, paddingBottom: 12 });
            gsap.set(logo, { filter: "none" });
            left.style.pointerEvents = "auto";
            right.style.pointerEvents = "auto";
          };

          /** Mobile: logo (+ cart) on hero; hamburger enters after scroll */
          const setCollapsedMobile = () => {
            gsap.set(chrome, { autoAlpha: 0, y: -10 });
            gsap.set(left, { autoAlpha: 0, x: -12, scale: 0.85 });
            gsap.set(right, { autoAlpha: 1, x: 0, scale: 1 });
            gsap.set(linksWrap, { autoAlpha: 0, height: 0 });
            gsap.set(mast, { paddingTop: 14, paddingBottom: 14 });
            gsap.set(logo, { filter: "brightness(0) invert(1)", y: 0 });
            left.style.pointerEvents = "none";
            right.style.pointerEvents = "auto";
          };

          const setExpandedMobile = () => {
            gsap.set(chrome, { autoAlpha: 1, y: 0 });
            gsap.set(left, { autoAlpha: 1, x: 0, scale: 1 });
            gsap.set(right, { autoAlpha: 1, x: 0, scale: 1 });
            gsap.set(linksWrap, { autoAlpha: 0, height: 0 });
            gsap.set(mast, { paddingTop: 10, paddingBottom: 10 });
            gsap.set(logo, { filter: "none", y: 0 });
            left.style.pointerEvents = "auto";
            right.style.pointerEvents = "auto";
          };

          if (!readyRef.current) {
            readyRef.current = true;
            if (isMobile) {
              if (onHero) setCollapsedMobile();
              else setExpandedMobile();
            } else if (isDesktop) {
              if (onHero) setCollapsedDesktop();
              else setExpandedDesktop();
            }
            return;
          }

          if (reduceMotion) {
            if (isMobile) {
              if (onHero) setCollapsedMobile();
              else setExpandedMobile();
            } else {
              if (onHero) setCollapsedDesktop();
              else setExpandedDesktop();
            }
            return;
          }

          tlRef.current?.kill();

          if (isMobile) {
            if (onHero) {
              const tl = gsap.timeline({
                defaults: { ease: "power2.in", force3D: true },
                onComplete: () => {
                  left.style.pointerEvents = "none";
                },
              });
              tlRef.current = tl;
              tl.to(
                left,
                {
                  autoAlpha: 0,
                  x: -14,
                  scale: 0.85,
                  duration: 0.28,
                },
                0
              )
                .to(chrome, { autoAlpha: 0, y: -8, duration: 0.34 }, 0.04)
                .to(
                  logo,
                  {
                    filter: "brightness(0) invert(1)",
                    duration: 0.3,
                  },
                  0.04
                )
                .to(
                  mast,
                  { paddingTop: 14, paddingBottom: 14, duration: 0.34 },
                  0.04
                );
            } else {
              const tl = gsap.timeline({
                defaults: { ease: "power3.out", force3D: true },
                onStart: () => {
                  right.style.pointerEvents = "auto";
                },
              });
              tlRef.current = tl;
              gsap.set(right, { autoAlpha: 1, x: 0, scale: 1 });
              gsap.set(left, { autoAlpha: 0, x: -16, scale: 0.8 });

              tl.fromTo(
                chrome,
                { autoAlpha: 0, y: -12 },
                { autoAlpha: 1, y: 0, duration: 0.42 },
                0
              )
                .to(
                  logo,
                  { filter: "none", duration: 0.38, ease: "power2.out" },
                  0.02
                )
                .to(
                  mast,
                  { paddingTop: 10, paddingBottom: 10, duration: 0.38 },
                  0
                )
                .to(
                  left,
                  {
                    autoAlpha: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.48,
                    ease: "power3.out",
                    onStart: () => {
                      left.style.pointerEvents = "auto";
                    },
                  },
                  0.22
                );
            }
            return;
          }

          // Desktop film masthead
          if (onHero) {
            const items = links();
            const tl = gsap.timeline({
              defaults: { ease: "power2.in" },
              onComplete: () => {
                left.style.pointerEvents = "none";
                right.style.pointerEvents = "none";
              },
            });
            tlRef.current = tl;

            tl.to(
              items,
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
                {
                  height: 0,
                  autoAlpha: 0,
                  duration: 0.32,
                  ease: "power2.inOut",
                },
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
                { autoAlpha: 0, y: 0, duration: 0.35, ease: "power2.inOut" },
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
            const items = links();
            gsap.set(linksWrap, { height: "auto", autoAlpha: 0 });
            const linksH = linksWrap.scrollHeight;
            gsap.set(linksWrap, { height: 0 });
            gsap.set(items, { autoAlpha: 0, y: 14 });

            const tl = gsap.timeline({
              defaults: { ease: "power3.out" },
              onStart: () => {
                left.style.pointerEvents = "auto";
                right.style.pointerEvents = "auto";
              },
            });
            tlRef.current = tl;

            tl.to(chrome, { autoAlpha: 1, y: 0, duration: 0.45 }, 0)
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
                items,
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
        }
      );

      return () => {
        tlRef.current?.kill();
        mm.revert();
      };
    },
    { scope: headerRef, dependencies: [onHero] }
  );

  const primaryLinks = navLinks.filter((l) => l.label !== "Contact");

  const menuLinks = navLinks.map((link) => ({
    label: link.label,
    href: link.href,
  }));

  const linkTone = solid
    ? "text-ink/65 hover:text-ink"
    : "text-ivory/70 hover:text-ivory";

  const labelToMega = (label: string): Exclude<MegaPanel, null> | null => {
    if (label === "Catalogs") return "catalogs";
    if (label === "Materials") return "materials";
    if (label === "Forms") return "forms";
    if (label === "The Edit") return "edit";
    return null;
  };

  const megaTrigger = (
    panel: Exclude<MegaPanel, null>,
    controlsId: string
  ) => {
    const isOpen = mega === panel;
    return (
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={controlsId}
        tabIndex={onHero ? -1 : 0}
        onClick={() => toggleMega(panel)}
        className={`pressable relative inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-200 ${
          isOpen ? "text-ink" : linkTone
        }`}
      >
        {MEGA_LABELS[panel]}
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          aria-hidden
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            d="M2.5 4.5L6 8l3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  };

  const megaShell = (
    id: string,
    panelRef: RefObject<HTMLDivElement | null>,
    openKey: Exclude<MegaPanel, null>,
    ariaLabel: string,
    heading: string,
    blurb: string,
    children: ReactNode
  ) => (
    <div
      id={id}
      ref={panelRef}
      role="region"
      aria-label={ariaLabel}
      className="absolute inset-x-0 top-full hidden overflow-hidden lg:block"
      aria-hidden={mega !== openKey}
    >
      <div className="material-glass border-y border-white/50 shadow-[0_18px_40px_rgba(7,9,14,0.08)]">
        <div className="mx-auto max-w-[1200px] px-6 py-8 sm:px-8 md:py-10">
          <div className="mb-6">
            <p className="font-display text-[1.65rem] tracking-[0.02em] text-ink md:text-[1.85rem]">
              {heading}
            </p>
            <p className="mt-1 max-w-md text-[13px] leading-relaxed text-muted">
              {blurb}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );

  const megaCard = (
    key: string,
    href: string,
    image: string,
    alt: string,
    subtitle: string,
    title: string,
    tagline: string,
    objectPosition?: string
  ) => (
    <Link
      key={key}
      href={href}
      data-mega-card
      onClick={closeMega}
      className="group relative block overflow-hidden border border-border/80 bg-paper pressable"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 33vw, 360px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={objectPosition ? { objectPosition } : undefined}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/75 via-void/15 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-5 text-ivory md:p-6">
          <p className="text-[10px] tracking-[0.28em] text-gold uppercase">
            {subtitle}
          </p>
          <p className="mt-2 font-display text-[1.75rem] leading-none tracking-[0.02em] md:text-[2rem]">
            {title}
          </p>
          <p className="mt-2 max-w-[22ch] text-[12px] leading-relaxed text-ivory/70">
            {tagline}
          </p>
        </div>
      </div>
    </Link>
  );

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
                className={`pressable rounded-full p-1 lg:hidden ${
                  open || solid ? "text-ink" : "text-ivory"
                }`}
              />
            </div>

            <Link
              ref={logoRef}
              href="/"
              className="z-[70] col-start-2 inline-flex justify-self-center pressable"
              aria-label={brand.name}
              onClick={() => {
                closeMenu();
                closeMega();
              }}
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
                tabIndex={0}
                onClick={() => {
                  closeMenu();
                  closeMega();
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
                {primaryLinks.map((link, i) => {
                  const megaKey = labelToMega(link.label);
                  return (
                    <li
                      key={link.label}
                      ref={(el) => {
                        if (el) linkItemsRef.current[i] = el;
                      }}
                    >
                      {megaKey ? (
                        megaTrigger(megaKey, `nav-${megaKey}-panel`)
                      ) : (
                        <Link
                          href={link.href}
                          tabIndex={onHero ? -1 : 0}
                          onClick={closeMega}
                          className={`pressable relative rounded-md px-1 py-0.5 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-200 ${linkTone}`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        {megaShell(
          "nav-catalogs-panel",
          catalogsPanelRef,
          "catalogs",
          "Maison catalogs",
          "The houses",
          "Three named lines — bridal warmth, high jewellery light, and everyday gold.",
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {CATALOGS.map((slug) => {
              const meta = catalogMeta[slug];
              return megaCard(
                slug,
                `/catalogs/${slug}`,
                meta.image,
                `${meta.title} — ${meta.subtitle}`,
                meta.subtitle,
                meta.title,
                meta.tagline,
                meta.objectPosition
              );
            })}
          </div>
        )}

        {megaShell(
          "nav-materials-panel",
          materialsPanelRef,
          "materials",
          "Maison materials",
          "The materials",
          "Gold, diamond, and ruby — three rivers of light, warmth, and living color.",
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {MATERIAL_NAV.map((slug) => {
              const meta = materialMeta[slug];
              return megaCard(
                slug,
                `/materials/${slug}`,
                meta.image,
                meta.campaign.imageAlt,
                meta.subtitle,
                meta.title,
                meta.campaign.tag
              );
            })}
          </div>
        )}

        {megaShell(
          "nav-forms-panel",
          formsPanelRef,
          "forms",
          "Shop by form",
          "By silhouette",
          "Start with the shape — rings, necklaces, and bracelets from the maison.",
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {collections.map((item) =>
              megaCard(
                item.href,
                item.href,
                item.image,
                `${item.title} — ${item.subtitle}`,
                item.subtitle,
                item.title,
                "Shop the collection"
              )
            )}
          </div>
        )}

        {megaShell(
          "nav-edit-panel",
          editPanelRef,
          "edit",
          "The edit",
          "The edit",
          "New arrivals, best sellers, and the signature maison selection.",
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {EDIT_NAV.map((item) =>
              megaCard(
                item.href,
                item.href,
                item.image,
                `${item.title} — ${item.subtitle}`,
                item.subtitle,
                item.title,
                item.tagline
              )
            )}
          </div>
        )}
      </header>

      {mega ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 hidden bg-void/20 lg:block"
          onClick={closeMega}
        />
      ) : null}

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
