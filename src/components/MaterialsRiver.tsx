"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { materialMeta, type Material } from "@/lib/products";
import { usePosterCursor } from "@/components/PosterCursor";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ORDER: Material[] = ["gold", "diamond", "ruby"];
const NUMS = ["01", "02", "03"] as const;

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

/** Split campaign titles into two display lines for mask reveals. */
const TITLE_LINES: Record<Material, [string, string]> = {
  gold: ["River of", "Warmth"],
  diamond: ["River of", "Lights"],
  ruby: ["River of", "Fire"],
};

/**
 * Materials salon — same sticky scrub + two-column editorial grammar
 * as the philosophy chapter. Gold → Diamond (horizontal wipe),
 * Diamond → Ruby (vertical wipe), with masked type + rail.
 */
export function MaterialsRiver() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!root || !track || !stage) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const panels = ORDER.map((key) => ({
        key,
        img: stage.querySelector<HTMLElement>(`[data-mat-img="${key}"]`),
        frame: stage.querySelector<HTMLElement>(`[data-mat-frame="${key}"]`),
        copy: stage.querySelector<HTMLElement>(`[data-mat-copy="${key}"]`),
        lines: gsap.utils.toArray<HTMLElement>(
          stage.querySelectorAll(`[data-mat-copy="${key}"] [data-mat-line]`)
        ),
        eyebrow: stage.querySelector<HTMLElement>(
          `[data-mat-copy="${key}"] [data-mat-eyebrow]`
        ),
        rule: stage.querySelector<HTMLElement>(
          `[data-mat-copy="${key}"] [data-mat-rule]`
        ),
        body: stage.querySelector<HTMLElement>(
          `[data-mat-copy="${key}"] [data-mat-body]`
        ),
        cta: stage.querySelector<HTMLElement>(
          `[data-mat-copy="${key}"] [data-mat-cta]`
        ),
      }));

      const flash = stage.querySelector<HTMLElement>("[data-mat-flash]");
      const railItems = ORDER.map((key) => ({
        label: stage.querySelector<HTMLElement>(`[data-mat-rail="${key}"]`),
        line: stage.querySelector<HTMLElement>(`[data-mat-rail-line="${key}"]`),
      }));
      const chapterRail = stage.querySelector<HTMLElement>("[data-mat-chapter]");

      const setRail = (index: number, immediate = false) => {
        railItems.forEach((rail, i) => {
          const on = i === index;
          const past = i < index;
          const dur = immediate ? 0 : 0.4;
          if (rail.label) {
            gsap.to(rail.label, {
              opacity: on ? 1 : 0.28,
              color: on ? "var(--color-gold)" : "var(--color-ivory)",
              duration: dur,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          if (rail.line) {
            gsap.to(rail.line, {
              width: on ? 28 : past ? 16 : 10,
              opacity: on ? 1 : past ? 0.5 : 0.22,
              duration: dur,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });
      };

      const setLook = (index: number) => {
        panels.forEach((p, i) => {
          if (!p.copy) return;
          const on = i === index;
          p.copy.setAttribute("aria-hidden", on ? "false" : "true");
          p.copy.style.pointerEvents = on ? "auto" : "none";
          const link = p.copy.querySelector("a");
          if (link) link.tabIndex = on ? 0 : -1;
        });
        root.dataset.look = materialMeta[ORDER[index]].title;
        setRail(index);
      };

      if (reduce) {
        panels.forEach((p, i) => {
          gsap.set(p.img, { clipPath: "none", autoAlpha: i === 0 ? 1 : 0 });
          gsap.set(p.copy, { autoAlpha: i === 0 ? 1 : 0 });
        });
        setLook(0);
        return;
      }

      // Initial state — Gold visible, others clipped away
      gsap.set(panels[0].img, { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1 });
      gsap.set(panels[1].img, { clipPath: "inset(0% 100% 0% 0%)", autoAlpha: 1 });
      gsap.set(panels[2].img, { clipPath: "inset(0% 0% 100% 0%)", autoAlpha: 1 });
      gsap.set(panels[0].frame, { scale: 1 });
      gsap.set([panels[1].frame, panels[2].frame], { scale: 1.06 });

      // Only one copy stack visible at a time — inactive layers at autoAlpha 0
      // so tags/titles never overlap into an illegible mash.
      panels.forEach((p, i) => {
        gsap.set(p.eyebrow, { autoAlpha: 1, y: 0 });
        gsap.set(p.lines, { yPercent: 0 });
        gsap.set(p.rule, { scaleX: 1, transformOrigin: "left center" });
        gsap.set(p.body, { autoAlpha: 1, y: 0 });
        gsap.set(p.cta, { autoAlpha: 1, y: 0 });
        gsap.set(p.copy, { autoAlpha: i === 0 ? 1 : 0 });
      });

      if (flash) gsap.set(flash, { autoAlpha: 0 });
      if (chapterRail) gsap.set(chapterRail, { autoAlpha: 1 });
      setLook(0);

      const hideCopy = (
        p: (typeof panels)[number],
        at: number,
        tl: gsap.core.Timeline
      ) => {
        tl.to(
          p.copy,
          { autoAlpha: 0, duration: 0.12, ease: "power2.in" },
          at
        );
      };

      const showCopy = (
        p: (typeof panels)[number],
        at: number,
        tl: gsap.core.Timeline
      ) => {
        tl.set(
          p.lines,
          { yPercent: 115 },
          at
        )
          .set(p.eyebrow, { autoAlpha: 0, y: 14 }, at)
          .set(p.rule, { scaleX: 0, transformOrigin: "left center" }, at)
          .set(p.body, { autoAlpha: 0, y: 16 }, at)
          .set(p.cta, { autoAlpha: 0, y: 12 }, at)
          .set(p.copy, { autoAlpha: 1 }, at)
          .to(p.eyebrow, { autoAlpha: 1, y: 0, duration: 0.1 }, at)
          .to(
            p.lines,
            { yPercent: 0, duration: 0.18, stagger: 0.05, ease: "power2.out" },
            at + 0.04
          )
          .to(p.rule, { scaleX: 1, duration: 0.1 }, at + 0.14)
          .to(
            p.body,
            { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" },
            at + 0.16
          )
          .to(
            p.cta,
            { autoAlpha: 1, y: 0, duration: 0.1, ease: "power2.out" },
            at + 0.2
          );
      };

      const buildTimeline = () => {
        const tl = gsap.timeline({ defaults: { ease: "none" } });
        tl.addLabel("gold", 0);

        // Hold gold, then Gold → Diamond (horizontal shared-seam wipe)
        tl.to({}, { duration: 0.18 }, 0);
        hideCopy(panels[0], 0.2, tl);
        tl.to(
          panels[1].img,
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.28, ease: "power2.inOut" },
          0.22
        )
          .to(
            panels[0].img,
            { clipPath: "inset(0% 0% 0% 100%)", duration: 0.28, ease: "power2.inOut" },
            0.22
          )
          .to(panels[1].frame, { scale: 1, duration: 0.3, ease: "power2.out" }, 0.22)
          .to(panels[0].frame, { scale: 1.04, duration: 0.28 }, 0.22);
        showCopy(panels[1], 0.32, tl);
        tl.fromTo(
          flash,
          { autoAlpha: 0 },
          { autoAlpha: 0.35, duration: 0.06, ease: "none" },
          0.3
        )
          .to(flash, { autoAlpha: 0, duration: 0.12 }, 0.38)
          .addLabel("diamond", 0.5);

        // Hold diamond, then Diamond → Ruby (vertical wipe)
        tl.to({}, { duration: 0.12 }, 0.5);
        hideCopy(panels[1], 0.62, tl);
        tl.to(
          panels[2].img,
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.28, ease: "power2.inOut" },
          0.64
        )
          .to(
            panels[1].img,
            { clipPath: "inset(100% 0% 0% 0%)", duration: 0.28, ease: "power2.inOut" },
            0.64
          )
          .to(panels[2].frame, { scale: 1, duration: 0.3, ease: "power2.out" }, 0.64)
          .to(panels[1].frame, { scale: 1.04, duration: 0.28 }, 0.64);
        showCopy(panels[2], 0.74, tl);
        tl.fromTo(
          flash,
          { autoAlpha: 0 },
          { autoAlpha: 0.35, duration: 0.06, ease: "none" },
          0.72
        )
          .to(flash, { autoAlpha: 0, duration: 0.12 }, 0.8)
          .addLabel("ruby", 1)
          .to({}, { duration: 0.12 });

        return tl;
      };

      let lastIndex = 0;
      let step = 0;

      const mm = gsap.matchMedia();

      // Shared sticky scrub on every breakpoint (philosophy grammar)
      mm.add("(min-width: 768px)", () => {
        const tl = buildTimeline();
        const st = ScrollTrigger.create({
          animation: tl,
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = self.progress < 0.36 ? 0 : self.progress < 0.68 ? 1 : 2;
            if (next !== lastIndex) {
              lastIndex = next;
              setLook(next);
            }
          },
        });
        const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          cancelAnimationFrame(raf);
          st.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 767px)", () => {
        const tl = buildTimeline();
        const st = ScrollTrigger.create({
          animation: tl,
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.75,
          invalidateOnRefresh: true,
          onEnter: () => {
            step = 0;
          },
          onEnterBack: () => {
            step = 2;
          },
          snap: {
            snapTo: (_value, stSnap) => {
              const dir = stSnap?.direction ?? 0;
              if (dir > 0) return Math.min(1, (step + 1) / 2);
              if (dir < 0) return Math.max(0, (step - 1) / 2);
              return step / 2;
            },
            duration: 0.85,
            delay: 0.05,
            ease: "power2.inOut",
            inertia: false,
            onComplete: (stSnap) => {
              if (!stSnap) return;
              const next =
                stSnap.progress < 0.25 ? 0 : stSnap.progress < 0.75 ? 1 : 2;
              step = next;
              if (next !== lastIndex) {
                lastIndex = next;
                setLook(next);
              }
            },
          },
          onUpdate: (self) => {
            const next =
              self.progress < 0.25 ? 0 : self.progress < 0.75 ? 1 : 2;
            if (next !== lastIndex) {
              lastIndex = next;
              setLook(next);
            }
          },
        });
        const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          cancelAnimationFrame(raf);
          st.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="materials"
      data-look={materialMeta.gold.title}
      className="relative z-10 bg-void text-ivory"
      aria-label="The three materials — Gold, Diamond, Ruby"
    >
      <div
        ref={trackRef}
        className="relative h-[320vh] bg-void motion-reduce:h-[100svh] md:h-[360vh]"
      >
        <div
          ref={stageRef}
          className="sticky top-0 h-[100svh] min-h-[100svh] overflow-hidden bg-void"
        >
          {/* Full-bleed posters */}
          {ORDER.map((key, i) => {
            const photo = CAMPAIGN_PHOTO[key];
            return (
              <div
                key={key}
                data-mat-img={key}
                className="absolute inset-0 bg-void"
              >
                <div
                  data-mat-frame={key}
                  className="relative h-full w-full will-change-transform"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="100vw"
                    unoptimized
                    priority={i === 0}
                    className="object-cover"
                    style={{ objectPosition: photo.objectPosition }}
                  />
                </div>
              </div>
            );
          })}

          <div
            data-mat-flash
            className="pointer-events-none absolute inset-0 z-[1] opacity-0 mix-blend-screen"
            aria-hidden
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(191,164,106,0.85) 0%, rgba(191,164,106,0.2) 40%, transparent 70%)",
            }}
          />

          <div
            className="cinematic-grain pointer-events-none absolute inset-0 z-[1] opacity-40"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            aria-hidden
            style={{
              background:
                "linear-gradient(180deg, rgba(7,9,14,0.45) 0%, transparent 28%, transparent 48%, rgba(7,9,14,0.78) 100%)",
            }}
          />

          {/* Chapter rail */}
          <div
            data-mat-chapter
            className="pointer-events-none absolute top-1/2 left-3 z-[3] -translate-y-1/2 sm:left-5 md:left-8 lg:left-10"
            aria-hidden
          >
            <p
              className="origin-left -rotate-90 text-[8px] font-medium tracking-[0.36em] text-gold/80 uppercase sm:text-[9px] sm:tracking-[0.42em]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Materials · Three
            </p>
          </div>

          {/* Editorial copy overlay */}
          <div className="absolute inset-0 z-[2]">
            {ORDER.map((key, i) => {
              const meta = materialMeta[key];
              const [lineA, lineB] = TITLE_LINES[key];
              return (
                <div
                  key={key}
                  data-mat-copy={key}
                  aria-hidden={i !== 0}
                  className="absolute inset-0 flex flex-col justify-end px-5 pb-14 sm:px-8 sm:pb-16 md:justify-center md:px-14 md:pb-0 lg:px-20"
                  style={{ pointerEvents: i === 0 ? "auto" : "none" }}
                >
                  <div className="w-full max-w-xl md:max-w-2xl">
                    <p
                      data-mat-eyebrow
                      className="text-[8px] font-medium tracking-[0.32em] text-gold uppercase sm:text-[10px] sm:tracking-[0.38em]"
                    >
                      Look {NUMS[i]} · {meta.title}
                    </p>

                    <h2 className="mt-4 sm:mt-5 md:mt-7">
                      <span className="block overflow-hidden">
                        <span
                          data-mat-line
                          className="block font-display text-[clamp(2.4rem,8vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em] text-ivory"
                        >
                          {lineA}
                        </span>
                      </span>
                      <span className="mt-1 block overflow-hidden sm:mt-2">
                        <span
                          data-mat-line
                          className="block font-display text-[clamp(2.4rem,8vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em] text-gold"
                        >
                          {lineB}
                        </span>
                      </span>
                    </h2>

                    <span
                      data-mat-rule
                      className="mt-6 block h-px w-16 bg-gold sm:mt-8 sm:w-20 md:mt-10 md:w-24"
                      aria-hidden
                    />

                    <p
                      data-mat-body
                      className="mt-5 max-w-md text-[13px] leading-[1.75] text-ivory/65 sm:mt-6 sm:text-[14px] md:mt-8 md:text-[15px] md:leading-[1.85]"
                    >
                      {meta.campaign.tagline}
                    </p>

                    <p
                      data-mat-tag
                      className="mt-3 text-[8px] tracking-[0.28em] text-ivory/40 uppercase sm:mt-4 sm:text-[9px]"
                    >
                      {meta.campaign.tag}
                    </p>

                    <div data-mat-cta className="mt-8 sm:mt-10 md:mt-12">
                      <Link
                        href={`/materials/${key}`}
                        tabIndex={i === 0 ? 0 : -1}
                        className="inline-flex items-center gap-3 text-[10px] font-medium tracking-[0.26em] text-gold uppercase sm:text-[11px] sm:tracking-[0.28em]"
                      >
                        Shop {meta.title.toLowerCase()}
                        <span
                          aria-hidden
                          className="block h-px w-8 bg-current sm:w-10"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Material rail */}
          <div
            className="pointer-events-none absolute top-1/2 right-3 z-[3] flex -translate-y-1/2 flex-col items-end gap-3 sm:right-5 sm:gap-4 md:right-8 md:gap-5 lg:right-10"
            aria-hidden
          >
            {ORDER.map((key, i) => (
              <div key={key} className="flex items-center gap-2 sm:gap-3">
                <span
                  data-mat-rail={key}
                  className="text-[7px] font-medium tracking-[0.18em] text-ivory uppercase sm:text-[9px] sm:tracking-[0.2em]"
                  style={{ opacity: i === 0 ? 1 : 0.28 }}
                >
                  {materialMeta[key].title}
                </span>
                <span
                  data-mat-rail-line={key}
                  className="block h-px bg-gold"
                  style={{
                    width: i === 0 ? 28 : 10,
                    opacity: i === 0 ? 1 : 0.22,
                  }}
                />
              </div>
            ))}
          </div>

          <RiverCursorCue />
        </div>
      </div>
    </section>
  );
}

function RiverCursorCue() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState(materialMeta.gold.title);
  const { bind, cue } = usePosterCursor(label);

  useEffect(() => {
    const root = hostRef.current?.closest("#materials");
    if (!root) return;
    const sync = () => {
      const next = (root as HTMLElement).dataset.look;
      if (next) setLabel(next);
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ["data-look"] });
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0 z-[4]" {...bind}>
      {cue}
    </div>
  );
}
