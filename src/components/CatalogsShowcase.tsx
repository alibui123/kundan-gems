"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState, type TouchEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATALOGS, catalogMeta, type Catalog } from "@/lib/catalogs";
import { isLocalPublicSrc } from "@/lib/local-image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HOUSE_ACCENTS: Record<Catalog, string> = {
  mehr: "#e8a5b0",
  noor: "#e8cf94",
  rozana: "#d4b385",
};

const NUMS: Record<Catalog, string> = { mehr: "01", noor: "02", rozana: "03" };

const REST_GROW = 1;
const LEAD_GROW = 1.15;
const RECEDES_GROW = 0.62;
const ACTIVE_GROW = 2.7;

/** Mobile elastic deck — pixel heights (GSAP owns these; React must not). */
const MOBILE_IDLE_H = 60;
const MOBILE_DECK_GAP = 8; // matches gap-2

/**
 * The houses — desktop triptych + mobile elastic deck.
 * Mobile direction from 21st.dev Elastic Gallery / Scrollable Card Stack:
 * one house claims the frame; the other two recede to numbered strips.
 * Swipe or tap to change; GSAP drives the expand.
 */
export function CatalogsShowcase() {
  const rootRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const [mobileActive, setMobileActive] = useState(0);
  const touchStartY = useRef(0);
  const touchLocked = useRef(false);
  const deckLaidOut = useRef(false);

  const selectHouse = useCallback((index: number) => {
    setMobileActive((prev) => {
      if (index < 0 || index >= CATALOGS.length || index === prev) return prev;
      return index;
    });
  }, []);

  useGSAP(
    (context, contextSafe) => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;

      const eyebrow = rootRef.current?.querySelector<HTMLElement>(
        ".houses-eyebrow-inner"
      );
      const title = rootRef.current?.querySelector<HTMLElement>(
        ".houses-title-inner"
      );
      const lede = rootRef.current?.querySelector<HTMLElement>(".houses-lede");
      const panels = gsap.utils.toArray<HTMLElement>(".house-panel");
      const deck = deckRef.current;
      const triptych = rootRef.current?.querySelector<HTMLElement>(
        ".house-triptych"
      );

      if (reduce) {
        gsap.set(
          [
            ".houses-eyebrow-inner",
            ".houses-title-inner",
            ".houses-lede",
            ".house-panel",
            ".house-deck",
            ".house-panel-detail",
          ],
          { clearProps: "all", opacity: 1, y: 0, yPercent: 0 }
        );
        return;
      }

      if (eyebrow) gsap.set(eyebrow, { yPercent: 110 });
      if (title) gsap.set(title, { yPercent: 115 });
      if (lede) gsap.set(lede, { y: 22, autoAlpha: 0 });
      if (triptych) gsap.set(triptych, { y: 36, autoAlpha: 0 });
      if (deck) gsap.set(deck, { y: 36, autoAlpha: 0 });
      if (panels.length) {
        gsap.set(panels, { autoAlpha: 0, y: 28 });
        panels.forEach((panel) => {
          const isLead = panel.classList.contains("house-panel--lead");
          gsap.set(panel, { flexGrow: isLead ? LEAD_GROW : REST_GROW });
          const detail = panel.querySelector<HTMLElement>(".house-panel-detail");
          const heading = panel.querySelector<HTMLElement>(".house-panel-title");
          if (detail) gsap.set(detail, { height: 0, autoAlpha: 0, marginTop: 0 });
          if (heading) {
            gsap.set(heading, { fontSize: "clamp(1.85rem, 3.2vw, 2.6rem)" });
          }
        });
      }

      let introPlayed = false;
      const playIntro = () => {
        if (introPlayed) return;
        introPlayed = true;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (eyebrow) tl.to(eyebrow, { yPercent: 0, duration: 0.85 }, 0);
        if (title) tl.to(title, { yPercent: 0, duration: 1.05 }, 0.12);
        if (lede) tl.to(lede, { y: 0, autoAlpha: 1, duration: 0.8 }, 0.32);
        if (triptych) tl.to(triptych, { y: 0, autoAlpha: 1, duration: 0.95 }, 0.42);
        if (deck) tl.to(deck, { y: 0, autoAlpha: 1, duration: 0.95 }, 0.42);
        if (panels.length) {
          tl.to(
            panels,
            { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1 },
            0.5
          );
        }
      };

      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 78%",
        once: true,
        invalidateOnRefresh: true,
        onEnter: playIntro,
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const raf = requestAnimationFrame(() => {
        refresh();
        const rect = rootRef.current?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight * 0.78) playIntro();
      });
      const safety = window.setTimeout(playIntro, 2800);

      const cleanups: Array<() => void> = [
        () => {
          window.clearTimeout(safety);
          window.removeEventListener("load", refresh);
          cancelAnimationFrame(raf);
          st.kill();
        },
      ];

      if (finePointer && panels.length && triptych && contextSafe) {
        const activate = contextSafe((active: HTMLElement) => {
          panels.forEach((panel) => {
            const isActive = panel === active;
            const detail = panel.querySelector<HTMLElement>(".house-panel-detail");
            const heading = panel.querySelector<HTMLElement>(".house-panel-title");
            const img = panel.querySelector<HTMLElement>("img");

            gsap.to(panel, {
              flexGrow: isActive ? ACTIVE_GROW : RECEDES_GROW,
              duration: 0.85,
              ease: "power3.out",
              overwrite: "auto",
            });

            if (heading) {
              gsap.to(heading, {
                fontSize: isActive
                  ? "clamp(3rem, 5.6vw, 5.25rem)"
                  : "clamp(1.85rem, 3.2vw, 2.6rem)",
                duration: 0.7,
                ease: "power3.out",
                overwrite: "auto",
              });
            }

            if (detail) {
              if (isActive) {
                gsap.to(detail, {
                  height: "auto",
                  autoAlpha: 1,
                  marginTop: 14,
                  duration: 0.65,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              } else {
                gsap.to(detail, {
                  height: 0,
                  autoAlpha: 0,
                  marginTop: 0,
                  duration: 0.45,
                  ease: "power2.inOut",
                  overwrite: "auto",
                });
              }
            }

            if (img) {
              gsap.to(img, {
                scale: isActive ? 1.05 : 1,
                duration: 1.2,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          });
        });

        const reset = contextSafe(() => {
          panels.forEach((panel) => {
            const isLead = panel.classList.contains("house-panel--lead");
            const detail = panel.querySelector<HTMLElement>(".house-panel-detail");
            const heading = panel.querySelector<HTMLElement>(".house-panel-title");
            const img = panel.querySelector<HTMLElement>("img");

            gsap.to(panel, {
              flexGrow: isLead ? LEAD_GROW : REST_GROW,
              duration: 0.85,
              ease: "power3.out",
              overwrite: "auto",
            });

            if (heading) {
              gsap.to(heading, {
                fontSize: "clamp(1.85rem, 3.2vw, 2.6rem)",
                duration: 0.7,
                ease: "power3.out",
                overwrite: "auto",
              });
            }

            if (detail) {
              gsap.to(detail, {
                height: 0,
                autoAlpha: 0,
                marginTop: 0,
                duration: 0.45,
                ease: "power2.inOut",
                overwrite: "auto",
              });
            }

            if (img) {
              gsap.to(img, {
                scale: 1,
                duration: 1,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          });
        });

        const handlers = panels.map((panel) => {
          const enter = () => activate(panel);
          panel.addEventListener("pointerenter", enter);
          panel.addEventListener("focus", enter);
          return { panel, enter };
        });

        triptych.addEventListener("pointerleave", reset);

        cleanups.push(() => {
          handlers.forEach(({ panel, enter }) => {
            panel.removeEventListener("pointerenter", enter);
            panel.removeEventListener("focus", enter);
          });
          triptych.removeEventListener("pointerleave", reset);
        });
      }

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: rootRef }
  );

  // Mobile elastic deck — GSAP owns heights/opacity. React must not set the
  // target flexGrow/opacity on render or the tween has nothing left to animate.
  useGSAP(
    () => {
      const deck = deckRef.current;
      if (!deck) return;

      const bands = gsap.utils.toArray<HTMLElement>(".house-band", deck);
      if (bands.length === 0) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const sizes = () => {
        const deckH = deck.clientHeight;
        const gaps = MOBILE_DECK_GAP * (bands.length - 1);
        const idle = MOBILE_IDLE_H;
        const active = Math.max(
          220,
          deckH - gaps - idle * (bands.length - 1)
        );
        return { idle, active };
      };

      const apply = (animate: boolean) => {
        const { idle, active } = sizes();
        const duration = reduce || !animate ? 0 : 0.85;

        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut", overwrite: true },
        });

        bands.forEach((band, i) => {
          const isActive = i === mobileActive;
          const copy = band.querySelector<HTMLElement>(".house-band-copy");
          const strip = band.querySelector<HTMLElement>(".house-band-strip");
          const img = band.querySelector<HTMLElement>("img");

          tl.to(
            band,
            {
              height: isActive ? active : idle,
              duration,
            },
            0
          );

          if (strip) {
            tl.to(
              strip,
              {
                autoAlpha: isActive ? 0 : 1,
                duration: duration ? 0.35 : 0,
                ease: "power2.out",
              },
              0
            );
          }

          if (copy) {
            if (isActive) {
              tl.fromTo(
                copy,
                { autoAlpha: 0, y: 16 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: duration ? 0.5 : 0,
                  ease: "power3.out",
                  immediateRender: false,
                },
                duration ? 0.28 : 0
              );
            } else {
              tl.to(
                copy,
                {
                  autoAlpha: 0,
                  y: 10,
                  duration: duration ? 0.22 : 0,
                  ease: "power2.in",
                },
                0
              );
            }
          }

          if (img) {
            tl.to(
              img,
              {
                scale: isActive ? 1.03 : 1.1,
                duration: duration ? 0.9 : 0,
                ease: "power2.out",
              },
              0
            );
          }
        });
      };

      const first = !deckLaidOut.current;
      deckLaidOut.current = true;
      apply(!first);

      const onResize = () => apply(false);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: deckRef, dependencies: [mobileActive], revertOnUpdate: false }
  );

  const onDeckTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchLocked.current = false;
  };

  const onDeckTouchMove = (e: TouchEvent) => {
    if (touchLocked.current) return;
    const delta = touchStartY.current - e.touches[0].clientY;
    if (Math.abs(delta) < 56) return;
    touchLocked.current = true;
    if (delta > 0) selectHouse(mobileActive + 1);
    else selectHouse(mobileActive - 1);
  };

  return (
    <section
      ref={rootRef}
      id="catalogs"
      className="houses-section relative bg-[#faf9f7] text-ink"
      aria-label="The houses"
    >
      <header className="relative z-10 px-6 pb-10 pt-20 sm:px-10 md:pb-14 md:pt-28 lg:px-14 lg:pt-32">
        <p className="houses-eyebrow overflow-hidden">
          <span className="houses-eyebrow-inner block text-[10px] tracking-[0.36em] text-gold uppercase">
            The houses
          </span>
        </p>
        <h2 className="mt-4 max-w-lg font-display text-[clamp(2.5rem,6vw,4.25rem)] font-normal leading-[0.95] tracking-[0.02em] uppercase">
          <span className="houses-title block overflow-hidden">
            <span className="houses-title-inner block">Three names, one hand</span>
          </span>
        </h2>
        <p className="houses-lede mt-5 max-w-md text-[14px] leading-[1.75] text-muted">
          Bridal warmth, high-jewellery light, and gold for every day —
          composed under three names, made by the same atelier.{" "}
          <span className="md:hidden">Tap or swipe a house to step inside.</span>
          <span className="hidden md:inline">
            Rest a cursor on one to step inside.
          </span>
        </p>
      </header>

      {/* Desktop / fine-pointer — interactive triptych */}
      <div className="relative z-10 hidden px-6 pb-24 md:block md:px-10 md:pb-28 lg:px-14 lg:pb-36">
        <div className="house-triptych flex gap-4 overflow-hidden rounded-[1.75rem] shadow-[0_28px_70px_rgba(14,12,10,0.1)] lg:gap-5">
          {CATALOGS.map((slug) => {
            const item = catalogMeta[slug];
            const accent = HOUSE_ACCENTS[slug];
            const lead = slug === "mehr";
            return (
              <Link
                key={slug}
                href={`/catalogs/${slug}`}
                className={`house-panel group relative block h-full overflow-hidden ${
                  lead ? "house-panel--lead" : ""
                }`}
                aria-label={`House ${NUMS[slug]} — ${item.title}. ${item.tagline}`}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  priority={lead}
                  sizes="(max-width: 1279px) 45vw, 32vw"
                  unoptimized={isLocalPublicSrc(item.image)}
                  className="object-cover will-change-transform"
                  style={{ objectPosition: item.objectPosition }}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  aria-hidden
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(14,12,10,0.02) 0%, rgba(14,12,10,0.08) 42%, rgba(14,12,10,0.88) 100%)",
                  }}
                />

                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <p
                    className="text-[10px] font-medium tracking-[0.3em] uppercase"
                    style={{ color: accent }}
                  >
                    House {NUMS[slug]}
                  </p>
                  <h3 className="house-panel-title mt-2 font-display font-normal uppercase text-ivory">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 font-display text-lg text-ivory/60">
                    {item.urduHint}
                  </p>

                  <div className="house-panel-detail overflow-hidden">
                    <p className="max-w-xs text-[13px] leading-[1.7] text-ivory/65">
                      {item.tagline}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-3 text-[10px] font-medium tracking-[0.24em] text-ivory uppercase">
                      Open the house
                      <span className="h-px w-8 bg-current" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile — elastic house deck (21st-inspired expandable stack) */}
      <div className="relative z-10 px-5 pb-16 sm:px-8 md:hidden">
        <div
          ref={deckRef}
          className="house-deck flex h-[min(78svh,640px)] flex-col gap-2 overflow-hidden rounded-[1.5rem] shadow-[0_24px_60px_rgba(14,12,10,0.12)]"
          onTouchStart={onDeckTouchStart}
          onTouchMove={onDeckTouchMove}
          role="listbox"
          aria-label="Choose a house"
          aria-activedescendant={`house-band-${CATALOGS[mobileActive]}`}
        >
          {CATALOGS.map((slug, i) => {
            const item = catalogMeta[slug];
            const accent = HOUSE_ACCENTS[slug];
            const isActive = i === mobileActive;
            return (
              <div
                key={slug}
                id={`house-band-${slug}`}
                role="option"
                aria-selected={isActive}
                className="house-band relative shrink-0 overflow-hidden rounded-[1.15rem]"
                style={{ flex: "0 0 auto" }}
              >
                <button
                  type="button"
                  className="absolute inset-0 z-[1] cursor-pointer"
                  aria-label={
                    isActive
                      ? `House ${NUMS[slug]} ${item.title}, selected`
                      : `Show house ${NUMS[slug]} — ${item.title}`
                  }
                  onClick={() => {
                    if (!isActive) selectHouse(i);
                  }}
                />

                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  unoptimized={isLocalPublicSrc(item.image)}
                  className="object-cover will-change-transform"
                  style={{ objectPosition: item.objectPosition }}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  aria-hidden
                  style={{
                    background: isActive
                      ? "linear-gradient(180deg, rgba(14,12,10,0.05) 0%, transparent 38%, rgba(14,12,10,0.84) 100%)"
                      : "linear-gradient(90deg, rgba(14,12,10,0.55) 0%, rgba(14,12,10,0.28) 100%)",
                  }}
                />

                {/* Collapsed strip label — opacity owned by GSAP */}
                <div
                  className="house-band-strip pointer-events-none absolute inset-0 z-[2] flex items-center justify-between px-5"
                  aria-hidden={isActive}
                >
                  <span
                    className="text-[10px] font-medium tracking-[0.28em] uppercase"
                    style={{ color: accent }}
                  >
                    House {NUMS[slug]}
                  </span>
                  <span className="font-display text-[1.35rem] uppercase leading-none tracking-[0.04em] text-ivory">
                    {item.title}
                  </span>
                  <span className="font-display text-base text-ivory/55" lang="ur" dir="rtl">
                    {item.urduHint}
                  </span>
                </div>

                {/* Expanded story — opacity owned by GSAP */}
                <div className="house-band-copy pointer-events-none absolute inset-x-0 bottom-0 z-[2] p-6">
                  <p
                    className="text-[10px] font-medium tracking-[0.3em] uppercase"
                    style={{ color: accent }}
                  >
                    House {NUMS[slug]} · {item.subtitle}
                  </p>
                  <h3 className="mt-2 font-display text-[clamp(2.25rem,9vw,3rem)] font-normal uppercase leading-[0.95] text-ivory">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 font-display text-lg text-ivory/60" lang="ur" dir="rtl">
                    {item.urduHint}
                  </p>
                  <p className="mt-3 max-w-xs text-[13px] leading-[1.65] text-ivory/65">
                    {item.tagline}
                  </p>
                  <Link
                    href={`/catalogs/${slug}`}
                    className="pointer-events-auto mt-5 inline-flex items-center gap-3 text-[10px] font-medium tracking-[0.24em] text-ivory uppercase"
                    tabIndex={isActive ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open the house
                    <span className="h-px w-8 bg-current" aria-hidden />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="mt-5 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="House index"
        >
          {CATALOGS.map((slug, i) => {
            const isActive = i === mobileActive;
            return (
              <button
                key={slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${catalogMeta[slug].title}`}
                onClick={() => selectHouse(i)}
                className="h-1.5 rounded-full transition-[width,background-color] duration-500"
                style={{
                  width: isActive ? 28 : 8,
                  backgroundColor: isActive
                    ? HOUSE_ACCENTS[slug]
                    : "rgba(14,12,10,0.18)",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
