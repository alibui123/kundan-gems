"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as const;

export function Newsletter() {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden border-t border-border bg-void text-ivory"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 80% at 90% 20%, rgba(184,154,94,0.18), transparent 60%)",
        }}
      />
      <div className="container-luxury relative grid gap-10 py-20 md:grid-cols-12 md:items-end md:gap-8 md:py-28">
        <div className="reveal-item md:col-span-6">
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.08] tracking-[0.01em] text-ivory">
            Be first to the next unveiling
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ivory/55">
            Limited releases, bridal fittings, and atelier notes — never noise.
          </p>
        </div>

        <form
          className="reveal-item flex flex-col gap-3 sm:flex-row sm:items-center md:col-span-6"
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
            className="h-[52px] flex-1 border border-ivory/20 bg-transparent px-5 text-[14px] text-ivory outline-none placeholder:text-ivory/35 focus:border-gold/50"
          />
          <motion.button
            type="submit"
            className="h-[52px] shrink-0 bg-gold px-8 text-[11px] font-medium tracking-[0.18em] text-void uppercase"
            whileHover={reduce ? undefined : { y: -2 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
          >
            {sent ? "Welcome" : "Subscribe"}
          </motion.button>
        </form>
      </div>
    </section>
  );
}
