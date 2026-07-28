"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Clears overflow locks after route changes.
 * Teardown Lenis only on confirmed click navigation — never on pointerdown,
 * which freezes scroll when a touch/drag begins on a link.
 */
export function RouteScrollCleanup() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.height = "";

      const w = window as Window & { __lenis?: Lenis };
      try {
        w.__lenis?.start?.();
      } catch {
        // ignore
      }

      prevPath.current = pathname;
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Ignore modified clicks / middle-click (new tab)
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;

      let isInternal = href.startsWith("/");
      try {
        if (!isInternal) {
          isInternal =
            new URL(href, window.location.href).origin ===
            window.location.origin;
        }
      } catch {
        return;
      }
      if (!isInternal) return;

      const url = new URL(href, window.location.href);
      if (
        url.pathname === pathname &&
        url.search === window.location.search &&
        !url.hash
      ) {
        return;
      }

      // Soft teardown — do not leave Lenis permanently stopped if nav aborts
      const w = window as Window & { __lenis?: Lenis };
      try {
        ScrollTrigger.getAll().forEach((t) => t.kill(false));
      } catch {
        // ignore teardown races
      }

      // Brief pause only; restart shortly in case Next soft-nav is cancelled
      try {
        w.__lenis?.stop?.();
        window.setTimeout(() => {
          try {
            w.__lenis?.start?.();
          } catch {
            // ignore
          }
        }, 800);
      } catch {
        // ignore
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return null;
}
