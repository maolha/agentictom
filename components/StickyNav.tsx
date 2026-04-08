"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Sticky nav with two behaviours:
 * - Desktop (≥768px): always visible at top
 * - Mobile (<768px): hide on scroll down, show on scroll up (iOS Safari pattern)
 *
 * Uses position: fixed so the nav stays out of document flow.
 * Pages that use this should have sufficient top padding on their first content section.
 */
export default function StickyNav({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const isMobile = window.innerWidth < 768;

        if (!isMobile) {
          // Desktop: always visible
          if (hidden) setHidden(false);
        } else {
          // Mobile: scroll-aware
          const delta = currentY - lastScrollY.current;
          if (currentY < 80) {
            // Near top, always show
            setHidden(false);
          } else if (delta > 4) {
            // Scrolling down
            setHidden(true);
          } else if (delta < -4) {
            // Scrolling up
            setHidden(false);
          }
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    }

    function onResize() {
      if (window.innerWidth >= 768 && hidden) setHidden(false);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [hidden]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-5 md:px-8 py-4"
      style={{
        background: "#F7F4EF",
        borderBottom: "1px solid #D8D3CB",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 250ms ease-out",
      }}
    >
      {children}
    </nav>
  );
}
