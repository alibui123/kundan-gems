"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { craftSteps, promises } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const icons = {
  gem: (
    <path
      d="M12 3l3.5 5.5L12 21 8.5 8.5 12 3zm0 0L4 9h16L12 3z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  diamond: (
    <path
      d="M12 3l7 7-7 11L5 10l7-7z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  ship: (
    <>
      <path
        d="M4 14h16l-1.5 4.5a2 2 0 01-1.9 1.5H7.4a2 2 0 01-1.9-1.5L4 14z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M7 14V9a2 2 0 012-2h6a2 2 0 012 2v5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
    </>
  ),
  shield: (
    <path
      d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
      strokeLinejoin="round"
    />
  ),
};

/** Runway atelier — bleed image + claim strip. Image motion via GSAP. */
export function AtelierPromise() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const layer = root.querySelector<HTMLElement>("[data-parallax-layer]");
      const img = root.querySelector<HTMLElement>("[data-atelier-img]");
      const title = root.querySelector<HTMLElement>("[data-atelier-title]");
      const eyebrow = root.querySelector<HTMLElement>("[data-atelier-eyebrow]");
      const poster = root.querySelector<HTMLElement>("[data-atelier-poster]");

      if (reduce) {
        gsap.set([layer, img, title, eyebrow], { clearProps: "all" });
        return;
      }

      if (eyebrow) gsap.set(eyebrow, { autoAlpha: 0, y: 16 });
      if (title) gsap.set(title, { autoAlpha: 0, y: 28 });

      if (poster && (eyebrow || title)) {
        ScrollTrigger.create({
          trigger: poster,
          start: "top 75%",
          once: true,
          onEnter: () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            if (eyebrow) tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.7 }, 0);
            if (title) tl.to(title, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.12);
          },
        });
      }

      if (layer) {
        gsap.fromTo(
          layer,
          { scale: 1.08 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: poster,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }

      if (img && poster) {
        const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
          .matches;
        if (fine) {
          const enter = () =>
            gsap.to(img, {
              scale: 1.05,
              duration: 1.15,
              ease: "power2.out",
              overwrite: "auto",
            });
          const leave = () =>
            gsap.to(img, {
              scale: 1,
              duration: 1.15,
              ease: "power2.out",
              overwrite: "auto",
            });
          poster.addEventListener("pointerenter", enter);
          poster.addEventListener("pointerleave", leave);
          return () => {
            poster.removeEventListener("pointerenter", enter);
            poster.removeEventListener("pointerleave", leave);
          };
        }
      }
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="atelier" className="bg-white">
      <div
        data-atelier-poster
        className="reveal-image relative min-h-[78svh] overflow-hidden bg-[#f5efe2] md:min-h-[88svh]"
      >
        <div className="absolute inset-0" data-parallax-media>
          <div
            className="absolute inset-[-8%] will-change-transform"
            data-parallax-layer
          >
            <div
              data-atelier-img
              className="relative h-full w-full will-change-transform"
            >
              <Image
                src="/hero/blend-model-gold.png"
                alt="Kundan layered kundan necklaces and jhumka earrings, studio portrait"
                fill
                sizes="100vw"
                className="object-cover object-[70%_center] sm:object-[64%_center] md:object-[56%_center]"
              />
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#f5efe2] via-[#f5efe2]/45 to-transparent md:bg-gradient-to-r md:from-[#f5efe2] md:via-[#f5efe2]/38 md:to-transparent"
          aria-hidden
        />
        <div className="relative z-[2] flex min-h-[78svh] flex-col items-center justify-end px-6 pb-14 text-center sm:px-10 sm:pb-16 md:min-h-[88svh] md:max-w-md md:items-start md:justify-center md:py-24 md:pl-14 md:text-left lg:pl-20">
          <p
            data-atelier-eyebrow
            className="text-[10px] tracking-[0.36em] text-gold uppercase"
          >
            Backstage
          </p>
          <h2
            data-atelier-title
            className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-[0.04em] text-ink uppercase"
          >
            Craft without
            <br />
            compromise
          </h2>
        </div>
      </div>

      <div className="bg-white">
        <div className="container-maison grid gap-14 px-6 py-20 sm:px-10 md:grid-cols-12 md:gap-10 md:py-28">
          <div className="reveal-item md:col-span-5">
            <p className="max-w-sm text-[15px] leading-[1.9] text-muted">
              From first sketch to final polish, every piece travels a quiet path
              of obsession — measured in hours, worn for generations.
            </p>
            <ol className="mt-12 space-y-8">
              {craftSteps.slice(0, 3).map((step) => (
                <li key={step.step} className="reveal-item flex gap-5">
                  <span className="font-display text-sm text-gold">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-display text-lg tracking-[0.01em] text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="reveal-item grid gap-10 border-t border-border pt-10 sm:grid-cols-2 md:col-span-6 md:col-start-7 md:border-t-0 md:border-l md:pt-0 md:pl-10">
            {promises.map((item) => (
              <article key={item.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center text-gold">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                    {icons[item.icon]}
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-base text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
