"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { MaterialsRiver } from "@/components/MaterialsRiver";
import { MaisonTicker } from "@/components/MaisonTicker";
import { CatalogsShowcase } from "@/components/CatalogsShowcase";
import { FeaturedCollections } from "@/components/FeaturedCollections";
import { MaisonEdit } from "@/components/MaisonEdit";
import { AtelierPromise } from "@/components/AtelierPromise";
import { VisitMaison } from "@/components/VisitMaison";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Homepage — single-screen hero, one pinned climax (the materials),
 * then a boutique that rises over the hero on scroll.
 */
export function HomePage({
  newArrivals,
  bestSellers,
}: {
  newArrivals: import("@/lib/products").Product[];
  bestSellers: import("@/lib/products").Product[];
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
            gsap.set(".reveal-item", { clearProps: "all", opacity: 1 });
            return;
          }

          const revealItems = gsap.utils.toArray<HTMLElement>(".reveal-item");
          gsap.set(revealItems, {
            opacity: 0,
            y: isDesktop ? 36 : 24,
          });

          ScrollTrigger.batch(revealItems, {
            start: "top 90%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power3.out",
                stagger: 0.06,
                overwrite: true,
              });
            },
          });

          const refresh = () => ScrollTrigger.refresh();
          window.addEventListener("load", refresh);
          const raf = requestAnimationFrame(() => {
            refresh();
            setTimeout(refresh, 500);
            setTimeout(refresh, 1400);
          });

          const safety = window.setTimeout(() => {
            revealItems.forEach((el) => {
              if (getComputedStyle(el).opacity === "0") {
                gsap.set(el, {
                  opacity: 1,
                  y: 0,
                  clearProps: "transform",
                });
              }
            });
          }, 2800);

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
        <ScrollProgress />
        <Navigation />
        <Hero />

        <div className="boutique relative z-10 rounded-t-[1.75rem] bg-white shadow-[0_-32px_80px_rgba(14,12,10,0.14)] sm:rounded-t-[2.25rem] md:rounded-t-[2.5rem]">
          <Manifesto />
          <MaterialsRiver />
          <MaisonTicker />
          <CatalogsShowcase />
          <FeaturedCollections />
          <MaisonEdit newArrivals={newArrivals} bestSellers={bestSellers} />
          <AtelierPromise />
          <VisitMaison />
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}
