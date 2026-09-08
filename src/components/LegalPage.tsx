import Link from "next/link";
import type { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { brand } from "@/lib/data";

const LEGAL_NAV = [
  { label: "Terms & conditions", href: "/legal/terms" },
  { label: "Privacy policy", href: "/legal/privacy" },
  { label: "Shipping", href: "/legal/shipping" },
  { label: "Returns", href: "/legal/returns" },
  { label: "Warranty", href: "/legal/warranty" },
] as const;

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="dark" />
      <main className="container-maison px-6 pt-28 pb-20 sm:px-10 md:pt-36 md:pb-28 lg:px-14">
        <nav className="text-[11px] tracking-[0.16em] text-muted uppercase">
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-gold">Legal</span>
        </nav>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-3">
            <p className="font-display text-lg text-ink">Policies</p>
            <ul className="mt-4 space-y-2.5">
              {LEGAL_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-muted transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <article className="max-w-2xl lg:col-span-8 lg:col-start-5">
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[0.01em] text-ink">
              {title}
            </h1>
            <p className="mt-3 text-[12px] text-muted">
              {brand.fullName} · Last updated {updated}
            </p>
            <div className="legal-prose mt-10 space-y-8 text-[15px] leading-[1.85] text-muted [&_h2]:font-display [&_h2]:text-[1.35rem] [&_h2]:tracking-[0.01em] [&_h2]:text-ink [&_h2]:mt-2 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_strong]:font-medium [&_strong]:text-ink">
              {children}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
