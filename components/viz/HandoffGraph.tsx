const SLATE = "#2B3A52";
const BROWN = "#8B7355";
const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const LINE = "#E3DDD1";

const SIZES = [5, 20, 50];

function fmt(n: number) {
  return n.toLocaleString("de-CH").replace(/’|’|'/g, "'");
}

function Graph({ n }: { n: number }) {
  const size = 240;
  const c = size / 2;
  const r = size / 2 - 14;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [c + r * Math.cos(a), c + r * Math.sin(a)] as const;
  });
  const edges: string[] = [];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) edges.push(`M${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}L${pts[j][0].toFixed(1)} ${pts[j][1].toFixed(1)}`);
  const handoffs = (n * (n - 1)) / 2;
  const edgeOpacity = n <= 5 ? 0.75 : n <= 20 ? 0.35 : 0.18;
  const dot = n <= 5 ? 6 : n <= 20 ? 4 : 2.6;
  return (
    <figure className="flex flex-col items-center m-0">
      <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: 240 }} role="img" aria-label={`${n} systems, ${fmt(handoffs)} possible handoffs between them`}>
        <path d={edges.join("")} fill="none" stroke={SLATE} strokeWidth={n <= 5 ? 1.2 : 0.6} strokeOpacity={edgeOpacity} />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={dot} fill={BROWN} />
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
  return (
    <div className="my-10 py-8" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
      <p className="text-xs uppercase tracking-widest mb-5" style={{ color: BROWN }}>
        Figure · Handoffs grow with the square of the count
      </p>
      <div className="grid grid-cols-3 gap-3 md:gap-8">
        {SIZES.map((n) => (
          <Graph key={n} n={n} />
        ))}
      </div>
      <p className="text-xs mt-5" style={{ color: MUTED, lineHeight: 1.6 }}>
        Each dot is a system, tool or automation that may need to hand work to another, each line a handoff that may need a queue, a restart and a log. Not every pair does. Even if only one in ten ever does, 50 systems leave about 123 interfaces to run, twelve times the full count at five. Illustrative calculation: n times n minus one, divided by two. A platform settles the queue, the restart and the log once for all of them. A build settles them again for each one.
      </p>
    </div>
  );
}
