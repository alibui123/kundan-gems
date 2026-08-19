"use client";

const PHRASES = [
  "Handcrafted in Pakistan",
  "22K heirloom gold",
  "Private appointments",
  "Certified stones",
  "Complimentary insured shipping",
  "Lifetime atelier care",
  "Bridal · High jewellery · Everyday",
];

/** Quiet luxury ticker — constant motion, marketing only. */
export function MaisonTicker() {
  const loop = [...PHRASES, ...PHRASES];

  return (
    <section
      className="overflow-hidden border-y border-border bg-white py-5"
      aria-hidden
    >
      <div className="maison-marquee flex w-max items-center gap-10 pr-10">
        {loop.map((phrase, i) => (
          <span key={`${phrase}-${i}`} className="flex items-center gap-10">
            <span className="font-display text-[1.15rem] tracking-[0.04em] text-ink/80 whitespace-nowrap md:text-[1.35rem]">
              {phrase}
            </span>
            <span className="h-px w-8 bg-gold/70" />
          </span>
        ))}
      </div>
    </section>
  );
}
