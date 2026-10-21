"use client";

import { useState } from "react";

const SLATE = "#2B3A52";
const BROWN = "#8B7355";
const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const FAINT = "#B9B2A4";
const LINE = "#E3DDD1";

const W = 640;
const H = 250;

// Left panel: price per million tokens for a GPT-3 class capability, a16z "LLMflation", November 2024.
const PRICE = [
  { year: 2021.9, usd: 60, label: "USD 60" },
  { year: 2024.8, usd: 0.06, label: "USD 0.06" },
];
// Right panel: share of lifetime software cost or developer time that is maintenance.
const SHARE = [
  { year: "2002", lo: 40, hi: 80, src: "Glass", note: "Robert Glass, Facts and Fallacies of Software Engineering: maintenance consumes 40 to 80 percent of software cost, 60 on average, and about 60 percent of that is enhancement rather than repair." },
  { year: "2018", lo: 42, hi: 42, src: "Stripe", note: "Stripe, The Developer Coefficient, more than 1'000 developers: 17.3 hours of a 41 hour week on maintenance and technical debt. Measured as time, not cost." },
  { year: "2024", lo: 65, hi: 85, src: "ISBSG", note: "ISBSG benchmark from about 1'900 maintenance and support projects: 65 to 85 percent of an application's total ownership cost." },
];
const PRICE_NOTES = [
  "Late 2021: GPT-3 class capability at USD 60 per million tokens. a16z, LLMflation, November 2024.",
  "Late 2024: the same capability at six cents. A thousandfold in three years, about 10x a year.",
];

export default function PriceVsMaintenance() {
  const [hover, setHover] = useState<{ panel: "price" | "share"; i: number } | null>(null);
  const focus = hover ?? { panel: "share" as const, i: 2 };
  const readout =
    focus.panel === "price"
      ? { head: PRICE[focus.i].label + " per million tokens", note: PRICE_NOTES[focus.i], color: SLATE }
      : {
          head: `${SHARE[focus.i].year}, ${SHARE[focus.i].src}: ${SHARE[focus.i].lo === SHARE[focus.i].hi ? `${SHARE[focus.i].lo} percent` : `${SHARE[focus.i].lo} to ${SHARE[focus.i].hi} percent`}`,
          note: SHARE[focus.i].note,
          color: BROWN,
        };
  // Left panel geometry
  const L = { x0: 46, x1: 300, y0: 30, y1: 200 };
  const lx = (y: number) => L.x0 + ((y - 2021.5) / (2025.2 - 2021.5)) * (L.x1 - L.x0);
  const ly = (usd: number) => L.y0 + ((Math.log10(100) - Math.log10(usd)) / (Math.log10(100) - Math.log10(0.01))) * (L.y1 - L.y0);
  // Right panel geometry
  const R = { x0: 370, x1: 620, y0: 30, y1: 200 };
  const ry = (p: number) => R.y1 - (p / 100) * (R.y1 - R.y0);
  const slot = (R.x1 - R.x0) / SHARE.length;

  return (
    <div className="my-10 py-8" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
      <p className="text-xs uppercase tracking-widest mb-3" style={{ color: BROWN }}>
        Figure · The first version got cheap. The years after did not.
      </p>
      <div className="mb-3" style={{ minHeight: "3.2em" }} aria-live="polite">
        <p className="text-sm" style={{ color: readout.color, lineHeight: 1.5, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{readout.head}</p>
        <p className="text-xs" style={{ color: MUTED, lineHeight: 1.5 }}>{readout.note}</p>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Two panels. Left: the price of a million tokens for a GPT-3 class capability fell from 60 dollars in late 2021 to 6 cents in late 2024, a thousandfold. Right: the share of software cost that is maintenance stayed between 40 and 85 percent across studies from 2002, 2018 and 2024."
        style={{ width: "100%", height: "auto", display: "block" }}
        onMouseLeave={() => setHover(null)}
      >
        {/* Left panel */}
        <text x={L.x0} y={18} fontSize={10} fill={MUTED} letterSpacing="0.1em" style={{ textTransform: "uppercase" }}>
          Price of a million tokens, GPT-3 class
        </text>
        {[100, 10, 1, 0.1, 0.01].map((v) => (
          <g key={v}>
            <line x1={L.x0} y1={ly(v)} x2={L.x1} y2={ly(v)} stroke={LINE} strokeWidth={1} />
            <text x={L.x0 - 6} y={ly(v) + 3.5} textAnchor="end" fontSize={9} fill={FAINT} style={{ fontVariantNumeric: "tabular-nums" }}>
              {v >= 1 ? v : v.toFixed(2)}
            </text>
          </g>
        ))}
        {[2022, 2023, 2024, 2025].map((y) => (
          <text key={y} x={lx(y)} y={L.y1 + 16} textAnchor="middle" fontSize={9} fill={FAINT}>
            {y}
          </text>
        ))}
        <line x1={lx(PRICE[0].year)} y1={ly(PRICE[0].usd)} x2={lx(PRICE[1].year)} y2={ly(PRICE[1].usd)} stroke={SLATE} strokeWidth={2.4} strokeLinecap="round" />
        {PRICE.map((p, i) => (
          <g key={i} onMouseEnter={() => setHover({ panel: "price", i })} style={{ cursor: "default" }}>
            <rect x={lx(p.year) - 60} y={L.y0 - 10} width={120} height={L.y1 - L.y0 + 20} fill="transparent" />
            <circle cx={lx(p.year)} cy={ly(p.usd)} r={focus.panel === "price" && focus.i === i ? 6 : 4} fill={SLATE} stroke="#F7F4EF" strokeWidth={1.5} />
            <text x={lx(p.year) + (i === 0 ? 10 : -10)} y={ly(p.usd) + (i === 0 ? 4 : -11)} textAnchor={i === 0 ? "start" : "end"} fontSize={10} fontWeight={700} fill={SLATE} style={{ fontVariantNumeric: "tabular-nums" }}>
              {p.label}
            </text>
          </g>
        ))}
        <text x={L.x0 + 10} y={L.y1 - 10} fontSize={10} fill={MUTED}>
          about 10x cheaper every year
        </text>
        <text x={L.x0} y={L.y1 + 34} fontSize={9} fill={FAINT}>
          USD, log scale. a16z, November 2024.
        </text>

        {/* Right panel */}
        <text x={R.x0} y={18} fontSize={10} fill={MUTED} letterSpacing="0.1em" style={{ textTransform: "uppercase" }}>
          Maintenance share of software cost
        </text>
        {[0, 25, 50, 75, 100].map((p) => (
          <g key={p}>
            <line x1={R.x0} y1={ry(p)} x2={R.x1} y2={ry(p)} stroke={LINE} strokeWidth={1} />
            <text x={R.x0 - 6} y={ry(p) + 3.5} textAnchor="end" fontSize={9} fill={FAINT} style={{ fontVariantNumeric: "tabular-nums" }}>
              {p}%
            </text>
          </g>
        ))}
        {SHARE.map((s, i) => {
          const cx = R.x0 + slot * i + slot / 2;
          const point = s.lo === s.hi;
          const on = focus.panel === "share" && focus.i === i;
          return (
            <g key={s.year} onMouseEnter={() => setHover({ panel: "share", i })} style={{ cursor: "default", opacity: hover && !on && hover.panel === "share" ? 0.5 : 1, transition: "opacity 0.15s" }}>
              <rect x={cx - slot / 2} y={R.y0 - 10} width={slot} height={R.y1 - R.y0 + 40} fill="transparent" />
              {point ? (
                <circle cx={cx} cy={ry(s.lo)} r={5} fill={BROWN} stroke="#F7F4EF" strokeWidth={1.5} />
              ) : (
                <rect x={cx - 14} y={ry(s.hi)} width={28} height={ry(s.lo) - ry(s.hi)} fill={BROWN} opacity={0.85} />
              )}
              <text x={cx} y={ry(s.hi) - 7} textAnchor="middle" fontSize={10} fontWeight={700} fill={BROWN} style={{ fontVariantNumeric: "tabular-nums" }}>
                {point ? `${s.lo}%` : `${s.lo} to ${s.hi}%`}
              </text>
              <text x={cx} y={R.y1 + 16} textAnchor="middle" fontSize={9} fill={FAINT}>
                {s.year}
              </text>
              <text x={cx} y={R.y1 + 28} textAnchor="middle" fontSize={9} fill={FAINT}>
                {s.src}
              </text>
            </g>
          );
        })}
        <line x1={R.x0} y1={ry(60)} x2={R.x1} y2={ry(60)} stroke={INK} strokeWidth={1} strokeDasharray="1.5 3" />
        <text x={R.x0 + 4} y={ry(60) - 5} fontSize={9} fill={INK}>
          60 percent, the usual average
        </text>
      </svg>
      <p className="text-xs mt-4" style={{ color: MUTED, lineHeight: 1.6 }}>
        Left: a16z, LLMflation, November 2024, price for a constant GPT-3 class capability. Right: three studies that measure maintenance differently, as a share of cost, of developer time, and of ownership cost, and point the same way. Hover a point or a bar for the source.
      </p>
    </div>
  );
}
