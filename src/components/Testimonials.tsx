"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { testimonials } from "@/lib/data";

const AUTO_MS = 3000;

gsap.registerPlugin(useGSAP);

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const progressTween = useRef<gsap.core.Tween | null>(null);

  const goTo = useCallback((index: number) => {
    setActive((prev) => {
      const next =
        ((index % testimonials.length) + testimonials.length) %
        testimonials.length;
      return next === prev ? prev : next;
    });
  }, []);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Crossfade slide content on change
  useGSAP(
    () => {
      if (!slideRef.current) return;
      gsap.fromTo(
        slideRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" }
      );
    },
    { dependencies: [active] }
  );

  // Auto-advance + progress bar
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    progressTween.current?.kill();

    if (paused || reduceMotion) {
      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 0 });
      }
      return;
    }

    if (progressRef.current) {
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });
      progressTween.current = gsap.to(progressRef.current, {
        scaleX: 1,
        duration: AUTO_MS / 1000,
        ease: "none",
      });
    }

    const timer = window.setTimeout(next, AUTO_MS);
    return () => {
      window.clearTimeout(timer);
      progressTween.current?.kill();
    };
  }, [active, paused, next]);

  const item = testimonials[active];

  return (
    <section className="section-reveal bg-white pb-24 md:pb-36">
      <div className="container-luxury">
        <div
          className="reveal-item mx-auto max-w-3xl text-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setPaused(false);
            }
          }}
        >
          <p className="mb-4 text-[11px] font-medium tracking-[0.24em] text-gold uppercase">
            Voices
          </p>

          <div
            className="relative min-h-[320px] md:min-h-[300px]"
            aria-roledescription="carousel"
            aria-label="Customer reviews"
          >
            <div ref={slideRef} key={active}>
              <div
                className="mb-8 flex justify-center gap-1 text-gold"
                aria-label="5 star rating"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} />
                ))}
              </div>

              <blockquote className="font-display text-[clamp(1.75rem,4vw,3rem)] font-light leading-[1.25] text-ink text-balance">
                “{item.quote}”
              </blockquote>

              <div className="mt-10 flex flex-col items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium tracking-wide text-ink">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs tracking-[0.16em] text-muted uppercase">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Prev / Next */}
            <button
              type="button"
              aria-label="Previous review"
              onClick={prev}
              className="absolute top-1/2 left-0 hidden -translate-y-1/2 text-muted transition-colors hover:text-gold md:-left-12 md:block lg:-left-16"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              aria-label="Next review"
              onClick={next}
              className="absolute top-1/2 right-0 hidden -translate-y-1/2 text-muted transition-colors hover:text-gold md:-right-12 md:block lg:-right-16"
            >
              <Chevron dir="right" />
            </button>
          </div>

          {/* Dots + active progress */}
          <div className="mt-10 flex justify-center gap-3" role="tablist">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Show review ${i + 1}`}
                onClick={() => goTo(i)}
                className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                  i === active ? "w-10 bg-border" : "w-1.5 bg-border hover:bg-gold/50"
                }`}
              >
                {i === active && (
                  <span
                    ref={progressRef}
                    className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 rounded-full bg-gold"
                  />
                )}
              </button>
            ))}
          </div>

          <p className="mt-4 text-[10px] tracking-[0.18em] text-muted/70 uppercase">
            {active + 1} / {testimonials.length}
          </p>
        </div>
      </div>
    </section>
  );
}

function Star() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5l2.7 6.2 6.8.6-5.2 4.5 1.6 6.6L12 16.8 6.1 20.4l1.6-6.6L2.5 9.3l6.8-.6L12 2.5z" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
