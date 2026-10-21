"use client";

import { useState } from "react";

const SLATE = "#2B3A52";
const BROWN = "#8B7355";
const BRICK = "#A23B2A";
const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const LINE = "#E3DDD1";

const SIZES = [5, 20, 50];

function fmt(n: number) {
  return n.toLocaleString("de-CH").replace(/’|’|'/g, "'");
}

type Pick = { n: number; i: number } | null;

function Graph({ n, pick, onPick }: { n: number; pick: Pick; onPick: (p: Pick) => void }) {
  const size = 240;
  const c = size / 2;
  const r = size / 2 - 14;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [c + r * Math.cos(a), c + r * Math.sin(a)] as const;
  });
  const seg = (i: number, j: number) => `M${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}L${pts[j][0].toFixed(1)} ${pts[j][1].toFixed(1)}`;
  const edges: string[] = [];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) edges.push(seg(i, j));
  const handoffs = (n * (n - 1)) / 2;
  const active = pick && pick.n === n ? pick.i : null;
  const dim = active !== null;
  const edgeOpacity = (n <= 5 ? 0.75 : n <= 20 ? 0.35 : 0.18) * (dim ? 0.35 : 1);
  const dot = n <= 5 ? 6 : n <= 20 ? 4 : 2.6;
  const hi = active !== null ? pts.map((_, j) => (j === active ? "" : seg(active, j))).join("") : "";
  return (
    <figure className="flex flex-col items-center m-0">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        style={{ maxWidth: 240, overflow: "visible" }}
        role="img"
        aria-label={`${n} systems, ${fmt(handoffs)} possible handoffs between them`}
        onMouseLeave={() => onPick(null)}
      >
        <path d={edges.join("")} fill="none" stroke={SLATE} strokeWidth={n <= 5 ? 1.2 : 0.6} strokeOpacity={edgeOpacity} />
        {hi && <path d={hi} fill="none" stroke={BRICK} strokeWidth={n <= 5 ? 1.8 : 1.1} strokeOpacity={0.9} />}
        {pts.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i === active ? dot + 1.5 : dot} fill={i === active ? BRICK : BROWN} />
            <circle
              cx={x}
              cy={y}
              r={Math.max(dot + 4, 7)}
              fill="transparent"
              style={{ cursor: "pointer" }}
              onMouseEnter={() => onPick({ n, i })}
              onClick={() => onPick(active === i ? null : { n, i })}
            />
          </g>
        ))}
      </svg>
      <figcaption className="text-center mt-2">
        <p className="font-[family-name:var(--font-cormorant)]" style={{ fontSize: "1.9rem", lineHeight: 1.1, color: SLATE, fontVariantNumeric: "tabular-nums" }}>
          {fmt(handoffs)}
        </p>
        <p className="text-xs" style={{ color: INK }}>
          possible handoffs
        </p>
        <p className="text-xs" style={{ color: MUTED }}>
          between {n} systems
        </p>
      </figcaption>
    </figure>
  );
}

export default function HandoffGraph() {
  const [pick, setPick] = useState<Pick>(null);
  const readout = pick
    ? `One of ${pick.n} systems hands work to ${pick.n - 1} others. Add one more system and each of the ${pick.n} gets another interface to run.`
    : "Hover or tap a dot to see what one system connects to.";
  return (
    <div className="my-10 py-8" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <p className="text-xs uppercase tracking-widest" style={{ color: BROWN }}>
          Figure · Handoffs grow with the square of the count
        </p>
      </div>
      <p
        className="text-sm mb-4"
        style={{ height: "2.9em", overflow: "hidden", color: pick ? BRICK : MUTED, fontWeight: pick ? 700 : 400, lineHeight: 1.45 }}
        aria-live="polite"
      >
        {readout}
      </p>
      <div className="grid grid-cols-3 gap-3 md:gap-8">
        {SIZES.map((n) => (
          <Graph key={n} n={n} pick={pick} onPick={setPick} />
        ))}
      </div>
      <p className="text-xs mt-5" style={{ color: MUTED, lineHeight: 1.6 }}>
        Each dot is a system, tool or automation that may need to hand work to another, each line a handoff that may need a queue, a restart and a log. Not every pair does. Even if only one in ten ever does, 50 systems leave about 123 interfaces to run, twelve times the full count at five. Illustrative calculation: n times n minus one, divided by two. A platform settles the queue, the restart and the log once for all of them. A build settles them again for each one.
      </p>
    </div>
  );
}
