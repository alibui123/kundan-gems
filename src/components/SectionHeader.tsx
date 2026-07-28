import Link from "next/link";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "View all",
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={`mb-10 md:mb-14 ${
        centered ? "mx-auto max-w-2xl text-center" : ""
      } ${
        href && !centered
          ? "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          : ""
      } ${className}`}
    >
      <div className={centered ? "" : "max-w-xl"}>
        <p className="label-caps mb-3">{eyebrow}</p>
        <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.08] tracking-[-0.02em] text-ink text-balance">
          {title}
        </h2>
        {description && (
          <p
            className={`mt-4 text-[15px] leading-[1.75] text-muted ${
              centered ? "mx-auto max-w-md" : "max-w-md"
            }`}
          >
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className={`group inline-flex shrink-0 items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-ink/70 uppercase transition-colors hover:text-gold ${
            centered ? "mt-6 justify-center" : ""
          }`}
        >
          {linkLabel}
          <span
            className="h-px w-6 bg-current transition-transform duration-300 group-hover:w-9"
            aria-hidden
          />
        </Link>
      )}
    </div>
  );
}
