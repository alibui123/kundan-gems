import type { Category } from "@/lib/products";

/** Kundan maison product photography — one hero asset per form. */
export const kundanProductImages = {
  rings: "/products/kundan-ring.png",
  necklaces: "/products/kundan-necklace.png",
  bracelets: "/products/kundan-bracelet.png",
} as const;

export type KundanProductImage =
  (typeof kundanProductImages)[keyof typeof kundanProductImages];

export function productImageForCategory(category: Category): string {
  return kundanProductImages[category];
}

/** Override Supabase/Unsplash URLs with the category studio shot. */
export function resolveProductMedia(
  category: Category,
  _slug: string,
  fallbackImage: string
) {
  const image = productImageForCategory(category);
  return {
    image,
    gallery: [image],
  };
}

/** @deprecated Use kundanProductImages — kept for any legacy imports */
export const productAssets = {
  ring: kundanProductImages.rings,
  necklace: kundanProductImages.necklaces,
  bracelet: kundanProductImages.bracelets,
} as const;
