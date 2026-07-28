"use client";

export function Newsletter() {
  return (
    <section
      id="newsletter"
      className="border-t border-border bg-ivory py-16 md:py-20"
    >
      <div className="container-luxury mx-auto max-w-xl text-center">
        <div className="reveal-item">
          <p className="label-caps mb-3">Private list</p>
          <h2 className="font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-light leading-[1.1] tracking-[-0.02em] text-ink">
            Be first to unveil what&apos;s next
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-muted">
            Private viewings, limited releases, and atelier notes — never noise.
          </p>

          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Your email"
              className="h-12 flex-1 rounded-full border border-border bg-card px-5 text-[14px] text-ink outline-none placeholder:text-muted focus:border-gold/50"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-full bg-ink px-7 text-[11px] font-medium tracking-[0.14em] text-ivory uppercase transition-colors duration-300 hover:bg-gold hover:text-void"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
