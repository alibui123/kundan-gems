"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { isLocalPublicSrc } from "@/lib/local-image";

gsap.registerPlugin(useGSAP);

type ProductImageFrameProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  aspect?: "portrait" | "square";
  padding?: "card" | "detail" | "thumb";
  className?: string;
  imageClassName?: string;
  onError?: () => void;
  hoverScale?: boolean;
  fillContainer?: boolean;
};

const paddingClass = {
  card: "p-[14%] md:p-[16%]",
  detail: "p-[12%] md:p-[14%] lg:p-[16%]",
  thumb: "p-[12%]",
} as const;

/**
 * Maison product stage — pure white field, centered piece, soft ground shadow.
 * Optional hover scale is GSAP-owned (no CSS transition).
 */
export function ProductImageFrame({
  src,
  alt,
  sizes,
  priority,
  aspect = "portrait",
  padding = "card",
  className = "",
  imageClassName = "",
  onError,
  hoverScale = false,
  fillContainer = false,
}: ProductImageFrameProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const aspectClass = fillContainer
    ? ""
    : aspect === "square"
      ? "aspect-square"
      : "aspect-[4/5]";

  useGSAP(
    () => {
      if (!hoverScale) return;
      const root = rootRef.current;
      if (!root) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const fine = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;
      if (reduce || !fine) return;

      const img = root.querySelector<HTMLElement>(".product-stage__img");
      if (!img) return;

      gsap.set(img, { scale: 1, transformOrigin: "50% 50%" });

      const host =
        root.closest("a") ??
        root.closest(".group") ??
        root.parentElement ??
        root;
      const enter = () =>
        gsap.to(img, {
          scale: 1.04,
          duration: 0.85,
          ease: "power2.out",
          overwrite: "auto",
        });
      const leave = () =>
        gsap.to(img, {
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
        });

      host.addEventListener("pointerenter", enter);
      host.addEventListener("pointerleave", leave);
      return () => {
        host.removeEventListener("pointerenter", enter);
        host.removeEventListener("pointerleave", leave);
      };
    },
    { scope: rootRef, dependencies: [hoverScale, src] }
  );

  return (
    <div
      ref={rootRef}
      className={`product-stage relative bg-white ${aspectClass} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={isLocalPublicSrc(src)}
        onError={onError}
        className={`product-stage__img ${paddingClass[padding]} will-change-transform ${imageClassName}`}
      />
    </div>
  );
}
