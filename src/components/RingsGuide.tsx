const steps = [
  {
    title: "Choose the silhouette",
    body: "Solitaire, halo, or sculptural band — begin with the shape that feels most like you.",
  },
  {
    title: "Consider the metal",
    body: "Yellow gold warms the skin; platinum and white gold cool the stone’s fire.",
  },
  {
    title: "Confirm the fit",
    body: "Sizes are finished to order. Unsure? Book a fitting or request our size guide.",
  },
];

export function RingsGuide() {
  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-luxury">
        <div className="mb-12 max-w-xl md:mb-16">
          <p className="mb-3 text-[11px] font-medium tracking-[0.24em] text-gold uppercase">
            A quiet guide
          </p>
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light text-ink">
            How to choose your ring
          </h2>
        </div>

        <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-border pt-6">
              <span className="font-display text-sm text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-2xl text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
