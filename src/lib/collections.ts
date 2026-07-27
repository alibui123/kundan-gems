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
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85",
    href: "/collections/rings",
    status: "live",
  },
  {
    slug: "necklaces",
    title: "Necklaces",
    subtitle: "Statement grace",
    description: "Pendants and cascades composed for the collarbone.",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=85",
    href: "/collections/necklaces",
    status: "live",
  },
  {
    slug: "bracelets",
    title: "Bracelets",
    subtitle: "Soft brilliance",
    description: "Cuffs and tennis lines with quiet radiance.",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=85",
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
