"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { BrandPromise } from "@/components/BrandPromise";
import { FeaturedCollections } from "@/components/FeaturedCollections";
import { MaterialsShowcase } from "@/components/MaterialsShowcase";
import { NewArrivals } from "@/components/NewArrivals";
import { SignatureCollection } from "@/components/SignatureCollection";
import { BestSellers } from "@/components/BestSellers";
import { Craftsmanship } from "@/components/Craftsmanship";
import { Testimonials } from "@/components/Testimonials";
import { InstagramGallery } from "@/components/InstagramGallery";
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

          // ——— Hero entrance is handled inside Hero (frame scrub + pin) ———

          // ——— Curtain reveal into boutique ———
          gsap.fromTo(
            ".boutique",
            { opacity: 0.45 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ".boutique",
                start: "top bottom",
                end: "top 25%",
                scrub: 1,
              },
            }
          );

          // ——— Section reveals: set → to (never leave items stuck hidden) ———
          const revealItems = gsap.utils.toArray<HTMLElement>(".reveal-item");
          const revealImages = gsap.utils.toArray<HTMLElement>(".reveal-image");

          gsap.set(revealItems, { opacity: 0, y: 40 });
          gsap.set(revealImages, { opacity: 0, scale: 1.06 });

          ScrollTrigger.batch(revealItems, {
            start: "top 92%",
            once: true,
            interval: 0.12,
            batchMax: 8,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.1,
                overwrite: true,
                clearProps: "transform",
              });
            },
          });

          ScrollTrigger.batch(revealImages, {
            start: "top 90%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                scale: 1,
                duration: 1.1,
                ease: "power2.out",
                overwrite: true,
                clearProps: "transform",
              });
            },
          });

          // Safety: if a batch never fires (layout edge case), force visible
          const safety = window.setTimeout(() => {
            revealItems.forEach((el) => {
              if (getComputedStyle(el).opacity === "0") {
                gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
              }
            });
            revealImages.forEach((el) => {
              if (getComputedStyle(el).opacity === "0") {
                gsap.set(el, { opacity: 1, scale: 1, clearProps: "transform" });
              }
            });
          }, 2500);

          // Parallax on editorial images
          revealImages.forEach((wrap) => {
            const img = wrap.querySelector("img");
            if (!img) return;
            gsap.fromTo(
              img,
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: "none",
                scrollTrigger: {
                  trigger: wrap,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });

          // Recalc after images/fonts settle (Lenis + Next Image)
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
        <div className="boutique relative z-10 bg-ivory pb-20 md:pb-0">
          <BrandPromise />
          <FeaturedCollections />
          <MaterialsShowcase />
          <NewArrivals products={newArrivals} />
          <SignatureCollection />
          <BestSellers products={bestSellers} />
          <Craftsmanship />
          <Testimonials />
          <InstagramGallery />
          <Newsletter />
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}
