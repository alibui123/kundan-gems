"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATALOGS, catalogMeta, type Catalog } from "@/lib/catalogs";
import { isLocalPublicSrc } from "@/lib/local-image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PANEL_W = "min(86vw, 920px)";

/**
 * Catalog runway —
 * Desktop: pinned horizontal scrub.
 * Mobile: full-bleed houses with a lens-push dissolve (not card peel).
 */
export function CatalogsShowcase() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobilePinRef = useRef<HTMLDivElement>(null);
  const indexRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useGSAP(
    () => {
      const root = rootRef.current;
      const pin = pinRef.current;
      const track = trackRef.current;
      const mobilePin = mobilePinRef.current;
      if (!root) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const fine = window.matchMedia("(min-width: 768px)").matches;

      const cleanups: Array<() => void> = [];

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      requestAnimationFrame(refresh);
      const late = window.setTimeout(refresh, 600);
      cleanups.push(() => {
        window.removeEventListener("load", refresh);
        window.clearTimeout(late);
      });

      /* —— Desktop horizontal runway —— */
      if (fine && !reduce && pin && track) {
        const panels = gsap.utils.toArray<HTMLElement>(".cat-panel");
        const getScroll = () =>
          Math.max(0, track.scrollWidth - pin.clientWidth + 48);

        gsap.set(panels, { opacity: 0.35, scale: 0.94 });
        gsap.set(panels[0], { opacity: 1, scale: 1 });

        const tween = gsap.to(track, {
          x: () => -getScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () =>
              `+=${Math.max(getScroll() * 1.4, window.innerHeight * 2.2)}`,
            pin: pin,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            pinSpacing: true,
            onUpdate: (self) => {
              const p = self.progress;
              const idx = Math.min(
                panels.length - 1,
                Math.round(p * (panels.length - 1))
              );
              panels.forEach((panel, i) => {
                const active = i === idx;
                gsap.to(panel, {
                  opacity: active ? 1 : 0.38,
                  scale: active ? 1 : 0.94,
                  duration: 0.35,
                  overwrite: "auto",
                });
                const btn = indexRefs.current[i];
                if (btn) {
                  btn.setAttribute("aria-current", active ? "true" : "false");
                  btn.classList.toggle("text-gold", active);
                  btn.classList.toggle("text-ink/35", !active);
                }
              });
            },
          },
        });

        gsap.fromTo(
          ".cat-stage-head > *",
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              once: true,
            },
          }
        );

        cleanups.push(() => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
      }

      /* —— Mobile: lens-push dissolve between full-bleed houses —— */
      if (!fine && mobilePin) {
        const cards = gsap.utils.toArray<HTMLElement>(
          ".cat-stack-card",
          root
        );

        if (cards.length > 0) {
          if (reduce) {
            gsap.set(mobilePin, { height: "auto", overflow: "visible" });
            cards.forEach((card) => {
              gsap.set(card, {
                position: "relative",
                inset: "auto",
                width: "100%",
                height: "100svh",
                clearProps: "transform,opacity,filter,clipPath",
              });
            });
          } else {
            cards.forEach((card, i) => {
              gsap.set(card, {
                zIndex: cards.length - i,
                scale: i === 0 ? 1 : 0.9,
                opacity: 1,
                filter: i === 0 ? "brightness(1)" : "brightness(0.45)",
                clipPath: "inset(0% 0% 0% 0%)",
                transformOrigin: "50% 50%",
              });
            });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: mobilePin,
                start: "top top",
                end: () =>
                  `+=${Math.max(window.innerHeight * 0.95, 580) * Math.max(cards.length - 1, 1)}`,
                pin: true,
                scrub: 0.85,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                pinSpacing: true,
              },
            });

            cards.forEach((card, i) => {
              if (i >= cards.length - 1) return;
              const next = cards[i + 1];

              /* Current house — push past the lens, soft vignette close */
              tl.to(
                card,
                {
                  scale: 1.18,
                  opacity: 0,
                  filter: "brightness(1.2)",
                  clipPath: "inset(12% 10% 12% 10%)",
                  ease: "none",
                  duration: 1,
                },
                i
              );

              /* Incoming house — rises from depth into focus */
              tl.to(
                next,
                {
                  scale: 1,
                  filter: "brightness(1)",
                  ease: "none",
                  duration: 1,
                },
                i
              );

              for (let j = i + 2; j < cards.length; j++) {
                const depth = j - i - 1;
                tl.to(
                  cards[j],
                  {
                    scale: 0.9 - (depth - 1) * 0.03,
                    filter: `brightness(${Math.max(0.28, 0.45 - (depth - 1) * 0.1)})`,
                    ease: "none",
                    duration: 1,
                  },
                  i
                );
              }
            });

            cleanups.push(() => {
              tl.scrollTrigger?.kill();
              tl.kill();
            });
          }
        }
      }

      return () => {
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: rootRef, dependencies: [] }
  );

  const scrollToHouse = (slug: Catalog) => {
    const root = rootRef.current;
    if (!root) return;
    const st = ScrollTrigger.getAll().find((t) => t.trigger === root);
    if (!st) {
      document
        .getElementById(`cat-panel-${slug}`)
        ?.scrollIntoView({ behavior: "smooth", inline: "center" });
      return;
    }
    const i = CATALOGS.indexOf(slug);
    const p = CATALOGS.length <= 1 ? 0 : i / (CATALOGS.length - 1);
    const y = st.start + (st.end - st.start) * p;
    const lenis = (
      window as Window & {
        __lenis?: { scrollTo: (n: number, o?: { duration?: number }) => void };
      }
    ).__lenis;
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      ref={rootRef}
      id="catalogs"
      className="relative bg-white text-ink"
      aria-label="Catalogs"
    >
      {/* Mobile: full-bleed Gold-style posters, stacked peel on scroll */}
      <div className="md:hidden bg-white">
        <header className="px-6 pb-8 pt-16">
          <p className="text-[10px] tracking-[0.36em] text-gold uppercase">
            The houses
          </p>
          <h2 className="mt-3 font-display text-[2.4rem] font-normal tracking-[0.06em] uppercase">
            Three collections
          </h2>
          <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-muted">
            Scroll to move through Mehr, Noor, and Rozana.
          </p>
        </header>

        <div
          ref={mobilePinRef}
          className="relative h-[100svh] overflow-hidden bg-void"
        >
          {CATALOGS.map((slug, i) => {
            const item = catalogMeta[slug];
            return (
              <Link
                key={slug}
                href={`/catalogs/${slug}`}
                className="cat-stack-card group/poster absolute inset-0 block will-change-transform"
                style={{ zIndex: CATALOGS.length - i }}
                aria-label={`${item.title} — ${item.subtitle}`}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="100vw"
                    priority={i === 0}
                    unoptimized={isLocalPublicSrc(item.image)}
                    className="object-cover"
                    style={{ objectPosition: item.objectPosition }}
                  />
                </div>
                <div className="poster-glow" aria-hidden />
                <div
                  className="pointer-events-none absolute inset-0 z-[1]"
                  aria-hidden
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(14,12,10,0.35) 0%, transparent 35%, rgba(14,12,10,0.72) 100%)",
                  }}
                />
                <div className="absolute inset-0 z-[2] flex flex-col items-center justify-end px-6 pb-16 text-center">
                  <p className="text-[10px] tracking-[0.4em] text-gold uppercase">
                    House {String(i + 1).padStart(2, "0")} · {item.subtitle}
                  </p>
                  <h3 className="mt-4 font-display text-[clamp(2.75rem,12vw,4.5rem)] font-normal leading-[0.92] tracking-[0.04em] text-ivory uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[16rem] text-[13px] leading-relaxed text-ivory/65">
                    {item.tagline}
                  </p>
                  <span className="btn-solid-luxe mt-8 inline-flex h-12 items-center px-8 text-[10px] font-medium tracking-[0.26em] uppercase">
                    Open the house
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop: pinned horizontal runway */}
      <div
        ref={pinRef}
        className="relative hidden h-[100svh] flex-col overflow-hidden md:flex"
      >
        <div className="cat-stage-head relative z-20 flex shrink-0 items-end justify-between gap-8 px-10 pb-6 pt-28 lg:px-14 lg:pt-32">
          <div>
            <p className="text-[10px] tracking-[0.36em] text-gold uppercase">
              The houses
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.25rem,4vw,3.75rem)] font-normal tracking-[0.06em] uppercase">
              Three collections
            </h2>
          </div>

          <nav
            aria-label="Catalog houses"
            className="flex items-center gap-8 lg:gap-10"
          >
            {CATALOGS.map((slug, i) => {
              const item = catalogMeta[slug];
              return (
                <button
                  key={slug}
                  type="button"
                  ref={(el) => {
                    indexRefs.current[i] = el;
                  }}
                  onClick={() => scrollToHouse(slug)}
                  className={`text-[10px] font-medium tracking-[0.28em] uppercase transition-colors duration-500 ${
                    i === 0 ? "text-gold" : "text-ink/35"
                  }`}
                  aria-current={i === 0 ? "true" : "false"}
                >
                  {String(i + 1).padStart(2, "0")} {item.title}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="relative min-h-0 flex-1 pb-10 lg:pb-12">
          <div
            ref={trackRef}
            className="absolute top-0 left-0 flex h-full items-stretch gap-6 will-change-transform pl-10 pr-[14vw] lg:gap-8 lg:pl-14"
            style={{ width: "max-content" }}
          >
            {CATALOGS.map((slug, i) => {
              const item = catalogMeta[slug];
              return (
                <article
                  key={slug}
                  id={`cat-panel-${slug}`}
                  className="cat-panel relative flex h-full flex-col pb-1"
                  style={{ width: PANEL_W }}
                >
                  <Link
                    href={`/catalogs/${slug}`}
                    className="cat-vitrine group/poster relative min-h-0 flex-1"
                    aria-label={`${item.title} — ${item.subtitle}`}
                  >
                    <span className="cat-vitrine__rail" aria-hidden />
                    <div className="cat-vitrine__mat">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        priority={i === 0}
                        sizes="(max-width: 1200px) 86vw, 920px"
                        unoptimized={isLocalPublicSrc(item.image)}
                        className="poster-zoom-img object-cover"
                        style={{ objectPosition: item.objectPosition }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0"
                        aria-hidden
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(14,12,10,0.15) 0%, transparent 45%, rgba(14,12,10,0.55) 100%)",
                        }}
                      />

                      <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-10">
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-[10px] tracking-[0.32em] text-gold uppercase">
                            House {String(i + 1).padStart(2, "0")}
                          </p>
                          <p className="font-display text-2xl tracking-[0.04em] text-ivory/40 lg:text-3xl">
                            {item.urduHint}
                          </p>
                        </div>

                        <div className="max-w-md self-start text-left">
                          <p className="text-[10px] tracking-[0.28em] text-ivory/50 uppercase">
                            {item.subtitle}
                          </p>
                          <h3 className="mt-2 font-display text-[clamp(2.75rem,5vw,4.5rem)] font-normal leading-none tracking-[0.04em] text-ivory uppercase">
                            {item.title}
                          </h3>
                          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ivory/65">
                            {item.tagline}
                          </p>
                          <span className="mt-6 inline-flex items-center gap-3 text-[10px] font-medium tracking-[0.24em] text-ivory uppercase transition-colors duration-500 group-hover/poster:text-gold">
                            Open the house
                            <span
                              className="h-px w-10 bg-current transition-[width] duration-500 group-hover/poster:w-14"
                              aria-hidden
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
