"use client";

import { useState } from "react";

const SLATE = "#2B3A52";
const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const FAINT = "#B9B2A4";
const LINE = "#E3DDD1";

const W = 640;
const H = 240;
const P = { x0: 56, x1: 620, y0: 24, y1: 200 };

function swiss(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

// Microsoft Patch Tuesday, CVEs fixed per month. 2025: Tenable year in review (1'130 in the year).
// 2026: lowest and highest count across trackers, because Microsoft widened what it counts during the year.
const BARS = [
  { label: "2025 avg", lo: 94, hi: 94, note: "Average month in 2025. Tenable counted 1'130 CVEs over the year, with a record of 167 in October 2025." },
  { label: "Jan to Mar 2026", lo: 45, hi: 112, note: "The quiet first quarter of 2026: between 45 and 112 flaws in a month, in line with 2025." },
  { label: "Apr to Jun", lo: 160, hi: 220, note: "Second quarter: 160 to 220 a month, roughly double the 2025 average." },
  { label: "Jul", lo: 545, hi: 622, note: "July 2026: 545 to 622, the first month far above the old range. From here the trackers diverge, because the bulletins now include Azure Linux and Chromium components." },
  { label: "Aug", lo: 382, hi: 421, note: "August 2026: 382 to 421, four times the 2025 average." },
  { label: "Sep", lo: 943, hi: 999, note: "September 2026: 943 to 999, ten times the 2025 average." },
  { label: "Oct", lo: 1371, hi: 1413, note: "October 2026: a record. BleepingComputer counted 1'411, 70 of them critical, one exploited zero day." },
];
const MAX = 1500;

export default function PatchTuesday() {
  const [hover, setHover] = useState<number | null>(null);
  const i = hover ?? BARS.length - 1;
  const b = BARS[i];
  const slot = (P.x1 - P.x0) / BARS.length;
  const y = (v: number) => P.y1 - (v / MAX) * (P.y1 - P.y0);
  const multiple = Math.round(b.lo / 94);

  return (
    <div className="my-10 py-8" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <p className="text-xs uppercase tracking-widest" style={{ color: "#8B7355" }}>
          Figure · Microsoft Patch Tuesday, flaws fixed per month
        </p>
        <p className="text-[10px] uppercase tracking-widest shrink-0" style={{ color: FAINT }}>
          Hover or tap a bar
        </p>
      </div>
      <div className="mb-3" style={{ height: "4.6em", overflow: "hidden" }} aria-live="polite">
        <p className="text-sm" style={{ color: INK, lineHeight: 1.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          <strong style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
            {b.lo === b.hi ? `${swiss(b.lo)} a month` : `${swiss(b.lo)} to ${swiss(b.hi)} a month`}
          </strong>
          {b.lo > 94 && <span style={{ color: MUTED }}> · {multiple} times the 2025 average</span>}
        </p>
        <p className="text-xs" style={{ color: MUTED, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{b.note}</p>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Microsoft fixed an average of 94 security flaws a month in 2025. In 2026 the monthly count rose through the year to a record of about 1'400 in October. Hover a bar for the detail."
        style={{ width: "100%", height: "auto", display: "block" }}
        onMouseLeave={() => setHover(null)}
      >
        {[0, 500, 1000, 1500].map((v) => (
          <g key={v}>
            <line x1={P.x0} y1={y(v)} x2={P.x1} y2={y(v)} stroke={LINE} strokeWidth={1} />
            <text x={P.x0 - 8} y={y(v) + 3.5} textAnchor="end" fontSize={9} fill={FAINT} style={{ fontVariantNumeric: "tabular-nums" }}>
              {swiss(v)}
            </text>
          </g>
        ))}
        <line x1={P.x0} y1={y(94)} x2={P.x1} y2={y(94)} stroke={INK} strokeWidth={1} strokeDasharray="1.5 3" />
        {BARS.map((bar, k) => {
          const cx = P.x0 + slot * k + slot / 2;
          const w = 34;
          const top = y(bar.hi);
          const bottom = y(bar.lo);
          const point = bar.lo === bar.hi;
          const on = i === k;
          const dim = hover !== null && !on;
          return (
            <g key={bar.label} onMouseEnter={() => setHover(k)} style={{ cursor: "pointer", opacity: dim ? 0.5 : 1, transition: "opacity 0.15s" }}>
              <rect x={cx - slot / 2} y={P.y0 - 10} width={slot} height={P.y1 - P.y0 + 30} fill="transparent" />
              {point ? (
                <rect x={cx - w / 2} y={top - 1.5} width={w} height={3} fill={INK} />
              ) : (
                <>
                  <rect x={cx - w / 2} y={bottom} width={w} height={P.y1 - bottom} fill={SLATE} />
                  <rect x={cx - w / 2} y={top} width={w} height={bottom - top} fill={SLATE} opacity={0.4} />
                </>
              )}
              {on && <rect x={cx - w / 2 - 3} y={top - 3} width={w + 6} height={P.y1 - top + 3} fill="none" stroke="#8B7355" strokeWidth={1.5} />}
              <text x={cx} y={top - 7} textAnchor="middle" fontSize={10} fontWeight={on ? 700 : 400} fill={point ? INK : SLATE} style={{ fontVariantNumeric: "tabular-nums" }}>
                {point ? swiss(bar.lo) : `${swiss(bar.lo)} to ${swiss(bar.hi)}`}
              </text>
              <text x={cx} y={P.y1 + 16} textAnchor="middle" fontSize={9} fill={on ? INK : FAINT} fontWeight={on ? 700 : 400}>
                {bar.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-xs" style={{ color: MUTED }}>
        <span className="flex items-center gap-2"><span style={{ width: 12, height: 12, background: SLATE, display: "inline-block" }} /> lowest count reported for the month</span>
        <span className="flex items-center gap-2"><span style={{ width: 12, height: 12, background: SLATE, opacity: 0.4, display: "inline-block" }} /> up to the highest count, where trackers disagree</span>
        <span className="flex items-center gap-2"><span style={{ width: 16, height: 0, borderTop: `2px dotted ${INK}`, display: "inline-block" }} /> 2025 average, 94</span>
      </div>
      <p className="text-xs mt-3" style={{ color: MUTED, lineHeight: 1.6 }}>
        {"Trackers disagree in 2026 because Microsoft widened what its bulletins count to include Azure Linux and Chromium components; the lighter band is the gap between them. Sources: Tenable, Patch Tuesday year in review, December 2025; the Zero Day Initiative and BleepingComputer, 13 October 2026; security-insider.de monthly tracker."}
      </p>
    </div>
  );
}
