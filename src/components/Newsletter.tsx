"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as const;

/** Bleed ink newsletter — oversized CTA. */
export function Newsletter() {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden bg-void text-ivory"
    >
      <div className="container-maison relative px-6 py-28 text-center sm:px-10 md:py-36">
        <p className="reveal-item text-[10px] tracking-[0.36em] text-gold uppercase">
          Atelier notes
        </p>
        <h2 className="reveal-item mx-auto mt-6 max-w-[16ch] font-display text-[clamp(2.25rem,5vw,4rem)] font-normal tracking-[0.04em] uppercase">
          Be first to the next unveiling
        </h2>
        <p className="reveal-item mx-auto mt-6 max-w-sm text-[14px] leading-relaxed text-ivory/50">
          Limited releases, bridal fittings, and atelier notes — never noise.
        </p>

        <form
          className="reveal-item mx-auto mt-12 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center"
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
            className="input-luxe h-14 flex-1 border border-ivory/25 bg-transparent px-5 text-center text-[14px] text-ivory outline-none placeholder:text-ivory/35 sm:text-left"
          />
          <motion.button
            type="submit"
            className="btn-solid-luxe h-14 shrink-0 px-10 text-[10px] font-medium tracking-[0.26em] uppercase"
            whileHover={reduce ? undefined : { y: -1 }}
            whileTap={reduce ? undefined : { scale: 0.985 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {sent ? "Welcome" : "Subscribe"}
          </motion.button>
        </form>
      </div>
    </section>
  );
}
