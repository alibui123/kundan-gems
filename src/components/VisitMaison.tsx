"use client";

import Link from "next/link";

/** Runway appointment — centred claim + typographic CTA. */
export function VisitMaison() {
  return (
    <section
      className="border-t border-border bg-white"
      aria-label="Visit the maison"
    >
      <div className="container-maison px-6 py-28 text-center sm:px-10 md:py-36 lg:py-44">
        <p className="reveal-item text-[10px] tracking-[0.36em] text-muted uppercase">
          Private viewing
        </p>
        <h2 className="reveal-item mt-6 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-normal tracking-[0.04em] text-ink uppercase">
          Visit the maison
        </h2>
        <p className="reveal-item mx-auto mt-8 max-w-md text-[15px] leading-[1.9] text-muted">
          Private viewings by appointment. Walk-ins welcome during salon hours —
          MM Alam Road, Lahore.
        </p>
        <p className="reveal-item mt-6 text-[13px] tracking-[0.08em] text-muted">
          Tue–Sun · 11:00 – 19:00 · Closed Mondays
        </p>
        <Link
          href="#newsletter"
          className="btn-outline-luxe reveal-item mt-12 inline-flex h-14 items-center px-10 text-[10px] font-medium tracking-[0.26em] uppercase"
        >
          Book an appointment
        </Link>
      </div>
    </section>
  );
}
