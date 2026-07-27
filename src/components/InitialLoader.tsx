"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { BrandLoader } from "@/components/BrandLoader";

const MIN_MS = 2200;

/**
 * Loader only on hard reload / first visit of the homepage.
 * Never on other routes, and never on in-app navigations (including back to /).
 */
export function InitialLoader() {
  const pathname = usePathname();
  const ran = useRef(false);
  const [visible, setVisible] = useState(() => pathname === "/");
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    if (pathname !== "/") {
      setVisible(false);
      return;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const started = performance.now();
    let settled = false;
    let waitTimer: number | null = null;

    const finish = () => {
      if (settled) return;
      settled = true;

      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      waitTimer = window.setTimeout(
        () => {
          if (reduce) {
            setVisible(false);
            return;
          }
          setExiting(true);
          const el = document.getElementById("kundan-initial-loader");
          if (!el) {
            setVisible(false);
            return;
          }
          gsap.to(el, {
            autoAlpha: 0,
            duration: 0.65,
            ease: "power2.out",
            onComplete: () => setVisible(false),
          });
        },
        reduce ? 0 : wait
      );
    };

    if (document.readyState === "complete") {
      requestAnimationFrame(() => finish());
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const safety = window.setTimeout(finish, 6000);
    return () => {
      window.clearTimeout(safety);
      if (waitTimer) window.clearTimeout(waitTimer);
      window.removeEventListener("load", finish);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      id="kundan-initial-loader"
      className={exiting ? "pointer-events-none" : ""}
      aria-busy={!exiting}
      aria-live="polite"
    >
      <BrandLoader fillKey="home-boot" />
    </div>
  );
}
