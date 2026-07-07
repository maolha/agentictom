"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const W = 560;
const H = 300;

// Stylised paths: baseline drifts slightly down; the AI curve dips, crosses, then climbs.
const BASELINE = `M 40 150 C 200 154, 380 160, 520 168`;
const AI_CURVE = `M 40 150 C 110 205, 150 215, 200 213 C 260 210, 300 185, 336 157 C 390 114, 460 70, 520 52`;

// Points read off the curves for annotations
const TROUGH = { x: 190, y: 213 };
const CROSS = { x: 344, y: 158 };

export default function JCurve() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const show = reduced || isInView;

  return (
    <div ref={ref} className="my-10 py-8" style={{ borderTop: "1px solid #E3DDD1", borderBottom: "1px solid #E3DDD1" }}>
      <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#8B7355" }}>
        Figure · The dip is the plan
      </p>
      <div className="flex gap-5 mb-4">
        <span className="flex items-center gap-2 text-xs" style={{ color: "#1A1A1A" }}>
          <span style={{ width: 14, height: 2, background: "#2B3A52", display: "inline-block" }} /> Redesigning with AI
        </span>
        <span className="flex items-center gap-2 text-xs" style={{ color: "#6B6B6B" }}>
          <span style={{ width: 14, height: 2, background: "#B9B2A4", display: "inline-block" }} /> Standing still
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Stylised productivity J-curve: performance first falls below the standing-still baseline, reaches a trough where most programmes stop, then crosses break-even and rises well above it." style={{ width: "100%", height: "auto", display: "block" }}>
        {/* Axes */}
        <line x1={40} y1={20} x2={40} y2={H - 40} stroke="#E3DDD1" strokeWidth={1} />
        <line x1={40} y1={H - 40} x2={W - 20} y2={H - 40} stroke="#E3DDD1" strokeWidth={1} />
        <text x={44} y={30} fontSize={10} fill="#B9B2A4" letterSpacing="0.1em" style={{ textTransform: "uppercase" }}>
          Measured performance
        </text>
        <text x={W - 20} y={H - 26} fontSize={10} fill="#B9B2A4" letterSpacing="0.1em" textAnchor="end" style={{ textTransform: "uppercase" }}>
          Time
        </text>

        {/* Baseline */}
        <motion.path
          d={BASELINE}
          fill="none"
          stroke="#B9B2A4"
          strokeWidth={2}
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={show ? { pathLength: 1 } : {}}
          transition={{ duration: reduced ? 0 : 0.9, ease: "easeInOut" }}
        />
        {/* AI curve */}
        <motion.path
          d={AI_CURVE}
          fill="none"
          stroke="#2B3A52"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={show ? { pathLength: 1 } : {}}
          transition={{ duration: reduced ? 0 : 1.6, ease: "easeInOut", delay: reduced ? 0 : 0.2 }}
        />

        {/* Trough annotation */}
        <motion.g initial={{ opacity: reduced ? 1 : 0 }} animate={show ? { opacity: 1 } : {}} transition={{ delay: reduced ? 0 : 1.1, duration: 0.4 }}>
          <circle cx={TROUGH.x} cy={TROUGH.y} r={4} fill="#8B7355" stroke="#F7F4EF" strokeWidth={2} />
          <line x1={TROUGH.x} y1={TROUGH.y + 8} x2={TROUGH.x} y2={TROUGH.y + 26} stroke="#8B7355" strokeWidth={1} />
          <text x={TROUGH.x} y={TROUGH.y + 40} fontSize={11} fill="#8B7355" textAnchor="middle">
            The 94 percent stop here
          </text>
        </motion.g>

        {/* Break-even annotation */}
        <motion.g initial={{ opacity: reduced ? 1 : 0 }} animate={show ? { opacity: 1 } : {}} transition={{ delay: reduced ? 0 : 1.5, duration: 0.4 }}>
          <circle cx={CROSS.x} cy={CROSS.y} r={4} fill="#2B3A52" stroke="#F7F4EF" strokeWidth={2} />
          <line x1={CROSS.x} y1={CROSS.y - 8} x2={CROSS.x} y2={CROSS.y - 28} stroke="#B9B2A4" strokeWidth={1} />
          <text x={CROSS.x} y={CROSS.y - 34} fontSize={11} fill="#6B6B6B" textAnchor="middle">
            Break-even
          </text>
        </motion.g>

        {/* The dip bracket */}
        <motion.text
          x={115}
          y={168}
          fontSize={11}
          fill="#6B6B6B"
          fontStyle="italic"
          initial={{ opacity: reduced ? 1 : 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ delay: reduced ? 0 : 0.8, duration: 0.4 }}
        >
          the dip
        </motion.text>
      </svg>

      <p className="text-xs mt-4" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
        Stylised productivity J-curve, after Brynjolfsson, Rock, and Syverson (2021). Illustrative shape, no scale.
      </p>
    </div>
  );
}
