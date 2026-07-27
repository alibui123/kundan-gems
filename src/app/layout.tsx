import type { Metadata } from "next";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { RouteScrollCleanup } from "@/components/RouteScrollCleanup";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kundan — Timeless Jewellery Crafted For Forever",
  description:
    "A premium jewellery boutique. Designed to celebrate moments, crafted to last generations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <RouteScrollCleanup />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
