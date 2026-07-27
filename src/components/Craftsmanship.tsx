import Image from "next/image";
import { craftSteps } from "@/lib/data";

export function Craftsmanship() {
  return (
    <section
      id="craftsmanship"
      className="section-reveal bg-ivory pb-24 md:pb-36"
    >
      <div className="container-luxury grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="reveal-item order-2 lg:order-1">
          <p className="mb-4 text-[11px] font-medium tracking-[0.24em] text-gold uppercase">
            Atelier
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] text-ink">
            Craftsmanship
            <br />
            without compromise
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-[1.85] text-muted">
            From the first sketch to the final certification, every Kundan piece
            travels a path of quiet obsession — measured in hours, not haste.
          </p>

          <ol className="mt-12 space-y-0 border-l border-border">
            {craftSteps.map((step) => (
              <li
                key={step.step}
                className="reveal-item relative border-b border-border py-6 pl-8 last:border-b-0"
              >
                <span className="absolute top-8 -left-[5px] h-2.5 w-2.5 rounded-full bg-gold" />
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm text-gold">{step.step}</span>
                  <h3 className="font-display text-2xl text-ink">{step.title}</h3>
                </div>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="reveal-image relative order-1 aspect-[4/5] overflow-hidden rounded-[24px] lg:order-2">
          <Image
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1400&q=85"
            alt="Jeweller crafting a fine piece by hand"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
