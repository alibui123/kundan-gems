import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  const raw = readFileSync(path, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i < 0) continue;
    const key = trimmed.slice(0, i);
    const value = trimmed.slice(i + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const products = [
  // —— Diamond rings ——
  {
    slug: "aurora-solitaire",
    name: "Aurora Solitaire",
    description:
      "A luminous round brilliant set in a quiet claw setting — proportioned for everyday radiance and lifelong wear.",
    material: "diamond",
    category: "rings",
    price: 4280,
    metal: "18k Yellow Gold",
    carat: "1.02 ct",
    sizes: ["5", "6", "7", "8"],
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1200&q=85",
    ],
    badge: "Signature",
    is_featured: true,
    is_new: true,
    sort_order: 1,
  },
  {
    slug: "heritage-halo",
    name: "Heritage Halo",
    description:
      "A classic halo of micro pavé framing a brilliant center stone — museum quiet, bridal ready.",
    material: "diamond",
    category: "rings",
    price: 6400,
    metal: "Platinum",
    carat: "1.50 ct",
    sizes: ["5", "6", "7", "8", "9"],
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1200&q=85",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85",
    ],
    badge: "Best Seller",
    is_bestseller: true,
    sort_order: 2,
  },
  {
    slug: "lumen-band",
    name: "Lumen Band",
    description:
      "A slender eternity of graduated diamonds — soft light for stacking or standing alone.",
    material: "diamond",
    category: "rings",
    price: 2150,
    metal: "18k White Gold",
    carat: "0.65 ct tw",
    sizes: ["5", "6", "7", "8"],
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=85",
    ],
    sort_order: 3,
  },
  {
    slug: "soleil-marquise",
    name: "Soleil Marquise",
    description:
      "A marquise brilliant oriented north–south — elongated light for a hand that loves drama in quiet form.",
    material: "diamond",
    category: "rings",
    price: 5120,
    metal: "Platinum",
    carat: "1.15 ct",
    sizes: ["5", "6", "7", "8"],
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85&sat=-30",
    gallery: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85",
    ],
    badge: "New",
    is_new: true,
    sort_order: 4,
  },

  // —— Gold rings ——
  {
    slug: "celeste-signet",
    name: "Celeste Signet",
    description:
      "A sculpted gold signet with a flush-set diamond — intimate, architectural, made for daily ritual.",
    material: "gold",
    category: "rings",
    price: 1680,
    metal: "18k Yellow Gold",
    carat: "0.18 ct",
    sizes: ["6", "7", "8", "9", "10"],
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&q=85",
    ],
    is_new: true,
    sort_order: 1,
  },
  {
    slug: "gilded-trace-ring",
    name: "Gilded Trace",
    description:
      "An organic gold band traced with scattered diamonds — soft geometry for the modern hand.",
    material: "gold",
    category: "rings",
    price: 2480,
    metal: "18k Yellow Gold",
    carat: "0.42 ct tw",
    sizes: ["5", "6", "7", "8"],
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=85",
    ],
    sort_order: 2,
  },
  {
    slug: "atelier-promise",
    name: "Atelier Promise",
    description:
      "Our atelier promise ring — a refined oval brilliant on a knife-edge shank of polished gold.",
    material: "gold",
    category: "rings",
    price: 2950,
    metal: "18k Yellow Gold",
    carat: "0.90 ct",
    sizes: ["5", "6", "7", "8", "9"],
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85",
    ],
    badge: "Atelier",
    is_featured: true,
    sort_order: 3,
  },
  {
    slug: "vesper-stack",
    name: "Vesper Stack",
    description:
      "Three slender gold bands designed to nest — mix metals or wear as a single constellation.",
    material: "gold",
    category: "rings",
    price: 1860,
    metal: "Mixed Golds",
    carat: "0.28 ct tw",
    sizes: ["5", "6", "7", "8", "9"],
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=85",
    ],
    sort_order: 4,
  },

  // —— Ruby rings ——
  {
    slug: "nocturne-toi-et-moi",
    name: "Nocturne Toi et Moi",
    description:
      "Ruby and diamond in quiet conversation — a modern toi et moi for the collector who favors asymmetry.",
    material: "ruby",
    category: "rings",
    price: 3890,
    metal: "18k Rose Gold",
    carat: "1.20 ct tw",
    sizes: ["5", "6", "7", "8"],
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85&sat=-20",
    gallery: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85",
    ],
    badge: "New",
    is_new: true,
    sort_order: 1,
  },
  {
    slug: "ivory-cascade-ring",
    name: "Ivory Cascade",
    description:
      "Cascading baguettes with a central ruby accent — architectural brilliance with bridal restraint.",
    material: "ruby",
    category: "rings",
    price: 3720,
    metal: "Platinum",
    carat: "0.95 ct tw",
    sizes: ["5", "6", "7", "8"],
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=85",
    ],
    is_bestseller: true,
    sort_order: 2,
  },
  {
    slug: "opaline-bezel",
    name: "Opaline Bezel",
    description:
      "A low bezel cradling a vivid ruby flush to the finger — modern armor with bridal softness.",
    material: "ruby",
    category: "rings",
    price: 3340,
    metal: "18k White Gold",
    carat: "0.85 ct",
    sizes: ["5", "6", "7", "8"],
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1200&q=85",
    ],
    sort_order: 3,
  },
  {
    slug: "mira-east-west",
    name: "Mira East-West",
    description:
      "An oval ruby set east–west across the finger — unexpected orientation, enduring balance.",
    material: "ruby",
    category: "rings",
    price: 4560,
    metal: "18k Rose Gold",
    carat: "1.10 ct",
    sizes: ["5", "6", "7", "8"],
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&q=85",
    ],
    badge: "Signature",
    is_featured: true,
    sort_order: 4,
  },

  // —— Diamond necklaces ——
  {
    slug: "lumen-pendant",
    name: "Lumen Pendant",
    description:
      "A floating brilliant on a whisper-thin chain — light that rests quietly at the collarbone.",
    material: "diamond",
    category: "necklaces",
    price: 2150,
    metal: "18k Yellow Gold",
    carat: "0.45 ct",
    sizes: ['16"', '18"', '20"'],
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85",
    ],
    badge: "Best Seller",
    is_bestseller: true,
    is_new: true,
    sort_order: 1,
  },
  {
    slug: "ivory-cascade",
    name: "Ivory Cascade",
    description:
      "Layered strands of graduated diamonds — a soft waterfall for evening and forever after.",
    material: "diamond",
    category: "necklaces",
    price: 3720,
    metal: "Platinum",
    carat: "2.10 ct tw",
    sizes: ['16"', '18"'],
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=85",
    ],
    badge: "Signature",
    is_featured: true,
    sort_order: 2,
  },
  {
    slug: "mira-tennis",
    name: "Mira Tennis",
    description:
      "A continuous line of matched brilliants — classic tennis, finished with atelier precision.",
    material: "diamond",
    category: "necklaces",
    price: 6200,
    metal: "Platinum",
    carat: "4.00 ct tw",
    sizes: ['16"', '17"', '18"'],
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85",
    ],
    badge: "Atelier",
    sort_order: 3,
  },

  // —— Gold necklaces ——
  {
    slug: "soleil-collar",
    name: "Soleil Collar",
    description:
      "A sculptural gold collar of shared-prong diamonds — radiant structure for the modern neckline.",
    material: "gold",
    category: "necklaces",
    price: 4850,
    metal: "18k Yellow Gold",
    carat: "3.20 ct tw",
    sizes: ['15"', '16"'],
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=85",
    ],
    is_featured: true,
    sort_order: 1,
  },
  {
    slug: "celeste-station",
    name: "Celeste Station",
    description:
      "Spaced stations of light along a fine gold chain — effortless daily wear with heirloom intent.",
    material: "gold",
    category: "necklaces",
    price: 1890,
    metal: "18k Yellow Gold",
    carat: "0.35 ct tw",
    sizes: ['16"', '18"', '20"'],
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1200&q=85",
    ],
    badge: "New",
    is_new: true,
    sort_order: 2,
  },
  {
    slug: "vesper-lariat",
    name: "Vesper Lariat",
    description:
      "An open gold lariat with twin drops — adjustable, architectural, made for layering or standing alone.",
    material: "gold",
    category: "necklaces",
    price: 2460,
    metal: "18k Rose Gold",
    carat: "0.62 ct tw",
    sizes: ["Adjustable"],
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&q=85",
    ],
    sort_order: 3,
  },

  // —— Ruby necklaces ——
  {
    slug: "nocturne-drop",
    name: "Nocturne Drop",
    description:
      "A pear-shaped ruby drop suspended from a delicate line — drama in a single point of color.",
    material: "ruby",
    category: "necklaces",
    price: 2980,
    metal: "18k White Gold",
    carat: "0.85 ct",
    sizes: ['16"', '18"', '20"'],
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=85",
    ],
    badge: "New",
    is_new: true,
    is_bestseller: true,
    sort_order: 1,
  },
  {
    slug: "opaline-choker",
    name: "Opaline Choker",
    description:
      "A close-fitting line of baguettes with ruby accents — intimate brilliance for high necklines.",
    material: "ruby",
    category: "necklaces",
    price: 3180,
    metal: "18k White Gold",
    carat: "1.40 ct tw",
    sizes: ['14"', '15"'],
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=85",
    ],
    sort_order: 2,
  },

  // —— Diamond bracelets ——
  {
    slug: "soft-tennis",
    name: "Soft Tennis",
    description:
      "A continuous bracelet of matched brilliants — classic tennis, finished with quiet precision.",
    material: "diamond",
    category: "bracelets",
    price: 5200,
    metal: "Platinum",
    carat: "3.50 ct tw",
    sizes: ["16 cm", "17 cm", "18 cm", "19 cm"],
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=85",
    ],
    badge: "Atelier",
    is_featured: true,
    sort_order: 1,
  },
  {
    slug: "lumen-bangle",
    name: "Lumen Bangle",
    description:
      "A slim hinged bangle with a single flush diamond — minimal light for stacking or alone.",
    material: "diamond",
    category: "bracelets",
    price: 1650,
    metal: "18k White Gold",
    carat: "0.12 ct",
    sizes: ["S", "M", "L"],
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85",
    ],
    badge: "New",
    is_new: true,
    sort_order: 2,
  },
  {
    slug: "celeste-cuff",
    name: "Celeste Cuff",
    description:
      "A wider cuff set with a constellation of micro pavé — bold silhouette, soft sparkle.",
    material: "diamond",
    category: "bracelets",
    price: 3420,
    metal: "18k White Gold",
    carat: "0.90 ct tw",
    sizes: ["S", "M", "L"],
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85",
    ],
    badge: "Signature",
    is_bestseller: true,
    sort_order: 3,
  },

  // —— Gold bracelets ——
  {
    slug: "veloce-cuff",
    name: "Véloce Cuff",
    description:
      "A sculpted open cuff with a soft inner curve — architectural gold for everyday presence.",
    material: "gold",
    category: "bracelets",
    price: 1890,
    metal: "18k Yellow Gold",
    carat: "—",
    sizes: ["S", "M", "L"],
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=85",
    ],
    badge: "Best Seller",
    is_bestseller: true,
    is_new: true,
    sort_order: 1,
  },
  {
    slug: "gilded-trace",
    name: "Gilded Trace",
    description:
      "An organic gold line traced with scattered diamonds — soft geometry that follows the wrist.",
    material: "gold",
    category: "bracelets",
    price: 2480,
    metal: "18k Yellow Gold",
    carat: "0.42 ct tw",
    sizes: ["S", "M", "L"],
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=85",
    ],
    badge: "Signature",
    is_featured: true,
    sort_order: 2,
  },
  {
    slug: "nocturne-chain",
    name: "Nocturne Chain",
    description:
      "A refined gold paperclip chain with a diamond clasp — modern links with heirloom weight.",
    material: "gold",
    category: "bracelets",
    price: 2100,
    metal: "18k Yellow Gold",
    carat: "0.18 ct",
    sizes: ["17 cm", "18 cm", "19 cm", "20 cm"],
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=85",
    ],
    sort_order: 3,
  },
  {
    slug: "opaline-twist",
    name: "Opaline Twist",
    description:
      "Two interwoven gold strands — one polished, one pavé — a quiet twist for the modern wrist.",
    material: "gold",
    category: "bracelets",
    price: 1960,
    metal: "18k Yellow Gold",
    carat: "0.30 ct tw",
    sizes: ["S", "M", "L"],
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&q=85",
    ],
    badge: "New",
    is_new: true,
    sort_order: 4,
  },

  // —— Ruby bracelets ——
  {
    slug: "mira-station",
    name: "Mira Station",
    description:
      "Spaced stations of ruby light along a flexible bracelet — effortless radiance for daily wear.",
    material: "ruby",
    category: "bracelets",
    price: 2780,
    metal: "18k Rose Gold",
    carat: "0.55 ct tw",
    sizes: ["S", "M", "L"],
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1200&q=85",
    ],
    is_featured: true,
    sort_order: 1,
  },
];

async function main() {
  const { error: probeError } = await supabase
    .from("products")
    .select("id")
    .limit(1);

  if (probeError) {
    console.error("\n❌ products table is missing or not readable.");
    console.error("   Error:", probeError.message);
    console.error("\nRun this SQL in Supabase → SQL Editor first:");
    console.error("   supabase/migrations/001_create_products.sql\n");
    console.error(
      "Or reconnect Cursor Supabase MCP to project dhsysfdwfavodcrxnbwa and ask me to apply the migration.\n"
    );
    process.exit(1);
  }

  const rows = products.map((p) => ({
    ...p,
    badge: p.badge ?? null,
    is_new: Boolean(p.is_new),
    is_bestseller: Boolean(p.is_bestseller),
    is_featured: Boolean(p.is_featured),
    is_signature:
      Boolean(p.is_signature) ||
      Boolean(p.is_featured) ||
      String(p.badge ?? "").toLowerCase() === "signature",
    active: true,
  }));

  // Assign stable ranks among new arrivals
  let newRank = 0;
  for (const row of rows) {
    if (row.is_new) {
      newRank += 1;
      row.new_arrival_rank = newRank;
    } else {
      row.new_arrival_rank = null;
    }
  }

  const { data, error } = await supabase.from("products").upsert(rows, {
    onConflict: "slug",
  }).select("slug");

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`✅ Seeded ${data?.length ?? 0} products into Kundan DB.`);
}

main();
