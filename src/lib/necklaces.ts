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
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=85",
    ],
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
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=85",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85",
    ],
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
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=85",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=85",
    ],
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
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=85",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85",
    ],
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
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=85",
    ],
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
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&q=85",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=85",
    ],
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
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=85",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=85",
    ],
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
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1200&q=85",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85",
    ],
    badge: "New",
  },
];

/** Upcoming atelier releases — not yet for sale */
export const necklacePreviews = [
  {
    name: "Aurora Fringe",
    eta: "Autumn edit",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85&sat=-40",
  },
  {
    name: "Gilded Rivière",
    eta: "Private release",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=85&sat=-20",
  },
  {
    name: "Moonlit Collar",
    eta: "By appointment",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=85&sat=-30",
  },
];

export function getNecklaceBySlug(slug: string) {
  return necklaces.find((n) => n.slug === slug);
}
