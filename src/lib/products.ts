import { createAnonClient } from "@/lib/supabase";

export const MATERIALS = ["diamond", "gold", "ruby"] as const;
export const CATEGORIES = ["rings", "bracelets", "necklaces"] as const;

export type Material = (typeof MATERIALS)[number];
export type Category = (typeof CATEGORIES)[number];

export const MATERIAL_FILTERS: { label: string; value: Material | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Gold", value: "gold" },
  { label: "Diamond", value: "diamond" },
  { label: "Ruby", value: "ruby" },
];

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  material: Material;
  category: Category;
  price: number;
  metal: string;
  carat: string;
  sizes: string[];
  image: string;
  gallery: string[];
  badge: string | null;
  is_new: boolean;
  is_bestseller: boolean;
  is_featured: boolean;
  is_signature: boolean;
  new_arrival_rank: number | null;
  active: boolean;
  sort_order: number;
};

export const materialMeta: Record<
  Material,
  {
    title: string;
    subtitle: string;
    description: string;
    story: string;
    image: string;
    secondaryImage: string;
    accent: string;
  }
> = {
  diamond: {
    title: "Diamond",
    subtitle: "Light, forever",
    description:
      "Brilliant cuts and quiet pavé — diamond pieces composed for heirloom radiance.",
    story:
      "Cut for silence as much as sparkle. Our diamonds are chosen for proportion and fire — set so light seems to rest inside the piece rather than shout from it.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1400&q=90",
    secondaryImage:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&q=90",
    accent: "from-white/20 via-gold/10 to-transparent",
  },
  gold: {
    title: "Gold",
    subtitle: "Warm permanence",
    description:
      "Yellow, white, and rose gold — sculptural forms with soft everyday brilliance.",
    story:
      "Gold that feels lived-in from the first wear. We favour warm alloys and considered weight — architecture for the hand, the wrist, the neck.",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1400&q=90",
    secondaryImage:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=90",
    accent: "from-amber-200/25 via-gold/20 to-transparent",
  },
  ruby: {
    title: "Ruby",
    subtitle: "Living color",
    description:
      "Vivid stones set with restraint — ruby jewellery with atelier precision.",
    story:
      "Color held with discipline. Rubies are placed where a single note of red can carry an entire composition — intimate, never theatrical.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&q=90",
    secondaryImage:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=90",
    accent: "from-rose-400/25 via-gold/10 to-transparent",
  },
};

export const categoryMeta: Record<
  Category,
  { title: string; subtitle: string; description: string; image: string }
> = {
  rings: {
    title: "Rings",
    subtitle: "Eternal bands",
    description: "Solitaires, halos, and sculptural bands for forever.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85",
  },
  bracelets: {
    title: "Bracelets",
    subtitle: "Soft brilliance",
    description: "Cuffs and tennis lines with quiet radiance.",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=85",
  },
  necklaces: {
    title: "Necklaces",
    subtitle: "Statement grace",
    description: "Pendants and cascades composed for the collarbone.",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=85",
  },
};

export function isMaterial(value: string): value is Material {
  return (MATERIALS as readonly string[]).includes(value);
}

export function parseMaterialFilter(
  value: string | undefined
): Material | undefined {
  const v = value?.toLowerCase() ?? "all";
  if (v === "all" || !isMaterial(v)) return undefined;
  return v;
}

export function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function productHref(product: Pick<Product, "category" | "slug">) {
  return `/collections/${product.category}/${product.slug}`;
}

/** Adapt DB product → existing Rings UI components */
export function toRingProduct(p: Product) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    priceLabel: formatPrice(p.price),
    description: p.description,
    metal: p.metal,
    carat: p.carat,
    size: p.sizes,
    image: p.image,
    gallery: p.gallery.length ? p.gallery : [p.image],
    badge: p.badge ?? undefined,
  };
}

export function toNecklaceProduct(p: Product) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    priceLabel: formatPrice(p.price),
    description: p.description,
    metal: p.metal,
    carat: p.carat,
    length: p.sizes,
    image: p.image,
    gallery: p.gallery.length ? p.gallery : [p.image],
    badge: p.badge ?? undefined,
  };
}

export function toBraceletProduct(p: Product) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    priceLabel: formatPrice(p.price),
    description: p.description,
    metal: p.metal,
    carat: p.carat,
    size: p.sizes,
    image: p.image,
    gallery: p.gallery.length ? p.gallery : [p.image],
    badge: p.badge ?? undefined,
  };
}

function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    description: String(row.description ?? ""),
    material: row.material as Material,
    category: row.category as Category,
    price: Number(row.price),
    metal: String(row.metal ?? ""),
    carat: String(row.carat ?? ""),
    sizes: Array.isArray(row.sizes) ? (row.sizes as string[]) : [],
    image: String(row.image),
    gallery: Array.isArray(row.gallery) ? (row.gallery as string[]) : [],
    badge: (row.badge as string | null) ?? null,
    is_new: Boolean(row.is_new),
    is_bestseller: Boolean(row.is_bestseller),
    is_featured: Boolean(row.is_featured),
    is_signature: Boolean(row.is_signature),
    new_arrival_rank:
      row.new_arrival_rank == null ? null : Number(row.new_arrival_rank),
    active: row.active !== false,
    sort_order: Number(row.sort_order ?? 0),
  };
}

export async function getProducts(filters?: {
  material?: Material;
  category?: Category;
  isNew?: boolean;
  isBestseller?: boolean;
  isSignature?: boolean;
  limit?: number;
}) {
  const supabase = createAnonClient();
  let query = supabase.from("products").select("*").eq("active", true);

  if (filters?.material) query = query.eq("material", filters.material);
  if (filters?.category) query = query.eq("category", filters.category);
  if (filters?.isNew) query = query.eq("is_new", true);
  if (filters?.isBestseller) query = query.eq("is_bestseller", true);
  if (filters?.isSignature) query = query.eq("is_signature", true);

  if (filters?.isNew) {
    query = query
      .order("new_arrival_rank", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });
  } else {
    query = query
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
  }

  if (filters?.limit) query = query.limit(filters.limit);

  const { data, error } = await query;
  if (error) {
    console.error("getProducts:", error.message);
    return [];
  }
  return (data ?? []).map(mapProduct);
}

/** Products flagged `is_new`, ordered by `new_arrival_rank`. */
export async function getNewArrivals(limit?: number) {
  return getProducts({ isNew: true, limit });
}

export async function getProductBySlug(category: Category, slug: string) {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .eq("category", category)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("getProductBySlug:", error.message);
    return null;
  }
  return data ? mapProduct(data) : null;
}

export async function getProductsPage(
  category: Category,
  page: number,
  perPage = 8,
  material?: Material
) {
  const supabase = createAnonClient();
  const safePage = Math.max(1, page);
  const from = (safePage - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("active", true)
    .eq("category", category);

  if (material) query = query.eq("material", material);

  const { data, error, count } = await query
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true })
    .range(from, to);

  if (error) {
    console.error("getProductsPage:", error.message);
    return {
      items: [] as Product[],
      page: 1,
      totalPages: 1,
      total: 0,
      hasPrev: false,
      hasNext: false,
    };
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(safePage, totalPages);

  return {
    items: (data ?? []).map(mapProduct),
    page: current,
    totalPages,
    total,
    hasPrev: current > 1,
    hasNext: current < totalPages,
  };
}

export function getAdjacentCategories(current: Category) {
  const index = CATEGORIES.indexOf(current);
  return {
    prev: index > 0 ? CATEGORIES[index - 1] : null,
    next: index < CATEGORIES.length - 1 ? CATEGORIES[index + 1] : null,
  };
}

export type BestsellerProduct = Product & {
  rank: number;
  units_sold: number;
};

/** Ranked best sellers from the `bestsellers` table (future: driven by purchases). */
export async function getBestsellers(limit?: number): Promise<BestsellerProduct[]> {
  const supabase = createAnonClient();
  let query = supabase
    .from("bestsellers")
    .select("rank, units_sold, products(*)")
    .eq("active", true)
    .order("rank", { ascending: true });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("getBestsellers:", error.message);
    return [];
  }

  return (data ?? [])
    .map((row) => {
      const productRow = Array.isArray(row.products)
        ? row.products[0]
        : row.products;
      if (!productRow || typeof productRow !== "object") return null;
      const product = mapProduct(productRow as Record<string, unknown>);
      if (!product.active) return null;
      return {
        ...product,
        rank: Number(row.rank),
        units_sold: Number(row.units_sold ?? 0),
      };
    })
    .filter((p): p is BestsellerProduct => p !== null);
}
