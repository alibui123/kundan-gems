import { kundanProductImages } from "@/lib/product-assets";

export const brand = {
  name: "Kundan",
  fullName: "Kundan Gems and Jewellers",
  tagline: "Crafted For Forever",
  logo: "/logo.png",
};

export const navLinks = [
  { label: "Home", href: "#" },
  { label: "Catalogs", href: "#catalogs" },
  { label: "Materials", href: "#gold" },
  { label: "Forms", href: "#collections" },
  { label: "The Edit", href: "#the-edit" },
  { label: "Atelier", href: "#atelier" },
  { label: "Contact", href: "#newsletter" },
];

export const promises = [
  {
    title: "Handcrafted",
    description: "Each piece shaped by master artisans",
    icon: "gem",
  },
  {
    title: "Certified Diamonds",
    description: "GIA-verified stones of exceptional cut",
    icon: "diamond",
  },
  {
    title: "Complimentary Shipping",
    description: "Insured delivery across Pakistan",
    icon: "ship",
  },
  {
    title: "Lifetime Warranty",
    description: "Care that lasts generations",
    icon: "shield",
  },
] as const;

export const collections = [
  {
    title: "Rings",
    subtitle: "Eternal bands",
    image: kundanProductImages.rings,
    href: "/collections/rings",
  },
  {
    title: "Necklaces",
    subtitle: "Statement grace",
    image: kundanProductImages.necklaces,
    href: "/collections/necklaces",
  },
  {
    title: "Bracelets",
    subtitle: "Soft brilliance",
    image: kundanProductImages.bracelets,
    href: "/collections/bracelets",
  },
];

export const newArrivals = [
  {
    id: "ring-aurora",
    slug: "aurora-solitaire",
    href: "/collections/rings/aurora-solitaire",
    name: "Aurora Solitaire",
    price: "$4,280",
    priceValue: 4280,
    image: kundanProductImages.rings,
  },
  {
    id: "neck-lumen",
    slug: "lumen-pendant",
    href: "/collections/necklaces/lumen-pendant",
    name: "Lumen Pendant",
    price: "$2,150",
    priceValue: 2150,
    image: kundanProductImages.necklaces,
  },
  {
    id: "br-veloce",
    slug: "veloce-cuff",
    href: "/collections/bracelets/veloce-cuff",
    name: "Véloce Cuff",
    price: "$1,890",
    priceValue: 1890,
    image: kundanProductImages.bracelets,
  },
  {
    id: "ring-soleil",
    slug: "soleil-marquise",
    href: "/collections/rings/soleil-marquise",
    name: "Soleil Marquise",
    price: "$5,120",
    priceValue: 5120,
    image: kundanProductImages.rings,
  },
];

export const bestSellers = [
  {
    id: "bs-1",
    name: "Heritage Halo",
    price: "$6,400",
    image: kundanProductImages.rings,
  },
  {
    id: "bs-2",
    name: "Ivory Cascade",
    price: "$3,720",
    image: kundanProductImages.necklaces,
  },
  {
    id: "bs-3",
    name: "Gilded Trace",
    price: "$2,480",
    image: kundanProductImages.bracelets,
  },
  {
    id: "bs-4",
    name: "Celeste Studs",
    price: "$1,240",
    image: kundanProductImages.rings,
  },
];

export const craftSteps = [
  { step: "01", title: "Sketch", description: "Form begins as line and intention." },
  { step: "02", title: "Crafting", description: "Gold and stone meet under skilled hands." },
  { step: "03", title: "Polishing", description: "Light is coaxed into every surface." },
  { step: "04", title: "Certification", description: "Excellence verified, then sealed." },
];

export const testimonials = [
  {
    quote:
      "Wearing Kundan feels like carrying a quiet heirloom — modern, yet destined to be passed on.",
    name: "Amélie R.",
    location: "Paris",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    quote:
      "The craftsmanship is museum-level. Every detail rewards a closer look.",
    name: "James K.",
    location: "London",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    quote:
      "From the first consultation to the final reveal, every moment felt intentional and rare.",
    name: "Sophia L.",
    location: "Dubai",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    quote:
      "Quiet luxury in its purest form. The piece catches light the way fine art should.",
    name: "Marcus T.",
    location: "New York",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
];

export const instagram = [
  kundanProductImages.rings,
  kundanProductImages.necklaces,
  kundanProductImages.bracelets,
  kundanProductImages.rings,
  kundanProductImages.necklaces,
  kundanProductImages.bracelets,
];
