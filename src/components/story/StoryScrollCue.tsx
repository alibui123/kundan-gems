"use client";

import { motion, useReducedMotion } from "motion/react";

/** Animated scroll cue for the cinematic prologue. */
export function StoryScrollCue({ visible }: { visible: boolean }) {
  const reduce = useReducedMotion();

  if (reduce || !visible) return null;

  return (
    <motion.div
      className="pointer-events-none flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <span className="text-[11px] font-medium tracking-[0.22em] text-ivory/45 uppercase">
        Scroll the story
      </span>
      <motion.span
        className="block h-9 w-px origin-top bg-gradient-to-b from-gold/80 to-transparent"
        animate={{ scaleY: [0.35, 1, 0.35], opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
