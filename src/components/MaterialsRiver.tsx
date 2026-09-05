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
 * Sticky scrub stage (no GSAP pin — avoids bounce).
 * Desktop: free scrub. Mobile: directional snap so one flick = one look.
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
        img: stage.querySelector<HTMLElement>(`[data-river-img="${key}"]`),
        copy: stage.querySelector<HTMLElement>(`[data-river-copy="${key}"]`),
        breathe:
          stage
            .querySelector(`[data-river-img="${key}"]`)
            ?.querySelector<HTMLElement>(".river-breathe") ?? null,
      }));

      const flash = stage.querySelector<HTMLElement>("[data-river-flash]");
      const rails = ORDER.map((key) => ({
        label: stage.querySelector<HTMLElement>(`[data-river-rail="${key}"]`),
        line: stage.querySelector<HTMLElement>(
          `[data-river-rail-line="${key}"]`
        ),
      }));

      const setRail = (index: number, immediate = false) => {
        rails.forEach((rail, i) => {
          const on = i === index;
          const past = i < index;
          const dur = immediate ? 0 : 0.35;
          if (rail.label) {
            gsap.to(rail.label, {
              opacity: on ? 1 : 0.25,
              color: on ? "var(--color-gold)" : "var(--color-ivory)",
              duration: dur,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          if (rail.line) {
            gsap.to(rail.line, {
              width: on ? 28 : past ? 16 : 10,
              opacity: on ? 1 : past ? 0.55 : 0.25,
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
          gsap.set(p.copy, { autoAlpha: i === 0 ? 1 : 0, y: 0 });
        });
        setLook(0);
        return;
      }

      panels.forEach((p) => {
        if (p.breathe) gsap.set(p.breathe, { clearProps: "animation" });
      });

      gsap.set(panels[0].img, { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1 });
      gsap.set(panels[1].img, { clipPath: "inset(0% 100% 0% 0%)", autoAlpha: 1 });
      gsap.set(panels[2].img, { clipPath: "inset(0% 0% 100% 0%)", autoAlpha: 1 });
      gsap.set(panels[0].copy, { autoAlpha: 1, y: 0 });
      gsap.set([panels[1].copy, panels[2].copy], { autoAlpha: 0, y: 18 });
      if (panels[0].breathe) gsap.set(panels[0].breathe, { scale: 1 });
      if (panels[1].breathe) gsap.set(panels[1].breathe, { scale: 1.04 });
      if (panels[2].breathe) gsap.set(panels[2].breathe, { scale: 1.04 });
      if (flash) gsap.set(flash, { autoAlpha: 0 });
      setLook(0);

      const buildWipes = (tl: gsap.core.Timeline) => {
        // Total duration 1 — snaps land on 0 / 0.5 / 1
        // Longer wipe spans = slower handoffs while scrubbing / snapping.
        tl.addLabel("gold", 0);

        // Gold → Diamond (slow horizontal wipe)
        tl.to(
          panels[1].img,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.32,
            ease: "power2.inOut",
          },
          0.08
        )
          .to(
            panels[0].img,
            {
              clipPath: "inset(0% 0% 0% 100%)",
              duration: 0.32,
              ease: "power2.inOut",
            },
            0.08
          )
          .to(
            panels[0].copy,
            { autoAlpha: 0, y: -14, duration: 0.16, ease: "power2.in" },
            0.1
          )
          .to(
            panels[1].copy,
            { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" },
            0.22
          );

        if (panels[1].breathe) {
          tl.to(
            panels[1].breathe,
            { scale: 1, duration: 0.36, ease: "power2.out" },
            0.08
          );
        }

        tl.fromTo(
          flash,
          { autoAlpha: 0 },
          { autoAlpha: 0.3, duration: 0.08, ease: "none" },
          0.18
        )
          .to(flash, { autoAlpha: 0, duration: 0.16 }, 0.28)
          .addLabel("diamond", 0.5);

        // Diamond → Ruby (slow vertical wipe)
        tl.to(
          panels[2].img,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.32,
            ease: "power2.inOut",
          },
          0.58
        )
          .to(
            panels[1].img,
            {
              clipPath: "inset(100% 0% 0% 0%)",
              duration: 0.32,
              ease: "power2.inOut",
            },
            0.58
          )
          .to(
            panels[1].copy,
            { autoAlpha: 0, y: -14, duration: 0.16, ease: "power2.in" },
            0.6
          )
          .to(
            panels[2].copy,
            { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" },
            0.72
          );

        if (panels[2].breathe) {
          tl.to(
            panels[2].breathe,
            { scale: 1, duration: 0.36, ease: "power2.out" },
            0.58
          );
        }

        tl.fromTo(
          flash,
          { autoAlpha: 0 },
          { autoAlpha: 0.3, duration: 0.08, ease: "none" },
          0.68
        )
          .to(flash, { autoAlpha: 0, duration: 0.16 }, 0.78)
          .addLabel("ruby", 1);
      };

      const mm = gsap.matchMedia();

      // Desktop — free scrub
      mm.add("(min-width: 768px)", () => {
        let lastIndex = 0;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: track,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const next = self.progress < 0.36 ? 0 : self.progress < 0.68 ? 1 : 2;
              if (next !== lastIndex) {
                lastIndex = next;
                setLook(next);
              }
            },
          },
        });
        buildWipes(tl);
        const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          cancelAnimationFrame(raf);
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      // Mobile — same sticky scrub, but snap one look per flick
      mm.add("(max-width: 767px)", () => {
        let lastIndex = 0;
        // Committed look index — advanced only when a snap settles.
        let step = 0;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: track,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.85,
            invalidateOnRefresh: true,
            onEnter: () => {
              step = 0;
            },
            onEnterBack: () => {
              step = 2;
            },
            snap: {
              // Always land on the next/prev look only — scroll distance ignored.
              snapTo: (_value, st) => {
                const dir = st?.direction ?? 0;
                if (dir > 0) return Math.min(1, (step + 1) / 2);
                if (dir < 0) return Math.max(0, (step - 1) / 2);
                return step / 2;
              },
              duration: 0.9,
              delay: 0.06,
              ease: "power2.inOut",
              inertia: false,
              onComplete: (st) => {
                if (!st) return;
                const next =
                  st.progress < 0.25 ? 0 : st.progress < 0.75 ? 1 : 2;
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
          },
        });
        buildWipes(tl);
        const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          cancelAnimationFrame(raf);
          tl.scrollTrigger?.kill();
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
      className="relative z-10 bg-void"
      aria-label="The three materials — Gold, Diamond, Ruby"
    >
      <div
        ref={trackRef}
        className="relative h-[380vh] bg-void motion-reduce:h-[100svh] md:h-[400vh]"
      >
        <div
          ref={stageRef}
          className="sticky top-0 h-[100svh] min-h-[100svh] overflow-hidden bg-void"
        >
          {ORDER.map((key) => {
            const photo = CAMPAIGN_PHOTO[key];
            return (
              <div
                key={key}
                data-river-img={key}
                className="absolute inset-0 bg-void"
              >
                <div className="river-breathe relative h-full w-full will-change-transform">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    priority={key === "gold"}
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

          <div
            className="cinematic-grain pointer-events-none absolute inset-0 z-[1]"
            aria-hidden
          />
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
            return (
              <div
                key={key}
                data-river-copy={key}
                aria-hidden={i !== 0}
                className="absolute inset-0 z-[2] flex flex-col items-center justify-end px-6 pb-14 text-center sm:pb-16 md:pb-20"
                style={{ pointerEvents: i === 0 ? "auto" : "none" }}
              >
                <p className="type-eyebrow text-gold/90">{meta.campaign.tag}</p>
                <h2 className="mt-4 font-display type-display font-medium text-ivory">
                  {meta.campaign.title}
                </h2>
                <p className="mx-auto mt-4 max-w-md text-[14px] leading-[1.7] text-ivory/60 sm:text-[15px]">
                  {meta.campaign.tagline}
                </p>
                <Link
                  href={`/materials/${key}`}
                  tabIndex={i === 0 ? 0 : -1}
                  className="btn-hero-atelier pressable mt-9"
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
            {ORDER.map((key) => (
              <div key={key} className="flex items-center gap-3">
                <span
                  data-river-rail={key}
                  className="text-[9px] font-medium tracking-[0.2em] text-ivory uppercase opacity-25"
                >
                  {materialMeta[key].title}
                </span>
                <span
                  data-river-rail-line={key}
                  className="block h-px w-2.5 bg-gold opacity-25"
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
