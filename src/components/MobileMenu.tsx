"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { brand, collections } from "@/lib/data";
import { CATALOGS, catalogMeta } from "@/lib/catalogs";
import { MATERIALS, materialMeta } from "@/lib/products";

gsap.registerPlugin(useGSAP);

export type MenuLink = {
  label: string;
  href: string;
};

type SubLink = {
  label: string;
  href: string;
  hint?: string;
  description?: string;
};

type NavNode = {
  id: string;
  label: string;
  href?: string;
  children?: SubLink[];
};

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: MenuLink[];
};

function buildTree(links: MenuLink[]): NavNode[] {
  const catalogChildren: SubLink[] = [
    ...CATALOGS.map((slug) => ({
      label: catalogMeta[slug].title,
      hint: catalogMeta[slug].urduHint,
      description: catalogMeta[slug].subtitle,
      href: `/catalogs/${slug}`,
    })),
    { label: "All catalogs", href: "/#catalogs", description: "Browse the stage" },
  ];

  const materialChildren: SubLink[] = [
    ...MATERIALS.map((slug) => ({
      label: materialMeta[slug].title,
      description: materialMeta[slug].subtitle,
      href: `/materials/${slug}`,
    })),
    { label: "All materials", href: "/#materials", description: "Shop by stone" },
  ];

  const formChildren: SubLink[] = [
    ...collections.map((c) => ({
      label: c.title,
      description: c.subtitle,
      href: c.href,
    })),
    { label: "All forms", href: "/#collections", description: "Silhouette edit" },
  ];

  const nestedIds = new Set(["Catalogs", "Materials"]);
  const nodes: NavNode[] = [];

  for (const link of links) {
    if (link.label === "Catalogs") {
      nodes.push({
        id: "catalogs",
        label: "Catalogs",
        href: link.href,
        children: catalogChildren,
      });
    } else if (link.label === "Materials") {
      nodes.push({
        id: "materials",
        label: "Materials",
        href: link.href,
        children: materialChildren,
      });
    } else if (!nestedIds.has(link.label)) {
      nodes.push({
        id: link.label.toLowerCase(),
        label: link.label,
        href: link.href,
      });
    }
  }

  const matsIdx = nodes.findIndex((n) => n.id === "materials");
  const formNode: NavNode = {
    id: "forms",
    label: "By form",
    href: "/#collections",
    children: formChildren,
  };
  if (matsIdx >= 0) nodes.splice(matsIdx + 1, 0, formNode);
  else nodes.splice(2, 0, formNode);

  return nodes;
}

function NestedItem({
  node,
  index,
  expanded,
  onExpand,
  onClose,
  canHover,
}: {
  node: NavNode;
  index: number;
  expanded: boolean;
  onExpand: (id: string | null) => void;
  onClose: () => void;
  canHover: boolean;
}) {
  const hasChildren = Boolean(node.children?.length);

  return (
    <div
      className="border-b border-border/70"
      onMouseEnter={() => {
        if (hasChildren && canHover) onExpand(node.id);
      }}
    >
      <div className="group flex items-center gap-3 py-3.5">
        <span className="w-6 shrink-0 font-display text-xs text-gold/70 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        {hasChildren ? (
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center justify-between text-left"
            aria-expanded={expanded}
            onClick={() => onExpand(expanded ? null : node.id)}
          >
            <span className="font-display text-[clamp(1.4rem,2vw,1.75rem)] font-light leading-none tracking-[-0.02em] text-ink transition-colors group-hover:text-gold">
              {node.label}
            </span>
            <span
              className={`ml-2 text-gold transition-transform duration-200 ease-out ${
                expanded ? "rotate-45" : ""
              }`}
              aria-hidden
            >
              +
            </span>
          </button>
        ) : (
          <Link
            href={node.href ?? "/"}
            onClick={onClose}
            className="flex min-w-0 flex-1 items-center justify-between"
          >
            <span className="font-display text-[clamp(1.4rem,2vw,1.75rem)] font-light leading-none tracking-[-0.02em] text-ink transition-colors group-hover:text-gold">
              {node.label}
            </span>
          </Link>
        )}
      </div>

      {hasChildren && (
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="mb-3 ml-9 space-y-0.5 border-l border-gold/35 pl-3">
              {node.children!.map((child) => (
                <li key={child.href + child.label}>
                  <Link
                    href={child.href}
                    onClick={onClose}
                    className="group/sub flex flex-col gap-0.5 rounded-sm py-2.5 pr-2 transition-colors hover:bg-gold/5"
                  >
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-[13px] tracking-[0.06em] text-ink transition-colors group-hover/sub:text-gold">
                        {child.label}
                      </span>
                      {child.hint && (
                        <span className="font-display text-sm text-gold/75">
                          {child.hint}
                        </span>
                      )}
                    </span>
                    {child.description && (
                      <span className="text-[11px] leading-snug text-muted">
                        {child.description}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Left drawer — CSS accordion + light GSAP open/close (no height tweens).
 */
export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const veilRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);
  const tree = useMemo(() => buildTree(links), [links]);

  const onExpand = useCallback((id: string | null) => {
    setExpanded(id);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  useGSAP(
    () => {
      const root = rootRef.current;
      const panel = panelRef.current;
      const veil = veilRef.current;
      if (!root || !panel || !veil) return;

      tlRef.current?.kill();

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!open) {
        gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
        gsap.set(panel, { xPercent: -100 });
        gsap.set(veil, { autoAlpha: 0 });
        return;
      }

      gsap.set(root, { autoAlpha: 1, pointerEvents: "auto" });

      if (reduce) {
        gsap.set(panel, { xPercent: 0 });
        gsap.set(veil, { autoAlpha: 1 });
        return;
      }

      gsap.set(veil, { autoAlpha: 0 });
      gsap.set(panel, { xPercent: -100 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tlRef.current = tl;

      tl.to(veil, { autoAlpha: 1, duration: 0.25 }, 0).to(
        panel,
        { xPercent: 0, duration: 0.42, ease: "power3.out" },
        0
      );
    },
    { scope: rootRef, dependencies: [open] }
  );

  const closeWithMotion = useCallback(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    const veil = veilRef.current;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!root || !panel || !veil || reduce) {
      onClose();
      return;
    }

    tlRef.current?.kill();
    setExpanded(null);
    const tl = gsap.timeline({
      defaults: { ease: "power2.in" },
      onComplete: onClose,
    });
    tlRef.current = tl;
    tl.to(panel, { xPercent: -100, duration: 0.32 }, 0).to(
      veil,
      { autoAlpha: 0, duration: 0.22 },
      0.05
    );
  }, [onClose]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[60]"
      style={{ visibility: "hidden" }}
      aria-hidden={!open}
    >
      <button
        ref={veilRef}
        type="button"
        className="absolute inset-0 bg-ink/35"
        aria-label="Close menu"
        onClick={closeWithMotion}
      />

      <aside
        ref={panelRef}
        className="absolute inset-y-0 left-0 flex w-[min(28vw,24rem)] min-w-[18.5rem] max-w-[24rem] flex-col overflow-y-auto overscroll-contain border-r border-border bg-ivory shadow-[12px_0_40px_rgba(37,37,37,0.08)] will-change-transform"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="h-16 shrink-0 lg:h-[4.25rem]" aria-hidden />

        <div className="relative flex flex-1 flex-col px-5 pb-8 pt-2 sm:px-6">
          <div className="mb-5">
            <p className="label-caps">Menu</p>
            <p className="mt-2 font-display text-2xl font-light tracking-[0.12em] text-ink uppercase">
              {brand.name}
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-muted">
              Hover a chapter to open its rooms.
            </p>
          </div>

          <div className="mb-4 h-px bg-border" />

          <nav aria-label="Primary" className="flex flex-col">
            {tree.map((node, i) => (
              <NestedItem
                key={node.id}
                node={node}
                index={i}
                expanded={expanded === node.id}
                onExpand={onExpand}
                onClose={closeWithMotion}
                canHover={canHover}
              />
            ))}
          </nav>

          <div className="mt-auto border-t border-border pt-6">
            <p className="text-[10px] tracking-[0.2em] text-muted uppercase">
              Atelier
            </p>
            <p className="mt-1.5 text-sm text-ink/80">Pakistan · by appointment</p>
            <a
              href="mailto:hello@kundan.atelier"
              className="mt-3 inline-block text-[11px] tracking-[0.14em] text-gold uppercase transition-colors hover:text-ink"
            >
              hello@kundan.atelier
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

/** Three-line mark that morphs into an X — CSS only. */
export function MenuToggle({
  open,
  onClick,
  className = "",
}: {
  open: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
      className={`relative z-[70] flex h-11 w-11 items-center justify-center text-ink ${className}`}
    >
      <span className="relative block h-[14px] w-[22px]" aria-hidden>
        <span
          className={`absolute left-0 h-[1.5px] w-full origin-center bg-current transition-transform duration-300 ease-out ${
            open ? "top-[6px] rotate-45" : "top-0 rotate-0"
          }`}
        />
        <span
          className={`absolute top-[6px] left-0 h-[1.5px] w-full origin-center bg-current transition-opacity duration-200 ease-out ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute left-0 h-[1.5px] w-full origin-center bg-current transition-transform duration-300 ease-out ${
            open ? "top-[6px] -rotate-45" : "top-[12px] rotate-0"
          }`}
        />
      </span>
    </button>
  );
}
