"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Quiet gold ring cursor cue — fine pointer only.
 * Spread `bind` onto the hoverable stage; render `cue` inside it.
 */
export function usePosterCursor(label = "View") {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduce]);

  const onEnter = useCallback(() => setActive(true), []);
  const onLeave = useCallback(() => setActive(false), []);
  const onMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const bind =
    enabled && !reduce
      ? {
          onMouseEnter: onEnter,
          onMouseLeave: onLeave,
          onMouseMove: onMove,
        }
      : {};

  const cue =
    enabled && !reduce ? (
      <motion.span
        className="pointer-events-none absolute z-[4] hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-void/30 backdrop-blur-[2px] lg:flex"
        style={{ left: pos.x, top: pos.y }}
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.88,
        }}
        transition={{ duration: 0.35, ease: EASE }}
        aria-hidden
      >
        <span className="text-[9px] font-medium tracking-[0.22em] text-ivory uppercase">
          {label}
        </span>
      </motion.span>
    ) : null;

  return { bind, cue };
}
