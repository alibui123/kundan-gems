"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Frees Lenis / ScrollTrigger as soon as an internal link is pressed so
 * navigations aren't blocked by homepage pin + heavy frame decoding.
 */
export function RouteScrollCleanup() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    // After a route change, clear overflow locks Lenis may have left behind.
    // Do not kill ScrollTriggers here — the new page may have just created them.
    if (prevPath.current !== pathname) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.height = "";
      prevPath.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;

      let isInternal = href.startsWith("/");
      try {
        if (!isInternal) {
          isInternal = new URL(href, window.location.href).origin === window.location.origin;
        }
      } catch {
        return;
      }
      if (!isInternal) return;

      // Same-page hash-only already filtered; ignore pure query self-links lightly
      if (href === pathname) return;

      const w = window as Window & { __lenis?: Lenis };
      try {
        w.__lenis?.stop?.();
        ScrollTrigger.getAll().forEach((t) => t.kill(false));
      } catch {
        // ignore teardown races
      }
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [pathname]);

  return null;
}
