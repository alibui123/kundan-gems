"use client";

import {
  useCallback,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "span";
} & HTMLAttributes<HTMLElement>;

/**
 * Subtle cursor-follow on fine pointers only — luxury restraint (~4–8px).
 */
export function Magnetic({
  children,
  className = "",
  strength = 0.22,
  as: Tag = "div",
  ...rest
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const frame = useRef(0);

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
  }, []);

  const onMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (reduce) return;
      const el = ref.current;
      if (!el) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
      }

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
      });
    },
    [reduce, strength]
  );

  const style: CSSProperties = {
    transition: reduce
      ? undefined
      : "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)",
    willChange: reduce ? undefined : "transform",
  };

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={reset}
      {...rest}
    >
      {children}
    </Tag>
  );
}
