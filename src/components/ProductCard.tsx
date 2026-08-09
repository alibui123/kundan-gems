"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

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
};

export function ProductCard({
  id,
  slug,
  href,
  name,
  price,
  priceValue,
  image,
  aspect = "portrait",
  size,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();

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
    <article className="reveal-item group min-w-[72%] snap-start md:min-w-0">
      <div className="relative">
        {productHref ? (
          <Link href={productHref} className="block">
            <CardMedia
              name={name}
              image={image}
              aspect={aspect}
              imgError={imgError}
              onImgError={() => setImgError(true)}
            />
          </Link>
        ) : (
          <CardMedia
            name={name}
            image={image}
            aspect={aspect}
            imgError={imgError}
            onImgError={() => setImgError(true)}
          />
        )}
        <button
          type="button"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => setLiked((v) => !v)}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center bg-ivory/90 text-ink/70 transition-colors hover:text-gold"
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

      <div className="mt-4 px-0.5">
        {productHref ? (
          <Link href={productHref} className="block">
            <h3 className="font-display text-lg font-light text-ink transition-colors hover:text-gold md:text-xl">
              {name}
            </h3>
            <p className="mt-1 text-[13px] text-muted">{price}</p>
          </Link>
        ) : (
          <>
            <h3 className="font-display text-lg font-light text-ink md:text-xl">
              {name}
            </h3>
            <p className="mt-1 text-[13px] text-muted">{price}</p>
          </>
        )}
        <button
          type="button"
          onClick={handleAdd}
          className="mt-4 w-full border border-border py-2.5 text-[10px] font-medium tracking-[0.14em] text-ink uppercase transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-ivory"
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
}: {
  name: string;
  image: string;
  aspect: "portrait" | "square";
  imgError: boolean;
  onImgError: () => void;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-stone ${
        aspect === "square" ? "aspect-square" : "aspect-[4/5]"
      }`}
    >
      {!imgError ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 72vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          onError={onImgError}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#efe8dc] to-[#e0d4c4]">
          <Image
            src="/logo.png"
            alt="Kundan"
            width={120}
            height={130}
            className="h-14 w-auto object-contain opacity-80"
          />
        </div>
      )}
    </div>
  );
}
