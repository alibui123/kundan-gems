"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export type FormCollectionHeroProps = {
  title: string;
  /** Second display line — usually italic gold */
  accent: string;
  description: string;
};

/**
 * Typography-led collection intro — no product imagery.
 * Mobile path: transform+opacity only, no blur/scale loops, short timeline.
 */
export function FormCollectionHero({
  title,
  accent,
  description,
}: FormCollectionHeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const lines = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(".fh-line")
      );
      const crumb = root.querySelector(".fh-crumb");
      const copy = root.querySelector(".fh-copy");
      const rule = root.querySelector(".fh-rule");
      const glow = root.querySelector(".fh-glow");

      const showFinal = () => {
        gsap.set([crumb, copy, rule, ...lines], {
          autoAlpha: 1,
          y: 0,
          yPercent: 0,
          scaleX: 1,
          clearProps: "transform,will-change",
        });
        if (glow) gsap.set(glow, { autoAlpha: 1, scale: 1 });
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        showFinal();
      });

      // Mobile / tablet — lean: opacity + translateY only, no filter animation.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(lines, { yPercent: 100, force3D: true });
        gsap.set([crumb, copy, rule], { autoAlpha: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out", force3D: true },
          onComplete: () => {
            gsap.set(lines, { clearProps: "will-change" });
          },
        });

        tl.to(crumb, { autoAlpha: 1, duration: 0.35 }, 0)
          .to(
            lines,
            { yPercent: 0, duration: 0.55, stagger: 0.06 },
            0.04
          )
          .to(rule, { autoAlpha: 1, duration: 0.3 }, 0.28)
          .to(copy, { autoAlpha: 1, duration: 0.35 }, 0.32);

        return () => {
          tl.kill();
        };
      });

      // Desktop — fuller sequence + soft glow pulse.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(lines, { yPercent: 110, force3D: true });
        gsap.set(rule, { scaleX: 0, transformOrigin: "center center" });
        gsap.set([crumb, copy], { autoAlpha: 0, y: 18 });
        if (glow) gsap.set(glow, { autoAlpha: 0, scale: 0.92 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out", force3D: true },
          onComplete: () => {
            gsap.set(lines, { clearProps: "will-change" });
          },
        });

        if (glow) {
          tl.to(glow, { autoAlpha: 1, scale: 1, duration: 1.2 }, 0);
        }

        tl.to(crumb, { autoAlpha: 1, y: 0, duration: 0.7 }, 0)
          .to(lines, { yPercent: 0, duration: 1.05, stagger: 0.12 }, 0.18)
          .to(rule, { scaleX: 1, duration: 0.85 }, 0.5)
          .to(copy, { autoAlpha: 1, y: 0, duration: 0.85 }, 0.58);

        let pulse: gsap.core.Tween | undefined;
        if (glow) {
          pulse = gsap.to(glow, {
            scale: 1.06,
            duration: 5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.4,
          });
        }

        return () => {
          tl.kill();
          pulse?.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="form-collection-hero relative isolate overflow-hidden bg-white text-ink"
      aria-labelledby="form-collection-heading"
    >
      {/* Soft wash — CSS only on mobile (no animated blur layer). */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,169,106,0.1),transparent_50%)] md:bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,169,106,0.12),transparent_55%)]" />
      <div className="fh-glow pointer-events-none absolute top-[8%] left-1/2 hidden h-[40vw] max-h-[360px] w-[65vw] max-w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,236,200,0.28),transparent_70%)] blur-3xl md:block" />

      <div className="container-luxury relative z-10 flex min-h-[48svh] flex-col justify-center pt-28 pb-12 md:min-h-[62svh] md:pt-36 md:pb-20">
        <nav
          className="fh-crumb mb-8 text-[11px] tracking-[0.16em] text-muted uppercase md:mb-14"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-gold">{title}</span>
        </nav>

        <div className="mx-auto w-full max-w-3xl text-center">
          <h1
            id="form-collection-heading"
            className="font-display text-[clamp(2.75rem,11vw,7.25rem)] font-light leading-[0.92] tracking-[-0.03em] md:leading-[0.9]"
          >
            {/* Extra x-padding so italic glyphs aren’t clipped by the reveal mask */}
            <span className="block overflow-hidden px-[0.2em]">
              <span className="fh-line inline-block will-change-transform">
                {title}
              </span>
            </span>
            <span className="mt-1 block overflow-hidden px-[0.2em]">
              <span className="fh-line inline-block pr-[0.12em] italic text-gold-bright will-change-transform">
                {accent}
              </span>
            </span>
          </h1>

          <div className="fh-rule mx-auto mt-6 h-px w-14 bg-gradient-to-r from-transparent via-gold to-transparent md:mt-10 md:w-16" />

          <p className="fh-copy mx-auto mt-5 max-w-md text-[14px] leading-[1.75] text-muted md:mt-8 md:text-[15px] md:leading-[1.85]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
