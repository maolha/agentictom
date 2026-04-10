"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A thin vertical beam that follows scroll progress down the left edge of the content.
 * Inspired by The Economist's reading progress indicator.
 * Only visible on desktop (md+).
 *
 * Progress = 0 when the top of the container reaches the viewport.
 * Progress = 1 when the bottom of the container is visible.
 */
export default function TracingBeam({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // How far the top of the container has scrolled above the viewport
      const scrolledPast = -rect.top;
      // Total scrollable distance: container height minus one viewport height
      // (when scrolledPast equals this, the bottom of the container is at the bottom of the viewport)
      const total = rect.height - window.innerHeight;

      if (total <= 0) {
        // Container is shorter than the viewport — fully visible
        setProgress(1);
        return;
      }

      const pct = Math.min(1, Math.max(0, scrolledPast / total));
      setProgress(pct);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Beam track — only on large screens (≥1024px) */}
      <div
        className="hidden lg:block absolute left-0 top-0 bottom-0"
        style={{ width: 1, marginLeft: -24 }}
      >
        {/* Background track */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1,
            height: "100%",
            background: "#D8D3CB",
          }}
        />
        {/* Active beam */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 2,
            height: `${progress * 100}%`,
            background: "#2B3A52",
            marginLeft: -0.5,
            transition: "height 50ms linear",
          }}
        />
        {/* Dot at current position */}
        <div
          style={{
            position: "absolute",
            left: -3,
            top: `${progress * 100}%`,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#2B3A52",
            transition: "top 50ms linear",
          }}
        />
      </div>
      {children}
    </div>
  );
}
