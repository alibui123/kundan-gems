import Image from "next/image";
import { craftSteps, promises } from "@/lib/data";

const icons = {
  gem: (
    <path
      d="M12 3l3.5 5.5L12 21 8.5 8.5 12 3zm0 0L4 9h16L12 3z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  diamond: (
    <path
      d="M12 3l7 7-7 11L5 10l7-7z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  ship: (
    <>
      <path
        d="M4 14h16l-1.5 4.5a2 2 0 01-1.9 1.5H7.4a2 2 0 01-1.9-1.5L4 14z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M7 14V9a2 2 0 012-2h6a2 2 0 012 2v5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
    </>
  ),
  shield: (
    <path
      d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
      strokeLinejoin="round"
    />
  ),
};

export function AtelierPromise() {
  return (
    <section
      id="atelier"
      className="section-y relative overflow-hidden bg-white"
    >
      <div className="container-luxury">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal-item lg:col-span-5">
            <h2 className="font-display text-[clamp(2.35rem,4.2vw,3.5rem)] leading-[1.08] tracking-[0.01em] text-ink">
              Craft without compromise
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-muted">
              From first sketch to final polish, every piece travels a quiet path
              of obsession — measured in hours, worn for generations.
            </p>
            <ol className="mt-10 space-y-7">
              {craftSteps.slice(0, 3).map((step) => (
                <li key={step.step} className="reveal-item flex gap-4">
                  <span className="font-display text-sm tracking-wide text-gold">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-display text-xl tracking-[0.01em] text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="reveal-image relative aspect-[4/5] overflow-hidden bg-white lg:col-span-7 lg:aspect-[5/4]">
            <Image
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1400&q=85"
              alt="Jeweller crafting a fine piece by hand"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent"
              aria-hidden
            />
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {promises.map((item) => (
            <article
              key={item.title}
              className="reveal-item flex items-start gap-3"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-gold">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                  {icons[item.icon]}
                </svg>
              </span>
              <div>
                <h3 className="font-display text-lg tracking-[0.01em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
