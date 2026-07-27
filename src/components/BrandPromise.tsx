import { promises } from "@/lib/data";

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

/** Quiet trust ribbon — does not compete with catalogs. */
export function BrandPromise() {
  return (
    <section className="section-reveal border-y border-border bg-ivory py-12 md:py-14">
      <div className="container-luxury grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {promises.map((item) => (
          <article
            key={item.title}
            className="reveal-item flex items-start gap-4"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center text-gold">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                {icons[item.icon]}
              </svg>
            </span>
            <div>
              <h3 className="font-display text-lg tracking-wide text-ink">
                {item.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
