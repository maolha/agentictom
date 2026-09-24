"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Reports how far a reader gets through a post: once at half way, once at the end.
 * Progress is measured on the article element, the same way the tracing beam does it.
 * No cookies, no identifiers: the events carry the post slug and nothing else.
 */
export default function ReadDepth({ slug }: { slug: string }) {
  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;
    let half = false;
    let end = false;

    function onScroll() {
      if (end) return;
      const rect = article!.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total <= 0 ? 1 : Math.min(1, Math.max(0, -rect.top / total));
      if (!half && progress >= 0.5) {
        half = true;
        track("post_read", { slug, depth: "half" });
      }
      if (!end && progress >= 0.95) {
        end = true;
        track("post_read", { slug, depth: "end" });
        window.removeEventListener("scroll", onScroll);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return null;
}
