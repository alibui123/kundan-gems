"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type CollectionPaginationProps = {
  page: number;
  totalPages: number;
  basePath: string;
  /** Extra query params preserved across pages (e.g. material) */
  query?: Record<string, string>;
  /** Element id to keep in view when changing pages */
  anchorId?: string;
};

function pageHref(
  basePath: string,
  page: number,
  anchorId?: string,
  query?: Record<string, string>
) {
  const params = new URLSearchParams(query);
  if (page > 1) params.set("page", String(page));
  else params.delete("page");
  const qs = params.toString();
  const path = qs ? `${basePath}?${qs}` : basePath;
  return anchorId ? `${path}#${anchorId}` : path;
}

export function CollectionPagination({
  page,
  totalPages,
  basePath,
  query,
  anchorId = "rings-grid",
}: CollectionPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-border pt-10 sm:flex-row"
      aria-label="Collection pagination"
    >
      <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        {page > 1 ? (
          <Link
            href={pageHref(basePath, page - 1, anchorId, query)}
            scroll={false}
            className="inline-flex h-11 items-center rounded-full border border-border px-5 text-[11px] tracking-[0.16em] text-ink uppercase transition-colors hover:border-gold hover:text-gold"
          >
            ← Previous
          </Link>
        ) : (
          <span className="inline-flex h-11 items-center rounded-full border border-border/50 px-5 text-[11px] tracking-[0.16em] text-muted/40 uppercase">
            ← Previous
          </span>
        )}

        <div className="flex items-center gap-1.5 px-2">
          {Array.from({ length: totalPages }, (_, i) => {
            const n = i + 1;
            const active = n === page;
            return (
              <Link
                key={n}
                href={pageHref(basePath, n, anchorId, query)}
                scroll={false}
                aria-current={active ? "page" : undefined}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors ${
                  active ? "bg-gold text-void" : "text-muted hover:text-ink"
                }`}
              >
                {n}
              </Link>
            );
          })}
        </div>

        {page < totalPages ? (
          <Link
            href={pageHref(basePath, page + 1, anchorId, query)}
            scroll={false}
            className="inline-flex h-11 items-center rounded-full border border-border px-5 text-[11px] tracking-[0.16em] text-ink uppercase transition-colors hover:border-gold hover:text-gold"
          >
            Next →
          </Link>
        ) : (
          <span className="inline-flex h-11 items-center rounded-full border border-border/50 px-5 text-[11px] tracking-[0.16em] text-muted/40 uppercase">
            Next →
          </span>
        )}
      </div>
    </nav>
  );
}

/** Keeps the product grid in view after ?page= / ?material= changes */
export function KeepGridInView({ anchorId = "rings-grid" }: { anchorId?: string }) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const material = searchParams.get("material") ?? "all";

  useEffect(() => {
    const el = document.getElementById(anchorId);
    if (!el) return;

    const paginating =
      searchParams.has("page") ||
      searchParams.has("material") ||
      window.location.hash === `#${anchorId}`;
    if (!paginating) return;

    el.scrollIntoView({ behavior: "auto", block: "start" });
  }, [page, material, anchorId, searchParams]);

  return null;
}
