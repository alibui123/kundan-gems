import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { RouteScrollCleanup } from "@/components/RouteScrollCleanup";
import "./globals.css";

/* Display: high-fashion Didot lineage (jewellery catalogues).
   Body: quiet geometric sans — not Inter. */
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  variable: "--font-bodoni",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kundan — Timeless Jewellery Crafted For Forever",
  description:
    "A premium jewellery boutique. Designed to celebrate moments, crafted to last generations.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${manrope.variable}`}>
      <body className={`${manrope.className} min-h-screen bg-paper antialiased`}>
        <CartProvider>
          <RouteScrollCleanup />
          {children}
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
