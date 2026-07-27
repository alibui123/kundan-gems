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

export function BrandPromise() {
  return (
    <section className="section-reveal bg-ivory py-20 md:py-28">
      <div className="container-luxury grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {promises.map((item) => (
          <article
            key={item.title}
            className="reveal-item group flex flex-col items-start gap-4"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-gold transition-transform duration-500 group-hover:rotate-12">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                {icons[item.icon]}
              </svg>
            </span>
            <div>
              <h3 className="font-display text-xl tracking-wide text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
