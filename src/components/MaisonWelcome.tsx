"use client";

/**
 * First step inside the boutique — one sentence, museum spacing.
 */
export function MaisonWelcome() {
  return (
    <section
      className="relative bg-white px-6 py-24 md:px-10 md:py-32 lg:py-40"
      aria-label="The maison"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="reveal-item font-display text-[clamp(1.85rem,4.2vw,3.35rem)] leading-[1.2] tracking-[0.01em] text-ink">
          A Lahore atelier of heirloom gold, bridal sets, and high jewellery —
          composed to be worn across generations.
        </p>
        <p className="reveal-item mx-auto mt-8 max-w-md text-[13px] leading-relaxed tracking-[0.18em] text-muted uppercase">
          Kundan Gems and Jewellers · MM Alam Road
        </p>
      </div>
    </section>
  );
}
