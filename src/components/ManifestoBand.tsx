/**
 * Brief manifesto band — the haar thread’s first spoken line.
 */
export function ManifestoBand() {
  return (
    <section
      className="relative overflow-hidden border-b border-border bg-ivory"
      aria-label="Maison manifesto"
    >
      <div className="container-luxury py-14 md:py-16 lg:py-20">
        <div className="reveal-item mx-auto grid max-w-4xl gap-8 text-center md:gap-10">
          <p className="label-caps">A note from the atelier</p>
          <blockquote className="font-display text-[clamp(1.65rem,3.4vw,2.75rem)] font-light leading-[1.25] tracking-[-0.01em] text-ink text-balance">
            We compose jewellery the way a sehra is tied —{" "}
            <span className="italic text-lacquer">one measured strand at a time</span>
            , meant to be worn into memory.
          </blockquote>
          <div className="mx-auto flex items-center gap-3" aria-hidden>
            <span className="h-px w-10 bg-gold/70" />
            <span className="h-1.5 w-1.5 rotate-45 bg-lacquer" />
            <span className="h-px w-10 bg-gold/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
