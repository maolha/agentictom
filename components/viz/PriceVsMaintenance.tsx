"use client";

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
  { year: "2002", lo: 40, hi: 80, src: "Glass" },
  { year: "2018", lo: 42, hi: 42, src: "Stripe" },
  { year: "2024", lo: 65, hi: 85, src: "ISBSG" },
];

export default function PriceVsMaintenance() {
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
      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: BROWN }}>
        Figure · The first version got cheap. The years after did not.
      </p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Two panels. Left: the price of a million tokens for a GPT-3 class capability fell from 60 dollars in late 2021 to 6 cents in late 2024, a thousandfold. Right: the share of software cost that is maintenance stayed between 40 and 85 percent across studies from 2002, 2018 and 2024."
        style={{ width: "100%", height: "auto", display: "block" }}
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
          <g key={i}>
            <circle cx={lx(p.year)} cy={ly(p.usd)} r={4} fill={SLATE} stroke="#F7F4EF" strokeWidth={1.5} />
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
          return (
            <g key={s.year}>
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
        Left: a16z, LLMflation, November 2024, price for a constant GPT-3 class capability. Right: Robert Glass, Facts and Fallacies of Software Engineering, 2002 (40 to 80 percent of cost); Stripe, The Developer Coefficient, 2018 (42 percent of developer time); ISBSG, June 2024 (65 to 85 percent of ownership cost). The three studies measure maintenance differently and point the same way.
      </p>
    </div>
  );
}
