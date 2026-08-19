"use client";

import Image from "next/image";
import { brand } from "@/lib/data";

type BrandLoaderProps = {
  /** full-screen overlay vs inline mark */
  variant?: "overlay" | "inline";
  className?: string;
  /** restart fill animation when key changes */
  fillKey?: string | number;
};

/**
 * Custom loader — translucent stage + gold logo that fills colour from the base up.
 * Uses the brand gold mark (not the silver loader asset) so the fill reads as gold.
 */
export function BrandLoader({
  variant = "overlay",
  className = "",
  fillKey = 0,
}: BrandLoaderProps) {
  const mark = (
    <div
      key={fillKey}
      className={`loader-mark relative mx-auto ${
        variant === "overlay" ? "h-36 w-36 sm:h-44 sm:w-44" : "h-24 w-24"
      }`}
      role="status"
      aria-label="Loading"
    >
      {/* Muted silhouette waiting to be filled */}
      <Image
        src={brand.logo}
        alt=""
        fill
        priority
        sizes="176px"
        className="object-contain opacity-30 grayscale contrast-125"
        aria-hidden
      />
      {/* Gold colour fill — rises slowly */}
      <div className="loader-fill absolute inset-0 isolate">
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          priority
          sizes="176px"
          className="object-contain [filter:none]"
          style={{ filter: "none" }}
        />
      </div>
    </div>
  );

  if (variant === "inline") {
    return <div className={className}>{mark}</div>;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/75 backdrop-blur-md ${className}`}
    >
      {mark}
      <p className="mt-8 text-[10px] tracking-[0.32em] text-muted uppercase">
        {brand.name}
      </p>
    </div>
  );
}
