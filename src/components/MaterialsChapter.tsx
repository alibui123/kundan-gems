/**
 * Materials chapter — clear section header, minimal chrome.
 */
export function MaterialsChapter() {
  return (
    <section
      id="materials"
      className="bg-white"
      aria-label="Materials"
    >
      <div className="container-maison flex flex-col items-center gap-2 px-6 py-14 text-center sm:px-10 md:py-20">
        <p className="reveal-item type-eyebrow text-muted">
          Materials
        </p>
        <h2 className="reveal-item font-display type-headline font-medium text-ink">
          Three looks
        </h2>
        <p className="reveal-item mt-3 max-w-sm text-[15px] leading-[1.55] text-muted">
          Gold, diamond, and ruby — each composed as its own runway moment.
        </p>
      </div>
    </section>
  );
}
