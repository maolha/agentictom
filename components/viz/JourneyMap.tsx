"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ASSUMPTIONS, BANK_STEPS, BANK_TICKS, ROSTER, STAGES, type RoleId } from "./journeyData";

const SLATE = "#2B3A52";
const BROWN = "#8B7355";
const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const SUNK = "#F0ECE3";
const PAPER = "#F7F4EF";
const LINE2 = "#D8D3CB";
const FOG = "#B9B2A6";
const TINT = "#E9E8E6"; // slate at about 7 percent on paper

type View = "bank" | "client";
type Zoom = "in" | "out";

/* The world the map is drawn in. X is time, compressed: months on the left, decades on the right. */
const W = 1640;
const XS = [110, 210, 310, 410, 520, 660, 880, 1040, 1190, 1320, 1450, 1550];
/* How far each stage sits above (negative) or below the centre line. The loan and the closing
   sit on a straight stretch: the part of the journey the bank has drawn as a process. */
const YF = [0.85, -0.8, 0.7, -0.9, 0.55, 0, 0, -0.8, 0.8, -0.7, 0.75, -0.5];
const CORRIDOR = { from: 5, to: 6 };
const ON_MAP = new Set(BANK_STEPS.map((b) => b.stage));
const BANK_SHORT: Record<number, string> = { 5: "Application", 6: "Payout", 8: "Renewal", 10: "Payoff" };
const PHASES = [
  { label: "Buy", note: "months", x: 495, until: 960 },
  { label: "Own", note: "decades", x: 1172, until: 1385 },
  { label: "Leave", note: "", x: 1505, until: W },
];

const pad = (n: number) => String(n + 1).padStart(2, "0");
const roleName = (id: RoleId, short = false) => {
  const r = ROSTER.find((x) => x.id === id);
  return r ? (short ? r.short : r.name) : id;
};
const rolesAt = (i: number): RoleId[] => Array.from(new Set(STAGES[i].staff.flatMap((s) => s.who)));

type Pt = { x: number; y: number };
type Sample = Pt & { l: number };

/** The path through all twelve stages, as an SVG string and as samples to walk along. */
function buildPath(H: number) {
  const cy = H / 2;
  const amp = Math.min(H * 0.3, 240);
  const pts: Pt[] = XS.map((x, i) => ({ x, y: cy + YF[i] * amp }));
  const all: Pt[] = [{ x: 10, y: cy - 0.3 * amp }, ...pts, { x: W - 10, y: cy + 0.15 * amp }];
  let d = `M ${all[0].x} ${all[0].y}`;
  const samples: Sample[] = [{ ...all[0], l: 0 }];
  const lens: number[] = [];
  for (let s = 1; s < all.length; s++) {
    const a = all[s - 1];
    const b = all[s];
    const mx = (a.x + b.x) / 2;
    d += ` C ${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`;
    for (let j = 1; j <= 40; j++) {
      const t = j / 40;
      const u = 1 - t;
      const x = u * u * u * a.x + 3 * u * u * t * mx + 3 * u * t * t * mx + t * t * t * b.x;
      const y = u * u * u * a.y + 3 * u * u * t * a.y + 3 * u * t * t * b.y + t * t * t * b.y;
      const p = samples[samples.length - 1];
      samples.push({ x, y, l: p.l + Math.hypot(x - p.x, y - p.y) });
    }
    if (s <= pts.length) lens.push(samples[samples.length - 1].l);
  }
  return { d, pts, cy, amp, samples, lens, total: samples[samples.length - 1].l };
}

function pointAt(samples: Sample[], l: number): Pt {
  let lo = 0;
  let hi = samples.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (samples[mid].l < l) lo = mid;
    else hi = mid;
  }
  const a = samples[lo];
  const b = samples[hi];
  const t = b.l === a.l ? 0 : Math.min(1, Math.max(0, (l - a.l) / (b.l - a.l)));
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

/** Eases a list of numbers towards a target. The camera and the marker both run on this. */
function useTween(target: number[], ms: number, instant: boolean): number[] {
  const [val, setVal] = useState(target);
  const cur = useRef(target);
  const key = target.map((n) => n.toFixed(2)).join(",");
  useEffect(() => {
    const to = key.split(",").map(Number);
    const from = cur.current.length === to.length ? cur.current : to;
    const t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = instant ? 1 : Math.min(1, (now - t0) / ms);
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const next = to.map((v, i) => from[i] + (v - from[i]) * e);
      cur.current = next;
      setVal(next);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [key, ms, instant]);
  return val;
}

function Load({ n, color, label }: { n: number; color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5" style={{ fontSize: 10, color: MUTED, letterSpacing: "0.04em" }}>
      {label}
      <span className="inline-flex gap-[2px]" role="img" aria-label={`${n} of 5`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} style={{ width: 8, height: 8, border: `1px solid ${color}`, background: i < n ? color : "transparent" }} />
        ))}
      </span>
    </span>
  );
}

function Lane({ title, tone, children }: { title: string; tone: "plain" | "staff" | "bank"; children: React.ReactNode }) {
  const bg = tone === "staff" ? TINT : tone === "bank" ? SLATE : PAPER;
  const fg = tone === "bank" ? PAPER : INK;
  return (
    <div className="p-3.5" style={{ background: bg, color: fg }}>
      <p className="text-[10px] uppercase tracking-widest mb-1.5" style={{ color: tone === "bank" ? "#C9C2B5" : tone === "staff" ? SLATE : MUTED }}>
        {title}
      </p>
      <ul className="flex flex-col gap-1.5" style={{ fontSize: "0.82rem", lineHeight: 1.45, paddingLeft: "1em", listStyleType: "disc" }}>
        {children}
      </ul>
    </div>
  );
}

const CSS = `
.jm-ring { animation: jm-pulse 2.4s ease-in-out infinite; }
@keyframes jm-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
.jm-pop { animation: jm-pop 420ms cubic-bezier(.2,.8,.2,1) both; }
@keyframes jm-pop { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }
.jm-fade { transition: opacity 500ms ease; }
.jm-step { transition: opacity 300ms ease, border-color 300ms ease, background 300ms ease; }
.jm-rise { animation: jm-rise 480ms ease both; }
@keyframes jm-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .jm-ring, .jm-pop, .jm-rise { animation: none; }
  .jm-fade, .jm-step { transition: none; }
}
`;

export default function JourneyMap() {
  const [view, setView] = useState<View>("bank");
  const [zoom, setZoom] = useState<Zoom>("in");
  const [active, setActive] = useState(CORRIDOR.from);
  const [size, setSize] = useState({ w: 600, h: 250 });
  const [seen, setSeen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [navTop, setNavTop] = useState(57);
  /* A request to bring a stage under the map once the layout has settled. */
  const [nav, setNav] = useState<{ stage: number; n: number; soft: boolean } | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => (view === "bank" ? BANK_STEPS.map((b) => b.stage) : STAGES.map((_, i) => i)), [view]);
  const narrow = size.w < 480;
  const H = (W * size.h) / size.w;
  const geo = useMemo(() => buildPath(H), [H]);

  /* Measure the map, notice reduced motion, and note the first time the figure is seen. */
  useEffect(() => {
    const el = mapRef.current;
    const root = rootRef.current;
    if (!el || !root) return;
    const ro = new ResizeObserver(() => {
      const w = Math.max(280, Math.round(el.clientWidth));
      setSize((s) => (s.w === w ? s : { w, h: w < 480 ? 190 : 250 }));
    });
    ro.observe(el);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduced(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setSeen(true), { threshold: 0.15 });
    io.observe(root);
    // The site nav is fixed, and on a phone it slides away while scrolling down.
    const navEl = document.querySelector<HTMLElement>("nav");
    const onNav = () => setNavTop(!navEl || /-100%/.test(navEl.style.transform) ? 0 : navEl.offsetHeight);
    const mo = new MutationObserver(onNav);
    if (navEl) mo.observe(navEl, { attributes: true, attributeFilter: ["style"] });
    onNav();
    window.addEventListener("resize", onNav);
    return () => {
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      mq.removeEventListener("change", onMq);
      window.removeEventListener("resize", onNav);
    };
  }, []);

  /* Where the sticky map ends once it is pinned: the line the stages scroll up to. */
  const pinnedBottom = useCallback(() => {
    const s = stickyRef.current;
    if (!s) return 0;
    return navTop + s.offsetHeight;
  }, [navTop]);

  /* Scrolling moves through the journey: the stage that has reached the reading line is the active one. */
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const steps = stepsRef.current;
      if (!steps) return;
      const box = steps.getBoundingClientRect();
      const top = pinnedBottom();
      if (box.bottom < top || box.top > window.innerHeight) return;
      // Short rows in the overview change hands near the top; full cards a third of the way down.
      const line = zoom === "out" ? top + 60 : top + (window.innerHeight - top) * 0.3;
      let next = -1;
      steps.querySelectorAll<HTMLElement>("[data-stage]").forEach((el) => {
        if (next < 0 || el.getBoundingClientRect().top <= line) next = Number(el.dataset.stage);
      });
      if (next >= 0) setActive(next);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [view, zoom, pinnedBottom]);

  /* Bring the requested stage to the top of the list, just under the map. */
  useEffect(() => {
    if (!nav) return;
    const raf = requestAnimationFrame(() => {
      const el = stepsRef.current?.querySelector<HTMLElement>(`[data-stage="${nav.stage}"]`);
      const steps = stepsRef.current;
      if (!el || !steps) return;
      // A change of view only moves the page when the reader is already inside the list.
      if (nav.soft && steps.getBoundingClientRect().top > pinnedBottom() + 14) return;
      const top = el.getBoundingClientRect().top + window.scrollY - pinnedBottom() - 14;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    });
    return () => cancelAnimationFrame(raf);
  }, [nav, reduced, pinnedBottom]);

  const go = (stage: number, soft = false) => setNav((n) => ({ stage, soft, n: (n?.n ?? 0) + 1 }));

  const showView = (v: View) => {
    if (v === view) return;
    setView(v);
    setZoom(v === "bank" ? "in" : "out");
    const first = v === "bank" ? CORRIDOR.from : 0;
    setActive(first);
    go(first, true);
  };
  const showZoom = (z: Zoom) => {
    if (z === zoom) return;
    setZoom(z);
    go(active);
  };
  const openStage = (i: number) => {
    if (view === "bank" && !ON_MAP.has(i)) setView("client");
    setZoom("in");
    setActive(i);
    go(i);
  };

  /* Camera: the whole journey when zoomed out, one stage (or the bank's corridor) when zoomed in. */
  const p = geo.pts[active];
  const inCorridor = view === "bank" && active >= CORRIDOR.from && active <= CORRIDOR.to;
  const camTarget =
    zoom === "out"
      ? [W / 2, geo.cy, W]
      : inCorridor
        ? [(XS[CORRIDOR.from] + XS[CORRIDOR.to]) / 2, geo.cy, narrow ? 330 : 420]
        : [p.x, p.y, narrow ? 330 : view === "bank" ? 420 : 520];
  const [cx, cyCam, cw] = useTween(camTarget, 1100, reduced);
  const [len] = useTween([seen ? geo.lens[active] : 0], 900, reduced);

  const k = cw / size.w; // world units per screen pixel
  const ch = cw * (size.h / size.w);
  const vb = `${cx - cw / 2} ${cyCam - ch / 2} ${cw} ${ch}`;
  const far = cw > 900;
  const marker = pointAt(geo.samples, len);
  const labelsFit = 200 / k >= 66;
  const stage = STAGES[active];
  const bankStep = BANK_STEPS.find((b) => b.stage === active);
  const roles = rolesAt(active);
  const corridorY = geo.cy;

  const stationLabel = (i: number) => (view === "bank" ? BANK_SHORT[i] : STAGES[i].short);
  const showLabel = (i: number) => {
    if (view === "bank") return ON_MAP.has(i) && (!far || labelsFit);
    return far && labelsFit;
  };

  /* The specialists at work, set in a ring around the active stage when zoomed in. */
  const ringR = (narrow ? 50 : 62) * k;
  const satellites = roles.slice(0, 6).map((id, j, arr) => {
    const right = j % 2 === 0;
    const sideCount = right ? Math.ceil(arr.length / 2) : Math.floor(arr.length / 2);
    const idx = Math.floor(j / 2);
    const spread = sideCount <= 1 ? 0 : (idx / (sideCount - 1) - 0.5) * 1.5;
    const a = right ? spread : Math.PI - spread;
    return { id, right, x: p.x + Math.cos(a) * ringR, y: p.y + Math.sin(a) * ringR };
  });

  const btn = (on: boolean) =>
    ({
      background: on ? SLATE : PAPER,
      color: on ? PAPER : INK,
      border: `1px solid ${on ? SLATE : LINE2}`,
      cursor: "pointer",
    }) as const;

  return (
    <div className="my-10" ref={rootRef}>
      <style>{CSS}</style>
      <div className="px-4 pt-5 pb-5 md:px-8 md:pt-7 md:pb-7" style={{ background: SUNK, border: `1px solid ${LINE2}` }}>
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <p className="text-xs uppercase tracking-widest" style={{ color: BROWN }}>
            Figure · One property, two maps
          </p>
          <p className="text-xs uppercase tracking-widest" style={{ color: MUTED }}>
            agentictom.com
          </p>
        </div>
        <p className="text-sm mb-3" style={{ color: MUTED, lineHeight: 1.5 }}>
          Start with the journey as the bank has drawn it. Then switch to the client view. Scroll to travel, tap a stage to zoom in.
        </p>

        {/* The map stays in place while the stages scroll past underneath. */}
        <div ref={stickyRef} className="sticky -mx-4 px-4 md:-mx-8 md:px-8 pt-2 pb-2" style={{ top: navTop, zIndex: 5, background: SUNK, borderBottom: `1px solid ${LINE2}`, transition: reduced ? undefined : "top 250ms ease-out" }}>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div role="radiogroup" aria-label="Whose map of the journey" className="flex">
              {(["bank", "client"] as const).map((v) => (
                <button key={v} type="button" role="radio" aria-checked={view === v} onClick={() => showView(v)} className="text-xs px-3 py-1.5" style={btn(view === v)}>
                  {v === "bank" ? "Bank view" : "Client view"}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[10px] uppercase tracking-widest" style={{ color: MUTED }}>
                {zoom === "out" ? "Whole journey" : "One stage"}
              </span>
              <div className="flex" role="group" aria-label="Zoom">
                <button type="button" aria-label="Zoom out to the whole journey" disabled={zoom === "out"} onClick={() => showZoom("out")} className="text-sm w-8 py-1" style={{ ...btn(false), opacity: zoom === "out" ? 0.4 : 1 }}>
                  −
                </button>
                <button type="button" aria-label="Zoom in to one stage" disabled={zoom === "in"} onClick={() => showZoom("in")} className="text-sm w-8 py-1" style={{ ...btn(false), borderLeft: "none", opacity: zoom === "in" ? 0.4 : 1 }}>
                  +
                </button>
              </div>
            </div>
          </div>

          <div ref={mapRef} className="relative" style={{ background: PAPER, border: `1px solid ${LINE2}` }}>
            <svg
              width="100%"
              height={size.h}
              viewBox={vb}
              role="img"
              aria-label={
                view === "bank"
                  ? "The journey as the bank's process map draws it: application, payout, renewal and payoff. Eight of twelve stages are not on the map."
                  : "The household's journey with one property: twelve stages from finding to passing on, with the bank's map showing four of them."
              }
              style={{ display: "block", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {/* Phases */}
              <g className="jm-fade" style={{ opacity: far ? 1 : 0 }}>
                {PHASES.map((ph, i) => (
                  <g key={ph.label}>
                    {i < 2 && <line x1={ph.until} x2={ph.until} y1={28 * k} y2={H} stroke={LINE2} strokeWidth={k} strokeDasharray={`${3 * k} ${5 * k}`} />}
                    <text x={ph.x} y={17 * k} textAnchor="middle" fontSize={9.5 * k} fill={BROWN} style={{ letterSpacing: `${1.4 * k}px` }}>
                      {(narrow || !ph.note ? ph.label : `${ph.label} · ${ph.note}`).toUpperCase()}
                    </text>
                  </g>
                ))}
              </g>

              {/* The part of the journey the bank has on its process map today */}
              <rect
                x={XS[CORRIDOR.from] - 62}
                y={corridorY - 76}
                width={XS[CORRIDOR.to] - XS[CORRIDOR.from] + 124}
                height={152}
                rx={12}
                fill={view === "bank" ? "rgba(43,58,82,0.07)" : "rgba(139,115,85,0.10)"}
                stroke={view === "bank" ? SLATE : BROWN}
                strokeWidth={k}
                strokeDasharray={`${4 * k} ${3 * k}`}
              />
              <text x={XS[CORRIDOR.from] - 54} y={far ? corridorY + 76 + 13 * k : corridorY - 76 - 6 * k} fontSize={9.5 * k} fill={view === "bank" ? SLATE : BROWN} style={{ letterSpacing: `${0.6 * k}px` }}>
                {narrow && far ? "Bank's map" : "The bank's map today"}
              </text>
              {[8, 10].map((i) => (
                <circle key={i} cx={geo.pts[i].x} cy={geo.pts[i].y} r={32} fill="none" stroke={view === "bank" ? SLATE : BROWN} strokeWidth={k} strokeDasharray={`${4 * k} ${3 * k}`} />
              ))}

              {/* The journey */}
              <path d={geo.d} fill="none" stroke={FOG} strokeWidth={2.5 * k} strokeLinecap="round" strokeDasharray={view === "bank" ? `${1.5 * k} ${6 * k}` : undefined} />
              <path className="jm-fade" d={geo.d} fill="none" stroke={SLATE} strokeWidth={3 * k} strokeLinecap="round" strokeDasharray={`${len} ${geo.total + 20}`} style={{ opacity: view === "client" ? 1 : 0 }} />
              <line className="jm-fade" x1={XS[CORRIDOR.from]} x2={XS[CORRIDOR.to]} y1={corridorY} y2={corridorY} stroke={SLATE} strokeWidth={3 * k} style={{ opacity: view === "bank" ? 1 : 0 }} />

              {/* The bank's own steps between application and payout, legible once zoomed in */}
              <g className="jm-fade" style={{ opacity: view === "bank" && !far ? 1 : 0 }}>
                {BANK_TICKS.map((t, j) => {
                  const x = XS[CORRIDOR.from] + ((XS[CORRIDOR.to] - XS[CORRIDOR.from]) * (j + 1)) / (BANK_TICKS.length + 1);
                  const up = j % 2 === 1;
                  return (
                    <g key={t}>
                      <rect x={x - 3.5 * k} y={corridorY - 3.5 * k} width={7 * k} height={7 * k} fill={PAPER} stroke={SLATE} strokeWidth={1.2 * k} transform={`rotate(45 ${x} ${corridorY})`} />
                      <text x={x} y={corridorY + (up ? -13 : 22) * k} textAnchor="middle" fontSize={9.5 * k} fill={MUTED}>
                        {t}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* What the bank's map leaves blank */}
              <g className="jm-fade" style={{ opacity: view === "bank" && far ? 1 : 0 }}>
                {[300, 1300].map((x) => (
                  <text key={x} x={x} y={H - 14 * k} textAnchor="middle" fontSize={9.5 * k} fill={MUTED} style={{ letterSpacing: `${0.8 * k}px` }}>
                    NOT ON THE MAP
                  </text>
                ))}
              </g>

              {/* The specialists at work on the active stage */}
              {view === "client" && !far && (
                <g key={active}>
                  {satellites.map((s, j) => (
                    <g key={s.id}>
                      <line x1={p.x} y1={p.y} x2={s.x} y2={s.y} stroke={BROWN} strokeWidth={k} opacity={0.35} />
                      <g className="jm-pop" style={{ transformBox: "fill-box", transformOrigin: "center", animationDelay: `${120 + j * 70}ms` }}>
                        <circle cx={s.x} cy={s.y} r={4.5 * k} fill={BROWN} />
                      </g>
                      <text
                        className="jm-rise"
                        x={s.x + (s.right ? 9 : -9) * k}
                        y={s.y + 3.5 * k}
                        textAnchor={s.right ? "start" : "end"}
                        fontSize={10.5 * k}
                        fill={INK}
                        stroke={PAPER}
                        strokeWidth={3 * k}
                        style={{ paintOrder: "stroke", animationDelay: `${160 + j * 70}ms` }}
                      >
                        {roleName(s.id, true)}
                      </text>
                    </g>
                  ))}
                </g>
              )}

              {/* Stages */}
              {geo.pts.map((pt, i) => {
                const dim = view === "bank" && !ON_MAP.has(i);
                const on = i === active;
                const r = (narrow ? 9 : 11) * k;
                const above = YF[i] <= 0;
                return (
                  <g key={i} onClick={() => openStage(i)} style={{ cursor: "pointer" }}>
                    <circle cx={pt.x} cy={pt.y} r={r * 1.8} fill="transparent" />
                    <circle cx={pt.x} cy={pt.y} r={dim ? r * 0.55 : r} fill={on ? SLATE : PAPER} stroke={dim ? FOG : SLATE} strokeWidth={1.5 * k} />
                    {!dim && (
                      <text x={pt.x} y={pt.y + 3.6 * k} textAnchor="middle" fontSize={(narrow ? 9 : 10.5) * k} fontWeight={700} fill={on ? PAPER : SLATE}>
                        {i + 1}
                      </text>
                    )}
                    {showLabel(i) && (
                      <text x={pt.x} y={pt.y + (above ? -19 : 27) * k} textAnchor="middle" fontSize={10 * k} fill={on ? INK : MUTED} fontWeight={on ? 700 : 400} stroke={PAPER} strokeWidth={3 * k} style={{ paintOrder: "stroke" }}>
                        {stationLabel(i)}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* The household, travelling */}
              <circle className="jm-ring" cx={marker.x} cy={marker.y} r={(narrow ? 14 : 17) * k} fill="none" stroke={BROWN} strokeWidth={2.5 * k} />
            </svg>

            {view === "bank" && zoom === "in" && inCorridor && (
              <div className="absolute inset-x-0 bottom-1.5 flex justify-between px-2 pointer-events-none">
                {["← 5 stages earlier", "5 stages later →"].map((t) => (
                  <button key={t} type="button" onClick={() => showView("client")} className="jm-rise text-[10px] uppercase tracking-widest px-2 py-1 pointer-events-auto" style={{ color: BROWN, background: PAPER, border: `1px solid ${LINE2}`, cursor: "pointer" }}>
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Where we are, and who is at work */}
          <div className="pt-2" style={{ minHeight: narrow ? "5.4em" : "3.7em" }} aria-live="polite">
            <p className="text-sm" style={{ color: INK, lineHeight: 1.35 }}>
              <span style={{ fontWeight: 700, color: SLATE }}>{pad(active)}</span>{" "}
              <span style={{ fontWeight: 700 }}>{view === "bank" && bankStep ? bankStep.title : stage.name}</span>
              <span style={{ color: MUTED }}> · {view === "bank" ? `stage ${active + 1} of 12 in the client view` : stage.phase}</span>
            </p>
            {view === "client" ? (
              <div className="flex items-start gap-2.5 mt-1">
                <span className="inline-flex gap-[3px] shrink-0 mt-[5px]" role="img" aria-label={`${roles.length} of 15 specialists at work`}>
                  {ROSTER.map((r) => {
                    const on = roles.includes(r.id);
                    return <span key={r.id} title={r.name} style={{ width: 7, height: 7, borderRadius: "50%", border: `1px solid ${on ? BROWN : FOG}`, background: on ? BROWN : "transparent", transition: "background 300ms ease, border-color 300ms ease" }} />;
                  })}
                </span>
                <span className="text-xs" style={{ color: MUTED, lineHeight: 1.4 }}>
                  {roles.length ? roles.map((id) => roleName(id, true)).join(", ") : "The heirs and their own staff"}
                </span>
              </div>
            ) : (
              <p className="text-xs mt-1" style={{ color: MUTED }}>
                On the bank&rsquo;s map: 4 entries. Not on it: 8 of the 12 stages.
              </p>
            )}
          </div>
        </div>

        {/* The stages */}
        <div ref={stepsRef} className="flex flex-col gap-2.5 pt-4">
          {items.map((i) => {
            const s = STAGES[i];
            const on = i === active;
            const b = BANK_STEPS.find((x) => x.stage === i);
            const title = view === "bank" && b ? b.title : s.name;

            if (zoom === "out") {
              return (
                <button
                  key={`${view}-${i}`}
                  type="button"
                  data-stage={i}
                  onClick={() => openStage(i)}
                  className="jm-step jm-rise text-left grid grid-cols-[2em_1fr] gap-x-2 px-3 py-2.5"
                  style={{ background: on ? PAPER : "transparent", border: `1px solid ${on ? SLATE : LINE2}`, cursor: "pointer", animationDelay: `${Math.min(i, 11) * 35}ms` }}
                >
                  <span className="text-xs pt-0.5" style={{ color: MUTED }}>
                    {pad(i)}
                  </span>
                  <span>
                    <span className="font-[family-name:var(--font-cormorant)]" style={{ fontSize: "1.2rem", lineHeight: 1.15, color: SLATE, display: "block" }}>
                      {title}
                    </span>
                    <span className="text-xs" style={{ color: MUTED, lineHeight: 1.45, display: "block" }}>
                      {view === "bank" ? s.bankToday[0] : s.shift}
                    </span>
                    {view === "client" && (
                      <span className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                        <Load n={s.today} color={MUTED} label="Bank today" />
                        <Load n={s.withStaff} color={SLATE} label="With the staff" />
                      </span>
                    )}
                  </span>
                </button>
              );
            }

            return (
              <div key={`${view}-${i}`} data-stage={i} className="jm-step" style={{ background: PAPER, border: `1px solid ${on ? SLATE : LINE2}`, opacity: on ? 1 : 0.55 }}>
                <div className="px-3.5 pt-3.5 pb-3">
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: BROWN }}>
                    {view === "bank" ? `${pad(i)} · On the bank's map` : `${pad(i)} · ${s.phase}`}
                  </p>
                  <p className="font-[family-name:var(--font-cormorant)] mt-0.5" style={{ fontSize: "1.6rem", lineHeight: 1.15, color: SLATE }}>
                    {title}
                  </p>
                  <p className="text-sm mt-1" style={{ color: MUTED, lineHeight: 1.45 }}>
                    {view === "bank" && b ? b.note : s.shift}
                  </p>
                  {view === "client" && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5">
                      <Load n={s.today} color={MUTED} label="Bank today" />
                      <Load n={s.withStaff} color={SLATE} label="With the staff" />
                      <span className="flex flex-wrap gap-1">
                        {s.breaks.map((a) => (
                          <span key={a} className="text-[9px] uppercase tracking-widest px-1.5 py-0.5" style={{ border: `1px solid ${LINE2}`, color: MUTED }}>
                            {ASSUMPTIONS[a]}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
                {view === "bank" ? (
                  <div style={{ borderTop: `1px solid ${LINE2}` }}>
                    <Lane title="The process today" tone="plain">
                      {s.bankToday.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </Lane>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 1, background: LINE2, borderTop: `1px solid ${LINE2}` }}>
                    <Lane title="The client alone, today" tone="plain">
                      {s.alone.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </Lane>
                    <Lane title="With the staff of fifteen" tone="staff">
                      {s.staff.map((t) => (
                        <li key={t.does}>
                          {t.who.length > 0 && (
                            <>
                              <span style={{ fontWeight: 700, color: SLATE }}>{t.who.map((id, n) => (n === 0 ? roleName(id) : roleName(id).toLowerCase())).join(" and ")}</span>{" "}
                            </>
                          )}
                          {t.does}
                        </li>
                      ))}
                    </Lane>
                    <Lane title="Bank touchpoint today" tone="plain">
                      {s.bankToday.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </Lane>
                    <Lane title="What it means for the bank" tone="bank">
                      {s.bankThen.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </Lane>
                  </div>
                )}
              </div>
            );
          })}

          {view === "bank" && (
            <div className="p-4 text-center" style={{ border: `1px dashed ${BROWN}` }}>
              <p className="font-[family-name:var(--font-cormorant)]" style={{ fontSize: "1.35rem", lineHeight: 1.2, color: SLATE }}>
                That is the whole map. The household lives through twelve stages.
              </p>
              <button type="button" onClick={() => showView("client")} className="text-xs uppercase tracking-widest px-4 py-2 mt-3" style={btn(true)}>
                Zoom out to the client view
              </button>
            </div>
          )}
        </div>

        <p className="text-xs mt-4" style={{ color: MUTED, lineHeight: 1.6 }}>
          One household buying at CHF 1&rsquo;200&rsquo;000 with a mortgage of CHF 960&rsquo;000 (illustrative). The twelve stages, the five added specialists and the effects on the bank are the author&rsquo;s own analysis. Workload ratings from 0 to 5 are the author&rsquo;s judgement of how much work reaches the bank per client at each stage, there to show direction. The tags name the assumption from A Staff of Fifteen that stops holding.
        </p>
      </div>
    </div>
  );
}
