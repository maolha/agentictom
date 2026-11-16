/** The working tools of the site, with a small drawing each. Used by the homepage band and the Lab. */

const PAPER = "#F7F4EF";
const BROWN = "#C4AE8C";
const RED = "#B5513F";

type GlyphProps = { ink?: string; accent?: string };

/** A chain of steps that loses runs on the way. */
function ChainGlyph({ ink = PAPER, accent = BROWN }: GlyphProps) {
  const pts = [0, 1, 2, 3, 4, 5, 6];
  return (
    <svg viewBox="0 0 160 64" width="100%" role="img" aria-label="A chain of seven steps whose completion rate falls with every step">
      <path d="M8 14 C 50 16, 100 30, 152 52" fill="none" stroke={accent} strokeWidth="1.5" />
      <line x1="8" y1="58" x2="152" y2="58" stroke={ink} strokeOpacity="0.3" strokeWidth="1" />
      {pts.map((i) => {
        const x = 8 + i * 24;
        const y = 14 + Math.pow(i / 6, 1.5) * 38;
        return <circle key={i} cx={x} cy={y} r={i === 6 ? 4.5 : 3.5} fill={i === 6 ? RED : ink} />;
      })}
    </svg>
  );
}

/** Twelve stages of a journey, four of them on the bank's map. */
function JourneyGlyph({ ink = PAPER, accent = BROWN }: GlyphProps) {
  return (
    <svg viewBox="0 0 160 64" width="100%" role="img" aria-label="Twelve stages of a client journey, four of which appear on the bank's process map">
      {Array.from({ length: 12 }, (_, i) => {
        const onMap = i >= 3 && i <= 6;
        return <rect key={i} x={6 + i * 12.6} y={onMap ? 12 : 26} width={8.6} height={onMap ? 40 : 26} fill={onMap ? accent : ink} fillOpacity={onMap ? 1 : 0.32} />;
      })}
      <line x1="6" y1="58" x2="154" y2="58" stroke={ink} strokeOpacity="0.3" strokeWidth="1" />
    </svg>
  );
}

/** Five dimensions on a radar. */
function RadarGlyph({ ink = PAPER, accent = BROWN }: GlyphProps) {
  const cx = 80;
  const cy = 34;
  const ring = (r: number) =>
    Array.from({ length: 5 }, (_, i) => {
      const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
    }).join(" ");
  const score = [0.85, 0.5, 0.7, 0.35, 0.6]
    .map((v, i) => {
      const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      return `${(cx + Math.cos(a) * 28 * v).toFixed(1)},${(cy + Math.sin(a) * 28 * v).toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 160 64" width="100%" role="img" aria-label="A radar chart with five dimensions">
      <polygon points={ring(28)} fill="none" stroke={ink} strokeOpacity="0.35" />
      <polygon points={ring(16)} fill="none" stroke={ink} strokeOpacity="0.2" />
      <polygon points={score} fill={accent} fillOpacity="0.45" stroke={accent} strokeWidth="1.5" />
    </svg>
  );
}

/** Three layers of workforce. */
function LayersGlyph({ ink = PAPER, accent = BROWN }: GlyphProps) {
  return (
    <svg viewBox="0 0 160 64" width="100%" role="img" aria-label="Three stacked layers: humans, agents and bots">
      <rect x="56" y="8" width="48" height="12" fill={accent} />
      <rect x="36" y="26" width="88" height="12" fill={ink} fillOpacity="0.55" />
      <rect x="8" y="44" width="144" height="12" fill={ink} fillOpacity="0.28" />
    </svg>
  );
}

/** Bars rising month by month. */
function BarsGlyph({ ink = PAPER, accent = BROWN }: GlyphProps) {
  const h = [10, 12, 11, 15, 14, 19, 22, 21, 28, 34, 40, 50];
  return (
    <svg viewBox="0 0 160 64" width="100%" role="img" aria-label="A bar chart that rises steeply towards the right">
      {h.map((v, i) => (
        <rect key={i} x={6 + i * 12.6} y={58 - v} width={8.6} height={v} fill={i === h.length - 1 ? accent : ink} fillOpacity={i === h.length - 1 ? 1 : 0.4} />
      ))}
      <line x1="6" y1="58" x2="154" y2="58" stroke={ink} strokeOpacity="0.3" strokeWidth="1" />
    </svg>
  );
}

export type Tool = {
  id: string;
  href: string;
  kind: string;
  title: string;
  line: string;
  time: string;
  Glyph: (props: GlyphProps) => React.ReactElement;
};

export const TOOLS: Tool[] = [
  {
    id: "calculator",
    href: "/calculator",
    kind: "Calculator",
    title: "Where the Chain Breaks",
    line: "Set the accuracy per step and the length of the chain. Then enter your own process and see what a check buys back.",
    time: "2 min",
    Glyph: ChainGlyph,
  },
  {
    id: "journey",
    href: "/blog/the-staff-of-fifteen-buys-a-house",
    kind: "Film and map",
    title: "One property, two maps",
    line: "A film of three minutes, then twelve stages of a household's journey, switched between the bank's view and the client's.",
    time: "3 min",
    Glyph: JourneyGlyph,
  },
  {
    id: "assessment",
    href: "/assessment",
    kind: "Assessment",
    title: "How ready is your bank?",
    line: "Fifteen questions across five dimensions. No registration. A level, a radar chart and a PDF for your leadership team.",
    time: "5 min",
    Glyph: RadarGlyph,
  },
  {
    id: "layers",
    href: "/framework",
    kind: "The model",
    title: "Three layers of workforce",
    line: "Bots, agents and humans. Select a layer to see what it owns, how it is governed and how it fails.",
    time: "2 min",
    Glyph: LayersGlyph,
  },
  {
    id: "figures",
    href: "/lab#figures",
    kind: "Figures",
    title: "The evidence, to operate",
    line: "The figures from the essays in one place: patch volumes, exploit windows, handoff counts and the mortgage funnel.",
    time: "12 figures",
    Glyph: BarsGlyph,
  },
];
