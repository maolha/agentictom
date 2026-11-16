"use client";

import Link from "next/link";
import { useReading, unfinished, isNewSince, isRead } from "@/lib/reading";
import type { PostMeta } from "@/lib/blog";

const label = "text-xs uppercase tracking-widest";

/**
 * Shown to a returning reader only: the essay left unfinished, and what was
 * published since the last visit. A first visit renders nothing.
 */
export default function ReaderStrip({ posts }: { posts: PostMeta[] }) {
  const reading = useReading();

  const open = unfinished(reading);
  const resume = open ? posts.find((p) => p.slug === open.slug) : undefined;
  const fresh = posts.filter((p) => isNewSince(reading, p.date) && !isRead(reading, p.slug) && p.slug !== resume?.slug);
  if (!resume && fresh.length === 0) return null;

  const minutesLeft = resume && open ? Math.max(1, Math.round(resume.readingTime * (1 - open.progress))) : 0;

  return (
    <div className="reader-strip mb-10 grid gap-px sm:grid-cols-2" style={{ background: "#D8D3CB", border: "1px solid #D8D3CB" }}>
      {resume && open && (
        <Link href={`/blog/${resume.slug}`} className={`group block p-5 md:p-6 ${fresh.length === 0 ? "sm:col-span-2" : ""}`} style={{ background: "#F7F4EF" }}>
          <p className={`${label} mb-2`} style={{ color: "#8B7355" }}>
            Continue reading &middot; {minutesLeft} min left
          </p>
          <p className="font-[family-name:var(--font-cormorant)] font-light group-hover:underline" style={{ fontSize: "1.3rem", lineHeight: 1.25, color: "#2B3A52" }}>
            {resume.title}
          </p>
          <div className="mt-3" style={{ height: 3, background: "rgba(43,58,82,0.12)" }} aria-hidden="true">
            <div style={{ height: "100%", width: `${Math.round(open.progress * 100)}%`, background: "#2B3A52" }} />
          </div>
        </Link>
      )}
      {fresh.length > 0 && (
        <div className={`p-5 md:p-6 ${resume ? "" : "sm:col-span-2"}`} style={{ background: "#F7F4EF" }}>
          <p className={`${label} mb-2`} style={{ color: "#8B7355" }}>
            New since your last visit
          </p>
          <ul className="flex flex-col gap-1.5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {fresh.slice(0, 3).map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="font-[family-name:var(--font-cormorant)] font-light hover:underline" style={{ fontSize: "1.2rem", lineHeight: 1.25, color: "#2B3A52" }}>
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
