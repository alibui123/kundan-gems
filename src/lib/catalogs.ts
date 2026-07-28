/** Maison catalogs — named lines like Hanif house collections / Gold Bank edits. */

export const CATALOGS = ["mehr", "noor", "rozana"] as const;

export type Catalog = (typeof CATALOGS)[number];

export type CatalogScene = {
  image: string;
  objectPosition?: string;
  caption: string;
  title: string;
  body: string;
};

export type CatalogMeta = {
  slug: Catalog;
  title: string;
  urduHint: string;
  subtitle: string;
  tagline: string;
  description: string;
  story: string;
  /** Homepage catalog stage poster */
  image: string;
  /** Catalog page hero — full-bleed poster, distinct from homepage */
  heroImage: string;
  secondaryImage: string;
  accent: string;
  /** CSS object-position for homepage poster */
  objectPosition: string;
  /** CSS object-position for catalog page hero poster */
  heroObjectPosition: string;
  /** Editorial lookbook scenes — fill the page between / around pieces */
  scenes: CatalogScene[];
  /** Extra stills for side panels / pair strips */
  gallery: string[];
};

export const catalogMeta: Record<Catalog, CatalogMeta> = {
  mehr: {
    slug: "mehr",
    title: "Mehr",
    urduHint: "محبت",
    subtitle: "Bridal",
    tagline: "For the dulhan’s first light",
    description:
      "Bridal sets and heirloom gold composed for Pakistani weddings — sehra-soft radiance, jhumka weight, and full-neck ceremony pieces.",
    story:
      "Mehr is affection made tangible. Polki, kundan, and warm 22K lines for mehndi, barat, and walima — jewellery that photographs like memory and travels from mother to daughter.",
    image: "/catalogs/mehr/homepage.jpg",
    heroImage: "/catalogs/mehr/hero.jpg",
    secondaryImage: "/catalogs/mehr/bridal-dress.jpg",
    accent: "from-rose-900/40 via-void/20 to-transparent",
    objectPosition: "50% 18%",
    heroObjectPosition: "50% 22%",
    scenes: [
      {
        image: "/catalogs/mehr/01.jpg",
        objectPosition: "50% 12%",
        caption: "Mehndi hour",
        title: "Gold that holds the ceremony",
        body: "Layered haar, nath, and choora — composed for the first photographs of the day, when henna is still dark and light is soft.",
      },
      {
        image: "/catalogs/mehr/03.jpg",
        objectPosition: "50% 18%",
        caption: "Barat light",
        title: "Presence without noise",
        body: "Statement sets that read clearly in motion — full neck, strong silhouette, warm 22K that photographs as heirloom.",
      },
      {
        image: "/catalogs/mehr/05.jpg",
        objectPosition: "48% 20%",
        caption: "Walima evening",
        title: "After the vows",
        body: "Softer layers for the second night — still bridal, still Kundan, ready to travel from one generation to the next.",
      },
    ],
    gallery: [
      "/catalogs/mehr/bride.jpg",
      "/catalogs/mehr/07.jpg",
      "/catalogs/mehr/bridal-dress.jpg",
      "/catalogs/mehr/02.jpg",
      "/catalogs/mehr/04.jpg",
      "/catalogs/mehr/06.jpg",
      "/catalogs/mehr/08.jpg",
    ],
  },
  noor: {
    slug: "noor",
    title: "Noor",
    urduHint: "نور",
    subtitle: "High jewellery",
    tagline: "Statement light for the maison",
    description:
      "Bespoke-scale diamonds and sculptural gold — the high jewellery edit for soirées, shaadi guest looks, and pieces that lead the room.",
    story:
      "Noor is light held with discipline. Fewer stones, clearer silhouettes — diamond necklaces, cocktail rings, and atelier statements for Karachi nights and Lahore evenings.",
    image:
      "https://images.unsplash.com/photo-1762709414326-67c887a8dc98?auto=format&fit=crop&w=2400&q=85",
    heroImage:
      "https://images.unsplash.com/photo-1717341829793-7dd4390e59e7?auto=format&fit=crop&w=2400&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85",
    accent: "from-amber-200/20 via-void/30 to-transparent",
    objectPosition: "50% 22%",
    heroObjectPosition: "55% 20%",
    scenes: [
      {
        image:
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=85",
        objectPosition: "50% 40%",
        caption: "Atelier light",
        title: "One stone, clear architecture",
        body: "High jewellery that leads with proportion — diamonds set so fire feels quiet, never busy.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1400&q=85",
        objectPosition: "50% 35%",
        caption: "Night edit",
        title: "For rooms that listen",
        body: "Cocktail rings and sculptural gold for evenings when a single piece should carry the look.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=85",
        objectPosition: "50% 30%",
        caption: "Guest of honour",
        title: "Shaadi light, refined",
        body: "Statement without costume — Noor pieces for the guest who still wants to own the frame.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=85",
    ],
  },
  rozana: {
    slug: "rozana",
    title: "Rozana",
    urduHint: "روزانہ",
    subtitle: "Everyday gold",
    tagline: "Worn from chai to city",
    description:
      "Lifestyle gold for daily Pakistan — soft bangles, light chains, and office-to-iftar pieces with quiet brilliance.",
    story:
      "Rozana means every day. Lightweight gold and refined diamond accents you reach for without occasion — modern silhouettes with desi warmth, built for real wear across the week.",
    image:
      "https://images.unsplash.com/photo-1688382654723-a7366006519b?auto=format&fit=crop&w=2400&q=85",
    heroImage:
      "https://images.unsplash.com/flagged/photo-1551854716-8b811be39e7e?auto=format&fit=crop&w=2400&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1645856048246-2ea2557cc3e1?auto=format&fit=crop&w=1000&q=85",
    accent: "from-gold/25 via-void/25 to-transparent",
    objectPosition: "52% 20%",
    heroObjectPosition: "50% 22%",
    scenes: [
      {
        image:
          "https://images.unsplash.com/photo-1688382654723-a7366006519b?auto=format&fit=crop&w=1400&q=85",
        objectPosition: "52% 18%",
        caption: "Morning gold",
        title: "Jewellery you forget you’re wearing",
        body: "Light chains and soft bangles for the commute, the meeting, the first chai — still unmistakably Kundan.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1645856048246-2ea2557cc3e1?auto=format&fit=crop&w=1400&q=85",
        objectPosition: "50% 20%",
        caption: "City hours",
        title: "From desk to iftar",
        body: "Pieces that move with the day — refined enough for evening, easy enough for every hour before.",
      },
      {
        image:
          "https://images.unsplash.com/flagged/photo-1551854716-8b811be39e7e?auto=format&fit=crop&w=1400&q=85",
        objectPosition: "50% 22%",
        caption: "Festival ease",
        title: "Occasion without costume",
        body: "A little more gold when the calendar asks — still Rozana, still wearable tomorrow.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1688382654723-a7366006519b?auto=format&fit=crop&w=900&q=85",
    ],
  },
};

export function isCatalog(value: string): value is Catalog {
  return (CATALOGS as readonly string[]).includes(value);
}
