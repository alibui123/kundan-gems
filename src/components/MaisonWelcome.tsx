/**
 * Maison belief — concise claim with optical typography.
 */
export function MaisonWelcome() {
  return (
    <section
      className="relative bg-void text-ivory"
      aria-label="The maison"
    >
      <div className="container-maison px-6 py-24 text-center sm:px-10 md:py-32 lg:py-40">
        <p className="reveal-item type-eyebrow text-gold">
          The maison believes
        </p>
        <p className="reveal-item mx-auto mt-8 max-w-[16ch] font-display type-headline font-medium text-ivory">
          Jewellery is not seasonal. It is{" "}
          <span className="text-gold">inherited</span>.
        </p>
        <p className="reveal-item mx-auto mt-8 max-w-md text-[15px] leading-[1.55] tracking-[-0.01em] text-ivory/60">
          A Lahore atelier of heirloom gold, bridal sets, and high jewellery —
          composed for the aisle, the night, and every day after.
        </p>
      </div>
    </section>
  );
}
