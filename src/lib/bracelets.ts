import { kundanProductImages } from "@/lib/product-assets";

const BRACELET_IMAGE = kundanProductImages.bracelets;

export type BraceletProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  priceLabel: string;
  description: string;
  metal: string;
  carat: string;
  size: string[];
  image: string;
  gallery: string[];
  badge?: string;
};

export const bracelets: BraceletProduct[] = [
  {
    id: "br-veloce",
    slug: "veloce-cuff",
    name: "Véloce Cuff",
    price: 1890,
    priceLabel: "$1,890",
    description:
      "A sculpted open cuff with a soft inner curve — architectural gold for everyday presence.",
    metal: "18k Yellow Gold",
    carat: "—",
    size: ["S", "M", "L"],
    image: BRACELET_IMAGE,
    gallery: [BRACELET_IMAGE],
    badge: "Best Seller",
  },
  {
    id: "br-gilded",
    slug: "gilded-trace",
    name: "Gilded Trace",
    price: 2480,
    priceLabel: "$2,480",
    description:
      "An organic line traced with scattered diamonds — soft geometry that follows the wrist.",
    metal: "18k Yellow Gold",
    carat: "0.42 ct tw",
    size: ["S", "M", "L"],
    image: BRACELET_IMAGE,
    gallery: [BRACELET_IMAGE],
    badge: "Signature",
  },
  {
    id: "br-tennis",
    slug: "soft-tennis",
    name: "Soft Tennis",
    price: 5200,
    priceLabel: "$5,200",
    description:
      "A continuous bracelet of matched brilliants — classic tennis, finished with quiet precision.",
    metal: "Platinum",
    carat: "3.50 ct tw",
    size: ["16 cm", "17 cm", "18 cm", "19 cm"],
    image: BRACELET_IMAGE,
    gallery: [BRACELET_IMAGE],
    badge: "Atelier",
  },
  {
    id: "br-lumen",
    slug: "lumen-bangle",
    name: "Lumen Bangle",
    price: 1650,
    priceLabel: "$1,650",
    description:
      "A slim hinged bangle with a single flush diamond — minimal light for stacking or alone.",
    metal: "18k White Gold",
    carat: "0.12 ct",
    size: ["S", "M", "L"],
    image: BRACELET_IMAGE,
    gallery: [BRACELET_IMAGE],
    badge: "New",
  },
  {
    id: "br-nocturne",
    slug: "nocturne-chain",
    name: "Nocturne Chain",
    price: 2100,
    priceLabel: "$2,100",
    description:
      "A refined paperclip chain with a diamond clasp — modern links with heirloom weight.",
    metal: "18k Yellow Gold",
    carat: "0.18 ct",
    size: ["17 cm", "18 cm", "19 cm", "20 cm"],
    image: BRACELET_IMAGE,
    gallery: [BRACELET_IMAGE],
  },
  {
    id: "br-mira",
    slug: "mira-station",
    name: "Mira Station",
    price: 2780,
    priceLabel: "$2,780",
    description:
      "Spaced stations of light along a flexible bracelet — effortless radiance for daily wear.",
    metal: "18k Rose Gold",
    carat: "0.55 ct tw",
    size: ["S", "M", "L"],
    image: BRACELET_IMAGE,
    gallery: [BRACELET_IMAGE],
  },
  {
    id: "br-celeste",
    slug: "celeste-cuff",
    name: "Celeste Cuff",
    price: 3420,
    priceLabel: "$3,420",
    description:
      "A wider cuff set with a constellation of micro pavé — bold silhouette, soft sparkle.",
    metal: "18k White Gold",
    carat: "0.90 ct tw",
    size: ["S", "M", "L"],
    image: BRACELET_IMAGE,
    gallery: [BRACELET_IMAGE],
    badge: "Signature",
  },
  {
    id: "br-opaline",
    slug: "opaline-twist",
    name: "Opaline Twist",
    price: 1960,
    priceLabel: "$1,960",
    description:
      "Two interwoven strands — one polished, one pavé — a quiet twist for the modern wrist.",
    metal: "18k Yellow Gold",
    carat: "0.30 ct tw",
    size: ["S", "M", "L"],
    image: BRACELET_IMAGE,
    gallery: [BRACELET_IMAGE],
    badge: "New",
  },
];

export const braceletPreviews = [
  {
    name: "Aurora Link",
    eta: "Autumn edit",
    image: BRACELET_IMAGE,
  },
  {
    name: "Heritage Cuff",
    eta: "Private release",
    image: BRACELET_IMAGE,
  },
  {
    name: "Moonlit Tennis",
    eta: "By appointment",
    image: BRACELET_IMAGE,
  },
];

export function getBraceletBySlug(slug: string) {
  return bracelets.find((b) => b.slug === slug);
}
