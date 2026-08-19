"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { MaisonWelcome } from "@/components/MaisonWelcome";
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

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
        },
        (context) => {
          const { reduceMotion } = context.conditions!;
          if (reduceMotion) {
            gsap.set(
              [
                ".reveal-item",
                ".reveal-image",
                ".spotlight-media",
                ".spotlight-cta",
              ],
              { clearProps: "all", opacity: 1 }
            );
            return;
          }

          const revealItems = gsap.utils.toArray<HTMLElement>(".reveal-item");
          const revealImages = gsap.utils.toArray<HTMLElement>(".reveal-image");

          gsap.set(revealItems, { opacity: 0, y: 28, scale: 0.985 });
          gsap.set(revealImages, { opacity: 0, y: 36, scale: 1.04 });

          ScrollTrigger.batch(revealItems, {
            start: "top 88%",
            once: true,
            interval: 0.08,
            batchMax: 8,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.95,
                ease: "power3.out",
                stagger: 0.06,
                overwrite: true,
                clearProps: "transform",
              });
            },
          });

          ScrollTrigger.batch(revealImages, {
            start: "top 86%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.15,
                ease: "power3.out",
                overwrite: true,
                clearProps: "transform",
              });
            },
          });

          /* Full-bleed gold / ruby posters — settle + CTA rise */
          gsap.utils
            .toArray<HTMLElement>(".spotlight-stage")
            .forEach((stage) => {
              const media = stage.querySelector<HTMLElement>(".spotlight-media");
              const parallax = stage.querySelector<HTMLElement>(
                ".spotlight-parallax"
              );
              const cta = stage.querySelector<HTMLElement>(".spotlight-cta");

              if (media) {
                gsap.fromTo(
                  media,
                  { scale: 1.16, opacity: 0.4, clipPath: "inset(12% 8% 12% 8%)" },
                  {
                    scale: 1,
                    opacity: 1,
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.45,
                    ease: "power3.out",
                    scrollTrigger: {
                      trigger: stage,
                      start: "top 82%",
                      once: true,
                    },
                  }
                );
              }

              if (parallax) {
                gsap.fromTo(
                  parallax,
                  { yPercent: -7 },
                  {
                    yPercent: 7,
                    ease: "none",
                    scrollTrigger: {
                      trigger: stage,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: true,
                    },
                  }
                );
              }

              if (cta) {
                gsap.fromTo(
                  cta,
                  { opacity: 0, y: 28, scale: 0.96 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.75,
                    ease: "power3.out",
                    delay: 0.2,
                    scrollTrigger: {
                      trigger: stage,
                      start: "top 72%",
                      once: true,
                    },
                  }
                );
              }
            });

          /* Diamond campaign half — soft vertical drift */
          gsap.utils
            .toArray<HTMLElement>("[data-parallax-drift]")
            .forEach((el) => {
              gsap.fromTo(
                el,
                { yPercent: -5 },
                {
                  yPercent: 5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el.parentElement ?? el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                }
              );
            });

          /* Hero stays pinned; boutique covers it — soft settle underneath */
          const heroCover = document.querySelector<HTMLElement>(
            "[data-hero-cover]"
          );
          const boutique = document.querySelector<HTMLElement>(".boutique");
          if (heroCover && boutique) {
            gsap.fromTo(
              heroCover,
              { scale: 1, y: 0, filter: "brightness(1)" },
              {
                scale: 0.9,
                y: 48,
                filter: "brightness(0.78)",
                ease: "none",
                scrollTrigger: {
                  trigger: boutique,
                  start: "top bottom",
                  end: "top top",
                  scrub: true,
                },
              }
            );
          }

          const heroParallax = document.querySelector<HTMLElement>(
            "[data-hero-parallax]"
          );
          if (heroParallax) {
            gsap.fromTo(
              heroParallax,
              { scale: 1.04 },
              {
                scale: 1.1,
                ease: "none",
                scrollTrigger: {
                  trigger: "#hero",
                  start: "top top",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }

          /* Catalogs void — slow ken-burns while in view */
          const catStage = document.querySelector<HTMLElement>(
            "[data-catalog-stage]"
          );
          if (catStage) {
            gsap.fromTo(
              catStage,
              { scale: 1 },
              {
                scale: 1.07,
                ease: "none",
                scrollTrigger: {
                  trigger: "#catalogs",
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }

          const safety = window.setTimeout(() => {
            [...revealItems, ...revealImages].forEach((el) => {
              if (getComputedStyle(el).opacity === "0") {
                gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
              }
            });
            gsap.set(".spotlight-cta", { opacity: 1, clearProps: "transform" });
            gsap.set(".spotlight-media", {
              opacity: 1,
              clearProps: "transform",
            });
          }, 2400);

          const refresh = () => ScrollTrigger.refresh();
          window.addEventListener("load", refresh);
          const raf = requestAnimationFrame(() => {
            refresh();
            setTimeout(refresh, 400);
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
      <div ref={rootRef} className="relative">
        <Navigation />
        <Hero />
        <div className="boutique relative z-10 bg-white shadow-[0_-40px_80px_rgba(14,12,10,0.12)]">
          <MaisonWelcome />
          <GoldSpotlight />
          <DiamondSpotlight products={diamondProducts} />
          <RubySpotlight />
          <MaisonTicker />
          <CatalogsShowcase />
          <FeaturedCollections />
          <MaisonEdit newArrivals={newArrivals} bestSellers={bestSellers} />
          <AtelierPromise />
          <VisitMaison />
          <Newsletter />
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}
