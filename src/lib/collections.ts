import { kundanProductImages } from "@/lib/product-assets";

export type CollectionMeta = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  status: "live" | "soon";
};

export const collectionJourney: CollectionMeta[] = [
  {
    slug: "rings",
    title: "Rings",
    subtitle: "Eternal bands",
    description: "Solitaires, halos, and sculptural bands for forever.",
    image: kundanProductImages.rings,
    href: "/collections/rings",
    status: "live",
  },
  {
    slug: "necklaces",
    title: "Necklaces",
    subtitle: "Statement grace",
    description: "Pendants and cascades composed for the collarbone.",
    image: kundanProductImages.necklaces,
    href: "/collections/necklaces",
    status: "live",
  },
  {
    slug: "bracelets",
    title: "Bracelets",
    subtitle: "Soft brilliance",
    description: "Cuffs and tennis lines with quiet radiance.",
    image: kundanProductImages.bracelets,
    href: "/collections/bracelets",
    status: "live",
  },
];

export function getAdjacentCollections(currentSlug: string) {
  const index = collectionJourney.findIndex((c) => c.slug === currentSlug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? collectionJourney[index - 1] : null,
    next:
      index < collectionJourney.length - 1
        ? collectionJourney[index + 1]
        : null,
  };
}
