"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { MaisonWelcome } from "@/components/MaisonWelcome";
import { MaterialsChapter } from "@/components/MaterialsChapter";
import { CatalogsShowcase } from "@/components/CatalogsShowcase";
import { GoldSpotlight } from "@/components/GoldSpotlight";
import { DiamondSpotlight } from "@/components/DiamondSpotlight";
import { RubySpotlight } from "@/components/RubySpotlight";
import { FeaturedCollections } from "@/components/FeaturedCollections";
import { MaisonTicker } from "@/components/MaisonTicker";
import { MaisonEdit } from "@/components/MaisonEdit";
import { AtelierPromise } from "@/components/AtelierPromise";
import { VisitMaison } from "@/components/VisitMaison";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { HomeEntrance } from "@/components/HomeEntrance";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EASE = "expo.out";
const EASE_SOFT = "power2.out";

/**
 * Hallmark · Manifesto / runway homepage
 * Horizontal-sweep claims · look-numbered materials · Silhouette/Floor soft-only.
 */
export function HomePage({
  newArrivals,
  bestSellers,
  diamondProducts,
}: {
  newArrivals: import("@/lib/products").Product[];
  bestSellers: import("@/lib/products").Product[];
  diamondProducts: import("@/lib/products").Product[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isMotion: "(prefers-reduced-motion: no-preference)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const { reduceMotion, isDesktop } = context.conditions!;
          if (reduceMotion) {
            gsap.set(
              [".reveal-item", ".reveal-image", ".spotlight-media", ".spotlight-cta"],
              { clearProps: "all", opacity: 1 }
            );
            return;
          }

          const softReveals = gsap.utils.toArray<HTMLElement>(
            "#collections .reveal-item, #the-edit .reveal-item"
          );
          const softSet = new Set(softReveals);
          const revealItems = gsap.utils
            .toArray<HTMLElement>(".reveal-item")
            .filter((el) => !softSet.has(el));

          gsap.set(softReveals, { opacity: 0 });
          gsap.set(revealItems, { opacity: 0, x: -36 });

          ScrollTrigger.batch(softReveals, {
            start: "top 92%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                duration: 0.85,
                ease: EASE_SOFT,
                stagger: 0.04,
                overwrite: true,
              });
            },
          });

          /* Manifesto: horizontal sweep */
          ScrollTrigger.batch(revealItems, {
            start: "top 88%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                x: 0,
                duration: 1.05,
                ease: EASE,
                stagger: 0.07,
                overwrite: true,
              });
            },
          });

          /* Catalogs use their own pinned horizontal runway — skip here */
          gsap.utils
            .toArray<HTMLElement>(".spotlight-stage")
            .forEach((stage) => {
              const media =
                stage.querySelector<HTMLElement>(".spotlight-media") ??
                stage.querySelector<HTMLElement>(".poster-zoom-img");
              const parallax = stage.querySelector<HTMLElement>(
                "[data-parallax-layer]"
              );
              const cta = stage.querySelector<HTMLElement>(".spotlight-cta");

              if (media && stage.classList.contains("spotlight-stage")) {
                gsap.fromTo(
                  media,
                  { scale: isDesktop ? 1.08 : 1.03, opacity: 0.65 },
                  {
                    scale: 1,
                    opacity: 1,
                    duration: 1.25,
                    ease: EASE,
                    scrollTrigger: {
                      trigger: stage,
                      start: "top 80%",
                      once: true,
                    },
                  }
                );
              }

              if (parallax && isDesktop) {
                gsap.fromTo(
                  parallax,
                  { yPercent: -8 },
                  {
                    yPercent: 8,
                    ease: "none",
                    scrollTrigger: {
                      trigger: stage,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.65,
                    },
                  }
                );
              }

              if (cta) {
                gsap.fromTo(
                  cta,
                  { opacity: 0, y: 28 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: EASE,
                    scrollTrigger: {
                      trigger: stage,
                      start: "top 68%",
                      once: true,
                    },
                  }
                );
              }
            });

          if (isDesktop) {
            gsap.utils
              .toArray<HTMLElement>("[data-parallax-layer]")
              .forEach((el) => {
                if (
                  el.closest(".spotlight-stage") ||
                  el.closest("#catalogs")
                )
                  return;
                const trigger =
                  el.closest("[data-parallax-media]")?.parentElement ??
                  el.parentElement ??
                  el;
                gsap.fromTo(
                  el,
                  { yPercent: -5 },
                  {
                    yPercent: 5,
                    ease: "none",
                    scrollTrigger: {
                      trigger,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.7,
                    },
                  }
                );
              });
          }

          const heroCover = document.querySelector<HTMLElement>(
            "[data-hero-cover]"
          );
          const boutique = document.querySelector<HTMLElement>(".boutique");
          if (heroCover && boutique) {
            gsap.fromTo(
              heroCover,
              { scale: 1, y: 0 },
              {
                scale: 0.9,
                y: 64,
                ease: "none",
                scrollTrigger: {
                  trigger: boutique,
                  start: "top bottom",
                  end: "top top",
                  scrub: 0.5,
                },
              }
            );
          }

          const heroParallax = document.querySelector<HTMLElement>(
            "[data-hero-parallax]"
          );
          if (heroParallax && isDesktop) {
            gsap.fromTo(
              heroParallax,
              { yPercent: 0, scale: 1.05 },
              {
                yPercent: 10,
                scale: 1.12,
                ease: "none",
                scrollTrigger: {
                  trigger: "#hero",
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.55,
                },
              }
            );
          } else if (heroParallax) {
            gsap.set(heroParallax, { clearProps: "transform" });
          }

          const safety = window.setTimeout(() => {
            [...softReveals, ...revealItems].forEach((el) => {
              if (getComputedStyle(el).opacity === "0") {
                gsap.set(el, { opacity: 1, x: 0, clearProps: "transform" });
              }
            });
            gsap.set(".spotlight-cta", { opacity: 1, clearProps: "transform" });
            gsap.set(".spotlight-media", {
              opacity: 1,
              clearProps: "transform",
            });
          }, 3200);

          const refresh = () => ScrollTrigger.refresh();
          window.addEventListener("load", refresh);
          const raf = requestAnimationFrame(() => {
            refresh();
            setTimeout(refresh, 500);
          });

          return () => {
            window.clearTimeout(safety);
            window.removeEventListener("load", refresh);
            cancelAnimationFrame(raf);
          };
        }
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <SmoothScroll>
      <HomeEntrance>
        <div ref={rootRef} className="relative">
          <ScrollProgress />
          <Navigation />
          <Hero />

          <div className="boutique relative z-10 bg-white shadow-[0_-64px_110px_rgba(14,12,10,0.2)]">
            <MaisonWelcome />
            <MaterialsChapter />
            <GoldSpotlight />
            <DiamondSpotlight products={diamondProducts} />
            <RubySpotlight />
            <MaisonTicker />
            <CatalogsShowcase />

            {/* Soft fade only — structure untouched */}
            <FeaturedCollections />
            <MaisonEdit newArrivals={newArrivals} bestSellers={bestSellers} />

            <AtelierPromise />
            <VisitMaison />
            <Newsletter />
            <Footer />
          </div>
        </div>
      </HomeEntrance>
    </SmoothScroll>
  );
}
