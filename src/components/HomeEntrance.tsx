"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Soft fade + scale-in when the homepage mounts (client navigations included).
 * Fast — opacity/transform only; skipped under reduced motion.
 */
export function HomeEntrance({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.988 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, ease: EASE }}
      style={{ transformOrigin: "50% 0%" }}
    >
      {children}
    </motion.div>
  );
}
