"use client";

import { useState } from "react";

function swiss(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

function formatDistance(metres: number): { value: string; unit: string } {
  if (metres < 1000) return { value: swiss(metres), unit: metres === 1 ? "metre" : "metres" };
  return { value: swiss(metres / 1000), unit: "km" };
}

const MILESTONES: { min: number; text: string }[] = [
  { min: 1_073_741_823, text: "To the moon and back, with margin. The moon is 384'400 km away." },
  { min: 536_870_911, text: "Past the moon, 384'400 km out." },
  { min: 33_554_431, text: "Past the GPS constellation, which orbits at 20'200 km." },
  { min: 524_287, text: "Past the orbit of the International Space Station, about 400 km up." },
  { min: 131_071, text: "Past the Kármán line at 100 km. This is space." },
  { min: 16_383, text: "Above airliner cruising altitude, about 12 km." },
  { min: 8_191, text: "Nearly twice the height of the Matterhorn (4'478 m)." },
  { min: 1_023, text: "Just past one kilometre." },
  { min: 127, text: "About the length of a football pitch." },
  { min: 0, text: "Still inside the building." },
];

export default function ExponentialSteps() {
  const [steps, setSteps] = useState(10);

  const linear = steps; // one metre per step
  const exponential = Math.pow(2, steps) - 1; // doubling each step, cumulative
  const milestone = MILESTONES.find((m) => exponential >= m.min)?.text ?? "";
  const lin = formatDistance(linear);
  const exp = formatDistance(exponential);

  return (
    <div className="my-10 py-8" style={{ borderTop: "1px solid #E3DDD1", borderBottom: "1px solid #E3DDD1" }}>
      <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "#8B7355" }}>
        Interactive · Take the steps yourself
      </p>

      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-2">
          <label htmlFor="steps-slider" className="text-sm" style={{ color: "#1A1A1A" }}>
            Number of steps
          </label>
          <span
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{ fontSize: "1.8rem", color: "#2B3A52", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
          >
            {steps}
          </span>
        </div>
        <input
          id="steps-slider"
          type="range"
          min={1}
          max={30}
          value={steps}
          onChange={(e) => setSteps(parseInt(e.target.value, 10))}
          className="w-full"
          style={{ accentColor: "#2B3A52" }}
          aria-valuetext={`${steps} steps`}
        />
        <div className="flex justify-between text-[10px] uppercase tracking-widest mt-1" style={{ color: "#B9B2A4" }}>
          <span>1</span>
          <span>10</span>
          <span>20</span>
          <span>30</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 md:gap-10 mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#6B6B6B" }}>
            Ordinary steps
          </p>
          <p className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "clamp(26px, 4vw, 38px)", color: "#6B6B6B", lineHeight: 1.1 }}>
            {lin.value}
            <span style={{ fontSize: "1rem", marginLeft: 6 }}>{lin.unit}</span>
          </p>
          <p className="text-xs mt-1" style={{ color: "#6B6B6B" }}>One metre each.</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#8B7355" }}>
            Doubling steps
          </p>
          <p className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "clamp(26px, 4vw, 38px)", color: "#2B3A52", lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>
            {exp.value}
            <span style={{ fontSize: "1rem", marginLeft: 6 }}>{exp.unit}</span>
          </p>
          <p className="text-xs mt-1" style={{ color: "#2B3A52" }}>{milestone}</p>
        </div>
      </div>

      <p className="text-xs" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
        Cumulative distance after each step: one metre every time, against doubling every time. The same arithmetic as in the text.
      </p>
    </div>
  );
}
