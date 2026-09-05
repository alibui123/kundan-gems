"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Magnetic } from "@/components/Magnetic";

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Final CTA — visit and newsletter, combined into one close instead of
 * two consecutive quiet sections asking for the same attention twice.
 */
export function VisitMaison() {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden bg-void text-ivory"
      aria-label="Visit and newsletter"
    >
      <div className="container-maison px-6 py-24 sm:px-10 md:py-32">
        <div className="grid gap-16 md:grid-cols-2 md:gap-14 lg:gap-20">
          <div>
            <p className="reveal-item text-[10px] tracking-[0.36em] text-gold uppercase">
              Private viewing
            </p>
            <h2 className="reveal-item mt-6 font-display text-[clamp(2.25rem,4.6vw,3.5rem)] font-normal tracking-[0.02em] uppercase">
              Visit the maison
            </h2>
            <p className="reveal-item mt-6 max-w-sm text-[15px] leading-[1.85] text-ivory/60">
              Private viewings by appointment. Walk-ins welcome during salon
              hours — MM Alam Road, Lahore.
            </p>
            <p className="reveal-item mt-4 text-[13px] tracking-[0.06em] text-ivory/45">
              Tue–Sun · 11:00 – 19:00 · Closed Mondays
            </p>
            <Magnetic strength={0.28} className="reveal-item mt-10 inline-flex">
              <Link
                href="mailto:hello@kundan.atelier"
                className="btn-outline-luxe-light inline-flex h-14 items-center px-9 text-[10px] font-medium tracking-[0.26em] uppercase"
              >
                Book an appointment
              </Link>
            </Magnetic>
          </div>

          <div className="border-t border-ivory/12 pt-12 md:border-t-0 md:border-l md:pt-0 md:pl-14 lg:pl-20">
            <p className="reveal-item text-[10px] tracking-[0.36em] text-gold uppercase">
              Atelier notes
            </p>
            <h2 className="reveal-item mt-6 max-w-[16ch] font-display text-[clamp(2.25rem,4.6vw,3.5rem)] font-normal tracking-[0.02em] uppercase">
              Be first to the next unveiling
            </h2>
            <p className="reveal-item mt-6 max-w-sm text-[14px] leading-relaxed text-ivory/50">
              Limited releases, bridal fittings, and atelier notes — never
              noise.
            </p>

            <form
              className="reveal-item mt-10 flex max-w-md flex-col gap-3 sm:flex-row sm:items-center"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="Your email"
                className="input-luxe h-14 flex-1 border border-ivory/25 bg-transparent px-5 text-[14px] text-ivory outline-none placeholder:text-ivory/35"
              />
              <motion.button
                type="submit"
                className="btn-solid-luxe h-14 shrink-0 px-8 text-[10px] font-medium tracking-[0.26em] uppercase"
                whileHover={reduce ? undefined : { y: -1 }}
                whileTap={reduce ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {sent ? "Welcome" : "Subscribe"}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
