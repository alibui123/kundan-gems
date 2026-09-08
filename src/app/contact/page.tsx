import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { VisitMaison } from "@/components/VisitMaison";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — Kundan",
  description:
    "Book a private viewing or join atelier notes — Kundan Gems and Jewellers, MM Alam Road, Lahore.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-void">
      <Navigation variant="dark" />
      <main className="pt-20 md:pt-24">
        <VisitMaison />
      </main>
      <Footer />
    </div>
  );
}
