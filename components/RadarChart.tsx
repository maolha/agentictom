"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type RadarDatum = {
  label: string;
  score: number;
  max: number;
};

const CX = 280;
const CY = 220;
const R = 148;
const RINGS = [1 / 3, 2 / 3, 1];

function pointAt(index: number, count: number, radius: number): [number, number] {
  const angle = (-90 + (360 / count) * index) * (Math.PI / 180);
  return [CX + radius * Math.cos(angle), CY + radius * Math.sin(angle)];
}

function polygonPath(points: [number, number][]): string {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ") + " Z";
}

/** Splits a category label into at most two lines for SVG tspans. */
function splitLabel(label: string): string[] {
  const words = label.split(" ");
  if (words.length <= 1 || label.length <= 12) return [label];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export default function RadarChart({ data }: { data: RadarDatum[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  const n = data.length;
  const show = reduced || isInView;

  const dataPoints = data.map((d, i) => pointAt(i, n, (d.score / d.max) * R));
  const dataPath = polygonPath(dataPoints);

  const ariaLabel =
    "Readiness by dimension: " + data.map((d) => `${d.label} ${d.score} of ${d.max}`).join(", ");

  return (
    <div ref={ref}>
      <svg
        viewBox="0 0 560 470"
        role="img"
        aria-label={ariaLabel}
        style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
      >
        {/* Grid rings */}
        {RINGS.map((f) => (
          <path
            key={f}
            d={polygonPath(data.map((_, i) => pointAt(i, n, R * f)))}
            fill="none"
            stroke="#E3DDD1"
            strokeWidth={1}
          />
        ))}

        {/* Spokes */}
        {data.map((_, i) => {
          const [x, y] = pointAt(i, n, R);
          return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="#E3DDD1" strokeWidth={1} />;
        })}

        {/* Scale marks on the top spoke */}
        {RINGS.map((f) => (
          <text
            key={f}
            x={CX + 7}
            y={CY - R * f + 4}
            fontSize={10}
            fill="#B9B2A4"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {Math.round(f * data[0].max)}
          </text>
        ))}

        {/* Data fill */}
        <motion.path
          d={dataPath}
          fill="#2B3A52"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 0.09 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: reduced ? 0 : 0.7 }}
        />

        {/* Data outline */}
        <motion.path
          d={dataPath}
          fill="none"
          stroke="#2B3A52"
          strokeWidth={2}
          strokeLinejoin="round"
          initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
          animate={show ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: reduced ? 0 : 1.1, ease: "easeInOut" }}
        />

        {/* Vertices + labels + hover targets */}
        {data.map((d, i) => {
          const [vx, vy] = dataPoints[i];
          const [lx, ly] = pointAt(i, n, R + 30);
          const cos = Math.cos((-90 + (360 / n) * i) * (Math.PI / 180));
          const sin = Math.sin((-90 + (360 / n) * i) * (Math.PI / 180));
          const anchor = cos > 0.35 ? "start" : cos < -0.35 ? "end" : "middle";
          const lines = splitLabel(d.label);
          const baseY = sin < -0.35 ? ly - (lines.length - 1) * 13 - 16 : sin > 0.35 ? ly + 10 : ly - ((lines.length - 1) * 13) / 2;
          const isHover = hovered === i;

          return (
            <g key={d.label}>
              {isHover && (
                <circle cx={vx} cy={vy} r={9} fill="none" stroke="#2B3A52" strokeWidth={1} opacity={0.4} />
              )}
              <motion.circle
                cx={vx}
                cy={vy}
                r={4}
                fill="#2B3A52"
                stroke="#F7F4EF"
                strokeWidth={2}
                initial={{ opacity: reduced ? 1 : 0 }}
                animate={show ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: reduced ? 0 : 0.9 + i * 0.07 }}
              />
              <text textAnchor={anchor} style={{ transition: "opacity 0.2s" }} opacity={hovered === null || isHover ? 1 : 0.45}>
                {lines.map((line, li) => (
                  <tspan
                    key={li}
                    x={lx}
                    y={baseY + li * 13}
                    fontSize={10.5}
                    fill="#1A1A1A"
                    letterSpacing="0.12em"
                    style={{ textTransform: "uppercase", fontWeight: isHover ? 600 : 400 }}
                  >
                    {line}
                  </tspan>
                ))}
                <tspan
                  x={lx}
                  y={baseY + lines.length * 13 + 4}
                  fontSize={12.5}
                  fill={isHover ? "#2B3A52" : "#6B6B6B"}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {d.score} / {d.max}
                </tspan>
              </text>
              {/* Generous invisible hit target */}
              <circle
                cx={vx}
                cy={vy}
                r={18}
                fill="transparent"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <title>{`${d.label}: ${d.score} of ${d.max}`}</title>
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
