"use client";

import { useState } from "react";

const routes = [
  {
    id: "occasion",
    label: "Catalogs",
    title: "By occasion",
    description:
      "Start with the moment — bridal ceremony, high jewellery evenings, or everyday gold.",
    href: "#catalogs",
    destinations: ["Mehr · Bridal", "Noor · High jewellery", "Rozana · Everyday"],
  },
  {
    id: "material",
    label: "Materials",
    title: "By stone & metal",
    description:
      "Enter by the substance itself — diamond fire, warm gold, or living ruby.",
    href: "#materials",
    destinations: ["Diamond", "Gold", "Ruby"],
  },
  {
    id: "form",
    label: "Forms",
    title: "By silhouette",
    description:
      "Prefer the shape of the piece? Refine by material inside each collection.",
    href: "#collections",
    destinations: ["Rings", "Necklaces", "Bracelets"],
  },
] as const;

/**
 * Maison directory — three vertical path panels.
 */
export function BrowseIndex() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="browse"
      className="relative overflow-hidden border-b border-border bg-ivory"
      aria-label="How to shop"
    >
      <div className="container-luxury py-14 md:py-20 lg:py-24">
        <div className="reveal-item mb-12 max-w-xl md:mb-16">
          <p className="label-caps mb-3">How to shop</p>
          <h2 className="font-display text-[clamp(2.15rem,3.8vw,3.15rem)] leading-[1.1] tracking-[0.01em] text-ink">
            Choose your
            <span className="mt-1 block italic text-gold">path in</span>
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-[1.75] text-muted">
            The maison is organised three ways. Pick the route that matches how
            you already think about jewellery.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
          {routes.map((route, i) => {
            const isActive = active === i;
            return (
              <a
                key={route.id}
                href={route.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`reveal-item group relative flex min-h-[340px] flex-col border border-border p-6 transition-colors duration-400 md:min-h-[400px] md:p-7 lg:p-8 ${
                  isActive
                    ? "border-gold/50 bg-stone/60"
                    : "bg-transparent hover:border-gold/30 hover:bg-stone/30"
                }`}
              >
                <span
                  className={`text-[10px] tracking-[0.22em] uppercase transition-colors ${
                    isActive ? "text-gold" : "text-muted"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")} · {route.label}
                </span>

                <h3
                  className={`mt-6 font-display text-[clamp(1.85rem,2.8vw,2.35rem)] leading-none tracking-[0.01em] transition-colors duration-400 ${
                    isActive
                      ? "text-ink"
                      : "text-ink/55 group-hover:text-ink/80"
                  }`}
                >
                  {route.title}
                </h3>

                <p className="mt-4 text-[14px] leading-relaxed text-muted">
                  {route.description}
                </p>

                <div className="mt-6 flex flex-col gap-2 border-t border-border pt-5">
                  {route.destinations.map((dest) => (
                    <span
                      key={dest}
                      className="text-[11px] tracking-[0.12em] text-ink/50 uppercase"
                    >
                      {dest}
                    </span>
                  ))}
                </div>

                <span
                  className={`mt-auto inline-flex items-center gap-3 pt-8 text-[10px] font-medium tracking-[0.18em] uppercase transition-colors ${
                    isActive
                      ? "text-gold"
                      : "text-ink/35 group-hover:text-ink/60"
                  }`}
                >
                  Continue
                  <span
                    className={`h-px bg-current transition-all duration-400 ${
                      isActive ? "w-10" : "w-5 group-hover:w-8"
                    }`}
                    aria-hidden
                  />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
