import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { AtelierPromise } from "@/components/AtelierPromise";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Atelier — Kundan",
  description:
    "From first sketch to final polish — the quiet path of craft at Kundan Gems and Jewellers.",
};

export default function AtelierPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="dark" />
      <main className="pt-24 md:pt-28">
        <AtelierPromise />
      </main>
      <Footer />
    </div>
  );
}
