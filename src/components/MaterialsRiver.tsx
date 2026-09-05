"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { materialMeta, type Material } from "@/lib/products";
import { usePosterCursor } from "@/components/PosterCursor";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ORDER: Material[] = ["gold", "diamond", "ruby"];

const CAMPAIGN_PHOTO: Record<
  Material,
  { src: string; alt: string; objectPosition: string }
> = {
  gold: {
    src: "/materials/gold.jpeg",
    alt: "Kundan gold jewellery — layered necklace, ear cuff, and rings on a model in emerald satin",
    objectPosition: "center 28%",
  },
  diamond: {
    src: "/materials/diamond.jpeg",
    alt: "Kundan diamond jewellery — diamond choker and earrings on a model in black velvet",
    objectPosition: "center 22%",
  },
  ruby: {
    src: "/materials/ruby.jpeg",
    alt: "Kundan ruby jewellery — ruby ring and pendant necklace on a model in a white suit",
    objectPosition: "center 30%",
  },
};

/**
 * The visual climax — three campaign portraits (identical composition,
 * different material) cross-wipe into one another as the section pins.
 * Gold → Diamond → Ruby are all GSAP-driven: image seams, copy masks,
 * flash accents, and the side rail.
 */
export function MaterialsRiver() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { bind: cursorBind, cue: cursorCue } = usePosterCursor(
    materialMeta[ORDER[active]].title
  );

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const panels = ORDER.map((key) => {
        const layer = root.querySelector<HTMLElement>(`[data-river-img="${key}"]`);
        const copy = root.querySelector<HTMLElement>(`[data-river-copy="${key}"]`);
        return {
          key,
          img: layer,
          breathe: layer?.querySelector<HTMLElement>(".river-breathe") ?? null,
          copy,
          eyebrow: copy?.querySelector<HTMLElement>(".river-eyebrow-inner") ?? null,
          title: copy?.querySelector<HTMLElement>(".river-title-inner") ?? null,
          tagline: copy?.querySelector<HTMLElement>(".river-tagline") ?? null,
          cta: copy?.querySelector<HTMLElement>(".river-cta") ?? null,
        };
      });

      const flash = root.querySelector<HTMLElement>("[data-river-flash]");
      const rails = ORDER.map((key) => ({
        label: root.querySelector<HTMLElement>(`[data-river-rail="${key}"]`),
        line: root.querySelector<HTMLElement>(`[data-river-rail-line="${key}"]`),
      }));

      const setRail = (index: number, immediate = false) => {
        rails.forEach((rail, i) => {
          const isActive = i === index;
          const isPast = i < index;
          const dur = immediate ? 0 : 0.45;
          if (rail.label) {
            gsap.to(rail.label, {
              opacity: isActive ? 1 : 0.25,
              color: isActive ? "var(--color-gold)" : "var(--color-ivory)",
              duration: dur,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          if (rail.line) {
            gsap.to(rail.line, {
              width: isActive ? 28 : isPast ? 16 : 10,
              opacity: isActive ? 1 : isPast ? 0.55 : 0.25,
              duration: dur,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });
      };

      if (reduce) {
        panels.forEach((p, i) => {
          gsap.set(p.img, { clipPath: "none", opacity: i === 0 ? 1 : 0 });
          gsap.set(p.copy, { opacity: i === 0 ? 1 : 0 });
          if (p.eyebrow) gsap.set(p.eyebrow, { yPercent: 0 });
          if (p.title) gsap.set(p.title, { yPercent: 0 });
          if (p.tagline) gsap.set(p.tagline, { clearProps: "all", opacity: 1, y: 0 });
          if (p.cta) gsap.set(p.cta, { clearProps: "all", opacity: 1, y: 0 });
        });
        setRail(0, true);
        return;
      }

      // Shared-seam wipes: incoming + outgoing clip move together so
      // scrubbing either direction stays gap-free. Axis alternates —
      // gold→diamond across, diamond→ruby down.
      gsap.set(panels[0].img, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 });
      gsap.set(panels[1].img, { clipPath: "inset(0% 100% 0% 0%)", opacity: 1 });
      gsap.set(panels[2].img, { clipPath: "inset(0% 0% 100% 0%)", opacity: 1 });

      panels.forEach((p, i) => {
        gsap.set(p.copy, { autoAlpha: i === 0 ? 1 : 0, y: 0 });
        if (p.eyebrow) gsap.set(p.eyebrow, { yPercent: 0 });
        if (p.title) gsap.set(p.title, { yPercent: 0 });
        if (p.tagline) gsap.set(p.tagline, { autoAlpha: 1, y: 0 });
        if (p.cta) gsap.set(p.cta, { autoAlpha: 1, y: 0 });
        if (p.breathe) gsap.set(p.breathe, { scale: i === 0 ? 1 : 1.06 });
      });

      if (flash) gsap.set(flash, { opacity: 0 });
      setRail(0, true);

      const hideCopy = (
        panel: (typeof panels)[number],
        at: number,
        tl: gsap.core.Timeline
      ) => {
        // Fade the whole stack — keep inners at rest so reverse scrub
        // and dwell never leave the heading parked off-canvas.
        tl.to(
          panel.copy!,
          { autoAlpha: 0, y: -14, duration: 0.12, ease: "power2.in" },
          at
        );
      };

      const showCopy = (
        panel: (typeof panels)[number],
        at: number,
        tl: gsap.core.Timeline
      ) => {
        tl.fromTo(
          panel.copy!,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.16,
            ease: "power3.out",
            immediateRender: false,
          },
          at
        );

        if (panel.eyebrow) {
          tl.fromTo(
            panel.eyebrow,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 0.14,
              ease: "power3.out",
              immediateRender: false,
            },
            at
          );
        }
        if (panel.title) {
          tl.fromTo(
            panel.title,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 0.16,
              ease: "power3.out",
              immediateRender: false,
            },
            at + 0.03
          );
        }
        if (panel.tagline) {
          tl.fromTo(
            panel.tagline,
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.14,
              ease: "power3.out",
              immediateRender: false,
            },
            at + 0.06
          );
        }
        if (panel.cta) {
          tl.fromTo(
            panel.cta,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.12,
              ease: "power3.out",
              immediateRender: false,
            },
            at + 0.09
          );
        }
      };

      const mm = gsap.matchMedia();

      // Both breakpoints required — a lone isDesktop query never runs below 768px,
      // which is why Gold → Diamond → Ruby looked stuck on phones.
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (ctx) => {
          const { isDesktop } = ctx.conditions!;
          let lastIndex = 0;

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: () =>
                `+=${Math.round(
                  // Mobile needs a longer pin distance — touch scroll covers
                  // more ground per flick than a desktop wheel.
                  window.innerHeight * (isDesktop ? 2.3 : 3.6)
                )}`,
              pin: true,
              pinType: "transform",
              pinSpacing: true,
              anticipatePin: 1,
              scrub: isDesktop ? 0.7 : 0.85,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const p = self.progress;
                const next = p < 0.36 ? 0 : p < 0.68 ? 1 : 2;
                if (next !== lastIndex) {
                  lastIndex = next;
                  setRail(next);
                  setActive(next);
                }
              },
            },
          });

          // Look 01 Gold → 02 Diamond — horizontal wipe, seam L→R
          // Copy settles early so the heading holds through the diamond dwell.
          tl.to(
            panels[1].img,
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.22 },
            0.3
          ).to(
            panels[0].img,
            { clipPath: "inset(0% 0% 0% 100%)", duration: 0.22 },
            0.3
          );

          if (panels[1].breathe) {
            tl.to(
              panels[1].breathe,
              { scale: 1, duration: 0.28, ease: "power2.out" },
              0.3
            );
          }
          if (panels[0].breathe) {
            tl.to(panels[0].breathe, { scale: 1.04, duration: 0.22 }, 0.3);
          }

          hideCopy(panels[0], 0.3, tl);
          showCopy(panels[1], 0.38, tl);

          tl.fromTo(
            flash,
            { opacity: 0 },
            { opacity: 0.5, duration: 0.08, ease: "none" },
            0.34
          ).to(flash, { opacity: 0, duration: 0.18, ease: "power1.out" }, 0.42);

          // Look 02 Diamond → 03 Ruby — vertical wipe, seam T→B
          tl.to(
            panels[2].img,
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.22 },
            0.62
          ).to(
            panels[1].img,
            { clipPath: "inset(100% 0% 0% 0%)", duration: 0.22 },
            0.62
          );

          if (panels[2].breathe) {
            tl.to(
              panels[2].breathe,
              { scale: 1, duration: 0.28, ease: "power2.out" },
              0.62
            );
          }
          if (panels[1].breathe) {
            tl.to(panels[1].breathe, { scale: 1.04, duration: 0.22 }, 0.62);
          }

          hideCopy(panels[1], 0.62, tl);
          showCopy(panels[2], 0.7, tl);

          tl.fromTo(
            flash,
            { opacity: 0 },
            { opacity: 0.5, duration: 0.08, ease: "none" },
            0.66
          ).to(flash, { opacity: 0, duration: 0.18, ease: "power1.out" }, 0.74);

          const refresh = () => ScrollTrigger.refresh();
          window.addEventListener("load", refresh);
          const raf = requestAnimationFrame(refresh);
          const t1 = window.setTimeout(refresh, 500);
          const t2 = window.setTimeout(refresh, 1200);
          const t3 = window.setTimeout(refresh, 2200);

          return () => {
            window.removeEventListener("load", refresh);
            cancelAnimationFrame(raf);
            window.clearTimeout(t1);
            window.clearTimeout(t2);
            window.clearTimeout(t3);
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="materials"
      className="relative bg-void"
      aria-label="The three materials — Gold, Diamond, Ruby"
    >
      <div
        className="relative h-[100svh] min-h-[100svh] overflow-hidden"
        {...cursorBind}
      >
        {ORDER.map((key, i) => {
          const photo = CAMPAIGN_PHOTO[key];
          const initialClip =
            i === 0
              ? "none"
              : i === 1
                ? "inset(0% 100% 0% 0%)"
                : "inset(0% 0% 100% 0%)";
          return (
            <div
              key={key}
              data-river-img={key}
              className="absolute inset-0"
              style={{ clipPath: initialClip }}
            >
              <div className="river-breathe relative h-full w-full will-change-transform">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  unoptimized
                  className="object-cover"
                  style={{ objectPosition: photo.objectPosition }}
                />
              </div>
            </div>
          );
        })}

        <div
          data-river-flash
          className="pointer-events-none absolute inset-0 z-[1] opacity-0 mix-blend-screen"
          aria-hidden
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(203,176,122,0.9) 0%, rgba(203,176,122,0.25) 42%, transparent 72%)",
          }}
        />

        <div className="cinematic-grain pointer-events-none absolute inset-0 z-[1]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(14,12,10,0.5) 0%, transparent 32%, transparent 62%, rgba(14,12,10,0.75) 100%)",
          }}
        />

        {ORDER.map((key, i) => {
          const meta = materialMeta[key];
          const isActive = active === i;
          return (
            <div
              key={key}
              data-river-copy={key}
              aria-hidden={!isActive}
              className={`absolute inset-0 z-[2] flex flex-col items-center justify-end px-6 pb-14 text-center sm:pb-16 md:pb-20 ${
                i === 0 ? "" : "opacity-0"
              }`}
              style={{ pointerEvents: isActive ? "auto" : "none" }}
            >
              <p className="type-eyebrow overflow-hidden text-gold/90">
                <span className="river-eyebrow-inner block">{meta.campaign.tag}</span>
              </p>
              <h2 className="mt-4 overflow-hidden font-display type-display font-medium text-ivory">
                <span className="river-title-inner block">{meta.campaign.title}</span>
              </h2>
              <p className="river-tagline mx-auto mt-4 max-w-md text-[14px] leading-[1.7] text-ivory/60 sm:text-[15px]">
                {meta.campaign.tagline}
              </p>
              <Link
                href={`/materials/${key}`}
                tabIndex={isActive ? 0 : -1}
                className="river-cta btn-hero-atelier pressable mt-9"
              >
                <span>Shop {meta.title.toLowerCase()}</span>
              </Link>
            </div>
          );
        })}

        <div
          className="pointer-events-none absolute top-1/2 right-6 z-[3] hidden -translate-y-1/2 flex-col items-end gap-5 md:flex lg:right-10"
          aria-hidden
        >
          {ORDER.map((key, i) => {
            const isActive = active === i;
            return (
              <div key={key} className="flex items-center gap-3">
                <span
                  data-river-rail={key}
                  className="text-[9px] font-medium tracking-[0.2em] uppercase"
                  style={{
                    color: isActive ? "var(--color-gold)" : "var(--color-ivory)",
                    opacity: isActive ? 1 : 0.25,
                  }}
                >
                  {materialMeta[key].title}
                </span>
                <span
                  data-river-rail-line={key}
                  className="block h-px bg-gold"
                  style={{
                    width: isActive ? 28 : 10,
                    opacity: isActive ? 1 : 0.25,
                  }}
                />
              </div>
            );
          })}
        </div>

        {cursorCue}
      </div>
    </section>
  );
}
