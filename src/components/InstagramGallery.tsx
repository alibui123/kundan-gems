"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { kundanProductImages } from "@/lib/product-assets";

const INSTAGRAM_URL = "https://www.instagram.com/kundan.atelier/";

const posts = [
  {
    src: kundanProductImages.rings,
    caption: "Heritage halo — evening light",
  },
  {
    src: kundanProductImages.necklaces,
    caption: "Lumen pendant at the collarbone",
  },
  {
    src: kundanProductImages.bracelets,
    caption: "Gold cuff, soft geometry",
  },
  {
    src: kundanProductImages.rings,
    caption: "Aurora solitaire — atelier desk",
  },
] as const;

const AUTO_MS = 4000;

export function InstagramGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActive(((index % posts.length) + posts.length) % posts.length);
  }, []);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % posts.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + posts.length) % posts.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const timer = window.setTimeout(next, AUTO_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, next]);

  return (
    <section id="instagram" className="section-reveal bg-white pb-24 md:pb-36">
      <div className="container-luxury">
        <div className="reveal-item mb-10 flex flex-col items-center text-center md:mb-14">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 text-[11px] font-medium tracking-[0.24em] text-gold uppercase transition-colors hover:text-gold-bright"
          >
            @kundan.atelier
          </a>
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light text-ink">
            Follow the atelier
          </h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-[52px] items-center gap-2.5 rounded-full border border-border px-8 text-[12px] tracking-[0.16em] text-ink uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-void"
          >
            <InstagramIcon />
            Follow on Instagram
          </a>
        </div>

        <div
          className="reveal-item relative mx-auto max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-white sm:aspect-[16/10]">
            {posts.map((post, i) => (
              <a
                key={post.src}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={i !== active}
                tabIndex={i === active ? 0 : -1}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  i === active
                    ? "z-10 opacity-100"
                    : "pointer-events-none z-0 opacity-0"
                }`}
              >
                <Image
                  src={post.src}
                  alt={post.caption}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-contain p-[8%]"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/55 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                  <p className="max-w-sm text-left text-[13px] leading-relaxed text-white/85">
                    {post.caption}
                  </p>
                  <span className="shrink-0 text-[11px] tracking-[0.2em] text-gold uppercase">
                    View on IG
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              aria-label="Previous post"
              onClick={prev}
              className="text-[11px] tracking-[0.16em] text-muted uppercase transition-colors hover:text-gold"
            >
              ← Prev
            </button>

            <p className="text-[11px] tracking-[0.2em] text-muted uppercase">
              {active + 1} / {posts.length}
            </p>

            <button
              type="button"
              aria-label="Next post"
              onClick={next}
              className="text-[11px] tracking-[0.16em] text-muted uppercase transition-colors hover:text-gold"
            >
              Next →
            </button>
          </div>

          <div className="mt-5 flex justify-center gap-2" role="tablist">
            {posts.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Show post ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-8 bg-gold"
                    : "w-1.5 bg-border hover:bg-gold/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-2 md:gap-3">
          {posts.map((post, i) => (
            <button
              key={`thumb-${post.src}`}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to post ${i + 1}`}
              className={`relative aspect-square overflow-hidden rounded-[12px] bg-white transition-opacity ${
                i === active ? "ring-1 ring-gold opacity-100" : "opacity-55 hover:opacity-90"
              }`}
            >
              <Image
                src={post.src}
                alt=""
                fill
                sizes="25vw"
                className="object-contain p-[8%]"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}
