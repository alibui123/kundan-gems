"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { BrowseIndex } from "@/components/BrowseIndex";
import { CatalogsShowcase } from "@/components/CatalogsShowcase";
import { MaterialsShowcase } from "@/components/MaterialsShowcase";
import { FeaturedCollections } from "@/components/FeaturedCollections";
import { MaisonEdit } from "@/components/MaisonEdit";
import { AtelierPromise } from "@/components/AtelierPromise";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
        },
        (context) => {
          const { reduceMotion } = context.conditions!;
          if (reduceMotion) return;

          const revealItems = gsap.utils.toArray<HTMLElement>(".reveal-item");
          const revealImages = gsap.utils.toArray<HTMLElement>(".reveal-image");

          gsap.set(revealItems, { opacity: 0, y: 24 });
          gsap.set(revealImages, { opacity: 0, y: 18 });

          ScrollTrigger.batch(revealItems, {
            start: "top 90%",
            once: true,
            interval: 0.1,
            batchMax: 8,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power2.out",
                stagger: 0.07,
                overwrite: true,
                clearProps: "transform",
              });
            },
          });

          ScrollTrigger.batch(revealImages, {
            start: "top 88%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power2.out",
                overwrite: true,
                clearProps: "transform",
              });
            },
          });

          const safety = window.setTimeout(() => {
            revealItems.forEach((el) => {
              if (getComputedStyle(el).opacity === "0") {
                gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
              }
            });
            revealImages.forEach((el) => {
              if (getComputedStyle(el).opacity === "0") {
                gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
              }
            });
          }, 2200);

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
        <div className="boutique relative z-10 bg-white">
          <BrowseIndex />
          <CatalogsShowcase />
          <MaterialsShowcase />
          <FeaturedCollections />
          <MaisonEdit newArrivals={newArrivals} bestSellers={bestSellers} />
          <AtelierPromise />
          <Newsletter />
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}
