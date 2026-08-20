/**
 * Runway chapter — materials as consecutive looks.
 */
export function MaterialsChapter() {
  return (
    <section
      id="materials"
      className="border-y border-border bg-white"
      aria-label="Materials"
    >
      <div className="container-maison flex flex-col items-center gap-3 px-6 py-16 text-center sm:px-10 md:py-20">
        <p className="reveal-item text-[10px] tracking-[0.36em] text-muted uppercase">
          The materials runway
        </p>
        <h2 className="reveal-item font-display text-[clamp(2rem,4vw,3.25rem)] font-normal tracking-[0.06em] text-ink uppercase">
          Three looks
        </h2>
      </div>
    </section>
  );
}
