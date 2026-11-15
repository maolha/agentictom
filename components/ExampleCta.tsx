"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";

const SLATE = "#2B3A52";
const BROWN = "#8B7355";
const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const SUNK = "#F0ECE3";
const LINE2 = "#D8D3CB";

const HREF = "/blog/the-staff-of-fifteen-buys-a-house";
const POSTER = "/videos/staff-of-fifteen-buys-a-house.jpg";

/**
 * Sends the reader of "A Staff of Fifteen" to the worked example. A text link
 * gets lost among the cross references, so this is a button: a slim band near
 * the top of the essay, and a card with the film's title frame after the exercise.
 */
export default function ExampleCta({ variant }: { variant: "top" | "end" }) {
  const onClick = () => track("post_example_cta", { from: "a-staff-of-fifteen", position: variant });

  if (variant === "top") {
    return (
      <aside className="my-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 md:p-5" style={{ background: SUNK, border: `1px solid ${LINE2}`, borderLeft: `3px solid ${BROWN}` }}>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: BROWN }}>
            See it in action
          </p>
          <p className="text-sm" style={{ color: INK, lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700 }}>One household buys a house with a staff of 15.</span> A three minute film and a journey map you can explore.
          </p>
        </div>
        <Link href={HREF} onClick={onClick} className="btn-slate shrink-0 text-center">
          See the example&nbsp;→
        </Link>
      </aside>
    );
  }

  return (
    <aside className="my-10 grid sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]" style={{ background: SUNK, border: `1px solid ${LINE2}` }}>
      <Link href={HREF} onClick={onClick} aria-label="Watch the film: The Staff of Fifteen Buys a House" className="relative block" style={{ background: SLATE, minHeight: 150 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- a static poster in public/, shown at one small size */}
        <img src={POSTER} alt="" loading="lazy" width={1280} height={720} style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }} />
        <span aria-hidden="true" className="absolute flex items-center justify-center" style={{ right: 14, bottom: 14, width: 40, height: 40, borderRadius: "50%", background: "#F7F4EF", color: SLATE, fontSize: 14, paddingLeft: 3 }}>
          ▶
        </span>
      </Link>
      <div className="p-5 md:p-6">
        <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: BROWN }}>
          The exercise, run on one journey
        </p>
        <p className="font-[family-name:var(--font-cormorant)]" style={{ fontSize: "1.6rem", lineHeight: 1.15, color: SLATE }}>
          One household. One property. Twelve stages.
        </p>
        <p className="text-sm mt-2 mb-4" style={{ color: MUTED, lineHeight: 1.55 }}>
          Watch the three minute film, then switch the journey map between the bank&rsquo;s view and the client&rsquo;s.
        </p>
        <Link href={HREF} onClick={onClick} className="btn-slate text-center">
          Watch the example&nbsp;→
        </Link>
      </div>
    </aside>
  );
}
