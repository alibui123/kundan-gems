import Image from "next/image";
import { brand } from "@/lib/data";

type BrandLogoProps = {
  /** Visual size preset */
  size?: "nav" | "footer" | "hero" | "mark";
  className?: string;
  priority?: boolean;
};

const sizes = {
  nav: { width: 148, height: 80, className: "h-11 w-auto lg:h-12" },
  footer: { width: 180, height: 98, className: "h-14 w-auto" },
  hero: { width: 120, height: 130, className: "h-14 w-auto sm:h-16" },
  mark: { width: 96, height: 52, className: "h-10 w-auto" },
} as const;

/** Shared KG / Kundan mark — transparent gold on ivory. */
export function BrandLogo({
  size = "nav",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const s = sizes[size];
  return (
    <Image
      src={brand.logo}
      alt={brand.name}
      width={s.width}
      height={s.height}
      priority={priority}
      className={`${s.className} object-contain object-left ${className}`.trim()}
    />
  );
}
