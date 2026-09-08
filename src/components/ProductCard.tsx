"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState, type PointerEvent } from "react";
import { useCart } from "@/components/CartProvider";
import { ProductImageFrame } from "@/components/ProductImageFrame";

type ProductCardProps = {
  id: string;
  slug?: string;
  href?: string;
  name: string;
  price: string;
  priceValue?: number;
  image: string;
  aspect?: "portrait" | "square";
  size?: string;
  /** Horizontal snap rail (legacy carousels). Default is homepage grid density. */
  rail?: boolean;
  /** @deprecated Homepage density is now the default. Kept for call-site compatibility. */
  compact?: boolean;
};

/**
 * Product card — same density as homepage “On the floor” everywhere.
 */
export function ProductCard({
  id,
  slug,
  href,
  name,
  price,
  priceValue,
  image,
  aspect = "square",
  size,
  rail = false,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();
  const tiltRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onTiltMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = tiltRef.current;
    if (!el) return;
    el.style.transition = "none";
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(
        2
      )}deg) rotateY(${(px * 7).toFixed(2)}deg) scale3d(1.02,1.02,1.02)`;
    });
  }, []);

  const onTiltLeave = useCallback(() => {
    const el = tiltRef.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }, []);

  const productHref = href ?? (slug ? `/collections/rings/${slug}` : undefined);

  const handleAdd = () => {
    const pathFromHref = href
      ? href.split("/").slice(0, -1).join("/") || undefined
      : undefined;

    addItem({
      id,
      slug: slug ?? id,
      name,
      price: priceValue ?? (Number(price.replace(/[^0-9.]/g, "")) || 0),
      priceLabel: price,
      image,
      size,
      collectionPath: pathFromHref,
    });
  };

  return (
    <article
      className={`reveal-item group ${
        rail ? "min-w-[72%] snap-start md:min-w-0" : "min-w-0"
      }`}
    >
      <div
        ref={tiltRef}
        onPointerMove={onTiltMove}
        onPointerLeave={onTiltLeave}
        className="relative will-change-transform"
      >
        {productHref ? (
          <Link href={productHref} className="block">
            <CardMedia
              name={name}
              image={image}
              aspect={aspect}
              imgError={imgError}
              onImgError={() => setImgError(true)}
              rail={rail}
            />
          </Link>
        ) : (
          <CardMedia
            name={name}
            image={image}
            aspect={aspect}
            imgError={imgError}
            onImgError={() => setImgError(true)}
            rail={rail}
          />
        )}
        <button
          type="button"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => setLiked((v) => !v)}
          className="absolute top-1.5 right-1.5 z-10 flex h-7 w-7 items-center justify-center bg-white/90 text-ink/70 shadow-sm transition-colors hover:text-gold md:top-3 md:right-3 md:h-8 md:w-8"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z"
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="mt-2.5 px-0.5 md:mt-4">
        {productHref ? (
          <Link href={productHref} className="block">
            <h3 className="line-clamp-2 font-display text-[0.95rem] leading-snug font-light text-ink transition-colors hover:text-gold md:text-xl">
              {name}
            </h3>
            <p className="mt-0.5 text-[11px] text-muted md:mt-1 md:text-[13px]">
              {price}
            </p>
          </Link>
        ) : (
          <>
            <h3 className="line-clamp-2 font-display text-[0.95rem] leading-snug font-light text-ink md:text-xl">
              {name}
            </h3>
            <p className="mt-0.5 text-[11px] text-muted md:mt-1 md:text-[13px]">
              {price}
            </p>
          </>
        )}
        <button
          type="button"
          onClick={handleAdd}
          className="mt-2 w-full border border-border py-1.5 text-[9px] font-medium tracking-[0.14em] text-ink uppercase transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-ivory md:mt-4 md:py-2.5 md:text-[10px]"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

function CardMedia({
  name,
  image,
  aspect,
  imgError,
  onImgError,
  rail = false,
}: {
  name: string;
  image: string;
  aspect: "portrait" | "square";
  imgError: boolean;
  onImgError: () => void;
  rail?: boolean;
}) {
  if (imgError) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-white ${
          aspect === "square" ? "aspect-square" : "aspect-[4/5]"
        }`}
      >
        <Image
          src="/logo.png"
          alt="Kundan"
          width={120}
          height={130}
          className="h-14 w-auto object-contain opacity-80"
        />
      </div>
    );
  }

  return (
    <ProductImageFrame
      src={image}
      alt={name}
      aspect={aspect}
      sizes={
        rail
          ? "(max-width: 768px) 72vw, 25vw"
          : "(max-width: 768px) 45vw, 25vw"
      }
      onError={onImgError}
      hoverScale
    />
  );
}
