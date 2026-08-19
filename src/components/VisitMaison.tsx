"use client";

import Link from "next/link";

/**
 * Visit the floor — hours and appointment, like a maison plaque.
 */
export function VisitMaison() {
  return (
    <section
      className="border-t border-border bg-white"
      aria-label="Visit the maison"
    >
      <div className="container-luxury grid gap-12 py-20 md:grid-cols-12 md:items-end md:gap-10 md:py-28">
        <div className="reveal-item md:col-span-7">
          <h2 className="font-display text-[clamp(2.4rem,4.5vw,3.75rem)] leading-[1.06] text-ink">
            Visit the maison
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-[1.8] text-muted">
            Private viewings by appointment. Walk-ins welcome during salon
            hours — MM Alam Road, Lahore.
          </p>
        </div>
        <div className="reveal-item md:col-span-5 md:text-right">
          <p className="text-[13px] leading-relaxed text-muted">
            Tuesday–Sunday · 11:00 – 19:00
            <br />
            Closed Mondays
          </p>
          <Link
            href="#newsletter"
            className="mt-8 inline-flex h-12 items-center bg-ink px-8 text-[11px] font-medium tracking-[0.18em] text-ivory uppercase transition-colors hover:bg-gold hover:text-void"
          >
            Book an appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
