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

/** Runway atelier — bleed image + claim strip. */
export function AtelierPromise() {
  return (
    <section id="atelier" className="bg-white">
      <div className="reveal-image group/poster relative min-h-[80svh] overflow-hidden bg-void md:min-h-[90svh]">
        <div className="absolute inset-0" data-parallax-media>
          <div
            className="absolute inset-[-10%] will-change-transform"
            data-parallax-layer
          >
            <Image
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1600&q=85"
              alt="Jeweller crafting a fine piece by hand"
              fill
              sizes="100vw"
              className="poster-zoom-img object-cover"
            />
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(14,12,10,0.35) 0%, transparent 45%, rgba(14,12,10,0.7) 100%)",
          }}
        />
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-end px-6 pb-16 text-center sm:pb-20">
          <p className="text-[10px] tracking-[0.36em] text-gold uppercase">
            Backstage
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-normal tracking-[0.06em] text-ivory uppercase">
            Craft without compromise
          </h2>
        </div>
      </div>

      <div className="bg-white">
        <div className="container-maison grid gap-14 px-6 py-20 sm:px-10 md:grid-cols-12 md:gap-10 md:py-28">
          <div className="reveal-item md:col-span-5">
            <p className="max-w-sm text-[15px] leading-[1.9] text-muted">
              From first sketch to final polish, every piece travels a quiet path
              of obsession — measured in hours, worn for generations.
            </p>
            <ol className="mt-12 space-y-8">
              {craftSteps.slice(0, 3).map((step) => (
                <li key={step.step} className="reveal-item flex gap-5">
                  <span className="font-display text-sm text-gold">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-display text-lg tracking-[0.01em] text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="reveal-item grid gap-10 border-t border-border pt-10 sm:grid-cols-2 md:col-span-6 md:col-start-7 md:border-t-0 md:border-l md:pt-0 md:pl-10">
            {promises.map((item) => (
              <article key={item.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center text-gold">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                    {icons[item.icon]}
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-base text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
