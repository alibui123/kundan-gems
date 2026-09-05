/** Apple-style spring presets — critically damped by default, bounce only for momentum. */
export const SPRING = {
  /** Default UI — no overshoot */
  default: { type: "spring" as const, bounce: 0, duration: 0.4 },
  /** Snappy enter/exit */
  snappy: { type: "spring" as const, bounce: 0, duration: 0.3 },
  /** Momentum-driven (flicks, throws) */
  momentum: { type: "spring" as const, bounce: 0.2, duration: 0.4 },
  /** Gentle fade */
  gentle: { type: "spring" as const, bounce: 0, duration: 0.55 },
};
