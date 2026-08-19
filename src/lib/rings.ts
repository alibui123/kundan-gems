import { kundanProductImages } from "@/lib/product-assets";

const RING_IMAGE = kundanProductImages.rings;

export type RingProduct = {
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

export const rings: RingProduct[] = [
  {
    id: "ring-aurora",
    slug: "aurora-solitaire",
    name: "Aurora Solitaire",
    price: 4280,
    priceLabel: "$4,280",
    description:
      "A luminous round brilliant set in a quiet claw setting — proportioned for everyday radiance and lifelong wear.",
    metal: "18k Yellow Gold",
    carat: "1.02 ct",
    size: ["5", "6", "7", "8"],
    image: RING_IMAGE,
    gallery: [RING_IMAGE],
    badge: "Signature",
  },
  {
    id: "ring-heritage",
    slug: "heritage-halo",
    name: "Heritage Halo",
    price: 6400,
    priceLabel: "$6,400",
    description:
      "A classic halo of micro pavé framing a brilliant center stone — museum quiet, bridal ready.",
    metal: "Platinum",
    carat: "1.50 ct",
    size: ["5", "6", "7", "8", "9"],
    image: RING_IMAGE,
    gallery: [RING_IMAGE],
    badge: "Best Seller",
  },
  {
    id: "ring-lumen",
    slug: "lumen-band",
    name: "Lumen Band",
    price: 2150,
    priceLabel: "$2,150",
    description:
      "A slender eternity of graduated diamonds — soft light for stacking or standing alone.",
    metal: "18k White Gold",
    carat: "0.65 ct tw",
    size: ["5", "6", "7", "8"],
    image: RING_IMAGE,
    gallery: [RING_IMAGE],
  },
  {
    id: "ring-nocturne",
    slug: "nocturne-toi-et-moi",
    name: "Nocturne Toi et Moi",
    price: 3890,
    priceLabel: "$3,890",
    description:
      "Two stones in quiet conversation — a modern toi et moi for the collector who favors asymmetry.",
    metal: "18k Rose Gold",
    carat: "1.20 ct tw",
    size: ["5", "6", "7", "8"],
    image: RING_IMAGE,
    gallery: [RING_IMAGE],
    badge: "New",
  },
  {
    id: "ring-celeste",
    slug: "celeste-signet",
    name: "Celeste Signet",
    price: 1680,
    priceLabel: "$1,680",
    description:
      "A sculpted signet with a flush-set diamond — intimate, architectural, made for daily ritual.",
    metal: "18k Yellow Gold",
    carat: "0.18 ct",
    size: ["6", "7", "8", "9", "10"],
    image: RING_IMAGE,
    gallery: [RING_IMAGE],
  },
  {
    id: "ring-gilded",
    slug: "gilded-trace",
    name: "Gilded Trace",
    price: 2480,
    priceLabel: "$2,480",
    description:
      "An organic gold band traced with scattered diamonds — soft geometry for the modern hand.",
    metal: "18k Yellow Gold",
    carat: "0.42 ct tw",
    size: ["5", "6", "7", "8"],
    image: RING_IMAGE,
    gallery: [RING_IMAGE],
  },
  {
    id: "ring-ivory",
    slug: "ivory-cascade",
    name: "Ivory Cascade",
    price: 3720,
    priceLabel: "$3,720",
    description:
      "Cascading baguettes set in a fluid line — architectural brilliance with bridal restraint.",
    metal: "Platinum",
    carat: "0.95 ct tw",
    size: ["5", "6", "7", "8"],
    image: RING_IMAGE,
    gallery: [RING_IMAGE],
  },
  {
    id: "ring-atelier",
    slug: "atelier-promise",
    name: "Atelier Promise",
    price: 2950,
    priceLabel: "$2,950",
    description:
      "Our atelier promise ring — a refined oval brilliant on a knife-edge shank of polished gold.",
    metal: "18k Yellow Gold",
    carat: "0.90 ct",
    size: ["5", "6", "7", "8", "9"],
    image: RING_IMAGE,
    gallery: [RING_IMAGE],
    badge: "Atelier",
  },
  {
    id: "ring-soleil",
    slug: "soleil-marquise",
    name: "Soleil Marquise",
    price: 5120,
    priceLabel: "$5,120",
    description:
      "A marquise brilliant oriented north–south — elongated light for a hand that loves drama in quiet form.",
    metal: "Platinum",
    carat: "1.15 ct",
    size: ["5", "6", "7", "8"],
    image: RING_IMAGE,
    gallery: [RING_IMAGE],
    badge: "New",
  },
  {
    id: "ring-vesper",
    slug: "vesper-stack",
    name: "Vesper Stack",
    price: 1860,
    priceLabel: "$1,860",
    description:
      "Three slender bands designed to nest — mix metals or wear as a single constellation.",
    metal: "Mixed Golds",
    carat: "0.28 ct tw",
    size: ["5", "6", "7", "8", "9"],
    image: RING_IMAGE,
    gallery: [RING_IMAGE],
  },
  {
    id: "ring-opaline",
    slug: "opaline-bezel",
    name: "Opaline Bezel",
    price: 3340,
    priceLabel: "$3,340",
    description:
      "A low bezel that cradles the stone flush to the finger — modern armor with bridal softness.",
    metal: "18k White Gold",
    carat: "0.85 ct",
    size: ["5", "6", "7", "8"],
    image: RING_IMAGE,
    gallery: [RING_IMAGE],
  },
  {
    id: "ring-mira",
    slug: "mira-east-west",
    name: "Mira East-West",
    price: 4560,
    priceLabel: "$4,560",
    description:
      "An oval set east–west across the finger — unexpected orientation, enduring balance.",
    metal: "18k Rose Gold",
    carat: "1.10 ct",
    size: ["5", "6", "7", "8"],
    image: RING_IMAGE,
    gallery: [RING_IMAGE],
    badge: "Signature",
  },
];

export const RINGS_PER_PAGE = 8;

export function getRingsPage(page: number) {
  const safePage = Math.max(1, page);
  const totalPages = Math.max(1, Math.ceil(rings.length / RINGS_PER_PAGE));
  const current = Math.min(safePage, totalPages);
  const start = (current - 1) * RINGS_PER_PAGE;
  return {
    items: rings.slice(start, start + RINGS_PER_PAGE),
    page: current,
    totalPages,
    total: rings.length,
    hasPrev: current > 1,
    hasNext: current < totalPages,
  };
}

export function getRingBySlug(slug: string) {
  return rings.find((ring) => ring.slug === slug);
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
