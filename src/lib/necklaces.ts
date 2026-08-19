import { kundanProductImages } from "@/lib/product-assets";

const NECKLACE_IMAGE = kundanProductImages.necklaces;

export type NecklaceProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  priceLabel: string;
  description: string;
  metal: string;
  carat: string;
  length: string[];
  image: string;
  gallery: string[];
  badge?: string;
};

export const necklaces: NecklaceProduct[] = [
  {
    id: "neck-lumen",
    slug: "lumen-pendant",
    name: "Lumen Pendant",
    price: 2150,
    priceLabel: "$2,150",
    description:
      "A floating brilliant on a whisper-thin chain — light that rests quietly at the collarbone.",
    metal: "18k Yellow Gold",
    carat: "0.45 ct",
    length: ["16\"", "18\"", "20\""],
    image: NECKLACE_IMAGE,
    gallery: [NECKLACE_IMAGE],
    badge: "Best Seller",
  },
  {
    id: "neck-ivory",
    slug: "ivory-cascade",
    name: "Ivory Cascade",
    price: 3720,
    priceLabel: "$3,720",
    description:
      "Layered strands of graduated diamonds — a soft waterfall for evening and forever after.",
    metal: "Platinum",
    carat: "2.10 ct tw",
    length: ["16\"", "18\""],
    image: NECKLACE_IMAGE,
    gallery: [NECKLACE_IMAGE],
    badge: "Signature",
  },
  {
    id: "neck-nocturne",
    slug: "nocturne-drop",
    name: "Nocturne Drop",
    price: 2980,
    priceLabel: "$2,980",
    description:
      "A pear-shaped drop suspended from a delicate line — drama in a single point of light.",
    metal: "18k White Gold",
    carat: "0.85 ct",
    length: ["16\"", "18\"", "20\""],
    image: NECKLACE_IMAGE,
    gallery: [NECKLACE_IMAGE],
    badge: "New",
  },
  {
    id: "neck-soleil",
    slug: "soleil-collar",
    name: "Soleil Collar",
    price: 4850,
    priceLabel: "$4,850",
    description:
      "A sculptural collar of shared-prong diamonds — radiant structure for the modern neckline.",
    metal: "18k Yellow Gold",
    carat: "3.20 ct tw",
    length: ["15\"", "16\""],
    image: NECKLACE_IMAGE,
    gallery: [NECKLACE_IMAGE],
  },
  {
    id: "neck-mira",
    slug: "mira-tennis",
    name: "Mira Tennis",
    price: 6200,
    priceLabel: "$6,200",
    description:
      "A continuous line of matched brilliants — classic tennis, finished with atelier precision.",
    metal: "Platinum",
    carat: "4.00 ct tw",
    length: ["16\"", "17\"", "18\""],
    image: NECKLACE_IMAGE,
    gallery: [NECKLACE_IMAGE],
    badge: "Atelier",
  },
  {
    id: "neck-vesper",
    slug: "vesper-lariat",
    name: "Vesper Lariat",
    price: 2460,
    priceLabel: "$2,460",
    description:
      "An open lariat with twin drops — adjustable, architectural, made for layering or standing alone.",
    metal: "18k Rose Gold",
    carat: "0.62 ct tw",
    length: ["Adjustable"],
    image: NECKLACE_IMAGE,
    gallery: [NECKLACE_IMAGE],
  },
  {
    id: "neck-opaline",
    slug: "opaline-choker",
    name: "Opaline Choker",
    price: 3180,
    priceLabel: "$3,180",
    description:
      "A close-fitting line of baguettes and rounds — intimate brilliance for high necklines.",
    metal: "18k White Gold",
    carat: "1.40 ct tw",
    length: ["14\"", "15\""],
    image: NECKLACE_IMAGE,
    gallery: [NECKLACE_IMAGE],
  },
  {
    id: "neck-celeste",
    slug: "celeste-station",
    name: "Celeste Station",
    price: 1890,
    priceLabel: "$1,890",
    description:
      "Spaced stations of light along a fine chain — effortless daily wear with heirloom intent.",
    metal: "18k Yellow Gold",
    carat: "0.35 ct tw",
    length: ["16\"", "18\"", "20\""],
    image: NECKLACE_IMAGE,
    gallery: [NECKLACE_IMAGE],
    badge: "New",
  },
];

export const necklacePreviews = [
  {
    name: "Aurora Fringe",
    eta: "Autumn edit",
    image: NECKLACE_IMAGE,
  },
  {
    name: "Gilded Rivière",
    eta: "Private release",
    image: NECKLACE_IMAGE,
  },
  {
    name: "Moonlit Collar",
    eta: "By appointment",
    image: NECKLACE_IMAGE,
  },
];

export function getNecklaceBySlug(slug: string) {
  return necklaces.find((n) => n.slug === slug);
}
