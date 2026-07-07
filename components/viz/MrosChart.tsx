"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const DATA: { year: string; value: number }[] = [
  { year: "2020", value: 5_334 },
  { year: "2021", value: 5_964 },
  { year: "2022", value: 7_639 },
  { year: "2023", value: 11_876 },
  { year: "2024", value: 15_141 },
  { year: "2025", value: 21_087 },
];

const W = 560;
const H = 280;
const PLOT_TOP = 46;
const PLOT_BOTTOM = H - 34;
const PLOT_LEFT = 20;
const PLOT_RIGHT = W - 130;
const MAX = 22_000;

function swiss(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

export default function MrosChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const show = reduced || isInView;
  const [hovered, setHovered] = useState<number | null>(null);

  const n = DATA.length;
  const slot = (PLOT_RIGHT - PLOT_LEFT) / n;
  const barW = Math.min(52, slot - 14);
  const plotH = PLOT_BOTTOM - PLOT_TOP;

  return (
    <div ref={ref} className="my-10 py-8" style={{ borderTop: "1px solid #E3DDD1", borderBottom: "1px solid #E3DDD1" }}>
      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8B7355" }}>
        Figure · Suspicious activity reports to MROS
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Suspicious activity reports to MROS per year: ${DATA.map((d) => `${d.year} ${swiss(d.value)}`).join(", ")}. Almost four times the 2020 volume, about 32 percent compound growth per year.`}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {DATA.map((d, i) => {
          const hFull = (d.value / MAX) * plotH;
          const bx = PLOT_LEFT + i * slot + (slot - barW) / 2;
          const isHover = hovered === i;
          const isLast = i === n - 1;
          return (
            <g
              key={d.year}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "default" }}
            >
              <motion.rect
                x={bx}
                width={barW}
                fill="#2B3A52"
                opacity={hovered === null || isHover ? 1 : 0.55}
                initial={reduced ? { y: PLOT_BOTTOM - hFull, height: hFull } : { y: PLOT_BOTTOM, height: 0 }}
                animate={show ? { y: PLOT_BOTTOM - hFull, height: hFull } : {}}
                transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : i * 0.08, ease: "easeOut" }}
                style={{ transition: "opacity 0.2s" }}
              />
              <motion.text
                x={bx + barW / 2}
                y={PLOT_BOTTOM - hFull - 8}
                fontSize={isLast ? 12.5 : 10.5}
                fontWeight={isLast || isHover ? 700 : 400}
                fill={isLast ? "#2B3A52" : "#6B6B6B"}
                textAnchor="middle"
                style={{ fontVariantNumeric: "tabular-nums" }}
                initial={{ opacity: reduced ? 1 : 0 }}
                animate={show ? { opacity: 1 } : {}}
                transition={{ delay: reduced ? 0 : 0.5 + i * 0.08, duration: 0.3 }}
              >
                {swiss(d.value)}
              </motion.text>
              <text x={bx + barW / 2} y={PLOT_BOTTOM + 18} fontSize={11} fill="#6B6B6B" textAnchor="middle">
                {d.year}
              </text>
              <title>{`${d.year}: ${swiss(d.value)} reports`}</title>
            </g>
          );
        })}

        {/* Baseline */}
        <line x1={PLOT_LEFT} y1={PLOT_BOTTOM} x2={PLOT_RIGHT} y2={PLOT_BOTTOM} stroke="#D8D3CB" strokeWidth={1} />

        {/* Annotation block */}
        <motion.g
          initial={{ opacity: reduced ? 1 : 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ delay: reduced ? 0 : 1.1, duration: 0.5 }}
        >
          <text x={W - 4} y={PLOT_TOP + 26} fontSize={26} fill="#2B3A52" textAnchor="end" fontWeight={300}>
            ≈4×
          </text>
          <text x={W - 4} y={PLOT_TOP + 44} fontSize={10.5} fill="#6B6B6B" textAnchor="end">
            in five years
          </text>
          <text x={W - 4} y={PLOT_TOP + 74} fontSize={26} fill="#2B3A52" textAnchor="end" fontWeight={300}>
            +32%
          </text>
          <text x={W - 4} y={PLOT_TOP + 92} fontSize={10.5} fill="#6B6B6B" textAnchor="end">
            compound, per year
          </text>
          <text x={W - 4} y={PLOT_TOP + 122} fontSize={26} fill="#8B7355" textAnchor="end" fontWeight={300}>
            84
          </text>
          <text x={W - 4} y={PLOT_TOP + 140} fontSize={10.5} fill="#6B6B6B" textAnchor="end">
            per working day, 2025
          </text>
        </motion.g>
      </svg>

      <p className="text-xs mt-4" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
        Source: MROS Annual Report 2025. Per-working-day figure derived from 21&apos;087 reports across roughly 250 working days.
      </p>
    </div>
  );
}
