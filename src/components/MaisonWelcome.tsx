/**
 * Manifesto claim band — runway declaration between looks.
 */
export function MaisonWelcome() {
  return (
    <section
      className="bleed-claim relative bg-void text-ivory"
      aria-label="The maison"
    >
      <div className="container-maison px-6 py-28 text-center sm:px-10 md:py-36 lg:py-44">
        <p className="reveal-item text-[10px] tracking-[0.36em] text-gold uppercase">
          The maison believes
        </p>
        <p className="reveal-item mx-auto mt-10 max-w-[18ch] font-display text-[clamp(2.4rem,6vw,5rem)] font-normal leading-[1.05] tracking-[0.02em] uppercase">
          Jewellery is not seasonal. It is{" "}
          <span className="text-gold">inherited</span>.
        </p>
        <p className="reveal-item mx-auto mt-12 max-w-md text-[14px] leading-[1.85] text-ivory/55">
          A Lahore atelier of heirloom gold, bridal sets, and high jewellery —
          composed for the aisle, the night, and every day after.
        </p>
      </div>
    </section>
  );
}
