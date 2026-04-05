"use client";

function FunnelSVG({
  title,
  titleColor,
  stages,
  conversionLabel,
  conversionColor,
}: {
  title: string;
  titleColor: string;
  stages: { label: string; value: string; pct: number }[];
  conversionLabel: string;
  conversionColor: string;
}) {
  const w = 440;
  const stageH = 40;
  const gap = 3;
  const totalH = stages.length * (stageH + gap) - gap;
  const funnelW = 220;
  const textX = funnelW + 20;

  return (
    <div>
      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: titleColor }}>{title}</p>
      <svg viewBox={`0 0 ${w} ${totalH + 4}`} width="100%" style={{ maxWidth: w }}>
        {stages.map((s, i) => {
          const y = i * (stageH + gap);
          const barW = (s.pct / 100) * funnelW;
          const x = (funnelW - barW) / 2;
          const isBottom = i >= stages.length - 2;

          return (
            <g key={i}>
              {/* Trapezoid connector to next stage */}
              {i < stages.length - 1 && (() => {
                const nextPct = stages[i + 1].pct;
                const nextBarW = (nextPct / 100) * funnelW;
                const nextX = (funnelW - nextBarW) / 2;
                const nextY = (i + 1) * (stageH + gap);
                return (
                  <polygon
                    points={`${x},${y + stageH} ${x + barW},${y + stageH} ${nextX + nextBarW},${nextY} ${nextX},${nextY}`}
                    fill="rgba(43,58,82,0.04)"
                  />
                );
              })()}
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barW}
                height={stageH}
                fill={isBottom ? "#2B3A52" : "rgba(43,58,82,0.12)"}
              />
              {/* Label — to the right of funnel */}
              <text
                x={textX}
                y={y + 16}
                fill="#1A1A1A"
                fontSize="11"
                fontFamily="var(--font-dm-sans), sans-serif"
              >
                {s.label}
              </text>
              {/* Value — bold, below label */}
              <text
                x={textX}
                y={y + 32}
                fill={isBottom ? "#2B3A52" : "#6B6B6B"}
                fontSize="13"
                fontWeight="700"
                fontFamily="var(--font-dm-sans), sans-serif"
              >
                {s.value}
              </text>
              {/* Connector line from bar to text */}
              <line
                x1={x + barW}
                y1={y + stageH / 2}
                x2={textX - 8}
                y2={y + stageH / 2}
                stroke="#D8D3CB"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            </g>
          );
        })}
      </svg>
      <p className="text-xs mt-3" style={{ color: conversionColor, fontWeight: 700 }}>
        {conversionLabel}
      </p>
    </div>
  );
}

export default function MortgageFunnel() {
  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
        <FunnelSVG
          title="Today"
          titleColor="#8B7355"
          stages={[
            { label: "Property seekers", value: "300'000+", pct: 100 },
            { label: "Mortgage inquiries", value: "500–850'000+", pct: 72 },
            { label: "Applications submitted", value: "200–300'000", pct: 42 },
            { label: "Mortgages originated", value: "~85'000", pct: 20 },
            { label: "Properties purchased", value: "~50–60'000", pct: 14 },
          ]}
          conversionLabel="Conversion: ~1 in 4"
          conversionColor="#6B6B6B"
        />
        <FunnelSVG
          title="Agent world"
          titleColor="#8B7355"
          stages={[
            { label: "Property seekers", value: "300'000+", pct: 28 },
            { label: "Mortgage inquiries", value: "Millions", pct: 100 },
            { label: "Applications submitted", value: "2–3 million+", pct: 82 },
            { label: "Mortgages originated", value: "~85'000", pct: 7 },
            { label: "Properties purchased", value: "~50–60'000", pct: 5 },
          ]}
          conversionLabel="Conversion: ~1 in 40+"
          conversionColor="#8B7355"
        />
      </div>
      <p className="text-xs mt-8 text-center" style={{ color: "#6B6B6B" }}>
        Illustrative. Based on SNB mortgage survey data, BFS/Wüest Partner transaction estimates, and platform quote-to-close ratios.
      </p>
    </div>
  );
}
