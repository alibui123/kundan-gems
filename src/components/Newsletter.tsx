"use client";

export function Newsletter() {
  return (
    <section
      id="newsletter"
      className="section-reveal relative overflow-hidden bg-void py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,106,0.12),transparent_60%)]" />
      <div className="container-luxury relative z-10 mx-auto max-w-2xl text-center">
        <div className="reveal-item">
          <p className="mb-4 text-[11px] font-medium tracking-[0.24em] text-gold uppercase">
            Private List
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.1] text-white">
            Be the first to
            <br />
            <span className="italic text-gold-bright">unveil</span> what&apos;s next
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/55">
            Receive invitations to private viewings, limited releases, and atelier
            notes — never noise.
          </p>

          <form
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Your email address"
              className="h-[52px] flex-1 rounded-full border border-white/15 bg-white/5 px-6 text-sm text-white outline-none placeholder:text-white/35 focus:border-gold/60"
            />
            <button
              type="submit"
              className="h-[52px] shrink-0 rounded-full bg-gold px-8 text-[12px] font-medium tracking-[0.16em] text-void uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-bright hover:shadow-[0_8px_24px_rgba(200,169,106,0.35)]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
