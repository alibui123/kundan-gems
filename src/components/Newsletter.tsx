"use client";

export function Newsletter() {
  return (
    <section
      id="newsletter"
      className="relative overflow-hidden border-t border-border bg-void text-ivory"
    >
      <div className="container-luxury grid gap-10 py-16 md:grid-cols-12 md:items-center md:gap-8 md:py-20">
        <div className="reveal-item md:col-span-5">
          <p className="label-caps mb-3 text-gold">Private list</p>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.85rem)] leading-[1.12] tracking-[0.01em] text-ivory">
            Be first to the next unveiling
          </h2>
          <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-ivory/55">
            Limited releases and atelier notes — never noise.
          </p>
        </div>

        <form
          className="reveal-item flex flex-col gap-3 sm:flex-row sm:items-center md:col-span-7"
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
            className="h-12 flex-1 border border-ivory/20 bg-transparent px-5 text-[14px] text-ivory outline-none placeholder:text-ivory/35 focus:border-gold/50"
          />
          <button
            type="submit"
            className="h-12 shrink-0 bg-gold px-8 text-[11px] font-medium tracking-[0.16em] text-void uppercase transition-colors hover:bg-ivory"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
