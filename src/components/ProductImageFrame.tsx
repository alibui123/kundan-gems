import Image from "next/image";
import { isLocalPublicSrc } from "@/lib/local-image";

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
  const aspectClass = fillContainer
    ? ""
    : aspect === "square"
      ? "aspect-square"
      : "aspect-[4/5]";

  return (
    <div
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
        className={`product-stage__img ${paddingClass[padding]} ${
          hoverScale
            ? "transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            : ""
        } ${imageClassName}`}
      />
    </div>
  );
}
