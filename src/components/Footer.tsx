import Link from "next/link";
import type { ReactNode } from "react";
import { brand, collections } from "@/lib/data";
import { BrandLogo } from "@/components/BrandLogo";
import { CATALOGS, catalogMeta } from "@/lib/catalogs";

const MATERIALS = [
  { label: "Gold", href: "/materials/gold" },
  { label: "Diamond", href: "/materials/diamond" },
  { label: "Ruby", href: "/materials/ruby" },
] as const;

const EDIT = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
  { label: "Signature", href: "/collections/signature" },
] as const;

const CLIENT_CARE = [
  { label: "Book a viewing", href: "/contact" },
  { label: "The atelier", href: "/atelier" },
  { label: "Shipping & delivery", href: "/legal/shipping" },
  { label: "Returns & exchanges", href: "/legal/returns" },
  { label: "Lifetime warranty", href: "/legal/warranty" },
] as const;

const LEGAL = [
  { label: "Terms & conditions", href: "/legal/terms" },
  { label: "Privacy policy", href: "/legal/privacy" },
  { label: "Shipping policy", href: "/legal/shipping" },
  { label: "Returns policy", href: "/legal/returns" },
  { label: "Warranty", href: "/legal/warranty" },
] as const;

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/kundan.atelier/",
    external: true,
    Icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/kundan.atelier",
    external: true,
    Icon: FacebookIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/9242111000000",
    external: true,
    Icon: WhatsAppIcon,
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/kundanatelier/",
    external: true,
    Icon: PinterestIcon,
  },
  {
    label: "Email",
    href: "mailto:hello@kundan.atelier",
    external: false,
    Icon: EmailIcon,
  },
] as const;

function SocialSvg({ children }: { children: ReactNode }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

function InstagramIcon() {
  return (
    <SocialSvg>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </SocialSvg>
  );
}

function FacebookIcon() {
  return (
    <SocialSvg>
      <path
        d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.2l.8-3H14V9z"
        fill="currentColor"
      />
    </SocialSvg>
  );
}

function WhatsAppIcon() {
  return (
    <SocialSvg>
      <path
        d="M12 3.2c-4.8 0-8.8 3.9-8.8 8.8 0 1.5.4 3 1.1 4.3L3 21l4.9-1.3c1.2.7 2.6 1 4.1 1 4.8 0 8.8-3.9 8.8-8.8S16.8 3.2 12 3.2zm0 16c-1.4 0-2.7-.4-3.8-1l-.3-.2-2.9.8.8-2.8-.2-.3c-.7-1.2-1.1-2.5-1.1-3.9 0-4 3.2-7.2 7.2-7.2s7.2 3.2 7.2 7.2-3.2 7.2-7.2 7.2zm4-5.4c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.9-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.3-.4.1-.2 0-.3 0-.4 0-.1-.5-1.3-.7-1.7-.2-.5-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4.5.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1 0-.1-.2-.2-.4-.3z"
        fill="currentColor"
      />
    </SocialSvg>
  );
}

function PinterestIcon() {
  return (
    <SocialSvg>
      <path
        d="M12 3.2c-4.9 0-8.8 3.9-8.8 8.8 0 3.6 2.2 6.7 5.4 8-.1-.7-.1-1.7.1-2.5.2-.8 1.3-5.5 1.3-5.5s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8-3.1 0-5 2.3-5 4.8 0 .9.3 1.5.7 2 .1.1.1.2.1.3l-.3 1c0 .2-.2.2-.3.1-1.3-.5-1.9-2-1.9-3.6 0-2.7 2.3-5.9 6.7-5.9 3.6 0 6 2.6 6 5.4 0 3.7-2.1 6.5-5.1 6.5-1 0-2-.6-2.3-1.2l-.6 2.4c-.2.8-.8 1.8-1.2 2.4 1 .3 2 .5 3.1.5 4.9 0 8.8-3.9 8.8-8.8S16.9 3.2 12 3.2z"
        fill="currentColor"
      />
    </SocialSvg>
  );
}

function EmailIcon() {
  return (
    <SocialSvg>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SocialSvg>
  );
}

function CalendarIcon() {
  return (
    <SocialSvg>
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 3v4M16 3v4M3 10h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </SocialSvg>
  );
}

function FootCol({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="font-display text-[1.05rem] tracking-[0.02em] text-ink">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FootLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "text-[13px] leading-snug text-muted transition-colors hover:text-gold";
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/**
 * Maison footer — navigation, salon details, client care, and legal.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="foot-mast border-t border-border bg-white text-ink"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container-maison px-6 pt-16 pb-10 sm:px-10 md:pt-20 md:pb-12 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex" aria-label={brand.name}>
              <BrandLogo size="mark" className="h-10 w-auto" />
            </Link>
            <p className="mt-5 font-display text-[1.65rem] leading-[1.15] tracking-[0.02em] text-ink md:text-[1.85rem]">
              {brand.tagline}
            </p>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-muted">
              {brand.fullName} — bridal, high jewellery, and everyday gold from
              the Lahore atelier. Private viewings by appointment; walk-ins
              welcome during salon hours.
            </p>

            <div className="mt-8 space-y-3 text-[13px] leading-relaxed text-muted">
              <p>
                <span className="text-ink">Salon</span>
                <br />
                MM Alam Road, Lahore, Pakistan
              </p>
              <p>
                <span className="text-ink">Hours</span>
                <br />
                Tue–Sun · 11:00 – 19:00
                <br />
                Closed Mondays
              </p>
              <p>
                <span className="text-ink">Contact</span>
                <br />
                <a
                  href="mailto:hello@kundan.atelier"
                  className="transition-colors hover:text-gold"
                >
                  hello@kundan.atelier
                </a>
                <br />
                <a
                  href="tel:+9242111000000"
                  className="transition-colors hover:text-gold"
                >
                  +92 42 111 000 000
                </a>
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {SOCIALS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-label={item.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-gold hover:text-gold"
                >
                  <item.Icon />
                </a>
              ))}
              <Link
                href="/contact"
                aria-label="Appointments"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-[11px] font-medium tracking-[0.14em] text-muted uppercase transition-colors hover:border-gold hover:text-gold"
              >
                <CalendarIcon />
                Book
              </Link>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 lg:gap-8">
            <FootCol title="Houses">
              {CATALOGS.map((slug) => (
                <li key={slug}>
                  <FootLink href={`/catalogs/${slug}`}>
                    {catalogMeta[slug].title}
                    <span className="mt-0.5 block text-[11px] text-muted/80 normal-case tracking-normal">
                      {catalogMeta[slug].subtitle}
                    </span>
                  </FootLink>
                </li>
              ))}
            </FootCol>

            <FootCol title="Materials">
              {MATERIALS.map((item) => (
                <li key={item.href}>
                  <FootLink href={item.href}>{item.label}</FootLink>
                </li>
              ))}
              <li>
                <FootLink href="/collections/rings">Shop by form</FootLink>
              </li>
            </FootCol>

            <FootCol title="Collections">
              {collections.map((item) => (
                <li key={item.href}>
                  <FootLink href={item.href}>{item.title}</FootLink>
                </li>
              ))}
              {EDIT.map((item) => (
                <li key={item.href}>
                  <FootLink href={item.href}>{item.label}</FootLink>
                </li>
              ))}
            </FootCol>

            <FootCol title="Client care">
              {CLIENT_CARE.map((item) => (
                <li key={item.href}>
                  <FootLink href={item.href}>{item.label}</FootLink>
                </li>
              ))}
            </FootCol>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-border pt-10 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
          <div>
            <p className="font-display text-[1.05rem] tracking-[0.02em] text-ink">
              Assurances
            </p>
            <ul className="mt-4 space-y-2 text-[13px] leading-relaxed text-muted">
              <li>Handcrafted pieces by master artisans</li>
              <li>GIA-verified diamonds of exceptional cut</li>
              <li>Insured complimentary shipping across Pakistan</li>
              <li>Lifetime warranty on craftsmanship</li>
            </ul>
          </div>
          <div>
            <p className="font-display text-[1.05rem] tracking-[0.02em] text-ink">
              Payments &amp; security
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-muted">
              Bank transfer, card, and in-salon settlement accepted. Online
              orders are confirmed by the atelier before dispatch. Never share
              card details over email or social messages — we will only request
              payment through secured channels.
            </p>
          </div>
          <div>
            <p className="font-display text-[1.05rem] tracking-[0.02em] text-ink">
              Bridal &amp; bespoke
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-muted">
              Mehr bridal sets and bespoke commissions begin with a private
              consultation. Allow lead time for sketch, crafting, and final
              polish — especially for wedding calendars.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex text-[12px] font-medium tracking-[0.14em] text-gold uppercase transition-colors hover:text-ink"
            >
              Request a consultation
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-paper/60">
        <div className="container-maison flex flex-col gap-5 px-6 py-6 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-14">
          <p className="text-[12px] leading-relaxed text-muted">
            © {year} {brand.fullName}. All rights reserved. Jewellery
            photography and designs are protected.
          </p>
          <nav
            aria-label="Legal"
            className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] tracking-[0.06em] text-muted"
          >
            {LEGAL.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
