"use client";

import { useEffect, useRef, useState } from "react";
import { recordProgress } from "@/lib/reading";
import type { Heading } from "@/lib/headings";

/**
 * Three things for the reader of a long essay: a hairline that shows how far
 * they are, a list of sections beside the text on wide screens with the
 * minutes that remain, and a note in the browser of the point they reached,
 * so the site can offer to continue there. Nothing is sent anywhere.
 */
export default function EssayProgress({ slug, minutes, headings }: { slug: string; minutes: number; headings: Heading[] }) {
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState<string | null>(null);
  const saved = useRef(0);

  useEffect(() => {
    const body = document.getElementById("essay-body");
    if (!body) return;
    let frame = 0;

    function measure() {
      frame = 0;
      const rect = body!.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const p = total <= 0 ? 1 : Math.min(1, Math.max(0, (window.innerHeight * 0.4 - rect.top) / total));
      setProgress(p);
      if (p - saved.current >= 0.04 || (p >= 0.9 && saved.current < 0.9)) {
        saved.current = p;
        recordProgress(slug, p);
      }

      let active: string | null = null;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= 140) active = h.id;
      }
      setCurrent(active);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [slug, headings]);

  const left = Math.max(0, Math.round(minutes * (1 - progress)));

  return (
    <>
      <div className="read-progress" aria-hidden="true">
        <div style={{ transform: `scaleX(${progress})` }} />
      </div>

      {headings.length >= 3 && (
        <nav className="essay-toc" aria-label="In this essay">
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#8B7355" }}>
            In this essay
          </p>
          <p className="text-xs mb-4" style={{ color: "#6B6B6B" }}>
            {progress >= 0.97 ? "Finished" : left <= 0 ? "Under a minute left" : `${left} min left`}
          </p>
          {headings.map((h) => (
            <a key={h.id} href={`#${h.id}`} aria-current={current === h.id ? "true" : undefined}>
              {h.text}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
