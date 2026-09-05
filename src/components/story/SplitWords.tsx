"use client";

import type { ReactNode } from "react";

/** Split copy into stagger-ready word spans for GSAP reveals. */
export function SplitWords({
  text,
  className = "",
  wordClass = "",
}: {
  text: string;
  className?: string;
  wordClass?: string;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="story-word inline-block overflow-hidden align-top"
        >
          <span
            className={`story-word-inner inline-block will-change-transform ${wordClass}`}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

/** Split a single line for mask reveal. */
export function SplitLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`story-line block overflow-hidden ${className}`}>
      <span className="story-line-inner block will-change-transform">
        {children}
      </span>
    </span>
  );
}
